import { describe, it, expect } from 'vitest';
import { makeFixture, runValidator, cleanup } from './_helpers.mjs';

// T033 — assessment_weighting must sum to 100 (FR-010; custom check in T009)
describe('assessment_weighting sum check', () => {
  it('passes with the default 60/40 split', () => {
    const { root } = makeFixture({
      overrides: { 'summative.mdx': { assessment_weighting: { summative: 60, formative: 40 } } },
    });
    const { code } = runValidator(root);
    expect(code).toBe(0);
    cleanup(root);
  });

  it('fails when the weighting does not sum to 100', () => {
    const { root } = makeFixture({
      overrides: {
        'summative.mdx': {
          assessment_weighting: { summative: 70, formative: 40 },
          assessment_weighting_note: 'deliberately wrong for the test',
        },
      },
    });
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/must sum to 100/);
    cleanup(root);
  });
});
