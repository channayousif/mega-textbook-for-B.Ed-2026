// Episode IO and current digests. Every stage calls currentDigests() before it runs.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import YAML from 'yaml';
import { digestJson, digestSet, digestText } from './hash.ts';
import { episodeDir, VS_ROOT } from './paths.ts';
import { assertValid } from './schema.ts';
import type { Digests } from './invalidation.ts';

export function readEpisode(id: string): any {
  const ep = JSON.parse(readFileSync(join(episodeDir(id), 'episode.json'), 'utf8'));
  assertValid('episode', ep);
  return ep;
}

const readIf = (p: string) => (existsSync(p) ? readFileSync(p, 'utf8') : undefined);

function digestDir(dir: string): string | undefined {
  if (!existsSync(dir)) return undefined;
  const files = readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md').sort();
  return digestSet(files.map((f) => `${f}:${digestText(readFileSync(join(dir, f), 'utf8'))}`));
}

export function currentDigests(id: string): Digests {
  const dir = episodeDir(id);
  const ep = readEpisode(id);
  const out: Digests = {};
  const snapshot = readIf(join(dir, 'source.snapshot.md'));
  if (snapshot !== undefined) out.source = digestText(snapshot);
  const scriptText = readIf(join(dir, 'script.json'));
  if (scriptText !== undefined) {
    const script = JSON.parse(scriptText);
    out.script = digestJson(script);
    if (script.cta) out.cta = digestJson(script.cta);
  }
  const captions = readIf(join(dir, 'captions.json'));
  if (captions !== undefined) out.captions = digestJson(JSON.parse(captions));
  const accepted = (ep.assets?.manifest ?? []).filter((a: any) => a.status !== 'rejected');
  if (accepted.length) out.assets = digestSet(accepted.map((a: any) => a.sha256));
  const brand = readIf(join(VS_ROOT, 'brand', 'brand-bible.yaml'));
  if (brand !== undefined) out.brand = digestJson(YAML.parse(brand));
  const voices = digestDir(join(VS_ROOT, 'brand', 'voices'));
  if (voices) out.voice_cards = voices;
  const cast = digestDir(join(VS_ROOT, 'brand', 'characters'));
  if (cast) out.character = cast;
  if (ep.render?.sha256) out.final = ep.render.sha256;
  return out;
}
