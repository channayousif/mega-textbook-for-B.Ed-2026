import { describe, it, expect } from 'vitest';
import { makeFixture, runValidator, cleanup } from './_helpers.mjs';
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// T013 — EN<->UR structural parity gate (FR-001, build-enforced for reviewed units)
describe('EN<->UR parity gate', () => {
  it('passes when a reviewed unit has matching heading structure', () => {
    const { root } = makeFixture();
    const { code } = runValidator(root);
    expect(code).toBe(0);
    cleanup(root);
  });

  it('fails when the UR version drops a heading', () => {
    const { root, urDir } = makeFixture();
    // Rewrite UR index with a diverging heading vector ([1,2] instead of [1,2,2]).
    const urIndex = join(urDir, 'index.mdx');
    const withFm = readFileSync(urIndex, 'utf8').split('---\n');
    writeFileSync(urIndex, `---\n${withFm[1]}---\n\n# سرخی\n\n## ذیلی\n`);
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/heading structure diverges/);
    cleanup(root);
  });

  it('fails when a reviewed unit has no UR mirror at all', () => {
    const { root } = makeFixture({ omitUr: true });
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/requires an Urdu mirror/);
    cleanup(root);
  });

  // Constitution III.2 carve-out — a course flagged `bilingual: false` (e.g. GENG-300
  // Functional English) is exempt from the parity gate even when reviewed with no UR mirror.
  it('passes when a reviewed unit has no UR mirror but its course is bilingual: false', () => {
    const { root } = makeFixture({ omitUr: true, courseOverview: { bilingual: false } });
    const { code } = runValidator(root);
    expect(code).toBe(0);
    cleanup(root);
  });
});
