import { test, expect } from 'vitest';
import { mkdtempSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { STATES, KINDS, PATH, nextState, entryProblems } from '../../scripts/media/states.mjs';
import { load, save, update, advance, recordTake, uploadsOn, DAILY_UPLOAD_LIMIT } from '../../scripts/media/ledger.mjs';
import { clean, LONG_DASH } from '../../scripts/media/brand.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const tmp = () => mkdtempSync(join(tmpdir(), 'media-ledger-'));
const teaser = (over = {}) => ({ key: 'gqur-300-ur', kind: 'video.teaser', scope: { course: 'GQUR-300', locale: 'ur' },
  state: 'planned', gates: {}, outputs: {}, takes: [], ...over });

test('every kind path is an ordered subset of the shared vocabulary', () => {
  for (const k of KINDS) {
    const idx = PATH[k].map((s) => STATES.indexOf(s));
    expect(idx.every((i) => i >= 0)).toBe(true);
    expect([...idx].sort((a, b) => a - b)).toEqual(idx);
  }
  expect(nextState('image.schematic', 'planned')).toBe('generated');
  expect(nextState('video.teaser', 'public')).toBe('placed');
});

test('a teaser cannot reach approved without the owner, nor skip states', () => {
  const L = { items: [teaser()] };
  expect(() => advance(L, 'gqur-300-ur', 'approved')).toThrow(/not the next state/);
  advance(L, 'gqur-300-ur', 'scripted', { script_sha256: 'a'.repeat(64), gates: { qg0: { verdict: 'pass', by: 'teaser.mjs' } } });
  expect(() => advance(L, 'gqur-300-ur', 'approved', { gates: { script: { verdict: 'approve', by: 'claude' } } })).toThrow(/only the owner/);
  advance(L, 'gqur-300-ur', 'approved', { gates: { script: { verdict: 'approve', by: 'owner' } } });
  expect(L.items[0].state).toBe('approved');
  expect(() => advance(L, 'gqur-300-ur', 'generating', {})).not.toThrow();
  expect(() => advance(L, 'gqur-300-ur', 'generated', {})).toThrow(/needs takes/);
});

test('a failing gate blocks entry', () => {
  const job = teaser({ state: 'generated', takes: [{ part: 1 }], gates: { qg2: { verdict: 'fail', by: 'x' } } });
  expect(entryProblems(job, 'checked').join()).toMatch(/verdict is fail/);
});

test('a duplicate take file is refused across ledgers', () => {
  const A = { items: [teaser()] };
  const B = { items: [teaser({ key: 'efmp-305-ur' })] };
  recordTake(A, 'gqur-300-ur', { part: 1, producer: 'gflow.video', source: 'generated', sha256: 'f'.repeat(64) });
  expect(() => recordTake(B, 'efmp-305-ur', { part: 2, producer: 'gflow.video', source: 'generated', sha256: 'f'.repeat(64) }, { ledgers: [A, B] }))
    .toThrow(/identical/);
  const t2 = recordTake(A, 'gqur-300-ur', { part: 1, producer: 'manual.flow', source: 'manual' });
  expect(t2.take).toBe(2);
});

test('the daily upload cap counts both ledger shapes', () => {
  const now = new Date('2026-11-20T10:00:00Z');
  const items = Array.from({ length: DAILY_UPLOAD_LIMIT }, (_, i) => (i % 2 ? { uploaded_at: now.toISOString() } : { outputs: { uploaded_at: now.toISOString() } }));
  expect(uploadsOn([{ items }], now)).toBe(DAILY_UPLOAD_LIMIT);
  const L = { items: [teaser({ state: 'assembled' })] };
  expect(() => advance(L, 'gqur-300-ur', 'uploaded-private', { outputs: { youtube_id: 'x', uploaded_at: now.toISOString() } }, { ledgers: [L, { items }], now }))
    .toThrow(/daily upload limit/);
});

test('save is atomic and keeps the house format', () => {
  const p = join(tmp(), 'l.json');
  save(p, { items: [{ a: 'ب' }] });
  expect(readFileSync(p, 'utf8')).toBe('{\n "items": [\n  {\n   "a": "ب"\n  }\n ]\n}\n');
  expect(load(join(tmp(), 'missing.json'))).toEqual({ items: [] });
});

test('two processes updating one ledger lose nothing', () => {
  const p = join(tmp(), 'l.json');
  save(p, { items: [] });
  const mod = join(ROOT, 'scripts/media/ledger.mjs');
  const script = (tag) => `import { update } from ${JSON.stringify(mod)};
for (let i = 0; i < 40; i++) update(${JSON.stringify(p)}, (l) => { l.items.push({ key: '${tag}' + i }); });`;
  const kids = ['a', 'b'].map((t) => spawnSync(process.execPath, ['--input-type=module', '-e', script(t)], { encoding: 'utf8' }));
  for (const k of kids) expect(k.status, k.stderr).toBe(0);
  expect(load(p).items).toHaveLength(80);
  expect(existsSync(`${p}.lock`)).toBe(false);
});

test('a stale lock does not wedge the ledger', () => {
  const p = join(tmp(), 'l.json');
  writeFileSync(`${p}.lock`, '');
  const old = Date.now() / 1000 - 600;
  spawnSync('touch', ['-d', `@${old}`, `${p}.lock`]);
  update(p, (l) => { l.items.push(1); });
  expect(load(p).items).toEqual([1]);
});

test('brand clean() removes long dashes', () => {
  expect(clean('a — b  <c>')).toBe('a - b c');
  expect(LONG_DASH.test(clean('x―y'))).toBe(false);
});

test('a job validates against the schema', () => {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(JSON.parse(readFileSync(join(ROOT, 'specs/studio/media-job.schema.json'), 'utf8')));
  const job = teaser({ recipe: { name: 'teaser', version: 2 }, takes: [{ part: 1, take: 1, producer: 'gflow.video', source: 'generated', credits: 10 }] });
  expect(validate(job), JSON.stringify(validate.errors)).toBe(true);
  expect(validate({ ...job, kind: 'video.other' })).toBe(false);
});
