import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { ActivityFeedback, TeachingLogSourceKind } from '@site/src/lib/types';

/**
 * Activity feedback - upsert-by-(teacher,course,unit,source_kind), own-record
 * read, admin aggregate read (FR-007, FR-008). Spec 005, T028.
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is
 * RLS (supabase/migrations/0029); a repeat submission upserts via
 * `on conflict ... do update`, matching data-model.md's revisable design.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export type SubmitFeedbackInput = {
  teacherId: string;
  courseCode: string;
  unitNo: number;
  sourceKind: TeachingLogSourceKind;
  rating: number;
  whatWorked: string | null;
  whatDidnt: string | null;
  actualMinutes: number;
};

/** FR-007 - submit or revise feedback for an activity; a repeat submission updates the existing record in place. */
export async function submitFeedback(input: SubmitFeedbackInput): Promise<Result<ActivityFeedback>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('activity_feedback')
    .upsert(
      {
        teacher_id: input.teacherId,
        course_code: input.courseCode,
        unit_no: input.unitNo,
        source_kind: input.sourceKind,
        rating: input.rating,
        what_worked: input.whatWorked,
        what_didnt: input.whatDidnt,
        actual_minutes: input.actualMinutes,
      },
      { onConflict: 'teacher_id,course_code,unit_no,source_kind' },
    )
    .select()
    .single();
  return { data: (data as ActivityFeedback) ?? null, error };
}

/** FR-007 - the signed-in teacher's own rating for one activity, if any (drives "invited to give feedback" vs. showing the existing rating). */
export async function fetchOwnFeedback(
  courseCode: string,
  unitNo: number,
  sourceKind: TeachingLogSourceKind,
): Promise<Result<ActivityFeedback | null>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('activity_feedback')
    .select('*')
    .eq('course_code', courseCode)
    .eq('unit_no', unitNo)
    .eq('source_kind', sourceKind)
    .maybeSingle();
  return { data: (data as ActivityFeedback) ?? null, error };
}

/** The signed-in teacher's own filed feedback across every activity, most-recent-first - for the Feedback & Suggestions area's history section. */
export async function fetchOwnFeedbackHistory(): Promise<Result<ActivityFeedback[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('activity_feedback')
    .select('*')
    .order('updated_at', { ascending: false });
  return { data: (data as ActivityFeedback[]) ?? null, error };
}

export type ActivityAggregateSummary = {
  courseCode: string;
  unitNo: number;
  sourceKind: TeachingLogSourceKind;
  averageRating: number;
  responseCount: number;
  whatDidntNotes: string[];
};

/** FR-008 - admin: every activity that has at least one rating, with its average and notes, for the aggregated feedback view. */
export async function fetchAllAggregatedFeedback(): Promise<Result<ActivityAggregateSummary[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('activity_feedback')
    .select('course_code, unit_no, source_kind, rating, what_didnt');
  if (error) return { data: null, error };

  type Row = { course_code: string; unit_no: number; source_kind: TeachingLogSourceKind; rating: number; what_didnt: string | null };
  const groups = new Map<string, { courseCode: string; unitNo: number; sourceKind: TeachingLogSourceKind; ratings: number[]; notes: string[] }>();
  for (const row of (data ?? []) as Row[]) {
    const key = `${row.course_code}::${row.unit_no}::${row.source_kind}`;
    const group = groups.get(key) ?? {
      courseCode: row.course_code, unitNo: row.unit_no, sourceKind: row.source_kind, ratings: [], notes: [],
    };
    group.ratings.push(row.rating);
    if (row.what_didnt) group.notes.push(row.what_didnt);
    groups.set(key, group);
  }

  const summaries: ActivityAggregateSummary[] = Array.from(groups.values()).map((g) => ({
    courseCode: g.courseCode,
    unitNo: g.unitNo,
    sourceKind: g.sourceKind,
    averageRating: g.ratings.reduce((sum, r) => sum + r, 0) / g.ratings.length,
    responseCount: g.ratings.length,
    whatDidntNotes: g.notes,
  }));

  return { data: summaries, error: null };
}

export type AggregatedFeedback = {
  averageRating: number;
  whatDidntNotes: string[];
  responseCount: number;
};

/** FR-008 - admin: average rating and every recorded what_didnt note across every teacher who has rated this activity. */
export async function fetchAggregatedFeedback(
  courseCode: string,
  unitNo: number,
  sourceKind: TeachingLogSourceKind,
): Promise<Result<AggregatedFeedback>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('activity_feedback')
    .select('rating, what_didnt')
    .eq('course_code', courseCode)
    .eq('unit_no', unitNo)
    .eq('source_kind', sourceKind);
  if (error) return { data: null, error };
  const rows = (data ?? []) as { rating: number; what_didnt: string | null }[];
  const responseCount = rows.length;
  const averageRating = responseCount === 0
    ? 0
    : rows.reduce((sum, r) => sum + r.rating, 0) / responseCount;
  const whatDidntNotes = rows.map((r) => r.what_didnt).filter((n): n is string => Boolean(n));
  return { data: { averageRating, whatDidntNotes, responseCount }, error: null };
}
