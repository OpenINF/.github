/**
 * @file What makes a record in the decision log a well-formed one.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/shared/adr
 */

import { parse } from 'yaml';

/** The front matter every record carries, and nothing else. */
export const KEYS = ['adr_name', 'title', 'date', 'updated', 'status'];

/** Where a decision can stand. */
export const STATUSES = ['Proposed', 'Approved', 'Final', 'Superseded'];

/**
 * The template's headings, in the template's order and at its levels. A
 * record may drop any of them and add its own, but the ones it keeps stay
 * where the template put them, so every record reads in the same order.
 */
export const HEADINGS: [level: number, text: string][] = [
  [2, 'Problem Statement'],
  [2, 'Context'],
  [3, 'Exemplary Prior Art'],
  [3, 'Alternatives Considered'],
  [2, 'Decision'],
  [2, 'Results'],
  [2, 'Next Steps'],
];

/** The one heading no record can drop: without it there is no decision. */
const REQUIRED_HEADING = 'Decision';

/** `NNNN-kebab-case-slug.md`. */
const FILE_NAME = /^(?<number>\d{4})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;

/**
 * An RFC 3339 timestamp with its offset written out. A time without an
 * offset is a different instant depending on who reads it.
 */
const RFC_3339 =
  /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;

const FRONT_MATTER = /^---\n(?<yaml>[\s\S]*?)\n---\n/;

/** The first cell of a row in the log's index: `[0001][]`. */
const INDEX_NUMBER = /^\[(?<number>\d{4})\]\[\]$/;

const FENCE = /^\s*(?:```|~~~)/;

/** What the log's index says about one record. */
export interface Listing {
  title: string;
  status: string;
}

/** What a record says about itself, once it has been read. */
export interface DecisionRecord {
  number: string;
  title: string;
  status: string;
}

/**
 * Reads an ATX heading, or says the line is not one. Done by hand rather than
 * by one regular expression: the optional closing `#`s and the whitespace
 * around them make any single pattern for it backtrack in quadratic time on a
 * line of spaces.
 * @param {string} line One line of the record.
 * @returns {[number, string] | undefined} The heading's level and text.
 */
const headingOf = (line: string): [number, string] | undefined => {
  let level = 0;

  while (line[level] === '#') level += 1;

  if (level === 0 || level > 6) return undefined;

  const rest = line.slice(level);

  if (rest !== '' && rest[0] !== ' ' && rest[0] !== '\t') return undefined;

  let text = rest.trim();
  let end = text.length;

  while (text[end - 1] === '#') end -= 1;

  const closed = text.slice(0, end);

  // A closing sequence counts only when whitespace separates it from the
  // text; `# C#` is a heading about C#.
  if (closed === '' || closed.endsWith(' ') || closed.endsWith('\t')) {
    text = closed.trim();
  }

  return text === '' ? undefined : [level, text];
};

/**
 * Reads a record's headings, leaving out anything inside a code fence.
 * @param {string} body The record below its front matter.
 * @returns {[number, string][]} Each heading's level and text, in order.
 */
const headingsOf = (body: string) => {
  const headings: [number, string][] = [];
  let fenced = false;

  for (const line of body.split('\n')) {
    if (FENCE.test(line)) {
      fenced = !fenced;
      continue;
    }

    const heading = fenced ? undefined : headingOf(line);

    if (heading) headings.push(heading);
  }

  return headings;
};

/**
 * Checks a timestamp is RFC 3339 and names an instant that exists.
 * @param {string} key Which key it came from, for the complaint.
 * @param {unknown} value What the key held.
 * @returns {string[]} What is wrong with it, if anything.
 */
const checkTimestamp = (key: string, value: unknown) => {
  if (typeof value !== 'string' || !RFC_3339.test(value)) {
    return [
      `\`${key}\` is ${JSON.stringify(value)}; write it as an RFC 3339 timestamp, such as 2026-01-01T09:00:00-08:00`,
    ];
  }

  // `Date.parse` rolls 30 February over into March rather than refusing it,
  // so the fields are checked against the date they build instead.
  const { year, month, day, hour, minute, second } =
    RFC_3339.exec(value)?.groups ?? {};
  const built = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day))
  );

  if (
    built.getUTCFullYear() !== Number(year) ||
    built.getUTCMonth() !== Number(month) - 1 ||
    built.getUTCDate() !== Number(day) ||
    Number(hour) > 23 ||
    Number(minute) > 59 ||
    Number(second) > 59
  ) {
    return [`\`${key}\` is ${value}, which is not a date that exists`];
  }

  return [];
};

/**
 * Checks one record against the rules in `doc/adr/README.md`.
 * @param {string} fileName The record's file name, without its directory.
 * @param {string} text The record.
 * @returns {{ problems: string[], record?: DecisionRecord }} What is wrong, and what it says about itself when that could be read.
 */
export function checkRecord(fileName: string, text: string) {
  const problems: string[] = [];
  const number = FILE_NAME.exec(fileName)?.groups?.number;

  if (number === undefined) {
    problems.push(
      'the file is not named `NNNN-slug.md`, with a four-digit number and a kebab-case slug'
    );
  }

  const frontMatter = FRONT_MATTER.exec(text);

  if (!frontMatter?.groups) {
    problems.push('there is no front matter between `---` lines at the top');

    return { problems };
  }

  let data: unknown;

  try {
    data = parse(frontMatter.groups.yaml ?? '');
  } catch (error) {
    problems.push(`the front matter is not YAML: ${(error as Error).message}`);

    return { problems };
  }

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    problems.push('the front matter is not a set of keys');

    return { problems };
  }

  const fields = data as { [key: string]: unknown };

  for (const key of KEYS) {
    if (!(key in fields)) problems.push(`the front matter has no \`${key}\``);
  }

  for (const key of Object.keys(fields)) {
    if (!KEYS.includes(key)) {
      problems.push(
        `the front matter has \`${key}\`, which is not one of ${KEYS.map((k) => `\`${k}\``).join(', ')}`
      );
    }
  }

  if (number !== undefined && 'adr_name' in fields) {
    if (fields.adr_name !== `ADR ${number}`) {
      problems.push(
        `\`adr_name\` is ${JSON.stringify(fields.adr_name)}, but the file is number ${number}`
      );
    }
  }

  if ('title' in fields) {
    if (typeof fields.title !== 'string' || fields.title.trim() === '') {
      problems.push('`title` is empty');
    }
  }

  if ('status' in fields && !STATUSES.includes(fields.status as string)) {
    problems.push(
      `\`status\` is ${JSON.stringify(fields.status)}, which is not one of ${STATUSES.join(', ')}`
    );
  }

  const dateProblems =
    'date' in fields ? checkTimestamp('date', fields.date) : [];
  const updatedProblems =
    'updated' in fields ? checkTimestamp('updated', fields.updated) : [];

  problems.push(...dateProblems, ...updatedProblems);

  if (
    dateProblems.length === 0 &&
    updatedProblems.length === 0 &&
    'date' in fields &&
    'updated' in fields &&
    Date.parse(fields.updated as string) < Date.parse(fields.date as string)
  ) {
    problems.push('`updated` is earlier than `date`');
  }

  const body = text.slice(frontMatter[0].length);
  const headings = headingsOf(body);
  let position = 0;

  for (const [level, heading] of headings) {
    const index = HEADINGS.findIndex(([, known]) => known === heading);

    if (index === -1) continue;

    const expectedLevel = HEADINGS[index]?.[0];

    if (level !== expectedLevel) {
      problems.push(
        `“${heading}” is a level ${level} heading; the template has it at level ${expectedLevel}`
      );
    }

    if (index < position) {
      problems.push(
        `“${heading}” comes after “${HEADINGS[position]?.[1]}”; the template puts it before`
      );
    } else {
      position = index;
    }
  }

  if (!headings.some(([, heading]) => heading === REQUIRED_HEADING)) {
    problems.push(`there is no “${REQUIRED_HEADING}” heading`);
  }

  if (number === undefined || problems.length > 0) return { problems };

  return {
    problems,
    record: {
      number,
      title: fields.title as string,
      status: fields.status as string,
    },
  };
}

/**
 * Reads the index table in the log's README.
 * @param {string} text The README.
 * @returns {Map<string, Listing[]>} Each row's title and status, by number. A number listed twice keeps both rows, so the check can say so rather than one row silently replacing the other.
 */
export function readIndex(text: string) {
  const listings = new Map<string, Listing[]>();

  for (const line of text.split('\n')) {
    const row = line.trim();

    if (!(row.startsWith('|') && row.endsWith('|'))) continue;

    const [first, title, status] = row
      .slice(1, -1)
      .split('|')
      .map((cell) => cell.trim());
    const number = INDEX_NUMBER.exec(first ?? '')?.groups?.number;

    if (number !== undefined && title !== undefined) {
      const rows = listings.get(number) ?? [];

      rows.push({ title, status: status ?? '' });
      listings.set(number, rows);
    }
  }

  return listings;
}

/**
 * Checks the index lists exactly the records there are, as they describe
 * themselves.
 * @param {DecisionRecord[]} records The records, as read.
 * @param {Map<string, Listing[]>} index The README's table.
 * @returns {string[]} Where the two disagree.
 */
export function checkIndex(
  records: DecisionRecord[],
  index: Map<string, Listing[]>
) {
  const problems: string[] = [];
  const numbers = new Set(records.map(({ number }) => number));

  for (const { number, title, status } of records) {
    const rows = index.get(number) ?? [];
    const [listing] = rows;

    if (listing === undefined) {
      problems.push(`ADR ${number} is not listed in the README`);
      continue;
    }

    if (rows.length > 1) {
      problems.push(`the README lists ADR ${number} ${rows.length} times`);
      continue;
    }

    if (listing.title !== title) {
      problems.push(
        `the README lists ADR ${number} as “${listing.title}”, but its title is “${title}”`
      );
    }

    if (listing.status !== status) {
      problems.push(
        `the README gives ADR ${number} the status ${listing.status}, but the record says ${status}`
      );
    }
  }

  for (const number of index.keys()) {
    if (!numbers.has(number)) {
      problems.push(`the README lists ADR ${number}, which has no record`);
    }
  }

  const sorted = [...numbers].sort();

  for (const [position, number] of sorted.entries()) {
    const expected = String(position + 1).padStart(4, '0');

    if (number !== expected) {
      problems.push(
        `ADR ${number} follows ADR ${sorted[position - 1] ?? 'nothing'}; the log is numbered without gaps from 0001`
      );
      break;
    }
  }

  return problems;
}
