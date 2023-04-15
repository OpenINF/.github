import { execute } from '@yarnpkg/shell';
import { $ } from 'zx';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('format-js', import.meta.url);

const JavaScriptObject =
  await $`bundle exec github-linguist --breakdown --json | jq '.JavaScript.files'`;
const JavaScriptFiles = JSON.parse(JavaScriptObject.stdout);

let exitCode = 0;
const scripts = [`eslint --fix ${JavaScriptFiles.join(' ')}`];

for await (const element of scripts) {
  try {
    exitCode = await execute(`pnpm exec ${element}`);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
