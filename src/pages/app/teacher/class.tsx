import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { useQueryParam } from '@site/src/contexts/ClassContext';
import { listRoster } from '@site/src/lib/classes';
import { listForTeacher } from '@site/src/lib/assignments';
import { fetchClassAnalytics, type AtRiskStudent } from '@site/src/lib/teacherAnalytics';
import type { Assignment } from '@site/src/lib/types';

/**
 * Per-class command centre (Spec 011, US7 / FR-015): one place for a single class - roster
 * size, at-risk students, upcoming due dates - each linking to the relevant detail page.
 * Composed from existing queries; no new storage.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  title: { en: 'Class command centre', ur: 'کلاس کمانڈ سینٹر' },
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  noClass: { en: 'No class selected.', ur: 'کوئی کلاس منتخب نہیں۔' },
  loadError: { en: 'Could not load this class.', ur: 'یہ کلاس لوڈ نہیں ہو سکی۔' },
  roster: { en: 'Students', ur: 'طلبہ' },
  viewRoster: { en: 'Open roster', ur: 'فہرست کھولیں' },
  atRisk: { en: 'At-risk students', ur: 'خطرے میں طلبہ' },
  noneAtRisk: { en: 'No students flagged at risk.', ur: 'کوئی طالب علم خطرے میں نہیں۔' },
  upcoming: { en: 'Upcoming due dates', ur: 'آنے والی آخری تاریخیں' },
  noneUpcoming: { en: 'Nothing due soon.', ur: 'جلد کچھ واجب نہیں۔' },
  openAnalytics: { en: 'Full analytics', ur: 'مکمل تجزیات' },
  openGrading: { en: 'Grading queue', ur: 'گریڈنگ قطار' },
} as const;

function riskLabel(reason: AtRiskStudent['reason'], locale: 'en' | 'ur'): string {
  if (reason.kind === 'missed_deadlines') {
    return locale === 'ur'
      ? `${reason.count} آخری تاریخیں چھوٹیں`
      : `${reason.count} missed deadline(s)`;
  }
  return locale === 'ur' ? 'گراوٹ کا رجحان' : 'falling trend';
}

function ClassContent({ classId }: { classId: string }): React.ReactElement {
  const locale = useLocale();
  const [rosterCount, setRosterCount] = useState<number | null>(null);
  const [atRisk, setAtRisk] = useState<AtRiskStudent[] | null>(null);
  const [upcoming, setUpcoming] = useState<Assignment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [rosterRes, analyticsRes, assignmentsRes] = await Promise.all([
      listRoster(classId),
      fetchClassAnalytics(classId),
      listForTeacher(classId),
    ]);
    if (rosterRes.error || analyticsRes.error || assignmentsRes.error) {
      setError(MESSAGES.loadError[locale]);
      return;
    }
    setRosterCount((rosterRes.data ?? []).filter((r) => r.status === 'active').length);
    setAtRisk(analyticsRes.data?.atRiskStudents ?? []);
    const now = Date.now();
    setUpcoming(
      (assignmentsRes.data ?? [])
        .filter((a) => new Date(a.due_at).getTime() >= now)
        .sort((a, b) => new Date(a.due_at).getTime() - new Date(b.due_at).getTime())
        .slice(0, 5),
    );
  }, [classId, locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <div className="alert alert--danger" role="alert">{error}</div>;
  if (rosterCount === null || !atRisk || !upcoming) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      <h1>{MESSAGES.title[locale]}</h1>
      <p>
        <Link to={`/app/teacher/analytics?classId=${classId}`}>{MESSAGES.openAnalytics[locale]}</Link>
        {' · '}
        <Link to={`/app/classes/queue?classId=${classId}`}>{MESSAGES.openGrading[locale]}</Link>
        {' · '}
        <Link to={`/app/classes/roster?classId=${classId}`}>{MESSAGES.viewRoster[locale]}</Link>
      </p>

      <h2>{MESSAGES.roster[locale]}: {rosterCount}</h2>

      <h2>{MESSAGES.atRisk[locale]}</h2>
      {atRisk.length === 0 ? (
        <p>{MESSAGES.noneAtRisk[locale]}</p>
      ) : (
        <ul>
          {atRisk.map((s) => (
            <li key={s.studentId} data-testid="at-risk-row">
              <Link to={`/app/teacher/student?classId=${classId}&studentId=${s.studentId}`}>
                {s.fullName ?? s.studentId}
              </Link>
              {' - '}
              {riskLabel(s.reason, locale)}
            </li>
          ))}
        </ul>
      )}

      <h2>{MESSAGES.upcoming[locale]}</h2>
      {upcoming.length === 0 ? (
        <p>{MESSAGES.noneUpcoming[locale]}</p>
      ) : (
        <ul>
          {upcoming.map((a) => (
            <li key={a.id}>
              <Link to={`/app/classes/queue?classId=${classId}&assignmentId=${a.id}`}>{a.title}</Link>
              {' - '}
              {new Date(a.due_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ClassCommandCentrePage(): React.ReactElement {
  const locale = useLocale();
  const classId = useQueryParam('classId');
  return (
    <Layout title="Class command centre">
      <AppDashboardShell role="teacher">
        {classId ? <ClassContent classId={classId} /> : <p>{MESSAGES.noClass[locale]}</p>}
      </AppDashboardShell>
    </Layout>
  );
}
