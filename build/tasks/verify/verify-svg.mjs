import { EOL as newLineMarker } from 'node:os';

import text from '@openinf/util-text';
// import yarnpkgShell from '@yarnpkg/shell';

console.log(
  text.blueify(
    `${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(5, ' ')
    } Running task named ${text.curlyQuote('verify.svg')}, which executes ${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(6, ' ') +
      text.curlyQuote('node build/tasks/verify/verify-svg.mjs') +
      newLineMarker
    }`
  )
);

// TODO(DerekNonGeneric): Implement this task.
process.exitCode = 0;