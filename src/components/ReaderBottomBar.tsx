import React from 'react';
import Link from '@docusaurus/Link';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { ReadingMenu } from '@site/src/components/ReadingTools';
import styles from './ReaderBottomBar.module.css';

type Locale = 'en' | 'ur';
type Nav = { permalink: string; title: string } | undefined;
const T = {
  nav: { en: 'Page navigation', ur: 'صفحے کی نیویگیشن' },
  previous: { en: 'Previous', ur: 'پچھلا' },
  next: { en: 'Next', ur: 'اگلا' },
  contents: { en: 'Contents', ur: 'فہرست' },
};

/** On a phone, the controls a reader needs most sit within thumb reach. Hidden on desktop and in print. */
export default function ReaderBottomBar({ locale, minutes, previous, next }: { locale: Locale; minutes: number | null; previous: Nav; next: Nav }): React.ReactElement {
  const sidebar = useNavbarMobileSidebar();
  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <nav className={`${styles.bar} reader-bottom-bar print-hidden`} aria-label={T.nav[locale]}>
        {previous ? <Link className={styles.item} to={previous.permalink} title={previous.title}>{T.previous[locale]}</Link> : <span className={styles.item} />}
        <button type="button" className={styles.item} onClick={() => sidebar.toggle()}>{T.contents[locale]}</button>
        <ReadingMenu minutes={minutes} locale={locale} up />
        {next ? <Link className={`${styles.item} ${styles.next}`} to={next.permalink} title={next.title}>{T.next[locale]}</Link> : <span className={styles.item} />}
      </nav>
    </>
  );
}
