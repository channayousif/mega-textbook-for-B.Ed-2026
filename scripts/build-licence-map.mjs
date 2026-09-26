#!/usr/bin/env node
/**
 * Feature 024: build the reverse half of the licence cross-links.
 *
 * Licence subtopic pages declare `degree_links` (degree topic -> licence page).
 * This inverts them into `src/data/licence-map.json`, keyed by degree route,
 * which `src/components/LicenceRelevance.tsx` reads to show an "On the licence
 * test" box on the degree page. No degree file is edited, so reviewed units
 * keep their hashed G3/G5 evidence.
 *
 *   node scripts/build-licence-map.mjs          write the map
 *   node scripts/build-licence-map.mjs --check  fail if the committed map is stale
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

import { walkLicenceSubtopics } from './lib/content-roots.mjs';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT = join(ROOT, 'src', 'data', 'licence-map.json');

export function buildMap(root = ROOT) {
  const map = {};
  for (const page of walkLicenceSubtopics(root)) {
    if (page.kind !== 'subtopic') continue;
    const { data } = matter(readFileSync(page.file, 'utf8'));
    const ur = existsSync(page.urFile) ? matter(readFileSync(page.urFile, 'utf8')).data : null;
    for (const link of data.degree_links ?? []) {
      const key = link.path.split('#')[0].replace(/\/$/, '');
      (map[key] ??= []).push({
        route: page.route,
        objective_id: data.objective_id,
        title_en: data.title,
        title_ur: ur?.title ?? data.title,
      });
    }
  }
  const sorted = {};
  for (const k of Object.keys(map).sort()) {
    sorted[k] = map[k].sort((a, b) => a.objective_id.localeCompare(b.objective_id));
  }
  return JSON.stringify(sorted, null, 2) + '\n';
}

const next = buildMap();
if (process.argv.includes('--check')) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (current !== next) {
    console.error('✗ src/data/licence-map.json is stale. Run: node scripts/build-licence-map.mjs');
    process.exit(1);
  }
  console.log('✓ Licence reverse-link map is current.');
} else {
  writeFileSync(OUT, next);
  console.log(`✓ Wrote ${OUT.replace(ROOT + '/', '')} (${Object.keys(JSON.parse(next)).length} degree pages).`);
}
