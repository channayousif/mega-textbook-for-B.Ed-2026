// Render props from an episode's own files (VS-003 V007): script.json lines, the imported voice
// audio in the asset manifest, and the optional hand alignment. Timings come from the real audio
// lengths; captions get sentence cues (remotion/src/align.ts). Every audio file is re-hashed
// against the manifest before it is used (fail closed).
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { alignLines } from '../../remotion/src/align.ts';
import { FPS, type CaptionLine, type Cue, type Pose, type ShortProps } from '../../remotion/src/props.ts';
import { digestBytes } from './hash.ts';
import { visemes } from './lipsync.ts';
import { episodeDir, mediaRoot } from './paths.ts';
import { loadCast } from './rig.ts';
import { brandProps } from './sample.ts';
import { wavSeconds } from './wav.ts';

export const LEAD_S = 0.3;
export const GAP_S = 0.35;
export const TAIL_S = 0.5;
export const END_CARD_S = 3;
export const DEFAULT_SET = 'studio';
/** Gesture when script.json gives none: the segment's usual move. */
const SEGMENT_POSE: Record<string, Pose> = { hook: 'explain', beat1: 'explain', beat2: 'point', beat3: 'explain', recap: 'celebrate', cta: 'point' };

export interface EpisodeRender {
  props: ShortProps;
  audio: Record<string, Buffer>;
  /** Puppet and set images, keyed by their path under public/. */
  images: Record<string, Buffer>;
  alignment: Record<string, 'manual' | 'sentence'>;
}

export function episodeProps(ep: any, script: any, opts: { media?: string; manual?: Record<string, Cue[]>; set?: string } = {}): EpisodeRender {
  const media = opts.media ?? mediaRoot();
  const production = ep.mode !== 'sample';
  const usable = (a: any) => a.kind === 'audio' && (production ? a.status === 'accepted' : a.status !== 'rejected');
  const manifest: any[] = (ep.assets?.manifest ?? []).filter(usable);
  const missing: string[] = [];
  const audio: Record<string, Buffer> = {};
  let t = LEAD_S;
  const lines: CaptionLine[] = [];
  for (const l of script.lines) {
    const a = manifest.filter((m) => m.item_id === l.id);
    if (a.length !== 1) { missing.push(`${l.id} (${a.length ? 'several takes' : production ? 'no accepted take' : 'no take'})`); continue; }
    const bytes = readFileSync(join(media, a[0].path));
    if (digestBytes(bytes) !== a[0].sha256) throw new Error(`${a[0].path} does not match its manifest SHA-256; refusing`);
    if (a[0].voice?.character && a[0].voice.character !== l.speaker) throw new Error(`${l.id} audio is ${a[0].voice.character}, line speaker is ${l.speaker}`);
    const rel = `audio/${l.id}.wav`;
    audio[rel] = bytes;
    const dur = wavSeconds(bytes);
    const gesture: Pose = l.gesture ?? SEGMENT_POSE[l.segment] ?? 'idle';
    lines.push({ id: l.id, speaker: l.speaker, text_ur: l.text_ur, from_s: round(t), to_s: round(t + dur), audio: rel, gesture, mouth: visemes(bytes, FPS) });
    t += dur + GAP_S;
  }
  if (missing.length) throw new Error(`voice audio missing for ${missing.join(', ')}; import with npm run voice:import`);
  const castFiles = loadCast(media, opts.set ?? DEFAULT_SET);
  if (production && !castFiles.puppets) throw new Error('puppet rigs missing under $MEDIA_ROOT/brand-assets/cast/; build them with tools/cast/cast_rig.py');
  const { cast, ...brand } = brandProps();
  const aligned = alignLines(lines, opts.manual ?? {}, brand.captions.max_words_per_line, brand.captions.max_lines);
  const last = lines[lines.length - 1].to_s;
  return {
    props: {
      mode: production ? 'production' : 'sample',
      episode_id: ep.episode_id,
      title_ur: script.on_screen_title_ur,
      duration_s: round(last + TAIL_S + END_CARD_S),
      lines: aligned.lines,
      end_card: { url: script.cta.url, cta_ur: script.cta.text_ur, seconds: END_CARD_S },
      audio: null,
      cast,
      puppets: castFiles.puppets,
      set: castFiles.set,
      brand,
    },
    audio,
    images: castFiles.files,
    alignment: aligned.source,
  };
}

/** The owner's hand alignment for an episode, if any: { "L03": [{ text_ur, from_s, to_s }, ...] }. */
export function readManualAlignment(id: string): Record<string, Cue[]> {
  const p = join(episodeDir(id), 'alignment.json');
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : {};
}

function round(n: number) { return Math.round(n * 1000) / 1000; }
