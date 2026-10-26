// Thin wrapper over the Kaggle CLI (VS-ADR-0011). Never reads or prints the token.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export function kaggleBin(): string {
  for (const dir of [...(process.env.PATH ?? '').split(':'), join(homedir(), '.local', 'bin')]) {
    if (dir && existsSync(join(dir, 'kaggle'))) return join(dir, 'kaggle');
  }
  throw new Error('kaggle CLI not found; run `uv tool install kaggle` (see npm run doctor)');
}

export function kaggle(args: string[], opts: { quiet?: boolean; timeoutMs?: number } = {}): string {
  return execFileSync(kaggleBin(), args, {
    encoding: 'utf8', timeout: opts.timeoutMs ?? 600_000, stdio: ['ignore', 'pipe', opts.quiet ? 'pipe' : 'inherit'],
  });
}

let cachedUser: string | undefined;
export function kaggleUser(): string {
  if (cachedUser) return cachedUser;
  const m = kaggle(['config', 'view'], { quiet: true }).match(/^- username: (\S+)$/m);
  if (!m) throw new Error('could not read the Kaggle username from `kaggle config view`');
  return (cachedUser = m[1]);
}

export const datasetSlug = (id: string) => `vs-${id}`;
export const kernelSlug = (id: string) => `vs-render-${id}`;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Create the private dataset, or add a version if it exists. `dir` holds dataset-metadata.json. */
export function uploadDataset(dir: string, slug: string, message: string): void {
  const ref = `${kaggleUser()}/${slug}`;
  let exists = true;
  try { kaggle(['datasets', 'status', ref], { quiet: true }); } catch { exists = false; }
  if (exists) kaggle(['datasets', 'version', '-p', dir, '-m', message, '-r', 'skip', '-q']);
  else kaggle(['datasets', 'create', '-p', dir, '-r', 'skip', '-q']); // private by default
}

/** A dataset must finish processing before a kernel can mount it. */
export async function waitForDataset(slug: string): Promise<void> {
  const ref = `${kaggleUser()}/${slug}`;
  for (let i = 0; ; i++) {
    let s: string;
    try {
      s = kaggle(['datasets', 'status', ref], { quiet: true }).trim();
    } catch {
      // `datasets status` has returned 403 for a large private dataset that exists and lists its
      // files fine (2026-10-26). Listing files is then the readiness signal.
      try { kaggle(['datasets', 'files', ref], { quiet: true }); return; } catch { s = 'unavailable'; }
    }
    if (/ready/i.test(s)) return;
    if (i > 60) throw new Error(`dataset ${ref} not ready after 10 min: ${s}`);
    await sleep(10_000);
  }
}

/** Poll a pushed kernel until it completes; returns wall minutes. Exits 1 on error/cancel. */
export async function waitForKernel(slug: string, started = Date.now(), maxHours = 3): Promise<number> {
  const ref = `${kaggleUser()}/${slug}`;
  for (;;) {
    await sleep(30_000);
    const s = kaggle(['kernels', 'status', ref], { quiet: true }).trim();
    const mins = (Date.now() - started) / 60_000;
    console.log(`kaggle: ${mins.toFixed(1)} min  ${s}`);
    if (/complete/i.test(s)) return mins;
    if (/error|cancel/i.test(s)) {
      console.error(`kaggle: kernel ${ref} failed; download its log with \`kaggle kernels output ${ref} -p <dir>\``);
      process.exit(1);
    }
    if (mins > maxHours * 60) throw new Error(`kernel ${ref} still running after ${maxHours} h`);
  }
}
