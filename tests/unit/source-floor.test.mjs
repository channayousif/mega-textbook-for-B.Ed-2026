/**
 * Fixture tests for scripts/check-source-floor.mjs.
 *
 * This gate is the compensating control D-2026-0013 assumed existed and
 * G-2026-17 found missing. It is opt-in and currently vacuous on the real tree
 * (EFMP-304 declares a floor but has no authored units yet), so without these
 * tests "it passes" would prove nothing at all.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GATE = join(REPO, 'scripts', 'check-source-floor.mjs');

const run = (root) => {
  const r = spawnSync('node', [GATE], { env: { ...process.env, CONTENT_ROOT: root }, encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
};

const ROWS = {
  verified: '| abrami2015 | Abrami, P. (2015). Strategies. *RER*. | https://doi.org/10.3102/x | 1 | curated-supplementary | Crossref-verified 2026-09-20 |',
  verified2: '| facione1990 | Facione, P. (1990). Delphi. | ERIC ED315423 | 1 | curated-supplementary | verified against the ERIC registry 2026-09-20 |',
  noDate: '| ennis1993 | Ennis, R. (1993). Assessment. | https://doi.org/10.1080/x | 1 | curated-supplementary | Crossref-verified |',
  noRegistry: '| mann2009 | Mann, K. (2009). Reflection. | https://doi.org/10.1007/x | 1 | curated-supplementary | read 2026-09-20 |',
  noExternal: '| local | Guide-given framework. | (none) | 1 | no-external-source | Crossref 2026-09-20 |',
};

/** A course declaring `floor` for unit 1, whose sources table holds `rows`. */
function fixture(floor, rows) {
  const root = mkdtempSync(join(tmpdir(), 'bed-floor-'));
  const unitDir = join(root, 'docs', 'semester-2', 'efmp-999', 'unit-01');
  mkdirSync(unitDir, { recursive: true });
  writeFileSync(join(unitDir, 'index.mdx'), '---\ntitle: "u"\n---\n\n# Unit\n');
  const specDir = join(root, 'specs', 'content', 'efmp-999');
  mkdirSync(join(specDir, 'sources'), { recursive: true });
  const fm = floor === null ? '' : `open_access_floor:\n  "1": ${floor}\n`;
  writeFileSync(join(specDir, 'content-spec.md'), `---\ncourse_code: EFMP-999\nstatus: approved\n${fm}---\n\n# Spec\n`);
  if (rows !== null) {
    writeFileSync(join(specDir, 'sources', 'unit-01.md'),
      ['# Sources', '', '| Key | Citation | URL/DOI | Supports | Kind | Note |', '|---|---|---|---|---|---|', ...rows].join('\n'));
  }
  return root;
}

describe('check-source-floor.mjs', () => {
  let root;
  afterEach(() => { if (root) rmSync(root, { recursive: true, force: true }); root = undefined; });

  it('passes when the floor is met', () => {
    root = fixture(2, [ROWS.verified, ROWS.verified2]);
    const { code, out } = run(root);
    expect(code).toBe(0);
    expect(out).toMatch(/floor met/);
  });

  it('fails when too few sources are registry-verified', () => {
    root = fixture(2, [ROWS.verified]);
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/1 registry-verified source\(s\), floor is 2/);
  });

  // The two halves of the verification token. A registry name with no date is
  // unfalsifiable; a date with no registry says nothing about what was checked.
  it('does not count a row naming a registry but carrying no date', () => {
    root = fixture(1, [ROWS.noDate]);
    expect(run(root).code).toBe(1);
  });

  it('does not count a row carrying a date but naming no registry', () => {
    root = fixture(1, [ROWS.noRegistry]);
    expect(run(root).code).toBe(1);
  });

  it('does not count a no-external-source row, however it is annotated', () => {
    root = fixture(1, [ROWS.noExternal]);
    expect(run(root).code).toBe(1);
  });

  it('fails loudly when a floor is declared but the sources file is absent', () => {
    root = fixture(1, null);
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/no sources\/unit-01\.md/);
  });

  it('skips a course that declares no floor', () => {
    root = fixture(null, [ROWS.noDate]);
    const { code, out } = run(root);
    expect(code).toBe(0);
    expect(out).toMatch(/no course declares one/);
  });
});
