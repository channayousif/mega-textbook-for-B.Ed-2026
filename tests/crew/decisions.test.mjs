import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { closePrDecisions, closeLandedDecisions } from '../../scripts/crew/decisions.mjs';

const at = '2026-11-15T00:00:00.000Z';
const question = (id, pr, extra = {}) => ({ id, pr, status: 'open', options: ['merge', 'hold'], ...extra });
const source = readFileSync(new URL('../../scripts/crew/crew.mjs', import.meta.url), 'utf8');
// Execute the real command handler without importing the dispatcher's CLI or host-local state.
const handleCommand = vm.runInNewContext(source.slice(source.indexOf('function handleCommand('), source.indexOf('\nconst norm =')) + '\nhandleCommand', {
  now: () => at,
  log: () => {},
});

test('closes every matching open PR decision and preserves answered, closed and unrelated items', () => {
  const decisions = { items: [question('C-017', 497), question('C-018', 497),
    question('C-019', 497, { status: 'answered', answer: 'hold', note: 'wait' }),
    question('C-020', 498), question('C-021', 497, { status: 'closed', closedAt: 'old', note: 'old' })] };
  const untouched = structuredClone(decisions.items.slice(2));
  assert.deepEqual(closePrDecisions(decisions, 497, 'merged', at), ['C-017', 'C-018']);
  for (const item of decisions.items.slice(0, 2)) {
    assert.equal(item.status, 'closed');
    assert.equal(item.closedAt, at);
    assert.equal(item.note, 'PR #497 was merged.');
  }
  assert.deepEqual(decisions.items.slice(2), untouched);
  assert.deepEqual(closePrDecisions(decisions, 497, 'merged', 'later'), []);
});

test('tick sweep recovers merged and closed jobs, ignores active jobs and missing PRs', () => {
  const decisions = { items: [question('C-017', 497), question('C-018', 498), question('C-019', 499), question('C-020', undefined)] };
  const board = { jobs: [
    { status: 'merged', prNumber: 497 }, { status: 'closed', prNumber: 498 },
    { status: 'pr_open', prNumber: 499 }, { status: 'merged' },
    { status: 'merged', prNumber: 497 },
  ] };
  assert.deepEqual(closeLandedDecisions(decisions, board, at), ['C-017', 'C-018']);
  assert.equal(decisions.items[1].note, 'PR #498 was closed.');
  assert.equal(decisions.items[2].status, 'open');
  assert.equal(decisions.items[3].status, 'open');
  assert.deepEqual(closeLandedDecisions(decisions, board, 'later'), []);
  assert.match(source, /phase\('decisions', .*closeLandedDecisions\(decisions, board, now\(\)\)/);
});

test('closed replies explain closure and never approve, hold or otherwise mutate state', () => {
  const state = { decisions: { items: [question('C-017', 497, { job: 'job' })] }, board: { jobs: [{ id: 'job', status: 'merged' }] }, control: {}, health: {} };
  closePrDecisions(state.decisions, 497, 'merged', at);
  const before = structuredClone(state);
  for (const reply of ['C-017 merge', 'c-017 hold', 'C-017']) {
    assert.equal(handleCommand(reply, state), 'C-017 was closed: PR #497 was merged.');
    assert.deepEqual(state, before);
  }
});

test('open merge replies still record the answer and owner approval', () => {
  const files = ['scripts/crew/crew.mjs'];
  const state = { decisions: { items: [question('C-017', 497, { job: 'job', files })] }, board: { jobs: [{ id: 'job', status: 'pr_open' }] } };
  assert.match(handleCommand('C-017 merge approved', state), /noted C-017: merge/);
  assert.equal(state.decisions.items[0].status, 'answered');
  assert.equal(state.decisions.items[0].note, 'approved');
  assert.equal(state.board.jobs[0].ownerApproved.id, 'C-017');
  assert.equal(state.board.jobs[0].ownerApproved.files, files);
});

test('managePrs closes decisions for observed merged and closed PRs and reports their IDs', () => {
  for (const outcome of ['MERGED', 'CLOSED']) {
    const context = {
      DRY: false, ROOT: '.', now: () => at, closePrDecisions,
      sh: () => ({ ok: true, out: JSON.stringify({ state: outcome }) }),
      landed: (_board, job) => { job.status = 'merged'; },
      log: () => {}, cleanup: () => {}, queueCiFixes: () => {},
    };
    const note = source.slice(source.indexOf('function noteClosedDecisions('), source.indexOf('\nfunction ask('));
    const manage = source.slice(source.indexOf('function managePrs('), source.indexOf('\n/**\n * Owner ruling 2026-10-17: once a salvage'));
    const run = vm.runInNewContext(`${note}\n${manage}\nmanagePrs`, context);
    const board = { jobs: [{ id: 'job', status: 'pr_open', prNumber: 497 }] };
    const decisions = { items: [question('C-017', 497), question('C-018', 497)] };
    const events = [];
    run(board, decisions, events);
    assert.equal(board.jobs[0].status, outcome.toLowerCase());
    assert.equal(decisions.items[0].note, `PR #497 was ${outcome.toLowerCase()}.`);
    assert.deepEqual(events, ['Closed owner decisions: C-017, C-018']);
  }
});
