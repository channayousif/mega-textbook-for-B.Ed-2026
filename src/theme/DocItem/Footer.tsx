import React, { useState } from 'react';
import FooterOriginal from '@theme-original/DocItem/Footer';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/contexts/AuthContext';
import { markUnitStudied, fetchOwnUnitProgress } from '@site/src/lib/unitProgress';
import { createNote } from '@site/src/lib/studentNotes';
import { fileSuggestion } from '@site/src/lib/suggestions';
import { submitFeedback, fetchOwnFeedback } from '@site/src/lib/activityFeedback';
import { findNearestSectionAnchor, type TocEntry } from '@site/src/lib/docPosition';
import {
  submitFeedback as submitContentFeedback,
  submitGuestFeedback,
} from '@site/src/lib/contentFeedback';
import { fetchContentIndex } from '@site/src/lib/assignments';
import type { SuggestionCategory, TeachingLogSourceKind, ContentFeedbackPageKind, ContentFeedbackScope } from '@site/src/lib/types';

/**
 * Swizzled DocItem/Footer (Spec 004 T025, Spec 005 T014/T029, Spec 010 T021).
 *
 * Renders role-scoped controls on doc content pages:
 * - Student-only "Mark as studied" (Spec 004, unchanged) - unit pages only.
 * - Teacher-only "Suggest improvement" (Spec 005, FR-003) - any page
 *   carrying `course_code` in front matter, including course-overview pages
 *   with no `unit_no` (2026-07-24 remediation, research.md R1).
 * - Teacher-only "Give feedback on this activity" (Spec 005, FR-007, T029)
 *   - unit pages only (`course_code` AND `unit_no` both required), since
 *   feedback is inherently about one specific activity.
 * - Any-signed-in-reader "Give feedback" (Spec 010, FR-010-013) - the five
 *   page kinds research.md R6 names (topic, unit opening, unit-assessment,
 *   unit-teacher-notes, course-level review), whole-page or passage-anchored.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  markStudied: { en: 'Mark as studied', ur: 'پڑھا ہوا نشان زد کریں' },
  studied: { en: 'Marked as studied ✓', ur: 'پڑھا ہوا نشان زد ✓' },
  markError: { en: 'Could not mark this unit studied.', ur: 'اس یونٹ کو پڑھا ہوا نشان زد نہیں کیا جا سکا۔' },
  addNote: { en: 'Add a note about this page', ur: 'اس صفحے کے بارے میں نوٹ شامل کریں' },
  notePlaceholder: { en: 'Your note…', ur: 'آپ کا نوٹ…' },
  noteSave: { en: 'Save note', ur: 'نوٹ محفوظ کریں' },
  noteSaving: { en: 'Saving…', ur: 'محفوظ ہو رہا ہے…' },
  noteSaved: { en: 'Note saved - see it in your dashboard Notes.', ur: 'نوٹ محفوظ ہو گیا - اسے اپنے ڈیش بورڈ کے نوٹس میں دیکھیں۔' },
  noteError: { en: 'Could not save the note.', ur: 'نوٹ محفوظ نہیں ہو سکا۔' },
  noteSignIn: { en: 'Sign in as a student to keep notes on this page.', ur: 'اس صفحے پر نوٹس رکھنے کے لیے بطور طالب علم سائن ان کریں۔' },
  suggestImprovement: { en: 'Suggest improvement', ur: 'بہتری تجویز کریں' },
  category: { en: 'Category', ur: 'قسم' },
  categoryTypo: { en: 'Typo', ur: 'ٹائپو' },
  categoryClarity: { en: 'Clarity', ur: 'وضاحت' },
  categoryFactual: { en: 'Factual', ur: 'حقائق' },
  categoryPedagogy: { en: 'Pedagogy', ur: 'تدریس' },
  categoryTranslation: { en: 'Translation', ur: 'ترجمہ' },
  categoryOther: { en: 'Other', ur: 'دیگر' },
  bodyPlaceholder: { en: 'Describe the issue…', ur: 'مسئلہ بیان کریں…' },
  submitSuggestion: { en: 'Submit suggestion', ur: 'تجویز جمع کرائیں' },
  suggestionSubmitting: { en: 'Submitting…', ur: 'جمع ہو رہا ہے…' },
  suggestionSubmitted: { en: 'Suggestion submitted ✓', ur: 'تجویز جمع ہو گئی ✓' },
  suggestionError: { en: 'Could not submit the suggestion.', ur: 'تجویز جمع نہیں ہو سکی۔' },
  giveFeedback: { en: 'Give feedback on this activity', ur: 'اس سرگرمی پر رائے دیں' },
  rating: { en: 'Rating (1-5)', ur: 'ریٹنگ (1-5)' },
  whatWorked: { en: 'What worked', ur: 'کیا کارگر رہا' },
  whatDidnt: { en: "What didn't work", ur: 'کیا کارگر نہیں رہا' },
  actualMinutes: { en: 'Actual time taken (minutes)', ur: 'اصل وقت (منٹ)' },
  submitFeedback: { en: 'Submit feedback', ur: 'رائے جمع کرائیں' },
  feedbackSubmitting: { en: 'Submitting…', ur: 'جمع ہو رہا ہے…' },
  feedbackSubmitted: { en: 'Feedback submitted ✓', ur: 'رائے جمع ہو گئی ✓' },
  feedbackError: { en: 'Could not submit feedback.', ur: 'رائے جمع نہیں ہو سکی۔' },
  giveContentFeedback: { en: 'Give feedback', ur: 'رائے دیں' },
  contentFeedbackPassageHint: {
    en: 'You selected a passage - your feedback will quote it.',
    ur: 'آپ نے ایک اقتباس منتخب کیا ہے - آپ کی رائے اسے نقل کرے گی۔',
  },
  contentFeedbackWholePageHint: {
    en: 'Select some text first to comment on a specific passage, or leave it as general feedback on this page.',
    ur: 'کسی خاص اقتباس پر رائے دینے کے لیے پہلے کچھ متن منتخب کریں، یا اسے اس صفحے پر عمومی رائے کے طور پر چھوڑ دیں۔',
  },
  contentFeedbackSelectionTooLong: {
    en: 'Your selection is too long (max 2,000 characters). Please select a shorter passage.',
    ur: 'آپ کا انتخاب بہت طویل ہے (زیادہ سے زیادہ 2000 حروف)۔ براہ کرم مختصر اقتباس منتخب کریں۔',
  },
  contentFeedbackCommentPlaceholder: { en: 'Your feedback…', ur: 'آپ کی رائے…' },
  contentFeedbackSubmit: { en: 'Submit feedback', ur: 'رائے جمع کرائیں' },
  contentFeedbackSubmitting: { en: 'Submitting…', ur: 'جمع ہو رہا ہے…' },
  contentFeedbackSubmitted: { en: 'Feedback submitted ✓', ur: 'رائے جمع ہو گئی ✓' },
  contentFeedbackError: { en: 'Could not submit feedback.', ur: 'رائے جمع نہیں ہو سکی۔' },
  // Spec 010 follow-up (2026-09-07) - a curriculum owner report that (a) nothing hinted
  // text selection triggers passage-specific feedback until AFTER opening the form, (b)
  // the control silently disappeared once given once per page (never actually limited
  // server-side - a dead-end "submitted" state with no way back), and (c) only a signed-in
  // student/teacher could give feedback at all, with no path for a guest reader.
  contentFeedbackSelectionTip: {
    en: 'Tip: select any text on this page first to comment on that specific passage - or leave nothing selected for general feedback.',
    ur: 'تجویز: کسی خاص اقتباس پر رائے دینے کے لیے پہلے اس صفحے پر کوئی متن منتخب کریں - یا عمومی رائے کے لیے کچھ منتخب نہ کریں۔',
  },
  contentFeedbackGiveMore: { en: 'Give more feedback', ur: 'مزید رائے دیں' },
  contentFeedbackEmailLabel: { en: 'Your email', ur: 'آپ کا ای میل' },
  contentFeedbackGuestExplain: {
    en: 'You\'re not signed in, so we\'ll email you a link to confirm this is really you - your feedback only reaches the curriculum owner once you click it.',
    ur: 'آپ سائن ان نہیں ہیں، اس لیے ہم آپ کو ایک تصدیقی لنک ای میل کریں گے - آپ کی رائے نصاب کے ذمہ دار تک تب ہی پہنچے گی جب آپ اس لنک پر کلک کریں گے۔',
  },
  contentFeedbackGuestPending: {
    en: 'Feedback recorded - check your email and click the confirmation link to send it.',
    ur: 'رائے محفوظ ہو گئی - اپنا ای میل چیک کریں اور اسے بھیجنے کے لیے تصدیقی لنک پر کلک کریں۔',
  },
} as const;

const CONTENT_FEEDBACK_PASSAGE_LIMIT = 2000;
const CONTENT_FEEDBACK_CONTEXT_CHARS = 100;

/**
 * No front-matter field distinguishes activities.mdx/formative.mdx/
 * summative.mdx from index.mdx/teacher-notes.mdx (all five share the same
 * course_code/unit_no shape) - derived instead from the page's own path,
 * the same "read from the URL" approach FR-003's slug capture already uses.
 *
 * Spec 008 per-topic pages (`topic-NN`, `unit-assessment`, `course-review`) are
 * whole lessons / assessments, not one of the three FR-004 activity kinds - they
 * carry no per-activity feedback control, so this returns null for them (explicit
 * for clarity; the fallthrough already would). "Suggest improvement" and
 * "Mark as studied" still work - they read course_code [+ unit_no], present on all
 * the new files.
 */
function deriveSourceKindFromPath(pathname: string): TeachingLogSourceKind | null {
  const trimmed = pathname.replace(/\/+$/, '');
  const last = trimmed.split('/').pop() ?? '';
  // `course-review` stays null: it is a whole-course page and the teaching log
  // keys on (course_code, unit_no), so there is no unit for it to belong to.
  if (last === 'course-review') return null;
  if (/^topic-\d+$/.test(last)) return 'topic';
  if (last === 'unit-assessment') return 'assessment';
  if (last === 'activities') return 'activity';
  if (last === 'formative') return 'formative';
  if (last === 'summative') return 'summative';
  return null;
}

/**
 * research.md R6 - the five page kinds a reader's content-feedback control
 * reaches: topic-NN, unit-assessment, unit-teacher-notes, and course-review
 * are unambiguous from the URL's own last segment (the same "read from the
 * URL" idiom as deriveSourceKindFromPath). A bare `unit-NN` segment is
 * index.mdx - which is a per-topic unit's OPENING page (in scope) on some
 * courses and a legacy unit's opening page (out of scope) on others, with no
 * front-matter field distinguishing the two. `topicLayoutUnitKeys` (this
 * unit's own membership in content-index.json's `kind: 'topic'` records,
 * fetched once by the wrapper) is what resolves that one ambiguous case.
 */
function deriveContentFeedbackPageKind(
  pathname: string,
  courseCode: string | null,
  unitNo: number | null,
  topicLayoutUnitKeys: Set<string> | null,
): ContentFeedbackPageKind | null {
  const trimmed = pathname.replace(/\/+$/, '');
  const last = trimmed.split('/').pop() ?? '';
  if (/^topic-\d+$/.test(last)) return 'topic';
  if (last === 'unit-assessment') return 'unit_assessment';
  if (last === 'unit-teacher-notes') return 'unit_teacher_notes';
  if (last === 'course-review') return 'course_review';
  if (/^unit-\d+$/.test(last) && courseCode && unitNo !== null) {
    if (topicLayoutUnitKeys?.has(`${courseCode}|${unitNo}`)) return 'unit_opening';
  }
  return null;
}

/**
 * research.md R7 - best-effort re-location material: up to 100 characters of
 * the selection's own containing block's text immediately before and after
 * it. Never itself displayed to the owner - only used to attempt to re-find
 * a stale passage (contract: console-operations.md table B).
 */
function capturePassageContext(selection: Selection): string | null {
  if (selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  let block: HTMLElement | null = range.commonAncestorContainer.parentElement;
  while (block && !/^(P|LI|BLOCKQUOTE|TD|TH|DIV|FIGCAPTION)$/.test(block.tagName)) {
    block = block.parentElement;
  }
  if (!block) return null;
  const blockText = block.textContent ?? '';
  const selected = selection.toString();
  const idx = blockText.indexOf(selected);
  if (idx === -1) return null;
  const before = blockText.slice(Math.max(0, idx - CONTENT_FEEDBACK_CONTEXT_CHARS), idx);
  const after = blockText.slice(idx + selected.length, idx + selected.length + CONTENT_FEEDBACK_CONTEXT_CHARS);
  const context = `${before}${after}`.trim();
  return context || null;
}

function ContentFeedbackControl({
  courseCode,
  unitNo,
  topicNo,
  pageKind,
}: {
  courseCode: string;
  unitNo: number | null;
  topicNo: number | null;
  pageKind: ContentFeedbackPageKind;
}): React.ReactElement {
  const locale = useLocale();
  const { toc } = useDoc() as unknown as { toc: readonly TocEntry[] };
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [scope, setScope] = useState<ContentFeedbackScope>('whole_page');
  const [quotedPassage, setQuotedPassage] = useState<string | null>(null);
  const [passageContext, setPassageContext] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  // Honeypot (Spec 010 follow-up) - a real reader never sees or fills this
  // (visually hidden, tabIndex=-1); a bot filling in every field usually
  // does. Filled -> the Edge Function silently pretends success.
  const [website, setWebsite] = useState('');
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetForm(): void {
    setOpen(false);
    setScope('whole_page');
    setQuotedPassage(null);
    setPassageContext(null);
    setComment('');
    setEmail('');
    setWebsite('');
    setSubmitted(false);
    setError(null);
  }

  function handleOpen(): void {
    setError(null);
    const selectionText = typeof window !== 'undefined' ? window.getSelection()?.toString() ?? '' : '';
    if (selectionText.trim().length > 0) {
      if (selectionText.length > CONTENT_FEEDBACK_PASSAGE_LIMIT) {
        setError(MESSAGES.contentFeedbackSelectionTooLong[locale]);
        return;
      }
      const selectionObj = window.getSelection();
      setScope('passage');
      setQuotedPassage(selectionText);
      setPassageContext(selectionObj ? capturePassageContext(selectionObj) : null);
    } else {
      setScope('whole_page');
      setQuotedPassage(null);
      setPassageContext(null);
    }
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setPending(true);
    setError(null);
    const shared = {
      pageKind,
      courseCode,
      unitNo,
      topicNo,
      locale,
      sectionAnchor: findNearestSectionAnchor(toc),
      scope,
      quotedPassage,
      passageContext,
      comment,
    };
    const { error: submitError } = profile
      ? await submitContentFeedback({ authorId: profile.id, ...shared })
      : await submitGuestFeedback({ email, website, ...shared });
    setPending(false);
    if (submitError) {
      setError(MESSAGES.contentFeedbackError[locale]);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <p data-testid="content-feedback-submitted">
          {profile ? MESSAGES.contentFeedbackSubmitted[locale] : MESSAGES.contentFeedbackGuestPending[locale]}
        </p>
        {/* FR: feedback was never actually limited to once per page server-side - this was
            a dead-end UI state with no way back short of a reload. A reader (of any kind)
            may leave as many separate items as they like in one visit. */}
        <button
          type="button"
          className="button button--link button--sm"
          data-testid="content-feedback-again"
          onClick={resetForm}
        >
          {MESSAGES.contentFeedbackGiveMore[locale]}
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <>
        {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
        {/* Upfront guidance (Spec 010 follow-up) - previously the only hint about text
            selection triggering passage-specific feedback appeared AFTER opening the form,
            i.e. only once a reader had already found the mechanism by accident. */}
        <p data-testid="content-feedback-selection-hint" className="margin-bottom--sm">
          {MESSAGES.contentFeedbackSelectionTip[locale]}
        </p>
        <button
          type="button"
          className="button button--secondary button--sm"
          data-testid="content-feedback-button"
          onClick={handleOpen}
        >
          {MESSAGES.giveContentFeedback[locale]}
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="margin-top--sm">
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      <p data-testid="content-feedback-scope-hint">
        {scope === 'passage' ? MESSAGES.contentFeedbackPassageHint[locale] : MESSAGES.contentFeedbackWholePageHint[locale]}
      </p>
      {scope === 'passage' && quotedPassage && (
        <blockquote data-testid="content-feedback-quoted-passage">{quotedPassage}</blockquote>
      )}
      {!profile && (
        <div className="margin-bottom--sm">
          <label htmlFor="content-feedback-email">{MESSAGES.contentFeedbackEmailLabel[locale]}</label>
          <input
            id="content-feedback-email"
            type="email"
            className="input"
            data-testid="content-feedback-email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p data-testid="content-feedback-guest-explain">{MESSAGES.contentFeedbackGuestExplain[locale]}</p>
        </div>
      )}
      {/* Honeypot field - off-screen, unreachable by keyboard (tabIndex=-1), and never
          labelled as anything a real reader would want to fill in. */}
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto' }} aria-hidden="true">
        <label htmlFor="content-feedback-website">Website</label>
        <input
          id="content-feedback-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="margin-bottom--sm">
        <textarea
          data-testid="content-feedback-comment-textarea"
          className="input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={MESSAGES.contentFeedbackCommentPlaceholder[locale]}
          required
        />
      </div>
      <button
        type="submit"
        className="button button--primary button--sm"
        data-testid="content-feedback-submit-button"
        disabled={pending}
      >
        {pending ? MESSAGES.contentFeedbackSubmitting[locale] : MESSAGES.contentFeedbackSubmit[locale]}
      </button>
    </form>
  );
}

const CATEGORY_OPTIONS: { value: SuggestionCategory; label: keyof typeof MESSAGES }[] = [
  { value: 'typo', label: 'categoryTypo' },
  { value: 'clarity', label: 'categoryClarity' },
  { value: 'factual', label: 'categoryFactual' },
  { value: 'pedagogy', label: 'categoryPedagogy' },
  { value: 'translation', label: 'categoryTranslation' },
  { value: 'other', label: 'categoryOther' },
];

function SuggestImprovementControl({
  courseCode,
  unitNo,
}: {
  courseCode: string;
  unitNo: number | null;
}): React.ReactElement {
  const locale = useLocale();
  const location = useLocation();
  const { toc } = useDoc() as unknown as { toc: readonly TocEntry[] };
  const { i18n } = useDocusaurusContext();
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<SuggestionCategory>('clarity');
  const [body, setBody] = useState('');
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!profile) return;
    setPending(true);
    setError(null);
    const currentLocale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
    const { error: fileError } = await fileSuggestion({
      teacherId: profile.id,
      pageSlug: location.pathname,
      sectionAnchor: findNearestSectionAnchor(toc),
      locale: currentLocale,
      courseCode,
      unitNo,
      category,
      body,
    });
    setPending(false);
    if (fileError) {
      setError(MESSAGES.suggestionError[locale]);
      return;
    }
    setSubmitted(true);
    setBody('');
  }

  if (submitted) {
    return <p data-testid="suggestion-submitted">{MESSAGES.suggestionSubmitted[locale]}</p>;
  }

  if (!open) {
    return (
      <button
        type="button"
        className="button button--secondary button--sm"
        data-testid="suggest-improvement-button"
        onClick={() => setOpen(true)}
      >
        {MESSAGES.suggestImprovement[locale]}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="margin-top--sm">
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      <div className="margin-bottom--sm">
        <label htmlFor="suggestion-category">{MESSAGES.category[locale]}</label>
        <select
          id="suggestion-category"
          data-testid="suggestion-category-select"
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value as SuggestionCategory)}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{MESSAGES[opt.label][locale]}</option>
          ))}
        </select>
      </div>
      <div className="margin-bottom--sm">
        <textarea
          data-testid="suggestion-body-textarea"
          className="input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={MESSAGES.bodyPlaceholder[locale]}
          required
        />
      </div>
      <button
        type="submit"
        className="button button--primary button--sm"
        data-testid="suggestion-submit-button"
        disabled={pending}
      >
        {pending ? MESSAGES.suggestionSubmitting[locale] : MESSAGES.submitSuggestion[locale]}
      </button>
    </form>
  );
}

function FeedbackControl({
  courseCode,
  unitNo,
  sourceKind,
}: {
  courseCode: string;
  unitNo: number;
  sourceKind: TeachingLogSourceKind;
}): React.ReactElement | null {
  const locale = useLocale();
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [existing, setExisting] = useState<Awaited<ReturnType<typeof fetchOwnFeedback>>['data']>(null);
  const [loaded, setLoaded] = useState(false);
  const [rating, setRating] = useState(5);
  const [whatWorked, setWhatWorked] = useState('');
  const [whatDidnt, setWhatDidnt] = useState('');
  const [actualMinutes, setActualMinutes] = useState(15);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await fetchOwnFeedback(courseCode, unitNo, sourceKind);
      if (cancelled) return;
      if (data) {
        setExisting(data);
        setRating(data.rating);
        setWhatWorked(data.what_worked ?? '');
        setWhatDidnt(data.what_didnt ?? '');
        setActualMinutes(data.actual_minutes);
      }
      setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [courseCode, unitNo, sourceKind]);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!profile) return;
    setPending(true);
    setError(null);
    const { error: submitError } = await submitFeedback({
      teacherId: profile.id,
      courseCode,
      unitNo,
      sourceKind,
      rating,
      whatWorked: whatWorked || null,
      whatDidnt: whatDidnt || null,
      actualMinutes,
    });
    setPending(false);
    if (submitError) {
      setError(MESSAGES.feedbackError[locale]);
      return;
    }
    setSubmitted(true);
  }

  if (!loaded) return null;

  if (submitted) {
    return <p data-testid="feedback-submitted">{MESSAGES.feedbackSubmitted[locale]}</p>;
  }

  if (!open) {
    return (
      <button
        type="button"
        className="button button--secondary button--sm"
        data-testid="give-feedback-button"
        onClick={() => setOpen(true)}
      >
        {existing ? `${MESSAGES.giveFeedback[locale]} (${existing.rating}/5)` : MESSAGES.giveFeedback[locale]}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="margin-top--sm">
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      <div className="margin-bottom--sm">
        <label htmlFor="feedback-rating">{MESSAGES.rating[locale]}</label>
        <input
          id="feedback-rating"
          type="number"
          min={1}
          max={5}
          className="input"
          data-testid="feedback-rating-input"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </div>
      <div className="margin-bottom--sm">
        <label htmlFor="feedback-what-worked">{MESSAGES.whatWorked[locale]}</label>
        <textarea
          id="feedback-what-worked"
          className="input"
          data-testid="feedback-what-worked-textarea"
          value={whatWorked}
          onChange={(e) => setWhatWorked(e.target.value)}
        />
      </div>
      <div className="margin-bottom--sm">
        <label htmlFor="feedback-what-didnt">{MESSAGES.whatDidnt[locale]}</label>
        <textarea
          id="feedback-what-didnt"
          className="input"
          data-testid="feedback-what-didnt-textarea"
          value={whatDidnt}
          onChange={(e) => setWhatDidnt(e.target.value)}
        />
      </div>
      <div className="margin-bottom--sm">
        <label htmlFor="feedback-actual-minutes">{MESSAGES.actualMinutes[locale]}</label>
        <input
          id="feedback-actual-minutes"
          type="number"
          min={1}
          className="input"
          data-testid="feedback-actual-minutes-input"
          value={actualMinutes}
          onChange={(e) => setActualMinutes(Number(e.target.value))}
          required
        />
      </div>
      <button
        type="submit"
        className="button button--primary button--sm"
        data-testid="feedback-submit-button"
        disabled={pending}
      >
        {pending ? MESSAGES.feedbackSubmitting[locale] : MESSAGES.submitFeedback[locale]}
      </button>
    </form>
  );
}

/**
 * Spec 011 US3 - a signed-in student adds a personal note tagged to this
 * course/unit/topic; it shows up in the dashboard Notes area. RLS keeps it
 * private to the student.
 */
function AddNoteControl({
  courseCode,
  unitNo,
  topicNo,
}: {
  courseCode: string;
  unitNo: number | null;
  topicNo: number | null;
}): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!profile || !body.trim()) return;
    setPending(true);
    setError(null);
    const { error: err } = await createNote(profile.id, {
      body: body.trim(),
      courseCode,
      unitNo,
      topicNo,
    });
    setPending(false);
    if (err) {
      setError(MESSAGES.noteError[locale]);
      return;
    }
    setBody('');
    setOpen(false);
    setSaved(true);
  }

  if (saved) return <p data-testid="note-saved">{MESSAGES.noteSaved[locale]}</p>;

  if (!open) {
    return (
      <button
        type="button"
        className="button button--secondary button--sm"
        data-testid="add-note-button"
        onClick={() => setOpen(true)}
      >
        {MESSAGES.addNote[locale]}
      </button>
    );
  }

  return (
    <form onSubmit={handleSave} className="margin-top--sm">
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      <textarea
        className="input"
        rows={3}
        required
        placeholder={MESSAGES.notePlaceholder[locale]}
        aria-label={MESSAGES.addNote[locale]}
        data-testid="note-body-textarea"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        type="submit"
        className="button button--primary button--sm margin-top--sm"
        data-testid="note-save-button"
        disabled={pending || !body.trim()}
      >
        {pending ? MESSAGES.noteSaving[locale] : MESSAGES.noteSave[locale]}
      </button>
    </form>
  );
}

export default function DocItemFooterWrapper(): React.ReactElement {
  const locale = useLocale();
  const { frontMatter } = useDoc() as { frontMatter: Record<string, unknown> };
  const { role, profile, loading, session } = useAuth();
  const [marked, setMarked] = useState(false);
  // Whether the initial `unit_progress` read-back has resolved. Until it has,
  // the "Mark as studied" button is withheld so a unit the student already
  // marked never flashes as unmarked on load (the bug this mirrors the sibling
  // FeedbackControl's `loaded` gate to fix).
  const [markedHydrated, setMarkedHydrated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const courseCode = typeof frontMatter?.course_code === 'string' ? frontMatter.course_code : null;
  const unitNo = typeof frontMatter?.unit_no === 'number' ? frontMatter.unit_no : null;
  const topicNo = typeof frontMatter?.topic_no === 'number' ? frontMatter.topic_no : null;
  const sourceKind = deriveSourceKindFromPath(location.pathname);

  // Spec 010, research.md R6 — resolves the one ambiguous page kind (a bare
  // unit-NN URL — index.mdx — could be either layout's opening page).
  const [topicLayoutUnitKeys, setTopicLayoutUnitKeys] = useState<Set<string> | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    fetchContentIndex().then((entries) => {
      if (cancelled) return;
      setTopicLayoutUnitKeys(new Set(
        entries.filter((e) => e.kind === 'topic').map((e) => `${e.course_code}|${e.unit_no}`),
      ));
    });
    return () => { cancelled = true; };
  }, []);
  const contentFeedbackPageKind = deriveContentFeedbackPageKind(location.pathname, courseCode, unitNo, topicLayoutUnitKeys);

  // Spec 004 FR-006 read-back: a student who already marked this unit studied
  // must see it as studied on every subsequent load, not just within the
  // session that clicked. `unit_progress` is written correctly (RLS permits the
  // self-mark, the row persists) - what was missing here is this hydrating read,
  // the equivalent of FeedbackControl's own `fetchOwnFeedback` effect above.
  React.useEffect(() => {
    if (role !== 'student' || !profile || !courseCode || unitNo === null) {
      setMarkedHydrated(true);
      return;
    }
    let cancelled = false;
    setMarkedHydrated(false);
    (async () => {
      try {
        const { data } = await fetchOwnUnitProgress();
        if (cancelled) return;
        if (data?.some((row) => row.course_code === courseCode && row.unit_no === unitNo)) {
          setMarked(true);
        }
      } catch {
        // Unconfigured or unreachable Supabase: fall back to offering the
        // button rather than withholding the control forever. Never rethrow -
        // an unhandled rejection here would leave `markedHydrated` false and
        // the whole block unrendered.
      } finally {
        if (!cancelled) setMarkedHydrated(true);
      }
    })();
    return () => { cancelled = true; };
  }, [role, profile, courseCode, unitNo]);

  async function handleMark(): Promise<void> {
    if (!profile || !courseCode || unitNo === null) return;
    setPending(true);
    const { error: markError } = await markUnitStudied(profile.id, courseCode, unitNo);
    setPending(false);
    if (markError) {
      setError(MESSAGES.markError[locale]);
      return;
    }
    setMarked(true);
  }

  return (
    <>
      {role === 'student' && courseCode && unitNo !== null && (markedHydrated || marked) && (
        <div className="margin-top--md">
          {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
          {marked ? (
            <p>{MESSAGES.studied[locale]}</p>
          ) : (
            <button
              type="button"
              className="button button--secondary button--sm"
              disabled={pending}
              onClick={handleMark}
            >
              {MESSAGES.markStudied[locale]}
            </button>
          )}
        </div>
      )}
      {role === 'student' && courseCode && (
        <div className="margin-top--md">
          <AddNoteControl courseCode={courseCode} unitNo={unitNo} topicNo={topicNo} />
        </div>
      )}
      {role === 'teacher' && courseCode && (
        <div className="margin-top--md">
          <SuggestImprovementControl courseCode={courseCode} unitNo={unitNo} />
        </div>
      )}
      {role === 'teacher' && courseCode && unitNo !== null && sourceKind && (
        <div className="margin-top--md">
          <FeedbackControl courseCode={courseCode} unitNo={unitNo} sourceKind={sourceKind} />
        </div>
      )}
      {/*
        Spec 010 follow-up (2026-09-07) - was `role === 'student' || role === 'teacher'`
        only, silently excluding every signed-out reader and admin. Opened to any
        signed-out visitor too (as a guest, ContentFeedbackControl's own email path) -
        `!loading && !session` rather than a bare `!session`, so this doesn't flash into
        guest mode for an instant while a real student/teacher's session is still
        resolving (same `loading`-gated pattern as Content.tsx's self-assessment
        checklist and NavbarAuthWidget). Admin stays excluded on purpose: admin already
        has the owner console to act on every item directly, not a reason to give
        feedback to themselves.
      */}
      {!loading && (role === 'student' || role === 'teacher' || !session) && courseCode && contentFeedbackPageKind && (
        <div className="margin-top--md">
          <ContentFeedbackControl
            courseCode={courseCode}
            unitNo={unitNo}
            topicNo={topicNo}
            pageKind={contentFeedbackPageKind}
          />
        </div>
      )}
      <FooterOriginal />
    </>
  );
}
