#!/usr/bin/env node
// Transcript of a Study Studio audio or video file for the QG2 content check (Feature 037, D-2026-0103).
//
//   node scripts/media/transcribe.mjs <file> [--lang ur|en] [--out transcript.txt] [--engine cfai|local]
//
// Workers AI whisper-large-v3-turbo by default (Urdu comes back in Urdu script, about 47 neurons per
// audio minute, so a 6-minute brief is ~280 of the free 10,000 a day). Long files are cut into
// 2-minute mono mp3 chunks (light ffmpeg work) and sent one by one. On any Workers AI failure the
// whole file goes to local whisper through scripts/heavy.sh instead. Prints the transcript (or writes
// --out) and one `engine:` line on stderr. Do not import this file from any content gate (FR-018).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { credentials, transcribeAudio } from './producers/cfai.mjs';
import { transcribe as localWhisper } from './qg2.mjs';

const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);
export const CHUNK_SECONDS = 120;

/** Cut `file` into mono 16 kHz mp3 chunks of CHUNK_SECONDS; returns [{ path, seconds }] in order. */
export function chunks(file, dir, seconds = CHUNK_SECONDS) {
  execFileSync(bin('ffmpeg'), ['-v', 'error', '-y', '-i', file, '-vn', '-ac', '1', '-ar', '16000', '-b:a', '32k',
    '-f', 'segment', '-segment_time', String(seconds), '-reset_timestamps', '1', join(dir, 'part-%03d.mp3')]);
  return readdirSync(dir).filter((f) => /^part-\d+\.mp3$/.test(f)).sort().map((f) => {
    const path = join(dir, f);
    const s = Number(execFileSync(bin('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], { encoding: 'utf8' })) || seconds;
    return { path, seconds: s };
  });
}

/** Join chunk transcripts with single spaces. */
export const joinParts = (parts) => parts.map((p) => p.trim()).filter(Boolean).join(' ');

/**
 * The transcript and the engine that made it. `deps` lets tests replace the chunker and both engines.
 */
export async function transcribeFile(file, { lang = 'ur', engine, deps = {} } = {}) {
  const { split = chunks, viaCfai = (bytes, o) => transcribeAudio(bytes, o), local = (f, d, l) => localWhisper(f, d, l), creds = credentials() } = deps;
  const dir = mkdtempSync(join(tmpdir(), 'transcribe-'));
  try {
    if ((engine ?? (creds ? 'cfai' : 'local')) === 'cfai') {
      try {
        const parts = [];
        for (const c of split(file, dir)) parts.push(await viaCfai(readFileSync(c.path), { seconds: c.seconds, language: lang }));
        return { text: joinParts(parts), engine: 'cfai' };
      } catch (e) {
        return { text: local(file, dir, lang), engine: 'local', fallback: e.message };
      }
    }
    return { text: local(file, dir, lang), engine: 'local' };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (n) => { const i = a.indexOf(n); return i >= 0 ? a.splice(i, 2)[1] : undefined; };
  const lang = opt('--lang') ?? 'ur';
  const out = opt('--out');
  const engine = opt('--engine');
  if (!a[0] || (engine && !['cfai', 'local'].includes(engine))) { console.error('usage: transcribe.mjs <file> [--lang ur|en] [--out file.txt] [--engine cfai|local]'); process.exit(2); }
  const r = await transcribeFile(resolve(a[0]), { lang, engine });
  console.error(`engine: ${r.engine}${r.fallback ? ` (Workers AI failed: ${r.fallback})` : ''}`);
  if (out) writeFileSync(resolve(out), `${r.text}\n`); else console.log(r.text);
}
