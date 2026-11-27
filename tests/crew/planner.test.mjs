import test from 'node:test';
import assert from 'node:assert/strict';
import { stagesFor, awaitingG3, mirrorComplete, pickLatestReport, specUnitNumbers, authorQueue, focusCourse, figureBacklog, limitIllustrate,
  needsIllustrationPlan, illustrationsPending, unitScopedChanges, limitPlanIllustrations, holdsFocus, refreshCandidate, pickRefresh } from '../../scripts/crew/planner.mjs';

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

test('authorQueue: no overview and no units queues only the lowest missing unit (2026-W45 M5)', () => {
  // GICP-400 Units 1, 2 and 4 stopped on "missing required input: course-overview.mdx" (11-07 C6);
  // EFMP-406 Units 2 to 5 collided on the same file (11-03 C6). The first author job writes it.
  assert.deepEqual(authorQueue([1, 2, 3], new Set(), false), [1]);
  // Overview present: every missing unit is queued.
  assert.deepEqual(authorQueue([1, 2, 3], new Set(), true), [1, 2, 3]);
  assert.deepEqual(authorQueue([1, 2, 3], new Set([1]), true), [2, 3]);
  // No overview but one unit on disk: the rest are queued.
  assert.deepEqual(authorQueue([1, 2, 3], new Set([1]), false), [2, 3]);
  // Every unit written: nothing to queue.
  assert.deepEqual(authorQueue([1, 2, 3], new Set([1, 2, 3]), false), []);
  // Array input works too.
  assert.deepEqual(authorQueue([1, 2, 3], [1], false), [2, 3]);
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

test('focusCourse: media work never holds the focus (owner ruling 2026-11-21)', () => {
  const catalogOrder = ['GQUR-300', 'GUHQ-301', 'EFMP-408'];
  const started = new Map([['GQUR-300', true]]);
  const job = (course, stage, status = 'queued') => ({ course, stage, status });
  // A queued raster job waiting on image quota no longer blocks the next course.
  const media = [job('GQUR-300', 'illustrate'), job('GQUR-300', 'plan_illustrations', 'running'), job('GQUR-300', 'figures')];
  const next = focusCourse({ started, jobs: media, newCourses: ['EFMP-408', 'GUHQ-301'], catalogOrder });
  assert.equal(next.course, 'GUHQ-301');
  assert.match(next.reason, /new course/);
  // Authoring-track work still holds it.
  assert.equal(focusCourse({ started, jobs: [...media, job('GQUR-300', 'review_en')], newCourses: ['GUHQ-301'], catalogOrder }).course, 'GQUR-300');
  assert.equal(holdsFocus('illustrate'), false);
  assert.equal(holdsFocus('teaser_clips'), false);
  assert.equal(holdsFocus('translate'), true);
});

test('illustrations go to illustrate, schematics to figures (2026-11-03: illustrate never ran)', () => {
  const passed = facts({ g3Report: { disposition: 'pass' } });
  const rows = [
    { status: 'prompt-only', kind: 'illustration' },
    { status: 'placed', kind: 'illustration' },
    { status: 'prompt-only', kind: 'flowchart' },
    { status: 'prompt-only', kind: '' },
    { status: 'generated', kind: 'illustration' }, // generated but not inspected or placed
  ];
  assert.deepEqual(figureBacklog(rows), { schematic: 2, illustration: 2 });
  assert.deepEqual(figureBacklog(null), { schematic: 0, illustration: 0 });
  assert.deepEqual(stagesFor(unit(), { ...passed, figureBacklog: { schematic: 0, illustration: 1 } }), ['illustrate']);
  assert.deepEqual(stagesFor(unit(), { ...passed, figureBacklog: { schematic: 1, illustration: 1 } }), ['figures', 'illustrate']);
  // A unit whose only prompt-only row is an illustration no longer queues a no-op figures job.
  assert.deepEqual(stagesFor(unit('open', 'open', { figures: { prompt_only: 1 } }), { ...passed, figureBacklog: { schematic: 0, illustration: 1 } }), ['illustrate']);
});

test('one illustrate job per image producer lane (agy, agy2, gflow, gflow2, codex) in flight', () => {
  const j = (id, stage) => ({ id, stage });
  const added = [j('a', 'illustrate'), j('b', 'figures'), j('c', 'illustrate'), j('d', 'illustrate'), j('e', 'illustrate'), j('f', 'illustrate'), j('g', 'illustrate')];
  assert.deepEqual(limitIllustrate(added, []).map((x) => x.id), ['a', 'b', 'c', 'd', 'e', 'f']);
  assert.deepEqual(limitIllustrate(added, [j('y', 'illustrate'), j('z', 'illustrate')]).map((x) => x.id), ['a', 'b', 'c', 'd']);
  assert.deepEqual(limitIllustrate(added, ['v', 'w', 'x', 'y', 'z'].map((id) => j(id, 'illustrate'))).map((x) => x.id), ['b']);
});

test('a unit with no banner is planned, held from review and kept off the desk (D-2026-0081)', () => {
  // 2026-11-09: GISS-401 Unit 1 reached the desk as "Suggested: Certify" with no raster images.
  const noBanner = facts({ hasBanner: false, mirrorComplete: true });
  assert.deepEqual(stagesFor(unit(), noBanner), ['plan_illustrations']);
  const passedNoBanner = facts({ hasBanner: false, g3Report: { disposition: 'pass' } });
  assert.deepEqual(stagesFor(unit(), passedNoBanner), ['plan_illustrations']);
  assert.equal(awaitingG3(unit(), passedNoBanner), false);
  // Planned but not yet placed: illustrate runs, review and desk still wait.
  const planned = facts({ hasBanner: true, figureBacklog: { schematic: 0, illustration: 2 }, g3Report: { disposition: 'pass' } });
  assert.deepEqual(stagesFor(unit(), planned), ['illustrate']);
  assert.equal(awaitingG3(unit(), planned), false);
  assert.equal(illustrationsPending(unit(), planned), true);
  // A certified unit is never backfilled; callers that gather no hasBanner keep the old rules.
  assert.equal(needsIllustrationPlan(unit('done'), facts({ hasBanner: false })), false);
  assert.equal(needsIllustrationPlan(unit(), facts()), false);
  assert.equal(awaitingG3(unit(), facts({ g3Report: { disposition: 'pass' } })), true);
});

test('a pass whose own unit files changed is re-reviewed; shared-input churn is not (D-2026-0081)', () => {
  const placed = { hasBanner: true, figureBacklog: { schematic: 0, illustration: 0 } };
  const stale = facts({ ...placed, g3Report: { disposition: 'pass' }, g3UnitChanges: ['docs/x/unit-01/index.mdx'] });
  assert.deepEqual(stagesFor(unit(), stale), ['review_en']);
  assert.equal(awaitingG3(unit(), stale), false);
  const clean = facts({ ...placed, g3Report: { disposition: 'pass' }, g3UnitChanges: [] });
  assert.deepEqual(stagesFor(unit(), clean), []);
  assert.equal(awaitingG3(unit(), clean), true);
  // An exhausted escalate is not re-reviewed by this rule; it returns to the owner once placed.
  const esc = facts({ ...placed, g3Report: { disposition: 'escalate' }, g3Repaired: true, g3Cycles: 2, g3UnitChanges: ['docs/x/unit-01/index.mdx'] });
  assert.deepEqual(stagesFor(unit(), esc), []);
  assert.equal(awaitingG3(unit(), esc), true);

  const before = { 'docs/x/unit-01/topic-01.mdx': 'a', 'scripts/lib/gates.mjs': 'a', 'specs/content/x/figures/unit-010.md': 'a' };
  const after = { 'docs/x/unit-01/topic-01.mdx': 'b', 'scripts/lib/gates.mjs': 'b', 'specs/content/x/figures/unit-010.md': 'b',
    'specs/content/x/figures/unit-01.banner.md': 'n' };
  assert.deepEqual(unitScopedChanges(before, after, 1), ['docs/x/unit-01/topic-01.mdx', 'specs/content/x/figures/unit-01.banner.md']);
  assert.deepEqual(unitScopedChanges(before, before, 1), []);
});

test('at most two plan_illustrations jobs are in flight', () => {
  const job = (n) => ({ id: `u${n}`, stage: 'plan_illustrations' });
  const other = { id: 'r', stage: 'review_en' };
  assert.deepEqual(limitPlanIllustrations([job(1), job(2), job(3), other], []).map((j) => j.id), ['u1', 'u2', 'r']);
  assert.deepEqual(limitPlanIllustrations([job(1), other], [job(9)]).map((j) => j.id), ['u1', 'r']);
  assert.deepEqual(limitPlanIllustrations([job(1)], [job(8), job(9)]), []);
});

test('figure refresh: uncertified units with unstructured schematics, never certified or awaiting sign-off', () => {
  // Feature 032 phase D (owner, 2026-11-23: "Uncertified first", "Crew stage, course by course").
  assert.equal(refreshCandidate(unit('open'), facts({ unstructuredSchematics: 3 })), true);
  assert.equal(refreshCandidate(unit('done'), facts({ unstructuredSchematics: 3 })), false, 'certified');
  assert.equal(refreshCandidate(unit('open'), facts({ unstructuredSchematics: 0 })), false, 'nothing to redraw');
  assert.equal(refreshCandidate(unit('open'), facts({ unstructuredSchematics: 3, g3Report: { disposition: 'pass' } })), false, 'awaiting the owner\'s G3 sign-off');
  assert.equal(refreshCandidate(unit('open', 'open', { figures: { prompt_only: 1 } }), facts({ unstructuredSchematics: 3 })), false, 'figures job first');
  assert.equal(refreshCandidate({ authored: false, gates: {} }, facts({ unstructuredSchematics: 3 })), false);
});

test('figure refresh runs one unit at a time, focus course first', () => {
  const c = [{ course: 'A', unit: 1 }, { course: 'B', unit: 2 }];
  assert.deepEqual(pickRefresh(c, [], 'B'), { course: 'B', unit: 2 });
  assert.deepEqual(pickRefresh(c, [], 'Z'), { course: 'A', unit: 1 });
  assert.equal(pickRefresh(c, [{ stage: 'refresh_figures' }], 'A'), null);
  assert.equal(pickRefresh([], [], 'A'), null);
  assert.equal(holdsFocus('refresh_figures'), false, 'figure work runs beside the focus course');
});


test('flashcard decks: up to two units at a time, skipping authored and busy units', async () => {
  const { pickFlashcards } = await import('../../scripts/crew/planner.mjs');
  const needed = ['efmp-301/1', 'efmp-301/2', 'efmp-301/3', 'gsos-301/4'];
  assert.deepEqual(pickFlashcards(needed, new Set(['efmp-301/1']), []), [{ course: 'EFMP-301', unit: 2 }, { course: 'EFMP-301', unit: 3 }]);
  assert.deepEqual(pickFlashcards(needed, new Set(), [{ stage: 'flashcards', course: 'EFMP-301', unit: 1 }]), [{ course: 'EFMP-301', unit: 2 }]);
  assert.deepEqual(pickFlashcards(needed, new Set(), [{ stage: 'flashcards' }, { stage: 'flashcards' }]), []);
});

test('slide decks: translated units without an outline, one at a time, focus first', async () => {
  const { slidesCandidate, pickSlides } = await import('../../scripts/crew/planner.mjs');
  assert.equal(slidesCandidate(unit(), facts({ mirrorComplete: true }), false), true);
  assert.equal(slidesCandidate(unit(), facts({ mirrorComplete: false }), false), false, 'needs the Urdu mirror');
  assert.equal(slidesCandidate(unit(), facts({ mirrorComplete: true }), true), false, 'already has an outline');
  const c = [{ course: 'A', unit: 1 }, { course: 'B', unit: 2 }];
  assert.deepEqual(pickSlides(c, [], 'B'), { course: 'B', unit: 2 });
  assert.equal(pickSlides(c, [{ stage: 'slides' }], 'B'), null);
});
