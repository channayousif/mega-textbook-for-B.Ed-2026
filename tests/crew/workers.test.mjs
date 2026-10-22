import test from 'node:test';
import assert from 'node:assert/strict';
import { QUOTA_RE, pickWorker } from '../../scripts/crew/workers.mjs';

test('every worker limit message seen in the logs counts as quota, not bad work', () => {
  // 2026-10-22: the first two slipped through and eight jobs went gate_red on quota alone.
  for (const msg of [
    "You've hit your weekly limit · resets 11pm (Etc/GMT-5)",
    'ERROR: Selected model is at capacity. Please try a different model.',
    "You've hit your session limit · resets 2:50pm (Etc/GMT-5)",
    'ERROR: You’ve hit your usage limit. Upgrade to Pro',
    'RESOURCE_EXHAUSTED (code 429): Individual quota reached.',
  ]) assert.ok(QUOTA_RE.test(msg), msg);
  assert.ok(!QUOTA_RE.test('✗ Pipeline gate failed with 2 finding(s):'));
});

test('a worker in avoid is skipped for the next in the chain', () => {
  const health = {};
  assert.equal(pickWorker('author', { health, running: [] }), 'claude');
  assert.equal(pickWorker('author', { health, running: [], avoid: ['claude'] }), 'codex');
});
