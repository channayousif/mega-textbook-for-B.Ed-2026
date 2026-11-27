#!/usr/bin/env node
/**
 * Raster illustration producer (ADR-0029): agy (Gemini), then gflow (Nano Banana via Google Flow,
 * while the tunnel to the owner's PC is up), then Codex (built-in image_gen). Owner ruling 2026-11-18.
 *
 *   node scripts/generate-illustration.mjs <course> <unit> [--id fig-U1-9] [--producer auto|agy|agy2|gflow|gflow2|codex|meta]
 *        [--dry-run] [--reuse-staging] [--banner] [--force]
 *
 * `--producer auto` (default) takes the first producer whose quota is not recorded as exhausted
 * (scripts/lib/image-quota.mjs) and, for gflow, whose tunnel answers. When a producer runs out mid-batch
 * it is recorded and the same row is retried on the next one. Exit 3 means every producer is out.
 * `--banner` reads the unit's sidecar banner manifest (unit-NN.banner.md) instead.
 * `--force` ignores recorded quotas.
 * `--reuse-staging` skips generation when `.staging/<figId>.png` already exists (for example
 * after an optimiser failure), so a retry does not spend another generation.
 *
 * For every manifest row with `Kind: illustration` and `Status: prompt-only` in
 * specs/content/<course>/figures/unit-NN.md (or only `--id`):
 *   1. asks a producer (scripts/lib/image-producers.mjs) to generate the image into the git-ignored `.staging/` dir,
 *      using the shared house-style block below plus the row's own Prompt cell;
 *   2. runs scripts/optimize-figure.mjs (WebP, <= 1600 px, <= 150 KB) into
 *      static/img/figures/<course>/unit-NN/<figId>.webp;
 *   3. sets the row's Src and moves it to `generated`.
 *
 * It never places a figure or marks it `placed`: that happens only after a human or Claude has
 * inspected the image for pedagogy, cultural accuracy and absence of text (ADR-0029 point 3).
 *
 * This is the ONE repository script allowed to call an image service (ADR-0029 point 4). It is
 * operator-run on the owner's host, serial per producer (guarded by a lock file), and never part of
 * CI or the site build. A run pinned to one producer (`--producer agy|agy2|gflow|gflow2|codex|meta`, as the crew's
 * image lanes do) holds that producer's lock, so different producers work in parallel (owner,
 * 2026-11-25); an `auto` run may use any producer, so it holds the shared lock and waits for no
 * pinned run to be alive, and a pinned run refuses while an `auto` run is alive.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, openSync, closeSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { parseManifest } from './lib/figure-manifest.mjs';
import { PRODUCERS, activeImageQuota, recordImageQuota, clearImageQuota, availableProducers, producerStatus, gflowReachable } from './lib/image-quota.mjs';
import { PRODUCER_FNS, QuotaError, UnavailableError, sceneBrief, clearStaged } from './lib/image-producers.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const AUTO_LOCK = '/tmp/mega-book-imagegen.lock';
const producerLock = (p) => `/tmp/mega-book-imagegen.${p}.lock`;

/** One house style for every generated scene, so two producers do not drift apart. */
const HOUSE_STYLE = [
  'Warm, flat-vector editorial illustration for a teacher-education textbook in Pakistan.',
  'Setting, people, dress and classroom objects must be authentic to Sindh, Pakistan',
  '(for example shalwar kameez, dupatta, school uniforms, benches or desks, chalkboard).',
  'Respectful, inclusive, natural expressions; no stereotypes or caricature.',
  'Every adult in the frame wears Pakistani dress: no blazers, suits, jackets or Western office',
  'clothing on any teacher, parent or head teacher, including figures in the background or in insets.',
  'Clean composition with soft natural light and a calm palette that sits well beside teal (#1f6f5c).',
  'Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere in the image,',
  'and no maps, globes with country outlines, flags or national emblems; keep wall posters to simple shapes or plants.',
].join(' ');

function die(msg) {
  console.error(`✗ generate-illustration: ${msg}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => (args.indexOf(name) >= 0 ? args[args.indexOf(name) + 1] : null);
const [course, unitArg] = args.filter((a, i) => !a.startsWith('--') && !['--id', '--producer'].includes(args[i - 1]));
if (!course || !unitArg) die('usage: <course> <unit> [--id fig-UN-M] [--producer auto|agy|agy2|gflow|gflow2|codex|meta] [--dry-run]');
const producerArg = opt('--producer') || 'auto';
if (producerArg !== 'auto' && !PRODUCERS.includes(producerArg)) die(`unknown --producer ${producerArg}; use auto, ${PRODUCERS.join(', ')}`);
const LOCK = producerArg === 'auto' ? AUTO_LOCK : producerLock(producerArg);
/** Locks another run would collide with: every producer lock for an auto run, the auto lock for a pinned one. */
const CONFLICTS = producerArg === 'auto' ? PRODUCERS.map(producerLock) : [AUTO_LOCK];

const pad = String(Number(unitArg)).padStart(2, '0');
const courseDir = course.toLowerCase();
const manifestFile = join(ROOT, 'specs/content', courseDir, 'figures', `unit-${pad}${flag('--banner') ? '.banner' : ''}.md`);
if (!existsSync(manifestFile)) die(`no manifest at ${manifestFile}`);

const stagingDir = join(ROOT, 'specs/content', courseDir, 'figures', '.staging');
const outDir = join(ROOT, 'static/img/figures', courseDir, `unit-${pad}`);

const rows = parseManifest(readFileSync(manifestFile, 'utf8')) || [];
const todo = rows.filter((r) => r.kind === 'illustration' && r.status === 'prompt-only' && (!opt('--id') || r.id === opt('--id')));
if (todo.length === 0) {
  console.log('Nothing to generate: no prompt-only illustration rows match.');
  process.exit(0);
}

const aspectOf = (prompt) => (/\bportrait\b/i.test(prompt) && !/\blandscape\b/i.test(prompt) ? '3:4 portrait' : '16:9 landscape');

function runOptimizer(png, webp) {
  const res = spawnSync(process.execPath, [join(ROOT, 'scripts/optimize-figure.mjs'), png, webp], { encoding: 'utf8' });
  process.stdout.write(res.stdout || '');
  return res;
}

/** Optimise to the shared budget; a detailed scene over 150 KB is retried once at 1200 px. */
async function optimise(png, webp) {
  let res = runOptimizer(png, webp);
  if (res.status === 0) return;
  if (!/raster budget/.test(res.stderr || '')) throw new Error((res.stderr || '').trim() || 'optimize-figure failed');
  const smaller = png.replace(/\.png$/, '.1200.png');
  const sharp = (await import('sharp')).default;
  await sharp(png).resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }).png().toFile(smaller);
  console.log('  over budget at full size; retrying at 1200 px');
  res = runOptimizer(smaller, webp);
  if (res.status !== 0) throw new Error((res.stderr || '').trim() || 'optimize-figure failed at 1200 px');
}

/** Rewrite one manifest row's Src and Status cells in place; every other byte is preserved. */
function updateRow(id, src, status) {
  const lines = readFileSync(manifestFile, 'utf8').split('\n');
  const header = lines.find((l) => /^\|\s*figure id\s*\|/i.test(l));
  const cols = header.split('|').slice(1, -1).map((c) => c.trim().toLowerCase());
  const iSrc = cols.indexOf('src');
  const iStatus = cols.indexOf('status');
  const at = lines.findIndex((l) => l.startsWith('|') && l.split('|')[1].trim() === id);
  if (at < 0 || iSrc < 0 || iStatus < 0) throw new Error(`cannot locate manifest row ${id}`);
  const cells = lines[at].split('|');
  cells[iSrc + 1] = ` ${src} `;
  cells[iStatus + 1] = ` ${status} `;
  lines[at] = cells.join('|');
  writeFileSync(manifestFile, lines.join('\n'));
}

// Producers that may take the next row: not out of quota (unless --force), not found unavailable in
// this run, and, in auto mode, gflow only while its tunnel answers (probed once per run).
const skipped = new Set();
let gflowUp;
const reachable = (p) => {
  if (p !== 'gflow') return true;
  if (gflowUp === undefined) gflowUp = gflowReachable();
  return gflowUp;
};
function candidates() {
  const pool = producerArg === 'auto' ? PRODUCERS : [producerArg];
  return pool.filter((p) => !skipped.has(p) && (flag('--force') || !activeImageQuota(p)) && (producerArg !== 'auto' || reachable(p)));
}
const allOut = () => `✗ image quota exhausted on every producer (QUOTA_EXHAUSTED): ${producerStatus({ reachable })}. Nothing more generated; the crew holds illustrate jobs until a producer is back.`;

if (flag('--dry-run')) {
  const first = candidates()[0];
  console.log(`producers: ${producerStatus({ reachable })}; next: ${first || 'none'}`);
  for (const r of todo) console.log(`would generate ${r.id} (${aspectOf(r.prompt)}) with ${first || 'no producer'} -> static/img/figures/${courseDir}/unit-${pad}/${r.id}.webp`);
  process.exit(first ? 0 : 3);
}

/** The live pid holding a lock file, or 0 (a run killed mid-batch does not block the next one). */
function lockOwner(file) {
  if (!existsSync(file)) return 0;
  const owner = Number(readFileSync(file, 'utf8').trim());
  try { return owner > 0 && process.kill(owner, 0) ? owner : 0; } catch { return 0; }
}

/** The lock records its owner's pid, so a run killed mid-batch does not block the next one. */
function takeLock() {
  for (const f of CONFLICTS) {
    const other = lockOwner(f);
    if (other) die(`generation run ${other} holds ${f}; ${producerArg === 'auto' ? 'an auto run waits for pinned producer runs' : 'a pinned run waits for the auto run'} (ADR-0029).`);
  }
  try {
    const fd = openSync(LOCK, 'wx');
    writeFileSync(fd, String(process.pid));
    return fd;
  } catch {
    const owner = Number(readFileSync(LOCK, 'utf8').trim());
    let alive = false;
    try {
      alive = owner > 0 && process.kill(owner, 0);
    } catch {
      alive = false;
    }
    if (alive) die(`generation run ${owner} holds ${LOCK}; generation is serial per producer (ADR-0029).`);
    unlinkSync(LOCK);
    return takeLock();
  }
}
// A batch with no producer left would only fail; exit 3 (the quota code) without calling anything.
if (!flag('--reuse-staging') && !candidates().length) {
  console.error(allOut());
  process.exit(3);
}

const lockFd = takeLock();

/** Generate one row on the first producer that can, moving past quotas and unreachable producers. */
async function produce(row, png) {
  const brief = sceneBrief(HOUSE_STYLE, row, aspectOf(row.prompt));
  for (;;) {
    const producer = candidates()[0];
    if (!producer) return null;
    console.log(`… ${row.id}: generating with ${producer}`);
    clearStaged(png);
    const started = Date.now();
    try {
      const { model } = await PRODUCER_FNS[producer]({ brief, png, stagingDir, aspect: aspectOf(row.prompt) });
      clearImageQuota(producer); // it produced an image: its quota is back
      return { producer, model, seconds: Math.round((Date.now() - started) / 1000) };
    } catch (e) {
      if (e instanceof QuotaError) {
        const rec = recordImageQuota(producer, e.resetAt, e.producer);
        console.error(`✗ ${row.id}: ${e.message}; ${producer} skipped until ${rec.resetAt}`);
      } else if (e instanceof UnavailableError) {
        skipped.add(producer);
        console.error(`✗ ${row.id}: ${e.message}; ${producer} skipped for this run`);
      } else {
        throw e;
      }
    }
  }
}

mkdirSync(stagingDir, { recursive: true });
mkdirSync(outDir, { recursive: true });
let failures = 0;
try {
  for (const row of todo) {
    try {
      const png = join(stagingDir, `${row.id}.png`);
      let made = { producer: 'staging', model: 'reused staging file', seconds: 0 };
      if (flag('--reuse-staging') && existsSync(png)) {
        console.log(`… ${row.id}: reusing ${png}`);
      } else {
        made = await produce(row, png);
        if (!made) {
          console.error(allOut());
          process.exitCode = 3;
          break;
        }
      }
      const webp = join(outDir, `${row.id}.webp`);
      await optimise(png, webp);
      const src = `/img/figures/${courseDir}/unit-${pad}/${row.id}.webp`;
      updateRow(row.id, src, 'generated');
      // Provenance per image (ADR-0029): the producer and model reach the job log and its PHR.
      console.log(`✓ ${row.id}: generated in ${made.seconds}s by ${made.producer} (${made.model}); manifest -> generated. Inspect before placing.`);
    } catch (e) {
      failures += 1;
      console.error(`✗ ${row.id}: ${e.message}`);
    }
  }
} finally {
  closeSync(lockFd);
  unlinkSync(LOCK);
}
if (!process.exitCode) process.exitCode = failures ? 1 : 0;
