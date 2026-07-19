// admin-list-users — Spec 002 (Authentication & Roles), T043 prerequisite.
//
// WHY THIS EXISTS: `profiles` deliberately has no email column (data-model.md —
// "avoids a second copy of personal data to erase on deletion", Art. VIII.2).
// That's correct for a user viewing their OWN session-derived email, but an
// admin managing OTHER accounts has no way to identify which profile is which
// without one. Reading `auth.users.email` for arbitrary accounts requires the
// service-role key, which Constitution Art. V.1 forbids in the browser — hence
// an Edge Function, verifying the caller is an admin SERVER-SIDE (the JWT
// alone is never trusted), matching the same pattern admin-suspend and
// delete-account use.
//
// Decision confirmed with the owner (2026-07-19): build this now rather than
// wait for Phase 7, since an admin user list with no way to identify accounts
// isn't meaningfully usable.

import { serviceClient, bearerToken, resolveCaller, isActiveAdmin } from '../_shared/adminAuth.ts';

Deno.serve(async (req: Request) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405 });
  }

  const jwt = bearerToken(req);
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'missing bearer token' }), { status: 401 });
  }

  const service = serviceClient();
  const caller = await resolveCaller(service, jwt);
  if (!caller) {
    return new Response(JSON.stringify({ error: 'invalid session' }), { status: 401 });
  }
  if (!isActiveAdmin(caller)) {
    return new Response(JSON.stringify({ error: 'admin required' }), { status: 403 });
  }

  const { data: profiles, error: profilesError } = await service
    .from('profiles')
    .select('id, auth_user_id, full_name, role, verified_teacher, status, role_chosen_at, created_at, deleted_at')
    .order('created_at', { ascending: false });
  if (profilesError) {
    return new Response(JSON.stringify({ error: profilesError.message }), { status: 500 });
  }

  // Paginate through auth.users rather than assume one page covers every
  // account — plan.md's "low hundreds of users initially" is a starting
  // scale, not a hard cap this function should silently break past.
  const emailByAuthId = new Map<string, string>();
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data: usersPage, error: usersError } = await service.auth.admin.listUsers({ page, perPage });
    if (usersError) {
      return new Response(JSON.stringify({ error: usersError.message }), { status: 500 });
    }
    for (const u of usersPage.users) {
      if (u.email) emailByAuthId.set(u.id, u.email);
    }
    if (usersPage.users.length < perPage) break;
    page += 1;
  }

  const combined = (profiles ?? []).map((p) => ({
    ...p,
    // Tombstones (deleted_at set) have auth_user_id already nulled — no email
    // to show, which is correct: the identity is gone, only the record remains.
    email: p.auth_user_id ? emailByAuthId.get(p.auth_user_id) ?? null : null,
  }));

  return new Response(JSON.stringify({ users: combined }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
