// VS-005 open-model video bench on Kaggle (T4 x2). Media stays in $MEDIA_ROOT/video-benchmark/.
//   npm run video:bench -- pack | run | fetch | all [--smoke] [--only=id,...]
//   --smoke  one shot alone on GPU 0 (cold, warm) then on both GPUs at once: checks the
//            214 s reference and measures one versus two ComfyUI processes.
import { appendFileSync, copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { digestBytes, digestFile } from './lib/hash.ts';
import { kaggle, kaggleUser, uploadDataset, waitForDataset, waitForKernel } from './lib/kaggle.ts';
import { mediaRoot, VS_ROOT } from './lib/paths.ts';
import {
  benchJobs, brandStyle, flatName, loadBenchSpec, packCandidates, packShots, stillsNeeded, validateBenchSpec, WORKFLOW_DIR,
} from './lib/video-bench.ts';

const DATASET = 'vs-video-bench';
const KERNEL = 'vs-video-bench-run';
const root = join(mediaRoot(), 'video-benchmark');
const dsDir = join(root, 'kaggle', 'dataset');
const kDir = join(root, 'kaggle', 'kernel');
const outDir = join(root, 'kaggle', 'out');
const SMOKE = process.argv.includes('--smoke');
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',');

function pack() {
  const { cands, shots } = loadBenchSpec();
  const workflows = readdirSync(WORKFLOW_DIR).filter((f) => f.endsWith('.json'));
  const errs = validateBenchSpec(cands, shots, workflows);
  if (errs.length) throw new Error(`spec invalid:\n  ${errs.join('\n  ')}`);
  const packed = packCandidates(cands, { only: ONLY, smoke: SMOKE });
  const jobs = benchJobs(packed, shots, SMOKE ? 'smoke' : 'full');
  if (!jobs.length) throw new Error('no jobs: every candidate is inactive or supports none of the shot kinds');
  const assets = join(mediaRoot(), 'brand-assets');
  const stills = stillsNeeded(shots);
  const missing = stills.filter((s) => !existsSync(join(assets, s)));
  if (missing.length) throw new Error(`missing brand assets in ${assets}: ${missing.join(', ')}`);

  rmSync(dsDir, { recursive: true, force: true });
  mkdirSync(dsDir, { recursive: true });
  const files: Record<string, string> = {};
  const put = (name: string, data: Buffer | string) => {
    writeFileSync(join(dsDir, name), data);
    files[name] = digestBytes(readFileSync(join(dsDir, name)));
  };
  put('candidates.json', JSON.stringify(packed, null, 2) + '\n');
  put('shots.json', JSON.stringify(packShots(shots, brandStyle()), null, 2) + '\n');
  for (const w of new Set(packed.candidates.filter((c) => c.active !== false).map((c) => c.workflow))) put(w, readFileSync(join(WORKFLOW_DIR, w)));
  for (const s of stills) put(flatName(s), readFileSync(join(assets, s)));
  writeFileSync(join(dsDir, 'manifest.json'), JSON.stringify({ files }, null, 2) + '\n');
  writeFileSync(join(dsDir, 'dataset-metadata.json'), JSON.stringify({ title: DATASET, id: `${kaggleUser()}/${DATASET}`, licenses: [{ name: 'other' }] }, null, 2));
  uploadDataset(dsDir, DATASET, SMOKE ? 'video bench inputs (smoke)' : 'video bench inputs');
  console.log(`video:bench: uploaded private dataset ${kaggleUser()}/${DATASET} (${jobs.length} jobs, mode ${packed.mode})`);
}

async function run() {
  await waitForDataset(DATASET);
  mkdirSync(kDir, { recursive: true });
  copyFileSync(join(VS_ROOT, 'kaggle', 'video_bench.py'), join(kDir, 'video_bench.py'));
  writeFileSync(join(kDir, 'kernel-metadata.json'), JSON.stringify({
    id: `${kaggleUser()}/${KERNEL}`, title: KERNEL, code_file: 'video_bench.py', language: 'python', kernel_type: 'script',
    is_private: true, enable_gpu: true, enable_internet: true,
    dataset_sources: [`${kaggleUser()}/${DATASET}`], competition_sources: [], kernel_sources: [],
  }, null, 2));
  const started = Date.now();
  kaggle(['kernels', 'push', '-p', kDir, '--accelerator', 'NvidiaTeslaT4']);
  const mins = await waitForKernel(KERNEL, started, 12);
  writeFileSync(join(kDir, 'last-run.json'), JSON.stringify({ accelerator: 'NvidiaTeslaT4', wall_minutes: Number(mins.toFixed(1)) }, null, 2));
  console.log(`video:bench: complete in ${mins.toFixed(1)} min`);
}

async function fetch() {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  kaggle(['kernels', 'output', `${kaggleUser()}/${KERNEL}`, '-p', outDir, '-o', '-q']);
  const walk = (d: string): string[] => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
  const om = walk(outDir).find((p) => basename(p) === 'output-manifest.json');
  if (!om) throw new Error(`no output-manifest.json in ${outDir}; the run failed (see the .log files there)`);
  const base = dirname(om);
  const m = JSON.parse(readFileSync(om, 'utf8'));
  if (m.input_manifest_sha256 !== (await digestFile(join(dsDir, 'manifest.json')))) throw new Error('run used different inputs than packed here; refusing');
  for (const [rel, sha] of Object.entries<string>(m.outputs)) {
    if (!existsSync(join(base, rel)) || (await digestFile(join(base, rel))) !== sha) throw new Error(`hash mismatch: ${rel}`);
  }
  const report = JSON.parse(readFileSync(join(base, 'report.json'), 'utf8'));
  const clipsDir = join(root, report.mode === 'smoke' ? 'smoke' : 'clips');
  mkdirSync(clipsDir, { recursive: true });
  const ok = report.clips.filter((c: { status: string }) => c.status === 'ok');
  for (const c of ok) copyFileSync(join(base, c.file), join(clipsDir, basename(c.file)));
  copyFileSync(join(base, 'report.json'), join(root, `kaggle-report-${report.mode}.json`));
  const last = existsSync(join(kDir, 'last-run.json')) ? JSON.parse(readFileSync(join(kDir, 'last-run.json'), 'utf8')) : {};
  // GPU quota log (001 T033 queue/budget.json is not built yet): one line per fetched run.
  appendFileSync(join(root, 'gpu-log.jsonl'), JSON.stringify({
    at: new Date().toISOString(), mode: report.mode, accelerator: 'T4 x2', session_minutes: report.session_minutes,
    wall_minutes: last.wall_minutes ?? null, clips_ok: ok.length, clips_total: report.clips.length,
  }) + '\n');
  console.log(`video:bench: ${ok.length}/${report.clips.length} clips verified into ${clipsDir}`);
  const table = report.clips.map((c: Record<string, unknown>) => ({
    clip: `${c.candidate} ${c.shot} s${c.seed} ${c.phase}`, gpu: c.gpu, s: c.seconds, vram_mib: c.peak_vram_mib,
    host_mib: c.peak_host_ram_mib, black: c.black_frames, status: c.status,
  }));
  console.table(table);
  console.log(JSON.stringify({ status: report.status, session_minutes: report.session_minutes, torch: report.torch, gpu: report.gpu }, null, 2));
}

const cmd = process.argv[2];
if (cmd === 'pack') pack();
else if (cmd === 'run') await run();
else if (cmd === 'fetch') await fetch();
else if (cmd === 'all') { pack(); await run(); await fetch(); }
else { console.error('usage: npm run video:bench -- pack | run | fetch | all [--smoke] [--only=id,...]'); process.exit(1); }
