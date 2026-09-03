import { getSupabase } from '@site/src/lib/supabase';
import { fetchContentIndex } from '@site/src/lib/assignments';
import type { Result } from '@site/src/lib/classes';
import type { UnitProgress } from '@site/src/lib/types';

/**
 * Unit coverage - self-marking + read helpers (Spec 004, T005/T023).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) for the read helper and
 * the self-mark insert - real authorization is RLS (supabase/migrations/0024).
 * `method='assignment'`/`'quiz'` rows are written exclusively by the
 * SECURITY DEFINER sync triggers (0025); this file never attempts those.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

/**
 * FR-006 - mark a unit studied, independent of any assignment. Idempotent:
 * re-marking an already-covered unit (self-marked or otherwise) is a no-op,
 * never a duplicate row or an error (User Story 4 AS2/AS3).
 */
export async function markUnitStudied(studentId: string, courseCode: string, unitNo: number): Promise<Result<UnitProgress | null>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('unit_progress')
    .upsert(
      { student_id: studentId, course_code: courseCode, unit_no: unitNo, method: 'self_marked' },
      { onConflict: 'student_id,course_code,unit_no', ignoreDuplicates: true },
    )
    .select()
    .maybeSingle();
  return { data: (data as UnitProgress) ?? null, error };
}

/** FR-005 - the signed-in student's own unit_progress rows (RLS-scoped). */
export async function fetchOwnUnitProgress(): Promise<Result<UnitProgress[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('unit_progress')
    .select('*');
  return { data: (data as UnitProgress[]) ?? null, error };
}

/**
 * FR-005, research.md R1 - total units for a course, derived from the
 * build-time content index (never duplicated into Postgres). Counts distinct
 * `unit_no` across all indexed kinds (activities/formative/summative), which
 * already covers every scaffolded unit - authored or `coming_soon` - since
 * Spec 001's five-file-per-unit rule guarantees `activities.mdx` exists for
 * every unit folder.
 */
export async function fetchTotalUnitsForCourse(courseCode: string): Promise<number> {
  const entries = await fetchContentIndex();
  const unitNumbers = new Set(
    entries.filter((e) => e.course_code === courseCode).map((e) => e.unit_no),
  );
  return unitNumbers.size;
}

/**
 * FR-005 - total units for every course the student has any unit_progress in,
 * keyed by course_code. Used by the Progress area (T020) so it only has to
 * fetch the content index once for every course it needs to display.
 */
export async function fetchTotalUnitsForCourses(courseCodes: string[]): Promise<Record<string, number>> {
  const entries = await fetchContentIndex();
  const result: Record<string, number> = {};
  for (const courseCode of courseCodes) {
    result[courseCode] = new Set(
      entries.filter((e) => e.course_code === courseCode).map((e) => e.unit_no),
    ).size;
  }
  return result;
}

/** FR-006 - the full sorted list of unit numbers for a course, so the Progress area (T024) can offer a "Mark as studied" control per not-yet-covered unit. */
export async function fetchUnitNumbersForCourse(courseCode: string): Promise<number[]> {
  const entries = await fetchContentIndex();
  return Array.from(new Set(entries.filter((e) => e.course_code === courseCode).map((e) => e.unit_no))).sort((a, b) => a - b);
}
