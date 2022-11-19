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
    } Running task named ${text.curlyQuote('format.ts')}, which executes ${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(6, ' ') +
      text.curlyQuote('node build/tasks/format/format-ts.mjs') +
      newLineMarker
    }`
  )
);

let code = 0;
const scripts = ['eslint --ext=.ts,.cts,.mts --fix'];

for await (const element of scripts) {
  code = await yarnpkgShell.execute(element);
  process.exitCode = code > 0 ? code : 0;
}
