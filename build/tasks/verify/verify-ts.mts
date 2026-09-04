/**
 * @file Verify TypeScript files are valid & adhere to checkable style guidelines.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/verify/verify-ts
 */

import { exec, glob, quote } from '@openinf/.github/build/utils';

const tsFiles = await glob([
  '**/*.ts',
  '**/*.mts',
  '!doc/_site/',
  '!lib/',
  '!node_modules/',
  '!vendor/',
]);

let exitCode = 0;
// tsc reads its file list from tsconfig.json rather than taking one, and
// `erasableSyntaxOnly` there is what stops syntax node refuses to strip from
// reaching a task script.
const scripts = [`biome check ${quote(tsFiles)}`, 'tsc --noEmit'];

for (const element of scripts) {
  exitCode = await exec(element);

  if (exitCode !== 0) process.exitCode = exitCode;
}
