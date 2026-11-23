#!/usr/bin/env node
// Feature 032: render animated figures on Kaggle instead of the 2-CPU host (the VS-ADR-0011
// pattern from video-studio: hashed private dataset -> pinned private CPU kernel -> verified fetch).
//
//   node scripts/media/kaggle-animate.mjs pack <batch> <beats.json...> [--langs en,ur] [--formats 16x9,9x16]
//   node scripts/media/kaggle-animate.mjs run <batch>      # push the kernel and wait (CPU, no GPU quota)
//   node scripts/media/kaggle-animate.mjs fetch <batch>    # download, verify hashes, file under ~/studio-media
//
// The Kaggle token lives in ~/.kaggle (never in the repo). Datasets and kernels are private.
// Media never enters git: bundles and outputs live in ~/studio-media/animations/kaggle/<batch>/.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, relative } from 'node:path';
import { FORMATS, SKILL_DIR, compositionId, loadIcons, validateBeats, writeComposition } from './animate-figure.mjs';

const ROOT = join(homedir(), 'studio-media/animations');
export const datasetSlug = (batch) => `anim-${batch}`;
export const kernelSlug = (batch) => `anim-render-${batch}`;
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

function kaggle(args, quiet = false) {
  const bin = [join(homedir(), '.local/bin/kaggle'), 'kaggle'].find((b) => b === 'kaggle' || existsSync(b));
  return execFileSync(bin, args, { encoding: 'utf8', timeout: 600_000, stdio: ['ignore', 'pipe', quiet ? 'pipe' : 'inherit'] });
}
let user;
const kaggleUser = () => user ??= kaggle(['config', 'view'], true).match(/^- username: (\S+)$/m)?.[1]
  ?? (() => { throw new Error('could not read the Kaggle username'); })();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

export function checkBatchName(batch) {
  if (!/^[a-z0-9][a-z0-9-]{2,40}$/.test(batch ?? '')) throw new Error('batch name: 3-41 chars of a-z, 0-9 and -');
}

function pack(batch, beatsFiles, langs, formats) {
  const base = join(ROOT, 'kaggle', batch);
  const work = join(base, 'work');
  rmSync(base, { recursive: true, force: true });
  mkdirSync(join(work, 'runtime'), { recursive: true });
  for (const f of ['package.json', 'package-lock.json']) copyFileSync(join(SKILL_DIR, f), join(work, 'runtime', f));
  const compositions = [];
  for (const file of beatsFiles) {
    const spec = JSON.parse(readFileSync(file, 'utf8'));
    const errs = validateBeats(spec, loadIcons());
    if (errs.length) throw new Error(`${file}: ${errs.join('; ')}`);
    for (const lang of langs) for (const format of formats) {
      const id = compositionId(spec, lang, format);
      const duration = writeComposition(spec, { lang, format, out: join(work, 'compositions', id) });
      compositions.push({ id, beats: file, lang, format, duration });
    }
  }
  const files = Object.fromEntries(walk(work).map((p) => [relative(work, p), sha(p)]).sort());
  const bundleDir = join(base, 'bundle');
  mkdirSync(bundleDir, { recursive: true });
  // Not .tar.gz: Kaggle auto-extracts archives in datasets, which would drop the hashed file.
  execFileSync('tar', ['-cf', join(bundleDir, 'bundle.bin'), '-C', work, ...readdirSync(work)], { stdio: 'inherit' });
  const manifest = { batch, bundle_file: 'bundle.bin', bundle_sha256: sha(join(bundleDir, 'bundle.bin')), files, compositions };
  writeFileSync(join(bundleDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  const slug = datasetSlug(batch);
  writeFileSync(join(bundleDir, 'dataset-metadata.json'), JSON.stringify({ title: slug, id: `${kaggleUser()}/${slug}`, licenses: [{ name: 'other' }] }));
  let exists = true;
  try { kaggle(['datasets', 'status', `${kaggleUser()}/${slug}`], true); } catch { exists = false; }
  if (exists) kaggle(['datasets', 'version', '-p', bundleDir, '-m', `bundle ${manifest.bundle_sha256.slice(0, 12)}`, '-r', 'skip', '-q']);
  else kaggle(['datasets', 'create', '-p', bundleDir, '-r', 'skip', '-q']); // private by default
  const seconds = compositions.reduce((s, c) => s + c.duration, 0);
  console.log(`packed ${compositions.length} compositions (${seconds.toFixed(0)} s of video) into private dataset ${kaggleUser()}/${slug}`);
}

async function runKernel(batch) {
  const slug = kernelSlug(batch);
  const dir = join(ROOT, 'kaggle', batch, 'kernel');
  mkdirSync(dir, { recursive: true });
  copyFileSync(new URL('./kaggle/render_animations.py', import.meta.url), join(dir, 'render_animations.py'));
  writeFileSync(join(dir, 'kernel-metadata.json'), JSON.stringify({
    id: `${kaggleUser()}/${slug}`, title: slug, code_file: 'render_animations.py', language: 'python', kernel_type: 'script',
    is_private: true, enable_gpu: false, enable_internet: true, dataset_sources: [`${kaggleUser()}/${datasetSlug(batch)}`],
  }, null, 2));
  for (let i = 0; ; i++) { // the dataset must finish processing before a kernel can mount it
    let s = '';
    try { s = kaggle(['datasets', 'status', `${kaggleUser()}/${datasetSlug(batch)}`], true); } catch { s = 'pending'; }
    if (/ready/i.test(s)) break;
    if (i > 60) throw new Error('dataset not ready after 10 min');
    await sleep(10_000);
  }
  kaggle(['kernels', 'push', '-p', dir]);
  const started = Date.now();
  for (;;) {
    await sleep(30_000);
    const s = kaggle(['kernels', 'status', `${kaggleUser()}/${slug}`], true).trim();
    const mins = (Date.now() - started) / 60_000;
    console.log(`kaggle: ${mins.toFixed(1)} min  ${s}`);
    if (/complete/i.test(s)) return;
    if (/error|cancel/i.test(s)) { console.error(`kernel failed; run fetch to get its log`); process.exit(1); }
    if (mins > 180) throw new Error('kernel still running after 3 h');
  }
}

function fetch(batch) {
  const dl = join(ROOT, 'kaggle', batch, 'out');
  rmSync(dl, { recursive: true, force: true });
  mkdirSync(dl, { recursive: true });
  kaggle(['kernels', 'output', `${kaggleUser()}/${kernelSlug(batch)}`, '-p', dl, '-o', '-q']);
  const om = walk(dl).find((p) => p.endsWith('output-manifest.json'));
  if (!om) { console.error(`no output-manifest.json; the kernel log is in ${dl}`); process.exit(1); }
  const outDir = join(om, '..');
  const m = JSON.parse(readFileSync(om, 'utf8'));
  // A re-packed batch adds a dataset version; a kernel pushed before Kaggle finished processing
  // it mounts the previous one. Refuse output that does not come from the bundle packed last.
  const packed = JSON.parse(readFileSync(join(ROOT, 'kaggle', batch, 'bundle', 'manifest.json'), 'utf8')).bundle_sha256;
  if (m.bundle_sha256 !== packed) throw new Error(`kernel rendered an older bundle (${m.bundle_sha256.slice(0, 12)}, packed ${packed.slice(0, 12)}); run again`);
  for (const [f, h] of Object.entries(m.outputs)) if (sha(join(outDir, f)) !== h) throw new Error(`hash mismatch: ${f}`);
  for (const r of m.results) {
    const dest = join(ROOT, r.id);
    mkdirSync(dest, { recursive: true });
    if (r.ok) copyFileSync(join(outDir, `${r.id}.mp4`), join(dest, `${r.id}.mp4`));
    if (r.sheet) copyFileSync(join(outDir, r.sheet), join(dest, 'contact-sheet.jpg'));
    console.log(`${r.ok ? '✓' : '✗'} ${r.id} (${r.seconds} s) -> ${dest}`);
  }
  console.log(`kernel wall time ${m.wall_seconds} s`);
}

async function main() {
  const [cmd, batch, ...rest] = process.argv.slice(2);
  const opt = (n, d) => { const i = rest.indexOf(`--${n}`); return i >= 0 ? rest[i + 1].split(',') : d; };
  checkBatchName(batch);
  if (cmd === 'pack') {
    const beats = rest.filter((a, i) => a.endsWith('.json') && !rest[i - 1]?.startsWith('--'));
    const langs = opt('langs', ['en', 'ur']), formats = opt('formats', ['16x9']);
    if (!beats.length || langs.some((l) => !['en', 'ur'].includes(l)) || formats.some((f) => !FORMATS[f])) throw new Error('pack needs beats files and valid --langs/--formats');
    pack(batch, beats, langs, formats);
  } else if (cmd === 'run') await runKernel(batch);
  else if (cmd === 'fetch') fetch(batch);
  else { console.error('usage: kaggle-animate.mjs pack|run|fetch <batch> ...'); process.exit(2); }
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(`✗ ${e.message}`); process.exit(1); });
