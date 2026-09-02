/**
 * @file Verify YAML files are valid & adhere to checkable style guidelines.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/verify/verify-yaml
 */

import { exec, glob, quote } from '@openinf/.github/build/utils';

const yamlFiles = await glob([
  '**/*.yml',
  '**/*.yaml',
  '!doc/_site/',
  '!lib/',
  '!node_modules/',
  '!vendor/',
  // Written by pnpm, not by hand.
  '!pnpm-lock.yaml',
]);

let exitCode = 0;
const scripts = [`prettier --check ${quote(yamlFiles)}`];

for (const element of scripts) {
  exitCode = await exec(element);

  if (exitCode !== 0) process.exitCode = exitCode;
}
