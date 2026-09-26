/**
 * @file Common Build Task Utilities.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/utils
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { spawnSync } from 'node:child_process';
import { glob as nodeGlob } from 'node:fs/promises';
import { join as pathJoin, relative as pathRelative } from 'node:path';
import { catchWrap } from '@isaacs/catcher';
import { execute } from '@yarnpkg/shell';

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

export const exec = catchWrap(execute, 99);

/**
 * Quotes paths for the shell `exec` runs them through. Every task builds its
 * command as one string, so a path is shell text by the time the tool sees it
 * -- a space in a filename splits one argument into two, and a `$(...)` or a
 * `;` in one is a command of somebody else's choosing running in CI. Names
 * like that are what `verify.filenames` exists to catch, but it cannot be the
 * guard here: it is one task among the rest, and a failing one does not stop
 * the others from being handed what it just objected to.
 *
 * Single quotes, because inside them a shell expands nothing at all. The one
 * character they cannot hold is a single quote, which is why an embedded one
 * closes the run, escapes itself, and opens the next.
 * @param {string | string[]} paths The paths to pass to a command.
 * @returns {string} Them, quoted and joined by spaces, ready to interpolate.
 */
export const quote = (paths: string | string[]) =>
  [paths]
    .flat()
    .map((path) => {
      // Quoting settles what the shell does with a name and nothing about
      // what the tool then makes of it: `'--write.md'` arrives at prettier as
      // `--write.md`, which it reads as an option. It answered that one by
      // printing an error and exiting 0 -- a check that passed having checked
      // nothing. A leading `./` says the argument is a path and costs a
      // relative name two characters.
      const safe = path.startsWith('-') ? `./${path}` : path;

      return `'${safe.replaceAll("'", "'\\''")}'`;
    })
    .join(' ');

/**
 * Says whether a task has anything to work on, and objects when it has not.
 *
 * A tool handed no files does not fail. `prettier --check` with an empty
 * argument list prints `No parser and no file path given` and exits 0;
 * `node --test` given a pattern matching nothing exits 0 having run no tests.
 * Either way the task reports success over nothing, which is the one answer a
 * check must never give -- a glob that stopped matching, because a directory
 * was renamed or an extension changed, would go green for ever.
 *
 * `verify.unit` has guarded itself this way from the start. This is the same
 * guard, said once.
 *
 * A project that genuinely has none of a kind should delete the task rather
 * than leave it matching nothing. Deleting it is how a repository says so out
 * loud, and this is what makes staying quiet impossible.
 * @param {string[]} files What the glob found.
 * @param {string} what The patterns it looked for, named in the complaint.
 * @returns {boolean} Whether there is anything to check.
 */
export function matched(files: string[], what: string) {
  if (files.length > 0) return true;

  console.error(
    `Nothing matched ${what}. A check that read no files has not passed; if this project has none, delete the task rather than let it report success over an empty list.`
  );
  process.exitCode = 1;

  return false;
}

/**
 * Expands a trailing-slash directory pattern (e.g. `lib/`) to cover
 * everything beneath it. On its own, a trailing slash matches just the one
 * directory entry, which is never what a build task means by naming a
 * directory.
 * @param {string} pattern The glob pattern to expand.
 * @returns {string} The pattern, expanded if it named a bare directory.
 */
const expandDirPattern = (pattern: string) =>
  pattern.endsWith('/') ? `${pattern}**` : pattern;

/**
 * Widens a pattern so that wildcards also match dot-prefixed names. Neither
 * `*` nor `**` will do so on its own, which quietly kept every dot-config
 * file out of the checks: `**` walked past `.github/`, and `*.mjs` never saw
 * `.remarkrc.mjs`. Brace alternation is the way back in -- one alternative
 * for descending through a dot directory, one for the dot file itself.
 *
 * A dot directory nested inside another (`.a/.b/`) is past what the syntax
 * can express; there is none here, and one would have to be named outright.
 * @param {string} pattern The glob pattern to widen.
 * @returns {string[]} Patterns which between them match what the one did, dot names included.
 */
const expandDotPattern = (pattern: string) => {
  const segments = pattern.split('/');
  const widened = segments
    .map((segment, index) => {
      if (segment === '**') return '{**,**/.*/**}';

      // Only the basename decides whether a match is a dot file; a wildcard
      // in the middle of the path is a directory name, covered above.
      const isBasename = index === segments.length - 1;

      return isBasename && segment.startsWith('*') ? `{,.}${segment}` : segment;
    })
    .join('/');

  // A pattern whose own tail is `**` -- which is what naming a directory
  // expands to -- has no basename segment to have been widened, so the dot
  // files directly beneath it need a pattern of their own.
  return segments.at(-1) === '**'
    ? [widened, `${segments.slice(0, -1).join('/')}/**/{,.}*`]
    : [widened];
};

/**
 * Matches files by glob pattern, `globby`-style. Three of globby's
 * conveniences that `fs.promises.glob` lacks are reproduced here:
 * `!`-prefixed patterns act as exclusions (the native API takes those as a
 * separate option), wildcards match dot-prefixed names, and only files are
 * returned (the native API yields directories alongside them).
 * @param {string | string[]} patterns Glob patterns to include, optionally mixed with `!`-prefixed patterns to exclude.
 * @returns {Promise<string[]>} The matched file paths, relative to the cwd.
 */
export async function glob(patterns: string | string[]) {
  const include = [];
  // Matching dot names is what puts these in reach of a plain `**`, and no
  // task has any business reading either. Excluded directories are pruned
  // whole, dot entries included, so callers need not widen their own
  // exclusions.
  //
  // `.pnpm-store/` is the package store, which lives in the project because
  // the home directory is on another filesystem and hard links cannot cross
  // one. It holds other people's files, including the copy of pnpm that
  // `packageManager` asks for, so a check that reads it is checking the
  // registry rather than this repository.
  const exclude = ['.git/**', '.pnpm-store/**'];

  for (const pattern of [patterns].flat()) {
    if (pattern.startsWith('!')) {
      exclude.push(expandDirPattern(pattern.slice(1)));
    } else {
      include.push(...expandDotPattern(expandDirPattern(pattern)));
    }
  }

  const entries = await Array.fromAsync(
    nodeGlob(include, { exclude, withFileTypes: true })
  );

  // Callers join these into shell commands like `prettier --write <paths>`,
  // where a directory argument would make the tool recurse and quietly undo
  // the exclusions above — so drop directories, and rebuild the cwd-relative
  // strings that matching with `withFileTypes` traded away.
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) =>
      pathRelative(process.cwd(), pathJoin(entry.parentPath, entry.name))
    );
}

/**
 * Says what prettier would change, as a diff, for the files it would change.
 *
 * `prettier --check` names a file and nothing else. Whoever reads that in a
 * CI log is left to reproduce the run to learn whether it objected to a line
 * that ran long, a list marker or a table, and a contributor who cannot run
 * the tools locally has no way to learn it at all. The diff answers that on
 * the spot, the same way a reviewer would: here is the line, here is what it
 * should be.
 *
 * Tools are run without a shell, so a path reaches them as one argument
 * whatever it contains; only the leading `./` that `quote` adds, for a name
 * that would read as an option, is still needed.
 * @param {string[]} files The files the check was handed.
 * @returns {string} A unified diff per file prettier would change, or nothing.
 */
export function formattingFixes(files: string[]) {
  const paths = files.map((path) =>
    path.startsWith('-') ? `./${path}` : path
  );
  const listed = spawnSync('prettier', ['--list-different', ...paths], {
    encoding: 'utf8',
  });
  const changed = (listed.stdout ?? '').split('\n').filter(Boolean);
  let fixes = '';

  for (const path of changed) {
    const formatted = spawnSync('prettier', [path], { encoding: 'utf8' });

    // A file prettier cannot parse has no formatted version to compare, and
    // the check already printed why.
    if (formatted.status !== 0) continue;

    const diff = spawnSync(
      'diff',
      ['-u', '--label', path, '--label', `${path} (formatted)`, path, '-'],
      { encoding: 'utf8', input: formatted.stdout }
    );

    fixes += diff.stdout ?? '';
  }

  return fixes;
}

/**
 * Prints what prettier would change, after a check of those files failed.
 * @param {string[]} files The files the check was handed.
 */
export function reportFormattingFixes(files: string[]) {
  const fixes = formattingFixes(files);

  if (fixes === '') return;

  console.error(
    `\nWhat prettier would change (\`nps format.all\` applies it):\n\n${fixes}`
  );
}
