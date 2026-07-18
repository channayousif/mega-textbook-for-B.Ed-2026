import React, {
  createContext, useContext, useEffect, useMemo, useState, useCallback,
} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { Session } from '@supabase/supabase-js';
import { getSupabase, setAuthConfig, isAuthConfigured, isBrowser } from '@site/src/lib/supabase';

/**
 * Site-wide auth state (Spec 002, FR-011).
 *
 * Mounted once by src/theme/Root.tsx so a single session spans textbook pages
 * and /app pages alike.
 *
 * ⚠️ ROLE IS READ FROM `profiles`, NOT FROM A JWT CLAIM (research.md R2).
 * Do not "optimise" this into a token claim. FR-011a gives sessions a long,
 * auto-refreshing life; a role baked into the token would stay stale until the
 * token rotated — potentially days — which breaks FR-008's guarantee that an
 * admin's change applies by the user's next visit. tests/e2e/auth-role-propagation
 * exists to fail if anyone makes that change.
 */

export type UserRole = 'student' | 'teacher' | 'admin';
export type AccountStatus = 'active' | 'suspended';

export type Profile = {
  id: string;
  full_name: string | null;
  role: UserRole;
  verified_teacher: boolean;
  status: AccountStatus;
  role_chosen_at: string | null;
  created_at: string;
};

export type AuthState = {
  /** Still resolving the session — render neutral UI, not signed-out UI. */
  loading: boolean;
  session: Session | null;
  profile: Profile | null;
  /** Convenience: profile?.role, defaulting to null when signed out. */
  role: UserRole | null;
  /** FR-005a — the answer-key gate. Never inferred from role. */
  verifiedTeacher: boolean;
  /** FR-010b — display name, falling back to the account email. */
  displayName: string | null;
  isConfigured: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

const PROFILE_COLUMNS =
  'id, full_name, role, verified_teacher, status, role_chosen_at, created_at';

export function AuthProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Thread Docusaurus customFields into the client module (process.env is not
  // readable from the browser bundle — quickstart.md §2).
  const configured = useMemo(() => {
    const url = (siteConfig.customFields?.supabaseUrl as string) ?? '';
    const anonKey = (siteConfig.customFields?.supabaseAnonKey as string) ?? '';
    if (isBrowser() && url && anonKey) {
      setAuthConfig({ supabaseUrl: url, supabaseAnonKey: anonKey });
    }
    return Boolean(url && anonKey);
  }, [siteConfig]);

  const loadProfile = useCallback(async (activeSession: Session | null) => {
    const supabase = getSupabase();
    if (!supabase || !activeSession) {
      setProfile(null);
      return;
    }
    const { data, error } = await supabase
      .from('profiles')
      .select(PROFILE_COLUMNS)
      .eq('auth_user_id', activeSession.user.id)
      .maybeSingle();

    // A suspended user is filtered out by RLS and returns no row (FR-020) —
    // treat that the same as signed-out rather than surfacing a hard error.
    if (error) {
      setProfile(null);
      return;
    }
    setProfile((data as Profile) ?? null);
  }, []);

  useEffect(() => {
    if (!isBrowser() || !configured) {
      setLoading(false);
      return undefined;
    }
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    // Rehydrate an existing session first (FR-011a — survives browser restart).
    supabase.auth.getSession().then(async ({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      await loadProfile(data.session);
      if (!cancelled) setLoading(false);
    });

    // Keep state in step with sign-in / sign-out / token refresh across tabs.
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (cancelled) return;
      setSession(nextSession);
      await loadProfile(nextSession);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [configured, loadProfile]);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile(session);
  }, [loadProfile, session]);

  const value = useMemo<AuthState>(() => ({
    loading,
    session,
    profile,
    role: profile?.role ?? null,
    // Defaults to false whenever the profile is missing — fail closed.
    verifiedTeacher: profile?.verified_teacher ?? false,
    // FR-010b — name when set, otherwise the account email.
    displayName: profile?.full_name?.trim() || session?.user?.email || null,
    isConfigured: configured,
    signOut,
    refreshProfile,
  }), [loading, session, profile, configured, signOut, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Root.tsx mounts the provider around every page, so this only fires if the
    // swizzle was removed or a component renders outside the tree.
    throw new Error('useAuth must be used within <AuthProvider> (see src/theme/Root.tsx)');
  }
  return ctx;
}
