/**
 * @file Tests for how the link check answers when it had nothing to read.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/tasks/check-links.test
 */

import { deepStrictEqual, ok } from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join as pathJoin } from 'node:path';
import { describe, test } from 'node:test';

const TASK = pathJoin(import.meta.dirname, 'check-links.mts');

describe('check-links', () => {
  test('a glob that matched nothing is a run that did not happen', async () => {
    // The task globs relative to where it runs, so an empty directory is a
    // project with no prose, and nothing in it reaches the network.
    const root = await mkdtemp(pathJoin(tmpdir(), 'openinf-links-'));
    try {
      const { status, stdout } = spawnSync(process.execPath, [TASK], {
        cwd: root,
        encoding: 'utf8',
      });

      // `link-rot.yml` reads 0 to 3 as findings and anything above as the
      // task failing, and takes a non-empty stdout as a report.
      ok((status ?? 0) > 3, `exited ${status}`);
      deepStrictEqual(stdout, '');
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
