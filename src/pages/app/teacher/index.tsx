import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
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
  title: { en: 'Teaching dashboard', ur: 'تدریسی ڈیش بورڈ' },
  next: { en: 'Next action', ur: 'اگلا کام' },
  gradeNow: { en: 'Open grading queue', ur: 'گریڈنگ کی قطار کھولیں' },
  createClass: { en: 'Create a class', ur: 'کلاس بنائیں' },
  retry: { en: 'Try again', ur: 'دوبارہ کوشش کریں' },
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
  analyticsLink: { en: 'Analytics', ur: 'تجزیات' },
  rosterLink: { en: 'Roster', ur: 'فہرست' },
  gradingLink: { en: 'Grading', ur: 'گریڈنگ' },
} as const;

function OverviewContent(): React.ReactElement {
  const locale = useLocale();
  const [ungraded, setUngraded] = useState<UngradedCount[] | null>(null);
  const [soonestDue, setSoonestDue] = useState<SoonestDueAssignment[] | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    const [ungradedRes, soonestDueRes, recentActivityRes] = await Promise.all([
      fetchUngradedCountsByClass(),
      fetchSoonestDueAssignments(5),
      fetchRecentActivity(10),
    ]);
    if (ungradedRes.error || soonestDueRes.error || recentActivityRes.error) {
      setError(MESSAGES.loadError[locale]);
      setLoaded(true);
      return;
    }
    setUngraded(ungradedRes.data ?? []);
    setSoonestDue(soonestDueRes.data ?? []);
    setRecentActivity(recentActivityRes.data ?? []);
    setLoaded(true);
  }, [locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!loaded) return <p role="status">{MESSAGES.loading[locale]}</p>;

  if (error || !ungraded || !soonestDue || !recentActivity) return <div className="work-panel" role="alert"><h1>{MESSAGES.title[locale]}</h1><p>{error || MESSAGES.loadError[locale]}</p><button className="button button--primary" onClick={() => void load()}>{MESSAGES.retry[locale]}</button></div>;

  if (ungraded.length === 0) {
    return (
      <div className="dashboard-home" dir={locale === 'ur' ? 'rtl' : 'ltr'}>
        <h1>{MESSAGES.title[locale]}</h1>
        <section className="work-panel work-panel--accent"><h2>{MESSAGES.next[locale]}</h2>
        <p>{MESSAGES.noClasses[locale]}</p>
        <p><Link to="/app/classes" className="button button--primary">{MESSAGES.createClass[locale]}</Link></p></section>
      </div>
    );
  }

  const totalUngraded = ungraded.reduce((sum, c) => sum + c.ungradedCount, 0);
  const caughtUp = totalUngraded === 0 && soonestDue.length === 0;

  return (
    <div className="dashboard-home" dir={locale === 'ur' ? 'rtl' : 'ltr'}>
      <h1>{MESSAGES.title[locale]}</h1>
      <section className="work-panel work-panel--accent"><h2>{MESSAGES.next[locale]}</h2>
        {totalUngraded > 0 ? <><p>{totalUngraded} {MESSAGES.ungradedCount[locale]}</p><Link className="button button--primary" to="/app/classes/queue">{MESSAGES.gradeNow[locale]}</Link></> :
          soonestDue.length > 0 ? <><p>{MESSAGES.soonestDue[locale]}: {soonestDue[0].title}</p><Link className="button button--primary" to="/app/classes/assignments">{MESSAGES.soonestDue[locale]}</Link></> : <p>{MESSAGES.caughtUp[locale]}</p>}
      </section>
      <div className="work-grid">
      {caughtUp ? (
        <section className="work-panel"><h2>{MESSAGES.ungradedByClass[locale]}</h2><p>{MESSAGES.caughtUp[locale]}</p></section>
      ) : (
        <>
          <section className="work-panel"><h2>{MESSAGES.ungradedByClass[locale]}</h2>
          <ul>
            {ungraded.map((c) => (
              <li key={c.classId} data-testid="ungraded-count-row">
                {c.className} - {c.ungradedCount} {MESSAGES.ungradedCount[locale]}
                {' · '}
                <Link to={`/app/teacher/analytics?classId=${c.classId}`}>{MESSAGES.analyticsLink[locale]}</Link>
                {' · '}
                <Link to={`/app/classes/roster?classId=${c.classId}`}>{MESSAGES.rosterLink[locale]}</Link>
                {' · '}
                <Link to={`/app/classes/queue?classId=${c.classId}`}>{MESSAGES.gradingLink[locale]}</Link>
              </li>
            ))}
          </ul>
          </section>
          <section className="work-panel"><h2>{MESSAGES.soonestDue[locale]}</h2>
          <ul>
            {soonestDue.map((item) => (
              <li key={item.id} data-testid="soonest-due-item">
                {item.title} - {item.className} - {new Date(item.dueAt).toLocaleString()}
                {' · '}
                <Link to={`/app/teacher/analytics?classId=${item.classId}`}>{MESSAGES.analyticsLink[locale]}</Link>
              </li>
            ))}
          </ul>
          </section>
        </>
      )}
      <section className="work-panel"><h2>{MESSAGES.recentActivity[locale]}</h2>
      {recentActivity.length === 0 && <p>{locale === 'ur' ? 'ابھی کوئی نئی سرگرمی نہیں۔' : 'No recent activity.'}</p>}
      <ul>
        {recentActivity.map((item) => (
          <li key={`${item.kind}-${item.id}`} data-testid="recent-activity-item">
            {item.assignmentTitle} - {item.className} - {new Date(item.occurredAt).toLocaleString()}
          </li>
        ))}
      </ul>
      </section>
      <section className="work-panel"><h2>{MESSAGES.manageClasses[locale]}</h2><p><Link to="/app/classes">{MESSAGES.manageClasses[locale]}</Link></p><p><Link to="/app/teacher/quiz-authoring">{locale === 'ur' ? 'کوئز تیار کریں' : 'Author a quiz'}</Link></p><p><Link to="/app/teacher/teaching-log">{locale === 'ur' ? 'تدریسی نوٹ لکھیں' : 'Record teaching'}</Link></p></section>
      </div>
    </div>
  );
}

export default function TeacherOverviewPage(): React.ReactElement {
  return (
    <Layout title="Teacher Dashboard">
      <AppDashboardShell role="teacher">
          <OverviewContent />
      </AppDashboardShell>
    </Layout>
  );
}
