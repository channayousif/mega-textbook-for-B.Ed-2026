// Voice tone shaping (VS-ADR-0014): RBJ biquad EQ and a gentle compressor, applied by voice:import
// when a voice card names a post-processing preset. Remotion's bundled FFmpeg has no EQ or
// compressor filters, so this runs here on 16-bit PCM; tempo and loudness stay in FFmpeg.
// Same maths as the round-10 reel D (Python, scipy lfilter), so imports sound like the reel.

export interface FxPreset {
  low: [hz: number, db: number];
  peak: [hz: number, db: number, q: number];
  high: [hz: number, db: number];
  comp: [thresholdDb: number, ratio: number];
}

/** Body (low shelf), presence (peak) and air (high shelf), then 3:1 compression above -20 dBFS. */
export const FX_PRESETS: Record<string, FxPreset> = {
  warm: { low: [160, 4], peak: [3000, 3, 1], high: [8000, 2], comp: [-20, 3] },
};

type Biquad = { b: [number, number, number]; a: [number, number] };

function shelf(f0: number, db: number, fs: number, kind: 'low' | 'high'): Biquad {
  const A = 10 ** (db / 40);
  const w = (2 * Math.PI * f0) / fs;
  const cw = Math.cos(w);
  const s = 2 * Math.sqrt(A) * (Math.sin(w) / 2) * Math.SQRT2;
  const [b0, b1, b2, a0, a1, a2] = kind === 'low'
    ? [A * ((A + 1) - (A - 1) * cw + s), 2 * A * ((A - 1) - (A + 1) * cw), A * ((A + 1) - (A - 1) * cw - s),
      (A + 1) + (A - 1) * cw + s, -2 * ((A - 1) + (A + 1) * cw), (A + 1) + (A - 1) * cw - s]
    : [A * ((A + 1) + (A - 1) * cw + s), -2 * A * ((A - 1) + (A + 1) * cw), A * ((A + 1) + (A - 1) * cw - s),
      (A + 1) - (A - 1) * cw + s, 2 * ((A - 1) - (A + 1) * cw), (A + 1) - (A - 1) * cw - s];
  return { b: [b0 / a0, b1 / a0, b2 / a0], a: [a1 / a0, a2 / a0] };
}

function peak(f0: number, db: number, q: number, fs: number): Biquad {
  const A = 10 ** (db / 40);
  const w = (2 * Math.PI * f0) / fs;
  const alpha = Math.sin(w) / (2 * q);
  const a0 = 1 + alpha / A;
  return { b: [(1 + alpha * A) / a0, (-2 * Math.cos(w)) / a0, (1 - alpha * A) / a0], a: [(-2 * Math.cos(w)) / a0, (1 - alpha / A) / a0] };
}

function filter(x: Float64Array, { b, a }: Biquad): Float64Array {
  const y = new Float64Array(x.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < x.length; i++) {
    const v = b[0] * x[i] + b[1] * x1 + b[2] * x2 - a[0] * y1 - a[1] * y2;
    x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v;
  }
  return y;
}

function compress(x: Float64Array, fs: number, thrDb: number, ratio: number, att = 0.005, rel = 0.08): Float64Array {
  const ga = Math.exp(-1 / (att * fs)), gr = Math.exp(-1 / (rel * fs));
  const y = new Float64Array(x.length);
  let e = 0;
  for (let i = 0; i < x.length; i++) {
    const v = Math.abs(x[i]);
    e = v > e ? ga * e + (1 - ga) * v : gr * e + (1 - gr) * v;
    const lvl = 20 * Math.log10(e + 1e-9);
    y[i] = x[i] * (lvl > thrDb ? 10 ** (((thrDb - lvl) * (1 - 1 / ratio)) / 20) : 1);
  }
  return y;
}

/** Apply a preset to mono samples in [-1, 1]. Output peaks are capped at -1 dBFS before loudness. */
export function applyFx(x: Float64Array, fs: number, p: FxPreset): Float64Array {
  let y = filter(x, shelf(p.low[0], p.low[1], fs, 'low'));
  y = filter(y, peak(p.peak[0], p.peak[1], p.peak[2], fs));
  y = filter(y, shelf(p.high[0], p.high[1], fs, 'high'));
  y = compress(y, fs, p.comp[0], p.comp[1]);
  let pk = 0;
  for (const v of y) pk = Math.max(pk, Math.abs(v));
  const cap = 10 ** (-1 / 20);
  if (pk > cap) for (let i = 0; i < y.length; i++) y[i] *= cap / pk;
  return y;
}

/** Read the samples of a 16-bit PCM mono WAV (the files our FFmpeg step writes). */
export function readPcm16(bytes: Buffer): { fs: number; x: Float64Array } {
  if (bytes.toString('latin1', 0, 4) !== 'RIFF' || bytes.toString('latin1', 8, 12) !== 'WAVE') throw new Error('not a WAV file');
  let fs = 0, bits = 0, channels = 0;
  for (let p = 12; p + 8 <= bytes.length;) {
    const id = bytes.toString('latin1', p, p + 4);
    const size = bytes.readUInt32LE(p + 4);
    if (id === 'fmt ') { channels = bytes.readUInt16LE(p + 10); fs = bytes.readUInt32LE(p + 12); bits = bytes.readUInt16LE(p + 22); }
    if (id === 'data') {
      if (bits !== 16 || channels !== 1) throw new Error(`expected 16-bit mono PCM, got ${bits}-bit x${channels}`);
      const n = Math.floor(Math.min(size, bytes.length - p - 8) / 2);
      const x = new Float64Array(n);
      for (let i = 0; i < n; i++) x[i] = bytes.readInt16LE(p + 8 + i * 2) / 32768;
      return { fs, x };
    }
    p += 8 + size + (size % 2);
  }
  throw new Error('WAV has no data chunk');
}

export function writePcm16(x: Float64Array, fs: number): Buffer {
  const data = Buffer.alloc(x.length * 2);
  for (let i = 0; i < x.length; i++) data.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(x[i] * 32767))), i * 2);
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(fs, 24); h.writeUInt32LE(fs * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}
