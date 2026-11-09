import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import {
  fetchUngradedCountsByClass, fetchSoonestDueAssignments, fetchRecentActivity,
  type UngradedCount, type SoonestDueAssignment, type RecentActivityItem,
} from '@site/src/lib/teacherOverview';
import LoadingMark from '@site/src/components/ui/LoadingMark';
import { WelcomeCard, StatTile, ListCard } from '@site/src/components/ui';
import uiStyles from '@site/src/components/ui/ui.module.css';
import AchievementBadge from '@site/src/components/AchievementBadge';
import { useAuth } from '@site/src/contexts/AuthContext';
import NewsTicker from '@site/src/components/NewsTicker';

const statGrid = uiStyles.statGrid;

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
  nextWhenClear: {
    en: 'Review class activity or plan the next lesson.',
    ur: 'کلاس کی سرگرمی دیکھیں یا اگلے سبق کی منصوبہ بندی کریں۔',
  },
  noClasses: {
    en: 'You have no classes yet. Create one to get started.',
    ur: 'ابھی تک آپ کی کوئی کلاس نہیں ہے۔ شروع کرنے کے لیے ایک کلاس بنائیں۔',
  },
  manageClasses: { en: 'Manage your classes', ur: 'اپنی کلاسیں منظم کریں' },
  hello: { en: 'Welcome back,', ur: 'خوش آمدید،' },
  statClasses: { en: 'Classes you teach', ur: 'آپ کی کلاسیں' },
  nothingDue: { en: 'Nothing due soon.', ur: 'جلد کچھ واجب نہیں۔' },
  quickLinks: { en: 'Quick links', ur: 'فوری روابط' },
  analyticsLink: { en: 'Analytics', ur: 'تجزیات' },
  rosterLink: { en: 'Roster', ur: 'فہرست' },
  gradingLink: { en: 'Grading', ur: 'گریڈنگ' },
} as const;

function OverviewContent(): React.ReactElement {
  const locale = useLocale();
  const { displayName } = useAuth();
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

  if (!loaded) return <LoadingMark label={MESSAGES.loading[locale]} />;

  if (error || !ungraded || !soonestDue || !recentActivity) return <div className="work-panel" role="alert"><h1>{MESSAGES.title[locale]}</h1><p>{error || MESSAGES.loadError[locale]}</p><button className="button button--primary" onClick={() => void load()}>{MESSAGES.retry[locale]}</button></div>;

  const firstName = (displayName ?? '').split(/[\s@]/)[0];
  const greeting = firstName ? `${MESSAGES.hello[locale]} ${firstName}` : MESSAGES.title[locale];
  const fmt = (iso: string) => new Intl.DateTimeFormat(locale === 'ur' ? 'ur-PK' : 'en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit',
  }).format(new Date(iso));

  if (ungraded.length === 0) {
    return (
      <div className="dashboard-home" dir={locale === 'ur' ? 'rtl' : 'ltr'}>
        <WelcomeCard title={greeting} lead={MESSAGES.noClasses[locale]} action={{ label: MESSAGES.createClass[locale], to: '/app/classes' }} />
      </div>
    );
  }

  const totalUngraded = ungraded.reduce((sum, c) => sum + c.ungradedCount, 0);
  const caughtUp = totalUngraded === 0 && soonestDue.length === 0;
  const welcome = totalUngraded > 0
    ? { lead: MESSAGES.next[locale], figure: totalUngraded, figureLabel: MESSAGES.ungradedCount[locale], action: { label: MESSAGES.gradeNow[locale], to: '/app/classes/queue' } }
    : soonestDue.length > 0
      ? { lead: `${MESSAGES.soonestDue[locale]}: ${soonestDue[0].title}`, figure: fmt(soonestDue[0].dueAt), action: { label: MESSAGES.soonestDue[locale], to: '/app/classes/assignments' } }
      : { lead: MESSAGES.nextWhenClear[locale], action: { label: MESSAGES.manageClasses[locale], to: '/app/classes' } };

  const chips = (classId: string) => (
    <span className="row-actions">
      <Link className="chip-link" to={`/app/teacher/analytics?classId=${classId}`}>{MESSAGES.analyticsLink[locale]}</Link>
      <Link className="chip-link" to={`/app/classes/roster?classId=${classId}`}>{MESSAGES.rosterLink[locale]}</Link>
      <Link className="chip-link" to={`/app/classes/queue?classId=${classId}`}>{MESSAGES.gradingLink[locale]}</Link>
    </span>
  );

  return (
    <div className="dashboard-home" dir={locale === 'ur' ? 'rtl' : 'ltr'}>
      <WelcomeCard title={greeting} lead={welcome.lead} figure={welcome.figure} figureLabel={welcome.figureLabel} action={welcome.action}
        art={<AchievementBadge id="on_time_class_completion" earned size={140} />} />

      <div className={statGrid}>
        <StatTile icon="classes" tone="teal" label={MESSAGES.statClasses[locale]} value={ungraded.length} />
        <StatTile icon="queue" tone="amber" label={MESSAGES.ungradedByClass[locale]} value={totalUngraded} />
        <StatTile icon="calendar" tone="blue" label={MESSAGES.soonestDue[locale]} value={soonestDue.length} />
        <StatTile icon="history" tone="plum" label={MESSAGES.recentActivity[locale]} value={recentActivity.length} />
      </div>

      <div className="work-grid">
        <ListCard
          title={MESSAGES.ungradedByClass[locale]}
          id="teacher-ungraded"
          empty={<p>{MESSAGES.caughtUp[locale]}</p>}
          rows={caughtUp ? [] : ungraded.map((c) => ({
            key: c.classId,
            testId: 'ungraded-count-row',
            icon: 'classes',
            tone: c.ungradedCount > 0 ? 'amber' : 'teal',
            title: c.className,
            subtitle: `${c.ungradedCount} ${MESSAGES.ungradedCount[locale]}`,
            value: chips(c.classId),
          }))}
        />
        {!caughtUp && (
          <ListCard
            title={MESSAGES.soonestDue[locale]}
            id="teacher-due"
            empty={<p>{MESSAGES.nothingDue[locale]}</p>}
            rows={soonestDue.map((item) => ({
              key: item.id,
              testId: 'soonest-due-item',
              icon: 'calendar',
              tone: 'blue',
              title: item.title,
              subtitle: `${item.className} · ${fmt(item.dueAt)}`,
              to: `/app/teacher/analytics?classId=${item.classId}`,
            }))}
          />
        )}
        <ListCard
          title={MESSAGES.recentActivity[locale]}
          id="teacher-activity"
          empty={<p>{locale === 'ur' ? 'ابھی کوئی نئی سرگرمی نہیں۔' : 'No recent activity.'}</p>}
          rows={recentActivity.map((item) => ({
            key: `${item.kind}-${item.id}`,
            testId: 'recent-activity-item',
            icon: 'history',
            tone: 'plum',
            title: item.assignmentTitle,
            subtitle: `${item.className} · ${fmt(item.occurredAt)}`,
          }))}
        />
        <ListCard
          title={MESSAGES.quickLinks[locale]}
          id="teacher-links"
          empty={null}
          rows={[
            { key: 'classes', icon: 'classes', tone: 'teal', title: MESSAGES.manageClasses[locale], to: '/app/classes' },
            { key: 'quiz', icon: 'quiz', tone: 'amber', title: locale === 'ur' ? 'کوئز تیار کریں' : 'Author a quiz', to: '/app/teacher/quiz-authoring' },
            { key: 'log', icon: 'log', tone: 'green', title: locale === 'ur' ? 'تدریسی نوٹ لکھیں' : 'Record teaching', to: '/app/teacher/teaching-log' },
          ]}
        />
      </div>
    </div>
  );
}

export default function TeacherOverviewPage(): React.ReactElement {
  return (
    <Layout title="Teacher Dashboard">
      <AppDashboardShell role="teacher">
          <NewsTicker variant="card" />
          <OverviewContent />
      </AppDashboardShell>
    </Layout>
  );
}
