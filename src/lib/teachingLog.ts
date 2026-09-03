import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { TeachingLogEntry, TeachingLogSourceKind } from '@site/src/lib/types';

/**
 * Teaching log entries - create/list (FR-006), most-recent-first.
 * Spec 005, T023.
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is
 * RLS (supabase/migrations/0028); a log entry is immutable once created, no
 * edit/delete path exists at any layer.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export type LogActivityInput = {
  teacherId: string;
  classId: string;
  courseCode: string;
  unitNo: number;
  sourceKind: TeachingLogSourceKind;
  occurredOn: string;
  durationMinutes: number;
  reflection: string;
};

/** FR-006 - log a teaching activity in one flow; rejected if class_id isn't owned by the caller. */
export async function logActivity(input: LogActivityInput): Promise<Result<TeachingLogEntry>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('teaching_log_entries')
    .insert({
      teacher_id: input.teacherId,
      class_id: input.classId,
      course_code: input.courseCode,
      unit_no: input.unitNo,
      source_kind: input.sourceKind,
      occurred_on: input.occurredOn,
      duration_minutes: input.durationMinutes,
      reflection: input.reflection,
    })
    .select()
    .single();
  return { data: (data as TeachingLogEntry) ?? null, error };
}

/**
 * FR-006 - the signed-in teacher's own log, most-recent-first. `occurred_on`
 * is a date (no time component), so multiple entries logged for the same
 * day need a deterministic tiebreaker - `created_at desc` resolves ties in
 * actual logging order (found via teacher-teaching-log.spec.ts: two
 * same-day entries otherwise had no guaranteed relative order).
 */
export async function fetchOwnLog(): Promise<Result<TeachingLogEntry[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('teaching_log_entries')
    .select('*')
    .order('occurred_on', { ascending: false })
    .order('created_at', { ascending: false });
  return { data: (data as TeachingLogEntry[]) ?? null, error };
}
