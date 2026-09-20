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
 * The unit-item kinds a teacher can assign, log, or rate (FR-004).
 *
 * This list used to hold only the legacy trio, on the reasoning that Spec 008's
 * `topic`/`assessment` pages "are whole lessons, not activity kinds". That was
 * defensible while most content was legacy. It stopped being defensible as the
 * corpus migrated: by 2026-09-20 EFMP-301 offered 0 loggable items of 5 indexed
 * and EFMP-302 0 of 31, so every course with real authored content offered a
 * teacher nothing at all, and the only loggable items left were `coming_soon`
 * scaffolds. A constraint that admits only placeholder content is not
 * protecting a distinction; it is disabling a feature. Migration 0045 widened
 * the database CHECKs to match.
 *
 * `course-review` is still excluded, and for a reason that has not changed: it
 * is a whole-COURSE page, while both tables key on (course_code, unit_no) with
 * unit_no NOT NULL. There is no unit for it to belong to.
 *
 * Every consumer that turns index records into a pickable activity MUST filter
 * through this, or it offers a value the schema will refuse on save.
 */
export const LOGGABLE_CONTENT_KINDS = ['activity', 'formative', 'summative', 'topic', 'assessment'] as const;

export type LoggableContentKind = (typeof LOGGABLE_CONTENT_KINDS)[number];

/**
 * One pickable item per (unit_no, kind) - the grain the DATABASE actually stores.
 *
 * The three tables key on (course_code, unit_no, source_kind) and carry no
 * topic_no; `activity_feedback` is even UNIQUE on
 * (teacher_id, course_code, unit_no, source_kind). So "Unit 2, topic" is one
 * row however many topic pages a unit has.
 *
 * Before migration 0045 this never showed, because `topic` was not loggable at
 * all. Widening the kinds exposed it immediately: EFMP-302 alone produced 31
 * options collapsing to 12 distinct values, with `3::topic` appearing five
 * times - nineteen entries a user could not tell apart, all saving to the same
 * row, and duplicate React keys besides.
 *
 * Deduplicating here rather than adding topic_no to three tables is the smaller
 * claim, and the honest one: a unit-grained log is what the schema was designed
 * for. If per-topic logging is wanted, that is a schema change and a product
 * decision, not a picker fix.
 */
export function loggableOptions(
  index: readonly ContentIndexEntry[],
  courseCode: string,
): (ContentIndexEntry & { pageCount: number })[] {
  const byKey = new Map<string, ContentIndexEntry & { pageCount: number }>();
  for (const entry of index) {
    if (entry.course_code !== courseCode || !isLoggableContent(entry)) continue;
    const key = `${entry.unit_no}::${entry.kind}`;
    const seen = byKey.get(key);
    if (seen) seen.pageCount++;
    else byKey.set(key, { ...entry, pageCount: 1 });
  }
  // `Array.from`, NOT `[...byKey.values()]`. This project's browserslist target
  // makes Babel transpile an array-literal spread to `[].concat(iterable)`, and
  // `concat` does not spread a Map iterator - it appends the iterator OBJECT as
  // one element. The picker rendered exactly one option reading
  // `undefined::undefined`, in the built bundle only; the source and the unit
  // tests were both fine, because node spreads iterators correctly.
  return Array.from(byKey.values()).sort(
    (a, b) => a.unit_no - b.unit_no || a.kind.localeCompare(b.kind),
  );
}

/** Narrows an index record to one of the three assignable/loggable kinds. */
export function isLoggableContent(
  entry: ContentIndexEntry,
): entry is ContentIndexEntry & { kind: LoggableContentKind } {
  return (LOGGABLE_CONTENT_KINDS as readonly string[]).includes(entry.kind);
}

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
