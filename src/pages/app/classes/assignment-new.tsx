import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from '@site/src/components/AuthGuard';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import {
  createAssignment, publishAssignment, fetchContentIndex, type ContentIndexEntry,
} from '@site/src/lib/assignments';
import { fetchQuizUnitsForCourse } from '@site/src/lib/quiz';
import type { AssignmentSourceKind } from '@site/src/lib/types';

/**
 * Assignment creation - unit-item picker, quiz picker, or custom (Spec 003,
 * T034/T061/T062). FR-004, FR-005, FR-017, FR-016; targets SC-001's
 * ≤3-click/<2-min flow.
 */

type PickerMode = 'unit' | 'quiz' | 'custom';

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  noAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  pickUnitItem: {
    en: 'Pick an activity, formative, or summative item first.',
    ur: 'پہلے کوئی سرگرمی، تشکیلی یا تلخیصی آئٹم منتخب کریں۔',
  },
  pickQuizUnit: { en: 'Pick a unit with quiz questions first.', ur: 'پہلے ایسا یونٹ منتخب کریں جس میں کوئز سوالات موجود ہوں۔' },
  createError: {
    en: 'Could not create the assignment. Check the due date and maximum mark.',
    ur: 'اسائنمنٹ نہیں بنائی جا سکی۔ آخری تاریخ اور زیادہ سے زیادہ نمبر چیک کریں۔',
  },
  publishError: {
    en: 'Assignment created but could not be published - publish it from the assignment list.',
    ur: 'اسائنمنٹ بن گئی مگر شائع نہیں ہو سکی - اسے اسائنمنٹس کی فہرست سے شائع کریں۔',
  },
  published: { en: 'Assignment published.', ur: 'اسائنمنٹ شائع ہو گئی۔' },
  backToAssignments: { en: 'Back to assignments', ur: 'اسائنمنٹس کی فہرست پر واپس جائیں' },
  publishing: { en: 'Publishing…', ur: 'شائع ہو رہی ہے…' },
} as const;

function AssignmentNewContent({ classId }: { classId: string }): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const { loading: classLoading, classRow, role } = useClassRole(classId);
  const [contentIndex, setContentIndex] = useState<ContentIndexEntry[]>([]);
  const [quizUnits, setQuizUnits] = useState<number[]>([]);
  const [mode, setMode] = useState<PickerMode>('unit');
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedQuizUnit, setSelectedQuizUnit] = useState('');
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [maxMark, setMaxMark] = useState('100');
  const [allowLate, setAllowLate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetchContentIndex().then(setContentIndex);
  }, []);

  useEffect(() => {
    if (!classRow?.course_code) return;
    fetchQuizUnitsForCourse(classRow.course_code).then(({ data }) => setQuizUnits(data ?? []));
  }, [classRow?.course_code]);

  const unitItems = useMemo(
    () => contentIndex.filter(
      (entry): entry is ContentIndexEntry & { kind: AssignmentSourceKind } => entry.course_code === classRow?.course_code
        && (entry.kind === 'activity' || entry.kind === 'formative' || entry.kind === 'summative'),
    ),
    [contentIndex, classRow],
  );

  useEffect(() => {
    if (mode !== 'unit' || !selectedKey) return;
    const entry = unitItems.find((e) => `${e.unit_no}|${e.kind}` === selectedKey);
    if (entry) setTitle(entry.title);
  }, [selectedKey, mode, unitItems]);

  useEffect(() => {
    if (mode !== 'quiz' || !selectedQuizUnit) return;
    setTitle(`Quiz - Unit ${selectedQuizUnit}`);
  }, [selectedQuizUnit, mode]);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setError(null);

    let sourceKind: AssignmentSourceKind = 'custom';
    let courseCode: string | null = null;
    let unitNo: number | null = null;
    if (mode === 'unit') {
      const entry = unitItems.find((e2) => `${e2.unit_no}|${e2.kind}` === selectedKey);
      if (!entry) {
        setError(MESSAGES.pickUnitItem[locale]);
        return;
      }
      sourceKind = entry.kind;
      courseCode = entry.course_code;
      unitNo = entry.unit_no;
    } else if (mode === 'quiz') {
      if (!selectedQuizUnit) {
        setError(MESSAGES.pickQuizUnit[locale]);
        return;
      }
      sourceKind = 'quiz';
      courseCode = classRow!.course_code;
      unitNo = Number(selectedQuizUnit);
    }

    setSubmitting(true);
    const { data, error: createError } = await createAssignment({
      classId,
      sourceKind,
      courseCode,
      unitNo,
      title: title.trim(),
      instructions: instructions.trim() || null,
      dueAtIso: new Date(dueAt).toISOString(),
      maxMark: Number(maxMark),
      allowLate,
    });

    if (createError || !data) {
      setSubmitting(false);
      setError(MESSAGES.createError[locale]);
      return;
    }

    const { error: publishError } = await publishAssignment(data.id);
    setSubmitting(false);
    if (publishError) {
      setError(MESSAGES.publishError[locale]);
      return;
    }
    setDone(true);
  }

  if (classLoading) return <p>{MESSAGES.loading[locale]}</p>;
  if (!classRow || role !== 'teacher') {
    return (
      <div className="alert alert--danger" role="alert" aria-live="assertive">
        {MESSAGES.noAccess[locale]}
      </div>
    );
  }
  if (done) {
    return (
      <div className="alert alert--success" role="status">
        {MESSAGES.published[locale]} <Link to={`/app/classes/assignments?classId=${classId}`}>{MESSAGES.backToAssignments[locale]}</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>New assignment - {classRow.name}</h2>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset className="margin-bottom--md">
          <legend>Source</legend>
          <label className="margin-right--md">
            <input type="radio" name="mode" checked={mode === 'unit'} onChange={() => setMode('unit')} />
            {' '}From a unit
          </label>
          <label className="margin-right--md">
            <input type="radio" name="mode" checked={mode === 'quiz'} onChange={() => setMode('quiz')} />
            {' '}Quiz
          </label>
          <label>
            <input type="radio" name="mode" checked={mode === 'custom'} onChange={() => setMode('custom')} />
            {' '}Custom
          </label>
        </fieldset>

        {mode === 'unit' && (
          <div className="margin-bottom--md">
            <label htmlFor="unitItem">Unit item</label>
            <select
              id="unitItem"
              className="input"
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              required
            >
              <option value="">Choose…</option>
              {unitItems.map((entry) => (
                <option key={`${entry.unit_no}|${entry.kind}`} value={`${entry.unit_no}|${entry.kind}`}>
                  Unit {entry.unit_no} - {entry.kind} - {entry.title}
                  {entry.coming_soon ? ' (coming soon)' : ''}
                </option>
              ))}
            </select>
            {unitItems.length === 0 && <p>No units published yet for {classRow.course_code}.</p>}
          </div>
        )}

        {mode === 'quiz' && (
          <div className="margin-bottom--md">
            <label htmlFor="quizUnit">Quiz unit</label>
            <select
              id="quizUnit"
              className="input"
              value={selectedQuizUnit}
              onChange={(e) => setSelectedQuizUnit(e.target.value)}
              required
            >
              <option value="">Choose…</option>
              {quizUnits.map((unitNo) => (
                <option key={unitNo} value={unitNo}>Unit {unitNo}</option>
              ))}
            </select>
            {quizUnits.length === 0 && <p>No quiz questions available yet for {classRow.course_code}.</p>}
          </div>
        )}

        <div className="margin-bottom--sm">
          <label htmlFor="title">Title</label>
          <input id="title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="margin-bottom--sm">
          <label htmlFor="instructions">Instructions (optional)</label>
          <textarea
            id="instructions"
            className="input"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <div className="margin-bottom--sm">
          <label htmlFor="dueAt">Due date</label>
          <input
            id="dueAt"
            type="datetime-local"
            className="input"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            required
          />
        </div>
        <div className="margin-bottom--sm">
          <label htmlFor="maxMark">Maximum mark</label>
          <input
            id="maxMark"
            type="number"
            min="1"
            step="0.5"
            className="input"
            value={maxMark}
            onChange={(e) => setMaxMark(e.target.value)}
            required
          />
        </div>
        {mode !== 'quiz' && (
          <div className="margin-bottom--md">
            <label>
              <input type="checkbox" checked={allowLate} onChange={(e) => setAllowLate(e.target.checked)} />
              {' '}Allow late submissions
            </label>
          </div>
        )}

        <button type="submit" className="button button--primary" disabled={submitting}>
          {submitting ? MESSAGES.publishing[locale] : 'Publish assignment'}
        </button>
      </form>
    </div>
  );
}

export default function AssignmentNewPage(): React.ReactElement {
  const classId = useQueryParam('classId');
  return (
    <Layout title="New assignment">
      <AuthGuard requireRole="teacher">
        <main className="container auth-page margin-vert--lg">
          {classId ? <AssignmentNewContent classId={classId} /> : <p>No class selected.</p>}
        </main>
      </AuthGuard>
    </Layout>
  );
}
