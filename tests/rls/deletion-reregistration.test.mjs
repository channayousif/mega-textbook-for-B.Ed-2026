/**
 * T053 [US5] — re-registering a deleted email creates a new `profiles.id`
 * unrelated to the tombstone (FR-022). Exercises the REAL `delete-account`
 * function, then a real sign-up, proving `handle_new_user`'s
 * `deleted_at is null` filter (0007_handle_new_user.sql) actually excludes
 * tombstoned profiles from identity-linking, not just in isolation.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, callEdgeFunction, serviceClient,
  testEmail, cleanupUsers, signIn,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('re-registering a deleted email is unrelated to its tombstone', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('a new profile.id is created, the tombstone is untouched', async () => {
    const email = testEmail('reregister');
    const svc = serviceClient();

    const first = await createSignedInUserAt(email);
    const { data: firstProfile } = await svc.from('profiles').select('id').eq('auth_user_id', first.authUserId).single();

    const del = await callEdgeFunction('delete-account', { token: first.accessToken });
    expect(del.status).toBe(200);

    const second = await createSignedInUserAt(email);
    created.push(second.authUserId);
    const { data: secondProfile } = await svc.from('profiles').select('id, deleted_at').eq('auth_user_id', second.authUserId).single();

    expect(secondProfile.id).not.toBe(firstProfile.id);
    expect(secondProfile.deleted_at).toBeNull();

    // The original tombstone is untouched — still there, still stripped.
    const { data: tombstone } = await svc.from('profiles').select('full_name, auth_user_id').eq('id', firstProfile.id).single();
    expect(tombstone.full_name).toBeNull();
    expect(tombstone.auth_user_id).toBeNull();
  });
});

/** createSignedInUser, but with a caller-chosen email (needed to reuse the same address). */
async function createSignedInUserAt(email) {
  const svc = serviceClient();
  const password = 'Test-Passw0rd!';
  const { data, error } = await svc.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) throw new Error(`createUser(${email}): ${error.message}`);
  const { client, error: signInError, accessToken } = await signIn(email, password);
  if (signInError) throw new Error(`signIn(${email}): ${signInError.message}`);
  return { authUserId: data.user.id, email, password, client, accessToken };
}
