import { EOL as newLineMarker } from 'node:os';

import text from '@openinf/util-text';
import yarnpkgShell from '@yarnpkg/shell';

console.log(
  text.blueify(
    `${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(5, ' ')
    } Running task named ${text.curlyQuote(
      'verify.ec-harmony'
    )}, which executes ${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(6, ' ') +
      text.curlyQuote('node build/tasks/verify/verify-ec-harmony.mjs') +
      newLineMarker
    }`
  )
);

process.exitCode = await yarnpkgShell.execute("ec -config '.ecrc.json5'");