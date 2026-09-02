/**
 * @file Verify JavaScript files are valid & adhere to checkable style guidelines.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/verify/verify-js
 */

import { exec, glob, quote } from '@openinf/.github/build/utils';

const jsFiles = await glob([
  '**/*.js',
  '**/*.mjs',
  '!doc/_site/',
  '!lib/',
  '!node_modules/',
  '!vendor/',
]);

let exitCode = 0;
const scripts = [`biome check ${quote(jsFiles)}`];

for (const element of scripts) {
  exitCode = await exec(element);

  if (exitCode !== 0) process.exitCode = exitCode;
}
