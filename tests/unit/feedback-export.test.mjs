/**
 * T031 [US5] — a unit with zero open/planned items produces an empty export
 * document, not an error; re-exporting after no queue change returns the
 * exact same items (idempotent, edge case); the document contains no page
 * body text, only repo-relative paths, quotes, and comments (FR-022;
 * contract checklist item 14).
 *
 * Tests the pure rendering/path-resolution functions directly (no live
 * Supabase project needed) - `src/lib/contentFeedback.ts`'s `exportUnitFeedback()`
 * is the thin, live-query wrapper around these same two functions.
 */
import { describe, it, expect } from 'vitest';
import { resolveContentPath, renderFeedbackExportDocument } from '../../src/lib/feedbackExport.ts';

function feedbackItem(overrides = {}) {
  return {
    page_kind: 'topic',
    course_code: 'EFMP-302',
    unit_no: 1,
    topic_no: 1,
    scope: 'whole_page',
    quoted_passage: null,
    comment: 'A comment.',
    ...overrides,
  };
}

const SEMESTERS = { 'EFMP-302': 1 };
const resolve = (item) => resolveContentPath(item, SEMESTERS);

describe('resolveContentPath', () => {
  it('resolves a topic item to its repo-relative path', () => {
    expect(resolveContentPath(feedbackItem({ topic_no: 3 }), SEMESTERS))
      .toBe('docs/semester-1/efmp-302/unit-01/topic-03.mdx');
  });

  it('resolves a unit_opening item to its unit\'s index.mdx', () => {
    expect(resolveContentPath(feedbackItem({ page_kind: 'unit_opening', topic_no: null }), SEMESTERS))
      .toBe('docs/semester-1/efmp-302/unit-01/index.mdx');
  });

  it('resolves a unit_assessment item', () => {
    expect(resolveContentPath(feedbackItem({ page_kind: 'unit_assessment', topic_no: null }), SEMESTERS))
      .toBe('docs/semester-1/efmp-302/unit-01/unit-assessment.mdx');
  });

  it('resolves a unit_teacher_notes item', () => {
    expect(resolveContentPath(feedbackItem({ page_kind: 'unit_teacher_notes', topic_no: null }), SEMESTERS))
      .toBe('docs/semester-1/efmp-302/unit-01/unit-teacher-notes.mdx');
  });

  it('resolves a course_review item to the course root, no unit segment', () => {
    expect(resolveContentPath(feedbackItem({ page_kind: 'course_review', unit_no: null, topic_no: null }), SEMESTERS))
      .toBe('docs/semester-1/efmp-302/course-review.mdx');
  });

  it('returns null when the course has no indexed semester (never guessed at)', () => {
    expect(resolveContentPath(feedbackItem({ course_code: 'GICT-999' }), SEMESTERS)).toBeNull();
  });
});

describe('renderFeedbackExportDocument', () => {
  it('a unit with zero items produces an empty-but-valid document, not an error', () => {
    const doc = renderFeedbackExportDocument([], resolve);
    expect(doc).toContain('No open or planned feedback items');
    expect(doc).not.toMatch(/undefined|null|\[object/i);
  });

  it('re-rendering the exact same items twice returns the same document (idempotent)', () => {
    const items = [feedbackItem({ comment: 'First item.' }), feedbackItem({ topic_no: 2, comment: 'Second item.' })];
    expect(renderFeedbackExportDocument(items, resolve)).toBe(renderFeedbackExportDocument(items, resolve));
  });

  it('contains repo-relative paths, quotes, and comments, but no page body text', () => {
    const items = [
      feedbackItem({
        scope: 'passage', quoted_passage: 'The exact quoted sentence.', comment: 'This needs a citation.',
      }),
    ];
    const doc = renderFeedbackExportDocument(items, resolve);
    expect(doc).toContain('docs/semester-1/efmp-302/unit-01/topic-01.mdx');
    expect(doc).toContain('> The exact quoted sentence.');
    expect(doc).toContain('This needs a citation.');
    // No page body text is ever pulled in — the document is built entirely
    // from the item fields above, so it cannot contain prose this test never
    // supplied (a stand-in for "no body text leaked in").
    expect(doc).not.toContain('Not every job is a profession');
  });

  it('groups multiple items for the same file under one heading', () => {
    const items = [
      feedbackItem({ comment: 'First.' }),
      feedbackItem({ comment: 'Second.' }),
    ];
    const doc = renderFeedbackExportDocument(items, resolve);
    expect(doc.match(/## docs\/semester-1\/efmp-302\/unit-01\/topic-01\.mdx/g)).toHaveLength(1);
    expect(doc).toContain('First.');
    expect(doc).toContain('Second.');
  });

  it('falls back to an unresolved-path placeholder rather than guessing, when the course is unindexed', () => {
    const doc = renderFeedbackExportDocument([feedbackItem({ course_code: 'GICT-999' })], resolve);
    expect(doc).toContain('(unresolved path: GICT-999 unit 1 topic)');
  });
});
