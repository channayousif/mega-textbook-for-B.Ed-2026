import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { isBlinking, mouthOverlay, poseAt } from '../remotion/src/Puppet.tsx';
import type { Rig } from '../remotion/src/props.ts';
import { digestBytes } from '../scripts/lib/hash.ts';
import { visemes } from '../scripts/lib/lipsync.ts';
import { loadCast } from '../scripts/lib/rig.ts';
import { writePcm16 } from '../scripts/lib/voice-fx.ts';

const fs = 48_000;
/** Concatenated sine segments: [seconds, amplitude, Hz]. */
const signal = (parts: Array<[number, number, number]>) => {
  const out: number[] = [];
  for (const [s, amp, hz] of parts) for (let i = 0; i < s * fs; i++) out.push(amp * Math.sin((2 * Math.PI * hz * i) / fs));
  return writePcm16(Float64Array.from(out), fs);
};

test('mouth track: one shape per frame, rest in silence, open when loud, nearly closed when quiet', () => {
  const m = visemes(signal([[0.5, 0, 200], [0.5, 0.8, 1000], [0.5, 0.05, 1000], [0.5, 0.25, 220], [0.5, 0.25, 1800]]), 30);
  assert.equal(m.length, 75);
  assert.match(m.slice(1, 14), /^X+$/);
  assert.match(m.slice(17, 29), /^A+$/);
  assert.match(m.slice(32, 44), /^M+$/);
  // Same loudness, darker sound rounds the lips (O); brighter spreads them (E).
  assert.match(m.slice(47, 59), /^O+$/);
  assert.match(m.slice(62, 74), /^E+$/);
  assert.ok(!/(^|[^X])X([^X]|$)/.test(m.slice(0, 74)), 'no single-frame flicker of rest');
});

const ov = (src: string) => ({ src, x: 0, y: 0, w: 1, h: 1 });
const rig: Rig = { canvas: [1080, 1440], poses: { idle: 'i' }, eyes: { open: ov('eo'), closed: ov('ec') }, mouths: { rest: ov('r'), A: ov('a') }, occluders: {} };

test('a rig without a shape falls back to the nearest one it has', () => {
  assert.equal(mouthOverlay(rig, 'E').src, 'a');
  assert.equal(mouthOverlay(rig, 'O').src, 'a');
  assert.equal(mouthOverlay(rig, 'M').src, 'r');
  assert.equal(mouthOverlay(rig, 'X').src, 'r');
});

test('blinks are seeded, 3 frames long and 3 to 5 s apart', () => {
  const frames = Array.from({ length: 30 * 30 }, (_, f) => isBlinking(f, 30, 'ep-ustani'));
  assert.deepEqual(frames, Array.from({ length: 900 }, (_, f) => isBlinking(f, 30, 'ep-ustani')));
  const starts = frames.flatMap((b, f) => (b && !frames[f - 1] ? [f] : []));
  assert.ok(starts.length >= 5 && starts.length <= 10, `${starts.length} blinks in 30 s`);
  for (let i = 1; i < starts.length; i++) assert.ok(starts[i] - starts[i - 1] >= 90 && starts[i] - starts[i - 1] <= 150);
  assert.notDeepEqual(starts, Array.from({ length: 900 }, (_, f) => isBlinking(f, 30, 'ep-shagird')).flatMap((b, f, a) => (b && !a[f - 1] ? [f] : [])));
});

test('gestures fade in and out inside their span and fall back to idle', () => {
  const spans = [{ from: 10, to: 40, pose: 'point' as const }];
  assert.deepEqual(poseAt(spans, 5), { pose: 'idle', opacity: 0 });
  assert.ok(poseAt(spans, 10).opacity > 0 && poseAt(spans, 10).opacity < 1);
  assert.deepEqual(poseAt(spans, 25), { pose: 'point', opacity: 1 });
  assert.ok(poseAt(spans, 39).opacity < 1);
});

const root = mkdtempSync(join(tmpdir(), 'vs-rig-'));
after(() => rmSync(root, { recursive: true, force: true }));

test('cast: rig files are re-hashed and served under public/cast/<character>/', () => {
  for (const ch of ['ustani', 'shagird']) {
    const dir = join(root, 'brand-assets', 'cast', ch);
    mkdirSync(dir, { recursive: true });
    const files: Record<string, string> = {};
    for (const f of ['base.png', 'ov_eyes_open.png', 'ov_eyes_closed.png', 'ov_mouth_rest.png']) {
      writeFileSync(join(dir, f), `${ch}-${f}`);
      files[f] = digestBytes(Buffer.from(`${ch}-${f}`));
    }
    const o = (src: string) => ({ src, x: 1, y: 2, w: 3, h: 4 });
    writeFileSync(join(dir, 'rig.json'), JSON.stringify({
      canvas: [1080, 1440], poses: { idle: 'base.png' }, eyes: { open: o('ov_eyes_open.png'), closed: o('ov_eyes_closed.png') },
      mouths: { rest: o('ov_mouth_rest.png') }, occluders: {}, files,
    }));
  }
  const c = loadCast(root, 'classroom');
  assert.equal(c.puppets!.ustani.poses.idle, 'cast/ustani/base.png');
  assert.equal(c.puppets!.shagird.mouths.rest.src, 'cast/shagird/ov_mouth_rest.png');
  assert.equal(c.set, null, 'a set that is not on disk is left out');
  assert.equal(Object.keys(c.files).length, 8);
  writeFileSync(join(root, 'brand-assets', 'cast', 'ustani', 'base.png'), 'tampered');
  assert.throws(() => loadCast(root, 'classroom'), /does not match its rig.json SHA-256/);
  assert.throws(() => loadCast(root, '../x'), /unknown set/);
});
