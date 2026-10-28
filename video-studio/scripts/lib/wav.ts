// A quiet test tone as 16-bit PCM WAV (VS-001 AC0.2 "any test audio"). Deterministic bytes.
export function toneWav(seconds: number, hz = 220, sampleRate = 48_000, amplitude = 0.08): Buffer {
  const n = Math.round(seconds * sampleRate);
  const data = Buffer.alloc(n * 2);
  for (let i = 0; i < n; i++) {
    const fade = Math.min(1, i / 2400, (n - i) / 2400); // 50 ms fade in/out, no clicks
    data.writeInt16LE(Math.round(Math.sin((2 * Math.PI * hz * i) / sampleRate) * amplitude * fade * 32767), i * 2);
  }
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(sampleRate, 24); h.writeUInt32LE(sampleRate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}

/** Duration of a PCM WAV from its header and data chunk size (the files voice:import writes). */
export function wavSeconds(bytes: Buffer): number {
  if (bytes.toString('latin1', 0, 4) !== 'RIFF' || bytes.toString('latin1', 8, 12) !== 'WAVE') throw new Error('not a WAV file');
  let byteRate = 0;
  for (let p = 12; p + 8 <= bytes.length;) {
    const id = bytes.toString('latin1', p, p + 4);
    const size = bytes.readUInt32LE(p + 4);
    if (id === 'fmt ') byteRate = bytes.readUInt32LE(p + 16);
    if (id === 'data') {
      if (!byteRate) throw new Error('WAV data chunk before fmt chunk');
      return Math.min(size, bytes.length - p - 8) / byteRate;
    }
    p += 8 + size + (size % 2);
  }
  throw new Error('WAV has no data chunk');
}
