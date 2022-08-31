import yarnpkgShell from '@yarnpkg/shell';

let code = 0;
const scripts = [
  `npx eslint --ext=.*.toml,.toml .`, // validate
  `npx prettier -c {.*.toml,*.toml}`, // style-check
];

scripts.forEach(async (v, i) => {
  code = await yarnpkgShell.execute(scripts[i]);
  process.exitCode = code > 0 ? code : 0;
});
