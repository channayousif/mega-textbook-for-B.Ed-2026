#!/usr/bin/env node
// Feature 029: update the description (and tags) of an already-published video in place, through
// the YouTube Data API videos.update (50 quota units; a re-upload costs 1,600 and changes the ID).
// The youtube-uploader MCP has no description edit, so this reuses its saved sign-in: the channel
// token cache in the MCP's working dir and the OAuth client file it was started with. Nothing
// secret is printed or written anywhere else.
//
//   node scripts/notebook-studio/yt-describe.mjs unit <course> <unit> <key>   # from youtube-meta.mjs
//   node scripts/notebook-studio/yt-describe.mjs teaser <key>                 # from teaser.mjs meta
//   add --dry-run to print what would change
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const CHANNEL = 'UC7cQfkGkdNABCiyjmV5ZaFQ';
const CACHE = process.env.YT_TOKEN_CACHE ?? join(homedir(), '.config', 'youtube-uploader', '.youtube_uploader_channels_cache');
const CLIENT = process.env.YT_CLIENT_FILE ?? join(homedir(), '.config', 'gcloud', 'notebook-client.json');
const API = 'https://www.googleapis.com/youtube/v3';

/** The snippet to send: videos.update replaces the whole snippet, so title and category must be kept. */
export function mergedSnippet(current, { description, tags }) {
  const s = { title: current.title, categoryId: current.categoryId, description };
  if (tags?.length) s.tags = tags;
  else if (current.tags) s.tags = current.tags;
  for (const k of ['defaultLanguage', 'defaultAudioLanguage']) if (current[k]) s[k] = current[k];
  return s;
}

export async function accessToken() {
  const cache = JSON.parse(readFileSync(CACHE, 'utf8'));
  const ch = cache[CHANNEL];
  if (!ch?.token?.refresh_token) throw new Error('no saved YouTube sign-in: run the youtube-uploader authenticate flow');
  if (ch.token.access_token && Date.parse(ch.token.expiry) - Date.now() > 120_000) return ch.token.access_token;
  const c = JSON.parse(readFileSync(CLIENT, 'utf8')).installed;
  const r = await fetch(c.token_uri, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ client_id: c.client_id, client_secret: c.client_secret, refresh_token: ch.token.refresh_token, grant_type: 'refresh_token' }) });
  const t = await r.json();
  if (!r.ok) throw new Error(`token refresh failed: ${t.error ?? r.status}`);
  ch.token.access_token = t.access_token;
  ch.token.expiry = new Date(Date.now() + t.expires_in * 1000).toISOString();
  writeFileSync(CACHE, JSON.stringify(cache), { mode: 0o600 }); // keep the MCP's cache current
  return t.access_token;
}

export async function updateDescription(videoId, { description, tags }, { dryRun = false } = {}) {
  const tok = await accessToken();
  const h = { Authorization: `Bearer ${tok}` };
  const got = await (await fetch(`${API}/videos?part=snippet&id=${encodeURIComponent(videoId)}`, { headers: h })).json();
  const cur = got.items?.[0]?.snippet;
  if (!cur) throw new Error(`video ${videoId} not found on this channel (${got.error?.message ?? 'no item'})`);
  const snippet = mergedSnippet(cur, { description, tags });
  if (dryRun) return { videoId, title: cur.title, before_bytes: Buffer.byteLength(cur.description ?? ''), after_bytes: Buffer.byteLength(description) };
  const r = await fetch(`${API}/videos?part=snippet`, { method: 'PUT', headers: { ...h, 'Content-Type': 'application/json' }, body: JSON.stringify({ id: videoId, snippet }) });
  const body = await r.json();
  if (!r.ok) throw new Error(`videos.update ${videoId} -> ${r.status} ${body.error?.message ?? ''}`);
  return { videoId, title: body.snippet.title, description_bytes: Buffer.byteLength(body.snippet.description) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const dryRun = a.includes('--dry-run');
  const [mode, ...rest] = a.filter((x) => x !== '--dry-run');
  const node = (args) => JSON.parse(execFileSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8' }));
  const run = async () => {
    if (mode === 'unit') {
      const [course, unit, key] = rest;
      const { loadLedger } = await import('./media-ledger.mjs');
      const item = loadLedger(course, Number(unit)).items.find((i) => i.key === key);
      if (!item?.youtube_id) throw new Error(`${key} has no youtube_id`);
      const m = node([join(ROOT, 'scripts/notebook-studio/youtube-meta.mjs'), course, unit, key]).upload_video;
      return updateDescription(item.youtube_id, { description: m.description, tags: m.tags }, { dryRun });
    }
    if (mode === 'teaser') {
      const [key] = rest;
      const { loadLedger } = await import('./teaser.mjs');
      const item = loadLedger().items.find((i) => i.key === key);
      if (!item?.youtube_id) throw new Error(`${key} has no youtube_id`);
      const m = node([join(ROOT, 'scripts/notebook-studio/teaser.mjs'), 'meta', key]).upload_video;
      return updateDescription(item.youtube_id, { description: m.description, tags: m.tags.split(',') }, { dryRun });
    }
    throw new Error('usage: yt-describe.mjs unit <course> <unit> <key> | teaser <key> [--dry-run]');
  };
  run().then((r) => console.log(JSON.stringify(r))).catch((e) => { console.error(`yt-describe: ${e.message}`); process.exit(1); });
}
