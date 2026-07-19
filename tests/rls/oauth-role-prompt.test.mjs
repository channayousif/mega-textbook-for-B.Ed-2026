/**
 * T031 — the one-time OAuth role prompt's carve-out in
 * `guard_privileged_columns()` (0008), added mid-implementation when the
 * original unconditional trigger made this prompt impossible.
 *
 * Gap found 2026-07-18, closed the same day: every other RLS test signs up
 * with an explicit role, so `role_chosen_at` is set at INSERT and none of
 * them exercise this branch. This test simulates the actual OAuth case (no
 * `role` in `raw_user_meta_data`, so `role_chosen_at` is null at insert) and
 * proves both halves of the carve-out: the one-time choice succeeds, and a
 * second attempt is rejected exactly like any other non-admin role change.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createUser, signIn, getProfileByAuthId, cleanupUsers, expectPermissionError,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('OAuth one-time role prompt carve-out', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('a profile with no role metadata lands with role_chosen_at=null (the OAuth case)', async () => {
    const user = await createUser({ role: null });
    created.push(user.authUserId);

    const profile = await getProfileByAuthId(user.authUserId);
    expect(profile.role).toBe('student');
    expect(profile.role_chosen_at).toBeNull();
  });

  test('the account holder may set role once, tied to stamping role_chosen_at', async () => {
    const user = await createUser({ role: null });
    created.push(user.authUserId);
    const { client, error: signInError } = await signIn(user.email, user.password);
    expect(signInError).toBeNull();

    const before = await getProfileByAuthId(user.authUserId);
    expect(before.role_chosen_at).toBeNull();

    const { error } = await client
      .from('profiles')
      .update({ role: 'teacher', role_chosen_at: new Date().toISOString() })
      .eq('id', before.id);
    expect(error, 'the one-time carve-out should allow this exact statement shape').toBeNull();

    const after = await getProfileByAuthId(user.authUserId);
    expect(after.role).toBe('teacher');
    expect(after.role_chosen_at).not.toBeNull();
  });

  test('the carve-out rejects role="admin" even while role_chosen_at is still null', async () => {
    const user = await createUser({ role: null });
    created.push(user.authUserId);
    const { client } = await signIn(user.email, user.password);
    const before = await getProfileByAuthId(user.authUserId);

    const { error } = await client
      .from('profiles')
      .update({ role: 'admin', role_chosen_at: new Date().toISOString() })
      .eq('id', before.id);
    expectPermissionError(error, expect);
  });

  test('a second role change is rejected once role_chosen_at is already set', async () => {
    const user = await createUser({ role: null });
    created.push(user.authUserId);
    const { client } = await signIn(user.email, user.password);
    const before = await getProfileByAuthId(user.authUserId);

    const first = await client
      .from('profiles')
      .update({ role: 'teacher', role_chosen_at: new Date().toISOString() })
      .eq('id', before.id);
    expect(first.error).toBeNull();

    const second = await client
      .from('profiles')
      .update({ role: 'student', role_chosen_at: new Date().toISOString() })
      .eq('id', before.id);
    expectPermissionError(second.error, expect);
  });
});
