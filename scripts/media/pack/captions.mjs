#!/usr/bin/env node
// Timed transcript, SRT and word timings for a pack video (Feature 038).
//
//   node scripts/media/pack/captions.mjs <video> --lang en --out-dir <dir>
//
// Writes <dir>/<name>.<lang>.srt (for upload), <dir>/<name>.<lang>.words.json (word timings for
// kinetic captions and highlight finding) and <dir>/<name>.<lang>.txt. Uses Workers AI whisper in
// 2-minute chunks (scripts/media/transcribe.mjs chunker), offsetting each chunk's times; the free
// allowance is checked before each call (D-2026-0103). Translations of the SRT are drafted
// separately and spot-checked (FR-002). Do not import this file from any content gate.
import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chunks } from '../transcribe.mjs';
import { transcribeTimed } from '../producers/cfai.mjs';
import { endsSentence } from './highlights.mjs';

/** Seconds to an SRT timestamp, `HH:MM:SS,mmm`. */
export function srtTime(sec) {
  const ms = Math.max(0, Math.round(sec * 1000));
  const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`;
}

/**
 * Caption cues from word timings: at most `maxChars` per cue and `maxSeconds` long, breaking early at
 * sentence ends, so cues stay readable (about two lines on screen).
 */
export function cuesFromWords(words, { maxChars = 84, maxSeconds = 6 } = {}) {
  const cues = []; let cur = null;
  for (const w of words) {
    if (!w.word) continue;
    if (cur && ((cur.text + ' ' + w.word).length > maxChars || w.end - cur.start > maxSeconds)) { cues.push(cur); cur = null; }
    if (!cur) cur = { start: w.start, end: w.end, text: w.word };
    else { cur.text += ` ${w.word}`; cur.end = w.end; }
    if (endsSentence(w.word) && cur.text.length > 20) { cues.push(cur); cur = null; }
  }
  if (cur) cues.push(cur);
  return cues;
}

export const toSrt = (cues) => cues.map((c, i) => `${i + 1}\n${srtTime(c.start)} --> ${srtTime(c.end)}\n${c.text}\n`).join('\n');

/** Merge per-chunk results into one timeline. `parts`: [{ offset, segments }]. */
export function mergeChunks(parts) {
  const segments = []; const words = [];
  for (const { offset, segments: segs } of parts) {
    for (const s of segs) {
      segments.push({ start: +(s.start + offset).toFixed(3), end: +(s.end + offset).toFixed(3), text: s.text });
      for (const w of s.words ?? []) words.push({ word: w.word, start: +(w.start + offset).toFixed(3), end: +(w.end + offset).toFixed(3) });
    }
  }
  return { segments, words };
}

export async function captionFile(file, { lang = 'en', split = chunks, timed = transcribeTimed } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'captions-'));
  try {
    const parts = []; let offset = 0;
    for (const c of split(file, dir)) {
      const r = await timed(readFileSync(c.path), { seconds: c.seconds, language: lang });
      parts.push({ offset, segments: r.segments });
      offset += c.seconds;
    }
    const merged = mergeChunks(parts);
    return { ...merged, cues: cuesFromWords(merged.words), text: merged.segments.map((s) => s.text).join(' ') };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (n) => { const i = a.indexOf(n); return i >= 0 ? a.splice(i, 2)[1] : undefined; };
  const lang = opt('--lang') ?? 'en';
  const outDir = opt('--out-dir');
  if (!a[0] || !outDir) { console.error('usage: captions.mjs <video> --lang en --out-dir <dir>'); process.exit(2); }
  const r = await captionFile(resolve(a[0]), { lang });
  mkdirSync(resolve(outDir), { recursive: true });
  const base = join(resolve(outDir), `${basename(a[0], extname(a[0]))}.${lang}`);
  writeFileSync(`${base}.srt`, toSrt(r.cues));
  writeFileSync(`${base}.words.json`, `${JSON.stringify({ lang, segments: r.segments, words: r.words }, null, 0)}\n`);
  writeFileSync(`${base}.txt`, `${r.text}\n`);
  console.log(`wrote ${base}.srt (${r.cues.length} cues), .words.json (${r.words.length} words), .txt`);
}
