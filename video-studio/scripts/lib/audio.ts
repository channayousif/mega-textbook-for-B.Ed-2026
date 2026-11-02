// Audio import helpers (VS-003 V006): sniff, probe and normalise with the FFmpeg that Remotion
// bundles (its compositor package ships ffmpeg/ffprobe with loudnorm), so the host needs no
// system FFmpeg. Normalising one voice line is seconds of CPU, not a heavy job.
import { execFileSync } from 'node:child_process';
import { closeSync, existsSync, openSync, readSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { VS_ROOT } from './paths.ts';

export const AUDIO_EXTS = ['.wav', '.mp3'] as const;
export const MAX_AUDIO_BYTES = 50 * 1024 * 1024;
export const MIN_SECONDS = 0.3;
export const MAX_SECONDS = 120;
/** Target from T031: PCM 48 kHz mono, -16 LUFS integrated. */
export const LOUDNORM = 'loudnorm=I=-16:TP=-1.5:LRA=11';

/** Container from the first bytes, independent of the file name. */
export function sniffAudio(path: string): 'wav' | 'mp3' | null {
  const b = Buffer.alloc(12);
  const fd = openSync(path, 'r');
  try { readSync(fd, b, 0, 12, 0); } finally { closeSync(fd); }
  if (b.toString('latin1', 0, 4) === 'RIFF' && b.toString('latin1', 8, 12) === 'WAVE') return 'wav';
  if (b.toString('latin1', 0, 3) === 'ID3') return 'mp3';
  if (b[0] === 0xff && (b[1] & 0xe0) === 0xe0) return 'mp3'; // MPEG frame sync
  return null;
}

/** Directory of the bundled ffmpeg/ffprobe for this platform. */
export function ffmpegDir(): string {
  const base = join(VS_ROOT, 'node_modules', '@remotion');
  const want = `compositor-${process.platform}-${process.arch}`;
  const dir = existsSync(base) ? readdirSync(base).find((d) => d.startsWith(want)) : undefined;
  if (!dir) throw new Error(`no bundled FFmpeg (${want}*) under ${base}; run npm ci in video-studio/`);
  return join(base, dir);
}

function run(tool: 'ffmpeg' | 'ffprobe', args: string[]): string {
  const dir = ffmpegDir();
  return execFileSync(join(dir, tool), args, {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 16 * 1024 * 1024,
    env: { ...process.env, LD_LIBRARY_PATH: [dir, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':') },
  });
}

export interface AudioProbe { codec: string; sample_rate: number; channels: number; duration_s: number }

export function probeAudio(path: string): AudioProbe {
  const j = JSON.parse(run('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', path]));
  const a = (j.streams ?? []).find((s: any) => s.codec_type === 'audio');
  if (!a) throw new Error(`${path}: no audio stream`);
  return {
    codec: a.codec_name, sample_rate: Number(a.sample_rate), channels: Number(a.channels),
    duration_s: Number(a.duration ?? j.format?.duration ?? 0),
  };
}

const PCM_OUT = ['-ar', '48000', '-ac', '1', '-c:a', 'pcm_s16le', '-fflags', '+bitexact', '-flags:a', '+bitexact'];

/** Decode, optionally change tempo (pitch kept), loudness-normalise and write PCM 16-bit 48 kHz mono without metadata. */
export function normaliseAudio(src: string, dest: string, opts: { tempo?: number } = {}): void {
  const af = [...(opts.tempo && opts.tempo !== 1 ? [`atempo=${opts.tempo}`] : []), LOUDNORM].join(',');
  run('ffmpeg', ['-nostdin', '-hide_banner', '-loglevel', 'error', '-y', '-i', src, '-vn', '-map_metadata', '-1', '-af', af, ...PCM_OUT, dest]);
}

/** Decode only, to PCM 16-bit 48 kHz mono (input to the tone-shaping step). */
export function decodeAudio(src: string, dest: string): void {
  run('ffmpeg', ['-nostdin', '-hide_banner', '-loglevel', 'error', '-y', '-i', src, '-vn', '-map_metadata', '-1', ...PCM_OUT, dest]);
}
