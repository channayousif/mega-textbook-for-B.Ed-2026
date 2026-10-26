// VS-003 voice benchmark on Kaggle (V003). Generates open-source candidate takes; manual AI Studio
// and narrator takes are imported by voice-blind.ts. Media stays in $MEDIA_ROOT/voice-benchmark/.
//   npm run voice:bench -- pack | run | fetch | all
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
const INPUTS = ['candidates.json', 'passages.json'];

function pack() {
  rmSync(dsDir, { recursive: true, force: true });
  mkdirSync(dsDir, { recursive: true });
  const files: Record<string, string> = {};
  for (const f of INPUTS) {
    copyFileSync(join(SPEC, f), join(dsDir, f));
    files[f] = digestBytes(readFileSync(join(dsDir, f)));
  }
  writeFileSync(join(dsDir, 'manifest.json'), JSON.stringify({ files }, null, 2) + '\n');
  writeFileSync(join(dsDir, 'dataset-metadata.json'), JSON.stringify({ title: DATASET, id: `${kaggleUser()}/${DATASET}`, licenses: [{ name: 'other' }] }, null, 2));
  uploadDataset(dsDir, DATASET, 'voice benchmark inputs');
  console.log(`voice:bench: uploaded private dataset ${kaggleUser()}/${DATASET}`);
}

async function run() {
  await waitForDataset(DATASET);
  mkdirSync(kDir, { recursive: true });
  copyFileSync(join(VS_ROOT, 'kaggle', 'voice_bench.py'), join(kDir, 'voice_bench.py'));
  writeFileSync(join(kDir, 'kernel-metadata.json'), JSON.stringify({
    id: `${kaggleUser()}/${KERNEL}`, title: KERNEL, code_file: 'voice_bench.py', language: 'python', kernel_type: 'script',
    is_private: true, enable_gpu: true, enable_internet: true,
    dataset_sources: [`${kaggleUser()}/${DATASET}`], competition_sources: [], kernel_sources: [],
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
  console.log(JSON.stringify({ status: report.status, normalisation: report.normalisation, gpu: report.gpu }, null, 2));
}

const cmd = process.argv[2];
if (cmd === 'pack') pack();
else if (cmd === 'run') await run();
else if (cmd === 'fetch') await fetch();
else if (cmd === 'all') { pack(); await run(); await fetch(); }
else { console.error('usage: npm run voice:bench -- pack | run | fetch | all'); process.exit(1); }
