// Shared caller-resolution helper for admin-gated Edge Functions (Spec 002).
//
// Extracted once a second function (admin-suspend) needed the identical
// "resolve the caller from their OWN token, then check they're an active
// admin" logic admin-list-users already had — same session, same rule
// (server derives identity, client never supplies it), worth sharing rather
// than letting two copies drift.

import { createClient, type SupabaseClient } from 'jsr:@supabase/supabase-js@2';

export function serviceClient(): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return createClient(url, key);
}

export function bearerToken(req: Request): string | null {
  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  return token || null;
}

export type CallerProfile = {
  id: string;
  auth_user_id: string;
  role: string;
  status: string;
  deleted_at: string | null;
};

/** Resolve the caller's own profile from their token — never a client-supplied id. */
export async function resolveCaller(
  service: SupabaseClient,
  jwt: string,
): Promise<CallerProfile | null> {
  const { data: userData, error: userError } = await service.auth.getUser(jwt);
  if (userError || !userData.user) return null;

  const { data: profile, error: profileError } = await service
    .from('profiles')
    .select('id, auth_user_id, role, status, deleted_at')
    .eq('auth_user_id', userData.user.id)
    .maybeSingle();
  if (profileError || !profile) return null;

  return profile as CallerProfile;
}

export function isActiveAdmin(profile: CallerProfile | null): boolean {
  return profile?.role === 'admin' && profile?.status === 'active' && profile?.deleted_at === null;
}
