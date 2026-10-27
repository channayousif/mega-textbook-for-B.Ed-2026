// Where things live. Text state is in the repo; every binary is under MEDIA_ROOT, outside the
// working tree (constitution XIII). Nothing else should build these paths by hand.
import { homedir } from 'node:os';
import { dirname, join, relative, resolve, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

export const VS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const REPO_ROOT = resolve(VS_ROOT, '..');

/** True when `child` is `parent` or inside it. */
export function isInside(parent: string, child: string): boolean {
  const rel = relative(resolve(parent), resolve(child));
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
}

/** MEDIA_ROOT from the environment (default ~/video-studio-media). Refuses a path inside the repo. */
export function mediaRoot(env: NodeJS.ProcessEnv = process.env): string {
  const root = resolve(env.MEDIA_ROOT || join(homedir(), 'video-studio-media'));
  if (isInside(REPO_ROOT, root)) {
    throw new Error(`MEDIA_ROOT ${root} is inside the repo ${REPO_ROOT}; media must live outside git`);
  }
  return root;
}

export const EPISODE_ID_RE = /^[0-9]{8}-[a-z0-9-]+$/;

export function assertEpisodeId(id: string): string {
  if (!EPISODE_ID_RE.test(id)) throw new Error(`invalid episode id: ${JSON.stringify(id)}`);
  return id;
}

export const episodeDir = (id: string) => join(VS_ROOT, 'episodes', assertEpisodeId(id));
export const episodeMediaDir = (id: string) => join(mediaRoot(), assertEpisodeId(id));
export const kaggleBundleDir = (id: string) => join(mediaRoot(), 'kaggle', 'bundle', assertEpisodeId(id));
export const kaggleOutDir = (id: string) => join(mediaRoot(), 'kaggle', 'out', assertEpisodeId(id));
