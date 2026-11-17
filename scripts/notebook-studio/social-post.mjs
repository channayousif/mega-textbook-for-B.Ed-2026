#!/usr/bin/env node
// Feature 029 studio-teaser stage 12: cross-post a published teaser Short through each platform's
// official API (owner, 2026-11-17). Local file uploads only; no public video hosting.
//
//   node scripts/notebook-studio/social-post.mjs auth-url <meta|tiktok|linkedin>
//   node scripts/notebook-studio/social-post.mjs exchange <meta|tiktok|linkedin> '<redirected URL or code>'
//        (meta also accepts a Graph API Explorer user token, which starts with EAA)
//   node scripts/notebook-studio/social-post.mjs post <instagram|facebook|tiktok|linkedin> <ledger key> <video.mp4>
//
// App credentials (client id/secret) live in ~/.config/textbook-social/apps.json and tokens in
// ~/.config/textbook-social/<provider>.json, both mode 600 and never in git. Each post is recorded
// in the teaser ledger with `teaser.mjs crosspost`; this script prints the fields to record.
import { readFileSync, writeFileSync, mkdirSync, statSync, existsSync, chmodSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import { loadScript, socialMeta } from './teaser.mjs';

export const GRAPH = 'v27.0';
export const LINKEDIN_VERSION = '202610';
export const REDIRECT_URI = 'https://textbook.com.pk/';
export const PROVIDER_OF = { instagram: 'meta', facebook: 'meta', tiktok: 'tiktok', linkedin: 'linkedin' };
const SCOPES = {
  meta: ['pages_show_list', 'pages_read_engagement', 'pages_manage_posts', 'instagram_basic', 'instagram_content_publish', 'business_management'],
  tiktok: ['user.info.basic', 'video.upload'],
  linkedin: ['openid', 'profile', 'w_member_social'],
};
const DIR = process.env.TEXTBOOK_SOCIAL_DIR ?? join(homedir(), '.config', 'textbook-social');

// ---------- pure request builders (unit-tested) ----------

export function authUrl(provider, app, state = randomBytes(8).toString('hex')) {
  const q = (o) => new URLSearchParams(o).toString();
  // Facebook Login for Business takes a saved configuration (permissions + assets) as config_id;
  // a plain scope list fails there with "Invalid Scope". Classic Facebook Login uses scope.
  if (provider === 'meta') return `https://www.facebook.com/${GRAPH}/dialog/oauth?${q({ client_id: app.client_id, redirect_uri: REDIRECT_URI, ...(app.config_id ? { config_id: app.config_id, override_default_response_type: 'true' } : { scope: SCOPES.meta.join(',') }), response_type: 'code', state })}`;
  if (provider === 'tiktok') return `https://www.tiktok.com/v2/auth/authorize/?${q({ client_key: app.client_id, scope: SCOPES.tiktok.join(','), response_type: 'code', redirect_uri: REDIRECT_URI, state })}`;
  if (provider === 'linkedin') return `https://www.linkedin.com/oauth/v2/authorization?${q({ response_type: 'code', client_id: app.client_id, redirect_uri: REDIRECT_URI, scope: SCOPES.linkedin.join(' '), state })}`;
  throw new Error(`unknown provider ${provider}`);
}

/** Accept the whole redirected address or just the code. */
export function codeFrom(input) {
  const s = String(input).trim();
  if (!/^https?:/.test(s)) return s;
  const code = new URL(s).searchParams.get('code');
  if (!code) throw new Error('no code in that address');
  return code;
}

/** TikTok: files up to 64 MB go as one chunk; larger ones in 10 MB chunks with the remainder in the last. */
export function tiktokChunks(size, chunk = 10 * 1024 * 1024) {
  if (size <= 64 * 1024 * 1024) return { chunk_size: size, total_chunk_count: 1, ranges: [[0, size - 1]] };
  const count = Math.floor(size / chunk);
  const ranges = [];
  for (let i = 0; i < count; i++) ranges.push([i * chunk, i === count - 1 ? size - 1 : (i + 1) * chunk - 1]);
  return { chunk_size: chunk, total_chunk_count: count, ranges };
}

export const tiktokInit = (size) => {
  const { chunk_size, total_chunk_count } = tiktokChunks(size);
  return { source_info: { source: 'FILE_UPLOAD', video_size: size, chunk_size, total_chunk_count } };
};

export const linkedinInit = (owner, size) => ({ initializeUploadRequest: { owner, fileSizeBytes: size, uploadCaptions: false, uploadThumbnail: false } });

export const linkedinPost = (author, video, commentary, title) => ({
  author, commentary, visibility: 'PUBLIC',
  distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
  content: { media: { title, id: video } }, lifecycleState: 'PUBLISHED', isReshareDisabledByAuthor: false,
});

// ---------- storage ----------

const readJson = (f) => JSON.parse(readFileSync(f, 'utf8'));
function writeSecret(name, data) {
  mkdirSync(DIR, { recursive: true, mode: 0o700 });
  const f = join(DIR, name);
  writeFileSync(f, `${JSON.stringify(data, null, 1)}\n`, { mode: 0o600 });
  chmodSync(f, 0o600);
}
function app(provider) {
  const f = join(DIR, 'apps.json');
  if (!existsSync(f)) throw new Error(`missing ${f}: add {"${provider}":{"client_id":"…","client_secret":"…"}}`);
  const a = readJson(f)[provider];
  if (!a?.client_id || !a?.client_secret) throw new Error(`apps.json has no ${provider} client_id/client_secret`);
  return a;
}
const token = (provider) => {
  const f = join(DIR, `${provider}.json`);
  if (!existsSync(f)) throw new Error(`not signed in to ${provider}: run auth-url then exchange`);
  return readJson(f);
};

// ---------- network ----------

async function call(url, opts = {}) {
  const r = await fetch(url, opts);
  const text = await r.text();
  let body;
  try { body = text ? JSON.parse(text) : {}; } catch { body = { raw: text }; }
  if (!r.ok || body.error?.message || (body.error?.code && body.error.code !== 'ok')) {
    throw new Error(`${opts.method ?? 'GET'} ${url.split('?')[0]} -> ${r.status} ${JSON.stringify(body.error ?? body).slice(0, 300)}`);
  }
  return { body, headers: r.headers };
}
const form = (o) => ({ method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(o) });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function exchange(provider, input) {
  const a = app(provider);
  const code = codeFrom(input);
  if (provider === 'meta') {
    // A user token from Meta's Graph API Explorer (starts "EAA") skips the login dialog; otherwise
    // the input is the dialog's redirect code.
    const short = /^EAA/.test(code) ? code
      : (await call(`https://graph.facebook.com/${GRAPH}/oauth/access_token?${new URLSearchParams({ client_id: a.client_id, client_secret: a.client_secret, redirect_uri: REDIRECT_URI, code })}`)).body.access_token;
    const lq = new URLSearchParams({ grant_type: 'fb_exchange_token', client_id: a.client_id, client_secret: a.client_secret, fb_exchange_token: short });
    const user = (await call(`https://graph.facebook.com/${GRAPH}/oauth/access_token?${lq}`)).body.access_token;
    // Page tokens fetched with a long-lived user token do not expire.
    const pages = (await call(`https://graph.facebook.com/${GRAPH}/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${user}`)).body.data ?? [];
    if (!pages.length) throw new Error('no Facebook Page on this account; grant the textbook.com.pk Page in the dialog');
    const page = pages.find((p) => /textbook/i.test(p.name)) ?? pages[0];
    writeSecret('meta.json', { page_id: page.id, page_name: page.name, page_token: page.access_token, ig_id: page.instagram_business_account?.id ?? null, saved_at: new Date().toISOString() });
    return { provider, page: page.name, instagram_linked: Boolean(page.instagram_business_account) };
  }
  if (provider === 'tiktok') {
    const t = (await call('https://open.tiktokapis.com/v2/oauth/token/', form({ client_key: a.client_id, client_secret: a.client_secret, code, grant_type: 'authorization_code', redirect_uri: REDIRECT_URI }))).body;
    writeSecret('tiktok.json', { ...t, saved_at: new Date().toISOString() });
    return { provider, open_id: t.open_id, scope: t.scope };
  }
  if (provider === 'linkedin') {
    const t = (await call('https://www.linkedin.com/oauth/v2/accessToken', form({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI, client_id: a.client_id, client_secret: a.client_secret }))).body;
    const me = (await call('https://api.linkedin.com/v2/userinfo', { headers: { Authorization: `Bearer ${t.access_token}` } })).body;
    writeSecret('linkedin.json', { ...t, author: `urn:li:person:${me.sub}`, name: me.name, saved_at: new Date().toISOString() });
    return { provider, author: me.name };
  }
  throw new Error(`unknown provider ${provider}`);
}

async function tiktokAccess() {
  const t = token('tiktok');
  const age = (Date.now() - Date.parse(t.saved_at)) / 1000;
  if (age < (t.expires_in ?? 0) - 300) return t.access_token;
  const a = app('tiktok');
  const n = (await call('https://open.tiktokapis.com/v2/oauth/token/', form({ client_key: a.client_id, client_secret: a.client_secret, grant_type: 'refresh_token', refresh_token: t.refresh_token }))).body;
  writeSecret('tiktok.json', { ...n, saved_at: new Date().toISOString() });
  return n.access_token;
}

async function postInstagram(file, caption) {
  const m = token('meta');
  if (!m.ig_id) throw new Error('the Facebook Page has no linked Instagram professional account');
  const size = statSync(file).size;
  const q = new URLSearchParams({ media_type: 'REELS', upload_type: 'resumable', caption, share_to_feed: 'true', access_token: m.page_token });
  const id = (await call(`https://graph.facebook.com/${GRAPH}/${m.ig_id}/media?${q}`, { method: 'POST' })).body.id;
  await call(`https://rupload.facebook.com/ig-api-upload/${GRAPH}/${id}`, { method: 'POST', headers: { Authorization: `OAuth ${m.page_token}`, offset: '0', file_size: String(size) }, body: readFileSync(file) });
  for (let i = 0; i < 60; i++) {
    const s = (await call(`https://graph.facebook.com/${GRAPH}/${id}?fields=status_code&access_token=${m.page_token}`)).body.status_code;
    if (s === 'FINISHED') break;
    if (s === 'ERROR' || s === 'EXPIRED') throw new Error(`Instagram container ${id} ${s}`);
    await sleep(5000);
  }
  const media = (await call(`https://graph.facebook.com/${GRAPH}/${m.ig_id}/media_publish?${new URLSearchParams({ creation_id: id, access_token: m.page_token })}`, { method: 'POST' })).body.id;
  const link = (await call(`https://graph.facebook.com/${GRAPH}/${media}?fields=permalink&access_token=${m.page_token}`)).body.permalink ?? null;
  return { state: 'posted', post_id: media, url: link };
}

async function postFacebook(file, caption) {
  const m = token('meta');
  const size = statSync(file).size;
  const base = `https://graph.facebook.com/${GRAPH}/${m.page_id}/video_reels`;
  const { video_id } = (await call(`${base}?${new URLSearchParams({ upload_phase: 'start', access_token: m.page_token })}`, { method: 'POST' })).body;
  await call(`https://rupload.facebook.com/video-upload/${GRAPH}/${video_id}`, { method: 'POST', headers: { Authorization: `OAuth ${m.page_token}`, offset: '0', file_size: String(size) }, body: readFileSync(file) });
  await call(`${base}?${new URLSearchParams({ upload_phase: 'finish', video_id, video_state: 'PUBLISHED', description: caption, access_token: m.page_token })}`, { method: 'POST' });
  return { state: 'posted', post_id: video_id, url: `https://www.facebook.com/reel/${video_id}` };
}

async function postTiktok(file) {
  // Inbox draft (MEDIA_UPLOAD): the owner adds the caption and taps Post in the TikTok app. Direct
  // posting stays private-only until TikTok audits the app.
  const access = await tiktokAccess();
  const size = statSync(file).size;
  const init = (await call('https://open.tiktokapis.com/v2/post/publish/inbox/video/init/', {
    method: 'POST', headers: { Authorization: `Bearer ${access}`, 'Content-Type': 'application/json; charset=UTF-8' }, body: JSON.stringify(tiktokInit(size)),
  })).body.data;
  const buf = readFileSync(file);
  for (const [a, b] of tiktokChunks(size).ranges) {
    const r = await fetch(init.upload_url, { method: 'PUT', headers: { 'Content-Type': 'video/mp4', 'Content-Length': String(b - a + 1), 'Content-Range': `bytes ${a}-${b}/${size}` }, body: buf.subarray(a, b + 1) });
    if (!r.ok) throw new Error(`TikTok chunk ${a}-${b} -> ${r.status} ${(await r.text()).slice(0, 200)}`);
  }
  return { state: 'draft', post_id: init.publish_id, url: null };
}

async function postLinkedin(file, caption, title) {
  const t = token('linkedin');
  const h = { Authorization: `Bearer ${t.access_token}`, 'LinkedIn-Version': LINKEDIN_VERSION, 'X-Restli-Protocol-Version': '2.0.0', 'Content-Type': 'application/json' };
  const size = statSync(file).size;
  const init = (await call('https://api.linkedin.com/rest/videos?action=initializeUpload', { method: 'POST', headers: h, body: JSON.stringify(linkedinInit(t.author, size)) })).body.value;
  const buf = readFileSync(file);
  const etags = [];
  for (const u of init.uploadInstructions) {
    const r = await fetch(u.uploadUrl, { method: 'PUT', headers: { 'Content-Type': 'application/octet-stream' }, body: buf.subarray(u.firstByte, u.lastByte + 1) });
    if (!r.ok) throw new Error(`LinkedIn part ${u.firstByte} -> ${r.status}`);
    etags.push(r.headers.get('etag'));
  }
  await call('https://api.linkedin.com/rest/videos?action=finalizeUpload', { method: 'POST', headers: h, body: JSON.stringify({ finalizeUploadRequest: { video: init.video, uploadToken: init.uploadToken ?? '', uploadedPartIds: etags } }) });
  const { headers } = await call('https://api.linkedin.com/rest/posts', { method: 'POST', headers: h, body: JSON.stringify(linkedinPost(t.author, init.video, caption, title)) });
  const urn = headers.get('x-restli-id');
  return { state: 'posted', post_id: urn, url: urn ? `https://www.linkedin.com/feed/update/${urn}/` : null };
}

export async function post(platform, key, file) {
  if (!PROVIDER_OF[platform]) throw new Error(`unknown platform ${platform}`);
  const ledger = readJson(fileURLToPath(new URL('../../specs/studio/teasers/media-teasers.json', import.meta.url)));
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  if (item.state !== 'public') throw new Error(`${key}: cross-post only after the YouTube Short is public`);
  if (item.crossposts?.[platform]) throw new Error(`${key} is already on ${platform} (${item.crossposts[platform].post_id})`);
  const meta = socialMeta(loadScript(item.id), item.locale, platform);
  if (platform === 'instagram') return { ...(await postInstagram(file, meta.caption)), caption: meta.caption };
  if (platform === 'facebook') return { ...(await postFacebook(file, meta.caption)), caption: meta.caption };
  if (platform === 'tiktok') return { ...(await postTiktok(file)), caption: meta.caption };
  return { ...(await postLinkedin(file, meta.caption, meta.title)), caption: meta.caption };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, x, y, z] = process.argv.slice(2);
  const run = async () => {
    if (cmd === 'auth-url') return authUrl(x, app(x));
    if (cmd === 'exchange') return exchange(x, y);
    if (cmd === 'post') return post(x, y, resolve(z));
    throw new Error('commands: auth-url <provider> | exchange <provider> <url|code> | post <platform> <key> <file>');
  };
  run().then((r) => console.log(typeof r === 'string' ? r : JSON.stringify(r, null, 1)))
    .catch((e) => { console.error(`social-post: ${e.message}`); process.exit(1); });
}
