import 'zx/globals';

import { EOL as newLineMarker } from 'node:os';

import text from '@openinf/util-text';
import { execute } from '@yarnpkg/shell';

console.log(
  text.blueify(
    `${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(5, ' ')
    } Running task named ${text.curlyQuote('verify.js')}, which executes ${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(6, ' ') +
      text.curlyQuote(import.meta.url) +
      newLineMarker
    }`
  )
);

let exitCode = 0;
const scripts = [
  // TODO(DerekNonGeneric): Ensure that the files indeed build.
  'eslint --ext=.js,.cjs,.mjs',
];

for await (const element of scripts) {
  try {
    exitCode = await execute(element);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
