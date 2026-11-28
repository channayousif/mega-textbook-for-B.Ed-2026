#!/usr/bin/env node
// Cut one Short candidate out of a 16:9 lesson and lay it out for 9:16 (Feature 038, spec FR-005).
//
//   node scripts/media/pack/reframe.mjs <long.mp4> --start S --end E --out short-base.mp4 [--mode stack|crop] [--x 0.5]
//
// stack (default): the 16:9 picture sits full width in the upper part of a 1080x1920 frame over a
// blurred, darkened fill of itself, leaving the lower part for captions and callouts that the
// Remotion ShortVertical template adds. Slides and diagrams stay whole and readable.
// crop: a 9:16 window centred at --x (0-1 of the width), for character shots with one speaker.
// Native 9:16 Flow shots need neither. Encoding a Short is light; run batches through scripts/heavy.sh.
// Do not import this file from any content gate.
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);
export const FRAME = { w: 1080, h: 1920, top: 250, bottom: 420, sides: 60 }; // platform safe zones

/** The ffmpeg filtergraph for a mode. Pure, for tests. */
export function filterFor(mode = 'stack', { x = 0.5 } = {}) {
  const { w, h, top } = FRAME;
  if (mode === 'crop') {
    const cx = Math.min(1, Math.max(0, Number(x)));
    return `crop=ih*9/16:ih:(iw-ih*9/16)*${cx}:0,scale=${w}:${h},setsar=1`;
  }
  if (mode !== 'stack') throw new Error(`unknown mode ${mode}`);
  const fgH = Math.round((w * 9) / 16 / 2) * 2; // 608
  return `split[a][b];[a]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},boxblur=24:2,eq=brightness=-0.18[bg];` +
    `[b]scale=${w}:${fgH}[fg];[bg][fg]overlay=0:${top + 40},setsar=1`;
}

export function reframe(input, { start, end, out, mode = 'stack', x = 0.5 }) {
  if (!(end > start)) throw new Error('end must be after start');
  const len = +(end - start).toFixed(3);
  if (len < 5 || len > 90) throw new Error(`a Short must be 5-90 s before trimming; got ${len}s`);
  execFileSync(bin('ffmpeg'), ['-v', 'error', '-y', '-ss', String(start), '-i', input, '-t', String(len),
    '-filter_complex', filterFor(mode, { x }), '-r', '30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out]);
  return { out, seconds: len };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (n) => { const i = a.indexOf(n); return i >= 0 ? a.splice(i, 2)[1] : undefined; };
  const start = Number(opt('--start')); const end = Number(opt('--end')); const out = opt('--out');
  const mode = opt('--mode') ?? 'stack'; const x = Number(opt('--x') ?? 0.5);
  if (!a[0] || !out || !Number.isFinite(start) || !Number.isFinite(end)) { console.error('usage: reframe.mjs <long.mp4> --start S --end E --out file.mp4 [--mode stack|crop] [--x 0.5]'); process.exit(2); }
  try { const r = reframe(resolve(a[0]), { start, end, out: resolve(out), mode, x }); console.log(`wrote ${r.out} (${r.seconds}s, ${mode})`); }
  catch (e) { console.error(e.message); process.exit(1); }
}
