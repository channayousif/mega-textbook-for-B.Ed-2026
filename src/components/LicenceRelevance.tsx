import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import map from '@site/src/data/licence-map.json';

/**
 * Feature 024: "On the licence test" box on degree pages.
 *
 * The reverse half of the licence cross-links. Licence subtopic pages declare
 * `degree_links`; `scripts/build-licence-map.mjs` inverts them into
 * `src/data/licence-map.json` (degree path -> licence pages). Rendering it from
 * the DocItem footer means no degree file is edited, so reviewed units keep
 * their hashed review evidence intact.
 */
type Entry = { route: string; objective_id: string; title_en: string; title_ur: string };

const LABEL = {
  en: 'On the Sindh Teaching Licence test',
  ur: 'سندھ ٹیچنگ لائسنس ٹیسٹ میں',
  lead: {
    en: 'This page teaches material the licence test assesses. Exam-focused summary and practice questions:',
    ur: 'یہ صفحہ وہ مواد پڑھاتا ہے جس کی لائسنس ٹیسٹ میں جانچ ہوتی ہے۔ امتحانی خلاصہ اور مشقی سوالات:',
  },
};

export default function LicenceRelevance(): React.ReactElement | null {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const { pathname } = useLocation();
  const path = pathname.replace(/^\/ur(?=\/)/, '').replace(/\/$/, '');
  const entries = (map as Record<string, Entry[]>)[path];
  if (!entries?.length) return null;
  return (
    <aside className="alert alert--info margin-top--lg" aria-label={LABEL[locale]} data-testid="licence-relevance">
      <strong>{LABEL[locale]}</strong>
      <p className="margin-bottom--sm">{LABEL.lead[locale]}</p>
      <ul className="margin-bottom--none">
        {entries.map((e) => (
          <li key={e.route}>
            <Link to={e.route}>{e.objective_id}: {locale === 'ur' ? e.title_ur : e.title_en}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
