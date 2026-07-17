import { describe, it, expect } from 'vitest';
import { makeFixture, runValidator, cleanup } from './_helpers.mjs';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// T032 — missing required traceability metadata is rejected before publish (SC-007)
describe('missing-metadata gate', () => {
  it('fails and names the file when clo_refs is missing', () => {
    const { root, enDir } = makeFixture();
    // Overwrite index.mdx front-matter without clo_refs.
    writeFileSync(
      join(enDir, 'index.mdx'),
      `---\ntitle: "X"\ncourse_code: EFMP-301\nunit_no: 1\nblooms_summary: "b"\nest_reading_minutes: 5\ntranslation_status: reviewed\n---\n\n# Heading\n\n## Sub A\n\n## Sub B\n`,
    );
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/index\.mdx/);
    expect(out).toMatch(/clo_refs/);
    cleanup(root);
  });

  it('fails when an answer-key field is present (FR-012)', () => {
    const { root } = makeFixture({ overrides: { 'summative.mdx': { answer_key: 'secret' } } });
    const { code } = runValidator(root);
    expect(code).toBe(1);
    cleanup(root);
  });
});
