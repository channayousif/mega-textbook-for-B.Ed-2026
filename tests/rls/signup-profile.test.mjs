/**
 * T021 [US1] — email sign-up creates exactly one profile with the correct
 * defaults (SC-002, contracts/auth-operations.md §D item 1).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('email sign-up profile defaults', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('creates exactly one profile row with role=student, verified_teacher=false, status=active', async () => {
    const user = await createUser({ role: undefined });
    created.push(user.authUserId);

    const profile = await getProfileByAuthId(user.authUserId);

    expect(profile, 'expected a profile row to exist after sign-up').toBeTruthy();
    expect(profile.role).toBe('student');
    expect(profile.verified_teacher).toBe(false);
    expect(profile.status).toBe('active');
    expect(profile.auth_user_id).toBe(user.authUserId);
  });
});
