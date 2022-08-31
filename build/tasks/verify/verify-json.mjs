import yarnpkgShell from '@yarnpkg/shell';

let code = 0;
const scripts = [
  `npx eslint --ext=.json,.json5,.jsonc .`, // validate
  `npx prettier -c {.*.json,.*.json5,.*.jsonc,*.json,*.json5,*.jsonc}`, // style-check
];

scripts.forEach(async (v, i) => {
  code = await yarnpkgShell.execute(scripts[i]);
  process.exitCode = code > 0 ? code : 0;
});
