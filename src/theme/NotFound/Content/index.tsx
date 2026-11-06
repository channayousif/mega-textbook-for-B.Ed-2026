/**
 * A friendlier 404: says what happened and offers the next step, instead of asking the
 * reader to contact the owner of a broken link. Upstream marks this component safe to
 * replace. Static HTML, so it works with no JavaScript.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const T = {
  en: {
    title: "We can't find that page",
    text: 'The link may be old, or the page may have moved. These will get you back to reading.',
    courses: 'Browse B.Ed courses',
    licence: 'Teaching licence',
    home: 'Home page',
  },
  ur: {
    title: 'یہ صفحہ نہیں مل سکا',
    text: 'ہو سکتا ہے لنک پرانا ہو یا صفحہ منتقل ہو گیا ہو۔ یہ راستے آپ کو دوبارہ مطالعے تک لے جائیں گے۔',
    courses: 'بی ایڈ کورسز دیکھیں',
    licence: 'تدریسی لائسنس',
    home: 'ہوم پیج',
  },
};

export default function NotFoundContent({ className }: { className?: string }): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const t = T[i18n.currentLocale === 'ur' ? 'ur' : 'en'];
  const mark = useBaseUrl('/img/brand/book-color.svg');
  return (
    <main className={clsx('container', styles.page, className)}>
      <img className={styles.mark} src={mark} width={64} height={64} alt="" />
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.text}>{t.text}</p>
      <div className={styles.actions}>
        <Link className="button button--primary button--lg" to="/intro">{t.courses}</Link>
        <Link className="button button--secondary button--lg" to="/licence/">{t.licence}</Link>
        <Link className="button button--secondary button--lg" to="/">{t.home}</Link>
      </div>
    </main>
  );
}
