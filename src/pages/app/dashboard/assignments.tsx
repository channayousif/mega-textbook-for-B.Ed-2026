import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StudentDashboardGuard from '@site/src/components/StudentDashboardGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { fetchDueSoon, type DueSoonItem } from '@site/src/lib/dashboardQueries';

/**
 * Full Assignments area (Spec 004, T013, FR-003). Shares `fetchDueSoon()`
 * with Home (T012) — data-model.md's read-only query shapes table describes
 * this as "the same query, unfiltered by time window," meaning no item is
 * ever excluded here either; this page just shows the complete list rather
 * than only the first few.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load assignments.', ur: 'اسائنمنٹس لوڈ نہیں ہو سکیں۔' },
  title: { en: 'Assignments', ur: 'اسائنمنٹس' },
  nothingDue: {
    en: "Nothing due — you're all caught up across every class.",
    ur: 'کچھ بھی واجب نہیں — آپ ہر کلاس میں اپ ٹو ڈیٹ ہیں۔',
  },
  overdueLate: { en: 'Overdue — late submission accepted', ur: 'وقت گزر گیا — تاخیر سے جمع کرانا قبول' },
  closed: { en: 'Closed — window has ended', ur: 'بند — وقت ختم ہو گیا' },
  open: { en: 'Open', ur: 'کھلا' },
  colTitle: { en: 'Title', ur: 'عنوان' },
  colClass: { en: 'Class', ur: 'کلاس' },
  colDue: { en: 'Due', ur: 'آخری تاریخ' },
  colStatus: { en: 'Status', ur: 'حیثیت' },
} as const;

function stateLabel(item: DueSoonItem, locale: 'en' | 'ur'): string {
  if (item.state === 'overdue-late-allowed') return MESSAGES.overdueLate[locale];
  if (item.state === 'closed') return MESSAGES.closed[locale];
  return MESSAGES.open[locale];
}

function AssignmentsContent(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [items, setItems] = useState<DueSoonItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data, error: loadError } = await fetchDueSoon(profile.id);
    if (loadError) setError(MESSAGES.loadError[locale]);
    else setItems(data ?? []);
  }, [profile, locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!items) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      <h2>{MESSAGES.title[locale]}</h2>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      {items.length === 0 ? (
        <p>{MESSAGES.nothingDue[locale]}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{MESSAGES.colTitle[locale]}</th>
              <th>{MESSAGES.colClass[locale]}</th>
              <th>{MESSAGES.colDue[locale]}</th>
              <th>{MESSAGES.colStatus[locale]}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.assignment.id} data-testid="assignment-row">
                <td>{item.assignment.title}</td>
                <td>{item.className}</td>
                <td>{new Date(item.assignment.due_at).toLocaleString()}</td>
                <td>{stateLabel(item, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function DashboardAssignmentsPage(): React.ReactElement {
  return (
    <Layout title="Assignments">
      <StudentDashboardGuard>
        <main className="container auth-page margin-vert--lg">
          <AssignmentsContent />
        </main>
      </StudentDashboardGuard>
    </Layout>
  );
}
