import test from 'node:test';
import assert from 'node:assert/strict';
import { CLAUDE_ROUTING, STAGES, WORKERS, claudeRouting } from '../../scripts/crew/workers.mjs';

// Feature 034 (quota efficiency): per-stage model and effort for the claude worker.
test('judgement stages run on opus, brief-following stages on sonnet', () => {
  for (const s of ['author', 'review_en', 'review_ur', 'maint_survey']) assert.equal(claudeRouting(s, {}).model, 'opus', s);
  for (const s of ['fix', 'repair_en', 'translate', 'figures', 'salvage', 'slides', 'flashcards']) assert.equal(claudeRouting(s, {}).model, 'sonnet', s);
});

test('an env override changes one stage only', () => {
  const env = { CREW_CLAUDE_MODEL_TRANSLATE: 'opus', CREW_CLAUDE_EFFORT_TRANSLATE: 'high' };
  assert.deepEqual(claudeRouting('translate', env), { model: 'opus', effort: 'high' });
  assert.deepEqual(claudeRouting('fix', env), CLAUDE_ROUTING.default);
});

test('the claude worker passes --model and --effort for its stage', () => {
  const [bin, args] = WORKERS.claude.cmd('do it', 'review_en');
  assert.equal(bin, 'claude');
  assert.deepEqual(args.slice(args.indexOf('--model'), args.indexOf('--model') + 4), ['--model', 'opus', '--effort', 'high']);
});

test('every routed stage exists', () => {
  for (const s of Object.keys(CLAUDE_ROUTING)) if (s !== 'default') assert.ok(STAGES[s], s);
});
