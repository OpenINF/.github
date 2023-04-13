// import { execute } from '@yarnpkg/shell';
// import { $ } from 'zx';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('format.toml', import.meta.url);

// const TOMLObject =
//   await $`bundle exec github-linguist --breakdown --json | jq '.TOML.files'`;
// const TOMLFiles = JSON.parse(TOMLObject.stdout);

// let exitCode = 0;
// const scripts = [
//   `eslint --fix ${TOMLFiles.join(' ')}`, // validate & style-check
// ];

// for await (const element of scripts) {
//   try {
//     exitCode = await execute(element);
//   } catch (p) {
//     exitCode = p.exitCode;
//   }
//   process.exitCode = exitCode > 0 ? exitCode : 0;
// }

// TODO(DerekNonGeneric): Implement this task.
process.exitCode = 0;
