import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, serviceClient, cleanupUsers } from './_helpers.mjs';

// Feature 035: the Owner Decisions tables are admin-read-only, written by the owner only through
// record/withdraw RPCs and by the crew (service role) only through replace_owner_queue and
// mark_owner_decision.
const KEY = 'short:zzrls-950-ur';
const ITEM = {
  item_key: KEY, kind: 'short', title: 'Private Short: ZZRLS-950 (ur)', summary: 'test',
  details: { key: 'zzrls-950-ur' }, links: [], actions: ['publish', 'reject'], digest: 'abc', waiting_since: null,
};

describe.skipIf(!rlsConfigured)('owner decisions', () => {
  const created = [];
  const svc = () => serviceClient();
  afterAll(async () => {
    await svc().from('owner_decisions').delete().like('item_key', '%zzrls-950%');
    await svc().from('owner_queue').delete().like('item_key', '%zzrls-950%');
    await cleanupUsers(created);
  });

  test('admin-only reads, RPC-only writes, crew-only queue and marking', async () => {
    const admin = await createSignedInUser({ role: 'student' }); created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    const teacher = await createSignedInUser({ role: 'teacher' }); created.push(teacher.authUserId);

    // Only the service role replaces the queue. Keep whatever the live crew pushed, plus our item.
    const { data: live } = await svc().from('owner_queue').select('item_key,kind,title,summary,details,links,actions,digest,waiting_since');
    expect((await admin.client.rpc('replace_owner_queue', { p_items: [ITEM], p_snapshot_at: new Date().toISOString() })).error).toBeTruthy();
    const pushed = await svc().rpc('replace_owner_queue', { p_items: [...(live ?? []).filter((i) => i.item_key !== KEY), ITEM], p_snapshot_at: new Date().toISOString() });
    expect(pushed.error).toBeNull();

    // Admin reads; a teacher reads nothing and cannot record.
    expect((await admin.client.from('owner_queue').select('item_key').eq('item_key', KEY)).data).toHaveLength(1);
    expect((await teacher.client.from('owner_queue').select('item_key').eq('item_key', KEY)).data).toEqual([]);
    expect((await teacher.client.rpc('record_owner_decision', { p_item_key: KEY, p_action: 'publish' })).error).toBeTruthy();
    // No direct client writes, even for an admin.
    expect((await admin.client.from('owner_decisions').insert({ item_key: KEY, kind: 'short', action: 'publish', digest: 'abc' })).error).toBeTruthy();
    expect((await admin.client.from('owner_queue').delete().eq('item_key', KEY)).error).toBeTruthy();
    expect((await svc().from('owner_queue').select('item_key').eq('item_key', KEY)).data).toHaveLength(1);

    // The RPC refuses an action not offered, a reject without a note, and an unknown item.
    expect((await admin.client.rpc('record_owner_decision', { p_item_key: KEY, p_action: 'approve' })).error).toBeTruthy();
    expect((await admin.client.rpc('record_owner_decision', { p_item_key: KEY, p_action: 'reject', p_note: ' ' })).error).toBeTruthy();
    expect((await admin.client.rpc('record_owner_decision', { p_item_key: 'short:zzrls-951-ur', p_action: 'publish' })).error).toBeTruthy();

    // A decision copies the item's digest; a second one supersedes it (one queued per item).
    const first = await admin.client.rpc('record_owner_decision', { p_item_key: KEY, p_action: 'publish' });
    expect(first.error).toBeNull();
    const second = await admin.client.rpc('record_owner_decision', { p_item_key: KEY, p_action: 'reject', p_note: 'face is soft' });
    expect(second.error).toBeNull();
    const rows = (await admin.client.from('owner_decisions').select('id,status,digest,action').eq('item_key', KEY)).data;
    expect(rows.filter((r) => r.status === 'queued')).toHaveLength(1);
    expect(rows.find((r) => r.id === second.data)).toMatchObject({ status: 'queued', digest: 'abc', action: 'reject' });
    expect(rows.find((r) => r.id === first.data).status).toBe('withdrawn');
    expect((await teacher.client.from('owner_decisions').select('id').eq('item_key', KEY)).data).toEqual([]);

    // Only the crew marks; only queued rows move; withdraw works only while queued.
    expect((await admin.client.rpc('mark_owner_decision', { p_id: second.data, p_status: 'applied' })).error).toBeTruthy();
    expect((await svc().rpc('mark_owner_decision', { p_id: second.data, p_status: 'done' })).error).toBeTruthy();
    expect((await svc().rpc('mark_owner_decision', { p_id: second.data, p_status: 'applied', p_result: 'held', p_command: 'crew reject zzrls-950-ur face is soft' })).error).toBeNull();
    expect((await svc().rpc('mark_owner_decision', { p_id: second.data, p_status: 'refused' })).error).toBeTruthy();
    expect((await admin.client.rpc('withdraw_owner_decision', { p_id: second.data })).error).toBeTruthy();
    const third = await admin.client.rpc('record_owner_decision', { p_item_key: KEY, p_action: 'publish' });
    expect((await admin.client.rpc('withdraw_owner_decision', { p_id: third.data })).error).toBeNull();

    // Replacing the queue without the item removes it.
    expect((await svc().rpc('replace_owner_queue', { p_items: (live ?? []).filter((i) => i.item_key !== KEY), p_snapshot_at: new Date().toISOString() })).error).toBeNull();
    expect((await svc().from('owner_queue').select('item_key').eq('item_key', KEY)).data).toEqual([]);
  });
});
