import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, serviceClient, cleanupUsers } from './_helpers.mjs';

// ADR-0032: the G3 sign-off ledger is admin-only, written only through RPCs, validated by
// the 0050 trigger, and moved to synced/stale/failed only by the service role (the crew).
const COURSE = 'ZZRLS-950';
const G3 = ['authority', 'sources', 'coverage', 'assessment', 'accessibility', 'readability', 'pedagogy'];
const pass = () => Object.fromEntries(G3.map((id) => [id, { status: 'pass', evidence: '' }]));
const item = (overrides = {}) => ({
  course_code: COURSE, unit_no: 1, decision: 'certify', criteria: pass(), findings: [], note: '',
  reviewer_initials: 'YM', attested: true, rendered_inspected: true,
  inputs_digest: 'a'.repeat(64), desk_commit: 'abc1234', agent_report: null, ...overrides,
});

describe.skipIf(!rlsConfigured)('g3_signoffs ledger', () => {
  const created = [];
  afterAll(async () => {
    await serviceClient().from('g3_signoffs').delete().eq('course_code', COURSE);
    await cleanupUsers(created);
  });

  test('admin-only, RPC-only writes, trigger-validated, service-role sync', async () => {
    const admin = await createSignedInUser({ role: 'student' }); created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    const teacher = await createSignedInUser({ role: 'teacher' }); created.push(teacher.authUserId);

    // A non-admin can neither record nor read.
    const denied = await teacher.client.rpc('record_g3_signoff', { p_items: [item()] });
    expect(denied.error).toBeTruthy();
    // No client insert grant exists, even for an admin.
    const direct = await admin.client.from('g3_signoffs').insert({ ...item(), criteria: pass() });
    expect(direct.error).toBeTruthy();

    // The trigger refuses a certify with a non-passing criterion, an open blocking finding,
    // no render inspection, or no attestation; and a revise without a note.
    const refusals = [
      item({ criteria: { ...pass(), sources: { status: 'fail' } } }),
      item({ findings: [{ severity: 'blocking', message: 'wrong citation', resolved: false }] }),
      item({ rendered_inspected: false }),
      item({ attested: false }),
      item({ decision: 'revise', note: '' }),
      item({ criteria: { ...pass(), extra: { status: 'pass' } } }),
      item({ reviewer_initials: 'agent:x' }),
    ];
    for (const bad of refusals) {
      const r = await admin.client.rpc('record_g3_signoff', { p_items: [bad] });
      expect(r.error, JSON.stringify(bad)).toBeTruthy();
    }
    // One bad item rejects the whole batch.
    const mixed = await admin.client.rpc('record_g3_signoff', { p_items: [item({ unit_no: 2 }), item({ unit_no: 3, attested: false })] });
    expect(mixed.error).toBeTruthy();

    const first = await admin.client.rpc('record_g3_signoff', { p_items: [item(), item({ unit_no: 2, decision: 'escalate', note: 'needs a ruling', criteria: { ...pass(), coverage: { status: 'unverified' } } })] });
    expect(first.error).toBeNull();
    expect(first.data).toHaveLength(2);
    const teacherRead = await teacher.client.from('g3_signoffs').select('id').eq('course_code', COURSE);
    expect(teacherRead.data).toEqual([]);

    // A new decision for the same unit supersedes the queued one: one queued row per unit.
    const second = await admin.client.rpc('record_g3_signoff', { p_items: [item({ note: 'second look' })] });
    expect(second.error).toBeNull();
    const rows = await admin.client.from('g3_signoffs').select('id,unit_no,sync_status').eq('course_code', COURSE).eq('unit_no', 1);
    expect(rows.data.filter((r) => r.sync_status === 'queued')).toHaveLength(1);
    expect(rows.data.filter((r) => r.sync_status === 'withdrawn')).toHaveLength(1);

    // Only the service role marks rows synced.
    const id = second.data[0];
    const adminMark = await admin.client.rpc('mark_g3_signoff_synced', { p_id: id, p_status: 'synced', p_pr_url: 'https://github.com/x/y/pull/1' });
    expect(adminMark.error).toBeTruthy();
    const noUrl = await serviceClient().rpc('mark_g3_signoff_synced', { p_id: id, p_status: 'synced' });
    expect(noUrl.error).toBeTruthy();
    const crew = await serviceClient().rpc('mark_g3_signoff_synced', { p_id: id, p_status: 'synced', p_pr_url: 'https://github.com/x/y/pull/1' });
    expect(crew.error).toBeNull();
    const again = await serviceClient().rpc('mark_g3_signoff_synced', { p_id: id, p_status: 'stale', p_note: 'x' });
    expect(again.error).toBeTruthy();

    // Withdraw works only while queued, and only for an admin.
    const escalateId = first.data[1];
    expect((await teacher.client.rpc('withdraw_g3_signoff', { p_id: escalateId })).error).toBeTruthy();
    expect((await admin.client.rpc('withdraw_g3_signoff', { p_id: escalateId })).error).toBeNull();
    expect((await admin.client.rpc('withdraw_g3_signoff', { p_id: id })).error).toBeTruthy();

    const audit = await admin.client.from('admin_action_history').select('action').eq('target_type', 'g3_signoff').in('target_id', [id, escalateId]);
    expect(audit.data.map((a) => a.action).sort()).toEqual(['g3_signoff_certify', 'g3_signoff_escalate', 'g3_signoff_withdrawn']);
  });
});
