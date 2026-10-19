import test from 'node:test';
import assert from 'node:assert/strict';
import { queueReview, recordReview, fanOutJobs, MAX_REVIEWS } from '../../scripts/crew/maintjobs.mjs';

const pr = () => ({ id: 'maint-2026-w43-m1', course: 'MAINT', unit: 431, stage: 'maint_refactor', status: 'pr_open', prNumber: 300,
  branch: 'crew/maint-2026-w43-m1', week: '2026-W43', family: 'openai', worker: 'codex', task: 'Split crew.mjs PR handling', scope: 'scripts/crew/crew.mjs' });

test('a maintenance PR gets one review at a time, then the lead after the cap', () => {
  const parent = pr();
  const board = { jobs: [parent] };
  const events = [];
  const first = queueReview(board, parent, events);
  assert.equal(first.id, 'maint-2026-w43-m1-review1');
  assert.equal(first.stage, 'maint_review');
  assert.equal(queueReview(board, parent, events), null, 'no second review while one is queued');
  for (let i = 0; i < MAX_REVIEWS; i++) board.jobs.push({ id: `old${i}`, parent: parent.id, stage: 'maint_review', status: 'merged' });
  board.jobs = board.jobs.filter((j) => j !== first);
  assert.equal(queueReview(board, parent, events), null);
  assert.equal(parent.status, 'gate_red');
  assert.match(events.at(-1), /no passing review after/);
});

test('a pass records the verdict; a revise queues one fix with the reviewer\'s words', () => {
  const parent = pr();
  const review = { id: `${parent.id}-review1`, parent: parent.id, stage: 'maint_review', status: 'running', worker: 'agy', family: 'google' };
  const board = { jobs: [parent, review] };
  const events = [];
  assert.equal(recordReview(board, review, { verdict: 'pass', note: '' }, 'looks right', events), null);
  assert.equal(review.status, 'merged');
  assert.equal(parent.review.verdict, 'pass');
  assert.equal(parent.review.family, 'google');

  const again = { ...review, id: `${parent.id}-review2`, status: 'running' };
  board.jobs.push(again);
  const fix = recordReview(board, again, { verdict: 'revise', note: 'two callers still use the old name' }, 'rename incomplete', events);
  assert.equal(fix.id, `${parent.id}-revise1`);
  assert.equal(fix.parent, parent.id);
  assert.equal(fix.stage, 'fix');
  assert.match(fix.task, /two callers still use the old name/);
  assert.match(fix.task, /Split crew.mjs PR handling/);
});

test('revise rounds stop at the cap', () => {
  const parent = pr();
  const board = { jobs: [parent, ...Array.from({ length: MAX_REVIEWS - 1 }, (_, i) => ({ id: `${parent.id}-revise${i + 1}`, parent: parent.id, stage: 'fix', status: 'merged' }))] };
  const review = { id: `${parent.id}-review9`, parent: parent.id, stage: 'maint_review', status: 'running', worker: 'agy', family: 'google' };
  board.jobs.push(review);
  const events = [];
  assert.equal(recordReview(board, review, { verdict: 'revise', note: 'still wrong' }, 'no', events), null);
  assert.equal(parent.status, 'gate_red');
});

test('fanOutJobs turns task rows into jobs with week-unique units and the survey context', () => {
  const survey = { id: 'maint-2026-w43-survey', week: '2026-W43', branch: 'crew/maint-2026-w43-survey' };
  const tasks = '| ID | Area | Title | Files | Acceptance | Risk |\n|---|---|---|---|---|---|\n| M1 | code | Split PR handling | scripts/crew/crew.mjs | tests pass | low |\n| A1 | adr | Decision register | history/adr/README.md | every ADR listed | low |';
  const board = { jobs: [] };
  const jobs = fanOutJobs(board, survey, { tasks, spec: '# Spec\nwhy', plan: '# Plan\nhow' });
  assert.deepEqual(jobs.map((j) => [j.id, j.stage, j.unit]), [['maint-2026-w43-m1', 'maint_refactor', 431], ['maint-2026-w43-a1', 'maint_adr', 432]]);
  assert.match(jobs[0].task, /\| M1 \| code \| Split PR handling/);
  assert.match(jobs[0].task, /# Spec\nwhy/);
  assert.equal(board.jobs.length, 2);
  assert.equal(fanOutJobs(board, survey, { tasks }).length, 0, 'fanning out twice adds nothing');
});
