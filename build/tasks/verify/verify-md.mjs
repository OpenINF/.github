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
    } Running task called ${text.curlyQuote(
      'verify.yaml'
    )}, which executes ${
      newLineMarker +
      String(text.UnicodeEscapes.midlineEllipsis)
        .padStart(3, ' ')
        .padEnd(6, ' ') +
      text.curlyQuote('node build/tasks/verify/verify-yaml.mjs') +
      newLineMarker
    }`
  )
);

let code = 0;
const scripts = [
  'eslint --ext=.md', // validate & style-check JS/TS code blocks in Markdown
  'prettier -c **/*{.*.md,.md}', // style-check
  'markdownlint-cli2 "**/**.md" "#node_modules" "#vendor"', // validate Markdown
];

for await (const element of scripts) {
  code = await yarnpkgShell.execute(element);
  process.exitCode = code > 0 ? code : 0;
}
