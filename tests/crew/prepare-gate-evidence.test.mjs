import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// 2026-W47 M1: briefs spell the course in lowercase, so the CLI must accept it.
// Unit 99 never resolves, so these runs stop at validation and never run the gates
// or write evidence.
const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const run = (...args) => spawnSync(process.execPath, ['scripts/prepare-gate-evidence.mjs', ...args], {
  cwd: repo, encoding: 'utf8', env: { ...process.env, CONTENT_ROOT: repo },
});

test('a lowercase course code passes the course validation like the uppercase form', () => {
  for (const course of ['efmp-301', 'EFMP-301']) {
    const r = run(course, '99');
    assert.equal(r.status, 1);
    assert.doesNotMatch(r.stderr, /invalid unit or stage/);
    assert.match(r.stderr, /unit must resolve to exactly one English directory/);
  }
});

test('a malformed course code is still rejected', () => {
  const r = run('efmp301', '1');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /invalid unit or stage/);
});

test('missing arguments still print the usage line', () => {
  const r = run();
  assert.equal(r.status, 1);
  assert.match(r.stderr, /usage: prepare-gate-evidence COURSE UNIT \| --refresh-stale/);
});
