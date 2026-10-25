// Step 1 of a Kaggle render (VS-ADR-0011): build a hashed bundle of approved inputs and upload it
// as a PRIVATE dataset version.
//   npm run kaggle:pack -- <episode-id>          # production: render inputs must be approved
//   npm run kaggle:pack -- --sample              # Phase 0 proof from fixtures/ (mode: sample)
//   add --no-upload to build the bundle only
// The bundle lives in $MEDIA_ROOT/kaggle/bundle/<id>/ (never in the repo).
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { readApprovals } from './lib/approvals.ts';
import { currentDigests, readEpisode } from './lib/episode.ts';
import { digestBytes } from './lib/hash.ts';
import { evaluate } from './lib/invalidation.ts';
import { datasetSlug, kaggle, kaggleUser } from './lib/kaggle.ts';
import { assertEpisodeId, kaggleBundleDir, REPO_ROOT, VS_ROOT } from './lib/paths.ts';
import { SAMPLE_EPISODE_ID, sampleProps } from './lib/sample.ts';
import { toneWav } from './lib/wav.ts';

const args = process.argv.slice(2);
const sample = args.includes('--sample');
const upload = !args.includes('--no-upload');
const id = assertEpisodeId(sample ? SAMPLE_EPISODE_ID : args.find((a) => !a.startsWith('--')) ?? '');

let props;
if (sample) {
  props = sampleProps();
} else {
  // Production render needs a valid assets approval; the props builder lands in Phase 4/5 (T040+).
  const ep = readEpisode(id);
  if (ep.mode === 'sample') throw new Error(`${id} is a sample episode; use --sample`);
  const state = evaluate(readApprovals(id), currentDigests(id));
  if (!state.assets.valid) throw new Error(`refusing to pack ${id}: assets approval is ${state.assets.reason}`);
  throw new Error('production props are built from approved assets in VS-001 Phase 4/5; not implemented yet');
}

const out = kaggleBundleDir(id);
const stage = join(out, '.stage');
rmSync(out, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });

// Project sources: exactly the tracked/known files the render needs, nothing from node_modules.
const PROJECT = ['package.json', 'package-lock.json', 'tsconfig.json'];
/** Files under `dir`, as paths relative to `base`. */
const walk = (dir: string, base: string): string[] => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p, base) : [relative(base, p)];
});
const files = [...PROJECT, ...walk(join(VS_ROOT, 'remotion', 'src'), VS_ROOT), 'kaggle/render-job.ts'];
for (const f of files) {
  mkdirSync(dirname(join(stage, f)), { recursive: true });
  copyFileSync(join(VS_ROOT, f), join(stage, f));
}
// Public assets: the site's own font (referenced, not copied into git) and the inputs' media.
const pub = join(stage, 'remotion', 'public');
mkdirSync(join(pub, 'fonts'), { recursive: true });
copyFileSync(join(REPO_ROOT, 'static', 'fonts', 'NotoNastaliqUrdu-Regular.woff2'), join(pub, 'fonts', 'NotoNastaliqUrdu-Regular.woff2'));
mkdirSync(join(pub, 'audio'), { recursive: true });
writeFileSync(join(pub, 'audio', 'test-tone.wav'), toneWav(props.duration_s));
writeFileSync(join(stage, 'props.json'), JSON.stringify(props, null, 2) + '\n');

const manifestFiles: Record<string, string> = {};
for (const f of walk(stage, stage).sort()) manifestFiles[f] = digestBytes(readFileSync(join(stage, f)));
// Not `.tar.gz`: Kaggle auto-extracts archives in datasets, which would drop the hashed file.
const tarName = 'project.vsbundle';
// Fixed mtime/owner so the same inputs give the same tarball bytes.
execFileSync('tar', ['--sort=name', '--mtime=2026-01-01 00:00:00Z', '--owner=0', '--group=0', '--numeric-owner',
  '-I', 'gzip -n', '-cf', join(out, tarName), '-C', stage, '.']);
rmSync(stage, { recursive: true, force: true });
const remotionVersion = JSON.parse(readFileSync(join(VS_ROOT, 'package.json'), 'utf8')).dependencies.remotion;
const manifest = {
  episode_id: id, mode: props.mode, remotion: remotionVersion,
  bundle_file: tarName, bundle_sha256: digestBytes(readFileSync(join(out, tarName))),
  files: manifestFiles,
};
writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`kaggle:pack: ${Object.keys(manifest.files).length} files, bundle ${manifest.bundle_sha256.slice(0, 12)}… in ${out}`);

if (upload) {
  const user = kaggleUser();
  const slug = datasetSlug(id);
  writeFileSync(join(out, 'dataset-metadata.json'), JSON.stringify({
    title: slug, id: `${user}/${slug}`, licenses: [{ name: 'other' }],
  }, null, 2));
  let exists = true;
  try { kaggle(['datasets', 'status', `${user}/${slug}`], { quiet: true }); } catch { exists = false; }
  if (exists) kaggle(['datasets', 'version', '-p', out, '-m', `bundle ${manifest.bundle_sha256.slice(0, 12)}`, '-r', 'skip', '-q']);
  else kaggle(['datasets', 'create', '-p', out, '-r', 'skip', '-q']); // private by default
  console.log(`kaggle:pack: uploaded private dataset ${user}/${slug}`);
}
