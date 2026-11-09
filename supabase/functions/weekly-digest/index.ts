// weekly-digest - Feature 028. The weekly bilingual "new content" email.
//
// Three modes, all POST:
//   (default) send   cron only: header `x-cron-secret` must equal DIGEST_CRON_SECRET.
//                    Claims this ISO week in digest_runs first, so a repeat call in the
//                    same week is a no-op and nobody is emailed twice.
//   ?mode=preview    an active admin's own token: returns this week's HTML, sends nothing.
//   ?mode=test       an active admin's own token: sends this week's email to that admin only.
//
// Content: the automatic events of the last 7 days from the live site's static feed
// (static/news-feed.json, built from git history on each deploy) plus admin news that
// went live in the same window. A week with nothing new sends nothing.
//
// Recipients: active, non-deleted profiles that have not opted out, with a confirmed
// email on their auth identity. Each email carries a signed one-click unsubscribe.

import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { bearerToken, isActiveAdmin, resolveCaller, serviceClient } from '../_shared/adminAuth.ts';
import { isoWeek, renderDigest, type DigestEvent, type DigestNews } from '../_shared/digestEmail.ts';
import { signUnsubscribe } from '../_shared/digestToken.ts';

const WINDOW_MS = 7 * 86_400_000;
const BATCH = 100; // Resend's batch endpoint limit

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

function env(name: string, fallback = ''): string {
  return Deno.env.get(name) ?? fallback;
}

function safeEqual(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function gatherContent(service: SupabaseClient, now: Date): Promise<{ events: DigestEvent[]; news: DigestNews[] }> {
  const since = now.getTime() - WINDOW_MS;
  const site = env('SITE_URL', 'https://textbook.com.pk').replace(/\/$/, '');
  let events: DigestEvent[] = [];
  const res = await fetch(`${site}/news-feed.json?t=${now.getTime()}`);
  if (res.ok) {
    const feed = await res.json() as { events?: DigestEvent[] };
    events = (feed.events ?? []).filter((e) => Date.parse(e.date) >= since && Date.parse(e.date) <= now.getTime());
  }
  const { data } = await service.from('news_items')
    .select('id,kind,title_en,title_ur,link_url,starts_at,ends_at')
    .eq('published', true).is('archived_at', null)
    .gte('starts_at', new Date(since).toISOString()).lte('starts_at', now.toISOString())
    .order('pinned', { ascending: false }).order('starts_at', { ascending: false });
  const news = ((data ?? []) as (DigestNews & { ends_at: string | null })[])
    .filter((n) => !n.ends_at || Date.parse(n.ends_at) > now.getTime());
  return { events, news };
}

async function compose(content: { events: DigestEvent[]; news: DigestNews[] }, profileId: string, now: Date) {
  const site = env('SITE_URL', 'https://textbook.com.pk').replace(/\/$/, '');
  const token = await signUnsubscribe(env('DIGEST_TOKEN_SECRET'), profileId);
  // Trailing slash before the query string: trailingSlash builds 301 `/app/unsubscribe`
  // and drop the query (see guest-feedback-submit's confirmation link).
  const unsubscribeUrl = `${site}/app/unsubscribe/?token=${encodeURIComponent(token)}`;
  const oneClickUrl = `${env('DIGEST_PUBLIC_FUNCTIONS_URL', 'https://api.textbook.com.pk/functions/v1').replace(/\/$/, '')}/digest-unsubscribe?token=${encodeURIComponent(token)}`;
  const email = renderDigest({
    ...content, siteUrl: site, weekLabel: isoWeek(pkt(now)), unsubscribeUrl, profileUrl: `${site}/app/profile/`,
  });
  return email && { ...email, oneClickUrl };
}

/** Pakistan time has no DST: shifting by +5h gives the local calendar date. */
function pkt(d: Date): Date {
  return new Date(d.getTime() + 5 * 3_600_000);
}

type Outgoing = { to: string; subject: string; html: string; text: string; oneClickUrl: string };

async function sendBatch(batch: Outgoing[]): Promise<boolean> {
  const from = env('RESEND_FROM_EMAIL');
  const res = await fetch('https://api.resend.com/emails/batch', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(batch.map((m) => ({
      from: `textbook.com.pk <${from}>`,
      to: [m.to],
      subject: m.subject,
      html: m.html,
      text: m.text,
      headers: { 'List-Unsubscribe': `<${m.oneClickUrl}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
    }))),
  });
  return res.ok;
}

/** Active, opted-in profiles with a confirmed email, capped at DIGEST_MAX_RECIPIENTS. */
async function recipients(service: SupabaseClient): Promise<{ profileId: string; email: string }[]> {
  const { data: profiles, error } = await service.from('profiles')
    .select('id, auth_user_id')
    .eq('status', 'active').is('deleted_at', null).eq('digest_opt_out', false).not('auth_user_id', 'is', null);
  if (error) throw new Error(`profiles: ${error.message}`);
  const wanted = new Map((profiles ?? []).map((p: { id: string; auth_user_id: string }) => [p.auth_user_id, p.id]));
  const out: { profileId: string; email: string }[] = [];
  for (let page = 1; wanted.size > 0; page++) {
    const { data, error: e } = await service.auth.admin.listUsers({ page, perPage: 1000 });
    if (e) throw new Error(`auth users: ${e.message}`);
    for (const u of data.users) {
      const profileId = wanted.get(u.id);
      if (profileId && u.email && u.email_confirmed_at) out.push({ profileId, email: u.email });
    }
    if (data.users.length < 1000) break;
  }
  const cap = Number(env('DIGEST_MAX_RECIPIENTS', '500')) || 500;
  return out.slice(0, cap);
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);
  const mode = new URL(req.url).searchParams.get('mode') ?? 'send';
  if (!['send', 'preview', 'test'].includes(mode)) return json({ error: 'unknown mode' }, 400);
  if (!env('DIGEST_TOKEN_SECRET')) return json({ error: 'digest not configured' }, 503);

  const service = serviceClient();
  const now = new Date();

  if (mode !== 'send') {
    const jwt = bearerToken(req);
    const caller = jwt ? await resolveCaller(service, jwt) : null;
    if (!isActiveAdmin(caller)) return json({ error: 'admin required' }, 403);
    const content = await gatherContent(service, now);
    const email = await compose(content, caller!.id, now);
    const items = content.events.length + content.news.length;
    if (mode === 'preview') return json({ html: email?.html ?? null, items });
    if (!email) return json({ sent: false, items });
    const { data: user } = await service.auth.admin.getUserById(caller!.auth_user_id);
    if (!user.user?.email) return json({ error: 'your account has no email address' }, 400);
    const ok = await sendBatch([{ to: user.user.email, ...email, subject: `[Test] ${email.subject}` }]);
    return ok ? json({ sent: true, items }) : json({ error: 'the email provider refused the test' }, 502);
  }

  if (!safeEqual(req.headers.get('x-cron-secret') ?? '', env('DIGEST_CRON_SECRET'))) {
    return json({ error: 'unauthorized' }, 401);
  }

  const week = isoWeek(pkt(now));
  const { error: claimError } = await service.from('digest_runs').insert({ iso_week: week });
  if (claimError) {
    if (claimError.code === '23505') return json({ status: 'already_ran', week });
    return json({ error: `claim failed: ${claimError.message}` }, 500);
  }

  const finish = (patch: Record<string, unknown>) =>
    service.from('digest_runs').update({ ...patch, finished_at: new Date().toISOString() }).eq('iso_week', week);

  try {
    const content = await gatherContent(service, now);
    const items = content.events.length + content.news.length;
    if (items === 0) {
      await finish({ status: 'skipped', items: 0 });
      return json({ status: 'skipped', week });
    }
    const people = await recipients(service);
    let sent = 0;
    let failed = 0;
    for (let i = 0; i < people.length; i += BATCH) {
      const slice = people.slice(i, i + BATCH);
      const outgoing: Outgoing[] = [];
      for (const p of slice) {
        const email = await compose(content, p.profileId, now);
        if (email) outgoing.push({ to: p.email, ...email });
      }
      if (await sendBatch(outgoing)) sent += outgoing.length; else failed += outgoing.length;
    }
    const status = sent === 0 && people.length > 0 ? 'failed' : 'sent';
    await finish({ status, items, recipients: people.length, sent, failed, error: failed ? `${failed} emails refused by the provider` : null });
    return json({ status, week, items, recipients: people.length, sent, failed });
  } catch (e) {
    await finish({ status: 'failed', error: String((e as Error).message ?? e).slice(0, 500) });
    return json({ error: 'digest failed', week }, 500);
  }
});
