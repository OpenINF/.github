/**
 * @file Format Markdown files to adhere to autofixable style guidelines.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/format/format-md
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
  `prettier --write ${quote(markdownFiles)}`,
  `markdownlint-cli2 --fix ${quote(markdownFiles)}`,
];

for (const element of scripts) {
  exitCode = await exec(element);

  if (exitCode !== 0) process.exitCode = exitCode;
}
