import { execute } from '@yarnpkg/shell';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('format.md', import.meta.url);

let exitCode = 0;
const scripts = [
  // validate & style-check JS/TS code blocks in Markdown
  // validate Markdown
  'markdownlint-cli2-fix "**/**.md" "#node_modules" "#vendor"',
];

for await (const element of scripts) {
  try {
    exitCode = await execute(element);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
