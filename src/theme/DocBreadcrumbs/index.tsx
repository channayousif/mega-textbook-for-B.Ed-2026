/**
 * Swizzled (safe) DocBreadcrumbs: the plain breadcrumb trail is replaced by the
 * CourseNavBar dropdowns (owner request, 2026-11-03). The breadcrumb structured
 * data stays, so search engines still see the trail.
 */
import React from 'react';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import CourseNavBar from '@site/src/components/CourseNavBar';

export default function DocBreadcrumbs(): React.ReactElement | null {
  const breadcrumbs = useSidebarBreadcrumbs();
  if (!breadcrumbs) return null;
  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <CourseNavBar />
    </>
  );
}
