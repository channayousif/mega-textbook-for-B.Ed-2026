import React from 'react';
import Admonition from '@theme/Admonition';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import hec from '@site/catalog/hec-curriculum.json';

/**
 * States where a course sits in HEC's notified curriculum, and which of HEC's
 * outcomes it has been checked to teach (specs/hec-curriculum-2025/crosswalk.md).
 *
 * Rendered by the DocItem/Content wrapper for the same reason as CourseGuideNotice:
 * course-overview.mdx is a bound input of every unit's review evidence. HEC notifies
 * a standard for universities and approves no textbook, so this wording must never
 * say the book itself is HEC-approved.
 */
type Outcome = { text: string; text_ur?: string; status: string; units: number[] };
type Row = {
  category: string;
  hec_title: string;
  hec_title_ur: string;
  credit_hours: string;
  page: number;
  outcomes?: Outcome[];
};

const DATE = { en: '11 April 2025', ur: '11 اپریل 2025' } as const;

const TEXT = {
  en: {
    title: 'HEC curriculum',
    categories: {
      general_education: 'a General Education course',
      professional: 'a Major Professional Course',
      pedagogy: 'a Major Pedagogy Course',
      interdisciplinary: 'an Interdisciplinary Course',
      internship: 'the Internship requirement',
      capstone: 'the Capstone Project requirement',
    } as Record<string, string>,
    link: 'Open the curriculum at this course (PDF)',
    outcomes: 'HEC learning outcomes taught in this course',
    note: 'These are the outcomes checked so far against this course\'s units.',
    unit: 'Unit',
  },
  ur: {
    title: 'ایچ ای سی کا نصاب',
    categories: {
      general_education: 'عمومی تعلیم کا کورس',
      professional: 'میجر پیشہ ورانہ کورس',
      pedagogy: 'میجر تدریسیات کورس',
      interdisciplinary: 'بین الشعبہ جاتی کورس',
      internship: 'انٹرن شپ کی شرط',
      capstone: 'کیپ اسٹون پروجیکٹ کی شرط',
    } as Record<string, string>,
    link: 'نصاب کو اس کورس کے صفحے پر کھولیں (PDF)',
    outcomes: 'اس کورس میں پڑھائے جانے والے ایچ ای سی کے نتیجہ ہائے تعلم',
    note: 'یہاں وہ نتیجہ ہائے تعلم درج ہیں جن کا اس کورس کے یونٹوں سے اب تک موازنہ ہو چکا ہے۔ اردو ترجمہ غیر سرکاری ہے؛ سرکاری متن PDF میں انگریزی میں ہے۔',
    unit: 'یونٹ',
  },
} as const;

const Ltr = ({ children }: { children: React.ReactNode }) => <bdi dir="ltr">{children}</bdi>;

export default function HecCurriculumNotice({ courseCode, locale }: { courseCode: string; locale: 'en' | 'ur' }): React.ReactElement | null {
  const { metadata } = useDoc();
  const { document: doc, courses } = hec;
  const row = (courses as Record<string, Row>)[courseCode];
  const pdf = useBaseUrl(`/${doc.pdf}`);
  if (!row) return null;

  const t = TEXT[locale];
  const href = `${pdf}#page=${row.page + doc.pdf_page_offset}`;
  const courseRoot = metadata.permalink.replace(/course-overview\/?$/, '');
  const covered = (row.outcomes ?? []).filter((o) => o.status === 'covered');
  const category = t.categories[row.category];

  return (
    <Admonition type="info" title={t.title}>
      <p data-testid="hec-curriculum-notice">
        {locale === 'en' ? (
          <>
            According to the <cite>{doc.title} {doc.year}</cite> ({doc.issuer}, No. {doc.notification_no}, {DATE.en}), this
            course is {category}: {row.hec_title}, {row.credit_hours} credit hours.{' '}
          </>
        ) : (
          <>
            ہائر ایجوکیشن کمیشن کے «{doc.title_ur} {doc.year}» (<Ltr>{doc.title} {doc.year}</Ltr>، نمبر{' '}
            <Ltr>{doc.notification_no}</Ltr>، {DATE.ur}) کے مطابق یہ {category} ہے: {row.hec_title_ur}،{' '}
            <Ltr>{row.credit_hours}</Ltr> کریڈٹ آورز۔{' '}
          </>
        )}
        <a href={href} target="_blank" rel="noopener noreferrer">{t.link}</a>
      </p>
      {covered.length > 0 && (
        <details data-testid="hec-outcomes">
          <summary>{t.outcomes}</summary>
          <p>{t.note}</p>
          <ul>
            {covered.map((o) => (
              <li key={o.text}>
                {locale === 'en' ? o.text : o.text_ur}{' '}
                ({o.units.map((n, i) => (
                  <React.Fragment key={n}>
                    {i > 0 && (locale === 'en' ? ', ' : '، ')}
                    <Link to={`${courseRoot}unit-${String(n).padStart(2, '0')}`}>{t.unit} {n}</Link>
                  </React.Fragment>
                ))})
              </li>
            ))}
          </ul>
        </details>
      )}
    </Admonition>
  );
}
