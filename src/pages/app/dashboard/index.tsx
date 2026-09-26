import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { useAuth } from '@site/src/contexts/AuthContext';
import {
  fetchCurrentSemesterClasses, fetchDueSoon, fetchRecentGrades,
  type CurrentSemesterResult, type DueSoonItem, type GradeItem,
} from '@site/src/lib/dashboardQueries';
import { ACHIEVEMENT_CATALOG, fetchEarnedAchievements } from '@site/src/lib/achievements';
import type { StudentAchievement } from '@site/src/lib/types';

/**
 * Dashboard Home (Spec 004, T012/T040) - FR-002: current semester, enrolled
 * classes, due-soon assignments/quizzes (48h-first), and up to 5 recent
 * grades, all above the fold on a 360px screen. FR-009: also previews the
 * student's most recently earned achievement(s), added by T040.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  title: { en: 'Your learning dashboard', ur: 'آپ کا تعلیمی ڈیش بورڈ' },
  next: { en: 'Your next step', ur: 'اگلا قدم' },
  openAssignment: { en: 'Open assignments', ur: 'اسائنمنٹس کھولیں' },
  joinClass: { en: 'Join a class', ur: 'کلاس میں شامل ہوں' },
  study: { en: 'Explore courses', ur: 'کورسز دیکھیں' },
  retry: { en: 'Try again', ur: 'دوبارہ کوشش کریں' },
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load your dashboard.', ur: 'ڈیش بورڈ لوڈ نہیں ہو سکا۔' },
  currentSemester: { en: 'Current semester', ur: 'موجودہ سمسٹر' },
  yourClasses: { en: 'Your classes', ur: 'آپ کی کلاسیں' },
  noClasses: {
    en: 'You are not enrolled in any classes yet. Join one with a code from your teacher.',
    ur: 'آپ ابھی تک کسی کلاس میں شامل نہیں ہیں۔ اپنے استاد کے کوڈ سے کلاس میں شامل ہوں۔',
  },
  dueSoon: { en: 'Due soon', ur: 'جلد واجب' },
  allCaughtUp: { en: "You're all caught up - nothing due right now.", ur: 'آپ بالکل اپ ٹو ڈیٹ ہیں - ابھی کچھ بھی واجب نہیں۔' },
  recentGrades: { en: 'Recent grades', ur: 'حالیہ گریڈز' },
  noGrades: { en: 'No grades yet.', ur: 'ابھی تک کوئی گریڈ نہیں۔' },
  viewAllAssignments: { en: 'View all assignments', ur: 'تمام اسائنمنٹس دیکھیں' },
  viewAllGrades: { en: 'View all grades', ur: 'تمام گریڈز دیکھیں' },
  overdueLate: { en: 'Overdue (late accepted)', ur: 'وقت گزر گیا (تاخیر قبول)' },
  closed: { en: 'Closed', ur: 'بند' },
  recentAchievement: { en: 'Recently earned', ur: 'حال ہی میں حاصل کردہ' },
  viewAllAchievements: { en: 'View all achievements', ur: 'تمام کامیابیاں دیکھیں' },
} as const;

function dueLabel(item: DueSoonItem, locale: 'en' | 'ur'): string | null {
  if (item.state === 'overdue-late-allowed') return MESSAGES.overdueLate[locale];
  if (item.state === 'closed') return MESSAGES.closed[locale];
  return null;
}

function HomeContent(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [semester, setSemester] = useState<CurrentSemesterResult | null>(null);
  const [dueSoon, setDueSoon] = useState<DueSoonItem[] | null>(null);
  const [recentGrades, setRecentGrades] = useState<GradeItem[] | null>(null);
  const [recentAchievements, setRecentAchievements] = useState<StudentAchievement[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!profile) return;
    setError(null);
    const [semesterRes, dueSoonRes, gradesRes, achievementsRes] = await Promise.all([
      fetchCurrentSemesterClasses(profile.id),
      fetchDueSoon(profile.id, 48),
      fetchRecentGrades(profile.id, 5),
      fetchEarnedAchievements(),
    ]);
    if (semesterRes.error || dueSoonRes.error || gradesRes.error || achievementsRes.error) {
      setError(MESSAGES.loadError[locale]);
      setLoaded(true);
      return;
    }
    setSemester(semesterRes.data);
    setDueSoon(dueSoonRes.data ?? []);
    setRecentGrades(gradesRes.data ?? []);
    setRecentAchievements((achievementsRes.data ?? []).slice(0, 3));
    setLoaded(true);
  }, [profile, locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!loaded) return <p role="status">{MESSAGES.loading[locale]}</p>;

  if (error || !semester || !dueSoon || !recentGrades || !recentAchievements) return <div className="work-panel" role="alert"><h1>{MESSAGES.title[locale]}</h1><p>{error || MESSAGES.loadError[locale]}</p><button className="button button--primary" onClick={() => void load()}>{MESSAGES.retry[locale]}</button></div>;

  return (
    <div className="dashboard-home" dir={locale === 'ur' ? 'rtl' : 'ltr'}>
      <h1>{MESSAGES.title[locale]}</h1>
      <section className="work-panel work-panel--accent" aria-labelledby="student-next"><h2 id="student-next">{MESSAGES.next[locale]}</h2>
        {dueSoon.length > 0 ? <><p><strong>{dueSoon[0].assignment.title}</strong> | {dueSoon[0].className}</p><Link className="button button--primary" to="/app/dashboard/assignments">{MESSAGES.openAssignment[locale]}</Link></> :
          semester.classes.length === 0 ? <><p>{MESSAGES.noClasses[locale]}</p><Link className="button button--primary" to="/app/dashboard/classes">{MESSAGES.joinClass[locale]}</Link></> :
            <><p>{MESSAGES.allCaughtUp[locale]}</p><Link className="button button--primary" to="/">{MESSAGES.study[locale]}</Link></>}
      </section>
      <div className="work-grid">
      <section className="work-panel"><h2>{MESSAGES.dueSoon[locale]}</h2>
      {dueSoon.length === 0 ? (
        <p>{MESSAGES.allCaughtUp[locale]}</p>
      ) : (
        <ul>
          {dueSoon.slice(0, 5).map((item) => (
            <li key={item.assignment.id} data-testid="due-soon-item">
              {item.assignment.title} - {item.className} - {new Date(item.assignment.due_at).toLocaleString()}
              {dueLabel(item, locale) && ` (${dueLabel(item, locale)})`}
            </li>
          ))}
        </ul>
      )}
      <p><Link to="/app/dashboard/assignments">{MESSAGES.viewAllAssignments[locale]}</Link></p>
      </section>
      <section className="work-panel"><h2>{MESSAGES.currentSemester[locale]}{semester.currentSemester !== null ? `: ${semester.currentSemester}` : ''}</h2>
      <h3>{MESSAGES.yourClasses[locale]}</h3>
      {semester.classes.length === 0 ? <p>{MESSAGES.noClasses[locale]}</p> : <ul>{semester.classes.map(row => <li key={row.id}>{row.classes.name} | {row.classes.course_code}</li>)}</ul>}
      <p><Link to="/app/dashboard/classes">{MESSAGES.joinClass[locale]}</Link></p></section>
      <section className="work-panel"><h2>{MESSAGES.recentGrades[locale]}</h2>
      {recentGrades.length === 0 ? (
        <p>{MESSAGES.noGrades[locale]}</p>
      ) : (
        <ul>
          {recentGrades.map((g, i) => (
            <li key={`${g.kind}-${g.title}-${i}`}>{g.title} - {g.className} - {g.mark}/{g.maxMark}</li>
          ))}
        </ul>
      )}
      <p><Link to="/app/dashboard/grades">{MESSAGES.viewAllGrades[locale]}</Link></p>
      </section>
      <section className="work-panel"><h2>{MESSAGES.recentAchievement[locale]}</h2>
      {recentAchievements.length > 0 && (
        <>
          <ul>
            {recentAchievements.map((a) => (
              <li key={a.id}>{ACHIEVEMENT_CATALOG[a.achievement_key].title[locale]}</li>
            ))}
          </ul>
        </>
      )}
      {recentAchievements.length === 0 && <p>{locale === 'ur' ? 'ابھی کوئی کامیابی نہیں۔' : 'No achievements yet.'}</p>}
      <p><Link to="/app/dashboard/achievements">{MESSAGES.viewAllAchievements[locale]}</Link></p>
      </section></div>
    </div>
  );
}

export default function DashboardHomePage(): React.ReactElement {
  return (
    <Layout title="Dashboard">
      <AppDashboardShell role="student">
          <HomeContent />
      </AppDashboardShell>
    </Layout>
  );
}
