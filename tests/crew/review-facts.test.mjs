import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { gateJsonEntries } from '../../scripts/crew/review-facts.mjs';
import { pickLatestReport } from '../../scripts/crew/planner.mjs';

// 2026-W46 M5: EFMP-407 Units 5 and 8 had their crew G3 reports one folder down, so the planner
// saw none and spent the last ADR-0019 cycle on a second review of unchanged inputs.

function gateDir(files) {
  const root = mkdtempSync(join(tmpdir(), 'review-facts-'));
  const dir = join(root, 'G3');
  mkdirSync(dir);
  for (const [rel, body] of Object.entries(files)) {
    mkdirSync(join(dir, rel, '..'), { recursive: true });
    writeFileSync(join(dir, rel), typeof body === 'string' ? body : JSON.stringify(body));
  }
  return { root, dir };
}

const flat = { disposition: 'revise', completed_at: '2026-11-08T10:00:00Z' };
const nested = { disposition: 'escalate', completed_at: '2026-11-09T10:00:00Z' };

test('a flat report and a nested report are both returned; deeper files are ignored', (t) => {
  const { root, dir } = gateDir({
    'flat.json': flat,
    'run-1/run-1.json': nested,
    'run-1/manifest.json': { files: [] },
    'run-1/logs/deep.json': { disposition: 'pass', completed_at: '2026-12-01T00:00:00Z' },
    'run-1/notes.md': 'not json',
  });
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const entries = gateJsonEntries(dir);
  assert.deepEqual(entries.map((e) => e.file).sort(), [join(dir, 'flat.json'), join(dir, 'run-1', 'manifest.json'), join(dir, 'run-1', 'run-1.json')].sort());
  const latest = pickLatestReport(entries);
  // The nested manifest.json has no disposition and is dropped; the two-levels-down pass is not seen.
  assert.equal(latest.file, join(dir, 'run-1', 'run-1.json'));
  assert.equal(latest.disposition, 'escalate');
  assert.equal(latest.cycles, 2);
});

test('a prefix keeps repository-relative paths, and an unparsable file yields json null', (t) => {
  const { root, dir } = gateDir({ 'run/run.json': nested, 'broken.json': '{' });
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const entries = gateJsonEntries(dir, { prefix: 'specs/content/x/reviews/unit-01/G3' });
  assert.deepEqual(entries, [
    { file: 'specs/content/x/reviews/unit-01/G3/broken.json', json: null },
    { file: 'specs/content/x/reviews/unit-01/G3/run/run.json', json: nested },
  ]);
});

test('a flat-only directory gives the same result as the old flat listing', (t) => {
  const { root, dir } = gateDir({ 'a.json': flat, 'b.json': nested, 'manifest.json': { files: [] } });
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const old = ['a.json', 'b.json', 'manifest.json'].map((f) => ({ file: join(dir, f), json: f === 'a.json' ? flat : f === 'b.json' ? nested : { files: [] } }));
  assert.deepEqual(pickLatestReport(gateJsonEntries(dir)), pickLatestReport(old));
  assert.deepEqual(pickLatestReport(gateJsonEntries(dir)), { file: join(dir, 'b.json'), ...nested, cycles: 2 });
});

test('a missing gate directory gives no entries', () => {
  assert.deepEqual(gateJsonEntries(join(tmpdir(), 'review-facts-missing-dir', 'G3')), []);
  assert.equal(pickLatestReport([]), null);
});
