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
};

export const NEWS_ICONS = [
  'megaphone', 'gift', 'sparkle', 'info', 'warning', 'calendar', 'success', 'reading', 'translated', 'award', 'clock', 'link',
] as const;

export const DEFAULT_ICON: Record<NewsKind | NewsEventType, string> = {
  news: 'megaphone', offer: 'gift', update: 'info', event: 'calendar', alert: 'warning',
  course: 'sparkle', unit: 'reading', urdu: 'translated', review: 'success',
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

