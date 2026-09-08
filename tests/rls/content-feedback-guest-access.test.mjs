/**
 * Spec 010 follow-up (2026-09-07) — 0037_content_feedback_guest_access.sql's schema half:
 * a row must have exactly one of author_id/guest_email (never both, never neither); a
 * malformed guest_email is rejected; confirm_guest_feedback() is callable by anon, flips
 * guest_confirmed_at exactly once for a real token, and returns false (never throws) for
 * an unknown or already-used one. The actual guest submission path (validation, the
 * confirmation email) lives in supabase/functions/guest-feedback-submit/ — an Edge
 * Function, verified manually per quickstart.md's own precedent for admin-suspend/
 * admin-list-users, not by this harness. Anon still cannot INSERT into this table
 * directly for a guest-shaped payload either — content-feedback-isolation.test.mjs
 * already covers that for the pre-existing shape; this file re-confirms it for the new
 * guest_email shape specifically, since that's the one a curious client might try.
 */
import { describe, test, expect, afterAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import {
  rlsConfigured, anonClient, serviceClient, createSignedInUser, getProfileByAuthId, adminSet, cleanupUsers,
} from './_helpers.mjs';

async function createSignedInAdmin() {
  const admin = await createSignedInUser({ role: 'student' });
  await adminSet(admin.authUserId, { role: 'admin' });
  return admin;
}

function guestRow(overrides = {}) {
  return {
    page_kind: 'topic',
    course_code: 'EFMP-302',
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    section_anchor: null,
    scope: 'whole_page',
    quoted_passage: null,
    comment: 'A guest left this comment.',
    guest_email: 'guest-rls-test@example.test',
    guest_confirmation_token: randomUUID(),
    ...overrides,
  };
}

describe.skipIf(!rlsConfigured)('content_feedback guest access', () => {
  const createdIds = [];
  const createdAuthUserIds = [];

  afterAll(async () => {
    if (createdIds.length > 0) {
      const svc = serviceClient();
      await svc.from('content_feedback').delete().in('id', createdIds);
    }
    await cleanupUsers(createdAuthUserIds);
  });

  test('anon cannot insert a guest-shaped row directly (must go through the Edge Function)', async () => {
    const anon = anonClient();
    const { data, error } = await anon.from('content_feedback').insert(guestRow()).select();
    // No anon INSERT policy exists at all — PostgREST reports this as a permission
    // error, not a silently-empty result (that shape is for SELECT filtering).
    expect(data).toBeNull();
    expect(error).not.toBeNull();
  });

  test('a row with both author_id and guest_email is rejected (exclusive-or pairing)', async () => {
    // Via a real signed-in session, not the service role: the author_role-stamping
    // trigger (0034/0037) resolves the caller's role from auth.uid(), which is null
    // under a service-role bypass and would itself violate author_role's NOT NULL
    // constraint before ever reaching the pairing constraint this test targets — the
    // same class of pitfall documented in owner-feedback-triage.spec.ts's own fixture
    // seeding (found the same way: a test failing on the wrong constraint message).
    const user = await createSignedInUser({ role: 'student' });
    createdAuthUserIds.push(user.authUserId);
    const profile = await getProfileByAuthId(user.authUserId);

    const { data, error } = await user.client.from('content_feedback')
      .insert(guestRow({ author_id: profile.id }))
      .select();
    expect(data).toBeNull();
    expect(error?.message ?? '').toMatch(/content_feedback_author_identity_pairing/);
  });

  test('a row with neither author_id nor guest_email is rejected', async () => {
    const svc = serviceClient();
    const { data, error } = await svc.from('content_feedback')
      .insert(guestRow({ guest_email: null, guest_confirmation_token: null }))
      .select();
    expect(data).toBeNull();
    expect(error?.message ?? '').toMatch(/content_feedback_author_identity_pairing/);
  });

  test('a malformed guest_email is rejected', async () => {
    const svc = serviceClient();
    const { data, error } = await svc.from('content_feedback')
      .insert(guestRow({ guest_email: 'not-an-email' }))
      .select();
    expect(data).toBeNull();
    expect(error?.message ?? '').toMatch(/content_feedback_guest_email_format/);
  });

  test('author_role is stamped "guest" for a service-role guest insert, regardless of any client-supplied value', async () => {
    const svc = serviceClient();
    const { data, error } = await svc.from('content_feedback')
      .insert(guestRow({ author_role: 'admin' }))
      .select()
      .single();
    expect(error).toBeNull();
    createdIds.push(data.id);
    expect(data.author_role).toBe('guest');
    expect(data.guest_confirmed_at).toBeNull();
  });

  test('confirm_guest_feedback: real token confirms once, a second call and an unknown token both return false', async () => {
    const svc = serviceClient();
    const token = randomUUID();
    const { data: row, error: insertError } = await svc.from('content_feedback')
      .insert(guestRow({ guest_confirmation_token: token }))
      .select()
      .single();
    expect(insertError).toBeNull();
    createdIds.push(row.id);

    const anon = anonClient();
    const { data: firstCall, error: firstError } = await anon.rpc('confirm_guest_feedback', { p_token: token });
    expect(firstError).toBeNull();
    expect(firstCall).toBe(true);

    const { data: afterConfirm } = await svc.from('content_feedback').select('guest_confirmed_at').eq('id', row.id).single();
    expect(afterConfirm.guest_confirmed_at).not.toBeNull();

    const { data: secondCall } = await anon.rpc('confirm_guest_feedback', { p_token: token });
    expect(secondCall).toBe(false);

    const { data: unknownTokenCall, error: unknownTokenError } = await anon.rpc('confirm_guest_feedback', {
      p_token: randomUUID(),
    });
    expect(unknownTokenError).toBeNull();
    expect(unknownTokenCall).toBe(false);
  });

  test('admin sees a guest row (author_id null) through a real admin session; a non-admin reader does not', async () => {
    const svc = serviceClient();
    const { data: row, error: insertError } = await svc.from('content_feedback')
      .insert(guestRow())
      .select()
      .single();
    expect(insertError).toBeNull();
    createdIds.push(row.id);

    const admin = await createSignedInAdmin();
    createdAuthUserIds.push(admin.authUserId);
    const { data: seenByAdmin, error: adminError } = await admin.client
      .from('content_feedback').select('id, guest_email').eq('id', row.id).maybeSingle();
    expect(adminError).toBeNull();
    expect(seenByAdmin?.id).toBe(row.id);
    expect(seenByAdmin?.guest_email).toBe('guest-rls-test@example.test');

    // `author_id = current_profile_id()` can never match a guest row (author_id is
    // null) for anyone — a signed-in non-admin reader gets zero rows, not an error.
    const nonAdmin = await createSignedInUser({ role: 'student' });
    createdAuthUserIds.push(nonAdmin.authUserId);
    const { data: seenByStudent, error: studentError } = await nonAdmin.client
      .from('content_feedback').select('id').eq('id', row.id).maybeSingle();
    expect(studentError).toBeNull();
    expect(seenByStudent).toBeNull();
  });
});
