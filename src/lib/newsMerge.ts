import type { NewsEvent, NewsEventType, NewsItem, NewsKind } from './types';

/**
 * Feature 028 - the pure half of the ticker data: merging admin items with
 * automatic events, and the admin console's status labels. Kept free of
 * `@site/...` imports so the unit tests can load it directly.
 */

/** One row the ticker renders, whichever source it came from. */
export type TickerItem = {
  id: string;
  source: 'manual' | 'auto';
  kind: NewsKind | NewsEventType;
  icon: string;
  title: string;
  /** Course code or course title shown before the title, for content events. */
  context: string | null;
  href: string | null;
  date: string;
  pinned: boolean;
  /** `figures`: how many new figures; a burst group: how many events it holds. */
  count?: number;
  /** A burst group's members, newest first, for the "View all" panel. */
  children?: TickerItem[];
};

export const NEWS_ICONS = [
  'megaphone', 'gift', 'sparkle', 'info', 'warning', 'calendar', 'success', 'reading', 'translated', 'award', 'clock', 'link',
] as const;

export const DEFAULT_ICON: Record<NewsKind | NewsEventType, string> = {
  news: 'megaphone', offer: 'gift', update: 'info', event: 'calendar', alert: 'warning',
  course: 'sparkle', unit: 'reading', urdu: 'translated', review: 'success',
  updated: 'edit', figures: 'figures', provisional: 'clock',
};

export const MAX_TICKER_ITEMS = 12;

/**
 * Merge both sources: pinned manual items first, then everything newest first,
 * capped. Urdu falls back to the English title when no Urdu one was written.
 */
export function mergeNews(manual: NewsItem[], auto: NewsEvent[], locale: string, max = MAX_TICKER_ITEMS): TickerItem[] {
  const ur = locale === 'ur';
  const fromManual: TickerItem[] = manual.map((n) => ({
    id: `news:${n.id}`,
    source: 'manual',
    kind: n.kind,
    icon: n.icon || DEFAULT_ICON[n.kind],
    title: (ur && n.title_ur) || n.title_en,
    context: null,
    href: n.link_url,
    date: n.starts_at,
    pinned: n.pinned,
  }));
  const fromAuto: TickerItem[] = auto.map((e) => ({
    id: e.id,
    source: 'auto',
    kind: e.type,
    icon: DEFAULT_ICON[e.type],
    title: (ur && e.title_ur) || e.title_en,
    context: e.type === 'course' ? null : e.course_code,
    href: e.permalink,
    date: e.date,
    pinned: false,
    ...(e.count ? { count: e.count } : {}),
  }));
  return [...fromManual, ...fromAuto]
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || Date.parse(b.date) - Date.parse(a.date))
    .slice(0, max);
}

/** Admin console status for one item, as of `now`. */
export type NewsStatus = 'live' | 'scheduled' | 'draft' | 'expired' | 'archived';
export function newsStatus(n: NewsItem, now = new Date()): NewsStatus {
  if (n.archived_at) return 'archived';
  if (!n.published) return 'draft';
  if (Date.parse(n.starts_at) > now.getTime()) return 'scheduled';
  if (n.ends_at && Date.parse(n.ends_at) <= now.getTime()) return 'expired';
  return 'live';
}


// ---------------------------------------------------------------------------------------------
// Three rows (owner, 2026-11-17): announcements, new content, Urdu and reviews. Bursts of the
// same kind for one course are grouped; pinned items stand still at the front of their row.

export type LaneKey = 'announcements' | 'content' | 'urdu';
export const LANES: readonly LaneKey[] = ['announcements', 'content', 'urdu'];
export type Lane = { key: LaneKey; pinned: TickerItem[]; scrolling: TickerItem[] };

export const MAX_PINNED_PER_LANE = 2;
export const MAX_LANE_ITEMS = 10;
const BURST_DAYS = 7;

export function laneOf(kind: TickerItem['kind']): LaneKey {
  if (kind === 'course' || kind === 'unit' || kind === 'updated' || kind === 'figures') return 'content';
  if (kind === 'urdu' || kind === 'review' || kind === 'provisional') return 'urdu';
  return 'announcements';
}

/** The burst group's title, in the reader's language. */
export function burstTitle(kind: TickerItem['kind'], n: number, ur: boolean): string {
  const fig = n;
  switch (kind) {
    case 'unit': return ur ? `${n} نئے یونٹ` : `${n} new units`;
    case 'urdu': return ur ? `${n} یونٹ اردو میں` : `${n} units in Urdu`;
    case 'updated': return ur ? `${n} یونٹ اپ ڈیٹ ہوئے` : `${n} units updated`;
    case 'figures': return ur ? `${fig} نئی تصاویر اور خاکے` : `${fig} new illustrations and figures`;
    case 'review': return ur ? `${n} یونٹوں کی نظرثانی مکمل` : `${n} units reviewed`;
    case 'provisional': return ur ? `${n} یونٹ حتمی نظرثانی کے منتظر` : `${n} units awaiting final review`;
    default: return ur ? `${n} نئی خبریں` : `${n} updates`;
  }
}

const courseRoot = (href: string | null): string | null => (href ? href.replace(/\/unit-\d+\/?$/, '/') : null);

/**
 * Merge automatic items of the same kind and course that fall within a week of the newest one
 * into one item ("EFPG-401: 4 new units"). Admin items, pinned items and single items stay as
 * they are. A `figures` group counts figures, not units.
 */
export function groupBursts(items: TickerItem[], locale: string): TickerItem[] {
  const ur = locale === 'ur';
  const out: TickerItem[] = [];
  const buckets = new Map<string, TickerItem[]>();
  for (const it of items) {
    if (it.source !== 'auto' || it.pinned || it.kind === 'course' || !it.context) { out.push(it); continue; }
    const k = `${it.kind}|${it.context}`;
    buckets.set(k, [...(buckets.get(k) ?? []), it]);
  }
  for (const group of buckets.values()) {
    const sorted = [...group].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    const newest = Date.parse(sorted[0].date);
    const burst = sorted.filter((it) => newest - Date.parse(it.date) <= BURST_DAYS * 86_400_000);
    const rest = sorted.filter((it) => !burst.includes(it));
    out.push(...rest);
    if (burst.length < 2) { out.push(...burst); continue; }
    const first = burst[0];
    const n = first.kind === 'figures' ? burst.reduce((t, it) => t + (it.count ?? 1), 0) : burst.length;
    out.push({
      ...first,
      id: `group:${first.kind}:${first.context}:${first.date.slice(0, 10)}`,
      title: burstTitle(first.kind, n, ur),
      href: courseRoot(first.href),
      count: n,
      children: burst,
    });
  }
  return out;
}

/**
 * The ticker's rows: up to three lanes, empty ones left out. `pins` holds the ids of pinned
 * automatic events (public.news_pins); admin items carry their own `pinned`. At most two pinned
 * items stand still per row; further pins lead the scrolling list. Each row scrolls its newest ten.
 */
export function buildLanes(manual: NewsItem[], auto: NewsEvent[], pins: ReadonlySet<string>, locale: string): Lane[] {
  const all = mergeNews(manual, auto, locale, Number.MAX_SAFE_INTEGER)
    .map((it) => (it.source === 'auto' && pins.has(it.id) ? { ...it, pinned: true } : it));
  const newestFirst = (a: TickerItem, b: TickerItem) => Date.parse(b.date) - Date.parse(a.date);
  return LANES.map((key) => {
    const inLane = groupBursts(all.filter((it) => laneOf(it.kind) === key), locale);
    const pinnedAll = inLane.filter((it) => it.pinned).sort(newestFirst);
    const pinned = pinnedAll.slice(0, MAX_PINNED_PER_LANE);
    const scrolling = [...pinnedAll.slice(MAX_PINNED_PER_LANE), ...inLane.filter((it) => !it.pinned).sort(newestFirst)].slice(0, MAX_LANE_ITEMS);
    return { key, pinned, scrolling };
  }).filter((l) => l.pinned.length + l.scrolling.length > 0);
}
