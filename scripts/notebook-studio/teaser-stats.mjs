#!/usr/bin/env node
// View counts of the public course teasers, for the home page's "Courses in 30 seconds" picks
// (owner, 2026-11-22: two most watched plus the two newest).
//
//   node scripts/notebook-studio/teaser-stats.mjs [--dry-run]
//
// One YouTube Data API call (videos.list part=statistics, 1 quota unit) with the youtube-uploader
// sign-in (yt-describe.mjs accessToken). Writes specs/studio/teasers/teaser-stats.json, which
// build-studio-index.mjs reads; the site build itself has no YouTube sign-in. Run it whenever
// teasers are published or cross-posted and commit the file in that PR.
import { writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { accessToken } from './yt-describe.mjs';
import { loadLedger } from './teaser.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const STATS_PATH = join(ROOT, 'specs', 'studio', 'teasers', 'teaser-stats.json');

/** YouTube ids of the public teasers, in a stable order. */
export const publicIds = (ledger) => [...new Set(ledger.items.filter((i) => i.state === 'public' && i.youtube_id).map((i) => i.youtube_id))].sort();

/** videos.list response -> { fetched_at, videos: { id: { views, likes } } }, ids sorted. */
export function statsFromResponse(body, fetchedAt) {
  const videos = {};
  for (const v of [...(body.items ?? [])].sort((a, b) => a.id.localeCompare(b.id))) {
    videos[v.id] = { views: Number(v.statistics?.viewCount ?? 0), likes: Number(v.statistics?.likeCount ?? 0) };
  }
  return { fetched_at: fetchedAt, videos };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const ids = publicIds(loadLedger());
  if (!ids.length) { console.log('no public teasers'); process.exit(0); }
  if (ids.length > 50) throw new Error('more than 50 public teasers: page the request');
  const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids.join(',')}`, { headers: { Authorization: `Bearer ${await accessToken()}` } });
  if (!r.ok) throw new Error(`videos.list -> ${r.status} ${(await r.text()).slice(0, 200)}`);
  const stats = statsFromResponse(await r.json(), new Date().toISOString());
  const text = `${JSON.stringify(stats, null, 1)}\n`;
  if (process.argv.includes('--dry-run')) console.log(text);
  else writeFileSync(STATS_PATH, text);
  for (const [id, s] of Object.entries(stats.videos).sort((a, b) => b[1].views - a[1].views)) console.log(`${id} ${s.views} views`);
}
