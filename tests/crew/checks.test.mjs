import test from 'node:test';
import assert from 'node:assert/strict';
import { freshChecks } from '../../scripts/crew/checks.mjs';

const check = (name, startedAt, conclusion = 'FAILURE') => ({ name, startedAt, status: 'COMPLETED', conclusion });

test('freshChecks keeps every check when the crew never pushed', () => {
  const checks = [check('build', '2026-10-17T20:02:00Z')];
  assert.deepEqual(freshChecks(checks, undefined), checks);
});

test('freshChecks drops the old head failure read right after a push', () => {
  // #164 on 2026-10-18: fix pushed 18:59:59, new run started 19:00:04, old build failed the day before.
  const old = check('build', '2026-10-17T20:02:00Z');
  const fresh = check('changes', '2026-10-18T19:00:10Z', 'SUCCESS');
  assert.deepEqual(freshChecks([old, fresh], '2026-10-18T18:59:59Z'), [fresh]);
  assert.deepEqual(freshChecks([old], '2026-10-18T18:59:59Z'), []);
});

test('freshChecks tolerates a minute of clock skew and falls back to createdAt', () => {
  const skewed = check('build', '2026-10-18T18:59:30Z');
  const status = { context: 'legacy', state: 'FAILURE', createdAt: '2026-10-18T19:01:00Z' };
  assert.deepEqual(freshChecks([skewed, status], '2026-10-18T19:00:00Z'), [skewed, status]);
});
