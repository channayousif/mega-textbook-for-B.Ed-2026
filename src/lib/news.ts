import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { DigestRun, NewsItem, NewsKind } from '@site/src/lib/types';
import { MAX_TICKER_ITEMS } from '@site/src/lib/newsMerge';

export * from '@site/src/lib/newsMerge';

/**
 * Feature 028 - news ticker data.
 *
 * Two sources merge into one list. Automatic content events are prerendered from
 * `customFields.newsFeed` (scripts/build-news-feed.mjs); admin-written items live in
 * `public.news_items` and are fetched after mount. Authorization is RLS plus the
 * admin-checked RPCs in migration 0052; nothing here is a security boundary.
 */

const LIVE_COLUMNS = 'id,kind,title_en,title_ur,link_url,icon,pinned,starts_at,ends_at';

/**
 * Live items for the public ticker. A plain PostgREST call with the anon key rather
 * than the supabase-js client: the ticker runs on the landing page for visitors who
 * are not signed in, and RLS (news_items_public_read) already limits rows to live ones.
 */
export async function fetchLiveNews(supabaseUrl: string, anonKey: string, signal?: AbortSignal): Promise<NewsItem[]> {
  if (!supabaseUrl || !anonKey) return [];
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/news_items?select=${LIVE_COLUMNS}&order=pinned.desc,starts_at.desc&limit=${MAX_TICKER_ITEMS}`;
  const res = await fetch(url, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` }, signal });
  if (!res.ok) return [];
  return (await res.json()) as NewsItem[];
}

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

/** Admin: every item, including drafts, scheduled, expired and archived (news_items_admin_read). */
export async function fetchAllNews(): Promise<Result<NewsItem[]>> {
  const supabase = await client();
  const { data, error } = await supabase.from('news_items').select('*')
    .order('archived_at', { ascending: true, nullsFirst: true })
    .order('starts_at', { ascending: false });
  return { data: (data as NewsItem[]) ?? null, error };
}

export type NewsInput = {
  id: string | null;
  kind: NewsKind;
  title_en: string;
  title_ur: string;
  link_url: string;
  icon: string;
  pinned: boolean;
  published: boolean;
  starts_at: string | null;
  ends_at: string | null;
};

/** Admin: create (id null) or update an item through the audited RPC. */
export async function saveNewsItem(input: NewsInput): Promise<Result<NewsItem>> {
  const supabase = await client();
  const { data, error } = await supabase.rpc('upsert_news_item', {
    p_id: input.id, p_kind: input.kind, p_title_en: input.title_en, p_title_ur: input.title_ur || null,
    p_link_url: input.link_url || null, p_icon: input.icon, p_pinned: input.pinned, p_published: input.published,
    p_starts_at: input.starts_at, p_ends_at: input.ends_at,
  });
  return { data: (data as NewsItem) ?? null, error };
}

export async function archiveNewsItem(id: string): Promise<Result<null>> {
  const supabase = await client();
  const { error } = await supabase.rpc('archive_news_item', { p_id: id });
  return { data: null, error };
}

/** Admin: the last weekly digest runs (digest_runs_admin_read). */
export async function fetchDigestRuns(limit = 8): Promise<Result<DigestRun[]>> {
  const supabase = await client();
  const { data, error } = await supabase.from('digest_runs').select('*').order('started_at', { ascending: false }).limit(limit);
  return { data: (data as DigestRun[]) ?? null, error };
}

/** Admin: preview this week's email (HTML) or send a test to the calling admin. */
export async function callDigest(mode: 'preview' | 'test'): Promise<Result<{ html?: string; sent?: boolean; items?: number }>> {
  const supabase = await client();
  const { data, error } = await supabase.functions.invoke(`weekly-digest?mode=${mode}`, { method: 'POST' });
  return { data: data ?? null, error };
}

/** Signed-in user: turn the weekly email on or off. */
export async function setDigestOptOut(optOut: boolean): Promise<Result<null>> {
  const supabase = await client();
  const { error } = await supabase.rpc('set_digest_preference', { p_opt_out: optOut });
  return { data: null, error };
}
