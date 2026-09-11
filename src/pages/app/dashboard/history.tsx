import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { useAuth } from '@site/src/contexts/AuthContext';
import { fetchPastSemesters, type PastSemesterGroup } from '@site/src/lib/dashboardQueries';

/**
 * History area (Spec 004, T029, FR-007). Past (archived) semesters, grouped,
 * strictly read-only - no edit/resubmit control anywhere in this component,
 * matching SC-003's guarantee (Spec 003's archived-class immutability
 * already enforces this at the database layer; this page never renders a
 * control that would suggest otherwise).
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load history.', ur: 'ماضی کا ریکارڈ لوڈ نہیں ہو سکا۔' },
  title: { en: 'History', ur: 'ماضی کا ریکارڈ' },
  noHistory: {
    en: 'Your record will appear here once a semester ends.',
    ur: 'آپ کا ریکارڈ یہاں اس وقت ظاہر ہوگا جب کوئی سمسٹر ختم ہوگا۔',
  },
} as const;

function HistoryContent(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [groups, setGroups] = useState<PastSemesterGroup[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data, error: loadError } = await fetchPastSemesters(profile.id);
    if (loadError) setError(MESSAGES.loadError[locale]);
    else setGroups(data ?? []);
  }, [profile, locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!groups) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      <h2>{MESSAGES.title[locale]}</h2>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      {groups.length === 0 ? (
        <p>{MESSAGES.noHistory[locale]}</p>
      ) : (
        groups.map((group) => (
          <section key={group.termLabel} data-testid="semester-group" style={{ marginBottom: '2rem' }}>
            <h3>{group.termLabel}</h3>
            {group.classes.map(({ klass, grades }) => (
              <div key={klass.id} style={{ marginBottom: '1rem' }}>
                <h4>{klass.name} - {klass.course_code}</h4>
                {grades.length === 0 ? (
                  <p>-</p>
                ) : (
                  <ul>
                    {grades.map((g, i) => (
                      <li key={`${g.title}-${i}`}>{g.title}: {g.mark} / {g.maxMark}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  );
}

export default function DashboardHistoryPage(): React.ReactElement {
  return (
    <Layout title="History">
      <AppDashboardShell role="student">
          <HistoryContent />
      </AppDashboardShell>
    </Layout>
  );
}
