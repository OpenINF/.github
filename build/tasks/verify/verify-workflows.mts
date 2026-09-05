/**
 * @file Verify the workflows pin what they run to something immutable.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/verify/verify-workflows
 *
 * Two of these files say "Actions are pinned by commit, never by tag" and
 * nothing has been checking it. A tag is a name its owner can move, so an
 * action referenced by one is code that can change under a workflow holding a
 * token -- which for `commit-queue.yml` is a token that can merge.
 *
 * Read as text rather than as parsed YAML on purpose: the version a commit
 * belongs to lives in a trailing comment, which parsing throws away, and that
 * comment is both how a reader knows what is pinned and how renovate knows
 * what to move it to.
 */

import { readFile } from 'node:fs/promises';
import { glob } from '@openinf/.github/build/utils';

/** `uses: owner/repo[/path]@ref`, with whatever trails it on the line. */
const USES = /^\s*-?\s*uses:\s*(?<action>[^@\s]+)@(?<ref>\S+)(?<rest>.*)$/;

/** `image: name@sha256:…`, or a tag where a digest belongs. */
const IMAGE = /^\s*image:\s*(?<image>\S+)(?<rest>.*)$/;

/** What a commit looks like, and nothing else does. */
const COMMIT = /^[0-9a-f]{40}$/;

/** A digest, which is how an image is named immutably. */
const DIGEST = /^[^:]+@sha256:[0-9a-f]{64}$/;

/** The trailing comment naming what the pin is, as `# v4.1.2` or `# latest`. */
const VERSION_COMMENT = /#\s*\S+/;

const files = await glob(['.github/workflows/*.yml']);
const problems: string[] = [];

for (const file of files) {
  const text = await readFile(file, 'utf8');

  for (const [index, line] of text.split('\n').entries()) {
    const where = `${file}:${index + 1}`;
    const uses = line.match(USES)?.groups;

    if (uses !== undefined) {
      // A path inside this repository is not a third party and has no commit
      // of its own to name.
      if (uses.action?.startsWith('./')) continue;

      if (COMMIT.test(uses.ref ?? '')) {
        if (!VERSION_COMMENT.test(uses.rest ?? '')) {
          problems.push(
            `${where}: ${uses.action} is pinned to a commit with no trailing comment saying which version that is. Nobody can read the pin, and renovate has nothing to move.`
          );
        }
      } else {
        problems.push(
          `${where}: ${uses.action} is pinned to "${uses.ref}", which is a tag or a branch. A tag can be moved by whoever owns it; a commit cannot.`
        );
      }

      continue;
    }

    const image = line.match(IMAGE)?.groups;

    if (image !== undefined && !DIGEST.test(image.image ?? '')) {
      problems.push(
        `${where}: the container image "${image.image}" is not pinned to a digest. A tag is a name its owner can repoint at other code.`
      );
    }
  }
}

if (problems.length > 0) {
  console.error('Workflows run code that could change underneath them:\n');
  for (const problem of problems) console.error(`  ${problem}`);
  process.exitCode = 1;
} else {
  console.log(
    `Checked ${files.length} workflow${files.length === 1 ? '' : 's'}; everything they run is pinned to a commit or a digest.`
  );
}
