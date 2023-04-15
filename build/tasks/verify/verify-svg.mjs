// import { execute } from '@yarnpkg/shell';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('verify-svg', import.meta.url);

// TODO(DerekNonGeneric): Implement this task.
process.exitCode = 0;
