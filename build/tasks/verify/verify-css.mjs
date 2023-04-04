import 'zx/globals';

import { EOL as newLineMarker } from 'node:os';

import text from '@openinf/util-text';

console.log(
  text.blueify(
    `${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(5, ' ')
    } Running task named ${text.curlyQuote('verify.css')}, which executes ${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(6, ' ') +
      text.curlyQuote(import.meta.url) +
      newLineMarker
    }`
  )
);

// TODO(DerekNonGeneric): Implement this task.
process.exitCode = 0;
