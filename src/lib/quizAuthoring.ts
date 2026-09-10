import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { QuizItem, AnswerKey, SubmissionQuizItemKind } from '@site/src/lib/types';

/**
 * Verified-teacher quiz-item / answer-key authoring (Spec 011, US6 / FR-014).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is RLS
 * (supabase/migrations/0040): every write here is gated on `public.is_verified_teacher()`,
 * the same check that already guards reads of these tables. An unverified teacher or a
 * student calling any write simply gets an RLS error back.
 *
 * Reads the FULL `quiz_items` row (including `correct_option`), which is only visible to a
 * verified teacher / admin - the student quiz-taking path uses `quiz_items_public`
 * (correct_option hidden) and is untouched.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

/** Full quiz_items rows for a unit (verified-teacher view, includes correct_option). */
export async function fetchAuthoringItems(courseCode: string, unitNo: number): Promise<Result<QuizItem[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('quiz_items')
    .select('*')
    .eq('course_code', courseCode)
    .eq('unit_no', unitNo)
    .order('created_at', { ascending: true });
  return { data: (data as QuizItem[]) ?? null, error };
}

export type NewQuizItem = {
  courseCode: string;
  unitNo: number;
  questionText: string;
  options: { key: string; text: string }[];
  correctOption: string;
};

export async function createQuizItem(input: NewQuizItem, createdBy: string): Promise<Result<QuizItem>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('quiz_items')
    .insert({
      course_code: input.courseCode,
      unit_no: input.unitNo,
      question_text: input.questionText,
      options: input.options,
      correct_option: input.correctOption,
      created_by: createdBy,
    })
    .select()
    .single();
  return { data: (data as QuizItem) ?? null, error };
}

export type QuizItemPatch = Partial<{
  question_text: string;
  options: { key: string; text: string }[];
  correct_option: string;
}>;

export async function updateQuizItem(id: string, patch: QuizItemPatch): Promise<Result<QuizItem>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('quiz_items')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  return { data: (data as QuizItem) ?? null, error };
}

export async function deleteQuizItem(id: string): Promise<Result<null>> {
  const supabase = await client();
  const { error } = await supabase.from('quiz_items').delete().eq('id', id);
  return { data: null, error };
}

/** Both answer keys (formative + summative) for a unit. */
export async function fetchAnswerKeys(courseCode: string, unitNo: number): Promise<Result<AnswerKey[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('answer_keys')
    .select('*')
    .eq('course_code', courseCode)
    .eq('unit_no', unitNo);
  return { data: (data as AnswerKey[]) ?? null, error };
}

/** Create or replace the answer key for a unit + kind (unique on course_code, unit_no, kind). */
export async function upsertAnswerKey(
  courseCode: string,
  unitNo: number,
  kind: SubmissionQuizItemKind,
  content: string,
  createdBy: string,
): Promise<Result<AnswerKey>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('answer_keys')
    .upsert(
      { course_code: courseCode, unit_no: unitNo, kind, content, created_by: createdBy },
      { onConflict: 'course_code,unit_no,kind' },
    )
    .select()
    .single();
  return { data: (data as AnswerKey) ?? null, error };
}

export async function deleteAnswerKey(id: string): Promise<Result<null>> {
  const supabase = await client();
  const { error } = await supabase.from('answer_keys').delete().eq('id', id);
  return { data: null, error };
}
