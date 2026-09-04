/**
 * @file Format TypeScript files to adhere to autofixable style guidelines.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/format/format-ts
 */

import { exec, glob, quote } from '@openinf/.github/build/utils';

const tsFiles = await glob(['**/*.ts', '**/*.mts', '!lib/', '!node_modules/']);

let exitCode = 0;
const scripts = [`biome check --write ${quote(tsFiles)}`];

for (const element of scripts) {
  exitCode = await exec(element);

  if (exitCode !== 0) process.exitCode = exitCode;
}
