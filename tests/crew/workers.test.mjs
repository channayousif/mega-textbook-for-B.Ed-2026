import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { QUOTA_RE, COOLDOWN_MIN, resetMinutes, pickWorker } from '../../scripts/crew/workers.mjs';

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
  assert.equal(pickWorker('author', { health, running: [], avoid: ['claude'] }), 'agy_claude');
});

test('resetMinutes parses relative durations and rounds seconds up', () => {
  for (const [text, minutes] of [
    ['Resets in 63h26m50s', 3807],
    ['quota reached. resets in 63h26m.', 3806],
    ['RESETS IN 2h', 120],
    ['Resets in 26m', 26],
    ['Resets in 1s', 1],
    ['Resets in 1h 2m 0s', 62],
    ['Resets in 0h0m0s', 0],
    ['Resets in 999h59m59s', 10080],
    ['Resets in 168h', 10080],
  ]) assert.equal(resetMinutes(text), minutes, text);
});

test('resetMinutes leaves clock times and missing durations to strike backoff', () => {
  for (const text of ['resets 11pm', 'try again at 7:00 AM', 'quota reached',
    'Resets in', 'Resets in -2h', 'Resets in 2hours', 'Resets in 1.5h']) {
    assert.equal(resetMinutes(text), null, text);
  }
});

test('cool honors reset durations, strike backoff and fallback worker selection', () => {
  // crew.mjs runs its CLI on import. Evaluate only cool to avoid dispatcher side effects.
  const source = readFileSync(new URL('../../scripts/crew/crew.mjs', import.meta.url), 'utf8');
  const body = source.match(/^function cool\(health, worker, reason\) \{[\s\S]*?^\}/m)?.[0];
  assert.ok(body);
  const now = Date.now();
  const cool = runInNewContext(`${body}; cool`, {
    COOLDOWN_MIN, resetMinutes, Date: class extends Date { static now() { return now; } },
  });
  for (const [strikes, reason, minutes] of [
    [0, 'Resets in 63h26m50s', 3807],
    [1, 'Resets in 1m', 120],
    [2, 'resets 11pm', 360],
    [10, 'no reset duration', 360],
    [0, 'Resets in 999h', 10080],
    [0, 'Resets in 63h26m50s. ' + 'x'.repeat(400), 3807],
  ]) {
    const health = { claude: { strikes } };
    assert.equal(cool(health, 'claude', reason), minutes);
    assert.equal(health.claude.strikes, strikes + 1);
    assert.equal(Date.parse(health.claude.until), now + minutes * 60000);
    assert.equal(health.claude.last_error, reason.slice(0, 300));
    assert.equal(pickWorker('author', { health, running: [] }), 'agy_claude');
  }
});
