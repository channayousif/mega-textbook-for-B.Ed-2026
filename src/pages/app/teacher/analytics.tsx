import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TeacherDashboardGuard from '@site/src/components/TeacherDashboardGuard';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import { fetchClassAnalytics, type ClassAnalytics, type AtRiskStudent } from '@site/src/lib/teacherAnalytics';

/**
 * Analytics (Spec 005, T037) — FR-009: score distribution per assignment,
 * per-student trend, unit-by-unit class average. FR-010: at-risk flag with
 * a plain-language reason per student, scoped to one class the caller owns
 * (`useClassRole`, matching Spec 003's `roster.tsx`/`queue.tsx` precedent).
 * Distribution/averages render as plain CSS bars (research.md R7, no
 * charting dependency).
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load analytics for this class.', ur: 'اس کلاس کے تجزیات لوڈ نہیں ہو سکے۔' },
  noAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  distribution: { en: 'Score distribution per assignment', ur: 'فی اسائنمنٹ نمبروں کی تقسیم' },
  unitAverages: { en: 'Unit-by-unit class average', ur: 'یونٹ کے لحاظ سے کلاس اوسط' },
  studentTrends: { en: 'Per-student trend', ur: 'فی طالب علم رجحان' },
  atRisk: { en: 'At-risk students', ur: 'خطرے میں طلبہ' },
  noAtRisk: { en: 'No students currently meet the at-risk criteria.', ur: 'فی الحال کوئی طالب علم خطرے کے معیار پر پورا نہیں اترتا۔' },
  noGradedWork: {
    en: 'No graded work yet for this class.',
    ur: 'اس کلاس کے لیے ابھی تک کوئی گریڈ شدہ کام نہیں۔',
  },
  reasonMissedDeadlines: { en: 'missed deadlines', ur: 'چھوٹی ہوئی آخری تاریخیں' },
  reasonFallingTrend: { en: 'falling trend over last 3 scores', ur: 'پچھلے 3 نمبروں میں گرتا رجحان' },
} as const;

function atRiskReasonText(student: AtRiskStudent, locale: 'en' | 'ur'): string {
  if (student.reason.kind === 'missed_deadlines') {
    return `${student.reason.count} ${MESSAGES.reasonMissedDeadlines[locale]}`;
  }
  return `${MESSAGES.reasonFallingTrend[locale]}: ${student.reason.scores.map((s) => Math.round(s * 100)).join('% → ')}%`;
}

function Bar({ fraction }: { fraction: number }): React.ReactElement {
  return (
    <div style={{ background: 'var(--ifm-color-emphasis-200)', height: '8px', width: '160px', display: 'inline-block' }}>
      <div style={{ background: 'var(--ifm-color-primary)', height: '100%', width: `${Math.round(fraction * 100)}%` }} />
    </div>
  );
}

function AnalyticsContent(): React.ReactElement {
  const locale = useLocale();
  const classId = useQueryParam('classId');
  const { loading: classLoading, role: classRole } = useClassRole(classId);
  const [analytics, setAnalytics] = useState<ClassAnalytics | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!classId) return;
    const { data, error: loadError } = await fetchClassAnalytics(classId);
    if (loadError) {
      setError(MESSAGES.loadError[locale]);
      return;
    }
    setAnalytics(data);
  }, [classId, locale]);

  useEffect(() => {
    if (classRole === 'teacher') load();
  }, [classRole, load]);

  if (classLoading) return <p>{MESSAGES.loading[locale]}</p>;
  if (classRole !== 'teacher') return <p>{MESSAGES.noAccess[locale]}</p>;
  if (!analytics) return <p>{MESSAGES.loading[locale]}</p>;

  const hasAnyScores = analytics.distribution.some((d) => d.scores.length > 0);

  return (
    <div>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}

      {!hasAnyScores ? (
        <p>{MESSAGES.noGradedWork[locale]}</p>
      ) : (
        <>
          <h3>{MESSAGES.distribution[locale]}</h3>
          <ul>
            {analytics.distribution.filter((d) => d.scores.length > 0).map((d) => {
              const avg = d.scores.reduce((s, v) => s + v, 0) / d.scores.length;
              return (
                <li key={d.assignmentId} data-testid="distribution-row">
                  {d.title} — <Bar fraction={avg} /> {Math.round(avg * 100)}%
                </li>
              );
            })}
          </ul>

          <h3>{MESSAGES.unitAverages[locale]}</h3>
          <ul>
            {analytics.unitAverages.map((u) => (
              <li key={`${u.courseCode}-${u.unitNo}`} data-testid="unit-average-row">
                {u.courseCode} Unit {u.unitNo} — <Bar fraction={u.averageScore} /> {Math.round(u.averageScore * 100)}%
              </li>
            ))}
          </ul>

          <h3>{MESSAGES.studentTrends[locale]}</h3>
          <ul>
            {analytics.trends.filter((t) => t.points.length > 0).map((t) => (
              <li key={t.studentId} data-testid="student-trend-row">
                {t.fullName ?? '(no name set)'} — {t.points.map((p) => `${Math.round(p.normalizedScore * 100)}%`).join(' → ')}
              </li>
            ))}
          </ul>
        </>
      )}

      <h3>{MESSAGES.atRisk[locale]}</h3>
      {analytics.atRiskStudents.length === 0 ? (
        <p>{MESSAGES.noAtRisk[locale]}</p>
      ) : (
        <ul>
          {analytics.atRiskStudents.map((s) => (
            <li
              key={s.studentId}
              data-testid="at-risk-student-row"
              title={atRiskReasonText(s, locale)}
            >
              {s.fullName ?? '(no name set)'} — <span data-testid="at-risk-reason">{atRiskReasonText(s, locale)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AnalyticsPage(): React.ReactElement {
  return (
    <Layout title="Analytics">
      <TeacherDashboardGuard>
        <main className="container auth-page margin-vert--lg">
          <AnalyticsContent />
        </main>
      </TeacherDashboardGuard>
    </Layout>
  );
}
