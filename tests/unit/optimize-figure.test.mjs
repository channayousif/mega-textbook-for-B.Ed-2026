/**
 * Smoke tests for scripts/optimize-figure.mjs (Spec 009 T014). Offline + fast:
 * exercises the --svg path and the argument/guard behaviour; a full sharp raster
 * round-trip is not run here (kept dependency-light and quick).
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, writeFileSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SCRIPT = join(REPO, 'scripts', 'optimize-figure.mjs');

function run(args) {
  const res = spawnSync('node', [SCRIPT, ...args], { encoding: 'utf8' });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
}

describe('optimize-figure.mjs', () => {
  let dir;
  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
    dir = undefined;
  });

  it('--svg strips comments + whitespace and stays valid', () => {
    dir = mkdtempSync(join(tmpdir(), 'optfig-'));
    const src = join(dir, 'in.svg');
    const out = join(dir, 'out.svg');
    writeFileSync(
      src,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <!-- a comment that should go -->
        <title>x</title>
        <rect    x="0"   y="0"  width="10" height="10" />
      </svg>`,
    );
    const { code } = run(['--svg', src, out]);
    expect(code).toBe(0);
    const result = readFileSync(out, 'utf8');
    expect(result).not.toMatch(/<!--/);
    expect(result).toMatch(/<svg/);
    expect(result).toMatch(/<title>x<\/title>/);
    expect(statSync(out).size).toBeLessThan(statSync(src).size);
  });

  it('--svg fails when the result would exceed the 20 KB budget', () => {
    dir = mkdtempSync(join(tmpdir(), 'optfig-'));
    const src = join(dir, 'big.svg');
    const filler = '<rect x="0" y="0" width="1" height="1"/>'.repeat(1200); // > 20 KB
    writeFileSync(src, `<svg xmlns="http://www.w3.org/2000/svg">${filler}</svg>`);
    const { code, out } = run(['--svg', src, join(dir, 'big.out.svg')]);
    expect(code).toBe(1);
    expect(out).toMatch(/budget/i);
  });

  it('errors cleanly on a missing input', () => {
    const { code, out } = run(['--svg', '/no/such/file.svg', '/tmp/x.svg']);
    expect(code).toBe(1);
    expect(out).toMatch(/not found/i);
  });

  it('errors when raster output is not a .webp path', () => {
    dir = mkdtempSync(join(tmpdir(), 'optfig-'));
    const src = join(dir, 'in.png');
    writeFileSync(src, 'not a real png');
    const { code, out } = run([src, join(dir, 'out.png')]);
    expect(code).toBe(1);
    expect(out).toMatch(/webp/i);
  });
});
