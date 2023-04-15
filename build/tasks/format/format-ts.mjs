import { execute } from '@yarnpkg/shell';
import { $ } from 'zx';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('format-ts', import.meta.url);

const TypeScriptObject =
  await $`bundle exec github-linguist --breakdown --json | jq '.TypeScript.files'`;
const TypeScriptFiles = JSON.parse(TypeScriptObject.stdout);

let exitCode = 0;
const scripts = [
  `eslint --fix ${TypeScriptFiles.join(' ')}`, // fix style
];

for await (const element of scripts) {
  try {
    exitCode = await execute(`pnpm exec ${element}`);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
