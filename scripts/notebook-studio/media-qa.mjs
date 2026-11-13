#!/usr/bin/env node
// Feature 029 studio-media QG1: technical checks on one audio/video file with ffprobe/ffmpeg.
//
//   node scripts/notebook-studio/media-qa.mjs <file> --kind audio|video|clip|short [--part N] [--stage source|encoded]
//
// stage=source (the NotebookLM download): streams, duration bounds, long silences, black runs.
// stage=encoded (what goes to YouTube): all of the above plus loudness and A/V duration match,
// because loudness is normalised during encoding (audio-to-video.mjs), not demanded of Google.
// Prints a JSON verdict ({ verdict: pass|fail, findings, metrics }) and exits 1 on fail.
// ffmpeg/ffprobe come from $FFMPEG_DIR or PATH (static build in ~/.local/bin on the host).
// Decoding a 15-minute file takes about a minute of one core; run it through scripts/heavy.sh.
import { execFileSync, spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);

/** Duration bounds in seconds. Part 1 of an audio series is the brief; later parts go deeper. */
export const BOUNDS = {
  // audio.md v2 asks for a two-minute brief and short go-deeper parts (owner: long audio is ignored).
  audio: { brief: [75, 420], deeper: [60, 900] },
  video: { any: [90, 900] },
  // studio-teaser (D-2026-0082): one Veo take is 4, 6 or 8 s; an assembled Short stays under 60 s.
  clip: { any: [3.5, 8.6] },
  short: { any: [20, 60] },
};
const VISUAL = new Set(['video', 'clip', 'short']);
const VERTICAL = new Set(['clip', 'short']);
export const LOUDNESS = { min: -20, max: -12, truePeakMax: -1 };
export const MAX_SILENCE_S = 4;
export const MAX_BLACK_S = 2;
export const MIN_VIDEO_HEIGHT = 720;

export function parseProbe(json) {
  const j = typeof json === 'string' ? JSON.parse(json) : json;
  const streams = j.streams ?? [];
  const a = streams.find((s) => s.codec_type === 'audio');
  const v = streams.find((s) => s.codec_type === 'video' && !(s.disposition?.attached_pic));
  return {
    duration_s: Number(j.format?.duration ?? a?.duration ?? 0),
    audio: a ? { codec: a.codec_name, duration_s: Number(a.duration ?? j.format?.duration ?? 0), channels: Number(a.channels) } : null,
    video: v ? { codec: v.codec_name, width: Number(v.width), height: Number(v.height), duration_s: Number(v.duration ?? j.format?.duration ?? 0) } : null,
  };
}

/** Summary block of `-af ebur128=peak=true`: "I: -16.2 LUFS" and "Peak: -1.3 dBFS". */
export function parseEbur128(stderr) {
  const tail = stderr.slice(stderr.lastIndexOf('Summary:'));
  const I = tail.match(/I:\s+(-?[\d.]+|-inf)\s+LUFS/);
  const peak = tail.match(/True peak:[\s\S]*?Peak:\s+(-?[\d.]+|-inf)\s+dBFS/);
  return { integrated_lufs: I ? Number(I[1]) : null, true_peak_dbfs: peak ? Number(peak[1]) : null };
}

export function parseSilences(stderr) {
  return [...stderr.matchAll(/silence_duration:\s*([\d.]+)/g)].map((m) => Number(m[1]));
}

export function parseBlack(stderr) {
  return [...stderr.matchAll(/black_duration:\s*([\d.]+)/g)].map((m) => Number(m[1]));
}

export function evaluate({ kind, part = 1, stage = 'source', probe, loudness, silences = [], blacks = [] }) {
  const f = [];
  if (!probe.audio) f.push('no audio stream');
  if (VISUAL.has(kind)) {
    if (!probe.video) f.push('no video stream');
    else if (probe.video.height < MIN_VIDEO_HEIGHT) f.push(`video height ${probe.video.height}p < ${MIN_VIDEO_HEIGHT}p`);
    else if (VERTICAL.has(kind) && probe.video.width >= probe.video.height) f.push(`not vertical (${probe.video.width}x${probe.video.height}); Shorts need 9:16`);
  }
  const [lo, hi] = kind === 'audio' ? BOUNDS.audio[part > 1 ? 'deeper' : 'brief'] : BOUNDS[kind].any;
  if (probe.duration_s < lo || probe.duration_s > hi) f.push(`duration ${Math.round(probe.duration_s)} s outside ${lo}-${hi} s`);
  // A teaser Short ends on a 5 s silent brand card (assemble-teaser.mjs), so allow that one gap.
  const maxSilence = kind === 'short' ? 5.5 : MAX_SILENCE_S;
  const longSilence = silences.filter((s) => s > maxSilence);
  if (longSilence.length) f.push(`${longSilence.length} silence(s) longer than ${maxSilence} s (max ${Math.max(...longSilence).toFixed(1)} s)`);
  // Black frames matter only for real video; an audio card is a still image by design.
  if (VISUAL.has(kind)) {
    const longBlack = blacks.filter((b) => b > MAX_BLACK_S);
    if (longBlack.length) f.push(`${longBlack.length} black run(s) longer than ${MAX_BLACK_S} s`);
  }
  if (stage === 'encoded') {
    if (!probe.video) f.push('encoded file has no video stream (YouTube needs one)');
    if (probe.audio && probe.video && Math.abs(probe.audio.duration_s - probe.video.duration_s) > 0.5) {
      f.push(`audio ${probe.audio.duration_s.toFixed(1)} s and video ${probe.video.duration_s.toFixed(1)} s differ by more than 0.5 s`);
    }
    const { integrated_lufs: I, true_peak_dbfs: tp } = loudness ?? {};
    if (I == null || I < LOUDNESS.min || I > LOUDNESS.max) f.push(`integrated loudness ${I ?? 'unmeasured'} LUFS outside ${LOUDNESS.min} to ${LOUDNESS.max}`);
    if (tp == null || tp > LOUDNESS.truePeakMax) f.push(`true peak ${tp ?? 'unmeasured'} dBFS above ${LOUDNESS.truePeakMax}`);
  }
  return { verdict: f.length ? 'fail' : 'pass', findings: f };
}

export function measure(file, { kind, stage }) {
  const probe = parseProbe(execFileSync(bin('ffprobe'), ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', file], { encoding: 'utf8' }));
  const af = ['silencedetect=noise=-50dB:d=2', ...(stage === 'encoded' ? ['ebur128=peak=true'] : [])].join(',');
  const args = ['-nostdin', '-hide_banner', '-nostats', '-i', file, '-af', af];
  if (VISUAL.has(kind) && probe.video) args.push('-vf', 'blackdetect=d=1:pix_th=0.10');
  else args.push('-vn');
  args.push('-f', 'null', '-');
  const r = spawnSync(bin('ffmpeg'), args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`ffmpeg failed on ${file}: ${r.stderr.slice(-400)}`);
  return { probe, loudness: stage === 'encoded' ? parseEbur128(r.stderr) : null, silences: parseSilences(r.stderr), blacks: parseBlack(r.stderr) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (n, d) => (a.includes(`--${n}`) ? a[a.indexOf(`--${n}`) + 1] : d);
  const file = a[0];
  const kind = opt('kind');
  const stage = opt('stage', 'source');
  const part = Number(opt('part', 1));
  if (!file || !['audio', 'video', 'clip', 'short'].includes(kind)) { console.error('usage: media-qa.mjs <file> --kind audio|video|clip|short [--part N] [--stage source|encoded]'); process.exit(2); }
  const m = measure(file, { kind, stage });
  const result = { ...evaluate({ kind, part, stage, ...m }), stage, metrics: { duration_s: m.probe.duration_s, video: m.probe.video, loudness: m.loudness, silences: m.silences.length, longest_silence_s: Math.max(0, ...m.silences), black_runs: m.blacks.length } };
  console.log(JSON.stringify(result, null, 1));
  process.exit(result.verdict === 'pass' ? 0 : 1);
}
