import { execute } from '@yarnpkg/shell';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('verify.yaml', import.meta.url);

let exitCode = 0;
const scripts = [
  'prettier -c {.*.yml,.*.yaml,*.yml,*.yaml}', // style-check
  'eslint --ext=.yml,.yaml', // validate & style-check
];

for await (const element of scripts) {
  try {
    exitCode = await execute(element);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
