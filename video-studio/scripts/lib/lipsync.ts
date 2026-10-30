// Mouth shapes from a voice line's audio (T041), computed when props are built so the render needs
// no audio analysis and the result is testable. Loudness picks how open the mouth is; the
// zero-crossing rate separates rounded vowels (O, darker) from spread ones (E).
import type { Viseme } from '../../remotion/src/props.ts';
import { readPcm16 } from './voice-fx.ts';

/** Thresholds in dB below the line's loud level (its 95th-percentile frame). Tuned on the V007 voices
 *  (loudness-normalised and, for Bilal, compressed): about a third of speech frames open wide. */
const REST_DB = -30;
const CLOSED_DB = -18;
const OPEN_DB = -4;
/** A frame opens wide only near a syllable peak: within PEAK_DB of the loudest frame in ±PEAK_WIN. */
const PEAK_DB = -1.5;
const PEAK_WIN = 3;
/** Shortest run of one shape, in frames; shorter runs flicker. */
const MIN_RUN = 2;

export function visemes(wav: Buffer, fps: number): string {
  const { fs, x } = readPcm16(wav);
  const hop = fs / fps;
  const n = Math.floor(x.length / hop);
  const rms: number[] = [], zcr: number[] = [];
  for (let f = 0; f < n; f++) {
    const a = Math.round(f * hop), b = Math.round((f + 1) * hop);
    let e = 0, z = 0;
    for (let i = a; i < b; i++) { e += x[i] * x[i]; if (i > a && (x[i] >= 0) !== (x[i - 1] >= 0)) z++; }
    rms.push(Math.sqrt(e / (b - a)));
    zcr.push(z / (b - a));
  }
  const loud = [...rms].sort((p, q) => p - q)[Math.floor(n * 0.95)] || 1e-9;
  const db = rms.map((r) => 20 * Math.log10(r / loud + 1e-9));
  const voiced = zcr.filter((_, i) => db[i] > CLOSED_DB).sort((p, q) => p - q);
  const zMid = voiced.length ? voiced[Math.floor(voiced.length / 2)] : 0;
  const peak = db.map((_, i) => Math.max(...db.slice(Math.max(0, i - PEAK_WIN), i + PEAK_WIN + 1)));
  const raw: Viseme[] = db.map((d, i) =>
    d < REST_DB ? 'X' : d < CLOSED_DB ? 'M' : d >= OPEN_DB && d - peak[i] >= PEAK_DB ? 'A' : zcr[i] < 0.7 * zMid ? 'O' : 'E');
  // Merge runs shorter than MIN_RUN into the shape before them.
  const out = [...raw];
  for (let i = 1; i < out.length; i++) {
    let j = i;
    while (j < out.length && raw[j] === raw[i]) j++;
    if (j - i < MIN_RUN && raw[i] !== out[i - 1]) for (let k = i; k < j; k++) out[k] = out[i - 1];
    i = j - 1;
  }
  return out.join('');
}
