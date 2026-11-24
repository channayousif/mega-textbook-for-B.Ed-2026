/**
 * Whether the homepage sign-up banner was dismissed on this device. localStorage only,
 * like last-read: no table, no RLS policy and no privacy-notice change.
 *
 * The key carries a version. If the banner copy or purpose changes enough that readers
 * should see it again, bump `.v1` to `.v2`; the old value is then ignored.
 */
export const HOME_CTA_DISMISSED_KEY = 'home-cta.dismissed.v1';
export type HomeCtaDismissal = { at: number };

export function saveHomeCtaDismissed(): void {
  if (typeof window === 'undefined') return;
  try {
    const value: HomeCtaDismissal = { at: Date.now() };
    window.localStorage.setItem(HOME_CTA_DISMISSED_KEY, JSON.stringify(value));
  } catch { /* private window: not remembered */ }
}

export function readHomeCtaDismissed(): HomeCtaDismissal | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(HOME_CTA_DISMISSED_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed.at === 'number' ? parsed : null;
  } catch {
    return null;
  }
}
