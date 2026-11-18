import React, { useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import { fetchLiveNews, mergeNews, type TickerItem } from '@site/src/lib/news';
import type { NewsEvent, NewsItem } from '@site/src/lib/types';
import styles from './styles.module.css';

type Props = {
  /** `band` spans the landing page; `card` sits inside a dashboard's page body. */
  variant?: 'band' | 'card';
};

/** Visible badge text per kind. Short on purpose: the bar is one line. */
function badge(kind: TickerItem['kind']): string {
  switch (kind) {
    case 'course': return translate({ id: 'news.badge.course', message: 'New course' });
    case 'unit': return translate({ id: 'news.badge.unit', message: 'New unit' });
    case 'urdu': return translate({ id: 'news.badge.urdu', message: 'In Urdu' });
    case 'review': return translate({ id: 'news.badge.review', message: 'Reviewed' });
    case 'offer': return translate({ id: 'news.badge.offer', message: 'Offer' });
    case 'event': return translate({ id: 'news.badge.event', message: 'Event' });
    case 'alert': return translate({ id: 'news.badge.alert', message: 'Notice' });
    case 'update': return translate({ id: 'news.badge.update', message: 'Update' });
    default: return translate({ id: 'news.badge.news', message: 'News' });
  }
}

function ItemBody({ item, dateFmt }: { item: TickerItem; dateFmt: Intl.DateTimeFormat }): React.ReactElement {
  return (
    <>
      <span className={clsx(styles.chip, styles[`k_${item.kind}`])}>
        <Icon name={item.icon as IconName} size={16} accent={false} />
      </span>
      <span className={styles.badge}>{badge(item.kind)}</span>
      {item.context && <span className={styles.context}>{item.context}</span>}
      <span className={styles.title}>{item.title}</span>
      <time className={styles.date} dateTime={item.date}>{dateFmt.format(new Date(item.date))}</time>
    </>
  );
}

/** One item in the bar, standing still: the admin form's live preview. */
export function NewsPreview({ item, rtl = false }: { item: TickerItem; rtl?: boolean }): React.ReactElement {
  const dateFmt = new Intl.DateTimeFormat(rtl ? 'ur-PK' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'Asia/Karachi' });
  return (
    <div className={clsx(styles.bar, styles.card)} dir={rtl ? 'rtl' : 'ltr'}>
      <div className={styles.inner}>
        <span className={styles.label}><Icon name="megaphone" size={18} /><span>{translate({ id: 'news.label', message: 'Latest' })}</span></span>
        <span className={styles.link}><ItemBody item={item} dateFmt={dateFmt} /></span>
      </div>
    </div>
  );
}

/**
 * Feature 028: the "Latest" news ticker. Automatic content events arrive
 * prerendered through customFields.newsFeed; admin-written items are fetched after
 * mount and merged in, so the bar shows without JavaScript and never shifts layout
 * when the live items land (it only grows its list, not its height).
 *
 * Motion follows LogoCarousel: WCAG 2.2.2 needs a way to stop it, so it pauses on
 * hover and focus and has a button, and it stands still as a wrapped row for readers
 * who ask for reduced motion. Dates are formatted in Pakistan time so the prerendered
 * HTML and the hydrated page agree.
 */
export default function NewsTicker({ variant = 'band' }: Props): React.ReactElement | null {
  const { siteConfig, i18n } = useDocusaurusContext();
  const fields = siteConfig.customFields as {
    newsFeed?: NewsEvent[]; supabaseUrl?: string; supabaseAnonKey?: string;
  };
  const locale = i18n.currentLocale;
  const rtl = locale === 'ur';
  const [manual, setManual] = useState<NewsItem[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const ctl = new AbortController();
    fetchLiveNews(fields.supabaseUrl ?? '', fields.supabaseAnonKey ?? '', ctl.signal)
      .then(setManual)
      .catch(() => { /* offline or not configured: automatic items still show */ });
    return () => ctl.abort();
  }, [fields.supabaseUrl, fields.supabaseAnonKey]);

  const items = useMemo(() => mergeNews(manual, fields.newsFeed ?? [], locale), [manual, fields.newsFeed, locale]);
  const dateFmt = useMemo(
    () => new Intl.DateTimeFormat(rtl ? 'ur-PK' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'Asia/Karachi' }),
    [rtl],
  );
  if (items.length === 0) return null;

  // Each half of the track must be wider than the bar or a gap shows at the end of
  // the loop, so a short list is repeated until a half holds at least eight items.
  const loop: TickerItem[] = [];
  while (loop.length < Math.max(8, items.length)) loop.push(...items);
  const label = translate({ id: 'news.label', message: 'Latest' });

  const set = (hidden: boolean) => (
    <ul className={styles.set} aria-hidden={hidden || undefined}>
      {loop.map((item, i) => {
        const exposed = !hidden && i < items.length;
        const body = <ItemBody item={item} dateFmt={dateFmt} />;
        return (
          <li key={`${item.id}-${i}`} className={styles.item} aria-hidden={!hidden && !exposed ? true : undefined}>
            {item.href ? (
              <Link to={item.href} className={styles.link} tabIndex={exposed ? undefined : -1}>{body}</Link>
            ) : (
              <span className={styles.link}>{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <section
      className={clsx(styles.bar, styles[variant], 'print-hidden')}
      aria-label={translate({ id: 'news.region', message: 'Latest news and new content' })}
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className={styles.inner}>
        <span className={styles.label}>
          <Icon name="megaphone" size={18} />
          <span>{label}</span>
        </span>
        <div className={clsx(styles.marquee, paused && styles.paused)}>
          <div
            className={clsx(styles.track, rtl && styles.rtl)}
            style={{ '--ticker-duration': `${loop.length * 6}s` } as React.CSSProperties}
          >
            {set(false)}{set(true)}
          </div>
        </div>
        <button
          type="button"
          className={styles.pause}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused
            ? translate({ id: 'news.play', message: 'Play' })
            : translate({ id: 'news.pause', message: 'Pause' })}
        </button>
      </div>
    </section>
  );
}
