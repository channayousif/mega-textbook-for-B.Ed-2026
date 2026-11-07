import React, { useState } from 'react';
import Link from '@docusaurus/Link';
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

/** Course covers come from the code, so a new course needs no artwork: same code, same cover. */
const COVERS = ['#123E43', '#1B5A60', '#164D53', '#22686E', '#0D2E32', '#8A5A0B'];
const MOTIFS = ['dots', 'lines', 'diamonds', 'rings'];
function hash(code: string): number {
  return [...code].reduce((sum, ch) => (sum * 31 + ch.charCodeAt(0)) >>> 0, 7);
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
              const n = hash(course.code);
              const title = (locale === 'ur' && course.title_ur) || course.title_en;
              const cover = (
                <span className={`${styles.cover} ${styles[MOTIFS[n % MOTIFS.length]]}`} style={{ backgroundColor: COVERS[n % COVERS.length] }}>
                  <span className={styles.code} dir="ltr">{course.code}</span>
                </span>
              );
              const body = (
                <span className={styles.body}>
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
