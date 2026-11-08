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
import { WelcomeCard, StatTile, ListCard } from '@site/src/components/ui';
import uiStyles from '@site/src/components/ui/ui.module.css';
import AchievementBadge from '@site/src/components/AchievementBadge';
import LoadingMark from '@site/src/components/ui/LoadingMark';

const statGrid = uiStyles.statGrid;

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
  hello: { en: 'Welcome back,', ur: 'خوش آمدید،' },
  nextUp: { en: 'Next up:', ur: 'اگلا کام:' },
  due: { en: 'due', ur: 'آخری تاریخ' },
  nothingDue: { en: 'Nothing is due right now. A good time to read ahead.', ur: 'ابھی کچھ واجب نہیں۔ آگے پڑھنے کا اچھا وقت ہے۔' },
  statClasses: { en: 'Classes this semester', ur: 'اس سمسٹر کی کلاسیں' },
  statDue: { en: 'Assignments to do', ur: 'باقی اسائنمنٹس' },
  statAverage: { en: 'Recent average', ur: 'حالیہ اوسط' },
  lastGrades: { en: (n: number) => `Across your last ${n} grades`, ur: (n: number) => `آپ کے آخری ${n} گریڈز کی اوسط` },
  statBadges: { en: 'Badges earned', ur: 'حاصل کردہ بیجز' },
  noBadges: { en: 'No badges yet. Your first comes with your first submission.', ur: 'ابھی کوئی بیج نہیں۔ پہلا بیج آپ کی پہلی جمع کرائی پر ملے گا۔' },
} as const;

function dueLabel(item: DueSoonItem, locale: 'en' | 'ur'): string | null {
  if (item.state === 'overdue-late-allowed') return MESSAGES.overdueLate[locale];
  if (item.state === 'closed') return MESSAGES.closed[locale];
  return null;
}

function formatDue(iso: string, locale: 'en' | 'ur'): string {
  return new Intl.DateTimeFormat(locale === 'ur' ? 'ur-PK' : 'en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit',
  }).format(new Date(iso));
}

const pct = (mark: number, max: number) => (max > 0 ? Math.round((mark / max) * 100) : 0);

function HomeContent(): React.ReactElement {
  const locale = useLocale();
  const { profile, displayName } = useAuth();
  const [semester, setSemester] = useState<CurrentSemesterResult | null>(null);
  const [dueSoon, setDueSoon] = useState<DueSoonItem[] | null>(null);
  const [recentGrades, setRecentGrades] = useState<GradeItem[] | null>(null);
  const [achievements, setAchievements] = useState<StudentAchievement[] | null>(null);
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
    setAchievements(achievementsRes.data ?? []);
    setLoaded(true);
  }, [profile, locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!loaded) return <LoadingMark label={MESSAGES.loading[locale]} />;

  if (error || !semester || !dueSoon || !recentGrades || !achievements) {
    return (
      <div className="work-panel" role="alert">
        <h1>{MESSAGES.title[locale]}</h1>
        <p>{error || MESSAGES.loadError[locale]}</p>
        <button className="button button--primary" onClick={() => void load()}>{MESSAGES.retry[locale]}</button>
      </div>
    );
  }

  const firstName = (displayName ?? '').split(/[\s@]/)[0];
  const next = dueSoon[0];
  const average = recentGrades.length
    ? Math.round(recentGrades.reduce((sum, g) => sum + pct(g.mark, g.maxMark), 0) / recentGrades.length)
    : null;

  // The welcome card names the one next step. "All caught up" appears once, in Due soon.
  const welcome = next
    ? { lead: `${MESSAGES.nextUp[locale]} ${next.assignment.title} · ${next.className}`, figure: formatDue(next.assignment.due_at, locale), figureLabel: MESSAGES.due[locale], action: { label: MESSAGES.openAssignment[locale], to: '/app/dashboard/assignments' } }
    : semester.classes.length === 0
      ? { lead: MESSAGES.noClasses[locale], action: { label: MESSAGES.joinClass[locale], to: '/app/dashboard/classes' } }
      : { lead: MESSAGES.nothingDue[locale], action: { label: MESSAGES.study[locale], to: '/' } };

  return (
    <div className="dashboard-home" dir={locale === 'ur' ? 'rtl' : 'ltr'}>
      <WelcomeCard
        title={firstName ? `${MESSAGES.hello[locale]} ${firstName}` : MESSAGES.title[locale]}
        lead={welcome.lead}
        figure={welcome.figure}
        figureLabel={welcome.figureLabel}
        action={welcome.action}
        art={<AchievementBadge id="full_course_coverage" earned size={140} />}
      />

      <div className={statGrid}>
        <StatTile icon="classes" tone="teal" label={MESSAGES.statClasses[locale]} value={semester.classes.length}
          hint={semester.currentSemester !== null ? `${MESSAGES.currentSemester[locale]}: ${semester.currentSemester}` : undefined} />
        <StatTile icon="assignment" tone="amber" label={MESSAGES.statDue[locale]} value={dueSoon.length} />
        <StatTile icon="grades" tone="green" label={MESSAGES.statAverage[locale]} value={average === null ? '-' : `${average}%`}
          hint={average === null ? MESSAGES.noGrades[locale] : MESSAGES.lastGrades[locale](recentGrades.length)} percent={average ?? undefined} />
        <StatTile icon="award" tone="plum" label={MESSAGES.statBadges[locale]} value={`${achievements.length} / ${Object.keys(ACHIEVEMENT_CATALOG).length}`} />
      </div>

      <div className="work-grid">
        <ListCard
          title={MESSAGES.dueSoon[locale]}
          id="home-due"
          empty={<p>{MESSAGES.allCaughtUp[locale]}</p>}
          rows={dueSoon.slice(0, 5).map((item) => ({
            key: item.assignment.id,
            testId: 'due-soon-item',
            icon: item.assignment.source_kind === 'quiz' ? 'quiz' : 'assignment',
            tone: item.state === 'closed' ? 'plum' : item.state === 'open' ? 'teal' : 'amber',
            title: item.assignment.title,
            subtitle: `${item.className} · ${formatDue(item.assignment.due_at, locale)}${dueLabel(item, locale) ? ` · ${dueLabel(item, locale)}` : ''}`,
            to: '/app/dashboard/assignments',
          }))}
          footer={<Link to="/app/dashboard/assignments">{MESSAGES.viewAllAssignments[locale]}</Link>}
        />
        <ListCard
          title={MESSAGES.recentGrades[locale]}
          id="home-grades"
          empty={<p>{MESSAGES.noGrades[locale]}</p>}
          rows={recentGrades.map((g, i) => ({
            key: `${g.kind}-${g.title}-${i}`,
            icon: g.kind === 'quiz' ? 'quiz' : 'grades',
            tone: 'green',
            title: g.title,
            subtitle: g.className,
            value: `${g.mark}/${g.maxMark}`,
            percent: pct(g.mark, g.maxMark),
          }))}
          footer={<Link to="/app/dashboard/grades">{MESSAGES.viewAllGrades[locale]}</Link>}
        />
        <ListCard
          title={MESSAGES.yourClasses[locale]}
          id="home-classes"
          empty={<p>{MESSAGES.noClasses[locale]}</p>}
          rows={semester.classes.map((row) => ({
            key: row.id,
            icon: 'classes',
            tone: 'blue',
            title: row.classes.name,
            subtitle: row.classes.course_code,
          }))}
          footer={<Link to="/app/dashboard/classes">{MESSAGES.joinClass[locale]}</Link>}
        />
        <ListCard
          title={MESSAGES.recentAchievement[locale]}
          id="home-badges"
          empty={<p>{MESSAGES.noBadges[locale]}</p>}
          rows={achievements.slice(0, 3).map((a) => ({
            key: a.id,
            icon: 'award',
            tone: 'plum',
            title: ACHIEVEMENT_CATALOG[a.achievement_key].title[locale],
            subtitle: new Date(a.earned_at).toLocaleDateString(locale === 'ur' ? 'ur-PK' : 'en-GB'),
          }))}
          footer={<Link to="/app/dashboard/achievements">{MESSAGES.viewAllAchievements[locale]}</Link>}
        />
      </div>
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
