/**
 * "Courses in 30 seconds" under the landing hero (owner, 2026-11-22): the two most watched public
 * course teasers and the two newest, picked at build time (build-studio-index.mjs pickHomeTeasers).
 * Each card reuses the Feature 030 facade player, so the page makes no YouTube request until a tap
 * and the 9:16 frame never shifts. Teasers are Urdu (D-2026-0083); English pages say so.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TeaserPlayer from '@site/src/components/Studio/TeaserPlayer';
import { trackEvent } from '@site/src/lib/analytics';
import s from './landing.module.css';

export type HomeTeaser = { code: string; youtube_id: string; title: string; locale: string; semester: number; reason: 'top' | 'latest' };
type Locale = 'en' | 'ur';
type Copy = { e_teasers: string; h_teasers: string; teaser_top: string; teaser_new: string; teaser_urdu: string; teaser_open: string };

export default function HomeTeasers({ c, locale, titles }: { c: Copy; locale: Locale; titles: Record<string, { en: string; ur?: string }> }): React.ReactElement | null {
  const { siteConfig } = useDocusaurusContext();
  const picks = (siteConfig.customFields?.homeTeasers ?? []) as HomeTeaser[];
  if (!picks.length) return null;
  return (
    <section className={s.teasers} id="teasers" aria-labelledby="teasers-h" data-testid="home-teasers">
      <div className={s.wrap}>
        <p className={s.eye}>{c.e_teasers}</p>
        <h2 className={s.h2} id="teasers-h">{c.h_teasers}</h2>
        <ul className={s.teaserRow}>
          {picks.map((t) => {
            const title = (locale === 'ur' && titles[t.code]?.ur) || titles[t.code]?.en || t.code;
            return (
              <li key={t.code} className={s.teaserCard} onClickCapture={() => trackEvent('landing_click', { what: `teaser-${t.code}` })}>
                <span className={s.teaserBadge}>{t.reason === 'top' ? c.teaser_top : c.teaser_new}</span>
                <TeaserPlayer teaser={{ youtube_id: t.youtube_id, title: t.title, locale: t.locale }} locale={locale} />
                <p className={s.teaserTitle}><bdi className={s.teaserCode}>{t.code}</bdi>{title}</p>
                <Link className={s.teaserLink} to={`/semester-${t.semester}/${t.code.toLowerCase()}/course-overview/`}>
                  {c.teaser_open}
                </Link>
                {locale !== t.locale && <span className={s.teaserNote}>{c.teaser_urdu}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
