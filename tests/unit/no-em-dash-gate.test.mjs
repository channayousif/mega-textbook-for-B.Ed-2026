/**
 * Fixture tests for scripts/check-no-em-dash.mjs - Constitution Art. III.9 (Punctuation).
 *
 * The gate walks the given roots (--scan-dir, repeatable) for .md / .mdx / .csv files and
 * fails (exit 1) on any em-dash-class character (U+2014, U+2015, U+2E3A, U+2E3B). The en
 * dash (U+2013) is explicitly NOT flagged - it stays valid for numeric ranges.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GATE = join(REPO, 'scripts', 'check-no-em-dash.mjs');

function runOn(root) {
  const res = spawnSync('node', [GATE, '--scan-dir', root], { encoding: 'utf8' });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
}

function withFile(name, contents) {
  const root = mkdtempSync(join(tmpdir(), 'bed-emdash-'));
  const dir = join(root, 'docs', 'semester-1', 'efmp-302', 'unit-01');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, name), contents);
  return root;
}

describe('check-no-em-dash.mjs', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  it('passes a clean file', () => {
    root = withFile('topic-01.mdx', '# Topic\n\nTeaching is a profession - it has a knowledge base.\n');
    expect(runOn(root).code).toBe(0);
  });

  it('fails on a U+2014 em dash and reports file:line:col', () => {
    root = withFile('topic-01.mdx', '# Topic\n\nTeaching is a profession — it has a knowledge base.\n');
    const { code, out } = runOn(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic-01\.mdx:3:/);
    expect(out).toMatch(/U\+2014/);
  });

  it('fails on a U+2015 horizontal bar', () => {
    root = withFile('topic-02.mdx', '# T\n\nfoo ― bar\n');
    expect(runOn(root).code).toBe(1);
  });

  it('does NOT flag a U+2013 en dash (numeric range)', () => {
    root = withFile('topic-03.mdx', '# T\n\nFormative: 5–8 items per topic.\n');
    expect(runOn(root).code).toBe(0);
  });

  it('does NOT flag an ASCII hyphen-minus', () => {
    root = withFile('topic-04.mdx', '# T\n\nA well-planned lesson - short and active.\n');
    expect(runOn(root).code).toBe(0);
  });

  it('counts every occurrence across files', () => {
    root = withFile('topic-01.mdx', 'a — b — c\n');
    writeFileSync(join(root, 'docs', 'semester-1', 'efmp-302', 'unit-01', 'topic-02.mdx'), 'x — y\n');
    const { code, out } = runOn(root);
    expect(code).toBe(1);
    expect(out).toMatch(/3 occurrence\(s\)/);
  });

  it('ignores non-content extensions', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-emdash-'));
    writeFileSync(join(root, 'notes.txt'), 'a — b\n');
    writeFileSync(join(root, 'code.ts'), 'const x = "a — b";\n');
    expect(runOn(root).code).toBe(0);
  });
});
