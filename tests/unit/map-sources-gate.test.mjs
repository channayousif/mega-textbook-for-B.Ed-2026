/**
 * Fixture tests for scripts/check-map-sources.mjs (ADR-0033).
 * Same spawn-a-script-against-a-CONTENT_ROOT-temp-dir pattern as figures-gate.test.mjs.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GATE = join(REPO, 'scripts', 'check-map-sources.mjs');
const HEADER = '| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |\n|---|---|---|---|---|---|---|';

function fixture(rows) {
  const root = mkdtempSync(join(tmpdir(), 'bed-map-'));
  const dir = join(root, 'specs', 'content', 'gpks-402', 'figures');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'unit-04.md'), `# Figures\n\n${HEADER}\n${rows.join('\n')}\n`);
  return root;
}
const row = (kind, prompt, status = 'placed', alt = 'A labelled figure.') =>
  `| fig-U4-6 | 4.3 | ${kind} | ${prompt} | ${alt} | /img/figures/gpks-402/unit-04/fig-U4-6.svg | ${status} |`;
const run = (root) => {
  const res = spawnSync('node', [GATE], { env: { ...process.env, CONTENT_ROOT: root }, encoding: 'utf8' });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
};

describe('check-map-sources.mjs', () => {
  let root;
  afterEach(() => { if (root) rmSync(root, { recursive: true, force: true }); root = undefined; });

  // The corpus check runs here, inside `npm test` (CI and check:all), rather than as a gate tier:
  // gates.mjs and the gate scripts are hashed review inputs, so adding a tier would stale every review.
  it('the committed corpus has no unsourced map', () => {
    const res = spawnSync('node', [GATE], { cwd: REPO, env: { ...process.env, CONTENT_ROOT: '' }, encoding: 'utf8' });
    expect(res.stderr || '').toBe('');
    expect(res.status).toBe(0);
  });

  it('rejects a placed freehand map of real territory', () => {
    root = fixture([row('diagram', 'diagram, portrait: a simplified map-style diagram of Pakistan')]);
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U4-6.*map of real territory/);
    expect(out).toMatch(/ADR-0033/);
  });

  it('rejects a map named only in the alt text', () => {
    root = fixture([row('illustration', 'a landscape scene', 'generated', 'Physical map of Sindh with the Indus.')]);
    expect(run(root).code).toBe(1);
  });

  it('accepts a map whose Prompt names its Source', () => {
    root = fixture([row('diagram', 'map of Pakistan. Source: Natural Earth 5.1.1, Pakistan point of view')]);
    expect(run(root).code).toBe(0);
  });

  it('ignores concept maps, tables and prompt-only plans', () => {
    root = fixture([
      row('diagram', 'a concept map of causes and effects'),
      row('table', 'table of regions; replaces a freehand map-style diagram'),
      row('diagram', 'a map of Pakistan', 'prompt-only'),
    ]);
    expect(run(root).code).toBe(0);
  });
});
