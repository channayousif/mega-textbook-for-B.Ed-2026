/**
 * Return-to-origin redirect handling (Spec 002, FR-013).
 *
 * A user who clicks "Sign in" from any content page should land back on that
 * same page after authenticating, not on a generic /app/ landing page. The
 * origin travels as a `next` query param rather than sessionStorage so it also
 * survives the OAuth redirect round-trip (Google → GoTrue → back to the site,
 * a different tab context in some browsers).
 */

const DEFAULT_RETURN_TO = '/';

/** Build a login/signup URL carrying the current page as `next`. */
export function loginUrlWithReturnTo(currentPath: string, target: 'login' | 'signup' = 'login'): string {
  const next = encodeURIComponent(currentPath || DEFAULT_RETURN_TO);
  return `/app/${target}?next=${next}`;
}

/** Read `next` from the current URL, falling back to `/` for any unsafe value. */
export function getReturnTo(search: string): string {
  const params = new URLSearchParams(search);
  const next = params.get('next');
  if (!next) return DEFAULT_RETURN_TO;
  // Only ever redirect within this site - an absolute or protocol-relative
  // `next` would be an open-redirect vector.
  if (!next.startsWith('/') || next.startsWith('//')) return DEFAULT_RETURN_TO;
  return next;
}

/** Build the OAuth `redirectTo` URL, threading `next` through the callback. */
export function oauthRedirectTo(search: string): string {
  if (typeof window === 'undefined') return '';
  const next = getReturnTo(search);
  return `${window.location.origin}/app/login?next=${encodeURIComponent(next)}`;
}
