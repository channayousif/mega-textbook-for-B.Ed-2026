/**
 * Dashboard navigation model (Spec 011, US1 / FR-004, FR-005).
 *
 * The left-side menu is a fixed part of the product, so it lives in code, not a table or a
 * config file. `AppDashboardShell` renders these lists and marks the active item with
 * `aria-current` by testing `activeMatch` against the current pathname.
 */

import type { IconName } from '../components/icons/paths';

export type NavItem = {
  /** stable key for React lists + tests */
  key: string;
  label: { en: string; ur: string };
  /** target route (root-absolute, no locale prefix - Docusaurus <Link> adds it) */
  to: string;
  /** the item is "current" when the pathname matches this */
  activeMatch: RegExp;
  /** icon from the site icon pack, drawn beside the label */
  icon?: IconName;
};

export const studentNav: readonly NavItem[] = [
  { key: 'home', label: { en: 'Home', ur: 'ہوم' }, to: '/app/dashboard', activeMatch: /^\/app\/dashboard\/?$/, icon: 'home' },
  { key: 'progress', label: { en: 'Progress', ur: 'پیش رفت' }, to: '/app/dashboard/progress', activeMatch: /^\/app\/dashboard\/progress/, icon: 'progress' },
  { key: 'assignments', label: { en: 'Assignments', ur: 'اسائنمنٹس' }, to: '/app/dashboard/assignments', activeMatch: /^\/app\/dashboard\/assignments/, icon: 'assignment' },
  { key: 'grades', label: { en: 'Grades', ur: 'گریڈز' }, to: '/app/dashboard/grades', activeMatch: /^\/app\/dashboard\/grades/, icon: 'grades' },
  { key: 'achievements', label: { en: 'Achievements', ur: 'کامیابیاں' }, to: '/app/dashboard/achievements', activeMatch: /^\/app\/dashboard\/achievements/, icon: 'award' },
  { key: 'notes', label: { en: 'Notes', ur: 'نوٹس' }, to: '/app/dashboard/notes', activeMatch: /^\/app\/dashboard\/notes/, icon: 'notes' },
  { key: 'classes', label: { en: 'My classes', ur: 'میری کلاسیں' }, to: '/app/dashboard/classes', activeMatch: /^\/app\/dashboard\/classes/, icon: 'classes' },
  { key: 'history', label: { en: 'History', ur: 'ماضی' }, to: '/app/dashboard/history', activeMatch: /^\/app\/dashboard\/history/, icon: 'history' },
  { key: 'review', label: { en: 'Review content', ur: 'مواد کا جائزہ' }, to: '/app/reviewer/apply', activeMatch: /^\/app\/reviewer/, icon: 'review' },
] as const;

export const teacherNav: readonly NavItem[] = [
  { key: 'overview', label: { en: 'Overview', ur: 'جائزہ' }, to: '/app/teacher', activeMatch: /^\/app\/teacher\/?$/, icon: 'overview' },
  { key: 'classes', label: { en: 'Classes', ur: 'کلاسیں' }, to: '/app/classes', activeMatch: /^\/app\/classes(\/(?!assignment).*)?$/, icon: 'classes' },
  { key: 'assignments', label: { en: 'Assignments', ur: 'اسائنمنٹس' }, to: '/app/classes/assignments', activeMatch: /^\/app\/classes\/assignments?(-|\/|$)/, icon: 'assignment' },
  { key: 'grading', label: { en: 'Grading', ur: 'گریڈنگ' }, to: '/app/classes/queue', activeMatch: /^\/app\/classes\/queue/, icon: 'queue' },
  { key: 'analytics', label: { en: 'Analytics', ur: 'تجزیات' }, to: '/app/teacher/analytics', activeMatch: /^\/app\/teacher\/(analytics|student|class)/, icon: 'analytics' },
  { key: 'quiz-authoring', label: { en: 'Quiz authoring', ur: 'کوئز تیاری' }, to: '/app/teacher/quiz-authoring', activeMatch: /^\/app\/teacher\/quiz-authoring/, icon: 'quiz' },
  { key: 'teaching-log', label: { en: 'Teaching log', ur: 'تدریسی نوٹ بک' }, to: '/app/teacher/teaching-log', activeMatch: /^\/app\/teacher\/teaching-log/, icon: 'log' },
  { key: 'feedback', label: { en: 'Feedback & suggestions', ur: 'رائے اور تجاویز' }, to: '/app/teacher/feedback-suggestions', activeMatch: /^\/app\/teacher\/feedback-suggestions/, icon: 'feedback' },
  { key: 'review', label: { en: 'Review content', ur: 'مواد کا جائزہ' }, to: '/app/reviewer/apply', activeMatch: /^\/app\/reviewer/, icon: 'review' },
] as const;

export function activeKey(items: readonly NavItem[], pathname: string): string | null {
  // strip a leading `/ur` locale segment so activeMatch stays locale-agnostic
  const p = pathname.replace(/^\/ur(?=\/|$)/, '') || '/';
  return items.find((it) => it.activeMatch.test(p))?.key ?? null;
}

/** Admin console pages (src/pages/app/admin/), in the order of the admin hub. */
export const adminNav: readonly NavItem[] = [
  { key: 'admin-home', label: { en: 'Console', ur: 'کنسول' }, to: '/app/admin/', activeMatch: /^\/app\/admin\/?$/, icon: 'overview' },
  { key: 'users', label: { en: 'Users and roles', ur: 'صارفین اور کردار' }, to: '/app/admin/users', activeMatch: /^\/app\/admin\/users/, icon: 'users' },
  { key: 'records', label: { en: 'Class records', ur: 'کلاسوں کا ریکارڈ' }, to: '/app/admin/records', activeMatch: /^\/app\/admin\/records/, icon: 'records' },
  { key: 'reviewers', label: { en: 'Reviewers', ur: 'جائزہ کار' }, to: '/app/admin/reviewers', activeMatch: /^\/app\/admin\/reviewers/, icon: 'shield' },
  { key: 'g3-signoff', label: { en: 'G3 sign-off', ur: 'جی تھری منظوری' }, to: '/app/admin/g3-signoff', activeMatch: /^\/app\/admin\/g3-signoff/, icon: 'signoff' },
  { key: 'review-decisions', label: { en: 'Review decisions', ur: 'جائزے کے فیصلے' }, to: '/app/admin/review-decisions', activeMatch: /^\/app\/admin\/review-decisions/, icon: 'review' },
  { key: 'feedback-queue', label: { en: 'Reader feedback', ur: 'قارئین کی رائے' }, to: '/app/admin/feedback-queue', activeMatch: /^\/app\/admin\/feedback-queue/, icon: 'feedback' },
  { key: 'suggestions', label: { en: 'Suggestions', ur: 'تجاویز' }, to: '/app/admin/suggestions', activeMatch: /^\/app\/admin\/suggestions/, icon: 'suggest' },
  { key: 'news', label: { en: 'News', ur: 'خبریں' }, to: '/app/admin/news', activeMatch: /^\/app\/admin\/news/, icon: 'megaphone' },
  { key: 'content-status', label: { en: 'Content status', ur: 'مواد کی صورتحال' }, to: '/app/admin/overview', activeMatch: /^\/app\/admin\/overview/, icon: 'analytics' },
  { key: 'agent-jobs', label: { en: 'Agent jobs', ur: 'ایجنٹ کے کام' }, to: '/app/admin/agent-jobs', activeMatch: /^\/app\/admin\/agent-jobs/, icon: 'jobs' },
  { key: 'audit', label: { en: 'Privilege audit', ur: 'اختیارات کا ریکارڈ' }, to: '/app/admin/audit', activeMatch: /^\/app\/admin\/(audit|feedback\/?$)/, icon: 'audit' },
] as const;

/** Reviewer tools, shown to accounts with the reviewer capability. */
export const reviewerNav: readonly NavItem[] = [
  { key: 'workbench', label: { en: 'Review workbench', ur: 'جائزے کی میز' }, to: '/app/reviewer/workbench', activeMatch: /^\/app\/reviewer\/workbench/, icon: 'review' },
  { key: 'review-queue', label: { en: 'Formal review queue', ur: 'باقاعدہ جائزے کی قطار' }, to: '/app/admin/review-queue', activeMatch: /^\/app\/admin\/review-queue/, icon: 'queue' },
] as const;

export const accountNav: readonly NavItem[] = [
  { key: 'profile', label: { en: 'Your account', ur: 'آپ کا اکاؤنٹ' }, to: '/app/profile', activeMatch: /^\/app\/profile/, icon: 'settings' },
] as const;

export type NavSection = { key: string; label: { en: string; ur: string }; items: readonly NavItem[] };

/**
 * The sidebar for one signed-in user (redesign, 2026-11-08): grouped sections chosen
 * from the account's role and capabilities, so every /app page shares one menu. A
 * reviewer keeps the "Review content" apply link out of their learn/teach list.
 */
export function navSections(opts: { role: string | null; reviewer: boolean }): NavSection[] {
  const { role, reviewer } = opts;
  const withoutApply = (items: readonly NavItem[]) => (reviewer ? items.filter((i) => i.key !== 'review') : items);
  const sections: NavSection[] = [];
  if (role === 'student') sections.push({ key: 'learn', label: { en: 'Learn', ur: 'سیکھیں' }, items: withoutApply(studentNav) });
  if (role === 'teacher') sections.push({ key: 'teach', label: { en: 'Teach', ur: 'پڑھائیں' }, items: withoutApply(teacherNav) });
  if (role === 'admin') sections.push({ key: 'manage', label: { en: 'Manage', ur: 'انتظام' }, items: adminNav });
  if (reviewer) sections.push({ key: 'review', label: { en: 'Review', ur: 'جائزہ' }, items: reviewerNav });
  sections.push({ key: 'account', label: { en: 'Account', ur: 'اکاؤنٹ' }, items: accountNav });
  return sections;
}

/** The current item's key across all sections; the most specific match wins. */
export function activeKeyIn(sections: readonly NavSection[], pathname: string): string | null {
  const p = pathname.replace(/^\/ur(?=\/|$)/, '') || '/';
  let best: NavItem | null = null;
  for (const s of sections) for (const it of s.items) {
    if (it.activeMatch.test(p) && (!best || it.to.length > best.to.length)) best = it;
  }
  return best?.key ?? null;
}
