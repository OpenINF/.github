/**
 * @file Tests for checking records in the decision log.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/shared/adr.test
 */

import { deepStrictEqual, match, ok, strictEqual } from 'node:assert/strict';
import { describe, test } from 'node:test';
import { checkIndex, checkRecord, readIndex } from '@openinf/.github/build/adr';

const FILE = '0005-decision-for-something.md';

/** A key the naming convention would object to written as a literal. */
const ADR_NAME = 'adr_name';

const record = ({
  front = {},
  body = '## Problem Statement\n\nWhy.\n\n## Decision\n\nThis.\n',
}: {
  front?: { [key: string]: string | undefined };
  body?: string;
} = {}) => {
  const fields: { [key: string]: string | undefined } = {
    [ADR_NAME]: 'ADR 0005',
    title: 'Decision for Something',
    date: '2026-01-01T09:00:00-08:00',
    updated: '2026-01-02T09:00:00-08:00',
    status: 'Proposed',
    ...front,
  };
  const yaml = Object.entries(fields)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  return `---\n${yaml}\n---\n\n${body}`;
};

const problemsOf = (text: string, fileName = FILE) =>
  checkRecord(fileName, text).problems;

describe('checkRecord', () => {
  test('accepts a record that follows the template', () => {
    const checked = checkRecord(FILE, record());

    deepStrictEqual(checked.problems, []);
    deepStrictEqual(checked.record, {
      number: '0005',
      title: 'Decision for Something',
      status: 'Proposed',
    });
  });

  test('rejects the space-separated date Jekyll accepts', () => {
    const [problem] = problemsOf(
      record({ front: { date: '2026-01-01 09:00:00 -0800' } })
    );

    match(problem ?? '', /`date`.*RFC 3339/);
  });

  test('rejects a timestamp with no offset', () => {
    strictEqual(
      problemsOf(record({ front: { updated: '2026-01-02T09:00:00' } })).length,
      1
    );
  });

  test('accepts UTC written as Z', () => {
    deepStrictEqual(
      problemsOf(record({ front: { updated: '2026-01-02T17:00:00Z' } })),
      []
    );
  });

  test('rejects a date that does not exist', () => {
    match(
      problemsOf(record({ front: { date: '2026-02-30T09:00:00-08:00' } }))[0] ??
        '',
      /not a date that exists/
    );
  });

  test('rejects an update before the record was written', () => {
    deepStrictEqual(
      problemsOf(record({ front: { updated: '2025-12-31T09:00:00-08:00' } })),
      ['`updated` is earlier than `date`']
    );
  });

  test('wants every key', () => {
    match(
      problemsOf(record({ front: { status: undefined } }))[0] ?? '',
      /no `status`/
    );
  });

  test('wants no other key', () => {
    match(
      problemsOf(record({ front: { author: 'Somebody' } }))[0] ?? '',
      /`author`/
    );
  });

  test('wants the name to match the number', () => {
    match(
      problemsOf(record({ front: { [ADR_NAME]: 'ADR 0006' } }))[0] ?? '',
      /number 0005/
    );
  });

  test('wants a known status', () => {
    match(
      problemsOf(record({ front: { status: 'Accepted' } }))[0] ?? '',
      /not one of/
    );
  });

  test('wants a numbered, kebab-case file name', () => {
    match(problemsOf(record(), '5-Something.md')[0] ?? '', /NNNN-slug/);
  });

  test('wants a decision', () => {
    deepStrictEqual(
      problemsOf(record({ body: '## Problem Statement\n\nWhy.\n' })),
      ['there is no “Decision” heading']
    );
  });

  test('wants the template headings in the template order', () => {
    match(
      problemsOf(
        record({ body: '## Decision\n\nThis.\n\n## Context\n\nThat.\n' })
      )[0] ?? '',
      /“Context” comes after “Decision”/
    );
  });

  test('wants the template headings at the template levels', () => {
    match(
      problemsOf(
        record({
          body: '## Context\n\n## Alternatives Considered\n\n## Decision\n',
        })
      )[0] ?? '',
      /level 2 heading; the template has it at level 3/
    );
  });

  test('lets a record add headings of its own', () => {
    deepStrictEqual(
      problemsOf(
        record({ body: '## Context\n\n### Costs\n\n## Decision\n\nThis.\n' })
      ),
      []
    );
  });

  test('reads a heading with a closing sequence', () => {
    deepStrictEqual(
      problemsOf(record({ body: '## Decision ##\n\nThis.\n' })),
      []
    );
  });

  test('keeps a closing # that is part of the text', () => {
    deepStrictEqual(problemsOf(record({ body: '## Decision#\n\nThis.\n' })), [
      'there is no “Decision” heading',
    ]);
  });

  test('reads a long line of spaces quickly', () => {
    const started = performance.now();

    problemsOf(record({ body: `## Decision\n\n#${' '.repeat(50_000)}x\n` }));
    ok(performance.now() - started < 1000);
  });

  test('ignores a heading inside a code fence', () => {
    deepStrictEqual(
      problemsOf(record({ body: '## Decision\n\n```md\n## Context\n```\n' })),
      []
    );
  });

  test('wants front matter', () => {
    deepStrictEqual(problemsOf('## Decision\n'), [
      'there is no front matter between `---` lines at the top',
    ]);
  });
});

describe('checkIndex', () => {
  const readme = [
    '| ADR      | Title | Status   |',
    '| -------- | ----- | -------- |',
    '| [0001][] | One   | Final    |',
    '| [0002][] | Two   | Approved |',
  ].join('\n');

  test('accepts an index that matches the records', () => {
    deepStrictEqual(
      checkIndex(
        [
          { number: '0001', title: 'One', status: 'Final' },
          { number: '0002', title: 'Two', status: 'Approved' },
        ],
        readIndex(readme)
      ),
      []
    );
  });

  test('notices a title or status that drifted', () => {
    deepStrictEqual(
      checkIndex(
        [
          { number: '0001', title: 'Uno', status: 'Final' },
          { number: '0002', title: 'Two', status: 'Superseded' },
        ],
        readIndex(readme)
      ),
      [
        'the README lists ADR 0001 as “One”, but its title is “Uno”',
        'the README gives ADR 0002 the status Approved, but the record says Superseded',
      ]
    );
  });

  test('notices a record listed twice', () => {
    deepStrictEqual(
      checkIndex(
        [
          { number: '0001', title: 'One', status: 'Final' },
          { number: '0002', title: 'Two', status: 'Approved' },
        ],
        readIndex(`${readme}\n| [0001][] | One   | Final    |`)
      ),
      ['the README lists ADR 0001 2 times']
    );
  });

  test('notices a record missing from the index, and one with no record', () => {
    deepStrictEqual(
      checkIndex(
        [
          { number: '0001', title: 'One', status: 'Final' },
          { number: '0003', title: 'Three', status: 'Proposed' },
        ],
        readIndex(readme)
      ),
      [
        'ADR 0003 is not listed in the README',
        'the README lists ADR 0002, which has no record',
        'ADR 0003 follows ADR 0001; the log is numbered without gaps from 0001',
      ]
    );
  });
});
