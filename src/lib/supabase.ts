import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase browser client (Spec 002, research.md R1).
 *
 * ⚠️ SSG SAFETY — do not "simplify" this into a module-level `createClient(...)`.
 * Docusaurus prerenders every page in Node during `npm run build`, where
 * `window` and `localStorage` do not exist. Constructing the client at module
 * scope makes the build fail with `window is not defined`. Spec 001 already lost
 * time to an SSG-vs-module-scope failure; this is the same class of bug.
 *
 * The client is therefore created lazily, on first use, in the browser only.
 *
 * Session behaviour is deliberately left to supabase-js defaults
 * (persistSession + autoRefreshToken, localStorage): FR-011a wants a long-lived,
 * auto-refreshing session that survives browser restarts, and the spec forbids
 * custom token storage. Do not hand-roll refresh logic.
 */

export type AuthConfig = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

let client: SupabaseClient | null = null;
let cachedConfig: AuthConfig | null = null;

/** True only in a real browser; false during SSG/SSR. */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

/**
 * Read auth config from Docusaurus `customFields`.
 *
 * `process.env` is NOT available in the browser bundle, which is why these
 * values are threaded through docusaurus.config.ts. Callers pass the values in
 * from `useDocusaurusContext()` so this module stays framework-agnostic and
 * testable.
 */
export function setAuthConfig(config: AuthConfig): void {
  // Re-configuring after the client exists would silently keep the old client.
  if (client && cachedConfig && (cachedConfig.supabaseUrl !== config.supabaseUrl)) {
    client = null;
  }
  cachedConfig = config;
}

/** Is auth configured? False in local dev before .env.local is filled in. */
export function isAuthConfigured(): boolean {
  return Boolean(cachedConfig?.supabaseUrl && cachedConfig?.supabaseAnonKey);
}

/**
 * Get the singleton client, or `null` when unavailable (during SSG, or before
 * config is supplied). Callers MUST handle null rather than assuming a client —
 * that is what keeps prerendering working.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isBrowser()) return null;
  if (!isAuthConfigured()) return null;
  if (client) return client;

  // Required lazily so the module graph does not pull supabase-js into the
  // server render path.
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { createClient } = require('@supabase/supabase-js');

  client = createClient(cachedConfig!.supabaseUrl, cachedConfig!.supabaseAnonKey, {
    auth: {
      persistSession: true,      // FR-011a — survives browser restarts
      autoRefreshToken: true,    // FR-011a — no re-prompt during normal use
      detectSessionInUrl: true,  // completes the OAuth redirect handshake
      flowType: 'pkce',
    },
  });

  return client;
}

/** Test seam: drop the memoised client. */
export function resetSupabaseForTests(): void {
  client = null;
  cachedConfig = null;
}
