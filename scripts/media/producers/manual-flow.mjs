// manual.flow: the owner generates a clip in Flow by hand (Feature 030, T025).
//
// The producer writes a copy-button prompt page and holds. When the owner has saved the clip as
// `<key>_shot-<n>.mp4` in Downloads\gflow-cli (reached over the 18801 file server) or in the local
// inbox, the next call ingests it as the part's take with `source: 'manual'`.
// Flow sometimes joins several shots into one longer clip; `splitJoined` cuts it at the speech pause
// nearest each 8 s boundary (within about a second), as was done by hand for batch 2.
// Do not import this file from any content gate (FR-018).
import { spawnSync, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { promptPage } from '../prompt-page.mjs';
import { buildPrompt } from '../recipes.mjs';
import { GFLOW_FILES_URL } from './quota.mjs';
import { tcpOpen, listPcClips, fetchClip, CLIP_CREDITS } from './gflow-video.mjs';

const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);
export const SHOT_SECONDS = 8;
export const inboxDir = () => process.env.MEGA_BOOK_MEDIA_INBOX || join(homedir(), 'studio-media', 'inbox');
export const manualName = (key, part) => `${key}_shot-${part}.mp4`;
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');

/** Silence spans [start, end] from ffmpeg silencedetect output. */
export function silences(stderr, duration) {
  const out = [];
  let open = null;
  for (const m of stderr.matchAll(/silence_(start|end): ([\d.]+)/g)) {
    if (m[1] === 'start') open = +m[2];
    else { out.push([open ?? 0, +m[2]]); open = null; }
  }
  if (open !== null) out.push([open, duration]);
  return out;
}

/**
 * Cut times for a clip of `duration` seconds holding `parts` shots: for each boundary k*8 s, the middle
 * of the nearest pause within `tolerance`; without one, the boundary itself, flagged `snapped: false`.
 */
export function splitPoints(stderr, duration, parts, { every = SHOT_SECONDS, tolerance = 1.2 } = {}) {
  const mids = silences(stderr, duration).map(([a, b]) => (a + b) / 2);
  const cuts = [];
  for (let k = 1; k < parts; k++) {
    const t = k * every;
    const near = mids.filter((m) => Math.abs(m - t) <= tolerance).sort((a, b) => Math.abs(a - t) - Math.abs(b - t))[0];
    cuts.push(near === undefined ? { at: t, snapped: false } : { at: +near.toFixed(3), snapped: true });
  }
  return cuts;
}

/** Split one joined clip into `parts.length` takes; returns [{ part, file, sha256, snapped }]. */
export function splitJoined(file, parts, outDir, take = 1) {
  const duration = Number(execFileSync(bin('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' }).trim());
  const stderr = spawnSync(bin('ffmpeg'), ['-hide_banner', '-nostats', '-i', file, '-af', 'silencedetect=n=-35dB:d=0.25', '-f', 'null', '-'], { encoding: 'utf8' }).stderr ?? '';
  const cuts = splitPoints(stderr, duration, parts.length);
  const edges = [0, ...cuts.map((c) => c.at), duration];
  mkdirSync(outDir, { recursive: true });
  return parts.map((part, i) => {
    const out = join(outDir, `shot-${part}-t${take}.mp4`);
    execFileSync(bin('ffmpeg'), ['-nostdin', '-v', 'error', '-y', '-ss', String(edges[i]), '-to', String(edges[i + 1]), '-i', file,
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', out]);
    return { part, file: out, sha256: sha(out), snapped: i === 0 ? true : cuts[i - 1].snapped };
  });
}

/** Producer factory. `job`: { key, script, recipe, locale, outDir }; ctx: { take, claimed }. */
export function manualFlow({ filesUrl = GFLOW_FILES_URL, inbox = inboxDir(), pageDir = inboxDir() } = {}) {
  return async (job, part, ctx = {}) => {
    const { key, script, recipe, locale = 'ur', outDir } = job;
    const name = manualName(key, part);
    const out = join(outDir, `shot-${part}-t${ctx.take ?? 1}.mp4`);
    const credits = CLIP_CREDITS[recipe.model] ?? 10;
    const done = (how) => ({ status: 'ok', source: 'manual', file: out, sha256: sha(out), credits, model: recipe.model, reason: `owner-made clip from ${how}` });
    if (existsSync(join(inbox, name))) {
      mkdirSync(outDir, { recursive: true });
      copyFileSync(join(inbox, name), out);
      return done('the local inbox');
    }
    if (await tcpOpen(filesUrl)) {
      try {
        if ((await listPcClips(filesUrl)).some((c) => c.name === name)) {
          await fetchClip(name, out, filesUrl);
          return done('Downloads\\gflow-cli');
        }
      } catch { /* fall through to the page */ }
    }
    const shot = script.shots.find((s) => s.n === part);
    if (!shot) return { status: 'failed', reason: `${key}: no shot ${part}` };
    mkdirSync(pageDir, { recursive: true });
    const page = join(pageDir, `${key}-prompts.html`);
    writeFileSync(page, promptPage({
      title: `${key}: Flow prompts (${recipe.name}@${recipe.version})`,
      intro: `Model ${recipe.model}, portrait, no duration setting. One clip per shot.`,
      items: script.shots.map((s) => ({ key, part: s.n, prompt: buildPrompt(recipe, script, s, locale) })),
    }));
    return { status: 'held', reason: `waiting for the owner: make shot ${part} in Flow from ${page} and save it as ${name}` };
  };
}
