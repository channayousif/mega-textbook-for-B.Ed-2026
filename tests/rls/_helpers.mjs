/**
 * RLS test harness (Spec 002, T020) — per-role authenticated clients + fixtures.
 *
 * These tests are the SC-004 evidence set and the Art. VII engineering gate.
 * They assert NEGATIVE cases: that policies REFUSE access. A suite proving only
 * happy paths cannot detect an over-permissive policy, which is the principal
 * risk this feature carries.
 *
 * Requires a live Supabase project (local stack or a disposable hosted one):
 *   DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
 *
 * ⚠️ Point these at a THROWAWAY project. The harness creates and deletes users.
 */

import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';

const URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Skip (not fail) when unconfigured, so `npm test` stays green offline. */
export const rlsConfigured = Boolean(URL && ANON && SERVICE);

export function requireConfig() {
  if (!rlsConfigured) {
    throw new Error(
      'RLS tests need DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY and ' +
      'SUPABASE_SERVICE_ROLE_KEY. See .env.example and quickstart.md §1.'
    );
  }
}

/** Service-role client — bypasses RLS. Fixture setup/teardown ONLY, never assertions. */
export function serviceClient() {
  requireConfig();
  return createClient(URL, SERVICE, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** Anonymous client — the unauthenticated caller. */
export function anonClient() {
  requireConfig();
  return createClient(URL, ANON, { auth: { persistSession: false, autoRefreshToken: false } });
}

export const testEmail = (tag) => `rls-${tag}-${randomUUID()}@example.test`;
const PASSWORD = 'Test-Passw0rd!';

/**
 * Create a confirmed user and return a client authenticated AS THAT USER, so
 * requests carry their JWT and RLS applies exactly as in the browser.
 *
 * `role` here is the *requested* role passed through user_metadata — deliberately
 * the untrusted path, so tests exercise the 0007 allowlist rather than bypassing it.
 */
export async function createUser({ role = 'student', confirmed = true, fullName = null } = {}) {
  const svc = serviceClient();
  const email = testEmail(role);

  const { data, error } = await svc.auth.admin.createUser({
    email,
    password: PASSWORD,
    email_confirm: confirmed,
    user_metadata: { role, ...(fullName ? { full_name: fullName } : {}) },
  });
  if (error) throw new Error(`createUser(${role}): ${error.message}`);

  return { authUserId: data.user.id, email, password: PASSWORD };
}

/** Sign in and return an RLS-bound client. Returns { client: null, error } on failure. */
export async function signIn(email, password = PASSWORD) {
  const client = anonClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) return { client: null, error };
  return { client, error: null, accessToken: data.session.access_token };
}

/** Create a user and return them already signed in. */
export async function createSignedInUser(opts = {}) {
  const user = await createUser(opts);
  const { client, error, accessToken } = await signIn(user.email);
  if (error) throw new Error(`signIn(${user.email}): ${error.message}`);
  return { ...user, client, accessToken };
}

/** Read a profile by auth id using the service role (fixture inspection). */
export async function getProfileByAuthId(authUserId) {
  const svc = serviceClient();
  const { data, error } = await svc
    .from('profiles').select('*').eq('auth_user_id', authUserId).maybeSingle();
  if (error) throw new Error(`getProfileByAuthId: ${error.message}`);
  return data;
}

/**
 * Grant a privileged attribute via the service role, simulating an admin action
 * without needing an admin session. Use ONLY for fixture setup — assertions about
 * who *may* grant must go through a real admin client.
 */
export async function adminSet(authUserId, patch) {
  const svc = serviceClient();
  const { error } = await svc.from('profiles').update(patch).eq('auth_user_id', authUserId);
  if (error) throw new Error(`adminSet: ${error.message}`);
}

/**
 * Delete fixture users AND their profile rows. Safe to call with junk ids.
 *
 * ⚠️ IT DOES NOT CASCADE, and the comment here used to claim it did. That one
 * wrong word cost the project 29,249 junk rows against 227 real ones:
 * `profiles_auth_user_id_fkey` is ON DELETE SET NULL, so deleting an auth user
 * nulls the link and leaves the profile behind forever - not a tombstone
 * (`deleted_at` stays null), just an unreachable row. CI runs this suite and
 * the e2e suite against the same live project on every push, so the leak ran at
 * roughly 5,000 rows a day and survived a 25,796-row purge on 2026-09-11.
 *
 * Resolve the profile ids FIRST: once `deleteUser()` has run, `auth_user_id` is
 * null and there is no way back to the row.
 *
 * Best-effort by design. A profile referenced by `classes.teacher_id` (NO
 * ACTION) will refuse to delete, and a test's afterAll is the wrong place to
 * throw - leaving one row behind beats masking the real failure.
 */
export async function cleanupUsers(authUserIds = []) {
  const svc = serviceClient();
  const ids = authUserIds.filter(Boolean);
  if (ids.length === 0) return;

  const { data: profiles } = await svc.from('profiles').select('id').in('auth_user_id', ids);
  await Promise.allSettled(ids.map((id) => svc.auth.admin.deleteUser(id)));

  const profileIds = (profiles ?? []).map((p) => p.id);
  if (profileIds.length === 0) return;

  // Dependents first. Almost every table referencing profiles(id) is NO ACTION,
  // so a profile with a single unit_progress row refuses to delete and the
  // whole statement aborts - which is how the first version of this fix still
  // leaked 104 rows per suite run while looking correct.
  //
  // ⚠️ ADD A ROW HERE when you add a table referencing profiles(id). The
  // alternative, ON DELETE CASCADE, is wrong: FR-021 deliberately anonymizes a
  // real deleted account rather than destroying the teacher gradebooks that
  // reference it, and loosening the FK for test convenience would take that
  // guarantee with it. privilege_audit is absent on purpose - its subject_id is
  // already ON DELETE CASCADE, by the same FR-021 reasoning.
  const DEPENDENTS = [
    ['unit_progress', 'student_id'],
    ['student_achievements', 'student_id'],
    ['self_assessment_checks', 'student_id'],
    ['quiz_attempts', 'student_id'],
    ['student_notes', 'student_id'],
    ['submissions', 'student_id'],
    ['enrollments', 'student_id'],
    ['grades', 'graded_by'],
    ['teaching_log_entries', 'teacher_id'],
    ['activity_feedback', 'teacher_id'],
    ['improvement_suggestions', 'teacher_id'],
    ['assignment_templates', 'teacher_id'],
    ['content_feedback', 'author_id'],
    ['quiz_items', 'created_by'],
    ['answer_keys', 'created_by'],
    ['classes', 'teacher_id'],
  ];
  for (const [table, column] of DEPENDENTS) {
    await svc.from(table).delete().in(column, profileIds);
  }

  const { error } = await svc.from('profiles').delete().in('id', profileIds);
  if (error) {
    // Loud, but not throwing: teardown is the wrong place to mask a real test
    // failure. A silent swallow here is exactly what hid 29,249 rows.
    console.warn(`cleanupUsers: ${profileIds.length} profile(s) survived - ${error.message}`);
  }
}

/**
 * Call a deployed Edge Function with a caller's own access token (T054/T055 —
 * admin-suspend, delete-account). Deliberately a real HTTP call, not a
 * service-role bypass — this feature's mail (T025) and PKCE-link (T032) bugs
 * were both hidden behind exactly that kind of shortcut.
 */
export async function callEdgeFunction(name, { token, body, method = 'POST' } = {}) {
  requireConfig();
  const headers = { apikey: ANON };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${URL}/functions/v1/${name}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => null);
  return { status: res.status, body: json };
}

/**
 * Assert a Postgres permission error (the 0008 guard raising 42501).
 * A silent no-op is a FAILURE: FR-006 requires the caller learn the write failed.
 */
export function expectPermissionError(error, expect) {
  expect(error, 'expected a permission error, got success (silent no-op)').toBeTruthy();
  const code = error.code ?? '';
  const msg = (error.message ?? '').toLowerCase();
  expect(
    code === '42501' || msg.includes('requires admin') || msg.includes('permission'),
    `expected 42501/permission error, got code=${code} message=${error.message}`
  ).toBe(true);
}
