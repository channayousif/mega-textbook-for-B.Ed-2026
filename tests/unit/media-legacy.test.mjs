import { test, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { teaserJobs, notebookJobs, figureJobs, allJobs, TEASER_MAP, MEDIA_MAP } from '../../scripts/media/legacy.mjs';
import { STATES, PATH } from '../../scripts/media/states.mjs';
import { TEASER_STATES } from '../../scripts/notebook-studio/teaser.mjs';
import { STATES as MEDIA_STATES } from '../../scripts/notebook-studio/media-ledger.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

test('every legacy state has a shared equivalent, in order', () => {
  for (const [legacy, map] of [[TEASER_STATES, TEASER_MAP], [MEDIA_STATES, MEDIA_MAP]]) {
    const idx = legacy.map((s) => STATES.indexOf(map[s]));
    expect(idx.every((i) => i >= 0), legacy.join()).toBe(true);
    expect([...idx].sort((a, b) => a - b)).toEqual(idx);
  }
});

test('the real teaser ledger maps item for item, without being changed', () => {
  const p = join(ROOT, 'specs/studio/teasers/media-teasers.json');
  if (!existsSync(p)) return;
  const before = readFileSync(p, 'utf8');
  const raw = JSON.parse(before).items;
  const jobs = teaserJobs(ROOT);
  expect(jobs.map((j) => j.key)).toEqual(raw.map((i) => i.key));
  for (const j of jobs) expect(PATH['video.teaser']).toContain(j.state);
  expect(readFileSync(p, 'utf8')).toBe(before);
});

test('Notebook Studio ledgers and manifests map, and media rows are not counted twice', () => {
  const jobs = notebookJobs(ROOT);
  for (const j of jobs) expect(PATH[j.kind], j.key).toContain(j.state);
  const keys = jobs.map((j) => j.key);
  expect(new Set(keys).size).toBe(keys.length);
});

test('figure manifests map to image kinds', () => {
  const jobs = figureJobs(ROOT);
  expect(jobs.length).toBeGreaterThan(0);
  for (const j of jobs) {
    expect(['image.schematic', 'image.illustration']).toContain(j.kind);
    expect(PATH[j.kind]).toContain(j.state);
  }
});

test('allJobs returns one shared state per job', () => {
  for (const j of allJobs(ROOT)) expect(STATES).toContain(j.state);
});
