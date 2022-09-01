import yarnpkgShell from '@yarnpkg/shell';

process.exitCode = await yarnpkgShell.execute(
  `npx eslint --ext=.d.ts,.ts,.cts,.mts .`
);
