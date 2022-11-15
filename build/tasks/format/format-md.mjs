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
    } Running script called ${text.curlyQuote('format.md')}, which executes ${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(6, ' ') +
      text.curlyQuote('node build/tasks/format/format-md.mjs') +
      newLineMarker
    }`
  )
);

let code = 0;
const scripts = [
  'eslint --ext=.md --fix', // validate & style-check JS/TS code blocks in Markdown
  'prettier --write **/*{.*.md,.md}', // style-check
  'markdownlint-cli2-fix "**/**.md" "#node_modules" "#vendor"', // validate Markdown
];

for await (const element of scripts) {
  code = await yarnpkgShell.execute(element);
  process.exitCode = code > 0 ? code : 0;
}
