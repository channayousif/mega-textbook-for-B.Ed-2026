import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import {
  fetchLiveNews, fetchLivePins, buildLanes, groupBursts, laneOf, mergeNews, LANES,
  type Lane, type LaneKey, type TickerItem,
} from '@site/src/lib/news';
import type { NewsEvent, NewsItem } from '@site/src/lib/types';
import styles from './styles.module.css';

type Props = {
  /** `band` spans the landing page; `card` sits inside a dashboard's page body. */
  variant?: 'band' | 'card';
};

/** Visible badge text per kind. Short on purpose: each row is one line. */
function badge(kind: TickerItem['kind']): string {
  switch (kind) {
    case 'course': return translate({ id: 'news.badge.course', message: 'New course' });
    case 'unit': return translate({ id: 'news.badge.unit', message: 'New unit' });
    case 'urdu': return translate({ id: 'news.badge.urdu', message: 'In Urdu' });
    case 'review': return translate({ id: 'news.badge.review', message: 'Reviewed' });
    case 'updated': return translate({ id: 'news.badge.updated', message: 'Updated' });
    case 'figures': return translate({ id: 'news.badge.figures', message: 'New figures' });
    case 'provisional': return translate({ id: 'news.badge.provisional', message: 'Final review pending' });
    case 'offer': return translate({ id: 'news.badge.offer', message: 'Offer' });
    case 'event': return translate({ id: 'news.badge.event', message: 'Event' });
    case 'alert': return translate({ id: 'news.badge.alert', message: 'Notice' });
    case 'update': return translate({ id: 'news.badge.update', message: 'Update' });
    default: return translate({ id: 'news.badge.news', message: 'News' });
  }
}

const LANE_ICON: Record<LaneKey, IconName> = { announcements: 'megaphone', content: 'sparkle', urdu: 'translated' };
function laneLabel(key: LaneKey): string {
  switch (key) {
    case 'announcements': return translate({ id: 'news.lane.announcements', message: 'Announcements' });
    case 'content': return translate({ id: 'news.lane.content', message: 'New content' });
    default: return translate({ id: 'news.lane.urdu', message: 'Urdu & reviews' });
  }
}

const dateFormat = (rtl: boolean) => new Intl.DateTimeFormat(rtl ? 'ur-PK' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'Asia/Karachi' });

function ItemBody({ item, dateFmt }: { item: TickerItem; dateFmt: Intl.DateTimeFormat }): React.ReactElement {
  const count = item.kind === 'figures' && !item.children && item.count ? ` (${item.count})` : '';
  return (
    <>
      {item.pinned && <span className={styles.pinMark} title={translate({ id: 'news.pinned', message: 'Pinned' })}><Icon name="pin" size={14} accent={false} /></span>}
      <span className={clsx(styles.chip, styles[`k_${item.kind}`])}>
        <Icon name={item.icon as IconName} size={16} accent={false} />
      </span>
      <span className={styles.badge}>{badge(item.kind)}</span>
      {item.context && <span className={styles.context}>{item.context}</span>}
      <span className={styles.title}>{item.title}{count}</span>
      <time className={styles.date} dateTime={item.date}>{dateFmt.format(new Date(item.date))}</time>
    </>
  );
}

function ItemLink({ item, dateFmt, tabIndex, className }: { item: TickerItem; dateFmt: Intl.DateTimeFormat; tabIndex?: number; className?: string }): React.ReactElement {
  const body = <ItemBody item={item} dateFmt={dateFmt} />;
  return item.href
    ? <Link to={item.href} className={clsx(styles.link, className)} tabIndex={tabIndex}>{body}</Link>
    : <span className={clsx(styles.link, className)}>{body}</span>;
}

/** One item in the bar, standing still: the admin form's live preview. */
export function NewsPreview({ item, rtl = false }: { item: TickerItem; rtl?: boolean }): React.ReactElement {
  const lane = laneOf(item.kind);
  return (
    <div className={clsx(styles.bar, styles.card)} dir={rtl ? 'rtl' : 'ltr'}>
      <div className={styles.inner}>
        <div className={styles.rows}>
          <div className={styles.row}>
            <span className={styles.label}><Icon name={LANE_ICON[lane]} size={18} /><span>{laneLabel(lane)}</span></span>
            <ItemLink item={item} dateFmt={dateFormat(rtl)} className={item.pinned ? styles.pinned : undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** One row's moving list. Each half of the track must be wider than the row, so short lists repeat. */
function Marquee({ items, rtl, paused, dateFmt }: { items: TickerItem[]; rtl: boolean; paused: boolean; dateFmt: Intl.DateTimeFormat }): React.ReactElement {
  const loop: TickerItem[] = [];
  while (loop.length < Math.max(6, items.length)) loop.push(...items);
  const set = (hidden: boolean) => (
    <ul className={styles.set} aria-hidden={hidden || undefined}>
      {loop.map((item, i) => {
        const exposed = !hidden && i < items.length;
        return (
          <li key={`${item.id}-${i}`} className={styles.item} aria-hidden={!hidden && !exposed ? true : undefined}>
            <ItemLink item={item} dateFmt={dateFmt} tabIndex={exposed ? undefined : -1} />
          </li>
        );
      })}
    </ul>
  );
  return (
    <div className={clsx(styles.marquee, paused && styles.paused)}>
      <div className={clsx(styles.track, rtl && styles.rtl)} style={{ '--ticker-duration': `${loop.length * 6}s` } as React.CSSProperties}>
        {set(false)}{set(true)}
      </div>
    </div>
  );
}

function PanelItem({ item, dateFmt }: { item: TickerItem; dateFmt: Intl.DateTimeFormat }): React.ReactElement {
  if (!item.children) return <li className={styles.panelItem}><ItemLink item={item} dateFmt={dateFmt} /></li>;
  return (
    <li className={styles.panelItem}>
      <details className={styles.group}>
        <summary><ItemBody item={item} dateFmt={dateFmt} /></summary>
        <ul className={styles.children}>
          {item.children.map((c) => <li key={c.id}><ItemLink item={c} dateFmt={dateFmt} /></li>)}
        </ul>
      </details>
    </li>
  );
}

/**
 * The full list under the bar: pinned items first, then each row's items, bursts expandable.
 * It loads the whole 60-day feed (`/news-feed.json`) on first open; until then it shows what the
 * bar already has.
 */
function NewsPanel({ id, manual, prerendered, pins, locale, onClose }: {
  id: string; manual: NewsItem[]; prerendered: NewsEvent[]; pins: ReadonlySet<string>; locale: string; onClose: () => void;
}): React.ReactElement {
  const rtl = locale === 'ur';
  const feedUrl = useBaseUrl('/news-feed.json');
  const [events, setEvents] = useState<NewsEvent[]>(prerendered);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctl = new AbortController();
    fetch(feedUrl, { signal: ctl.signal }).then((r) => (r.ok ? r.json() : null))
      .then((f) => { if (f?.events?.length) setEvents(f.events as NewsEvent[]); })
      .catch(() => { /* offline: the prerendered events stay */ });
    ref.current?.focus();
    return () => ctl.abort();
  }, [feedUrl]);
  const dateFmt = useMemo(() => dateFormat(rtl), [rtl]);
  const all = useMemo(() => mergeNews(manual, events, locale, Number.MAX_SAFE_INTEGER)
    .map((it) => (it.source === 'auto' && pins.has(it.id) ? { ...it, pinned: true } : it)), [manual, events, pins, locale]);
  const pinned = all.filter((it) => it.pinned);
  const sections = LANES.map((key) => ({ key, items: groupBursts(all.filter((it) => !it.pinned && laneOf(it.kind) === key), locale)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)) })).filter((s) => s.items.length);
  return (
    <div id={id} ref={ref} tabIndex={-1} className={styles.panel} role="region"
      aria-label={translate({ id: 'news.panel', message: 'All news and new content' })}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
      <div className={styles.panelHead}>
        <strong>{translate({ id: 'news.panel.title', message: 'All news, last 60 days' })}</strong>
        <button type="button" className={styles.pause} onClick={onClose}>{translate({ id: 'news.close', message: 'Close' })}</button>
      </div>
      {pinned.length > 0 && (
        <section className={styles.panelSection}>
          <h3><Icon name="pin" size={16} accent={false} /> {translate({ id: 'news.pinned', message: 'Pinned' })}</h3>
          <ul>{pinned.map((it) => <PanelItem key={it.id} item={it} dateFmt={dateFmt} />)}</ul>
        </section>
      )}
      {sections.map((s) => (
        <section key={s.key} className={styles.panelSection}>
          <h3><Icon name={LANE_ICON[s.key]} size={16} accent={false} /> {laneLabel(s.key)}</h3>
          <ul>{s.items.map((it) => <PanelItem key={it.id} item={it} dateFmt={dateFmt} />)}</ul>
        </section>
      ))}
    </div>
  );
}

/**
 * Feature 028: the news ticker, up to three rows (announcements, new content, Urdu and reviews),
 * each scrolling on its own (owner, 2026-11-17). Automatic events arrive prerendered through
 * customFields.newsFeed; admin items and admin pins are fetched after mount, so the bar shows
 * without JavaScript. Bursts of one kind for one course are grouped; pinned items stand still at
 * the front of their row. "View all", a row label or empty bar space opens the full list.
 *
 * Motion follows LogoCarousel: WCAG 2.2.2 needs a way to stop it, so rows pause on hover and focus
 * and there is one Pause button; with reduced motion each row stands still and scrolls by hand.
 * Dates are in Pakistan time so the prerendered HTML and the hydrated page agree.
 */
export default function NewsTicker({ variant = 'band' }: Props): React.ReactElement | null {
  const { siteConfig, i18n } = useDocusaurusContext();
  const fields = siteConfig.customFields as { newsFeed?: NewsEvent[]; supabaseUrl?: string; supabaseAnonKey?: string };
  const locale = i18n.currentLocale;
  const rtl = locale === 'ur';
  const [manual, setManual] = useState<NewsItem[]>([]);
  const [pins, setPins] = useState<ReadonlySet<string>>(new Set());
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const viewAll = useRef<HTMLButtonElement>(null);
  const panelId = `news-panel-${variant}`;

  useEffect(() => {
    const ctl = new AbortController();
    const url = fields.supabaseUrl ?? '';
    const key = fields.supabaseAnonKey ?? '';
    fetchLiveNews(url, key, ctl.signal).then(setManual).catch(() => { /* automatic items still show */ });
    fetchLivePins(url, key, ctl.signal).then(setPins).catch(() => { /* unpinned is fine */ });
    return () => ctl.abort();
  }, [fields.supabaseUrl, fields.supabaseAnonKey]);

  const lanes: Lane[] = useMemo(() => buildLanes(manual, fields.newsFeed ?? [], pins, locale), [manual, fields.newsFeed, pins, locale]);
  const dateFmt = useMemo(() => dateFormat(rtl), [rtl]);
  const close = useCallback(() => { setOpen(false); viewAll.current?.focus(); }, []);
  if (lanes.length === 0) return null;
  const toggle = () => setOpen((o) => !o);

  return (
    <section className={clsx(styles.bar, styles[variant], 'print-hidden')}
      aria-label={translate({ id: 'news.region', message: 'Latest news and new content' })} dir={rtl ? 'rtl' : 'ltr'}>
      <div className={styles.inner}>
        <div className={styles.rows} onClick={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains(styles.row)) toggle(); }}>
          {lanes.map((lane) => (
            <div key={lane.key} className={styles.row} data-lane={lane.key}>
              <button type="button" className={styles.label} onClick={toggle} aria-expanded={open} aria-controls={panelId} aria-label={laneLabel(lane.key)}>
                <Icon name={LANE_ICON[lane.key]} size={18} />
                <span>{laneLabel(lane.key)}</span>
              </button>
              {lane.pinned.map((item) => (
                <ItemLink key={item.id} item={item} dateFmt={dateFmt} className={styles.pinned} />
              ))}
              {lane.scrolling.length > 0 && <Marquee items={lane.scrolling} rtl={rtl} paused={paused} dateFmt={dateFmt} />}
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <button type="button" className={styles.pause} aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused ? translate({ id: 'news.play', message: 'Play' }) : translate({ id: 'news.pause', message: 'Pause' })}
          </button>
          <button type="button" ref={viewAll} className={clsx(styles.pause, styles.viewAll)} aria-expanded={open} aria-controls={panelId} onClick={toggle}>
            {translate({ id: 'news.viewAll', message: 'View all' })}
          </button>
        </div>
      </div>
      {open && <NewsPanel id={panelId} manual={manual} prerendered={fields.newsFeed ?? []} pins={pins} locale={locale} onClose={close} />}
    </section>
  );
}
