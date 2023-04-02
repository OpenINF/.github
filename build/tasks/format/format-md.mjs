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
    } Running task called ${text.curlyQuote('format.md')}, which executes ${
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
  // validate & style-check JS/TS code blocks in Markdown
  'eslint --ext=.md --fix',
  'prettier --write **/*{.*.md,.md}', // style-check
  // validate Markdown
  'markdownlint-cli2-fix "**/**.md" "#node_modules" "#vendor"',
];

for await (const element of scripts) {
  code = await yarnpkgShell.execute(element);
  process.exitCode = code > 0 ? code : 0;
}
