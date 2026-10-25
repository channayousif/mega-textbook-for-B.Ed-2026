// Canonical digests (VS-004 PI001, dependency-graph.md): SHA-256 of canonical UTF-8 JSON
// (sorted keys, Unicode NFC, transient fields removed) for structured objects, raw bytes for media.
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

/** Keys that carry time or machine identity, never content. Removed before hashing. */
export const TRANSIENT_KEYS = new Set(['at', 'captured_at', 'imported_at', 'created_at', 'updated_at', 'history']);

const sha256 = (data: string | Buffer) => createHash('sha256').update(data).digest('hex');

function canonicalValue(value: unknown, dropTransient: boolean): unknown {
  if (typeof value === 'string') return value.normalize('NFC');
  if (Array.isArray(value)) return value.map((v) => canonicalValue(v, dropTransient));
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value).sort()) {
      if (dropTransient && TRANSIENT_KEYS.has(key)) continue;
      const v = (value as Record<string, unknown>)[key];
      if (v !== undefined) out[key.normalize('NFC')] = canonicalValue(v, dropTransient);
    }
    return out;
  }
  if (typeof value === 'number' && !Number.isFinite(value)) throw new Error('non-finite number in digest input');
  return value;
}

/** Canonical JSON text: sorted keys, NFC strings, no whitespace. */
export function canonicalJson(value: unknown, { dropTransient = true } = {}): string {
  return JSON.stringify(canonicalValue(value, dropTransient));
}

export const digestJson = (value: unknown, opts?: { dropTransient?: boolean }) => sha256(canonicalJson(value, opts));

/** Text (e.g. a Markdown source snapshot): NFC and LF line endings, so editors cannot change identity. */
export const digestText = (text: string) => sha256(text.normalize('NFC').replace(/\r\n?/g, '\n'));

export const digestBytes = (bytes: Buffer) => sha256(bytes);

export function digestFile(path: string): Promise<string> {
  return new Promise((resolvePromise, reject) => {
    const h = createHash('sha256');
    createReadStream(path)
      .on('data', (chunk) => h.update(chunk))
      .on('error', reject)
      .on('end', () => resolvePromise(h.digest('hex')));
  });
}

/** Digest of a set of asset hashes: order-independent. */
export const digestSet = (hashes: string[]) => sha256([...hashes].sort().join('\n'));
