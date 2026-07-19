// admin-suspend — Spec 002 (Authentication & Roles), T054.
//
// A `status` column alone does not end a live session (research.md R5) — an
// already-issued access token stays valid until it expires (up to its TTL),
// so suspension must also stop GoTrue itself from renewing it. That needs the
// service-role key — hence an Edge Function, never a direct client update
// (contracts §C).
//
// Correction (2026-07-19, found by actually calling this function): research
// md R5 specified `auth.admin.signOut(user_id, 'global')`, assumed but never
// verified against the real API. It doesn't take a user id at all — per
// Supabase's own docs, server-side revocation "by providing their JWT" means
// the TARGET's own access token, which an admin acting on someone else's
// account never has. Calling it with a uuid throws a JWT-parse error (500).
// The correct, actually-admin-capable mechanism is `updateUserById` with
// `ban_duration`: GoTrue's own docs confirm banning "prevent[s] them from
// obtaining new access tokens, refreshing existing ones, or authenticating...
// verified on every authenticated request" — stronger than signOut would have
// been, and it returns GoTrue's own `user_banned` code, which authErrors.ts
// already classifies to the bilingual "account suspended" message for free.

import { serviceClient, bearerToken, resolveCaller, isActiveAdmin } from '../_shared/adminAuth.ts';

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
  if (!isActiveAdmin(caller)) {
    return new Response(JSON.stringify({ error: 'admin required' }), { status: 403 });
  }

  let body: { user_id?: string; suspend?: boolean };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON body' }), { status: 400 });
  }
  const { user_id: targetProfileId, suspend } = body;
  if (!targetProfileId || typeof suspend !== 'boolean') {
    return new Response(JSON.stringify({ error: 'user_id and suspend (boolean) are required' }), { status: 400 });
  }

  const { data: target, error: targetError } = await service
    .from('profiles')
    .select('id, auth_user_id, status, deleted_at')
    .eq('id', targetProfileId)
    .maybeSingle();
  if (targetError || !target) {
    return new Response(JSON.stringify({ error: 'target profile not found' }), { status: 404 });
  }
  if (target.deleted_at !== null || !target.auth_user_id) {
    return new Response(JSON.stringify({ error: 'target is a deleted account (tombstone)' }), { status: 409 });
  }

  const newStatus = suspend ? 'suspended' : 'active';
  const { error: updateError } = await service
    .from('profiles')
    .update({ status: newStatus })
    .eq('id', targetProfileId);
  // The 0009 trigger writes the privilege_audit row as a side effect of this
  // UPDATE — no separate audit call needed here (FR-018/FR-019).
  if (updateError) {
    return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
  }

  // Ban (or unban) at the GoTrue level too — the RLS status check alone
  // blocks PostgREST/data access immediately, but GoTrue's own endpoints
  // (sign-in, token refresh) know nothing about `profiles.status` and would
  // happily issue a fresh session otherwise. `'876000h'` is GoTrue's own
  // idiom for "effectively indefinite" (~100 years); `'none'` clears it.
  const { error: banError } = await service.auth.admin.updateUserById(target.auth_user_id, {
    ban_duration: suspend ? '876000h' : 'none',
  });
  if (banError) {
    return new Response(JSON.stringify({ error: banError.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true, status: newStatus }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
