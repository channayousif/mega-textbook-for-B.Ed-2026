import type { ContentFeedback } from '@site/src/lib/types';

/**
 * Pure feedback-export helpers (Spec 010, Story 5, FR-022) - deliberately free of any
 * `@site/...` VALUE import (only `import type`, erased at compile time) so this module is
 * directly unit-testable under vitest with a plain relative import, no Supabase/webpack
 * alias resolution needed. `src/lib/contentFeedback.ts`'s `exportUnitFeedback()` is the
 * only caller that adds the live query on top of these.
 */

const pad = (n: number) => String(n).padStart(2, '0');

export type ExportableFeedback = Pick<
  ContentFeedback,
  'page_kind' | 'course_code' | 'unit_no' | 'topic_no' | 'scope' | 'quoted_passage' | 'comment'
>;

/**
 * Resolves one feedback item's repo-relative source path, the same filename convention
 * `report-content-status.mjs`/`build-content-index.mjs` already encode. `semesterByCourseCode`
 * comes from `content-index.json` - content_feedback itself never stores a semester number,
 * since it is an unvalidated pointer (Art. V.1/V.4) same as every other course-scoped column
 * on this table. `null` when the course has no indexed record at all to resolve a semester
 * from (edge case - never guessed at).
 */
export function resolveContentPath(
  item: ExportableFeedback,
  semesterByCourseCode: Record<string, number>,
): string | null {
  const semester = semesterByCourseCode[item.course_code];
  if (semester === undefined) return null;
  const base = `docs/semester-${semester}/${item.course_code.toLowerCase()}`;

  switch (item.page_kind) {
    case 'course_review':
      return `${base}/course-review.mdx`;
    case 'unit_opening':
      return item.unit_no === null ? null : `${base}/unit-${pad(item.unit_no)}/index.mdx`;
    case 'unit_assessment':
      return item.unit_no === null ? null : `${base}/unit-${pad(item.unit_no)}/unit-assessment.mdx`;
    case 'unit_teacher_notes':
      return item.unit_no === null ? null : `${base}/unit-${pad(item.unit_no)}/unit-teacher-notes.mdx`;
    case 'topic':
      return item.unit_no === null || item.topic_no === null
        ? null
        : `${base}/unit-${pad(item.unit_no)}/topic-${pad(item.topic_no)}.mdx`;
    default:
      return null;
  }
}

/**
 * Renders the export document itself - a heading per affected file, each item's quoted
 * passage as a blockquote, its comment as prose beneath. Never pulls in page body text
 * (FR-022). Zero items renders an empty-but-valid document, not an error (edge case, US5).
 */
export function renderFeedbackExportDocument(
  items: ExportableFeedback[],
  resolvePath: (item: ExportableFeedback) => string | null,
): string {
  const lines: string[] = ['# Feedback export', ''];
  if (items.length === 0) {
    lines.push('No open or planned feedback items for this unit.', '');
    return lines.join('\n');
  }

  const byPath = new Map<string, ExportableFeedback[]>();
  for (const item of items) {
    const path = resolvePath(item) ?? `(unresolved path: ${item.course_code} unit ${item.unit_no ?? '-'} ${item.page_kind})`;
    if (!byPath.has(path)) byPath.set(path, []);
    byPath.get(path)!.push(item);
  }

  for (const [path, itemsForPath] of byPath) {
    lines.push(`## ${path}`, '');
    for (const item of itemsForPath) {
      if (item.scope === 'passage' && item.quoted_passage) {
        lines.push(`> ${item.quoted_passage}`, '');
      }
      lines.push(item.comment, '');
    }
  }
  return lines.join('\n');
}
