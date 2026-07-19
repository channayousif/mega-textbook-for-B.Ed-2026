/**
 * T022 [US1] — the requested role at sign-up is untrusted input; only
 * {student, teacher} pass through, and 'admin' is never self-assignable
 * (FR-003, FR-009, research.md R3, contracts/auth-operations.md §D items 4-5).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('sign-up role allowlist', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test("requesting role='admin' yields a student profile, not admin", async () => {
    const user = await createUser({ role: 'admin' });
    created.push(user.authUserId);

    const profile = await getProfileByAuthId(user.authUserId);
    expect(profile.role, 'admin must never be self-assignable at sign-up').toBe('student');
  });

  test("requesting role='teacher' yields a teacher profile with verified_teacher=false", async () => {
    const user = await createUser({ role: 'teacher' });
    created.push(user.authUserId);

    const profile = await getProfileByAuthId(user.authUserId);
    expect(profile.role).toBe('teacher');
    expect(profile.verified_teacher, 'verified_teacher is never conferred at sign-up').toBe(false);
  });

  test('garbage role values coerce to student', async () => {
    const user = await createUser({ role: 'superuser' });
    created.push(user.authUserId);

    const profile = await getProfileByAuthId(user.authUserId);
    expect(profile.role).toBe('student');
  });
});
