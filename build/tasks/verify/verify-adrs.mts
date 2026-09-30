/**
 * @file Verify each architecture decision record follows the log's rules.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/verify/verify-adrs
 */

import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import {
  checkIndex,
  checkRecord,
  type DecisionRecord,
  readIndex,
} from '@openinf/.github/build/adr';
import { glob, matched } from '@openinf/.github/build/utils';

const LOG = 'doc/adr';

// The README and the template are the log's own furniture, not records: the
// template is placeholders by design.
const files = await glob([
  `${LOG}/*.md`,
  `!${LOG}/README.md`,
  `!${LOG}/template.md`,
]);

if (matched(files, `${LOG}/*.md`)) {
  const records: DecisionRecord[] = [];
  const problems: string[] = [];

  for (const file of files.sort()) {
    const checked = checkRecord(basename(file), await readFile(file, 'utf8'));

    problems.push(...checked.problems.map((problem) => `${file}: ${problem}`));

    if (checked.record) records.push(checked.record);
  }

  // Only once every record reads cleanly: an index compared against records
  // that could not be read would repeat each of their problems as its own.
  if (problems.length === 0) {
    const index = readIndex(await readFile(`${LOG}/README.md`, 'utf8'));

    problems.push(
      ...checkIndex(records, index).map(
        (problem) => `${LOG}/README.md: ${problem}`
      )
    );
  }

  if (problems.length > 0) {
    console.error(
      `${problems.join('\n')}\n\nThe rules are in ${LOG}/README.md.`
    );
    process.exitCode = 1;
  }
}
