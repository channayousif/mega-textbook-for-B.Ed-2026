import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, anonClient, serviceClient, cleanupUsers, callEdgeFunction, getProfileByAuthId,
} from './_helpers.mjs';

// Feature 028 (migration 0053 + weekly-digest/digest-unsubscribe functions): the weekly
// email's ledger is admin-read only, a user changes only their own preference, the send
// endpoint refuses callers without the cron secret, previews are admin-only, and an
// unsubscribe link with a forged token changes nothing.
describe.skipIf(!rlsConfigured)('weekly digest', () => {
  const created = [];
  afterAll(async () => { await cleanupUsers(created); });

  test('preference, ledger and endpoints are locked down', async () => {
    const a = await createSignedInUser({ role: 'teacher' }); created.push(a.authUserId);
    const b = await createSignedInUser({ role: 'student' }); created.push(b.authUserId);
    const pa = await getProfileByAuthId(a.authUserId);
    const pb = await getProfileByAuthId(b.authUserId);

    // Own preference only.
    expect((await a.client.rpc('set_digest_preference', { p_opt_out: true })).error).toBeNull();
    const rows = await serviceClient().from('profiles').select('id, digest_opt_out').in('id', [pa.id, pb.id]);
    const byId = Object.fromEntries((rows.data ?? []).map((r) => [r.id, r.digest_opt_out]));
    expect(byId).toEqual({ [pa.id]: true, [pb.id]: false });
    expect((await anonClient().rpc('set_digest_preference', { p_opt_out: true })).error).toBeTruthy();

    // The ledger is invisible to non-admins and unwritable by clients.
    expect((await a.client.from('digest_runs').select('iso_week')).data ?? []).toEqual([]);
    expect((await a.client.from('digest_runs').insert({ iso_week: '2099-W01' })).error).toBeTruthy();
    expect((await anonClient().from('digest_runs').select('iso_week')).error).toBeTruthy();

    // Sending needs the cron secret; previews need an admin.
    expect((await callEdgeFunction('weekly-digest', {})).status).toBe(401);
    expect((await callEdgeFunction('weekly-digest?mode=preview', { token: a.accessToken })).status).toBe(403);

    // A forged unsubscribe token is refused and changes nothing.
    const forged = await callEdgeFunction('digest-unsubscribe', { body: { token: `${pb.id}.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` } });
    expect(forged.status).toBe(400);
    expect((await callEdgeFunction('digest-unsubscribe', { method: 'GET' })).status).toBe(405);
    const after = await serviceClient().from('profiles').select('digest_opt_out').eq('id', pb.id).single();
    expect(after.data.digest_opt_out).toBe(false);
  });
});
