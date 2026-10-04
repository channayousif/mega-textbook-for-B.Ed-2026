#!/usr/bin/env node
/**
 * Raster illustration producer (ADR-0029). Gemini via `agy generate_image`.
 *
 *   node scripts/generate-illustration.mjs <course> <unit> [--id fig-U1-9] [--dry-run] [--reuse-staging] [--banner]
 *
 * `--banner` reads the unit's sidecar banner manifest (unit-NN.banner.md) instead.
 * `--reuse-staging` skips the agy call when `.staging/<figId>.png` already exists (for example
 * after an optimiser failure), so a retry does not spend another generation.
 *
 * For every manifest row with `Kind: illustration` and `Status: prompt-only` in
 * specs/content/<course>/figures/unit-NN.md (or only `--id`):
 *   1. asks `agy` headlessly to generate the image into the git-ignored `.staging/` dir,
 *      using the shared house-style block below plus the row's own Prompt cell;
 *   2. runs scripts/optimize-figure.mjs (WebP, <= 1600 px, <= 150 KB) into
 *      static/img/figures/<course>/unit-NN/<figId>.webp;
 *   3. sets the row's Src and moves it to `generated`.
 *
 * It never places a figure or marks it `placed`: that happens only after a human or Claude has
 * inspected the image for pedagogy, cultural accuracy and absence of text (ADR-0029 point 3).
 *
 * This is the ONE repository script allowed to call an image service (ADR-0029 point 4). It is
 * operator-run on the owner's host, serial (guarded by a lock file), and never part of CI or the
 * site build.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, openSync, closeSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { readdirSync } from 'node:fs';
import { parseManifest } from './lib/figure-manifest.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const LOCK = '/tmp/mega-book-imagegen.lock';

/** One house style for every generated scene, so two producers do not drift apart. */
const HOUSE_STYLE = [
  'Warm, flat-vector editorial illustration for a teacher-education textbook in Pakistan.',
  'Setting, people, dress and classroom objects must be authentic to Sindh, Pakistan',
  '(for example shalwar kameez, dupatta, school uniforms, benches or desks, chalkboard).',
  'Respectful, inclusive, natural expressions; no stereotypes or caricature.',
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
const [course, unitArg] = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--id');
if (!course || !unitArg) die('usage: <course> <unit> [--id fig-UN-M] [--dry-run]');

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

const aspectOf = (prompt) => (/portrait/i.test(prompt) ? '3:4 portrait' : '16:9 landscape');

function generate(row) {
  const png = join(stagingDir, `${row.id}.png`);
  if (existsSync(png)) unlinkSync(png);
  const instruction = [
    'Use your generate_image tool exactly once to create this image.',
    `Style: ${HOUSE_STYLE}`,
    `Scene: ${row.prompt}`,
    `Aspect ratio: ${aspectOf(row.prompt)}.`,
    `Save the image as a PNG file at exactly this path: ${png}`,
    'Then reply with only the file path and the name of the image model you used.',
  ].join('\n');
  const started = Date.now();
  const res = spawnSync('agy', ['-p', instruction, '--add-dir', stagingDir, '--output-format', 'json', '--print-timeout', '10m'], {
    encoding: 'utf8',
    timeout: 11 * 60 * 1000,
  });
  const seconds = Math.round((Date.now() - started) / 1000);
  let reply = '';
  try {
    reply = JSON.parse(res.stdout).response || '';
  } catch {
    reply = (res.stdout || '').slice(0, 400);
  }
  if (res.status !== 0 || !existsSync(png) || statSync(png).size === 0) {
    throw new Error(`agy did not produce ${png} (exit ${res.status}, ${seconds}s): ${reply || res.stderr}`);
  }
  const model = (reply.match(/(imagen[\w.-]*|gemini[\w.-]*image[\w.-]*)/i) || [])[0] || 'unreported';
  return { png, seconds, model };
}

function runOptimizer(png, webp) {
  const res = spawnSync(process.execPath, [join(ROOT, 'scripts/optimize-figure.mjs'), png, webp], { encoding: 'utf8' });
  process.stdout.write(res.stdout || '');
  return res;
}

/** Optimise to the shared budget; a detailed scene over 150 KB is retried once at 1200 px. */
/**
 * agy reports an exhausted image quota only in its own log, not in its JSON reply. After a
 * failed generation, read the newest run log; if the quota is gone, the rest of the batch
 * would fail the same way, so stop and report when it resets.
 */
function quotaResetAfterFailure() {
  try {
    const dir = join(homedir(), '.gemini/antigravity-cli/log');
    const newest = readdirSync(dir).filter((n) => n.startsWith('cli-')).sort().pop();
    const text = readFileSync(join(dir, newest), 'utf8');
    if (!/QUOTA_EXHAUSTED/.test(text)) return null;
    const stamps = [...text.matchAll(/"quotaResetTimeStamp":\s*"([^"]+)"/g)].map((m) => m[1]).sort();
    return stamps.pop() || 'unknown';
  } catch {
    return null;
  }
}

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

if (flag('--dry-run')) {
  for (const r of todo) console.log(`would generate ${r.id} (${aspectOf(r.prompt)}) -> static/img/figures/${courseDir}/unit-${pad}/${r.id}.webp`);
  process.exit(0);
}

/** The lock records its owner's pid, so a run killed mid-batch does not block the next one. */
function takeLock() {
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
    if (alive) die(`generation run ${owner} holds ${LOCK}; generation is serial by design (ADR-0029).`);
    unlinkSync(LOCK);
    return takeLock();
  }
}
const lockFd = takeLock();

mkdirSync(stagingDir, { recursive: true });
mkdirSync(outDir, { recursive: true });
let failures = 0;
try {
  for (const row of todo) {
    try {
      const staged = join(stagingDir, `${row.id}.png`);
      let png = staged;
      let seconds = 0;
      let model = 'reused staging file';
      if (flag('--reuse-staging') && existsSync(staged)) {
        console.log(`… ${row.id}: reusing ${staged}`);
      } else {
        console.log(`… ${row.id}: generating with agy`);
        ({ png, seconds, model } = generate(row));
      }
      const webp = join(outDir, `${row.id}.webp`);
      await optimise(png, webp);
      const src = `/img/figures/${courseDir}/unit-${pad}/${row.id}.webp`;
      updateRow(row.id, src, 'generated');
      console.log(`✓ ${row.id}: generated in ${seconds}s by ${model}; manifest -> generated. Inspect before placing.`);
    } catch (e) {
      failures += 1;
      console.error(`✗ ${row.id}: ${e.message}`);
      const reset = quotaResetAfterFailure();
      if (reset) {
        console.error(`✗ image quota exhausted (QUOTA_EXHAUSTED); resets at ${reset}. Stopping this batch; rerun after then.`);
        process.exitCode = 3;
        break;
      }
    }
  }
} finally {
  closeSync(lockFd);
  unlinkSync(LOCK);
}
if (!process.exitCode) process.exitCode = failures ? 1 : 0;
