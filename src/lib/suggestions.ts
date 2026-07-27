import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { ImprovementSuggestion, SuggestionCategory, SuggestionStatus } from '@site/src/lib/types';

/**
 * Improvement suggestions — file/list-own (FR-003, FR-004), admin
 * list+filter+transition (FR-005). Spec 005, T013/T018.
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) for the query shapes —
 * real authorization is RLS (supabase/migrations/0030) plus the
 * enforce_suggestion_status_transition() guard trigger (0031); a bug here
 * would degrade UX, not security.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export type FileSuggestionInput = {
  teacherId: string;
  pageSlug: string;
  sectionAnchor: string | null;
  locale: 'en' | 'ur';
  courseCode: string;
  unitNo: number | null;
  category: SuggestionCategory;
  body: string;
};

/** FR-003 — file a new suggestion; status always defaults to 'submitted' server-side. */
export async function fileSuggestion(input: FileSuggestionInput): Promise<Result<ImprovementSuggestion>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('improvement_suggestions')
    .insert({
      teacher_id: input.teacherId,
      page_slug: input.pageSlug,
      section_anchor: input.sectionAnchor,
      locale: input.locale,
      course_code: input.courseCode,
      unit_no: input.unitNo,
      category: input.category,
      body: input.body,
    })
    .select()
    .single();
  return { data: (data as ImprovementSuggestion) ?? null, error };
}

/** FR-004 — every suggestion the signed-in teacher has filed, most-recent-first. */
export async function fetchOwnSuggestions(): Promise<Result<ImprovementSuggestion[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('improvement_suggestions')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: (data as ImprovementSuggestion[]) ?? null, error };
}

export type ModerationQueueFilters = {
  status?: SuggestionStatus;
  category?: SuggestionCategory;
  courseCode?: string;
};

/** FR-005 — admin moderation queue, filterable by any combination of status/category/course. */
export async function fetchModerationQueue(filters: ModerationQueueFilters = {}): Promise<Result<ImprovementSuggestion[]>> {
  const supabase = await client();
  let query = supabase.from('improvement_suggestions').select('*');
  if (filters.status) query = query.eq('status', filters.status);
  if (filters.category) query = query.eq('category', filters.category);
  if (filters.courseCode) query = query.eq('course_code', filters.courseCode);
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data: (data as ImprovementSuggestion[]) ?? null, error };
}

/** FR-005 — transition a suggestion's status and attach a note; admin only (enforced by RLS + the guard trigger). */
export async function transitionSuggestion(
  id: string,
  status: SuggestionStatus,
  adminNote: string | null,
): Promise<Result<ImprovementSuggestion>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('improvement_suggestions')
    .update({ status, admin_note: adminNote })
    .eq('id', id)
    .select()
    .single();
  return { data: (data as ImprovementSuggestion) ?? null, error };
}

/** Does an error come from enforce_suggestion_status_transition() rejecting an illegal transition? */
export function isIllegalTransitionError(error: Error | null): boolean {
  return Boolean(error?.message?.toLowerCase().includes('illegal suggestion status transition'));
}
