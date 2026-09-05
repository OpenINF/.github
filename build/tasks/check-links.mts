/**
 * @file Check that the links in this project's prose still lead somewhere.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/check-links
 *
 * Outside `verify/` on purpose, the way `verify-pull-request.mts` is: it
 * reaches the network, and every task in that directory runs on every pull
 * request. A host that is slow, rate-limiting or briefly down would otherwise
 * fail changes that have nothing to do with it.
 *
 * The exit code carries both answers at once, since one link being dead says
 * nothing about whether another was reachable: bit 1 is set when a link is
 * gone, bit 2 when one could not be checked. A dead link is a thing to act on
 * and a host that would not answer is not, so neither hides the other.
 */

import { readFile } from 'node:fs/promises';
import { glob } from '@openinf/.github/build/utils';

/** How long to wait on a host before giving up, in milliseconds. */
const TIMEOUT = 20_000;

/** How many requests to have in flight at once. */
const CONCURRENCY = 8;

/** Bits of the exit code. Both can be set; neither masks the other. */
const ALIVE = 0;
const DEAD = 1;
const UNCHECKED = 2;

/**
 * Only these mean the link is gone. Everything else that is not a success --
 * a rate limit, a login wall, a host having a bad afternoon -- is a question
 * this task could not answer, and reporting it as rot is how a check like
 * this teaches people to ignore it.
 */
const GONE = new Set([404, 410]);

/** Sent because a bare fetch is what several hosts refuse outright. */
const HEADERS = {
  accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
  'user-agent':
    'Mozilla/5.0 (compatible; OpenINF-link-check; +https://github.com/OpenINF/.github)',
};

/**
 * GitHub answers 404 for a page it will not show an anonymous client -- the
 * stargazer list of nodejs/node, with its hundred and twenty thousand stars,
 * is a 404 from here -- so a 404 on a `github.com` page is not evidence the
 * link is dead. What can be settled is whether the repository behind it still
 * exists, which the API will say, and a repository that is gone takes every
 * link into it with it.
 *
 * `raw.githubusercontent.com` has no such login wall: a 404 there means the
 * file is not being served, which is exactly the thing worth reporting.
 */
const REPO_URL =
  /^https:\/\/(?:github\.com|raw\.githubusercontent\.com)\/(?<owner>[^/]+)\/(?<repo>[^/#?]+)/;

/**
 * A token widens what the API will answer and lifts the anonymous rate limit.
 * Sent to api.github.com and nowhere else: a credential handed to whichever
 * host a link happens to name is a credential given away.
 */
const TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? '';

/**
 * Asks the API whether a repository still exists.
 * @param {string} owner The account it belongs to.
 * @param {string} repo Its name.
 * @returns {Promise<boolean | undefined>} Whether it is there, or undefined if the API would not say.
 */
async function repoExists(owner: string, repo: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo.replace(/\.git$/, '')}`,
      {
        headers: {
          accept: 'application/vnd.github+json',
          ...(TOKEN === '' ? {} : { authorization: `Bearer ${TOKEN}` }),
        },
        signal: AbortSignal.timeout(TIMEOUT),
      }
    );

    // Anonymously, a private repository is a 404 and so is a deleted one.
    // Saying "gone" of a repository that is merely not ours to see is the
    // kind of wrong answer that gets a check like this switched off, so
    // without a token the question stays open.
    if (response.status === 404) return TOKEN === '' ? undefined : false;

    return response.ok ? true : undefined;
  } catch {
    return undefined;
  }
}

/** One link, and the files that point at it. */
type Link = { url: string; files: string[] };

/**
 * Reads every http(s) link out of the project's prose.
 * @returns {Promise<Link[]>} Each distinct URL, with the files naming it.
 */
async function collect(): Promise<Link[]> {
  const files = await glob([
    '**/*.md',
    '!doc/_site/',
    '!lib/',
    '!node_modules/',
    '!vendor/',
    '!**/COPYING.md',
    '!LICENSE/',
  ]);
  const found = new Map<string, Set<string>>();

  for (const file of files) {
    const text = await readFile(file, 'utf8');

    // Trailing punctuation belongs to the sentence rather than to the URL,
    // and a closing bracket to the markdown around it.
    for (const match of text.matchAll(/https?:\/\/[^\s<>"')\]]+/g)) {
      const url = match[0].replace(/[.,;:]+$/, '');

      found.set(url, (found.get(url) ?? new Set()).add(file));
    }
  }

  return [...found]
    .map(([url, where]) => ({ url, files: [...where].sort() }))
    .sort((one, other) => one.url.localeCompare(other.url));
}

/**
 * Asks a host whether a link still leads somewhere. HEAD first, because it
 * costs the host a header rather than a page; some serve it wrongly or not at
 * all, and those get a GET before any conclusion is drawn.
 * @param {string} url The link to ask about.
 * @returns {Promise<{ status: number; reason: string }>} The verdict, `status` 0 when nothing answered.
 */
async function probe(url: string) {
  for (const method of ['HEAD', 'GET'] as const) {
    try {
      const response = await fetch(url, {
        headers: HEADERS,
        method,
        redirect: 'follow',
        signal: AbortSignal.timeout(TIMEOUT),
      });

      // A HEAD that is refused says nothing about the page behind it.
      if (method === 'HEAD' && !response.ok && !GONE.has(response.status)) {
        continue;
      }

      return { reason: `HTTP ${response.status}`, status: response.status };
    } catch (error) {
      if (method === 'GET') {
        return {
          reason: error instanceof Error ? error.message : String(error),
          status: 0,
        };
      }
    }
  }

  return { reason: 'no answer', status: 0 };
}

/**
 * Runs `work` over `items`, a few at a time.
 * @param {T[]} items What to work through.
 * @param {(item: T) => Promise<R>} work What to do with each.
 * @returns {Promise<R[]>} The results, in the order the items were given.
 */
async function inBatches<T, R>(items: T[], work: (item: T) => Promise<R>) {
  const results: R[] = [];

  for (let index = 0; index < items.length; index += CONCURRENCY) {
    results.push(
      ...(await Promise.all(items.slice(index, index + CONCURRENCY).map(work)))
    );
  }

  return results;
}

const links = await collect();
const verdicts = await inBatches(links, async (link) => ({
  ...link,
  ...(await probe(link.url)),
}));

/**
 * Settles the 404s that `github.com` hands out for pages it will not show.
 * A repository that is gone makes the link dead; one that is still there
 * leaves the question open rather than answered.
 */
async function judge(link: (typeof verdicts)[number]) {
  if (!GONE.has(link.status)) return link;

  const found = link.url.match(REPO_URL)?.groups;

  if (found === undefined || link.url.startsWith('https://raw.')) return link;

  const exists = await repoExists(found.owner ?? '', found.repo ?? '');

  if (exists === false) {
    return { ...link, reason: `${found.owner}/${found.repo} no longer exists` };
  }

  return {
    ...link,
    reason:
      exists === true
        ? `HTTP 404 anonymously, though ${found.owner}/${found.repo} exists -- a page GitHub shows only to signed-in visitors`
        : `HTTP 404, and the API would not say whether ${found.owner}/${found.repo} still exists (a token would settle it)`,
    status: 0,
  };
}

const judged = await inBatches(verdicts, judge);
const dead = judged.filter((link) => GONE.has(link.status));
const unchecked = judged.filter(
  (link) =>
    !(GONE.has(link.status) || (link.status >= 200 && link.status < 400))
);

console.log(
  `Checked ${links.length} link${links.length === 1 ? '' : 's'} across the project's prose.`
);

// Everything goes to stdout, including what went wrong: whatever runs this
// keeps only that, and a reason written anywhere else is a reason lost.
if (dead.length > 0) {
  console.log('');
  console.log('These lead nowhere:');
  for (const link of dead) {
    console.log(`- ${link.url} — ${link.reason}`);
    for (const file of link.files) console.log(`  - \`${file}\``);
  }
}

if (unchecked.length > 0) {
  console.log('');
  console.log('These could not be checked, which is not the same as gone:');
  for (const link of unchecked) {
    console.log(`- ${link.url} — ${link.reason}`);
  }
}

process.exitCode =
  ALIVE |
  (dead.length > 0 ? DEAD : ALIVE) |
  (unchecked.length > 0 ? UNCHECKED : ALIVE);
