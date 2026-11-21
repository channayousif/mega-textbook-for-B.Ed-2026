import { test, expect } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mediaStatus, formatStatus, ownerSection, producerStatus, teaserNotes, producersFor } from '../../scripts/media/status.mjs';
import { STATES } from '../../scripts/media/states.mjs';

const json = (p, v) => { mkdirSync(join(p, '..'), { recursive: true }); writeFileSync(p, JSON.stringify(v)); };

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'media-status-'));
  json(join(root, 'specs/studio/teasers/media-teasers.json'), { items: [
    { key: 'gqur-300-ur', id: 'gqur-300', locale: 'ur', state: 'scripted', gates: {}, clips: [] },
    { key: 'efmp-305-ur', id: 'efmp-305', locale: 'ur', state: 'qa3-pass', youtube_id: 'abc123', gates: {},
      clips: [{ shot: 3, take: 1, qa: { verdict: 'pass-with-notes', notes: 'repeats a word' } }, { shot: 5, take: 1, qa: { verdict: 'pass' }, precheck: { qg2_score: 0.7, missing: ['ڈاٹ'] } }] },
    { key: 'geng-301-ur', id: 'geng-301', locale: 'ur', state: 'public', gates: {}, clips: [] },
  ] });
  json(join(root, 'specs/studio/efmp-301/media-unit-04.json'), { items: [
    { key: 't1-ur-audio-p1', kind: 'audio', part: 1, topic: 1, locale: 'ur', state: 'qa3-pass', youtube_id: 'yt1' },
    { key: 't1-ur-video', kind: 'video', topic: 1, locale: 'ur', state: 'generated', blocked: 'NotebookLM cookies expired' },
  ] });
  json(join(root, 'specs/studio/efmp-301/unit-04.json'), { artifacts: [
    { kind: 'poster', topic: 1, locale: 'ur', status: 'placed' },
    { kind: 'audio', topic: 1, locale: 'ur', status: 'generated' },
  ] });
  mkdirSync(join(root, 'specs/content/efmp-301/figures'), { recursive: true });
  writeFileSync(join(root, 'specs/content/efmp-301/figures/unit-04.md'), [
    '| Figure ID | Kind | Status |', '|---|---|---|', '| U4-1 | flowchart | `placed` |', '| U4-2 | illustration | prompt-only |', ''].join('\n'));
  return root;
}
const quiet = { imageQuotaFile: '/nonexistent/i.json', mediaQuotaFile: '/nonexistent/m.json' };

test('one report lists jobs of four kinds with shared state names', () => {
  const st = mediaStatus({ root: fixture(), ...quiet });
  expect(new Set(st.jobs.map((j) => j.kind))).toEqual(new Set(['video.teaser', 'audio.brief', 'video.overview', 'doc.poster', 'image.schematic', 'image.illustration']));
  for (const j of st.jobs) expect(STATES).toContain(j.state);
  expect(st.counts['video.teaser']).toEqual({ scripted: 1, 'uploaded-private': 1, public: 1 });
  expect(st.counts['image.illustration']).toEqual({ planned: 1 });
  expect(st.jobs.find((j) => j.kind === 'image.illustration').producers).toEqual(producersFor('image.illustration'));
});

test('owner actions are grouped: scripts to approve, Shorts to watch with notes, blocked items', () => {
  const st = mediaStatus({ root: fixture(), ...quiet });
  expect(st.owner.scripts.map((j) => j.key)).toEqual(['gqur-300-ur']);
  expect(st.owner.spotCheck.map((j) => j.key).sort()).toEqual(['efmp-301-u04-t1-ur-audio-p1', 'efmp-305-ur']);
  expect(st.owner.publish.map((j) => j.key)).toEqual(['efmp-305-ur']);
  expect(st.owner.blocked.map((j) => j.owner.detail)).toEqual(['NotebookLM cookies expired']);
  const text = ownerSection(st).join('\n');
  expect(text).toMatch(/Scripts to approve: `gqur-300-ur`/);
  expect(text).toMatch(/efmp-305-ur https:\/\/youtube.com\/shorts\/abc123; notes: shot 3: repeats a word; shot 5: QG2 0.7, missing ڈاٹ/);
  expect(text).toMatch(/Producers: all available/);
});

test('the text view hides finished jobs unless --all', () => {
  const st = mediaStatus({ root: fixture(), ...quiet });
  expect(formatStatus(st)).not.toMatch(/\| geng-301-ur /);
  expect(formatStatus(st, { all: true })).toMatch(/\| geng-301-ur \| video.teaser/);
});

test('producer availability reads both quota files and the tunnel probe', () => {
  const dir = mkdtempSync(join(tmpdir(), 'media-status-q-'));
  const future = new Date(Date.now() + 3600e3).toISOString();
  writeFileSync(join(dir, 'i.json'), JSON.stringify({ agy: { resetAt: future } }));
  writeFileSync(join(dir, 'm.json'), JSON.stringify({ nlm: { resetAt: future } }));
  const p = producerStatus({ imageQuotaFile: join(dir, 'i.json'), mediaQuotaFile: join(dir, 'm.json'), probe: true, reachable: () => false });
  const of = (medium, producer) => p.find((r) => r.medium === medium && r.producer === producer);
  expect(of('image', 'agy')).toMatchObject({ state: 'quota', resetAt: future });
  expect(of('overview', 'nlm').state).toBe('quota');
  expect(of('clip', 'gflow.video').state).toBe('offline');
  expect(of('image', 'codex').state).toBe('ok');
});

test('teaser notes skip failed takes and well-matched speech', () => {
  expect(teaserNotes({ clips: [{ shot: 1, qa: { verdict: 'fail' }, precheck: { qg2_score: 0.2, missing: ['x'] } }, { shot: 2, precheck: { qg2_score: 0.95, missing: ['y'] } }] })).toEqual([]);
});
