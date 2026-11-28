#!/usr/bin/env node
// QG2 speech check for one take (Feature 030, T027): a whisper turbo transcript, a word-match
// score against the approved line, a 3-frame strip for the reviewer, and a suggested verdict.
// The verdict is a suggestion; the reviewer looks at the strip and records the gate.
// The transcript comes from Workers AI whisper-large-v3-turbo when this host has the token (Feature
// 037, D-2026-0103: same verdict as local whisper on 24 of 24 calibration clips, no heavy job here),
// and from local whisper otherwise or when Workers AI refuses (daily cap, unreachable).
//
//   node scripts/media/qg2.mjs <clip.mp4> --line "<approved line>" [--out <dir>] [--lang ur] [--engine cfai|local]
//
// Whisper writes English words heard in Urdu speech in Urdu script ("ڈسکاؤنٹ" for "discount"), so
// words are compared by a consonant skeleton that is the same in both scripts.
// Do not import this file from any content gate (FR-018).
import { spawnSync, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, resolve, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { credentials, transcribeAudio, CfaiError } from './producers/cfai.mjs';

const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const WHISPER = process.env.WHISPER_BIN || join(homedir(), '.local/bin/whisper');
export const THRESHOLDS = { pass: 0.85, notes: 0.6 };

/** Urdu text with diacritics, tatweel and punctuation removed and letter variants unified. */
const SPOKEN = { com: 'کام', pk: 'پی کے', org: 'آرگ', www: 'ڈبلیو ڈبلیو ڈبلیو' };
/** Whisper writes a spoken address as "textbook.com.pk"; scripts spell it "textbook ڈاٹ کام ڈاٹ پی کے". */
const spokenAddress = (t) => t.replace(/\b[a-z0-9-]+(?:\.[a-z]{2,4})+\b/gi, (d) => d.toLowerCase().split('.').map((p) => SPOKEN[p] ?? p).join(' ڈاٹ '));

export function normalise(text) {
  return spokenAddress(String(text).normalize('NFC'))
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/[ۂة]/g, 'ہ').replace(/ه/g, 'ہ').replace(/[أإٱ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ی')
    .replace(/[\p{P}\p{S}]/gu, ' ')
    .toLowerCase().trim().split(/\s+/).filter(Boolean);
}

// One consonant class per sound, shared by Latin and Urdu spelling. Vowels and weak letters drop out.
const DIGRAPH = [['sh', 'X'], ['ch', 'C'], ['kh', 'K'], ['gh', 'G'], ['th', 'T'], ['ph', 'F'], ['ck', 'K'], ['qu', 'K'], ['x', 'KS'], ['tion', 'XN'], ['sion', 'XN']];
const LATIN = { b: 'B', p: 'P', t: 'T', d: 'D', s: 'S', z: 'Z', j: 'J', k: 'K', q: 'K', c: 'K', g: 'G', f: 'F', v: '', w: '', r: 'R', l: 'L', m: 'M', n: 'N', h: '', y: '' };
const URDU = { 'ب': 'B', 'پ': 'P', 'ت': 'T', 'ٹ': 'T', 'ط': 'T', 'ث': 'S', 'ج': 'J', 'چ': 'C', 'ح': '', 'خ': 'K', 'د': 'D', 'ڈ': 'D', 'ذ': 'Z', 'ر': 'R', 'ڑ': 'R', 'ز': 'Z', 'ژ': 'Z',
  'س': 'S', 'ش': 'X', 'ص': 'S', 'ض': 'Z', 'ظ': 'Z', 'ع': '', 'غ': 'G', 'ف': 'F', 'ق': 'K', 'ک': 'K', 'گ': 'G', 'ل': 'L', 'م': 'M', 'ن': 'N', 'ں': 'N', 'و': '', 'ہ': '', 'ھ': '', 'ی': '', 'ے': '', 'ا': '', 'آ': '', 'ء': '' };

export function skeleton(word) {
  const w = word.toLowerCase();
  if (/[a-z]/.test(w)) {
    let s = w.replace(/[^a-z]/g, '');
    for (const [a, b] of DIGRAPH) s = s.replaceAll(a, b);
    s = s.replace(/c(?=[eiy])/g, 's');
    return [...s].map((ch) => (/[A-Z]/.test(ch) ? ch : LATIN[ch] ?? '')).join('').replace(/(.)\1+/g, '$1');
  }
  return [...w].map((ch) => URDU[ch] ?? '').join('').replace(/(.)\1+/g, '$1');
}

const editDistance = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};

/** Same word: equal text, or (for a Latin word or a long word) the same consonant skeleton within one edit. */
export function sameWord(a, b) {
  if (a === b) return true;
  const latin = /[a-z]/.test(a) || /[a-z]/.test(b);
  const [sa, sb] = [skeleton(a), skeleton(b)];
  if (!sa || !sb) return false;
  if (sa === sb) return latin || sa.length >= 2;
  return (latin || Math.min(sa.length, sb.length) >= 4) && Math.min(sa.length, sb.length) >= 3 && editDistance(sa, sb) <= 1;
}

/** Share of the approved line's words heard in order (longest common subsequence with fuzzy equality). */
export function matchScore(approved, heard) {
  const A = normalise(approved);
  const H = normalise(heard);
  if (!A.length) return { score: 0, missing: [] };
  const L = Array.from({ length: A.length + 1 }, () => Array(H.length + 1).fill(0));
  for (let i = A.length - 1; i >= 0; i--) for (let j = H.length - 1; j >= 0; j--) {
    L[i][j] = sameWord(A[i], H[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  }
  const missing = [];
  let [i, j] = [0, 0];
  while (i < A.length) {
    if (j < H.length && sameWord(A[i], H[j]) && L[i][j] === L[i + 1][j + 1] + 1) { i++; j++; }
    else if (j < H.length && L[i][j + 1] >= L[i + 1][j]) j++;
    else missing.push(A[i++]);
  }
  return { score: +(L[0][0] / A.length).toFixed(3), missing };
}

export function suggestVerdict(score) {
  return score >= THRESHOLDS.pass ? 'pass' : score >= THRESHOLDS.notes ? 'pass-with-notes' : 'fail';
}

export function transcribe(file, outDir, lang = 'ur') {
  mkdirSync(outDir, { recursive: true });
  const r = spawnSync(join(ROOT, 'scripts/heavy.sh'), [WHISPER, file, '--model', 'turbo', '--language', lang, '--output_format', 'txt', '--output_dir', outDir], { encoding: 'utf8' });
  const txt = join(outDir, `${basename(file).replace(/\.[^.]+$/, '')}.txt`);
  if (r.status !== 0 || !existsSync(txt)) throw new Error(`whisper failed (exit ${r.status}): ${(r.stderr || '').trim().split('\n').slice(-3).join(' | ')}`);
  return readFileSync(txt, 'utf8').trim();
}

/** Frames at 1, 4 and 7 s side by side, 180 px wide each. */
export function frameStrip(file, out) {
  const parts = [1, 4, 7].map((t) => `${out}.${t}.jpg`);
  [1, 4, 7].forEach((t, i) => execFileSync(bin('ffmpeg'), ['-v', 'error', '-y', '-ss', String(t), '-i', file, '-frames:v', '1', '-vf', 'scale=180:-1', parts[i]]));
  execFileSync(bin('ffmpeg'), ['-v', 'error', '-y', ...parts.flatMap((p) => ['-i', p]), '-filter_complex', 'hstack=3', out]);
  return out;
}

/** Workers AI transcript: a short mono mp3 is extracted here (light work) and sent; the .txt is kept beside the strip. */
export async function transcribeCfai(file, outDir, lang = 'ur', opts = {}) {
  mkdirSync(outDir, { recursive: true });
  const stem = basename(file).replace(/\.[^.]+$/, '');
  const mp3 = join(outDir, `${stem}.qg2.mp3`);
  execFileSync(bin('ffmpeg'), ['-v', 'error', '-y', '-i', file, '-vn', '-ac', '1', '-ar', '16000', '-b:a', '48k', mp3]);
  const seconds = Number(execFileSync(bin('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp3], { encoding: 'utf8' })) || 10;
  const text = await transcribeAudio(readFileSync(mp3), { seconds, language: lang, ...opts });
  writeFileSync(join(outDir, `${stem}.txt`), `${text}\n`);
  return text;
}

/** The engine to use: `cfai` when asked or when the token exists, else `local`. */
export const pickEngine = (engine, creds = credentials()) => engine ?? (creds ? 'cfai' : 'local');

export async function qg2(file, line, { outDir = join(dirname(file), 'qg2'), lang = 'ur', engine, cfai = {}, local = transcribe, viaCfai = transcribeCfai, strip: makeStrip = frameStrip } = {}) {
  let used = pickEngine(engine, cfai.creds === undefined ? credentials() : cfai.creds);
  let heard;
  let fallback = null;
  if (used === 'cfai') {
    // Any Workers AI failure falls back to local whisper (spec 037 FR-003); the reason is reported.
    try { heard = await viaCfai(file, outDir, lang, cfai); } catch (e) {
      fallback = e instanceof CfaiError ? `${e.status}: ${e.message}` : `error: ${e.message}`;
      used = 'local';
    }
  }
  if (used === 'local') heard = local(file, outDir, lang);
  const { score, missing } = matchScore(line, heard);
  const strip = makeStrip(file, join(outDir, `${basename(file).replace(/\.[^.]+$/, '')}.strip.jpg`));
  return { file, line, heard, score, missing, strip, suggested: suggestVerdict(score), engine: used, ...(fallback ? { fallback } : {}) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (n) => { const i = a.indexOf(n); return i >= 0 ? a.splice(i, 2)[1] : undefined; };
  const line = opt('--line');
  const outDir = opt('--out');
  const lang = opt('--lang') ?? 'ur';
  const engine = opt('--engine');
  if (!a[0] || !line || (engine && !['cfai', 'local'].includes(engine))) { console.error('usage: qg2.mjs <clip.mp4> --line "<approved line>" [--out dir] [--lang ur] [--engine cfai|local]'); process.exit(2); }
  console.log(JSON.stringify(await qg2(resolve(a[0]), line, { ...(outDir ? { outDir: resolve(outDir) } : {}), lang, engine }), null, 1));
}
