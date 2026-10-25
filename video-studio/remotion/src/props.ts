// Props for the UrduShort composition. Built by scripts (never hand-written) from episode files
// and brand/brand-bible.yaml, so preview, Kaggle render and Studio all share one shape.
export interface CaptionLine {
  id: string;
  speaker: 'ustani' | 'shagird';
  text_ur: string;
  from_s: number;
  to_s: number;
  /** Per-line voice file under public/, set after TTS or ingest. */
  audio?: string;
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
  brand: {
    colors: { primary: string; primary_dark: string; accent: string; background: string; panel: string; ink: string };
    safe_zone: { top: number; bottom: number; sides: number };
    captions: { size_px: number; line_height: number; max_words_per_line: number; max_lines: number; stroke_px: number };
    font_file: string;
  };
}
