import { execute } from '@yarnpkg/shell';
import { $ } from 'zx';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('verify-markdown', import.meta.url);

const MarkdownObject =
  await $`bundle exec github-linguist --breakdown --json | jq '.Markdown.files'`;
const MarkdownFiles = JSON.parse(MarkdownObject.stdout);

let exitCode = 0;
const scripts = [
  `eslint ${MarkdownFiles.join(' ')}`, // code-block style-check
  `prettier --check ${MarkdownFiles.join(' ')}`, // style-check
  // validate Markdown
  'markdownlint-cli2 "**/**.md" "#node_modules" "#vendor"',
  'remark -qf .',
];

for (const element of scripts) {
  try {
    exitCode = await execute(`pnpm exec ${element}`);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
