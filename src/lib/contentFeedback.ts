import { getSupabase } from '@site/src/lib/supabase';
import { fetchContentIndex } from '@site/src/lib/assignments';
import { resolveContentPath, renderFeedbackExportDocument } from '@site/src/lib/feedbackExport';
import { fetchAllPages } from '@site/src/lib/pagination';
import type { Result } from '@site/src/lib/classes';
import type { ContentFeedback, ContentFeedbackPageKind, ContentFeedbackScope, ContentFeedbackStatus } from '@site/src/lib/types';

export { resolveContentPath, renderFeedbackExportDocument } from '@site/src/lib/feedbackExport';
export type { ExportableFeedback } from '@site/src/lib/feedbackExport';

/**
 * Content feedback - submit/read-own/admin-queue/transition helpers over
 * content_feedback (Spec 010, T020). Mirrors suggestions.ts's shape.
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is
 * RLS + two guard triggers (supabase/migrations/0033-0035); a bug here would
 * degrade UX, not security. `author_role` and the initial `status` are never
 * sent by this module - they are always stamped/forced server-side (FR-014).
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export type SubmitFeedbackInput = {
  authorId: string;
  pageKind: ContentFeedbackPageKind;
  courseCode: string;
  unitNo: number | null;
  topicNo: number | null;
  locale: 'en' | 'ur';
  sectionAnchor: string | null;
  scope: ContentFeedbackScope;
  quotedPassage: string | null;
  passageContext: string | null;
  comment: string;
};

/** FR-010, FR-011, FR-012 - submit whole-page or passage feedback; status always defaults to 'open' server-side. */
export async function submitFeedback(input: SubmitFeedbackInput): Promise<Result<ContentFeedback>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('content_feedback')
    .insert({
      author_id: input.authorId,
      page_kind: input.pageKind,
      course_code: input.courseCode,
      unit_no: input.unitNo,
      topic_no: input.topicNo,
      locale: input.locale,
      section_anchor: input.sectionAnchor,
      scope: input.scope,
      quoted_passage: input.quotedPassage,
      passage_context: input.passageContext,
      comment: input.comment,
    })
    .select()
    .single();
  return { data: (data as ContentFeedback) ?? null, error };
}

/** FR-015 - every feedback item the signed-in reader has filed, most-recent-first. */
export async function fetchOwnFeedback(): Promise<Result<ContentFeedback[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('content_feedback')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: (data as ContentFeedback[]) ?? null, error };
}

export type FeedbackQueueFilters = {
  status?: ContentFeedbackStatus;
  courseCode?: string;
  unitNo?: number;
  topicNo?: number;
  scope?: ContentFeedbackScope;
  locale?: 'en' | 'ur';
};

/**
 * FR-018 - admin triage queue, filterable by any combination of course/unit/topic/status/scope/
 * locale. Paginates (pagination.ts) rather than a bare `select('*')` - an unfiltered call (the
 * overview panel's own admin-wide aggregate) would otherwise silently truncate at PostgREST's
 * `max_rows` once this table has real usage, exactly like `unit_progress` already does.
 */
export async function fetchQueue(filters: FeedbackQueueFilters = {}): Promise<Result<ContentFeedback[]>> {
  const supabase = await client();
  return fetchAllPages<ContentFeedback>((from, to) => {
    let query = supabase.from('content_feedback').select('*');
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.courseCode) query = query.eq('course_code', filters.courseCode);
    if (filters.unitNo !== undefined) query = query.eq('unit_no', filters.unitNo);
    if (filters.topicNo !== undefined) query = query.eq('topic_no', filters.topicNo);
    if (filters.scope) query = query.eq('scope', filters.scope);
    if (filters.locale) query = query.eq('locale', filters.locale);
    return query.order('created_at', { ascending: false }).range(from, to);
  });
}

export type TransitionFeedbackOptions = {
  ownerNote?: string | null;
  resolutionRef?: string | null;
};

/** FR-019, FR-020 - transition a feedback item's status along the legal graph; admin only (enforced by RLS + the guard trigger). */
export async function transitionFeedback(
  id: string,
  status: ContentFeedbackStatus,
  options: TransitionFeedbackOptions = {},
): Promise<Result<ContentFeedback>> {
  const supabase = await client();
  const patch: Record<string, unknown> = { status };
  if (options.ownerNote !== undefined) patch.owner_note = options.ownerNote;
  if (options.resolutionRef !== undefined) patch.resolution_ref = options.resolutionRef;
  const { data, error } = await supabase
    .from('content_feedback')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  return { data: (data as ContentFeedback) ?? null, error };
}

/** Does an error come from enforce_content_feedback_status_transition() rejecting an illegal transition? */
export function isIllegalTransitionError(error: Error | null): boolean {
  return Boolean(error?.message?.toLowerCase().includes('illegal content_feedback status transition'));
}

/**
 * FR-022 - exports one unit's open/planned feedback as one self-contained Markdown
 * document, generated on demand and never stored (data-model.md's "Feedback export
 * bundle"). Idempotent: re-running with no queue change returns the same items again.
 */
export async function exportUnitFeedback(courseCode: string, unitNo: number): Promise<Result<string>> {
  const supabase = await client();
  const [{ data, error }, entries] = await Promise.all([
    supabase
      .from('content_feedback')
      .select('*')
      .eq('course_code', courseCode)
      .eq('unit_no', unitNo)
      .in('status', ['open', 'planned'])
      .order('created_at', { ascending: true }),
    fetchContentIndex(),
  ]);
  if (error) return { data: null, error };

  const semesterByCourseCode: Record<string, number> = {};
  for (const entry of entries) {
    if (!(entry.course_code in semesterByCourseCode)) semesterByCourseCode[entry.course_code] = entry.semester;
  }

  const document = renderFeedbackExportDocument(
    (data as ContentFeedback[]) ?? [],
    (item) => resolveContentPath(item, semesterByCourseCode),
  );
  return { data: document, error: null };
}
