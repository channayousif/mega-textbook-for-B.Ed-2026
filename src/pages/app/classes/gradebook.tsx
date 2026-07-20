import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from '@site/src/components/AuthGuard';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import { exportGradebook } from '@site/src/lib/gradebookExport';

/**
 * Gradebook export (Spec 003, T052/T062). Teacher-only export button
 * triggering a client-side `.xlsx` generation and download — no export
 * endpoint (R5). Bilingual status/error text (FR-016).
 */

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  noAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  exportError: {
    en: 'Could not export the gradebook. Please try again.',
    ur: 'گریڈ بک ایکسپورٹ نہیں ہو سکی۔ براہِ کرم دوبارہ کوشش کریں۔',
  },
  exporting: { en: 'Exporting…', ur: 'ایکسپورٹ ہو رہی ہے…' },
} as const;

function GradebookContent({ classId }: { classId: string }): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const { loading, classRow, role } = useClassRole(classId);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleExport(): Promise<void> {
    setError(null);
    setExporting(true);
    const { error: exportError } = await exportGradebook(classId);
    setExporting(false);
    if (exportError) setError(MESSAGES.exportError[locale]);
  }

  if (loading) return <p>{MESSAGES.loading[locale]}</p>;
  if (!classRow || role !== 'teacher') {
    return (
      <div className="alert alert--danger" role="alert" aria-live="assertive">
        {MESSAGES.noAccess[locale]}
      </div>
    );
  }

  return (
    <div>
      <h2>Gradebook — {classRow.name}</h2>
      <p>{classRow.course_code} — {classRow.term_label}</p>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      <button type="button" className="button button--primary" disabled={exporting} onClick={handleExport}>
        {exporting ? MESSAGES.exporting[locale] : 'Export gradebook'}
      </button>
    </div>
  );
}

export default function GradebookPage(): React.ReactElement {
  const classId = useQueryParam('classId');
  return (
    <Layout title="Gradebook">
      <AuthGuard requireRole="teacher">
        <main className="container auth-page margin-vert--lg">
          {classId ? <GradebookContent classId={classId} /> : <p>No class selected.</p>}
        </main>
      </AuthGuard>
    </Layout>
  );
}
