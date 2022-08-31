import yarnpkgShell from '@yarnpkg/shell';

process.exitCode = await yarnpkgShell.execute(
  `npx eslint --ext=.ts,.cts,.mts .`
);
