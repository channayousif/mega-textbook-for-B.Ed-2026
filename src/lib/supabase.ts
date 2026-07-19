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
 *
 * ⚠️ T060 (2026-07-19) — `getSupabase()` is async and uses a dynamic
 * `import()`, not `require()`. `require()` is a *synchronous* call, so webpack
 * bundles `@supabase/supabase-js` directly into `main.js` — every content page
 * paid for it, measured at +59.6 KB gzip, 4.1 KB over the Art. V.5 budget
 * (PHR 0011). Dynamic `import()` lets webpack code-split it into its own chunk,
 * fetched only when a page actually calls `getSupabase()` — i.e. only on
 * `/app/*` pages. Callers MUST `await` it now; every call site already lived
 * inside an async function or effect, so this was mechanical everywhere except
 * `AuthContext`'s and `reset.tsx`'s `useEffect`s, which need the standard
 * async-setup/sync-cleanup pattern (see their own comments).
 */

export type AuthConfig = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

let client: SupabaseClient | null = null;
let clientPromise: Promise<SupabaseClient> | null = null;
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
    clientPromise = null;
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
 *
 * Async since T060 — dynamic `import()` is what lets webpack code-split
 * supabase-js out of every content page's bundle (see file header). Caches
 * the in-flight promise, not just the resolved client, so concurrent callers
 * (e.g. AuthContext's effect and a page's own effect both mounting at once)
 * share one import and one client rather than racing to construct two.
 */
export async function getSupabase(): Promise<SupabaseClient | null> {
  if (!isBrowser()) return null;
  if (!isAuthConfigured()) return null;
  if (client) return client;

  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) => {
      const created = createClient(cachedConfig!.supabaseUrl, cachedConfig!.supabaseAnonKey, {
        auth: {
          persistSession: true,      // FR-011a — survives browser restarts
          autoRefreshToken: true,    // FR-011a — no re-prompt during normal use
          detectSessionInUrl: true,  // completes the OAuth redirect handshake
          flowType: 'pkce',
        },
      });
      client = created;
      return created;
    });
  }

  return clientPromise;
}

/** Test seam: drop the memoised client. */
export function resetSupabaseForTests(): void {
  client = null;
  clientPromise = null;
  cachedConfig = null;
}
