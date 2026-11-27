#!/usr/bin/env node
// Feature 029 studio-media stage 10: copy every `public` ledger item into the unit's Studio manifest
// (specs/studio/<course>/unit-NN.json) as a placed row with host_url, then mark the item `placed`.
// Mind maps and study guides (#908) at `qa2-pass` are written as files under static/studio/ (study
// guides cleaned of answer and rubric sections, mind maps normalised with their labels file) and get
// a placed row with asset_path; a mind map's Urdu row comes from the labels file's `ur` map.
//
//   node scripts/notebook-studio/place-media.mjs <course> <unit>
//
// An existing manifest row with the same topic/locale/kind/part is updated in place (keeping its
// artifact_id and prompt_ref history); otherwise a new row is appended. Run check-studio-manifest
// and build-studio-index afterwards.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLedger, saveLedger, advance, DOC_KINDS } from './media-ledger.mjs';
import { cleanReport, hasForbiddenSection } from './postprocess-report.mjs';
import { normaliseMindMap, translateTree } from './ingest.mjs';

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

const pad = (n) => String(n).padStart(2, '0');
export const labelsPath = (course, unit, topic, root = ROOT) =>
  join(root, 'specs', 'studio', course, `unit-${pad(unit)}-topic-${pad(topic)}-mindmap-labels.json`);

/**
 * Mind maps and study guides at `qa2-pass`: the files to write and the placed manifest rows.
 * read(path) returns a downloaded file's text; labels(topic) returns the mind map labels file or null.
 * Returns { placed: [{ key, asset_path }], writes: [{ asset_path, body }] }; the caller writes the
 * files, then advances each key to `placed` with its asset_path.
 */
export function placeDocs(manifest, ledger, { read, labels = () => null, now = new Date() }) {
  const placed = [];
  const writes = [];
  const dir = (topic) => `/studio/${ledger.course}/unit-${pad(ledger.unit)}/topic-${pad(topic)}`;
  const upsert = (row) => {
    const i = manifest.artifacts.findIndex((r) => r.topic === row.topic && r.locale === row.locale && r.kind === row.kind);
    if (i >= 0) manifest.artifacts[i] = { ...manifest.artifacts[i], ...row };
    else manifest.artifacts.push(row);
  };
  for (const item of ledger.items.filter((i) => DOC_KINDS.includes(i.kind) && i.state === 'qa2-pass' && !i.blocked)) {
    const qa2 = item.gates.qa2 ?? {};
    const review = {
      by: 'Claude content check against the topic text (QG2)',
      date: (qa2.date ?? now.toISOString()).slice(0, 10),
      verdict: qa2.verdict === 'pass-with-notes' ? 'pass-with-notes' : 'pass',
      ...(qa2.notes ? { notes: qa2.notes } : {}),
    };
    const row = (locale, title, asset_path) => ({
      topic: item.topic, locale, kind: item.kind, status: 'placed', audience: 'all', title,
      ...(item.artifact_id ? { artifact_id: item.artifact_id } : {}), prompt_ref: item.prompt_ref, asset_path,
      alt: item.alt ?? item.title, generated_at: now.toISOString().slice(0, 10), review,
    });
    const raw = read(item.file);
    if (item.kind === 'studyguide') {
      const { markdown } = cleanReport(raw);
      if (hasForbiddenSection(markdown)) throw new Error(`${item.key}: an answer or rubric section survived cleaning`);
      const asset_path = `${dir(item.topic)}/studyguide.${item.locale}.md`;
      writes.push({ asset_path, body: markdown });
      upsert(row(item.locale, item.title, asset_path));
      placed.push({ key: item.key, asset_path });
    } else {
      const l = labels(item.topic) ?? {};
      const en = normaliseMindMap(JSON.parse(raw), l.en_fix ?? {});
      const asset_path = `${dir(item.topic)}/mindmap.en.json`;
      writes.push({ asset_path, body: `${JSON.stringify(en, null, 1)}\n` });
      upsert(row('en', item.title, asset_path));
      if (l.ur) {
        const ur = `${dir(item.topic)}/mindmap.ur.json`;
        writes.push({ asset_path: ur, body: `${JSON.stringify(translateTree(en, l.ur), null, 1)}\n` });
        upsert(row('ur', l.ur_title ?? `موضوع ${ledger.unit}.${item.topic} mind map`, ur));
      }
      placed.push({ key: item.key, asset_path });
    }
  }
  return { placed, writes };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [course, unitArg] = process.argv.slice(2);
  const unit = Number(unitArg);
  const mPath = join(ROOT, 'specs', 'studio', course, `unit-${pad(unit)}.json`);
  const ledger = loadLedger(course, unit);
  const manifest = existsSync(mPath) ? JSON.parse(readFileSync(mPath, 'utf8'))
    : { course, unit, notebook_id: ledger.items.find((i) => i.notebook_id)?.notebook_id ?? 'unknown-notebook', artifacts: [] };
  const keys = placeIntoManifest(manifest, ledger);
  for (const k of keys) advance(ledger, k, 'placed');
  const home = (p) => p.replace(/^~(?=\/)/, homedir());
  const docs = placeDocs(manifest, ledger, {
    read: (p) => readFileSync(home(p), 'utf8'),
    labels: (topic) => (existsSync(labelsPath(course, unit, topic)) ? JSON.parse(readFileSync(labelsPath(course, unit, topic), 'utf8')) : null),
  });
  for (const w of docs.writes) {
    const out = join(ROOT, 'static', w.asset_path);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, w.body);
  }
  for (const d of docs.placed) advance(ledger, d.key, 'placed', { asset_path: d.asset_path });
  writeFileSync(mPath, `${JSON.stringify(manifest, null, 1)}\n`);
  saveLedger(ledger);
  console.log(JSON.stringify({ placed: [...keys, ...docs.placed.map((d) => d.key)], files: docs.writes.map((w) => w.asset_path) }, null, 1));
}
