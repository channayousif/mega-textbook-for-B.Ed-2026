import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { Assignment, AssignmentSourceKind } from '@site/src/lib/types';

/**
 * Assignment CRUD (Spec 003, T032).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is
 * RLS + the `enforce_active_class()` trigger (supabase/migrations/0017).
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export type CreateAssignmentInput = {
  classId: string;
  sourceKind: AssignmentSourceKind;
  courseCode: string | null;
  unitNo: number | null;
  title: string;
  instructions: string | null;
  dueAtIso: string;
  maxMark: number;
  allowLate: boolean;
};

/** FR-004/FR-005 - create an assignment (unit-linked or custom), unpublished by default. */
export async function createAssignment(input: CreateAssignmentInput): Promise<Result<Assignment>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('assignments')
    .insert({
      class_id: input.classId,
      source_kind: input.sourceKind,
      course_code: input.courseCode,
      unit_no: input.unitNo,
      title: input.title,
      instructions: input.instructions,
      due_at: input.dueAtIso,
      max_mark: input.maxMark,
      allow_late: input.allowLate,
    })
    .select()
    .single();
  return { data: (data as Assignment) ?? null, error };
}

/** FR-005 - publish/unpublish, toggleable at any time regardless of existing submissions. */
export async function publishAssignment(assignmentId: string): Promise<Result<Assignment>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('assignments')
    .update({ published: true })
    .eq('id', assignmentId)
    .select()
    .single();
  return { data: (data as Assignment) ?? null, error };
}

export async function unpublishAssignment(assignmentId: string): Promise<Result<Assignment>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('assignments')
    .update({ published: false })
    .eq('id', assignmentId)
    .select()
    .single();
  return { data: (data as Assignment) ?? null, error };
}

/**
 * Spec 011 US5 / FR-012 - edit an assignment's editable fields after creation. The
 * owning-teacher check is enforced by RLS (`assignments_update`, migration 0017); the
 * `enforce_active_class()` trigger still re-asserts the parent class is active.
 */
export type AssignmentPatch = Partial<{
  title: string;
  instructions: string | null;
  due_at: string;
  max_mark: number;
  allow_late: boolean;
}>;

export async function updateAssignment(assignmentId: string, patch: AssignmentPatch): Promise<Result<Assignment>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('assignments')
    .update(patch)
    .eq('id', assignmentId)
    .select()
    .single();
  return { data: (data as Assignment) ?? null, error };
}

/**
 * Spec 011 US5 / FR-012 - delete an assignment. RLS (`assignments_delete`, migration 0039)
 * refuses the delete whenever the assignment has any submission, so a delete only ever
 * succeeds on an empty assignment - the caller can surface that as "cannot delete".
 */
export async function deleteAssignment(assignmentId: string): Promise<Result<null>> {
  const supabase = await client();
  const { error } = await supabase.from('assignments').delete().eq('id', assignmentId);
  return { data: null, error };
}

/** Teacher's full list for a class, including unpublished (FR-006). */
export async function listForTeacher(classId: string): Promise<Result<Assignment[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('class_id', classId)
    .order('due_at', { ascending: true });
  return { data: (data as Assignment[]) ?? null, error };
}

/** Student's published-only list for a class they're enrolled in (FR-006). */
export async function listPublishedForStudent(classId: string): Promise<Result<Assignment[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('class_id', classId)
    .eq('published', true)
    .order('due_at', { ascending: true });
  return { data: (data as Assignment[]) ?? null, error };
}

export async function getAssignment(assignmentId: string): Promise<Result<Assignment>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('id', assignmentId)
    .maybeSingle();
  return { data: (data as Assignment) ?? null, error };
}

export type ContentIndexEntry = {
  semester: number;
  course_code: string;
  unit_no: number;
  /** Spec 010 - set only on a `kind: 'topic'` record (front matter's own `topic_no`). */
  topic_no: number | null;
  kind: 'activity' | 'formative' | 'summative' | 'topic' | 'assessment' | 'course-review';
  title: string;
  coming_soon: boolean;
  permalink: string;
  /** Spec 010, research.md R5 - `- [ ]` count under a topic's own checklist section; `null` for every non-topic record. */
  self_assessment_count: number | null;
};

/**
 * Fetch the build-time content index (T034 - no Docusaurus hook exposes
 * custom front-matter, so this is a static JSON file generated by
 * scripts/build-content-index.mjs and copied verbatim into the build output).
 */
export async function fetchContentIndex(): Promise<ContentIndexEntry[]> {
  const res = await fetch('/content-index.json');
  if (!res.ok) return [];
  return (await res.json()) as ContentIndexEntry[];
}
