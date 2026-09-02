/**
 * @file Verify prose everywhere is spelt the way this project spells it.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/verify/verify-spelling
 */

import { exec, glob, quote } from '@openinf/.github/build/utils';

// Comments and template prose are read as often as the documentation is, and
// cspell's `en` dictionary is the American one, so this is also what holds the
// project to American spelling: a British variant is an unknown word to it.
const files = await glob([
  '**/*.{md,html,mts,mjs,json,json5,jsonc,yml,yaml,sh}',
  '!.pnpm-store/',
  '!doc/_site/',
  '!lib/',
  '!node_modules/',
  '!vendor/',
  // Other people's words, reproduced verbatim: a license is not ours to edit,
  // a lockfile is not prose, and the translated VISION files are not English.
  '!**/COPYING.md',
  '!LICENSE/',
  '!pnpm-lock.yaml',
  '!VISION.jp.md',
  '!VISION.sr_Cyr.md',
  '!VISION.sr_Latn.md',
]);

process.exitCode = await exec(`cspell lint ${quote(files)}`);
