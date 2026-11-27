import test from 'node:test';
import assert from 'node:assert/strict';
import { WORKERS, STAGES, pickWorker } from '../../scripts/crew/workers.mjs';

test('agy_claude stands in for claude when claude is cooling', () => {
  const health = { claude: { state: 'cooling', until: new Date(Date.now() + 36e5).toISOString() } };
  assert.equal(pickWorker('author', { health, running: [] }), 'agy_claude');
});

test('agy_claude is anthropic, so it never reviews claude-authored work', () => {
  assert.equal(WORKERS.agy_claude.family, 'anthropic');
  const health = Object.fromEntries(['agy', 'agy2', 'codex', 'claude_crew'].map((w) => [w, { state: 'down' }]));
  assert.equal(pickWorker('review_en', { health, running: [], excludeFamilies: ['anthropic'] }), null);
});

test('every chain names only known workers', () => {
  for (const [stage, { chain }] of Object.entries(STAGES)) for (const w of chain) assert.ok(WORKERS[w], `${stage}: ${w}`);
});

test('2026-W45 M1 removes only claude_crew from intel_distill', () => {
  const expected = {
    'salvage': ['claude', 'agy_claude', 'agy2_claude', 'codex', 'agy', 'agy2', 'claude_crew'],
    'author': ['claude', 'agy_claude', 'agy2_claude', 'codex', 'agy', 'agy2', 'claude_crew'],
    'repair_en': ['claude', 'agy_claude', 'agy2_claude', 'codex', 'agy', 'agy2', 'claude_crew'],
    'figures': ['codex', 'claude', 'agy_claude', 'agy2_claude', 'agy', 'agy2', 'claude_crew'],
    'plan_illustrations': ['claude', 'agy_claude', 'agy2_claude'],
    'illustrate': ['agy', 'codex'],
    'review_en': ['agy', 'agy2', 'codex', 'claude_crew', 'claude', 'agy_claude', 'agy2_claude'],
    'translate': ['codex', 'claude', 'agy_claude', 'agy2_claude', 'agy', 'agy2', 'claude_crew'],
    'review_ur': ['claude', 'agy_claude', 'agy2_claude', 'agy', 'agy2', 'claude_crew', 'codex'],
    'fix': ['claude_crew', 'codex', 'agy', 'agy2', 'claude', 'agy_claude', 'agy2_claude'],
    'refresh_figures': ['claude', 'agy_claude', 'agy2_claude', 'codex'],
    'flashcards': ['claude', 'agy_claude', 'agy2_claude', 'codex'],
    'slides': ['claude', 'agy_claude', 'agy2_claude', 'codex'],
    'intel_distill': ['agy', 'agy2', 'codex', 'claude', 'agy_claude', 'agy2_claude'],
    // Feature 030 media stages: MCP-bound steps run on claude, then claude_crew (same MCP servers).
    'teaser_script': ['claude', 'agy_claude', 'agy2_claude'],
    'teaser_clips': ['claude', 'claude_crew'],
    'media_assemble': ['claude', 'claude_crew'],
    'media_publish': ['claude', 'claude_crew'],
    'social_roundup': ['claude', 'agy_claude', 'agy2_claude', 'claude_crew', 'codex'],
    'studio_media': ['claude', 'claude_crew'],
    'studio_publish': ['claude', 'claude_crew'],
    'audio_overview': ['claude', 'claude_crew'],
    'maint_survey': ['claude', 'agy_claude', 'agy2_claude', 'codex', 'agy', 'agy2', 'claude_crew'],
    'maint_refactor': ['codex', 'claude', 'agy_claude', 'agy2_claude', 'claude_crew', 'agy', 'agy2'],
    'maint_docs': ['claude', 'agy_claude', 'agy2_claude', 'agy', 'agy2', 'codex', 'claude_crew'],
    'maint_adr': ['claude', 'agy_claude', 'agy2_claude', 'codex', 'agy', 'agy2'],
    'maint_skill': ['claude', 'agy_claude', 'agy2_claude', 'codex'],
    'maint_review': ['agy', 'agy2', 'codex', 'claude', 'agy_claude', 'agy2_claude', 'claude_crew']
  };
  assert.deepEqual(Object.fromEntries(Object.entries(STAGES).map(([stage, { chain }]) => [stage, chain])), expected);
});

test('Feature 034: agy2 follows agy and agy2_claude follows agy_claude, never in illustrate', () => {
  assert.equal(WORKERS.agy2.family, 'google');
  assert.equal(WORKERS.agy2_claude.family, 'anthropic');
  assert.equal(WORKERS.agy2.cmd('x')[0], 'agy2');
  for (const [stage, { chain }] of Object.entries(STAGES)) {
    if (chain.includes('agy') && stage !== 'illustrate') assert.equal(chain[chain.indexOf('agy') + 1], 'agy2', stage);
    if (chain.includes('agy_claude')) assert.equal(chain[chain.indexOf('agy_claude') + 1], 'agy2_claude', stage);
  }
  assert.deepEqual(STAGES.illustrate.chain, ['agy', 'codex']);
});

test('agy2 stands in for agy when agy is cooling', () => {
  const health = { agy: { state: 'cooling', until: new Date(Date.now() + 36e5).toISOString() } };
  assert.equal(pickWorker('review_en', { health, running: [] }), 'agy2');
});
