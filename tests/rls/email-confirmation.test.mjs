/**
 * T021a [US1] — an unconfirmed email cannot obtain a session; after
 * confirmation sign-in succeeds (FR-002, US1 acceptance scenario 2,
 * contracts/auth-operations.md §D item 3).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, serviceClient, createUser, signIn, cleanupUsers } from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('email confirmation gate', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('unconfirmed account cannot sign in; confirming it allows sign-in', async () => {
    const user = await createUser({ confirmed: false });
    created.push(user.authUserId);

    const { client: blocked, error } = await signIn(user.email, user.password);
    expect(blocked).toBeNull();
    expect(error, 'expected sign-in to be refused for an unconfirmed email').toBeTruthy();

    const svc = serviceClient();
    const { error: confirmError } = await svc.auth.admin.updateUserById(user.authUserId, {
      email_confirm: true,
    });
    expect(confirmError).toBeNull();

    const { client: allowed, error: secondError } = await signIn(user.email, user.password);
    expect(secondError).toBeNull();
    expect(allowed, 'expected sign-in to succeed once the email is confirmed').toBeTruthy();
  });
});
