import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { useAuth } from '@site/src/contexts/AuthContext';
import { fetchAllGrades, type GradeItem } from '@site/src/lib/dashboardQueries';

/**
 * Grades area (Spec 004, T017, FR-004). Every returned assignment/quiz
 * score, with mark and maximum - deliberately never a class/cohort average
 * anywhere on this page (a permanent privacy placeholder, spec.md
 * Assumptions).
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load grades.', ur: 'گریڈز لوڈ نہیں ہو سکے۔' },
  title: { en: 'Grades', ur: 'گریڈز' },
  noGrades: {
    en: 'Nothing graded yet. Returned grades will appear here as soon as a teacher marks your work.',
    ur: 'ابھی تک کوئی گریڈ نہیں۔ جیسے ہی استاد آپ کا کام چیک کرے گا، گریڈز یہاں ظاہر ہوں گے۔',
  },
  colTitle: { en: 'Title', ur: 'عنوان' },
  colClass: { en: 'Class', ur: 'کلاس' },
  colMark: { en: 'Mark', ur: 'نمبر' },
} as const;

function GradesContent(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [grades, setGrades] = useState<GradeItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data, error: loadError } = await fetchAllGrades(profile.id);
    if (loadError) setError(MESSAGES.loadError[locale]);
    else setGrades(data ?? []);
  }, [profile, locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!grades) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      <h2>{MESSAGES.title[locale]}</h2>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      {grades.length === 0 ? (
        <p>{MESSAGES.noGrades[locale]}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{MESSAGES.colTitle[locale]}</th>
              <th>{MESSAGES.colClass[locale]}</th>
              <th>{MESSAGES.colMark[locale]}</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, i) => (
              <tr key={`${g.kind}-${g.title}-${i}`}>
                <td>{g.title}</td>
                <td>{g.className}</td>
                <td>{g.mark} / {g.maxMark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function DashboardGradesPage(): React.ReactElement {
  return (
    <Layout title="Grades">
      <AppDashboardShell role="student">
          <GradesContent />
      </AppDashboardShell>
    </Layout>
  );
}
