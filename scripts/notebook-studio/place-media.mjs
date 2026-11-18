#!/usr/bin/env node
// Feature 029 studio-media stage 10: copy every `public` ledger item into the unit's Studio manifest
// (specs/studio/<course>/unit-NN.json) as a placed row with host_url, then mark the item `placed`.
//
//   node scripts/notebook-studio/place-media.mjs <course> <unit>
//
// An existing manifest row with the same topic/locale/kind/part is updated in place (keeping its
// artifact_id and prompt_ref history); otherwise a new row is appended. Run check-studio-manifest
// and build-studio-index afterwards.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLedger, saveLedger, advance } from './media-ledger.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export function placeIntoManifest(manifest, ledger, now = new Date()) {
  const placed = [];
  for (const item of ledger.items.filter((i) => i.state === 'public')) {
    const same = (r) => r.topic === item.topic && r.locale === item.locale && r.kind === item.kind && (r.part ?? null) === (item.part ?? null);
    const qa2 = item.gates.qa2 ?? {};
    const row = {
      topic: item.topic, locale: item.locale, kind: item.kind, ...(item.part ? { part: item.part } : {}),
      status: 'placed', audience: 'all', title: item.title, artifact_id: item.artifact_id, prompt_ref: item.prompt_ref,
      host_url: `https://www.youtube.com/watch?v=${item.youtube_id}`,
      alt: item.alt ?? item.title,
      review: {
        by: 'owner spot-check + Claude transcript check (QG2)',
        date: (item.gates.owner?.date ?? now.toISOString()).slice(0, 10),
        verdict: qa2.verdict === 'pass-with-notes' ? 'pass-with-notes' : 'pass',
        ...(qa2.notes ? { notes: qa2.notes } : {}),
      },
    };
    const i = manifest.artifacts.findIndex(same);
    if (i >= 0) manifest.artifacts[i] = { ...manifest.artifacts[i], ...row };
    else manifest.artifacts.push(row);
    placed.push(item.key);
  }
  return placed;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [course, unitArg] = process.argv.slice(2);
  const unit = Number(unitArg);
  const mPath = join(ROOT, 'specs', 'studio', course, `unit-${String(unit).padStart(2, '0')}.json`);
  const manifest = JSON.parse(readFileSync(mPath, 'utf8'));
  const ledger = loadLedger(course, unit);
  const keys = placeIntoManifest(manifest, ledger);
  for (const k of keys) advance(ledger, k, 'placed');
  writeFileSync(mPath, `${JSON.stringify(manifest, null, 1)}\n`);
  saveLedger(ledger);
  console.log(JSON.stringify({ placed: keys }, null, 1));
}
