/**
 * @file Format Liquid templates to adhere to autofixable style guidelines.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/format/format-liquid
 */

import { exec, glob, quote } from '@openinf/.github/build/utils';

const liquidFiles = await glob([
  '**/*.html',
  '**/*.liquid',
  '!doc/_site/',
  '!lib/',
  '!node_modules/',
  '!vendor/',
]);

let exitCode = 0;
const scripts = [`prettier --write ${quote(liquidFiles)}`];

for (const element of scripts) {
  exitCode = await exec(element);

  if (exitCode !== 0) process.exitCode = exitCode;
}
