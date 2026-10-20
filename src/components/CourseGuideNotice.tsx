import React from 'react';
import Admonition from '@theme/Admonition';
import useBaseUrl from '@docusaurus/useBaseUrl';
import guides from '@site/catalog/course-guides.json';

/**
 * D-2026-0070 item 3: every course intro page links the official course guide PDF.
 *
 * Rendered by the DocItem/Content wrapper rather than written into each
 * course-overview.mdx: the overview is a bound input of every unit's G2/G3 evidence,
 * so an MDX edit would stale the manifests of all units in that course.
 */
type Guide = { source: string; pages: number[]; pdf: string };

const TEXT = {
  en: {
    title: 'Course guide',
    lead: (code: string) => `Read the official University of Sindh course guide for ${code}: `,
    link: 'open the course guide (PDF)',
    tail: '. This course follows the guide\'s outline.',
  },
  ur: {
    title: 'کورس گائیڈ',
    lead: (code: string) => `یونیورسٹی آف سندھ کی ${code} کی سرکاری کورس گائیڈ پڑھیں: `,
    link: 'کورس گائیڈ کھولیں (PDF)',
    tail: '۔ یہ کورس اسی گائیڈ کی ترتیب پر چلتا ہے۔',
  },
} as const;

export default function CourseGuideNotice({ courseCode, locale }: { courseCode: string; locale: 'en' | 'ur' }): React.ReactElement | null {
  const guide = (guides.courses as Record<string, Guide>)[courseCode];
  const href = useBaseUrl(guide ? `/${guide.pdf}` : '/');
  if (!guide) return null;
  const t = TEXT[locale];
  return (
    <Admonition type="info" title={t.title}>
      <p data-testid="course-guide-notice">
        {t.lead(courseCode)}
        <a href={href} target="_blank" rel="noopener noreferrer">{t.link}</a>
        {t.tail}
      </p>
    </Admonition>
  );
}
