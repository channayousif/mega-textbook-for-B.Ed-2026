// delete-account — Spec 002 (Authentication & Roles), T055.
//
// The subject is `auth.uid()` ONLY, resolved from the caller's own token —
// never a body parameter — so one user can never delete another (contracts
// §C). Sequence matters: strip full_name and stamp deleted_at BEFORE calling
// auth.admin.deleteUser(), so the tombstone the Spec 003 foreign keys depend
// on (FR-021) exists before the auth identity it's derived from is gone.

import { serviceClient, bearerToken, resolveCaller } from '../_shared/adminAuth.ts';

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
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
  if (caller.deleted_at !== null) {
    return new Response(JSON.stringify({ error: 'account already deleted' }), { status: 409 });
  }

  const { error: tombstoneError } = await service
    .from('profiles')
    .update({ full_name: null, deleted_at: new Date().toISOString() })
    .eq('id', caller.id);
  if (tombstoneError) {
    return new Response(JSON.stringify({ error: tombstoneError.message }), { status: 500 });
  }

  // auth_user_id gets set NULL automatically (0002_profiles.sql's
  // ON DELETE SET NULL) once this deletes the auth.users row — the tombstone
  // stays, the identity link severs, matching FR-021/data-model.md exactly.
  const { error: deleteError } = await service.auth.admin.deleteUser(caller.auth_user_id);
  if (deleteError) {
    return new Response(JSON.stringify({ error: deleteError.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
