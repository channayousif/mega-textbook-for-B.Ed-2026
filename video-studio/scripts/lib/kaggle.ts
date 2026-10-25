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
