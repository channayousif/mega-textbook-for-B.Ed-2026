// Step 3 of a Kaggle render (VS-ADR-0011): download the kernel outputs into MEDIA_ROOT, verify every
// SHA-256 against output-manifest.json and that the run used the bundle we packed, then file the
// outputs under $MEDIA_ROOT/<id>/{render,stills}. Nothing is written into the repo except text state.
//   npm run kaggle:fetch -- <episode-id>
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { digestFile } from './lib/hash.ts';
import { kaggle, kaggleUser, kernelSlug } from './lib/kaggle.ts';
import { assertEpisodeId, episodeDir, episodeMediaDir, kaggleBundleDir, kaggleOutDir, mediaRoot } from './lib/paths.ts';
import { assertValid } from './lib/schema.ts';

const id = assertEpisodeId(process.argv.slice(2).find((a) => !a.startsWith('--')) ?? '');
const dl = kaggleOutDir(id);
rmSync(dl, { recursive: true, force: true });
mkdirSync(dl, { recursive: true });
kaggle(['kernels', 'output', `${kaggleUser()}/${kernelSlug(id)}`, '-p', dl, '-o', '-q']);

const walk = (dir: string): string[] => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const manifestPath = walk(dl).find((p) => basename(p) === 'output-manifest.json');
if (!manifestPath) {
  const logs = walk(dl).filter((p) => p.endsWith('.log'));
  console.error(`kaggle:fetch: no output-manifest.json; the run failed. Log: ${logs[0] ?? '(none downloaded)'}`);
  process.exit(1);
}
const outRoot = manifestPath.slice(0, -'output-manifest.json'.length);
const om = JSON.parse(readFileSync(manifestPath, 'utf8'));

const packed = join(kaggleBundleDir(id), 'manifest.json');
const packedSha = await digestFile(packed);
if (om.input_manifest_sha256 !== packedSha) {
  throw new Error(`run used a different bundle (${om.input_manifest_sha256}) than the one packed here (${packedSha}); refusing`);
}
const bad: string[] = [];
for (const [rel, sha] of Object.entries<string>(om.outputs)) {
  const p = join(outRoot, rel);
  if (!existsSync(p) || (await digestFile(p)) !== sha) bad.push(rel);
}
if (bad.length) throw new Error(`output hash mismatch, refusing: ${bad.join(', ')}`);

const media = episodeMediaDir(id);
for (const sub of ['render', 'stills']) mkdirSync(join(media, sub), { recursive: true });
for (const rel of Object.keys(om.outputs)) {
  const dest = rel.startsWith('stills/') ? join(media, rel) : join(media, 'render', rel);
  copyFileSync(join(outRoot, rel), dest);
}
copyFileSync(manifestPath, join(media, 'render', 'output-manifest.json'));
const finalSha = om.outputs['final.mp4'];
const report = JSON.parse(readFileSync(join(outRoot, 'job-report.json'), 'utf8'));
const probe = JSON.parse(readFileSync(join(outRoot, 'probe.json'), 'utf8'));

// Text state in the repo: hashes and MEDIA_ROOT-relative paths only.
const epDir = episodeDir(id);
mkdirSync(epDir, { recursive: true });
const epPath = join(epDir, 'episode.json');
const now = new Date().toISOString();
const ep = existsSync(epPath) ? JSON.parse(readFileSync(epPath, 'utf8')) : {
  episode_id: id, topic_id: id.replace(/^\d{8}-/, ''), status: 'rendering', created_at: now,
  mode: report.mode, history: [],
};
ep.render = {
  file: relative(mediaRoot(), join(media, 'render', 'final.mp4')),
  duration_s: Number(probe.format?.duration ?? 0),
  sha256: finalSha,
  subtitles: ['captions.ur.srt', 'captions.ur.vtt'],
};
ep.usage = { ...(ep.usage ?? {}), render_seconds: report.timings?.render_s ?? 0, metered_cost_usd: 0 };
ep.history.push({ at: now, from: ep.status, to: 'render_review', by: 'claude', note: `Kaggle render fetched and verified (${om.gpu})` });
ep.status = 'render_review';
assertValid('episode', ep);
writeFileSync(epPath, JSON.stringify(ep, null, 2) + '\n');
console.log(`kaggle:fetch: verified ${Object.keys(om.outputs).length} outputs; final.mp4 ${finalSha.slice(0, 12)}… in ${media}`);
console.log(JSON.stringify({ timings: om.timings_s, job: report.timings, gpu: om.gpu, nvenc: report.nvenc }, null, 2));
