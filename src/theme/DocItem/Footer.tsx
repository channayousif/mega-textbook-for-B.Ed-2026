import React, { useState } from 'react';
import FooterOriginal from '@theme-original/DocItem/Footer';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/contexts/AuthContext';
import { markUnitStudied } from '@site/src/lib/unitProgress';
import { fileSuggestion } from '@site/src/lib/suggestions';
import { submitFeedback, fetchOwnFeedback } from '@site/src/lib/activityFeedback';
import type { SuggestionCategory, TeachingLogSourceKind } from '@site/src/lib/types';

/**
 * Swizzled DocItem/Footer (Spec 004 T025, Spec 005 T014/T029).
 *
 * Renders three role-scoped controls on doc content pages:
 * - Student-only "Mark as studied" (Spec 004, unchanged) — unit pages only.
 * - Teacher-only "Suggest improvement" (Spec 005, FR-003) — any page
 *   carrying `course_code` in front matter, including course-overview pages
 *   with no `unit_no` (2026-07-24 remediation, research.md R1).
 * - Teacher-only "Give feedback on this activity" (Spec 005, FR-007, T029)
 *   — unit pages only (`course_code` AND `unit_no` both required), since
 *   feedback is inherently about one specific activity.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  markStudied: { en: 'Mark as studied', ur: 'پڑھا ہوا نشان زد کریں' },
  studied: { en: 'Marked as studied ✓', ur: 'پڑھا ہوا نشان زد ✓' },
  markError: { en: 'Could not mark this unit studied.', ur: 'اس یونٹ کو پڑھا ہوا نشان زد نہیں کیا جا سکا۔' },
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
} as const;

/**
 * No front-matter field distinguishes activities.mdx/formative.mdx/
 * summative.mdx from index.mdx/teacher-notes.mdx (all five share the same
 * course_code/unit_no shape) — derived instead from the page's own path,
 * the same "read from the URL" approach FR-003's slug capture already uses.
 */
function deriveSourceKindFromPath(pathname: string): TeachingLogSourceKind | null {
  const trimmed = pathname.replace(/\/+$/, '');
  const last = trimmed.split('/').pop() ?? '';
  if (last === 'activities') return 'activity';
  if (last === 'formative') return 'formative';
  if (last === 'summative') return 'summative';
  return null;
}

const CATEGORY_OPTIONS: { value: SuggestionCategory; label: keyof typeof MESSAGES }[] = [
  { value: 'typo', label: 'categoryTypo' },
  { value: 'clarity', label: 'categoryClarity' },
  { value: 'factual', label: 'categoryFactual' },
  { value: 'pedagogy', label: 'categoryPedagogy' },
  { value: 'translation', label: 'categoryTranslation' },
  { value: 'other', label: 'categoryOther' },
];

type TocEntry = { value: string; id: string; level: number };

/**
 * research.md R1 — the last toc heading whose element has already scrolled
 * to or above a small "reading position" threshold; `null` if the reader is
 * above the first heading (top of page). Computed once, on click, not via a
 * continuous scroll listener.
 */
function findNearestSectionAnchor(toc: readonly TocEntry[]): string | null {
  if (typeof document === 'undefined') return null;
  const THRESHOLD_PX = 100;
  let nearest: string | null = null;
  for (const entry of toc) {
    const el = document.getElementById(entry.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= THRESHOLD_PX) {
      nearest = entry.id;
    }
  }
  return nearest;
}

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

export default function DocItemFooterWrapper(): React.ReactElement {
  const locale = useLocale();
  const { frontMatter } = useDoc() as { frontMatter: Record<string, unknown> };
  const { role, profile } = useAuth();
  const [marked, setMarked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const courseCode = typeof frontMatter?.course_code === 'string' ? frontMatter.course_code : null;
  const unitNo = typeof frontMatter?.unit_no === 'number' ? frontMatter.unit_no : null;
  const sourceKind = deriveSourceKindFromPath(location.pathname);

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
      {role === 'student' && courseCode && unitNo !== null && (
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
      <FooterOriginal />
    </>
  );
}
