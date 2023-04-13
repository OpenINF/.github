import { execute } from '@yarnpkg/shell';
import { $ } from 'zx';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('verify.ts', import.meta.url);

const TypeScriptObject =
  await $`bundle exec github-linguist --breakdown --json | jq '.TypeScript.files'`;
const TypeScriptFiles = JSON.parse(TypeScriptObject.stdout);

let exitCode = 0;
const scripts = [
  `eslint ${TypeScriptFiles.join(' ')}`, // validate & style-check
];

for await (const element of scripts) {
  try {
    exitCode = await execute(element);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
