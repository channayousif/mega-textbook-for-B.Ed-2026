#!/usr/bin/env node
// Feature 029 gate: every Gemini Notebook Studio manifest is valid and every placed asset is safe.
//
// Checks, for each specs/studio/<course>/unit-NN.json:
//   - the file validates against contracts/studio-manifest.schema.json (a placed row needs a
//     review, an alt text, and an asset_path or https host_url);
//   - course/unit in the file match its path, and the asset_path sits under that unit;
//   - every placed asset exists, parses (JSON) and contains no long dash;
//   - no placed Markdown asset still carries an answer-key / rubric / quiz section
//     (answer keys are forbidden outside the bounded assessment section);
//   - no asset anywhere under static/studio/ carries a quiz answer field;
//   - every studio-media ledger (media-unit-NN.json) validates, and no audio/video file sits in the repo;
//   - every teaser script (specs/studio/teasers/<id>.json) passes QG0 and the teaser ledger is consistent.
// Exit 1 on any finding. Fast (no network, no browser), so it runs in CONTENT_GATES.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { hasForbiddenSection } from './notebook-studio/postprocess-report.mjs';
import { checkScript, TEASER_STATES } from './notebook-studio/teaser.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LONG_DASH = /[\u2014\u2015\u2E3A\u2E3B]/;
const ANSWER_FIELD = /"(correct_option|correct_answer|answer_key|isCorrect)"\s*:/;

export function findManifests(root = ROOT) {
  const base = join(root, 'specs', 'studio');
  if (!existsSync(base)) return [];
  const out = [];
  for (const course of readdirSync(base)) {
    const dir = join(base, course);
    if (!existsSync(dir) || !statSync(dir).isDirectory()) continue;
    for (const f of readdirSync(dir)) if (/^unit-\d{2}\.json$/.test(f)) out.push(join(dir, f));
  }
  return out.sort();
}

const MEDIA_EXT = /\.(mp4|mov|mkv|webm|m4a|mp3|wav|aac|flac|ogg)$/i;

export function findLedgers(root = ROOT) {
  const base = join(root, 'specs', 'studio');
  if (!existsSync(base)) return [];
  return readdirSync(base).filter((c) => statSync(join(base, c)).isDirectory())
    .flatMap((c) => readdirSync(join(base, c)).filter((f) => /^media-unit-\d{2}\.json$/.test(f)).map((f) => join(base, c, f))).sort();
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

export function checkStudio(root = ROOT) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(JSON.parse(readFileSync(join(root, 'specs', 'studio', 'studio-manifest.schema.json'), 'utf8')));
  const findings = [];
  const rel = (p) => relative(root, p);

  for (const file of findManifests(root)) {
    let m;
    try { m = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { findings.push(`${rel(file)}: not valid JSON (${e.message})`); continue; }
    if (!validate(m)) {
      for (const err of validate.errors) findings.push(`${rel(file)}: ${err.instancePath || '/'} ${err.message}`);
      continue;
    }
    const course = file.split('/').at(-2);
    const unit = Number(file.match(/unit-(\d{2})\.json$/)[1]);
    if (m.course !== course || m.unit !== unit) findings.push(`${rel(file)}: course/unit (${m.course}/${m.unit}) do not match the path`);
    const prefix = `/studio/${course}/unit-${String(unit).padStart(2, '0')}/`;
    m.artifacts.forEach((a, i) => {
      const where = `${rel(file)}: artifacts[${i}] (${a.kind} ${a.locale} topic ${a.topic})`;
      if (!a.asset_path) return;
      if (!a.asset_path.startsWith(prefix)) findings.push(`${where}: asset_path is outside ${prefix}`);
      if (a.status !== 'placed') return;
      const p = join(root, 'static', a.asset_path);
      if (!existsSync(p)) { findings.push(`${where}: asset missing at static${a.asset_path}`); return; }
      const body = readFileSync(p, 'utf8');
      if (LONG_DASH.test(body)) findings.push(`${where}: asset contains a long dash (use a spaced hyphen)`);
      if (p.endsWith('.json')) { try { JSON.parse(body); } catch { findings.push(`${where}: asset is not valid JSON`); } }
      if (p.endsWith('.md') && hasForbiddenSection(body)) findings.push(`${where}: asset still has an answer-key, rubric or quiz section`);
    });
  }
  for (const p of walk(join(root, 'static', 'studio'))) {
    if (MEDIA_EXT.test(p)) { findings.push(`${rel(p)}: media file in the repo; studio audio/video live in ~/studio-media and on YouTube`); continue; }
    if (ANSWER_FIELD.test(readFileSync(p, 'utf8'))) findings.push(`${rel(p)}: carries a quiz answer field; quiz items belong only in quiz_items`);
  }

  // studio-media ledgers (specs/studio/<course>/media-unit-NN.json): schema, path, and the rule
  // that an item past upload carries its YouTube id.
  const ledgerSchema = join(root, 'specs', 'studio', 'media-ledger.schema.json');
  const validateLedger = existsSync(ledgerSchema) ? ajv.compile(JSON.parse(readFileSync(ledgerSchema, 'utf8'))) : null;
  for (const file of findLedgers(root)) {
    if (!validateLedger) { findings.push(`${rel(file)}: media-ledger.schema.json is missing`); break; }
    let l;
    try { l = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { findings.push(`${rel(file)}: not valid JSON (${e.message})`); continue; }
    if (!validateLedger(l)) { for (const err of validateLedger.errors) findings.push(`${rel(file)}: ${err.instancePath || '/'} ${err.message}`); continue; }
    const course = file.split('/').at(-2);
    const unit = Number(file.match(/media-unit-(\d{2})\.json$/)[1]);
    if (l.course !== course || l.unit !== unit) findings.push(`${rel(file)}: course/unit (${l.course}/${l.unit}) do not match the path`);
    const POST_UPLOAD = ['uploaded-private', 'qa3-pass', 'approved', 'public', 'placed'];
    for (const i of l.items) if (POST_UPLOAD.includes(i.state) && !i.youtube_id) findings.push(`${rel(file)}: ${i.key} is ${i.state} without a youtube_id`);
  }
  // studio-teaser (D-2026-0082): every teaser script passes QG0; the ledger has a known state and a
  // YouTube id once uploaded.
  const tdir = join(root, 'specs', 'studio', 'teasers');
  if (existsSync(tdir)) {
    for (const f of readdirSync(tdir).filter((n) => n.endsWith('.json') && n !== 'media-teasers.json')) {
      let s;
      try { s = JSON.parse(readFileSync(join(tdir, f), 'utf8')); } catch (e) { findings.push(`specs/studio/teasers/${f}: not valid JSON (${e.message})`); continue; }
      if (`${s.id}.json` !== f) findings.push(`specs/studio/teasers/${f}: id ${s.id} does not match the file name`);
      for (const m of checkScript(s, root)) findings.push(`specs/studio/teasers/${f}: ${m}`);
    }
    const lp = join(tdir, 'media-teasers.json');
    if (existsSync(lp)) {
      const l = JSON.parse(readFileSync(lp, 'utf8'));
      const POST = TEASER_STATES.slice(TEASER_STATES.indexOf('uploaded-private'));
      for (const i of l.items ?? []) {
        if (!TEASER_STATES.includes(i.state)) findings.push(`specs/studio/teasers/media-teasers.json: ${i.key} has unknown state ${i.state}`);
        if (POST.includes(i.state) && !i.youtube_id) findings.push(`specs/studio/teasers/media-teasers.json: ${i.key} is ${i.state} without a youtube_id`);
        if (!existsSync(join(tdir, `${i.id}.json`))) findings.push(`specs/studio/teasers/media-teasers.json: ${i.key} has no script ${i.id}.json`);
      }
    }
  }
  for (const p of walk(join(root, 'specs', 'studio'))) if (MEDIA_EXT.test(p)) findings.push(`${rel(p)}: media file in the repo`);
  return findings;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const findings = checkStudio();
  if (findings.length) {
    console.error(`check-studio-manifest: ${findings.length} finding(s)`);
    for (const f of findings) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`check-studio-manifest: ${findManifests().length} manifest(s) OK`);
}
