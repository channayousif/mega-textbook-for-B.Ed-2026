// Sentence-level caption timing (VS-003 V007), the fallback when word alignment (T050) is not
// available or not trusted (PI-06). Each line's audio span is split into sentences, then into
// caption windows, with time shared by character count. The owner can override any line by hand
// in episodes/<id>/alignment.json; the render writes the timings it used so they can be edited.
import type { CaptionLine, Cue } from './props';

const SENTENCE_END = /(?<=[۔؟!?؛;])\s+/u;

/** Split a line into caption windows of at most maxWords x maxLines words. */
export function chunk(text: string, maxWords: number, maxLines: number): string[][] {
  const words = text.split(/\s+/).filter(Boolean);
  const perWindow = maxWords * maxLines;
  const windows: string[][] = [];
  for (let i = 0; i < words.length; i += perWindow) {
    const w = words.slice(i, i + perWindow);
    const rows: string[] = [];
    for (let j = 0; j < w.length; j += maxWords) rows.push(w.slice(j, j + maxWords).join(' '));
    windows.push(rows);
  }
  return windows;
}

const weight = (s: string) => s.replace(/\s+/g, '').length || 1;
const round = (n: number) => Math.round(n * 1000) / 1000;

/** Proportional cues for one line: sentence boundaries first, then window size. */
export function sentenceCues(line: Pick<CaptionLine, 'text_ur' | 'from_s' | 'to_s'>, maxWords: number, maxLines: number): Cue[] {
  const pieces = line.text_ur.split(SENTENCE_END).filter(Boolean)
    .flatMap((s) => chunk(s, maxWords, maxLines).map((rows) => rows.join(' ')));
  const total = pieces.reduce((a, p) => a + weight(p), 0);
  const span = line.to_s - line.from_s;
  let t = line.from_s;
  return pieces.map((text_ur, i) => {
    const end = i === pieces.length - 1 ? line.to_s : t + (span * weight(text_ur)) / total;
    const cue = { text_ur, from_s: round(t), to_s: round(end) };
    t = end;
    return cue;
  });
}

const words = (s: string) => s.split(/\s+/).filter(Boolean).join(' ');

/** Reasons a hand-written cue list cannot replace a line's timing (fail closed). */
export function cueProblems(line: CaptionLine, cues: Cue[]): string[] {
  const out: string[] = [];
  if (!cues.length) return [`${line.id}: no cues`];
  if (words(cues.map((c) => c.text_ur).join(' ')) !== words(line.text_ur)) out.push(`${line.id}: cue text does not match the line text`);
  let prev = line.from_s - 1e-6;
  for (const c of cues) {
    if (!(c.from_s >= prev && c.to_s > c.from_s)) out.push(`${line.id}: cue "${c.text_ur}" is out of order or empty`);
    prev = c.to_s;
  }
  if (cues[0].from_s < line.from_s - 0.5 || cues[cues.length - 1].to_s > line.to_s + 0.5) out.push(`${line.id}: cues leave the line's audio span by more than 0.5 s`);
  return out;
}

/** Give every line cues: the manual alignment where present, else the sentence fallback. */
export function alignLines(lines: CaptionLine[], manual: Record<string, Cue[]>, maxWords: number, maxLines: number): { lines: CaptionLine[]; source: Record<string, 'manual' | 'sentence'> } {
  const source: Record<string, 'manual' | 'sentence'> = {};
  const problems: string[] = [];
  const out = lines.map((l) => {
    const m = manual[l.id];
    if (m) {
      problems.push(...cueProblems(l, m));
      source[l.id] = 'manual';
      return { ...l, cues: m };
    }
    source[l.id] = 'sentence';
    return { ...l, cues: sentenceCues(l, maxWords, maxLines) };
  });
  const unknown = Object.keys(manual).filter((id) => !lines.some((l) => l.id === id));
  if (unknown.length) problems.push(`alignment names unknown lines: ${unknown.join(', ')}`);
  if (problems.length) throw new Error(`alignment.json rejected:\n  ${problems.join('\n  ')}`);
  return { lines: out, source };
}
