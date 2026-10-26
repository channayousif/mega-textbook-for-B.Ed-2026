// VS-003 voice benchmark on Kaggle (V003). Generates open-source candidate takes; manual AI Studio
// and narrator takes are imported by voice-blind.ts. Media stays in $MEDIA_ROOT/voice-benchmark/.
//   npm run voice:bench -- mirror | pack | run | fetch | all [--only=id,...]   (mirror once per gated model)
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { digestBytes, digestFile } from './lib/hash.ts';
import { kaggle, kaggleUser, uploadDataset, waitForDataset, waitForKernel } from './lib/kaggle.ts';
import { mediaRoot, VS_ROOT } from './lib/paths.ts';

const DATASET = 'vs-voice-bench';
const KERNEL = 'vs-voice-bench-run';
const SPEC = join(VS_ROOT, 'specs', '003-urdu-voice-benchmark');
const root = join(mediaRoot(), 'voice-benchmark');
const dsDir = join(root, 'kaggle', 'dataset');
const kDir = join(root, 'kaggle', 'kernel');
const outDir = join(root, 'kaggle', 'out');
const INPUTS = ['candidates.json', 'passages.json', 'passages-devanagari.json'];
type Ref = { audio: string };
const spec = () => JSON.parse(readFileSync(join(SPEC, 'candidates.json'), 'utf8'));
/** Active candidates only: a rejected round stays on record but does not spend GPU time again. */
const candidates = () => (spec().candidates as { id: string; model: string; model_dataset?: string; active?: boolean }[]).filter((c) => c.active !== false);

/** Upload a locally downloaded model folder as a private dataset (gated models: owner accepted terms). */
function mirror() {
  for (const c of candidates().filter((x) => x.model_dataset)) {
    const dir = join(mediaRoot(), 'models', c.model.split('/').pop()!);
    if (!existsSync(join(dir, 'config.json'))) throw new Error(`download ${c.model} to ${dir} first (huggingface_hub snapshot_download)`);
    writeFileSync(join(dir, 'dataset-metadata.json'), JSON.stringify({ title: c.model_dataset, id: `${kaggleUser()}/${c.model_dataset}`, licenses: [{ name: 'apache-2.0' }] }, null, 2));
    uploadDataset(dir, c.model_dataset!, `mirror of ${c.model}`);
    console.log(`voice:bench: mirrored ${c.model} to private dataset ${kaggleUser()}/${c.model_dataset}`);
  }
}

function pack() {
  rmSync(dsDir, { recursive: true, force: true });
  mkdirSync(dsDir, { recursive: true });
  const files: Record<string, string> = {};
  // `--only=id1,id2` reruns a subset: the packed candidates.json activates just those ids.
  const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',');
  for (const f of INPUTS) {
    copyFileSync(join(SPEC, f), join(dsDir, f));
    if (f === 'candidates.json' && only) {
      const c = spec();
      for (const x of c.candidates) x.active = only.includes(x.id);
      writeFileSync(join(dsDir, f), JSON.stringify(c, null, 2) + '\n');
    }
    files[f] = digestBytes(readFileSync(join(dsDir, f)));
  }
  // Reference clips are media: they live in $MEDIA_ROOT/voice-benchmark/refs, never in the repo.
  // Flat names, because the Kaggle upload skips subfolders.
  const refs = Object.entries(spec().refs ?? {}).filter(([k]) => !k.startsWith('_')).flatMap(([, v]) => v as Ref[]);
  for (const r of refs) {
    const src = join(root, 'refs', r.audio);
    if (!existsSync(src)) throw new Error(`missing reference clip ${src} (see refs in candidates.json)`);
    copyFileSync(src, join(dsDir, r.audio));
    files[r.audio] = digestBytes(readFileSync(join(dsDir, r.audio)));
  }
  writeFileSync(join(dsDir, 'manifest.json'), JSON.stringify({ files }, null, 2) + '\n');
  writeFileSync(join(dsDir, 'dataset-metadata.json'), JSON.stringify({ title: DATASET, id: `${kaggleUser()}/${DATASET}`, licenses: [{ name: 'other' }] }, null, 2));
  uploadDataset(dsDir, DATASET, 'voice benchmark inputs');
  console.log(`voice:bench: uploaded private dataset ${kaggleUser()}/${DATASET}`);
}

async function run() {
  await waitForDataset(DATASET);
  for (const c of candidates().filter((x) => x.model_dataset)) await waitForDataset(c.model_dataset!);
  mkdirSync(kDir, { recursive: true });
  copyFileSync(join(VS_ROOT, 'kaggle', 'voice_bench.py'), join(kDir, 'voice_bench.py'));
  writeFileSync(join(kDir, 'kernel-metadata.json'), JSON.stringify({
    id: `${kaggleUser()}/${KERNEL}`, title: KERNEL, code_file: 'voice_bench.py', language: 'python', kernel_type: 'script',
    is_private: true, enable_gpu: true, enable_internet: true,
    dataset_sources: [`${kaggleUser()}/${DATASET}`, ...candidates().filter((c) => c.model_dataset).map((c) => `${kaggleUser()}/${c.model_dataset}`)],
    competition_sources: [], kernel_sources: [],
  }, null, 2));
  const started = Date.now();
  kaggle(['kernels', 'push', '-p', kDir, '--accelerator', 'NvidiaTeslaT4']);
  const mins = await waitForKernel(KERNEL, started);
  console.log(`voice:bench: complete in ${mins.toFixed(1)} min`);
}

async function fetch() {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  kaggle(['kernels', 'output', `${kaggleUser()}/${KERNEL}`, '-p', outDir, '-o', '-q']);
  const walk = (d: string): string[] => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
  const om = walk(outDir).find((p) => basename(p) === 'output-manifest.json');
  if (!om) throw new Error(`no output-manifest.json in ${outDir}; the run failed (see the .log file there)`);
  const base = dirname(om);
  const m = JSON.parse(readFileSync(om, 'utf8'));
  if (m.input_manifest_sha256 !== (await digestFile(join(dsDir, 'manifest.json')))) throw new Error('run used different inputs than packed here; refusing');
  for (const [rel, sha] of Object.entries<string>(m.outputs)) {
    if (!existsSync(join(base, rel)) || (await digestFile(join(base, rel))) !== sha) throw new Error(`hash mismatch: ${rel}`);
  }
  const takes = join(root, 'takes');
  mkdirSync(takes, { recursive: true });
  const report = JSON.parse(readFileSync(join(base, 'report.json'), 'utf8'));
  for (const t of report.takes) copyFileSync(join(base, t.file), join(takes, basename(t.file)));
  copyFileSync(join(base, 'report.json'), join(root, 'kaggle-report.json'));
  console.log(`voice:bench: ${report.takes.length} takes verified into ${takes}`);
  console.log(JSON.stringify({ status: report.status, secret: report.secret, normalisation: report.normalisation, gpu: report.gpu }, null, 2));
}

const cmd = process.argv[2];
if (cmd === 'pack') pack();
else if (cmd === 'mirror') mirror();
else if (cmd === 'run') await run();
else if (cmd === 'fetch') await fetch();
else if (cmd === 'all') { pack(); await run(); await fetch(); }
else { console.error('usage: npm run voice:bench -- mirror | pack | run | fetch | all'); process.exit(1); }
