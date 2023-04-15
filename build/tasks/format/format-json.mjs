import { execute } from '@yarnpkg/shell';
import { $ } from 'zx';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('format-json', import.meta.url);

const JSONObject =
  await $`bundle exec github-linguist --breakdown --json | jq '.JSON.files'`;
const JSONFiles = JSON.parse(JSONObject.stdout);

let exitCode = 0;
const scripts = [`eslint --fix ${JSONFiles.join(' ')}`];

for await (const element of scripts) {
  try {
    exitCode = await execute(`pnpm exec ${element}`);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
