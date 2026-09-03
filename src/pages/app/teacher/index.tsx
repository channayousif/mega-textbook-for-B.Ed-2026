import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TeacherDashboardGuard from '@site/src/components/TeacherDashboardGuard';
import {
  fetchUngradedCountsByClass, fetchSoonestDueAssignments, fetchRecentActivity,
  type UngradedCount, type SoonestDueAssignment, type RecentActivityItem,
} from '@site/src/lib/teacherOverview';

/**
 * Teacher Overview (Spec 005, T008) - FR-002: per-class ungraded submission
 * count, the 5 soonest-due assignments across all classes, a 10-item
 * recent-activity feed merging submissions and quiz attempts, and an
 * explicit "caught up" state when nothing is pending. Links out to Spec
 * 003's existing `/app/classes/*` pages for Classes/Grading management
 * (plan.md's Structure Decision - those areas are reused, not rebuilt).
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load your overview.', ur: 'جائزہ لوڈ نہیں ہو سکا۔' },
  ungradedByClass: { en: 'Ungraded submissions', ur: 'غیر گریڈ شدہ جمع کرائے گئے کام' },
  ungradedCount: { en: 'ungraded', ur: 'غیر گریڈ شدہ' },
  soonestDue: { en: 'Upcoming due dates', ur: 'آنے والی آخری تاریخیں' },
  recentActivity: { en: 'Recent student activity', ur: 'حالیہ طلبہ کی سرگرمی' },
  caughtUp: {
    en: "You're all caught up - nothing ungraded and nothing due soon.",
    ur: 'آپ بالکل اپ ٹو ڈیٹ ہیں - کچھ بھی غیر گریڈ شدہ یا جلد واجب نہیں۔',
  },
  noClasses: {
    en: 'You have no classes yet. Create one to get started.',
    ur: 'ابھی تک آپ کی کوئی کلاس نہیں ہے۔ شروع کرنے کے لیے ایک کلاس بنائیں۔',
  },
  manageClasses: { en: 'Manage your classes', ur: 'اپنی کلاسیں منظم کریں' },
} as const;

function OverviewContent(): React.ReactElement {
  const locale = useLocale();
  const [ungraded, setUngraded] = useState<UngradedCount[] | null>(null);
  const [soonestDue, setSoonestDue] = useState<SoonestDueAssignment[] | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [ungradedRes, soonestDueRes, recentActivityRes] = await Promise.all([
      fetchUngradedCountsByClass(),
      fetchSoonestDueAssignments(5),
      fetchRecentActivity(10),
    ]);
    if (ungradedRes.error || soonestDueRes.error || recentActivityRes.error) {
      setError(MESSAGES.loadError[locale]);
      return;
    }
    setUngraded(ungradedRes.data ?? []);
    setSoonestDue(soonestDueRes.data ?? []);
    setRecentActivity(recentActivityRes.data ?? []);
  }, [locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!ungraded || !soonestDue || !recentActivity) return <p>{MESSAGES.loading[locale]}</p>;

  if (ungraded.length === 0) {
    return (
      <div>
        {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
        <p>{MESSAGES.noClasses[locale]}</p>
        <p><Link to="/app/classes" className="button button--primary button--sm">{MESSAGES.manageClasses[locale]}</Link></p>
      </div>
    );
  }

  const totalUngraded = ungraded.reduce((sum, c) => sum + c.ungradedCount, 0);
  const caughtUp = totalUngraded === 0 && soonestDue.length === 0;

  return (
    <div>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}

      {caughtUp ? (
        <p>{MESSAGES.caughtUp[locale]}</p>
      ) : (
        <>
          <h3>{MESSAGES.ungradedByClass[locale]}</h3>
          <ul>
            {ungraded.map((c) => (
              <li key={c.classId} data-testid="ungraded-count-row">
                {c.className} - {c.ungradedCount} {MESSAGES.ungradedCount[locale]}
              </li>
            ))}
          </ul>

          <h3>{MESSAGES.soonestDue[locale]}</h3>
          <ul>
            {soonestDue.map((item) => (
              <li key={item.id} data-testid="soonest-due-item">
                {item.title} - {item.className} - {new Date(item.dueAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      )}

      <h3>{MESSAGES.recentActivity[locale]}</h3>
      <ul>
        {recentActivity.map((item) => (
          <li key={`${item.kind}-${item.id}`} data-testid="recent-activity-item">
            {item.assignmentTitle} - {item.className} - {new Date(item.occurredAt).toLocaleString()}
          </li>
        ))}
      </ul>

      <p><Link to="/app/classes">{MESSAGES.manageClasses[locale]}</Link></p>
    </div>
  );
}

export default function TeacherOverviewPage(): React.ReactElement {
  return (
    <Layout title="Teacher Dashboard">
      <TeacherDashboardGuard>
        <main className="container auth-page margin-vert--lg">
          <OverviewContent />
        </main>
      </TeacherDashboardGuard>
    </Layout>
  );
}
