// Step 2 of a Kaggle render (VS-ADR-0011): push kaggle/render.py as a private GPU script kernel
// bound to the episode's private dataset, then wait for it to finish.
//   npm run kaggle:run -- <episode-id> [--cpu] [--no-wait]
// --cpu runs without an accelerator (fallback when the weekly GPU quota is spent).
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { datasetSlug, kaggle, kaggleUser, kernelSlug, waitForDataset, waitForKernel } from './lib/kaggle.ts';
import { assertEpisodeId, mediaRoot, VS_ROOT } from './lib/paths.ts';

const args = process.argv.slice(2);
const id = assertEpisodeId(args.find((a) => !a.startsWith('--')) ?? '');
const cpu = args.includes('--cpu');
const user = kaggleUser();
await waitForDataset(datasetSlug(id));

const dir = join(mediaRoot(), 'kaggle', 'kernel', id);
mkdirSync(dir, { recursive: true });
copyFileSync(join(VS_ROOT, 'kaggle', 'render.py'), join(dir, 'render.py'));
const slug = kernelSlug(id);
writeFileSync(join(dir, 'kernel-metadata.json'), JSON.stringify({
  id: `${user}/${slug}`, title: slug, code_file: 'render.py', language: 'python', kernel_type: 'script',
  is_private: true, enable_gpu: !cpu, enable_internet: true,
  dataset_sources: [`${user}/${datasetSlug(id)}`], competition_sources: [], kernel_sources: [],
}, null, 2));

const started = Date.now();
kaggle(['kernels', 'push', '-p', dir, ...(cpu ? [] : ['--accelerator', 'NvidiaTeslaT4'])]);
console.log(`kaggle:run: pushed ${user}/${slug} (${cpu ? 'CPU' : 'GPU T4 x2'})`);
if (args.includes('--no-wait')) process.exit(0);

const wallMin = await waitForKernel(slug, started);
writeFileSync(join(dir, 'last-run.json'), JSON.stringify({ accelerator: cpu ? 'none' : 'NvidiaTeslaT4', wall_minutes: Number(wallMin.toFixed(1)) }, null, 2));
console.log(`kaggle:run: complete in ${wallMin.toFixed(1)} min (counts against the weekly GPU quota)`);
