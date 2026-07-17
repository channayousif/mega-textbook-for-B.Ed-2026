import { describe, it, expect } from 'vitest';
import { makeFixture, runValidator, cleanup } from './_helpers.mjs';

// T014 — glossary-reference check (FR-016, T018)
describe('glossary-reference check', () => {
  it('passes when every <Glossary term> resolves to a bilingual entry', () => {
    const { root } = makeFixture({ glossaryRef: true });
    const { code } = runValidator(root);
    expect(code).toBe(0);
    cleanup(root);
  });

  it('fails when a <Glossary term> has no matching glossary.json key', () => {
    const { root } = makeFixture({ glossaryRef: true, glossary: [] });
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/no matching entry in glossary\.json/);
    cleanup(root);
  });

  it('fails when a glossary entry is missing the Urdu definition', () => {
    const { root } = makeFixture({
      glossaryRef: true,
      glossary: [{ term: 'Educational Psychology', definition_en: 'en only' }],
    });
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/glossary schema/);
    cleanup(root);
  });
});
