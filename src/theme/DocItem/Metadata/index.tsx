import React from 'react';
import Metadata from '@theme-original/DocItem/Metadata';
import Head from '@docusaurus/Head';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { SITE_NAME, PUBLISHER, SITE_URL } from '@site/src/lib/brand';

/**
 * Adds schema.org structured data to every doc page (Spec 013, FR-017).
 *
 * The site previously emitted only Docusaurus's automatic BreadcrumbList, so
 * search engines had no signal that these pages are course material at all.
 * `LearningResource` is the type Google documents for educational content, and
 * `isPartOf: Course` ties each unit and topic back to its course.
 *
 * Everything here is derived from front matter the pipeline already validates -
 * nothing new for an author to maintain, and no claim is emitted that the page
 * does not actually support. A page with no `course_code` (the site intro, for
 * instance) gets no LearningResource rather than a fabricated one.
 */
export default function MetadataWrapper(props: Record<string, unknown>): React.ReactElement {
  const { metadata, frontMatter } = useDoc() as {
    metadata: { title: string; description?: string; permalink: string };
    frontMatter: Record<string, unknown>;
  };
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';

  const courseCode = typeof frontMatter.course_code === 'string' ? frontMatter.course_code : null;
  const description = typeof frontMatter.description === 'string' ? frontMatter.description : metadata.description;
  const minutes = typeof frontMatter.est_reading_minutes === 'number' ? frontMatter.est_reading_minutes : null;

  const jsonLd = courseCode
    ? {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: metadata.title,
      description,
      inLanguage: locale,
      url: `${SITE_URL}${metadata.permalink}`,
      isAccessibleForFree: true,
      learningResourceType: frontMatter.topic_no ? 'Lesson' : 'Unit',
      educationalLevel: 'Undergraduate',
      ...(minutes ? { timeRequired: `PT${minutes}M` } : {}),
      provider: { '@type': 'CollegeOrUniversity', name: PUBLISHER },
      isPartOf: {
        '@type': 'Course',
        courseCode,
        name: courseCode,
        provider: { '@type': 'CollegeOrUniversity', name: PUBLISHER },
      },
    }
    : {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: locale,
      publisher: { '@type': 'CollegeOrUniversity', name: PUBLISHER },
    };

  return (
    <>
      <Metadata {...props} />
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
    </>
  );
}
