import test from 'node:test';
import assert from 'node:assert/strict';
import { WORKERS, STAGES, pickWorker } from '../../scripts/crew/workers.mjs';

test('agy_claude stands in for claude when claude is cooling', () => {
  const health = { claude: { state: 'cooling', until: new Date(Date.now() + 36e5).toISOString() } };
  assert.equal(pickWorker('author', { health, running: [] }), 'agy_claude');
});

test('agy_claude is anthropic, so it never reviews claude-authored work', () => {
  assert.equal(WORKERS.agy_claude.family, 'anthropic');
  const health = Object.fromEntries(['agy', 'codex', 'opencode'].map((w) => [w, { state: 'down' }]));
  assert.equal(pickWorker('review_en', { health, running: [], excludeFamilies: ['anthropic'] }), null);
});

test('every chain names only known workers', () => {
  for (const [stage, { chain }] of Object.entries(STAGES)) for (const w of chain) assert.ok(WORKERS[w], `${stage}: ${w}`);
});
