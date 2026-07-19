/**
 * T051 [US5] — a suspended user fails every protected read and write, and
 * cannot sign in (FR-020). Calls the REAL `admin-suspend` Edge Function, not
 * a service-role bypass — this feature's mail (T025) and PKCE-link (T032)
 * bugs were both hidden behind exactly that kind of shortcut, and a bug in
 * this function was in fact found and fixed while writing this test (the
 * signOut-by-user-id call didn't exist; the real mechanism is a GoTrue ban —
 * see supabase/functions/admin-suspend/index.ts and data-model.md).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, anonClient, callEdgeFunction,
  getProfileByAuthId, serviceClient, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('suspended user is locked out everywhere', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('suspension via the real admin-suspend function blocks reads, writes, and fresh sign-in', async () => {
    const admin = await createSignedInUser({ role: 'student' });
    created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });

    const target = await createSignedInUser({ role: 'student' });
    created.push(target.authUserId);
    const targetProfile = await getProfileByAuthId(target.authUserId);

    // Sanity: works before suspension.
    const before = await target.client.from('profiles').select('id').eq('auth_user_id', target.authUserId);
    expect(before.data).toHaveLength(1);

    const suspendResp = await callEdgeFunction('admin-suspend', {
      token: admin.accessToken,
      body: { user_id: targetProfile.id, suspend: true },
    });
    expect(suspendResp.status).toBe(200);
    expect(suspendResp.body.status).toBe('suspended');

    // Existing session: reads now return 0 rows (RLS status check).
    const afterRead = await target.client.from('profiles').select('id').eq('auth_user_id', target.authUserId);
    expect(afterRead.error).toBeNull();
    expect(afterRead.data).toHaveLength(0);

    // Existing session: writes now match zero rows. This is a DIFFERENT
    // denial shape than the privileged-column-on-an-active-account case
    // (which raises via the 0008 trigger, T036): here `profiles_update_own`'s
    // USING clause requires status='active', so RLS filters the row out
    // before the trigger ever runs — a suspended write is a silent 0-row
    // success, not an error. Found while writing this test (my first attempt
    // wrongly expected a raised error); confirmed via a direct debug script
    // before fixing the assertion. Verify the row is genuinely unchanged via
    // the service role, since "no error" alone doesn't prove nothing wrote.
    const afterWrite = await target.client.from('profiles').update({ full_name: 'still me' }).eq('auth_user_id', target.authUserId).select();
    expect(afterWrite.error).toBeNull();
    expect(afterWrite.data).toHaveLength(0);
    const svc = serviceClient();
    const { data: unchanged } = await svc.from('profiles').select('full_name').eq('auth_user_id', target.authUserId).single();
    expect(unchanged.full_name).not.toBe('still me');

    // A fresh sign-in attempt is refused outright (GoTrue's own ban).
    const anon = anonClient();
    const { data: freshSignIn, error: freshError } = await anon.auth.signInWithPassword({
      email: target.email,
      password: target.password,
    });
    expect(freshSignIn.session).toBeNull();
    expect(freshError?.code).toBe('user_banned');
  });
});
