/**
 * T033 [US6] — 3 consecutive self-marked calendar days grant study_streak
 * exactly once; a 4th consecutive day does not re-grant it; grade/quiz-derived
 * unit_progress rows never advance the streak (2026-07-20 clarification).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';

function daysAgoIso(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

describe.skipIf(!rlsConfigured)('achievement — study streak', () => {
  const createdUsers = [];

  afterAll(async () => {
    await cleanupUsers(createdUsers);
  });

  test('3 consecutive self-marked days grant study_streak exactly once', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);
    const svc = serviceClient();

    // Insert day-2, day-1 first (no streak yet), then today (completes the streak).
    await svc.from('unit_progress').insert({
      student_id: profile.id, course_code: 'EFMP-301', unit_no: 1, method: 'self_marked', occurred_at: daysAgoIso(2),
    });
    await svc.from('unit_progress').insert({
      student_id: profile.id, course_code: 'EFMP-301', unit_no: 2, method: 'self_marked', occurred_at: daysAgoIso(1),
    });
    await svc.from('unit_progress').insert({
      student_id: profile.id, course_code: 'EFMP-301', unit_no: 3, method: 'self_marked', occurred_at: daysAgoIso(0),
    });

    const { data: rows } = await svc
      .from('student_achievements')
      .select('*')
      .eq('student_id', profile.id)
      .eq('achievement_key', 'study_streak');
    expect(rows).toHaveLength(1);

    // A 4th consecutive self-marked unit does not re-grant.
    await svc.from('unit_progress').insert({
      student_id: profile.id, course_code: 'EFMP-301', unit_no: 4, method: 'self_marked', occurred_at: daysAgoIso(0),
    });
    const { data: rowsAfter } = await svc
      .from('student_achievements')
      .select('*')
      .eq('student_id', profile.id)
      .eq('achievement_key', 'study_streak');
    expect(rowsAfter).toHaveLength(1);
  });

  test('grade/quiz-derived unit_progress rows never advance the streak', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);
    const svc = serviceClient();

    for (const [unitNo, method] of [[1, 'assignment'], [2, 'quiz'], [3, 'assignment']]) {
      await svc.from('unit_progress').insert({
        student_id: profile.id, course_code: 'EFMP-301', unit_no: unitNo, method, occurred_at: daysAgoIso(3 - unitNo),
      });
    }

    const { data: rows } = await svc
      .from('student_achievements')
      .select('*')
      .eq('student_id', profile.id)
      .eq('achievement_key', 'study_streak');
    expect(rows).toHaveLength(0);
  });
});
