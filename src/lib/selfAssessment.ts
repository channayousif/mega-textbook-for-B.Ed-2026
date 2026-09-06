import { getSupabase } from '@site/src/lib/supabase';
import { fetchAllPages } from '@site/src/lib/pagination';
import type { Result } from '@site/src/lib/classes';
import type { SelfAssessmentCheck } from '@site/src/lib/types';

/**
 * Self-assessment checklist - upsert/read/admin-aggregate helpers over
 * self_assessment_checks (Spec 010, T011).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is
 * RLS + the enforce_self_assessment_immutable_identity() trigger
 * (supabase/migrations/0032). Mirrors unitProgress.ts's shape.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export type UpsertCheckInput = {
  studentId: string;
  courseCode: string;
  unitNo: number;
  topicNo: number;
  locale: 'en' | 'ur';
  itemPosition: number;
  itemTextSnapshot: string;
  checked: boolean;
};

/**
 * Tick, re-tick, or untick one item (FR-001). Upserts on the table's natural
 * key so a repeat write for the same position never duplicates a row - it
 * always overwrites both `checked` and `item_text_snapshot` (research.md R3).
 */
export async function upsertCheck(input: UpsertCheckInput): Promise<Result<SelfAssessmentCheck | null>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('self_assessment_checks')
    .upsert(
      {
        student_id: input.studentId,
        course_code: input.courseCode,
        unit_no: input.unitNo,
        topic_no: input.topicNo,
        locale: input.locale,
        item_position: input.itemPosition,
        item_text_snapshot: input.itemTextSnapshot,
        checked: input.checked,
      },
      { onConflict: 'student_id,course_code,unit_no,topic_no,locale,item_position' },
    )
    .select()
    .maybeSingle();
  return { data: (data as SelfAssessmentCheck) ?? null, error };
}

/** FR-004 - the signed-in student's own checks for one topic (all positions at once). */
export async function fetchOwnChecks(
  courseCode: string,
  unitNo: number,
  topicNo: number,
  locale: 'en' | 'ur',
): Promise<Result<SelfAssessmentCheck[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('self_assessment_checks')
    .select('*')
    .eq('course_code', courseCode)
    .eq('unit_no', unitNo)
    .eq('topic_no', topicNo)
    .eq('locale', locale);
  return { data: (data as SelfAssessmentCheck[]) ?? null, error };
}

/**
 * FR-004 - the signed-in student's own checks across a set of courses, for the
 * Progress area's per-topic/unit/course roll-up (paired with
 * content-index.json's self_assessment_count).
 */
export async function fetchOwnChecksForCourses(courseCodes: string[]): Promise<Result<SelfAssessmentCheck[]>> {
  if (courseCodes.length === 0) return { data: [], error: null };
  const supabase = await client();
  const { data, error } = await supabase
    .from('self_assessment_checks')
    .select('*')
    .in('course_code', courseCodes);
  return { data: (data as SelfAssessmentCheck[]) ?? null, error };
}

export type LocalCheckEntry = {
  courseCode: string;
  unitNo: number;
  topicNo: number;
  locale: 'en' | 'ur';
  itemPosition: number;
  itemTextSnapshot: string;
  checked: boolean;
};

/**
 * research.md R4 - the one-time signed-out-to-signed-in merge. Uses
 * `ignoreDuplicates: true` (same primitive as `unitProgress.ts`'s
 * `markUnitStudied`) so a tuple the account already has a row for is left
 * untouched - "the account's own record is authoritative" after the first
 * merge, never re-imported or overwritten by a later merge attempt.
 */
export async function mergeLocalChecks(studentId: string, entries: LocalCheckEntry[]): Promise<Result<null>> {
  if (entries.length === 0) return { data: null, error: null };
  const supabase = await client();
  const { error } = await supabase
    .from('self_assessment_checks')
    .upsert(
      entries.map((e) => ({
        student_id: studentId,
        course_code: e.courseCode,
        unit_no: e.unitNo,
        topic_no: e.topicNo,
        locale: e.locale,
        item_position: e.itemPosition,
        item_text_snapshot: e.itemTextSnapshot,
        checked: e.checked,
      })),
      { onConflict: 'student_id,course_code,unit_no,topic_no,locale,item_position', ignoreDuplicates: true },
    );
  return { data: null, error };
}

export type SelfAssessmentAggregateRow = {
  course_code: string;
  unit_no: number;
  ticked_count: number;
  distinct_students: number;
};

/**
 * FR-006 - admin-only aggregate across every student, optionally scoped to a course/unit. No
 * teacher can reach this (RLS has no teacher branch at all). Paginates (pagination.ts) rather
 * than a bare unfiltered select - this table will outgrow PostgREST's `max_rows` over time,
 * exactly like `unit_progress` already has, and a truncated read would silently under-count.
 */
export async function fetchAdminAggregate(
  courseCode?: string,
  unitNo?: number,
): Promise<Result<SelfAssessmentAggregateRow[]>> {
  const supabase = await client();
  const { data, error } = await fetchAllPages<{ course_code: string; unit_no: number; checked: boolean; student_id: string }>(
    (from, to) => {
      let query = supabase.from('self_assessment_checks').select('course_code, unit_no, checked, student_id');
      if (courseCode) query = query.eq('course_code', courseCode);
      if (unitNo !== undefined) query = query.eq('unit_no', unitNo);
      return query.order('id', { ascending: true }).range(from, to);
    },
  );
  if (error || !data) return { data: null, error };

  const byKey = new Map<string, { course_code: string; unit_no: number; ticked_count: number; students: Set<string> }>();
  for (const row of data) {
    const key = `${row.course_code}::${row.unit_no}`;
    if (!byKey.has(key)) {
      byKey.set(key, { course_code: row.course_code, unit_no: row.unit_no, ticked_count: 0, students: new Set() });
    }
    const entry = byKey.get(key)!;
    if (row.checked) entry.ticked_count += 1;
    entry.students.add(row.student_id);
  }
  const rows: SelfAssessmentAggregateRow[] = Array.from(byKey.values()).map((e) => ({
    course_code: e.course_code,
    unit_no: e.unit_no,
    ticked_count: e.ticked_count,
    distinct_students: e.students.size,
  }));
  return { data: rows, error: null };
}
