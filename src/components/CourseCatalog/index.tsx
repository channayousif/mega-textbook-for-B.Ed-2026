import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import catalog from '@site/catalog/courses.json';
import styles from './styles.module.css';

type Status = Record<string, { units: number; urdu: number }>;
type Course = { code: string; title_en: string; title_ur?: string; bilingual?: boolean };

const T = {
  en: {
    tabs: 'Choose a semester', semester: (n: number) => `Semester ${n}`, units: (n: number) => `${n} ${n === 1 ? 'unit' : 'units'}`,
    urdu: (n: number) => `${n} in Urdu`, englishOnly: 'English course', soon: 'Coming soon', open: 'Open course',
    licenceTitle: 'Teaching licence', licenceText: 'Preparing for the STEDA licence test? The licence track explains the syllabus heading by heading.', licenceCta: 'Open the licence track',
  },
  ur: {
    tabs: 'سمسٹر منتخب کریں', semester: (n: number) => `سمسٹر ${n}`, units: (n: number) => `${n} یونٹ`,
    urdu: (n: number) => `${n} اردو میں`, englishOnly: 'انگریزی کورس', soon: 'جلد آ رہا ہے', open: 'کورس کھولیں',
    licenceTitle: 'تدریسی لائسنس', licenceText: 'STEDA لائسنس ٹیسٹ کی تیاری کر رہے ہیں؟ لائسنس ٹریک نصاب کی ہر سرخی کی وضاحت کرتا ہے۔', licenceCta: 'لائسنس ٹریک کھولیں',
  },
};

/** Covers are drawn per course by scripts/design/course-covers.mjs before every build. */
function Cover({ code }: { code: string }): React.ReactElement {
  const src = useBaseUrl(`/img/covers/${code.toLowerCase()}.svg`);
  return <img className={styles.cover} src={src} width={320} height={180} alt="" loading="lazy" decoding="async" />;
}

export default function CourseCatalog(): React.ReactElement {
  const { siteConfig, i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const t = T[locale];
  const status = siteConfig.customFields?.courseStatus as Status;
  const semesters = catalog.semesters.filter((s) => s.courses.length > 0);
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles.catalogue}>
      <noscript><style>{`.${styles.panel}[hidden]{display:block}`}</style></noscript>
      <div className={styles.tabs} role="group" aria-label={t.tabs}>
        {semesters.map((s, i) => (
          <button key={s.number} type="button" className={i === current ? `${styles.tab} ${styles.tabOn}` : styles.tab} aria-pressed={i === current} onClick={() => setCurrent(i)}>
            {t.semester(s.number)}
          </button>
        ))}
      </div>
      {semesters.map((s, i) => (
        <div key={s.number} className={styles.panel} hidden={i !== current}>
          <ul className={styles.grid}>
            {(s.courses as Course[]).map((course) => {
              const stat = status[course.code];
              const title = (locale === 'ur' && course.title_ur) || course.title_en;
              const cover = <Cover code={course.code} />;
              const body = (
                <span className={styles.body}>
                  <span className={styles.code} dir="ltr">{course.code}</span>
                  <span className={styles.title}>{title}</span>
                  {stat ? (
                    <span className={styles.meta}>
                      {t.units(stat.units)} · {course.bilingual === false ? t.englishOnly : t.urdu(stat.urdu)}
                    </span>
                  ) : <span className={styles.soon}>{t.soon}</span>}
                </span>
              );
              return (
                <li key={course.code}>
                  {stat ? (
                    <Link className={`${styles.card} ${styles.live}`} to={`/semester-${s.number}/${course.code.toLowerCase()}/course-overview`} aria-label={`${course.code}: ${title}. ${t.open}`}>{cover}{body}</Link>
                  ) : <div className={styles.card}>{cover}{body}</div>}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <aside className={styles.licence}>
        <div><p className={styles.licenceTitle}>{t.licenceTitle}</p><p className={styles.licenceText}>{t.licenceText}</p></div>
        <Link className="button button--secondary" to="/licence/">{t.licenceCta}</Link>
      </aside>
    </div>
  );
}
