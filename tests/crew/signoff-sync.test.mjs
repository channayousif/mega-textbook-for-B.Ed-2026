import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { insertTrackerRow, applySignoffs } from '../../scripts/crew/signoff-sync.mjs';
import { manifestDigest, deskUnit, certificationInput, runIdFor, summarizeReport } from '../../scripts/lib/g3-desk.mjs';
import { CRITERIA, COMMANDS } from '../../scripts/lib/review-criteria.mjs';

const MANIFEST = { 'docs/a.mdx': '1'.repeat(64), 'specs/b.md': '2'.repeat(64) };
const GATES = Object.fromEntries(COMMANDS.filter((c) => c !== 'render-review').map((c) => [c, 0]));
const allPass = () => Object.fromEntries(CRITERIA.G3.map((id) => [id, { status: 'pass', evidence: '' }]));

const row = (overrides = {}) => ({
  id: '0f0e0d0c-1111-2222-3333-444455556666', course_code: 'EFMP-302', unit_no: 3, decision: 'certify',
  criteria: allPass(), findings: [], note: null, reviewer_initials: 'YM', rendered_inspected: true,
  inputs_digest: manifestDigest(MANIFEST), desk_commit: 'abc1234', decided_at: '2026-10-27T01:02:03.456Z',
  ...overrides,
});

const TASKS = `# Tracker

| Unit | Stage | Status | Reviewer | Suggestion |
|------|-------|--------|----------|------------|
| Unit 3 | G2 draft | ✅ | auto:gates | gates:x.json |
| Unit 3 | G3 en-review | ▢ | | advisory run001: pass |

Prose after the table.
`;

function fixture() {
  const wt = mkdtempSync(join(tmpdir(), 'signoff-sync-'));
  mkdirSync(join(wt, 'specs', 'content', 'efmp-302'), { recursive: true });
  writeFileSync(join(wt, 'specs', 'content', 'efmp-302', 'tasks.md'), TASKS);
  return wt;
}
const opts = (overrides = {}) => ({ manifestOf: () => MANIFEST, certified: () => false, gateExit: GATES, completedAt: '2026-10-27T02:00:00Z', ...overrides });

test('manifestDigest ignores key order', () => {
  assert.equal(manifestDigest({ b: '2', a: '1' }), manifestDigest({ a: '1', b: '2' }));
  assert.notEqual(manifestDigest({ a: '1' }), manifestDigest({ a: '2' }));
});

test('insertTrackerRow lands inside the table, before the prose', () => {
  const out = insertTrackerRow(TASKS, '| Unit 3 | G3 en-review | ✅ | YM | review:p.json |');
  const lines = out.split('\n');
  assert.equal(lines[6], '| Unit 3 | G3 en-review | ✅ | YM | review:p.json |');
  assert.equal(lines[8], 'Prose after the table.');
});

test('a certify becomes a pass certification and a done tracker row', () => {
  const wt = fixture();
  try {
    const r = applySignoffs(wt, [row()], opts());
    assert.equal(r.written.length, 1);
    const { path, trackerRow } = r.written[0];
    assert.equal(path, `specs/content/efmp-302/reviews/unit-03/G3/${runIdFor(row())}.json`);
    assert.match(runIdFor(row()), /^20261027T010203Z-g3-desk-0f0e0d0c$/);
    const cert = JSON.parse(readFileSync(join(wt, path), 'utf8'));
    assert.equal(cert.disposition, 'pass');
    assert.equal(cert.reviewer_id, 'YM');
    assert.deepEqual(cert.input_manifest, MANIFEST);
    assert.equal(cert.commands.find((c) => c.name === 'render-review').exit_code, 0);
    assert.equal(trackerRow, `| Unit 3 | G3 en-review | ✅ | YM | review:${path} |`);
    assert.match(readFileSync(join(wt, 'specs/content/efmp-302/tasks.md'), 'utf8'), /✅ \| YM \| review:/);
  } finally { rmSync(wt, { recursive: true, force: true }); }
});

test('revise and escalate write an open (⏳) row', () => {
  const wt = fixture();
  try {
    const r = applySignoffs(wt, [row({ decision: 'escalate', note: 'needs a ruling', criteria: { ...allPass(), sources: { status: 'fail', evidence: 'x' } } })], opts());
    assert.equal(r.written[0].trackerRow.split('|')[3].trim(), '⏳');
  } finally { rmSync(wt, { recursive: true, force: true }); }
});

test('changed inputs or an already certified unit are stale, and nothing is written', () => {
  const wt = fixture();
  try {
    const r = applySignoffs(wt, [row()], opts({ manifestOf: () => ({ ...MANIFEST, 'docs/new.mdx': '3'.repeat(64) }) }));
    assert.equal(r.stale.length, 1);
    assert.match(r.stale[0].why, /changed on main/);
    const c = applySignoffs(wt, [row()], opts({ certified: () => true }));
    assert.match(c.stale[0].why, /already certified/);
    assert.equal(existsSync(join(wt, 'specs/content/efmp-302/reviews')), false);
    assert.equal(readFileSync(join(wt, 'specs/content/efmp-302/tasks.md'), 'utf8'), TASKS);
  } finally { rmSync(wt, { recursive: true, force: true }); }
});

test('a certify is refused when a gate fails or the render was not inspected', () => {
  const wt = fixture();
  try {
    const red = applySignoffs(wt, [row()], opts({ gateExit: { ...GATES, 'check:figures': 1 } }));
    assert.match(red.failed[0].why, /failing command: check:figures/);
    const unseen = applySignoffs(wt, [row({ rendered_inspected: false })], opts());
    assert.match(unseen.failed[0].why, /render-review/);
  } finally { rmSync(wt, { recursive: true, force: true }); }
});

test('certificationInput keeps the owner evidence and cites the ledger row', () => {
  const input = certificationInput(row({ criteria: { ...allPass(), sources: { status: 'pass', evidence: 'checked Ehrich 2011' } } }), { manifest: MANIFEST, gateExit: GATES, completedAt: 'z' });
  const sources = input.criteria.find((c) => c.id === 'sources');
  assert.deepEqual(sources.evidence, ['checked Ehrich 2011', `G3 sign-off desk, ledger row ${row().id}`]);
});

test('deskUnit uses the planner rule: an unrepaired revise is still in agent review', () => {
  const u = { unit_no: 3, authored: true, gates: { G3: 'open' }, publication: 'gated' };
  const report = { disposition: 'revise', criteria: [], findings: [], commands: [] };
  const base = { course: 'EFMP-302', u, report, reportPath: 'p.json', digest: 'd', dirty: false, index: {} };
  assert.equal(deskUnit({ ...base, rows: [{ status: '▢', reviewer: '', suggestion: 'advisory: revise' }] }).state, 'in_review');
  // A repaired revise is re-reviewed while it has a cycle left (ADR-0019, #334); once both are used, the owner decides.
  const repaired = [{ status: '▢', reviewer: '', suggestion: 'advisory: revise; repairs applied' }];
  assert.equal(deskUnit({ ...base, report: { ...report, cycles: 1 }, rows: repaired }).state, 'in_review');
  assert.equal(deskUnit({ ...base, report: { ...report, cycles: 2 }, rows: repaired }).state, 'awaiting');
  assert.equal(deskUnit({ ...base, report: { ...report, disposition: 'escalate' }, rows: [] }).state, 'awaiting');
  assert.equal(deskUnit({ ...base, report: null, rows: [] }).state, 'in_review');
  assert.equal(deskUnit({ ...base, u: { ...u, gates: { G3: 'done' } }, rows: [] }).state, 'certified');
});

test('summarizeReport always lists the seven criteria and every command, filling gaps', () => {
  const s = summarizeReport({ disposition: 'pass', criteria: [{ id: 'sources', status: 'pass', evidence: ['a', 'b'] }], commands: [] }, 'p.json');
  assert.deepEqual(s.criteria.map((c) => c.id), CRITERIA.G3);
  assert.equal(s.criteria.find((c) => c.id === 'sources').evidence, 'a\nb');
  assert.equal(s.criteria.find((c) => c.id === 'authority').status, 'unverified');
  assert.equal(s.commands.length, COMMANDS.length);
});
