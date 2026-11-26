import { describe, expect, it } from 'vitest';
import { familyOf, kindOf, summarize, toRecord, weight } from '../../scripts/ops/claude-usage.mjs';

const line = (id, model, usage, extra = {}) => ({ type: 'assistant', timestamp: '2026-11-26T10:00:00Z', sessionId: 's', message: { id, model, usage }, ...extra });

describe('claude-usage (Feature 034 quota efficiency)', () => {
  it('classifies models and session kinds', () => {
    expect(familyOf('claude-opus-5-5')).toBe('opus');
    expect(familyOf('claude-sonnet-5-5')).toBe('sonnet');
    expect(kindOf('crew-wt-efmp-301-u04', false)).toBe('crew');
    expect(kindOf('mega-book-for-B-Ed', true)).toBe('subagent');
    expect(kindOf('mega-book-for-B-Ed', false)).toBe('interactive');
  });

  it('dedupes by message id and totals per model', () => {
    const u = { input_tokens: 10, output_tokens: 2, cache_creation_input_tokens: 100, cache_read_input_tokens: 1000 };
    const recs = [line('m1', 'claude-opus-5-5', u), line('m1', 'claude-opus-5-5', u), line('m2', 'claude-sonnet-5-5', u)]
      .map((l) => toRecord(l, 'mega-book-for-B-Ed'));
    const s = summarize(recs);
    expect(s.total.all.messages).toBe(2);
    expect(s.byModel['claude-opus-5-5'].cacheRead).toBe(1000);
    expect(s.byModel['claude-opus-5-5'].weight).toBeGreaterThan(s.byModel['claude-sonnet-5-5'].weight);
  });

  it('ignores lines without usage', () => {
    expect(toRecord({ type: 'user' }, 'x')).toBeNull();
    expect(weight({ input: 0, output: 0, cacheWrite: 0, cacheRead: 0 }, 'claude-haiku-5-5')).toBe(0);
  });
});
