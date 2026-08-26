import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TeacherDashboardGuard from '@site/src/components/TeacherDashboardGuard';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import { fetchStudentDrilldown, type StudentDrilldown } from '@site/src/lib/teacherAnalytics';

/**
 * Student drill-down (Spec 005, T041, FR-011) — one student's submissions,
 * grades, and unit-coverage fraction within one class the caller owns,
 * scoped via `useClassRole` (matching Spec 003's `roster.tsx`/`queue.tsx`
 * precedent). Unit coverage is computed independently of Spec 004's
 * `unit_progress` (research.md R3) — never read here.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load this student\'s record.', ur: 'اس طالب علم کا ریکارڈ لوڈ نہیں ہو سکا۔' },
  noAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  submissions: { en: 'Submissions', ur: 'جمع کرائے گئے کام' },
  grades: { en: 'Grades', ur: 'گریڈز' },
  quizAttempts: { en: 'Quiz attempts', ur: 'کوئز کی کوششیں' },
  unitCoverage: { en: 'Unit coverage', ur: 'یونٹ کوریج' },
  noSubmissions: { en: 'No submissions yet.', ur: 'ابھی تک کوئی جمع کرایا گیا کام نہیں۔' },
  noGrades: { en: 'No grades yet.', ur: 'ابھی تک کوئی گریڈ نہیں۔' },
  noQuizAttempts: { en: 'No quiz attempts yet.', ur: 'ابھی تک کوئی کوئز کی کوشش نہیں۔' },
} as const;

function StudentDrilldownContent(): React.ReactElement {
  const locale = useLocale();
  const classId = useQueryParam('classId');
  const studentId = useQueryParam('studentId');
  const { loading: classLoading, role: classRole } = useClassRole(classId);
  const [drilldown, setDrilldown] = useState<StudentDrilldown | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!classId || !studentId) return;
    const { data, error: loadError } = await fetchStudentDrilldown(classId, studentId);
    if (loadError) {
      setError(MESSAGES.loadError[locale]);
      return;
    }
    setDrilldown(data);
  }, [classId, studentId, locale]);

  useEffect(() => {
    if (classRole === 'teacher') load();
  }, [classRole, load]);

  if (classLoading) return <p>{MESSAGES.loading[locale]}</p>;
  if (classRole !== 'teacher') return <p>{MESSAGES.noAccess[locale]}</p>;
  if (!drilldown) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}

      <h3>{MESSAGES.unitCoverage[locale]}</h3>
      <p data-testid="unit-coverage-fraction">{Math.round(drilldown.unitCoverageFraction * 100)}%</p>

      <h3>{MESSAGES.submissions[locale]}</h3>
      {drilldown.submissions.length === 0 ? (
        <p>{MESSAGES.noSubmissions[locale]}</p>
      ) : (
        <ul>
          {drilldown.submissions.map((s) => (
            <li key={s.assignmentId} data-testid="drilldown-submission-row">
              {s.assignmentTitle} — {new Date(s.submittedAt).toLocaleString()} {s.late ? '(late)' : ''}
            </li>
          ))}
        </ul>
      )}

      <h3>{MESSAGES.grades[locale]}</h3>
      {drilldown.grades.length === 0 ? (
        <p>{MESSAGES.noGrades[locale]}</p>
      ) : (
        <ul>
          {drilldown.grades.map((g) => (
            <li key={g.assignmentId} data-testid="drilldown-grade-row">
              {g.assignmentTitle} — {g.mark}/{g.maxMark}
            </li>
          ))}
        </ul>
      )}

      <h3>{MESSAGES.quizAttempts[locale]}</h3>
      {drilldown.quizAttempts.length === 0 ? (
        <p>{MESSAGES.noQuizAttempts[locale]}</p>
      ) : (
        <ul>
          {drilldown.quizAttempts.map((qa) => (
            <li key={qa.assignmentId} data-testid="drilldown-quiz-row">
              {qa.assignmentTitle} — {qa.score} — {new Date(qa.attemptedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function StudentDrilldownPage(): React.ReactElement {
  return (
    <Layout title="Student record">
      <TeacherDashboardGuard>
        <main className="container auth-page margin-vert--lg">
          <StudentDrilldownContent />
        </main>
      </TeacherDashboardGuard>
    </Layout>
  );
}
