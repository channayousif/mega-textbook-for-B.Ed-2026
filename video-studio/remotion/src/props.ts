// Props for the UrduShort composition. Built by scripts (never hand-written) from episode files
// and brand/brand-bible.yaml, so preview, Kaggle render and Studio all share one shape.
/** Frame rate of every render; props carry seconds, mouth tracks carry one shape per frame. */
export const FPS = 30;

/** One caption window with absolute times (VS-003 V007 sentence alignment). */
export interface Cue { text_ur: string; from_s: number; to_s: number }

export interface CaptionLine {
  id: string;
  speaker: 'ustani' | 'shagird';
  text_ur: string;
  from_s: number;
  to_s: number;
  /** Per-line voice file under public/, set after TTS or ingest. */
  audio?: string;
  /** Caption windows; without them the line is split into equal windows. */
  cues?: Cue[];
  /** Speaker's gesture for this line (script.json `gesture`); idle when absent. */
  gesture?: Pose;
  /** Mouth shape per video frame from the line's audio, one character each: X (rest), M, E, A, O. */
  mouth?: string;
}

export type Pose = 'idle' | 'explain' | 'point' | 'think' | 'celebrate';
export type Viseme = 'X' | 'M' | 'E' | 'A' | 'O';

/** A face overlay on the puppet canvas: a small image placed at (x, y). */
export interface Overlay { src: string; x: number; y: number; w: number; h: number }

/** A cut puppet (T013/T041, tools/cast/cast_rig.py). Every src is a path under public/. */
export interface Rig {
  canvas: [number, number];
  poses: Partial<Record<Pose, string>> & { idle: string };
  eyes: { open: Overlay; closed: Overlay };
  mouths: Partial<Record<'rest' | 'M' | 'E' | 'A' | 'O', Overlay>> & { rest: Overlay };
  occluders: Partial<Record<Pose, Overlay>>;
}

export interface ShortProps {
  [key: string]: unknown;
  mode: 'sample' | 'production';
  episode_id: string;
  title_ur: string;
  duration_s: number;
  lines: CaptionLine[];
  end_card: { url: string; cta_ur: string; seconds: number };
  audio?: string | null;
  /** Evaluation-only TTS request, resolved on Kaggle before render (VS-003 demo). */
  tts?: { engine: 'mms-tts-urd'; model: string; seed: number; gap_s: number; lead_s: number } | null;
  cast: { ustani: string; shagird: string };
  /** Cut puppets; without them the placeholder discs are drawn (sample renders, T046). */
  puppets?: { ustani: Rig; shagird: Rig } | null;
  /** Background set image under public/, e.g. sets/classroom.png. */
  set?: string | null;
  brand: {
    colors: { primary: string; primary_dark: string; accent: string; background: string; panel: string; ink: string };
    safe_zone: { top: number; bottom: number; sides: number };
    captions: { size_px: number; line_height: number; max_words_per_line: number; max_lines: number; stroke_px: number };
    font_file: string;
  };
}
