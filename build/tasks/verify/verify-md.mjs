import { execute } from '@yarnpkg/shell';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('verify.md', import.meta.url);

let exitCode = 0;
const scripts = [
  // validate Markdown
  'markdownlint-cli2 "**/**.md" "#node_modules" "#vendor"',
];

for (const element of scripts) {
  try {
    exitCode = await execute(element);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
