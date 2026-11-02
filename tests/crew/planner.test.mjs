import test from 'node:test';
import assert from 'node:assert/strict';
import { stagesFor, awaitingG3, mirrorComplete, pickLatestReport, specUnitNumbers, focusCourse } from '../../scripts/crew/planner.mjs';

const unit = (G3 = 'open', G5 = 'open', over = {}) => ({ authored: true, gates: { G3, G5 }, figures: { prompt_only: 0 }, ...over });
const facts = (over = {}) => ({ bilingual: true, g3Report: null, g3Repaired: false, g5Report: null, mirrorComplete: true, ...over });

test('a finished Urdu mirror is translated, whatever the G4 tracker icon says', () => {
  // 2026-10-19: 36 units looped on translate because G4 never shows the human-only ✅.
  assert.deepEqual(stagesFor(unit(), facts({ g3Report: { disposition: 'pass' } })), []);
  assert.deepEqual(stagesFor(unit(), facts({ g3Report: { disposition: 'pass' }, mirrorComplete: false })), ['translate']);
});

test('the Urdu review waits for an accepted G3', () => {
  assert.deepEqual(stagesFor(unit('open'), facts({ g3Report: { disposition: 'pass' } })), []);
  assert.deepEqual(stagesFor(unit('done'), facts({ g3Report: { disposition: 'pass' } })), ['review_ur']);
  assert.deepEqual(stagesFor(unit('done'), facts({ g5Report: { disposition: 'pass' } })), []);
  assert.deepEqual(stagesFor(unit('done', 'done'), facts()), []);
});

test('English review, repair, figures, authoring and English-only courses', () => {
  assert.deepEqual(stagesFor(unit(), facts()), ['review_en']);
  assert.deepEqual(stagesFor(unit(), facts({ g3Report: { disposition: 'revise' } })), ['repair_en']);
  assert.deepEqual(stagesFor(unit(), facts({ g3Report: { disposition: 'revise' }, g3Repaired: true, g3Cycles: 2 })), []);
  assert.deepEqual(stagesFor(unit('open', 'open', { figures: { prompt_only: 2 } }), facts({ g3Report: { disposition: 'pass' } })), ['figures']);
  assert.deepEqual(stagesFor({ authored: false, gates: {} }, facts()), ['author']);
  assert.deepEqual(stagesFor(unit(), facts({ bilingual: false, mirrorComplete: false, g3Report: { disposition: 'pass' } })), []);
});

test('translation waits while the latest G3 report is an unrepaired revise', () => {
  // 2026-10-25 (W43 M2): translate jobs behind open English defects only wrote handoffs.
  const draft = (over) => facts({ mirrorComplete: false, ...over });
  assert.deepEqual(stagesFor(unit(), draft({ g3Report: { disposition: 'revise' } })), ['repair_en']);
  // A repaired revise with a review cycle left is re-reviewed (ADR-0019); translation goes ahead either way.
  assert.deepEqual(stagesFor(unit(), draft({ g3Report: { disposition: 'revise' }, g3Repaired: true })), ['review_en', 'translate']);
  assert.deepEqual(stagesFor(unit(), draft({ g3Report: { disposition: 'revise' }, g3Repaired: true, g3Cycles: 2 })), ['translate']);
  assert.deepEqual(stagesFor(unit(), draft({ g3Report: { disposition: 'pass' } })), ['translate']);
  assert.deepEqual(stagesFor(unit(), draft({ g3Report: { disposition: 'escalate' } })), []);
  assert.deepEqual(stagesFor(unit(), draft()), ['review_en', 'translate']);
});

test('translation waits while the latest G3 report is an unrepaired escalate', () => {
  // 2026-11-01 (W44 M3, GPKS-402 U6): translate jobs behind an escalate only wrote stop handoffs.
  const draft = (over) => facts({ mirrorComplete: false, ...over });
  // Unrepaired escalate: no translate and no repair_en (only a revise is crew-repaired).
  assert.deepEqual(stagesFor(unit(), draft({ g3Report: { disposition: 'escalate' } })), []);
  // Repaired escalate with a review cycle left is re-reviewed (ADR-0019); translation goes ahead.
  assert.deepEqual(stagesFor(unit(), draft({ g3Report: { disposition: 'escalate' }, g3Repaired: true, g3Cycles: 1 })), ['review_en', 'translate']);
  assert.deepEqual(stagesFor(unit(), draft({ g3Report: { disposition: 'escalate' }, g3Repaired: true, g3Cycles: 2 })), ['translate']);
  // Once G3 is signed off, an old escalate report no longer blocks translation.
  assert.deepEqual(stagesFor(unit('done'), draft({ g3Report: { disposition: 'escalate' } })), ['translate']);
  // awaitingG3 still returns true for an unrepaired escalate (the owner must send it back).
  assert.equal(awaitingG3(unit(), facts({ g3Report: { disposition: 'escalate' } })), true);
});

test('awaitingG3: agent review finished, G3 not signed off', () => {
  assert.equal(awaitingG3(unit(), facts({ g3Report: { disposition: 'pass' } })), true);
  assert.equal(awaitingG3(unit(), facts({ g3Report: { disposition: 'escalate' } })), true);
  assert.equal(awaitingG3(unit(), facts({ g3Report: { disposition: 'revise' } })), false);
  assert.equal(awaitingG3(unit(), facts({ g3Report: { disposition: 'revise' }, g3Repaired: true, g3Cycles: 2 })), true);
  assert.equal(awaitingG3(unit(), facts()), false);
  assert.equal(awaitingG3(unit('done'), facts({ g3Report: { disposition: 'pass' } })), false);
});

test('a repaired revise is re-reviewed while ADR-0019 leaves a cycle, then waits for the owner', () => {
  // 2026-10-25: 31 units sat "awaiting G3" with repairs no reviewer had verified.
  const repaired = (g3Cycles) => facts({ g3Report: { disposition: 'revise' }, g3Repaired: true, g3Cycles });
  assert.deepEqual(stagesFor(unit(), repaired(1)), ['review_en']);
  assert.equal(awaitingG3(unit(), repaired(1)), false);
  assert.deepEqual(stagesFor(unit(), repaired(2)), []);
  assert.equal(awaitingG3(unit(), repaired(2)), true);
  assert.deepEqual(stagesFor(unit(), facts({ g3Report: { disposition: 'pass' }, g3Cycles: 1 })), []);
  const escalated = (g3Repaired) => facts({ g3Report: { disposition: 'escalate' }, g3Repaired, g3Cycles: 1 });
  assert.deepEqual(stagesFor(unit(), escalated(false)), []);
  assert.equal(awaitingG3(unit(), escalated(false)), true);
  assert.deepEqual(stagesFor(unit(), escalated(true)), ['review_en']);
});

test('mirrorComplete compares page names only', () => {
  assert.equal(mirrorComplete(['index.mdx', 'topic-01.mdx', '_category_.json'], ['index.mdx', 'topic-01.mdx']), true);
  assert.equal(mirrorComplete(['index.mdx', 'topic-01.mdx'], ['index.mdx']), false);
  assert.equal(mirrorComplete([], []), false);
});

test('pickLatestReport skips manifests and orders by completion time', () => {
  // manifest.json sorts last by name; it used to be read as the latest report.
  const entries = [
    { file: 'G3/20260925T084500Z-g3-attempt-01.json', json: { disposition: 'revise', completed_at: '2026-09-25T09:00:00Z' } },
    { file: 'G3/agent-g3-run002.json', json: { disposition: 'pass', completed_at: '2026-10-02T09:00:00Z' } },
    { file: 'G3/manifest.json', json: { files: [] } },
    { file: 'G3/broken.json', json: null },
  ];
  assert.deepEqual(pickLatestReport(entries), { file: 'G3/agent-g3-run002.json', disposition: 'pass', completed_at: '2026-10-02T09:00:00Z', cycles: 2 });
  assert.equal(pickLatestReport([{ file: 'G3/manifest.json', json: { files: [] } }]), null);
});

test('specUnitNumbers: units an approved spec defines, so unwritten ones get authored', () => {
  const spec = (status, body) => `---\ncourse_code: GQUR-301\nstatus: ${status}\n---\n\n# Spec\n\n${body}`;
  assert.deepEqual(specUnitNumbers(spec('approved', '## Unit 1: A\n\n### Topic list\n\n## Unit 2: B\n\n## Unit 10: C\n')), [1, 2, 10]);
  assert.deepEqual(specUnitNumbers(spec('draft', '## Unit 1: A\n')), []);
  assert.deepEqual(specUnitNumbers(spec('approved', '## Units overview\n## Unit 3: C\n')), [3]);
  assert.deepEqual(specUnitNumbers('no front matter\n## Unit 1: A\n'), []);
});

test('focusCourse: finish a started course before a new one starts (owner ruling 2026-10-28)', () => {
  const catalogOrder = ['EFMP-301', 'GNAS-301', 'GPKS-402', 'EFMP-408'];
  const started = new Map([['EFMP-301', true], ['GNAS-301', true]]);
  const job = (course, stage, status = 'queued') => ({ course, stage, status });

  // A started course with crew work left beats an approved new course.
  assert.equal(focusCourse({ started, jobs: [job('GNAS-301', 'fix')], newCourses: ['GPKS-402'], catalogOrder }).course, 'GNAS-301');
  // The started course nearest done wins; equal counts go in catalog order.
  const two = [job('EFMP-301', 'review_en'), job('EFMP-301', 'translate'), job('GNAS-301', 'fix')];
  assert.equal(focusCourse({ started, jobs: two, newCourses: [], catalogOrder }).course, 'GNAS-301');
  assert.equal(focusCourse({ started, jobs: [job('GNAS-301', 'fix'), job('EFMP-301', 'fix')], newCourses: [], catalogOrder }).course, 'EFMP-301');
  // Work that waits on a person (gate_red, blocked), finished work and self-maintenance do not hold the crew.
  const idle = [job('EFMP-301', 'fix', 'gate_red'), job('GNAS-301', 'review_en', 'blocked'), job('GNAS-301', 'author', 'merged'), job('EFMP-301', 'maint_survey')];
  const next = focusCourse({ started, jobs: idle, newCourses: ['EFMP-408', 'GPKS-402'], catalogOrder });
  assert.equal(next.course, 'GPKS-402');
  assert.match(next.reason, /new course/);
  // A new course with author jobs in flight is started (the planner marks it so) and keeps the focus.
  const begun = new Map([...started, ['GPKS-402', true]]);
  assert.equal(focusCourse({ started: begun, jobs: [job('GPKS-402', 'author', 'running')], newCourses: ['EFMP-408'], catalogOrder }).course, 'GPKS-402');
  // Nothing to do anywhere.
  assert.equal(focusCourse({ started, jobs: [], newCourses: [], catalogOrder }), null);
});
