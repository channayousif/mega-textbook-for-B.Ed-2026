// T004: check that this machine can run the pipeline, and print fixes. Exit 1 on any FAIL.
//   npm run doctor            # local checks only
//   npm run doctor -- --online  # also proves the Kaggle token works (read-only API call)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync, statfsSync } from 'node:fs';
import { freemem, homedir } from 'node:os';
import { join } from 'node:path';
import { mediaRoot, REPO_ROOT } from './lib/paths.ts';

type Result = { name: string; level: 'ok' | 'warn' | 'fail'; detail: string; fix?: string };
const results: Result[] = [];
const add = (r: Result) => results.push(r);
const online = process.argv.includes('--online');

const major = Number(process.versions.node.split('.')[0]);
add(major >= 22 ? { name: 'node', level: 'ok', detail: process.version }
  : { name: 'node', level: 'fail', detail: process.version, fix: 'install Node 22+' });

try {
  const root = mediaRoot();
  mkdirSync(root, { recursive: true });
  add({ name: 'MEDIA_ROOT', level: 'ok', detail: `${root} (outside the repo)` });
} catch (e) {
  add({ name: 'MEDIA_ROOT', level: 'fail', detail: (e as Error).message, fix: 'export MEDIA_ROOT=~/video-studio-media' });
}

function which(cmd: string): string | null {
  for (const dir of [...(process.env.PATH ?? '').split(':'), join(homedir(), '.local', 'bin')]) {
    const p = join(dir, cmd);
    if (dir && existsSync(p)) return p;
  }
  return null;
}
const kaggle = which('kaggle');
add(kaggle ? { name: 'kaggle CLI', level: 'ok', detail: kaggle }
  : { name: 'kaggle CLI', level: 'fail', detail: 'not found', fix: 'uv tool install kaggle' });

// The token is never read here, only its presence and permissions.
const tokenFiles = ['access_token', 'kaggle.json'].map((f) => join(homedir(), '.kaggle', f)).filter(existsSync);
if (!tokenFiles.length && !process.env.KAGGLE_API_TOKEN) {
  add({ name: 'kaggle token', level: 'fail', detail: 'none in ~/.kaggle', fix: 'save the API token from kaggle.com/settings to ~/.kaggle/access_token, chmod 600' });
} else {
  for (const f of tokenFiles) {
    const mode = statSync(f).mode & 0o777;
    add(mode & 0o077
      ? { name: 'kaggle token', level: 'fail', detail: `${f} mode ${mode.toString(8)}`, fix: `chmod 600 ${f}` }
      : { name: 'kaggle token', level: 'ok', detail: `${f} mode 600` });
  }
}
if (online && kaggle) {
  try {
    execFileSync(kaggle, ['kernels', 'list', '--mine', '--page-size', '1'], { stdio: 'pipe', timeout: 60_000 });
    add({ name: 'kaggle auth', level: 'ok', detail: 'token accepted (kernels list)' });
  } catch (e) {
    add({ name: 'kaggle auth', level: 'fail', detail: String((e as any).stderr ?? e).slice(0, 200), fix: 'replace the token' });
  }
}

const font = join(REPO_ROOT, 'static', 'fonts', 'NotoNastaliqUrdu-Regular.woff2');
add(existsSync(font) ? { name: 'Nastaliq font', level: 'ok', detail: font }
  : { name: 'Nastaliq font', level: 'fail', detail: 'missing', fix: 'restore static/fonts/NotoNastaliqUrdu-Regular.woff2' });

const freeGb = freemem() / 2 ** 30;
add(freeGb >= 3 ? { name: 'memory', level: 'ok', detail: `${freeGb.toFixed(1)} GB free` }
  : { name: 'memory', level: 'warn', detail: `${freeGb.toFixed(1)} GB free`, fix: 'under 3 GB: wait before any local heavy job (flock /tmp/mega-book-heavy.lock)' });
try {
  const fs = statfsSync(homedir());
  const gb = (fs.bavail * fs.bsize) / 2 ** 30;
  add({ name: 'disk', level: gb >= 10 ? 'ok' : 'warn', detail: `${gb.toFixed(0)} GB free`, fix: gb >= 10 ? undefined : 'free space; renders are kept in MEDIA_ROOT' });
} catch { /* statfs unsupported */ }

// Local FFmpeg is optional: renders and audits run on Kaggle. Playwright's bundled build lacks loudnorm.
const ffmpeg = which('ffmpeg');
add(ffmpeg ? { name: 'ffmpeg (optional)', level: 'ok', detail: ffmpeg }
  : { name: 'ffmpeg (optional)', level: 'warn', detail: 'not installed; fine, media work runs on Kaggle' });

const mark = { ok: 'OK  ', warn: 'WARN', fail: 'FAIL' };
for (const r of results) console.log(`${mark[r.level]} ${r.name.padEnd(18)} ${r.detail}${r.fix ? `\n     fix: ${r.fix}` : ''}`);
const failed = results.filter((r) => r.level === 'fail').length;
console.log(failed ? `\ndoctor: ${failed} failing check(s)` : '\ndoctor: green');
process.exit(failed ? 1 : 0);
