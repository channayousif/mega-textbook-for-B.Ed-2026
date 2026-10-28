// Runs INSIDE the Kaggle notebook (VS-ADR-0011), after render.py has verified the bundle.
//   npx tsx kaggle/render-job.ts <props.json> <out-dir>
// Bundles the Remotion project, renders the final master with software x264 (deterministic),
// probes it, extracts stills from the ENCODED file (VS-001 AC5.6), writes SRT/VTT sidecars, and
// tests NVENC availability separately so the spike can report it.
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { ShortProps } from '../remotion/src/props.ts';

const [propsPath, outArg] = process.argv.slice(2);
if (!propsPath || !outArg) throw new Error('usage: render-job.ts <props.json> <out-dir>');
const out = resolve(outArg);
mkdirSync(join(out, 'stills'), { recursive: true });
const props: ShortProps = JSON.parse(readFileSync(propsPath, 'utf8'));
const timings: Record<string, number> = {};
const time = async <T>(name: string, fn: () => Promise<T> | T): Promise<T> => {
  const t0 = Date.now();
  try { return await fn(); } finally { timings[name] = (Date.now() - t0) / 1000; }
};
const remotion = (args: string[]) => execFileSync('npx', ['remotion', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

const serveUrl = await time('bundle_s', () => bundle({
  entryPoint: resolve('remotion/src/index.ts'),
  publicDir: resolve('remotion/public'),
}));
const composition = await time('select_s', () => selectComposition({ serveUrl, id: 'UrduShort', inputProps: props }));
const finalPath = join(out, 'final.mp4');
await time('render_s', () => renderMedia({
  composition, serveUrl, inputProps: props, codec: 'h264', x264Preset: 'medium',
  outputLocation: finalPath, chromiumOptions: { enableMultiProcessOnLinux: true },
}));

const probe = JSON.parse(remotion(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', finalPath]));
writeFileSync(join(out, 'probe.json'), JSON.stringify(probe, null, 2));

await time('stills_s', () => {
  // Six stills spread over the whole video, the last inside the end card.
  const d = props.duration_s;
  const times = [0.1, 0.3, 0.5, 0.7, 0.85].map((f) => Number((f * d).toFixed(1))).concat(Number((d - props.end_card.seconds / 2).toFixed(1)));
  for (const t of times) {
    remotion(['ffmpeg', '-v', 'error', '-y', '-ss', String(t), '-i', finalPath, '-frames:v', '1', join(out, 'stills', `t${t.toFixed(1).padStart(4, '0')}.png`)]);
  }
});

const stamp = (s: number, sep: string) => {
  const ms = Math.round(s * 1000);
  const p = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3_600_000))}:${p(Math.floor(ms / 60_000) % 60)}:${p(Math.floor(ms / 1000) % 60)}${sep}${p(ms % 1000, 3)}`;
};
// One sidecar cue per caption window when the line has sentence cues (V007), else one per line.
const windows = props.lines.flatMap((l) => l.cues?.length ? l.cues : [{ text_ur: l.text_ur, from_s: l.from_s, to_s: l.to_s }]);
const cues = (sep: string) => windows.map((c, i) => `${sep === ',' ? `${i + 1}\n` : ''}${stamp(c.from_s, sep)} --> ${stamp(c.to_s, sep)}\n${c.text_ur}\n`).join('\n');
writeFileSync(join(out, 'captions.ur.srt'), cues(','));
writeFileSync(join(out, 'captions.ur.vtt'), `WEBVTT\n\n${cues('.')}`);
// The timings used, in the shape episodes/<id>/alignment.json takes, so the owner can correct them by hand.
writeFileSync(join(out, 'alignment.json'), JSON.stringify(Object.fromEntries(props.lines.filter((l) => l.cues?.length).map((l) => [l.id, l.cues])), null, 2) + '\n');

let nvenc = 'not tested';
try {
  // Remotion's FFmpeg has no lavfi test sources, so re-encode the master itself.
  remotion(['ffmpeg', '-v', 'error', '-i', finalPath, '-c:v', 'h264_nvenc', '-f', 'null', '-']);
  nvenc = 'works';
} catch (e) {
  nvenc = `unavailable: ${String((e as any).stderr ?? e).split('\n').filter(Boolean).slice(-1)[0] ?? ''}`.slice(0, 300);
}
let gpu = 'n/a';
try { gpu = remotion(['gpu']).slice(0, 4000); } catch (e) { gpu = `remotion gpu failed: ${String(e).slice(0, 200)}`; }

writeFileSync(join(out, 'job-report.json'), JSON.stringify({
  episode_id: props.episode_id, mode: props.mode, encoder: 'libx264 (x264 preset medium)',
  composition: { width: composition.width, height: composition.height, fps: composition.fps, durationInFrames: composition.durationInFrames },
  timings, nvenc, chrome_gpu: gpu,
}, null, 2));
console.log('render-job: done', timings);
