import { execute } from '@yarnpkg/shell';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('verify.json', import.meta.url);

let exitCode = 0;
const scripts = [
  'eslint --ext=.json,.json5,.jsonc', // validate
  // style-check
  'prettier -c {.*.json,.*.json5,.*.jsonc,*.json,*.json5,*.jsonc}',
];

for await (const element of scripts) {
  try {
    exitCode = await execute(element);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
