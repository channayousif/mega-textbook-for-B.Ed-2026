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

test('2026-W45 M1 removes only opencode from intel_distill', () => {
  const expected = {
    'salvage': ['claude', 'agy_claude', 'codex', 'agy', 'opencode'],
    'author': ['claude', 'agy_claude', 'codex', 'agy', 'opencode'],
    'repair_en': ['claude', 'agy_claude', 'codex', 'agy', 'opencode'],
    'figures': ['codex', 'claude', 'agy_claude', 'agy', 'opencode'],
    'plan_illustrations': ['claude', 'agy_claude'],
    'illustrate': ['agy', 'codex'],
    'review_en': ['agy', 'codex', 'opencode', 'claude', 'agy_claude'],
    'translate': ['codex', 'claude', 'agy_claude', 'agy', 'opencode'],
    'review_ur': ['claude', 'agy_claude', 'agy', 'opencode', 'codex'],
    'fix': ['opencode', 'codex', 'agy', 'claude', 'agy_claude'],
    'intel_distill': ['agy', 'codex', 'claude', 'agy_claude'],
    'maint_survey': ['claude', 'agy_claude', 'codex', 'agy', 'opencode'],
    'maint_refactor': ['codex', 'claude', 'agy_claude', 'opencode', 'agy'],
    'maint_docs': ['claude', 'agy_claude', 'agy', 'codex', 'opencode'],
    'maint_adr': ['claude', 'agy_claude', 'codex', 'agy'],
    'maint_skill': ['claude', 'agy_claude', 'codex'],
    'maint_review': ['agy', 'codex', 'claude', 'agy_claude', 'opencode']
  };
  assert.deepEqual(Object.fromEntries(Object.entries(STAGES).map(([stage, { chain }]) => [stage, chain])), expected);
});
