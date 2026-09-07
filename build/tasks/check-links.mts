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
import { urlsIn } from '@openinf/.github/build/links';
import { glob, matched } from '@openinf/.github/build/utils';

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
 * The `github.com` paths that answer 404 to anybody not signed in, even for a
 * public repository. Checked rather than assumed: of the pages tried against
 * a public repository -- the repository root, network members, contributor
 * graphs, pulse, forks, activity, branches, tags, issues and pull requests --
 * only these two are hidden, and a path that simply does not exist answers
 * 404 as it should. So the exception is these two and nothing else: a 404 on
 * any other page is a page a reader cannot open.
 */
const SIGN_IN_ONLY = /\/(?:stargazers|watchers)\/?$/;

/** Where a repository is named in a GitHub URL. */
const REPO_URL =
  /^https:\/\/(?:github\.com|raw\.githubusercontent\.com)\/(?<owner>[^/]+)\/(?<repo>[^/#?]+)/;

/**
 * A token widens what the API will answer and lifts the anonymous rate limit.
 * Sent to api.github.com and nowhere else: a credential handed to whichever
 * host a link happens to name is a credential given away.
 */
const TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? '';

/**
 * Asks whether a repository is provably public.
 *
 * Three answers, because two would lose the difference that matters. `true`
 * and `false` are what the API said; `undefined` is the API declining to say
 * -- rate limited, unwell, or unreachable -- and treating that as `false`
 * would turn somebody else's bad afternoon into a report of a broken link.
 * @param {string} owner The account it belongs to.
 * @param {string} repo Its name.
 * @returns {Promise<boolean | undefined>} Whether it is public, or undefined if unanswered.
 */
async function repoIsPublic(owner: string, repo: string) {
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

    // Deleted, or private and not ours to see. Either way a reader following
    // this link arrives nowhere, which is what the report is about.
    if (response.status === 404) return false;

    if (!response.ok) return undefined;

    return ((await response.json()) as { private?: boolean }).private !== true;
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

  // The same guard the verify tasks carry. A glob that stopped matching would
  // otherwise report zero links checked and nothing wrong with any of them,
  // which is the one answer a check must never give.
  if (!matched(files, '**/*.md')) return [];

  const found = new Map<string, Set<string>>();

  for (const file of files) {
    const text = await readFile(file, 'utf8');

    for (const url of urlsIn(text)) {
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

      // A HEAD that is refused says nothing about the page behind it, and
      // that includes a 404: some hosts answer HEAD from a route table and
      // GET from the content. Only a GET is allowed to condemn a link.
      if (method === 'HEAD' && !response.ok) continue;

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
 * Settles the few 404s that are not a reader's problem. Everything else
 * stands: a link that does not open is a link that leads nowhere, whether the
 * page was deleted, renamed, or was never theirs to see.
 * @param {object} link The link and what the host said about it.
 * @returns {Promise<object>} The same, with the verdict softened only where it should be.
 */
async function judge(link: (typeof verdicts)[number]) {
  if (!GONE.has(link.status)) return link;

  const found = link.url.match(REPO_URL)?.groups;

  // raw.githubusercontent serves public content or nothing, and a page that
  // is not one of the two GitHub hides is a page a reader should have been
  // able to open. Neither needs the API, which is also two fewer requests
  // towards a rate limit.
  if (
    found === undefined ||
    link.url.startsWith('https://raw.') ||
    !SIGN_IN_ONLY.test(new URL(link.url).pathname)
  ) {
    return link;
  }

  const repo = `${found.owner}/${found.repo}`;
  const isPublic = await repoIsPublic(found.owner ?? '', found.repo ?? '');

  if (isPublic === undefined) {
    return {
      ...link,
      reason: `HTTP 404 on a page GitHub hides from anonymous visitors, and the API would not say whether ${repo} is public`,
      status: 0,
    };
  }

  return isPublic
    ? {
        ...link,
        reason: `HTTP 404 anonymously, but ${repo} is public and this is a page GitHub shows only to signed-in visitors`,
        status: 0,
      }
    : link;
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
