import yarnpkgShell from '@yarnpkg/shell';

process.exitCode = await yarnpkgShell.execute("ec -config '.ecrc'");
