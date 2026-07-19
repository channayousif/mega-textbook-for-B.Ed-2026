/**
 * T052 [US5] — after deletion the `auth.users` row is gone, the `profiles`
 * tombstone remains with `full_name IS NULL`, and referencing rows still
 * resolve (FR-021, SC-009). Calls the REAL `delete-account` Edge Function.
 */
import { describe, test, expect } from 'vitest';
import { rlsConfigured, createSignedInUser, callEdgeFunction, serviceClient } from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('account deletion produces a correct tombstone', () => {
  test('auth.users gone; profiles row survives, stripped of identity', async () => {
    const user = await createSignedInUser({ role: 'student', fullName: 'Delete Me' });
    const svc = serviceClient();

    const { data: before } = await svc.from('profiles').select('id, full_name, deleted_at').eq('auth_user_id', user.authUserId).single();
    expect(before.deleted_at).toBeNull();
    const profileId = before.id;

    const resp = await callEdgeFunction('delete-account', { token: user.accessToken });
    expect(resp.status).toBe(200);
    expect(resp.body.ok).toBe(true);

    // auth.users row is gone — deleteUser() was actually called, not skipped.
    const { data: listing } = await svc.auth.admin.listUsers();
    expect(listing.users.some((u) => u.id === user.authUserId)).toBe(false);

    // profiles row survives as a tombstone: identity stripped, id stable —
    // this is exactly what lets a Spec 003 foreign key keep resolving.
    const { data: after } = await svc.from('profiles').select('*').eq('id', profileId).single();
    expect(after.full_name).toBeNull();
    expect(after.auth_user_id).toBeNull();
    expect(after.deleted_at).not.toBeNull();
    expect(after.id).toBe(profileId); // the FK-stable identity, unchanged
  });
});
