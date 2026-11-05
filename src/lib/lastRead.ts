/**
 * The last page read, kept only in this browser's localStorage, like the reading
 * preferences. Nothing is sent to Supabase, so there is no new table, RLS policy or
 * privacy notice change. The head script in docusaurus.config.ts reads the same key.
 */
export const LAST_READ_KEY = 'last-read';
export type LastRead = { url: string; title: string };

export function saveLastRead(value: LastRead): void {
  try {
    window.localStorage.setItem(LAST_READ_KEY, JSON.stringify(value));
  } catch { /* private window: not remembered */ }
}

export function readLastRead(): LastRead | null {
  try {
    const raw = window.localStorage.getItem(LAST_READ_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed.url === 'string' && parsed.url.startsWith('/') && typeof parsed.title === 'string' ? parsed : null;
  } catch {
    return null;
  }
}
