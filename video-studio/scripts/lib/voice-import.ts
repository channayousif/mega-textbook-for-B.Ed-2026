// Voice line import with hash provenance (VS-003 V006; VS-004 PI-04, PI-08, PI-09). Pure apart from
// the files it reads and writes, so tests run it against temporary roots.
import { existsSync, lstatSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';
import { AUDIO_EXTS, decodeAudio, MAX_AUDIO_BYTES, MAX_SECONDS, MIN_SECONDS, normaliseAudio, probeAudio, sniffAudio } from './audio.ts';
import { consentProblems, readConsent, readVoiceCard } from './consent.ts';
import { digestFile } from './hash.ts';
import { isInside } from './paths.ts';
import { applyFx, FX_PRESETS, readPcm16, writePcm16 } from './voice-fx.ts';

export const LINE_ID_RE = /^L\d{2}$/;
/** Statuses after the asset gate: a new asset sends the episode back to asset_review. */
const PAST_ASSET_GATE = ['assets_approved', 'rendering', 'render_review', 'render_approved', 'packed'];

export interface ImportOptions {
  episode: any;
  script?: any;
  lineId: string;
  file: string;
  character: string;
  sourceTool: string;
  model?: string;
  take?: number;
  prompt?: string;
  reason?: string;
  mediaRoot: string;
  voicesDir: string;
  now?: string;
}

export interface ImportResult { episode: any; entry: any; superseded: any | null; unchanged: boolean }

export async function importVoiceLine(o: ImportOptions): Promise<ImportResult> {
  const ep = structuredClone(o.episode);
  const fail = (msg: string): never => { throw new Error(`voice:import: ${msg}`); };
  if (!LINE_ID_RE.test(o.lineId)) fail(`line id must look like L03, got ${JSON.stringify(o.lineId)}`);
  if (ep.status === 'published' || ep.status === 'shelved') fail(`episode is ${ep.status}; assets are frozen`);
  if (!o.sourceTool || !/^[a-z0-9][a-z0-9.-]*$/.test(o.sourceTool)) fail('--source must be a tool id such as chatterbox-hi or human-recording');
  if (o.take !== undefined && !(Number.isInteger(o.take) && o.take >= 1)) fail('--take must be a positive integer');

  // PI-10: only files already under MEDIA_ROOT, no symlinks, bounded size, real WAV/MP3 bytes.
  if (!isInside(o.mediaRoot, o.file)) fail(`${o.file} is outside MEDIA_ROOT (${o.mediaRoot}); put it in the episode inbox`);
  const st = lstatSync(o.file, { throwIfNoEntry: false });
  if (!st) fail(`${o.file} does not exist`);
  if (st!.isSymbolicLink()) fail(`${o.file} is a symlink; refusing`);
  if (!st!.isFile()) fail(`${o.file} is not a regular file`);
  if (st!.size > MAX_AUDIO_BYTES) fail(`${o.file} is ${st!.size} bytes; limit ${MAX_AUDIO_BYTES}`);
  const ext = extname(o.file).toLowerCase();
  if (!(AUDIO_EXTS as readonly string[]).includes(ext)) fail(`${o.file}: only ${AUDIO_EXTS.join(', ')} are accepted`);
  const kind = sniffAudio(o.file);
  if (kind !== ext.slice(1)) fail(`${o.file}: content is ${kind ?? 'not audio'}, name says ${ext}`);

  // The line must exist and belong to this character.
  if (o.script) {
    const line = (o.script.lines ?? []).find((l: any) => l.id === o.lineId);
    if (!line) fail(`script.json has no line ${o.lineId}`);
    if (line.speaker !== o.character) fail(`${o.lineId} is spoken by ${line.speaker}, not ${o.character}`);
  }

  // Rights: a cleared voice card and a consent record whose scope covers this use (PI-08).
  const card = readVoiceCard(o.voicesDir, o.character);
  if (!card.cleared) fail(`voice card ${o.character}.md is not cleared to publish`);
  if (!card.consent_id) fail(`voice card ${o.character}.md cites no consent id`);
  const consent = readConsent(join(o.mediaRoot, 'consents'), card.consent_id!);
  const problems = consentProblems(consent, card);
  if (problems.length) fail(problems.join('; '));

  const probe = probeAudio(o.file);
  if (!(probe.duration_s >= MIN_SECONDS && probe.duration_s <= MAX_SECONDS)) {
    fail(`${o.file}: duration ${probe.duration_s}s outside ${MIN_SECONDS}-${MAX_SECONDS}s`);
  }

  const sourceSha = await digestFile(o.file);
  const audioDir = join(o.mediaRoot, ep.episode_id, 'audio');
  const dest = join(audioDir, `${o.lineId}.wav`);
  const tmp = join(audioDir, `.${o.lineId}.importing.wav`);
  mkdirSync(audioDir, { recursive: true });
  if (card.post) {
    // Tone shaping on the decoded PCM, then tempo and loudness in FFmpeg (VS-ADR-0014).
    const raw = join(audioDir, `.${o.lineId}.raw.wav`);
    const fx = join(audioDir, `.${o.lineId}.fx.wav`);
    try {
      decodeAudio(o.file, raw);
      const { fs, x } = readPcm16(readFileSync(raw));
      writeFileSync(fx, writePcm16(applyFx(x, fs, FX_PRESETS[card.post.preset]), fs));
      normaliseAudio(fx, tmp, { tempo: card.post.tempo });
    } finally {
      rmSync(raw, { force: true });
      rmSync(fx, { force: true });
    }
  } else {
    normaliseAudio(o.file, tmp);
  }
  const out = probeAudio(tmp);
  if (out.sample_rate !== 48_000 || out.channels !== 1 || out.codec !== 'pcm_s16le') {
    fail(`normalised file is ${out.codec} ${out.sample_rate} Hz x${out.channels}, expected pcm_s16le 48000 Hz mono`);
  }
  const sha = await digestFile(tmp);

  ep.assets ??= {};
  ep.assets.manifest ??= [];
  const manifest: any[] = ep.assets.manifest;
  const current = manifest.find((a) => a.item_id === o.lineId && a.kind === 'audio' && a.status !== 'rejected') ?? null;
  if (current && current.sha256 === sha) {
    renameSync(tmp, dest);
    return { episode: o.episode, entry: current, superseded: null, unchanged: true };
  }
  if (current) {
    // Correction history: keep the old bytes and entry, linked both ways.
    const keep = join(audioDir, 'superseded', `${o.lineId}.${current.sha256.slice(0, 12)}.wav`);
    if (existsSync(dest)) { mkdirSync(dirname(keep), { recursive: true }); renameSync(dest, keep); current.path = relative(o.mediaRoot, keep); }
    current.status = 'rejected';
    current.superseded_by = sha;
  }
  renameSync(tmp, dest);

  const now = o.now ?? new Date().toISOString();
  const entry: any = {
    item_id: o.lineId,
    path: relative(o.mediaRoot, dest),
    kind: 'audio',
    sha256: sha,
    source_sha256: sourceSha,
    source_file: basename(o.file),
    source_tool: o.sourceTool,
    ...(o.model ? { model: o.model } : {}),
    ...(o.prompt ? { prompt: o.prompt } : {}),
    ...(o.take ? { take: o.take } : {}),
    voice: {
      character: o.character,
      card_sha256: card.card_sha256,
      ...(card.reference_sha256 ? { reference_sha256: card.reference_sha256 } : {}),
      consent_id: consent.id,
      consent_sha256: consent.sha256,
      ...(card.post ? { post: `${card.post.preset}, tempo ${card.post.tempo}` } : {}),
    },
    rights_note: `voice card brand/voices/${o.character}.md (cleared); consent ${consent.id}; source ${o.sourceTool}`,
    imported_at: now,
    status: 'pending',
    ...(current ? { supersedes: current.sha256, correction_reason: o.reason ?? 'replacement take' } : {}),
  };
  manifest.push(entry);
  ep.history ??= [];
  const to = PAST_ASSET_GATE.includes(ep.status) ? 'asset_review' : ep.status;
  ep.history.push({
    at: now, from: ep.status, to, by: 'claude',
    note: `voice:import ${o.lineId} (${o.character}) ${sha.slice(0, 12)}${current ? `, replaces ${current.sha256.slice(0, 12)}` : ''}`,
  });
  ep.status = to;
  return { episode: ep, entry, superseded: current, unchanged: false };
}
