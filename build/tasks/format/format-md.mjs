import { execute } from '@yarnpkg/shell';
import { $ } from 'zx';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('format-md', import.meta.url);

const MarkdownObject =
  await $`bundle exec github-linguist --breakdown --json | jq '.Markdown.files'`;
const MarkdownFiles = JSON.parse(MarkdownObject.stdout);

let exitCode = 0;
const scripts = [
  // fix style of JS/TS code blocks in Markdown
  `eslint --fix ${MarkdownFiles.join(' ')}`,
  'prettier --write **/*{.*.md,.md}', // Markdown fix sty;e
  // validate Markdown
  'markdownlint-cli2-fix "**/**.md" "#node_modules" "#vendor"',
];

for await (const element of scripts) {
  try {
    exitCode = await execute(`pnpm exec ${element}`);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
