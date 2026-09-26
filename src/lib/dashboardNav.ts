/**
 * Dashboard navigation model (Spec 011, US1 / FR-004, FR-005).
 *
 * The left-side menu is a fixed part of the product, so it lives in code, not a table or a
 * config file. `AppDashboardShell` renders these lists and marks the active item with
 * `aria-current` by testing `activeMatch` against the current pathname.
 */

export type NavItem = {
  /** stable key for React lists + tests */
  key: string;
  label: { en: string; ur: string };
  /** target route (root-absolute, no locale prefix - Docusaurus <Link> adds it) */
  to: string;
  /** the item is "current" when the pathname matches this */
  activeMatch: RegExp;
};

export const studentNav: readonly NavItem[] = [
  { key: 'home', label: { en: 'Home', ur: 'ہوم' }, to: '/app/dashboard', activeMatch: /^\/app\/dashboard\/?$/ },
  { key: 'progress', label: { en: 'Progress', ur: 'پیش رفت' }, to: '/app/dashboard/progress', activeMatch: /^\/app\/dashboard\/progress/ },
  { key: 'assignments', label: { en: 'Assignments', ur: 'اسائنمنٹس' }, to: '/app/dashboard/assignments', activeMatch: /^\/app\/dashboard\/assignments/ },
  { key: 'grades', label: { en: 'Grades', ur: 'گریڈز' }, to: '/app/dashboard/grades', activeMatch: /^\/app\/dashboard\/grades/ },
  { key: 'achievements', label: { en: 'Achievements', ur: 'کامیابیاں' }, to: '/app/dashboard/achievements', activeMatch: /^\/app\/dashboard\/achievements/ },
  { key: 'notes', label: { en: 'Notes', ur: 'نوٹس' }, to: '/app/dashboard/notes', activeMatch: /^\/app\/dashboard\/notes/ },
  { key: 'classes', label: { en: 'My classes', ur: 'میری کلاسیں' }, to: '/app/dashboard/classes', activeMatch: /^\/app\/dashboard\/classes/ },
  { key: 'history', label: { en: 'History', ur: 'ماضی' }, to: '/app/dashboard/history', activeMatch: /^\/app\/dashboard\/history/ },
  { key: 'review', label: { en: 'Review content', ur: 'مواد کا جائزہ' }, to: '/app/reviewer/apply', activeMatch: /^\/app\/reviewer/ },
] as const;

export const teacherNav: readonly NavItem[] = [
  { key: 'overview', label: { en: 'Overview', ur: 'جائزہ' }, to: '/app/teacher', activeMatch: /^\/app\/teacher\/?$/ },
  { key: 'classes', label: { en: 'Classes', ur: 'کلاسیں' }, to: '/app/classes', activeMatch: /^\/app\/classes(\/(?!assignment).*)?$/ },
  { key: 'assignments', label: { en: 'Assignments', ur: 'اسائنمنٹس' }, to: '/app/classes/assignments', activeMatch: /^\/app\/classes\/assignments?(-|\/|$)/ },
  { key: 'grading', label: { en: 'Grading', ur: 'گریڈنگ' }, to: '/app/classes/queue', activeMatch: /^\/app\/classes\/queue/ },
  { key: 'analytics', label: { en: 'Analytics', ur: 'تجزیات' }, to: '/app/teacher/analytics', activeMatch: /^\/app\/teacher\/(analytics|student|class)/ },
  { key: 'quiz-authoring', label: { en: 'Quiz authoring', ur: 'کوئز تیاری' }, to: '/app/teacher/quiz-authoring', activeMatch: /^\/app\/teacher\/quiz-authoring/ },
  { key: 'teaching-log', label: { en: 'Teaching log', ur: 'تدریسی نوٹ بک' }, to: '/app/teacher/teaching-log', activeMatch: /^\/app\/teacher\/teaching-log/ },
  { key: 'feedback', label: { en: 'Feedback & suggestions', ur: 'رائے اور تجاویز' }, to: '/app/teacher/feedback-suggestions', activeMatch: /^\/app\/teacher\/feedback-suggestions/ },
  { key: 'review', label: { en: 'Review content', ur: 'مواد کا جائزہ' }, to: '/app/reviewer/apply', activeMatch: /^\/app\/reviewer/ },
] as const;

export function activeKey(items: readonly NavItem[], pathname: string): string | null {
  // strip a leading `/ur` locale segment so activeMatch stays locale-agnostic
  const p = pathname.replace(/^\/ur(?=\/|$)/, '') || '/';
  return items.find((it) => it.activeMatch.test(p))?.key ?? null;
}
