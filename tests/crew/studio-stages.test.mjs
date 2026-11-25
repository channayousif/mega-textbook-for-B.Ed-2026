// Study Studio run by the crew (owner, 2026-11-25): resume stuck items, plan the next certified
// unit, wait for the owner's spot-check, publish only what the owner approved.
import test from 'node:test';
import assert from 'node:assert/strict';
import { studioNeeds, limitMedia, approveStudio, rejectStudio, mediaTask, mediaLaunchProblem, studioKey, MAX_AWAITING_WATCH, ownerLine } from '../../scripts/crew/media.mjs';
import { isCorpusStage } from '../../scripts/crew/planner.mjs';

const it = (key, state, over = {}) => ({ key, state, ...over });
const unit = (course, n, items) => ({ course, unit: n, items });

test('items stuck before qa3-pass are resumed by one studio_media job per unit (EFMP-301 U4, 2026-11-09)', () => {
  const u4 = unit('EFMP-301', 4, [it('t1-en-audio-p1', 'placed'), it('t3-en-video', 'qa2-pass'), it('t3-ur-audio-p1', 'qa2-pass'), it('t2-ur-video', 'planned')]);
  const r = studioNeeds([u4]);
  assert.deepEqual(r.jobs, [{ course: 'EFMP-301', unit: 4, stage: 'studio_media' }]);
  assert.deepEqual(r.owner.watch, []);
  // a blocked item waits for its fix, it is not resumed
  assert.deepEqual(studioNeeds([unit('A', 1, [it('k', 'qa2-pass', { blocked: 'redo' })])]).jobs, []);
});

test('checked private items wait for the owner; approved ones are published, kept ones stay private', () => {
  const u = unit('EFMP-301', 4, [it('a', 'qa3-pass'), it('b', 'qa3-pass'), it('c', 'placed')]);
  assert.deepEqual(studioNeeds([u]).owner.watch, ['EFMP-301#4']);
  const approvals = {};
  approveStudio(approvals, 'EFMP-301', 4, { items: u.items, except: ['b'], via: 'discord', at: '2026-11-25T10:00:00Z' });
  assert.deepEqual(approvals.studio['EFMP-301#4'].keys, ['a']);
  const r = studioNeeds([u], { approvals });
  assert.deepEqual(r.jobs.map((j) => j.stage), ['studio_publish']);
  assert.deepEqual(r.owner.watch, []);
  // once a is placed, the kept item b does not keep queueing publish jobs
  const after = unit('EFMP-301', 4, [it('a', 'placed'), it('b', 'qa3-pass'), it('c', 'placed')]);
  assert.deepEqual(studioNeeds([after], { approvals }).jobs.filter((j) => j.stage === 'studio_publish'), []);
  // approved or public items left by an interrupted publish run are finished
  assert.deepEqual(studioNeeds([unit('A', 2, [it('x', 'public')])]).jobs.map((j) => j.stage), ['studio_publish']);
});

test('the next certified unit is planned only when no unit is mid-way and few wait for the owner', () => {
  const candidates = [{ course: 'EFMP-301', unit: 4 }, { course: 'EFMP-301', unit: 5 }, { course: 'GENG-300', unit: 1 }];
  const done = unit('EFMP-301', 4, [it('a', 'placed')]);
  assert.deepEqual(studioNeeds([done], { candidates }).jobs, [{ course: 'EFMP-301', unit: 5, stage: 'studio_media', plan: true }]);
  const busy = unit('EFMP-301', 4, [it('a', 'encoded')]);
  assert.deepEqual(studioNeeds([busy], { candidates }).jobs.map((j) => `${j.unit} ${j.stage}`), ['4 studio_media']);
  const watching = Array.from({ length: MAX_AWAITING_WATCH }, (_, i) => unit('X', i + 1, [it('a', 'qa3-pass')]));
  assert.deepEqual(studioNeeds(watching, { candidates }).jobs, []);
  assert.equal(studioNeeds(watching.slice(1), { candidates }).jobs[0].plan, true);
  assert.deepEqual(studioNeeds([], { candidates: [] }).jobs, []);
});

test('studio jobs of one unit never overlap, but different units and teasers run side by side', () => {
  const added = [
    { stage: 'studio_media', course: 'EFMP-301', unit: 4 },
    { stage: 'studio_publish', course: 'EFMP-301', unit: 4 },
    { stage: 'studio_media', course: 'GENG-300', unit: 1 },
    { stage: 'teaser_clips', course: 'GQUR-300' },
  ];
  assert.deepEqual(limitMedia(added, []).map((j) => `${j.course} ${j.stage}`), ['EFMP-301 studio_publish', 'GENG-300 studio_media', 'GQUR-300 teaser_clips']);
  assert.deepEqual(limitMedia(added, [{ stage: 'media_assemble', course: 'X' }, { stage: 'studio_media', course: 'GENG-300', unit: 1 }]).map((j) => `${j.course} ${j.stage}`), ['EFMP-301 studio_publish']);
});

test('only the owner can approve; publish needs that approval; rejects are carried to the remake', () => {
  const approvals = {};
  assert.throws(() => approveStudio(approvals, 'A', 1, { items: [it('a', 'qa2-pass')], via: 'cli', at: 'x' }), /no checked private item/);
  assert.throws(() => approveStudio(approvals, 'A', 1, { items: [it('a', 'qa3-pass')], except: ['zz'], via: 'cli', at: 'x' }), /not a qa3-pass item/);
  assert.equal(mediaLaunchProblem({ stage: 'studio_publish' }, {}), 'no owner approve-studio');
  approveStudio(approvals, 'A', 1, { items: [it('a', 'qa3-pass')], via: 'cli', at: '2026-11-25T10:00:00Z' });
  assert.equal(mediaLaunchProblem({ stage: 'studio_publish' }, { approval: approvals.studio[studioKey('a', 1)] }), null);
  const pub = mediaTask({ id: 'p', stage: 'studio_publish', course: 'A', unit: 1, studioApproval: approvals.studio['A#1'] });
  assert.match(pub, /"by":"owner"/);
  assert.match(pub, /place-media\.mjs A 1/);
  assert.throws(() => rejectStudio(approvals, 'A', 1, 'a', '', { items: [it('a', 'qa3-pass')], via: 'cli', at: 'x' }), /usage/);
  rejectStudio(approvals, 'A', 1, 'a', 'the Urdu narration skips topic 2', { items: [it('a', 'qa3-pass')], via: 'cli', at: 'x' });
  const t = mediaTask({ stage: 'studio_media', course: 'A', unit: 1, rejects: approvals.studioRejects['A#1'] });
  assert.match(t, /the Urdu narration skips topic 2/);
  assert.match(t, /Never make a video public/);
});

test('the studio brief plans a new unit, paces NotebookLM and YouTube, and stops for the owner', () => {
  const t = mediaTask({ stage: 'studio_media', course: 'EFMP-301', unit: 5, plan: true });
  assert.match(t, /has no Study Studio ledger yet: plan it first/);
  assert.match(t, /pacing\.mjs check nlm\.studio/);
  assert.match(t, /pacing\.mjs check youtube\.upload/);
  assert.match(t, /crew approve-studio EFMP-301 5/);
  assert.doesNotMatch(mediaTask({ stage: 'studio_media', course: 'EFMP-301', unit: 4 }), /plan it first/);
  assert.equal(mediaTask({ stage: 'audio_overview', course: 'EFMP-301', unit: 4 }), mediaTask({ stage: 'studio_media', course: 'EFMP-301', unit: 4 }));
  assert.equal(isCorpusStage('studio_media'), false);
  assert.match(ownerLine({ scripts: [], spotCheck: [], voided: [], watch: ['EFMP-301#4'] }), /crew approve-studio/);
});
