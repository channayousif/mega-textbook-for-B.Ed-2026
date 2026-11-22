// Feature 031: publish an approved update post. The card goes to the public Supabase storage
// bucket `social-cards` (Instagram and Facebook fetch images by URL; no media in git), then each
// platform is posted and recorded. A platform that fails is retried on the next publish; one that
// succeeded is never posted again. The service-role key stays on this server and is never printed.
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { update } from '../media/ledger.mjs';
import { LEDGER, loadLedger, captionFor, altText } from './updates.mjs';
import { postImage } from '../notebook-studio/social-post.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const BUCKET = 'social-cards';

function env() {
  const vars = { ...process.env };
  for (const f of [join(ROOT, '.env.local'), join(homedir(), 'mega_book_for_B.Ed', '.env.local')]) {
    if (!existsSync(f)) continue;
    for (const line of readFileSync(f, 'utf8').split('\n')) {
      const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
      if (m && !vars[m[1]]) vars[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
    break;
  }
  const url = (vars.SUPABASE_URL || vars.DOCUSAURUS_SUPABASE_URL || '').replace(/\/$/, '');
  const key = vars.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL/DOCUSAURUS_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are needed to upload the card');
  return { url, key };
}

/** The public address a card gets in the bucket. */
export const publicUrl = (base, id) => `${base}/storage/v1/object/public/${BUCKET}/${id}.jpg`;

async function uploadCard(file, id) {
  const { url, key } = env();
  const h = { Authorization: `Bearer ${key}`, apikey: key };
  const b = await fetch(`${url}/storage/v1/bucket`, { method: 'POST', headers: { ...h, 'Content-Type': 'application/json' }, body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }) });
  if (!b.ok && b.status !== 409 && !/already exists/i.test(await b.text())) throw new Error(`could not create bucket ${BUCKET}: ${b.status}`);
  const r = await fetch(`${url}/storage/v1/object/${BUCKET}/${id}.jpg`, { method: 'POST', headers: { ...h, 'Content-Type': 'image/jpeg', 'x-upsert': 'true' }, body: readFileSync(file) });
  if (!r.ok) throw new Error(`card upload -> ${r.status} ${(await r.text()).slice(0, 200)}`);
  const pub = publicUrl(url, id);
  const check = await fetch(pub, { method: 'HEAD' });
  if (!check.ok) throw new Error(`card is not public at ${pub} (${check.status})`);
  return pub;
}

export async function publishPost(id, platforms) {
  const p = loadLedger().posts.find((x) => x.id === id);
  if (!p) throw new Error(`no post ${id}`);
  if (p.state !== 'approved' && p.state !== 'posted') throw new Error(`${id} is ${p.state}: only an approved post is published`);
  if (!p.card) throw new Error(`${id} has no card: run render first`);
  const file = p.card.replace(/^~/, homedir());
  const imageUrl = p.card_url ?? await uploadCard(file, id);
  const results = {};
  for (const platform of platforms) {
    if (p.platforms?.[platform]?.state === 'posted') { results[platform] = 'already posted'; continue; }
    try {
      const r = await postImage(platform, { file, imageUrl, caption: captionFor(p, platform), altText: altText(p) });
      results[platform] = r;
    } catch (e) {
      results[platform] = { state: 'failed', error: e.message.slice(0, 300) };
    }
  }
  return update(LEDGER, (L) => {
    const q = L.posts.find((x) => x.id === id);
    q.card_url = imageUrl;
    q.platforms = { ...(q.platforms ?? {}) };
    for (const [k, v] of Object.entries(results)) if (typeof v === 'object') q.platforms[k] = { ...v, at: new Date().toISOString() };
    if (platforms.every((k) => q.platforms[k]?.state === 'posted')) q.state = 'posted';
    return { id, state: q.state, platforms: q.platforms };
  });
}
