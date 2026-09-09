import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { useAuth } from '@site/src/contexts/AuthContext';
import { fetchCurrentSemesterClasses } from '@site/src/lib/dashboardQueries';
import {
  fetchOwnUnitProgress, fetchTotalUnitsForCourses, fetchUnitNumbersForCourse, markUnitStudied,
} from '@site/src/lib/unitProgress';
import { checkFullCoverageAchievement } from '@site/src/lib/achievements';
import { fetchContentIndex } from '@site/src/lib/assignments';
import { fetchOwnChecksForCourses } from '@site/src/lib/selfAssessment';

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
  selfAssessmentTitle: { en: 'Self-assessment checklists', ur: 'خود جانچ کی فہرستیں' },
  selfAssessmentEmpty: {
    en: 'No self-assessment checklists ticked yet.',
    ur: 'ابھی تک کوئی خود جانچ کی فہرست نشان زد نہیں کی گئی۔',
  },
  selfAssessmentComplete: {
    en: 'Every checklist item in this unit is ticked.',
    ur: 'اس یونٹ کی تمام فہرست کی اشیاء نشان زد ہیں۔',
  },
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

type UnitFraction = { courseCode: string; unitNo: number; ticked: number; total: number };

/**
 * FR-004 - self-assessment roll-up, visually SEPARATE from the unit-coverage panel above
 * (a topic's checklist completion is independent of unit_progress - FR-005, `/sp.analyze`
 * finding G2). Derives each topic's item count from content-index.json's
 * self_assessment_count (research.md R5), never hand-maintained here.
 */
function SelfAssessmentPanel({
  courseCodes, locale, studentId, onMarked,
}: {
  courseCodes: string[];
  locale: 'en' | 'ur';
  studentId: string;
  onMarked: (courseCode: string, unitNo: number) => void;
}): React.ReactElement | null {
  const [units, setUnits] = useState<UnitFraction[] | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [pendingUnit, setPendingUnit] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (courseCodes.length === 0) {
      setUnits([]);
      return;
    }
    const [entries, checksRes] = await Promise.all([
      fetchContentIndex(),
      fetchOwnChecksForCourses(courseCodes),
    ]);
    const checks = checksRes.data ?? [];
    const tickedPositions = new Map<string, Set<number>>(); // "course|unit|topic" -> ticked positions
    for (const c of checks) {
      if (c.locale !== locale || !c.checked) continue;
      const key = `${c.course_code}|${c.unit_no}|${c.topic_no}`;
      if (!tickedPositions.has(key)) tickedPositions.set(key, new Set());
      tickedPositions.get(key)!.add(c.item_position);
    }

    const byUnit = new Map<string, { ticked: number; total: number }>();
    for (const entry of entries) {
      if (entry.kind !== 'topic' || !courseCodes.includes(entry.course_code)) continue;
      const count = entry.self_assessment_count ?? 0;
      if (count === 0) continue;
      const key = `${entry.course_code}|${entry.unit_no}|${entry.topic_no}`;
      const ticked = Math.min(tickedPositions.get(key)?.size ?? 0, count);
      const unitKey = `${entry.course_code}|${entry.unit_no}`;
      const prev = byUnit.get(unitKey) ?? { ticked: 0, total: 0 };
      byUnit.set(unitKey, { ticked: prev.ticked + ticked, total: prev.total + count });
    }

    const result: UnitFraction[] = Array.from(byUnit.entries()).map(([key, v]) => {
      const [courseCode, unitNo] = key.split('|');
      return { courseCode, unitNo: Number(unitNo), ticked: v.ticked, total: v.total };
    });
    setUnits(result);
  }, [courseCodes, locale]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleMark(courseCode: string, unitNo: number): Promise<void> {
    const key = `${courseCode}|${unitNo}`;
    setPendingUnit(key);
    const { error } = await markUnitStudied(studentId, courseCode, unitNo);
    setPendingUnit(null);
    if (!error) {
      setDismissed((prev) => new Set(prev).add(key));
      onMarked(courseCode, unitNo);
    }
  }

  if (units === null) return null;
  const withProgress = units.filter((u) => u.total > 0 && u.ticked > 0);

  return (
    <section className="margin-top--lg" data-testid="self-assessment-progress-panel">
      <h3>{MESSAGES.selfAssessmentTitle[locale]}</h3>
      {withProgress.length === 0 ? (
        <p>{MESSAGES.selfAssessmentEmpty[locale]}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {withProgress.map((u) => {
            const key = `${u.courseCode}|${u.unitNo}`;
            const complete = u.ticked >= u.total && u.total > 0;
            return (
              <li key={key} data-testid="self-assessment-unit-fraction" style={{ marginBottom: '1rem' }}>
                <div>{u.courseCode} - {MESSAGES.unit[locale]} {u.unitNo}: {u.ticked} / {u.total}</div>
                <CoverageBar covered={u.ticked} total={u.total} />
                {complete && !dismissed.has(key) && (
                  <div className="margin-top--sm">
                    <p>{MESSAGES.selfAssessmentComplete[locale]}</p>
                    <button
                      type="button"
                      className="button button--sm button--secondary"
                      disabled={pendingUnit === key}
                      onClick={() => handleMark(u.courseCode, u.unitNo)}
                    >
                      {MESSAGES.markStudied[locale]}
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
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
      <SelfAssessmentPanel
        courseCodes={coverage.map((c) => c.courseCode)}
        locale={locale}
        studentId={profile.id}
        onMarked={handleMarked}
      />
    </div>
  );
}

export default function DashboardProgressPage(): React.ReactElement {
  return (
    <Layout title="Progress">
      <AppDashboardShell role="student">
          <ProgressContent />
      </AppDashboardShell>
    </Layout>
  );
}
