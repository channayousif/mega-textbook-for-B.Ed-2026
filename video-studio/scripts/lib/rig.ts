// Puppets and sets for a render (T041). Rigs are built by tools/cast/cast_rig.py into
// $MEDIA_ROOT/brand-assets/<puppet_dir>/ (brand-bible.yaml); every file is re-hashed against
// rig.json before use (fail closed), and the render sees them under public/cast/<character>/.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import YAML from 'yaml';
import type { Overlay, Rig } from '../../remotion/src/props.ts';
import { digestBytes } from './hash.ts';
import { VS_ROOT } from './paths.ts';

export const CAST = ['ustani', 'shagird'] as const;
const SET_RE = /^[a-z]+$/;

function bible(): any {
  return YAML.parse(readFileSync(join(VS_ROOT, 'brand', 'brand-bible.yaml'), 'utf8'));
}

/** "assets/x/y" in the brand bible resolves against $MEDIA_ROOT/brand-assets/. */
function brandAsset(media: string, p: string): string {
  if (!/^assets\/[a-z0-9/_.-]+$/.test(p) || p.includes('..')) throw new Error(`bad brand asset path ${JSON.stringify(p)}`);
  return join(media, 'brand-assets', p.slice('assets/'.length));
}

export interface CastFiles { puppets: { ustani: Rig; shagird: Rig } | null; set: string | null; files: Record<string, Buffer> }

/** Rigs for both characters and the named set, or null puppets when any rig is missing. */
export function loadCast(media: string, setName: string): CastFiles {
  const b = bible();
  if (!SET_RE.test(setName) || !b.sets?.[setName]) throw new Error(`unknown set ${JSON.stringify(setName)}; brand-bible.yaml sets: ${Object.keys(b.sets ?? {}).join(', ')}`);
  const files: Record<string, Buffer> = {};
  const rigs: Partial<Record<(typeof CAST)[number], Rig>> = {};
  for (const ch of CAST) {
    const dir = brandAsset(media, b.characters[ch].puppet_dir);
    if (!existsSync(join(dir, 'rig.json'))) return { puppets: null, set: loadSet(media, b, setName, files), files };
    const raw = JSON.parse(readFileSync(join(dir, 'rig.json'), 'utf8'));
    const pub = (name: string) => {
      const want = raw.files?.[name];
      if (!want || !/^[A-Za-z0-9_]+\.png$/.test(name)) throw new Error(`${ch} rig: ${name} is not listed in rig.json files`);
      const bytes = readFileSync(join(dir, name));
      if (digestBytes(bytes) !== want) throw new Error(`${ch} rig: ${name} does not match its rig.json SHA-256; refusing`);
      const rel = `cast/${ch}/${name}`;
      files[rel] = bytes;
      return rel;
    };
    const ov = (o: Overlay): Overlay => ({ ...o, src: pub(o.src) });
    const mapVals = <T,>(o: Record<string, T>, f: (v: T) => any) => Object.fromEntries(Object.entries(o ?? {}).map(([k, v]) => [k, f(v)]));
    if (!raw.poses?.idle || !raw.eyes?.open || !raw.eyes?.closed || !raw.mouths?.rest) throw new Error(`${ch} rig.json lacks idle pose, eyes or rest mouth`);
    rigs[ch] = {
      canvas: raw.canvas,
      poses: mapVals(raw.poses, pub) as Rig['poses'],
      eyes: { open: ov(raw.eyes.open), closed: ov(raw.eyes.closed) },
      mouths: mapVals(raw.mouths, ov) as Rig['mouths'],
      occluders: mapVals(raw.occluders, ov),
    };
  }
  return { puppets: rigs as { ustani: Rig; shagird: Rig }, set: loadSet(media, b, setName, files), files };
}

function loadSet(media: string, b: any, name: string, files: Record<string, Buffer>): string | null {
  const p = brandAsset(media, b.sets[name].file);
  if (!existsSync(p)) return null;
  const rel = `sets/${name}.png`;
  files[rel] = readFileSync(p);
  return rel;
}
