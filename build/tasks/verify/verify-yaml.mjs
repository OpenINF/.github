import { execute } from '@yarnpkg/shell';
import { $ } from 'zx';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('verify-yaml', import.meta.url);

const YAMLObject =
  await $`bundle exec github-linguist --breakdown --json | jq '.YAML.files'`;
const YAMLFiles = JSON.parse(YAMLObject.stdout);

let exitCode = 0;
const scripts = [
  `eslint ${YAMLFiles.join(' ')}`, // validate & style-check
];

for await (const element of scripts) {
  try {
    exitCode = await execute(`pnpm exec ${element}`);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}

// eslint-disable-next-line unicorn/no-process-exit
process.exit(exitCode);
