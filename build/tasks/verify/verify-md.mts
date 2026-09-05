/**
 * @file Verify Markdown files are valid & adhere to checkable style guidelines.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/verify/verify-md
 */

import { exec, glob, quote } from '@openinf/.github/build/utils';

const markdownFiles = await glob([
  '**/*.md',
  '!lib/',
  '!node_modules/',
  // Other people's words, reproduced verbatim.
  '!**/COPYING.md',
  '!LICENSE/',
]);

let exitCode = 0;
const scripts = [
  `prettier --check ${quote(markdownFiles)}`,
  `markdownlint-cli2 ${quote(markdownFiles)}`,
  `remark -f --silently-ignore ${quote(markdownFiles)}`,
];

for (const element of scripts) {
  exitCode = await exec(element);

  if (exitCode !== 0) process.exitCode = exitCode;
}
