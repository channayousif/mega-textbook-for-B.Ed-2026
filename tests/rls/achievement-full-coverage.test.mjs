/**
 * T035 [US6] — check_full_coverage_achievement grants full_course_coverage
 * only when the server-recomputed numerator meets the caller-supplied
 * p_total_units; calling it again after the condition is already true does
 * not re-grant (contract checklist item 10).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('achievement — full course coverage RPC', () => {
  const createdUsers = [];

  afterAll(async () => {
    await cleanupUsers(createdUsers);
  });

  test('grants the achievement when covered units meet the caller-supplied total, and only once', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);
    const svc = serviceClient();

    await svc.from('unit_progress').insert([
      { student_id: profile.id, course_code: 'EFMP-301', unit_no: 1, method: 'self_marked' },
      { student_id: profile.id, course_code: 'EFMP-301', unit_no: 2, method: 'self_marked' },
    ]);

    // Not yet met (2 of 3 claimed total).
    const { data: notYet } = await student.client.rpc('check_full_coverage_achievement', {
      p_course_code: 'EFMP-301', p_total_units: 3,
    });
    expect(notYet).toBe(false);

    // Now claim total_units=2 — the server-recomputed numerator (2) meets it.
    const { data: granted } = await student.client.rpc('check_full_coverage_achievement', {
      p_course_code: 'EFMP-301', p_total_units: 2,
    });
    expect(granted).toBe(true);

    const { data: rows } = await svc
      .from('student_achievements')
      .select('*')
      .eq('student_id', profile.id)
      .eq('achievement_key', 'full_course_coverage');
    expect(rows).toHaveLength(1);

    // Calling again does not re-grant (still exactly one row).
    await student.client.rpc('check_full_coverage_achievement', { p_course_code: 'EFMP-301', p_total_units: 2 });
    const { data: rowsAfter } = await svc
      .from('student_achievements')
      .select('*')
      .eq('student_id', profile.id)
      .eq('achievement_key', 'full_course_coverage');
    expect(rowsAfter).toHaveLength(1);
  });
});
