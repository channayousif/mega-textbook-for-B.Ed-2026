#!/usr/bin/env node
// Trim NotebookLM branding from a Video Overview (Feature 038, ADR-0040 point 5).
//
//   node scripts/media/pack/debrand.mjs detect <video.mp4> [--out cuts.json]
//   node scripts/media/pack/debrand.mjs confirm <cuts.json> --by <role> [--intro S] [--outro S]
//   node scripts/media/pack/debrand.mjs render <cuts.json> --out <trimmed.mp4>
//
// detect reads per-frame scene scores and brightness (ffmpeg, 4 fps) at the head and tail and writes
// cuts.json, unconfirmed. Measured on three EFMP-301 Unit 4 overviews (2026-11-28): every one ends on
// a "Gemini Notebook" logo card that starts with a clear cut exactly 3.00 s before the end; none opens
// with a logo, but each holds a NotebookLM-style title slide for 18-35 s while the narrator already
// speaks. So the outro is trimmed, a logo intro is trimmed only when one is found, and the title-slide
// span is reported (`title_card_end`) for the assembly step to cover with our own opener; trimming it
// would cut lesson audio. render refuses an unconfirmed file.
//
// Trimming only. Nothing here blurs, crops out or paints over a watermark, and nothing touches SynthID
// or C2PA marks. Do not import this file from any content gate.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);
export const DEFAULTS = { headSeconds: 45, tailSeconds: 15, fps: 4, cut: 0.08, titleCut: 0.12, logoLuma: 235, maxOutro: 6, fallbackOutro: 3.0, maxIntro: 8 };

export function probeDuration(file) {
  return Number(execFileSync(bin('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' }));
}

/** Parse an ffmpeg `metadata=print:file=` dump into [{ t, scene, yavg }]. */
export function parseFrameDump(text, offset = 0) {
  return text.split(/(?=frame:\d+)/).map((block) => {
    const t = Number(block.match(/pts_time:([0-9.]+)/)?.[1]);
    if (!Number.isFinite(t)) return null;
    return {
      t: +(t + offset).toFixed(3),
      scene: Number(block.match(/lavfi\.scene_score=([0-9.]+)/)?.[1] ?? 0),
      yavg: Number(block.match(/lavfi\.signalstats\.YAVG=([0-9.]+)/)?.[1] ?? 0),
    };
  }).filter(Boolean);
}

/** Per-frame stats for `length` seconds from `start` (light ffmpeg work, a few seconds per call). */
export function frameStats(file, start, length, fps = DEFAULTS.fps) {
  const dir = mkdtempSync(join(tmpdir(), 'debrand-'));
  const dump = join(dir, 'meta.txt');
  try {
    execFileSync(bin('ffmpeg'), ['-v', 'error', '-ss', String(start), '-t', String(length), '-i', file, '-an',
      '-vf', `fps=${fps},select='gte(scene,0)',signalstats,metadata=mode=print:file=${dump}`, '-f', 'null', '-']);
    return parseFrameDump(readFileSync(dump, 'utf8'), start);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * Cut points from head and tail frame stats. Pure, so it is unit-tested on recorded numbers.
 * Returns { intro_end, title_card_end, outro_start, method: { intro, outro }, notes[] }.
 */
export function detectCuts({ duration, head, tail }, o = DEFAULTS) {
  const notes = [];
  // A logo intro: near-white frames from 0, ended by a cut, within the first maxIntro seconds.
  let intro_end = 0; let introMethod = 'none';
  const firstDark = head.findIndex((f) => f.yavg < o.logoLuma);
  if (firstDark > 0 && head[0].yavg >= o.logoLuma && head[firstDark].t <= o.maxIntro && head[firstDark].scene >= o.cut) {
    intro_end = head[firstDark].t; introMethod = 'scene';
  }
  // The NotebookLM title slide: the first strong cut after the intro.
  const title = head.find((f) => f.t > intro_end + 1 && f.scene >= o.titleCut);
  const title_card_end = title ? title.t : null;
  if (!title) notes.push(`no title-slide cut found in the first ${o.headSeconds} s`);
  // The outro logo card: the last cut in the tail that leaves at most maxOutro seconds and gets brighter.
  let outro_start = null; let outroMethod = 'fallback';
  for (let i = tail.length - 1; i > 0; i--) {
    const f = tail[i];
    if (f.scene < o.cut || duration - f.t > o.maxOutro) continue;
    const before = tail.slice(Math.max(0, i - 4), i).map((x) => x.yavg);
    const after = tail.slice(i, i + 4).map((x) => x.yavg);
    const mean = (a) => a.reduce((s, v) => s + v, 0) / (a.length || 1);
    if (mean(after) > mean(before) + 3) { outro_start = f.t; outroMethod = 'scene'; break; }
  }
  if (outro_start === null) {
    outro_start = +(duration - o.fallbackOutro).toFixed(3);
    notes.push(`no outro cut found; fell back to the last ${o.fallbackOutro} s`);
  }
  return { intro_end, title_card_end, outro_start, method: { intro: introMethod, outro: outroMethod }, notes };
}

export function detect(file, o = DEFAULTS) {
  const duration = probeDuration(file);
  const head = frameStats(file, 0, Math.min(o.headSeconds, duration), o.fps);
  const tailStart = Math.max(0, duration - o.tailSeconds);
  const tail = frameStats(file, tailStart, duration - tailStart, o.fps);
  return { source: file, duration: +duration.toFixed(3), ...detectCuts({ duration, head, tail }, o), confirmed_by: null, confirmed_at: null };
}

/** Problems that stop a render; empty when the cuts may be rendered. */
export function renderProblems(cuts) {
  const out = [];
  if (!cuts.confirmed_by || !cuts.confirmed_at) out.push('cut points are not confirmed (run confirm --by <role>)');
  if (!(cuts.outro_start > cuts.intro_end)) out.push('outro_start must be after intro_end');
  if (cuts.outro_start > cuts.duration) out.push('outro_start is past the end of the video');
  return out;
}

export function render(cuts, out) {
  const p = renderProblems(cuts);
  if (p.length) throw new Error(p.join('; '));
  if (!existsSync(cuts.source)) throw new Error(`source missing: ${cuts.source}`);
  // Re-encode for frame-accurate cuts; fades keep the joins clean.
  const len = +(cuts.outro_start - cuts.intro_end).toFixed(3);
  execFileSync(bin('ffmpeg'), ['-v', 'error', '-y', '-ss', String(cuts.intro_end), '-i', cuts.source, '-t', String(len),
    '-vf', `fade=t=out:st=${Math.max(0, len - 0.4)}:d=0.4`, '-af', `afade=t=out:st=${Math.max(0, len - 0.4)}:d=0.4`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out]);
  return { out, seconds: len };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, target, ...rest] = process.argv.slice(2);
  const opt = (n) => { const i = rest.indexOf(n); return i >= 0 ? rest[i + 1] : undefined; };
  const usage = () => { console.error('usage: debrand.mjs detect <video> [--out cuts.json] | confirm <cuts.json> --by <role> [--intro S] [--outro S] | render <cuts.json> --out <file>'); process.exit(2); };
  if (!target) usage();
  if (cmd === 'detect') {
    const cuts = detect(resolve(target));
    const json = `${JSON.stringify(cuts, null, 2)}\n`;
    if (opt('--out')) writeFileSync(resolve(opt('--out')), json); else process.stdout.write(json);
  } else if (cmd === 'confirm') {
    const by = opt('--by');
    if (!by) usage();
    const cuts = JSON.parse(readFileSync(target, 'utf8'));
    if (opt('--intro') !== undefined) cuts.intro_end = Number(opt('--intro'));
    if (opt('--outro') !== undefined) cuts.outro_start = Number(opt('--outro'));
    Object.assign(cuts, { confirmed_by: by, confirmed_at: new Date().toISOString() });
    const p = renderProblems(cuts);
    if (p.length) { console.error(p.join('; ')); process.exit(1); }
    writeFileSync(target, `${JSON.stringify(cuts, null, 2)}\n`);
    console.log(`confirmed: trim ${cuts.intro_end}s from the start and everything after ${cuts.outro_start}s`);
  } else if (cmd === 'render') {
    if (!opt('--out')) usage();
    const cuts = JSON.parse(readFileSync(target, 'utf8'));
    const p = renderProblems(cuts);
    if (p.length) { console.error(`refused: ${p.join('; ')}`); process.exit(1); }
    const r = render(cuts, resolve(opt('--out')));
    console.log(`wrote ${r.out} (${r.seconds}s)`);
  } else usage();
}
