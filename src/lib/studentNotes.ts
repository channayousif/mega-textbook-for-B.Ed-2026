import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { StudentNote } from '@site/src/lib/types';

/**
 * Personal notes - CRUD helpers over `student_notes` (Spec 011, US3 / FR-008, FR-009).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is RLS
 * (supabase/migrations/0038): every row is scoped to the owning student, and INSERT/UPDATE
 * additionally require the caller to currently hold the student role. Mirrors
 * unitProgress.ts / selfAssessment.ts in shape.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export type NewNoteInput = {
  body: string;
  title?: string | null;
  courseCode?: string | null;
  unitNo?: number | null;
  topicNo?: number | null;
};

export type NotePatch = {
  body?: string;
  title?: string | null;
};

/** FR-008 - the signed-in student's own notes, newest first (RLS-scoped). */
export async function listOwnNotes(): Promise<Result<StudentNote[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('student_notes')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: (data as StudentNote[]) ?? null, error };
}

/** FR-008 / FR-009 - create a note, optionally tagged to a course/unit/topic. */
export async function createNote(studentId: string, input: NewNoteInput): Promise<Result<StudentNote | null>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('student_notes')
    .insert({
      student_id: studentId,
      body: input.body,
      title: input.title ?? null,
      course_code: input.courseCode ?? null,
      unit_no: input.unitNo ?? null,
      topic_no: input.topicNo ?? null,
    })
    .select()
    .maybeSingle();
  return { data: (data as StudentNote) ?? null, error };
}

/** FR-008 - edit a note's body and/or title. */
export async function updateNote(id: string, patch: NotePatch): Promise<Result<StudentNote | null>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('student_notes')
    .update(patch)
    .eq('id', id)
    .select()
    .maybeSingle();
  return { data: (data as StudentNote) ?? null, error };
}

/** FR-008 - delete a note. */
export async function deleteNote(id: string): Promise<Result<null>> {
  const supabase = await client();
  const { error } = await supabase.from('student_notes').delete().eq('id', id);
  return { data: null, error };
}
