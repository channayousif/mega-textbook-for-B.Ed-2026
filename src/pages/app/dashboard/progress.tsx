import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StudentDashboardGuard from '@site/src/components/StudentDashboardGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { fetchCurrentSemesterClasses } from '@site/src/lib/dashboardQueries';
import {
  fetchOwnUnitProgress, fetchTotalUnitsForCourses, fetchUnitNumbersForCourse, markUnitStudied,
} from '@site/src/lib/unitProgress';
import { checkFullCoverageAchievement } from '@site/src/lib/achievements';

/**
 * Progress area (Spec 004, T020/T024/T041, FR-005/FR-006). Per-course
 * coverage fraction (CSS-only bar, research.md R7 - no charting dependency)
 * plus a semester-level figure for the share of enrolled courses with any
 * recorded progress. A "Mark as studied" control appears per not-yet-covered
 * unit (T024); reaching 100% for a course triggers the full-coverage
 * achievement check (T041).
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load progress.', ur: 'پیش رفت لوڈ نہیں ہو سکی۔' },
  markError: { en: 'Could not mark this unit studied.', ur: 'اس یونٹ کو پڑھا ہوا نشان زد نہیں کیا جا سکا۔' },
  title: { en: 'Progress', ur: 'پیش رفت' },
  noProgress: {
    en: 'Nothing covered yet. Complete a graded item, a quiz, or mark a unit studied to see progress here.',
    ur: 'ابھی تک کچھ بھی مکمل نہیں ہوا۔ پیش رفت دیکھنے کے لیے کوئی گریڈڈ کام، کوئز مکمل کریں یا کسی یونٹ کو پڑھا ہوا نشان زد کریں۔',
  },
  semesterFigure: { en: 'Courses with any progress', ur: 'کچھ پیش رفت والے کورسز' },
  units: { en: 'units', ur: 'یونٹس' },
  unit: { en: 'Unit', ur: 'یونٹ' },
  studied: { en: 'Studied', ur: 'پڑھا ہوا' },
  markStudied: { en: 'Mark as studied', ur: 'پڑھا ہوا نشان زد کریں' },
} as const;

export type CourseCoverage = { courseCode: string; covered: Set<number>; total: number; unitNumbers: number[] };

function CoverageBar({ covered, total }: { covered: number; total: number }): React.ReactElement {
  const pct = total > 0 ? Math.min(100, Math.round((covered / total) * 100)) : 0;
  return (
    <div
      style={{
        background: 'var(--ifm-color-emphasis-200)', borderRadius: 4, height: 10, width: '100%', overflow: 'hidden',
      }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div style={{ background: 'var(--ifm-color-primary)', height: '100%', width: `${pct}%` }} />
    </div>
  );
}

function CourseRow({
  course, locale, studentId, onMarked,
}: {
  course: CourseCoverage;
  locale: 'en' | 'ur';
  studentId: string;
  onMarked: (courseCode: string, unitNo: number) => void;
}): React.ReactElement {
  const [pendingUnit, setPendingUnit] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleMark(unitNo: number): Promise<void> {
    setPendingUnit(unitNo);
    const { error: markError } = await markUnitStudied(studentId, course.courseCode, unitNo);
    setPendingUnit(null);
    if (markError) {
      setError(MESSAGES.markError[locale]);
      return;
    }
    onMarked(course.courseCode, unitNo);
    // T041 - reaching 100% coverage for this course checks the achievement;
    // the server recomputes the numerator authoritatively, only p_total_units
    // crosses the client/server boundary (research.md R2).
    if (course.covered.size + 1 >= course.total && course.total > 0) {
      await checkFullCoverageAchievement(course.courseCode, course.total);
    }
  }

  return (
    <li data-testid="course-progress" style={{ marginBottom: '1.5rem' }}>
      <div>{course.courseCode} - {course.covered.size} / {course.total} {MESSAGES.units[locale]}</div>
      <CoverageBar covered={course.covered.size} total={course.total} />
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
        {course.unitNumbers.map((unitNo) => {
          const isCovered = course.covered.has(unitNo);
          return (
            <li key={unitNo}>
              {isCovered ? (
                <span>{MESSAGES.unit[locale]} {unitNo}: {MESSAGES.studied[locale]}</span>
              ) : (
                <button
                  type="button"
                  className="button button--sm button--secondary"
                  disabled={pendingUnit !== null}
                  onClick={() => handleMark(unitNo)}
                >
                  {MESSAGES.unit[locale]} {unitNo} - {MESSAGES.markStudied[locale]}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </li>
  );
}

function ProgressContent(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [coverage, setCoverage] = useState<CourseCoverage[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!profile) return;
    const [classesRes, progressRes] = await Promise.all([
      fetchCurrentSemesterClasses(profile.id),
      fetchOwnUnitProgress(),
    ]);
    if (classesRes.error || progressRes.error) {
      setError(MESSAGES.loadError[locale]);
      return;
    }
    const enrolledCourseCodes = Array.from(new Set(classesRes.data!.classes.map((c) => c.classes.course_code)));
    const [totals, unitNumbersByCoourse] = await Promise.all([
      fetchTotalUnitsForCourses(enrolledCourseCodes),
      Promise.all(enrolledCourseCodes.map((code) => fetchUnitNumbersForCourse(code))),
    ]);
    const coveredByCoourse = new Map<string, Set<number>>();
    for (const row of progressRes.data ?? []) {
      const set = coveredByCoourse.get(row.course_code) ?? new Set<number>();
      set.add(row.unit_no);
      coveredByCoourse.set(row.course_code, set);
    }
    const result: CourseCoverage[] = enrolledCourseCodes.map((code, i) => ({
      courseCode: code,
      covered: coveredByCoourse.get(code) ?? new Set<number>(),
      total: totals[code] ?? 0,
      unitNumbers: unitNumbersByCoourse[i],
    }));
    setCoverage(result);

    // T041 - check the full-coverage achievement for any course already at
    // 100% on load (not only right after a self-mark action below); the RPC
    // is idempotent (ON CONFLICT DO NOTHING server-side), so calling it again
    // for an already-granted course is harmless.
    await Promise.all(
      result
        .filter((c) => c.total > 0 && c.covered.size >= c.total)
        .map((c) => checkFullCoverageAchievement(c.courseCode, c.total)),
    );
  }, [profile, locale]);

  useEffect(() => {
    load();
  }, [load]);

  function handleMarked(courseCode: string, unitNo: number): void {
    setCoverage((prev) => prev?.map((c) => (
      c.courseCode === courseCode ? { ...c, covered: new Set([...c.covered, unitNo]) } : c
    )) ?? null);
  }

  if (!coverage || !profile) return <p>{MESSAGES.loading[locale]}</p>;

  const withProgress = coverage.filter((c) => c.covered.size > 0).length;

  return (
    <div>
      <h2>{MESSAGES.title[locale]}</h2>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      {coverage.every((c) => c.covered.size === 0) ? (
        <p>{MESSAGES.noProgress[locale]}</p>
      ) : null}
      {coverage.length > 0 && (
        <p>{MESSAGES.semesterFigure[locale]}: {withProgress} / {coverage.length}</p>
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {coverage.map((c) => (
          <CourseRow key={c.courseCode} course={c} locale={locale} studentId={profile.id} onMarked={handleMarked} />
        ))}
      </ul>
    </div>
  );
}

export default function DashboardProgressPage(): React.ReactElement {
  return (
    <Layout title="Progress">
      <StudentDashboardGuard>
        <main className="container auth-page margin-vert--lg">
          <ProgressContent />
        </main>
      </StudentDashboardGuard>
    </Layout>
  );
}
