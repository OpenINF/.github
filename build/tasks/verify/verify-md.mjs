import yarnpkgShell from '@yarnpkg/shell';

let code = 0;
const scripts = [
//  `eslint --ext=.md .`, // validate & style-check JS code blocks
  `prettier -c **/*{.*.md,.md}`, // style-check
  `markdownlint-cli2 "**/**.md" "#node_modules" "#vendor"`, // validate Markdown
  `remark -qf .`, // check Markdown style
];

scripts.forEach(async (v, i) => {
  code = await yarnpkgShell.execute(scripts[i]);
  process.exitCode = code > 0 ? code : 0;
});
