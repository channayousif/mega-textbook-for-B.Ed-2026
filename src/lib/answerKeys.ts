import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { AnswerKey, SubmissionQuizItemKind } from '@site/src/lib/types';

/**
 * Answer key / marking rubric lookup (Spec 003, T048).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) — real authorization is
 * RLS (supabase/migrations/0021), gated on `is_verified_teacher()`. An
 * unverified teacher or student calling this simply gets `data: null` back
 * (0 rows), never an error — the RLS policy filters, it doesn't reject.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

/** FR-013 — the official answer key/rubric for one unit's formative or summative item. */
export async function fetchAnswerKey(
  courseCode: string,
  unitNo: number,
  kind: SubmissionQuizItemKind,
): Promise<Result<AnswerKey>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('answer_keys')
    .select('*')
    .eq('course_code', courseCode)
    .eq('unit_no', unitNo)
    .eq('kind', kind)
    .maybeSingle();
  return { data: (data as AnswerKey) ?? null, error };
}
