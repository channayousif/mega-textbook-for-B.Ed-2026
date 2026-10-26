import test from 'node:test';
import assert from 'node:assert/strict';
import { batchDue, batchCandidates, batchId, batchTitle, batchBody, exclusionReason } from '../../scripts/crew/batch.mjs';

const at = (iso) => Date.parse(iso);

test('batchDue: first batch at once, then at most one an hour', () => {
  assert.equal(batchDue({ jobs: [] }, at('2026-10-19T12:00:00Z'), 60), true);
  const board = { jobs: [], lastBatchAt: '2026-10-19T12:00:00Z' };
  assert.equal(batchDue(board, at('2026-10-19T12:59:00Z'), 60), false);
  assert.equal(batchDue(board, at('2026-10-19T13:00:00Z'), 60), true);
});

test('batchDue: never while a batch PR is open or waiting on a fix', () => {
  for (const status of ['pr_open', 'gate_red']) {
    const board = { jobs: [{ id: 'batch-1', stage: 'batch', status }], lastBatchAt: '2026-10-19T09:00:00Z' };
    assert.equal(batchDue(board, at('2026-10-19T13:00:00Z'), 60), false, status);
  }
  const held = { jobs: [{ id: 'batch-1', stage: 'batch', status: 'blocked' }], lastBatchAt: '2026-10-19T09:00:00Z' };
  assert.equal(batchDue(held, at('2026-10-19T13:00:00Z'), 60), true);
});

test('batchCandidates: ready jobs oldest first, skipping one whose merge fix is still running', () => {
  const jobs = [
    { id: 'b', status: 'ready', readyAt: '2026-10-19T10:30:00Z' },
    { id: 'a', status: 'ready', readyAt: '2026-10-19T10:00:00Z' },
    { id: 'c', status: 'ready', readyAt: '2026-10-19T09:00:00Z' },
    { id: 'c-conflict1', parent: 'c', status: 'running' },
    { id: 'd', status: 'pr_open' },
    { id: 'e', status: 'ready', readyAt: '2026-10-19T08:00:00Z' },
    { id: 'e-conflict1', parent: 'e', status: 'merged' },
  ];
  assert.deepEqual(batchCandidates(jobs).map((j) => j.id), ['e', 'a', 'b']);
});

test('batchId, title and body', () => {
  const iso = '2026-10-19T12:05:31.000Z';
  assert.equal(batchId(iso), 'batch-20261019-1205');
  const members = [
    { id: 'efmp-303-u01-translate', course: 'EFMP-303', stage: 'translate', worker: 'codex', summary: 'Urdu mirror | unit 1' },
    { id: 'gict-300-u02-translate', course: 'GICT-300', stage: 'translate', worker: 'claude', summary: 'Urdu mirror' },
  ];
  assert.equal(batchTitle(members, iso), 'crew: batch 2026-10-19 12:05Z, 2 jobs (EFMP-303, GICT-300)');
  const body = batchBody(members, { left: [{ id: 'x-u01-fix' }], supersedes: ['119'] });
  assert.match(body, /\| `efmp-303-u01-translate` \| translate \| codex \| Urdu mirror \/ unit 1 \|/);
  assert.match(body, /Left for the next batch \(a merge fix is queued\): `x-u01-fix`\./);
  assert.match(body, /Supersedes #119\./);
  assert.doesNotMatch(body, /\u2014/);
});

test('exclusionReason: zero, one and more than five paths', () => {
  assert.equal(exclusionReason('crew/x-u01-author', []), 'crew/x-u01-author conflicts with main.');
  assert.equal(
    exclusionReason('crew/x-u01-author', ['glossary.json']),
    'crew/x-u01-author conflicts with main (glossary.json).',
  );
  const many = ['glossary.json', 'specs/decisions/log.md', 'specs/content/efmp-301/tasks.md', 'specs/gaps.md', 'static/content-status.json', 'catalog/courses.json'];
  assert.equal(
    exclusionReason('crew/x-u01-author', many),
    'crew/x-u01-author conflicts with main (glossary.json, specs/decisions/log.md, specs/content/efmp-301/tasks.md, specs/gaps.md, static/content-status.json and 1 more).',
  );
});
