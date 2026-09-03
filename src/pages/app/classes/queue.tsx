import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from '@site/src/components/AuthGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import { getAssignment } from '@site/src/lib/assignments';
import { getSubmissionFileUrl, statusLabel } from '@site/src/lib/submissions';
import { fetchQueue, gradeAndReturn, editGrade, isMaxMarkError } from '@site/src/lib/grading';
import type { QueueRow } from '@site/src/lib/grading';
import { fetchAnswerKey } from '@site/src/lib/answerKeys';
import type { Assignment, AnswerKey } from '@site/src/lib/types';

/**
 * Teacher's grading queue (Spec 003, T044/T049/T062). List view, one row per
 * actively enrolled student - submitted/late/missing/graded (FR-006),
 * mark+feedback entry with max-mark validation (FR-010), anonymized
 * placeholder for a tombstoned student whose `profiles.full_name IS NULL`
 * (FR-019), and - for a verified teacher grading a formative/summative
 * unit item - the official answer key/rubric (FR-013). Bilingual status/
 * error text (FR-016); static labels stay English (Spec 002 precedent).
 */

const ANONYMIZED_LABEL = '(no name set)'; // same convention as roster.tsx - covers both "never set" and tombstoned

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  noAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  loadAssignmentError: { en: 'Could not load this assignment.', ur: 'یہ اسائنمنٹ لوڈ نہیں ہو سکی۔' },
  loadQueueError: { en: 'Could not load the grading queue.', ur: 'گریڈنگ قطار لوڈ نہیں ہو سکی۔' },
  enterValidMark: { en: 'Enter a valid mark.', ur: 'درست نمبر درج کریں۔' },
  saveError: { en: 'Could not save the grade.', ur: 'نمبر محفوظ نہیں ہو سکے۔' },
  saving: { en: 'Saving…', ur: 'محفوظ ہو رہا ہے…' },
  showAnswerKey: { en: 'Show answer key / rubric', ur: 'جوابی کلید / روبرک دکھائیں' },
  loadingAnswerKey: { en: 'Loading answer key…', ur: 'جوابی کلید لوڈ ہو رہی ہے…' },
  noAnswerKey: { en: 'No answer key on file for this unit.', ur: 'اس یونٹ کے لیے کوئی جوابی کلید موجود نہیں۔' },
} as const;

function markCannotExceed(locale: 'en' | 'ur', maxMark: number): string {
  return locale === 'ur' ? `نمبر ${maxMark} سے زیادہ نہیں ہو سکتے۔` : `Mark cannot exceed ${maxMark}.`;
}

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

/**
 * FR-013 - only rendered when the caller's `verified_teacher` flag is true;
 * absent (not just hidden) otherwise. Fetches lazily on reveal, not on page
 * load - RLS already denies an unverified caller 0 rows either way, but
 * there is no reason to fetch restricted content before the teacher asks for it.
 */
function AnswerKeyPanel({ assignment }: { assignment: Pick<Assignment, 'course_code' | 'unit_no' | 'source_kind'> }): React.ReactElement | null {
  const locale = useLocale();
  const [revealed, setRevealed] = useState(false);
  const [answerKey, setAnswerKey] = useState<AnswerKey | null | undefined>(undefined);

  if (
    assignment.source_kind !== 'formative' && assignment.source_kind !== 'summative'
  ) return null;
  if (!assignment.course_code || assignment.unit_no === null) return null;

  async function reveal(): Promise<void> {
    setRevealed(true);
    if (answerKey === undefined) {
      const { data } = await fetchAnswerKey(
        assignment.course_code!,
        assignment.unit_no!,
        assignment.source_kind as 'formative' | 'summative',
      );
      setAnswerKey(data);
    }
  }

  return (
    <div className="margin-vert--md">
      {!revealed ? (
        <button type="button" className="button button--sm button--secondary" onClick={reveal}>
          {MESSAGES.showAnswerKey[locale]}
        </button>
      ) : answerKey === undefined ? (
        <p>{MESSAGES.loadingAnswerKey[locale]}</p>
      ) : answerKey === null ? (
        <p>{MESSAGES.noAnswerKey[locale]}</p>
      ) : (
        <div className="alert alert--info" role="region" aria-label="Answer key">
          <p>{answerKey.content}</p>
        </div>
      )}
    </div>
  );
}

function GradeForm({
  row,
  gradedBy,
  maxMark,
  onSaved,
}: {
  row: QueueRow;
  gradedBy: string;
  maxMark: number;
  onSaved: () => void;
}): React.ReactElement {
  const locale = useLocale();
  const [mark, setMark] = useState(row.grade ? String(row.grade.mark) : '');
  const [feedback, setFeedback] = useState(row.grade?.feedback ?? '');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave(): Promise<void> {
    setError(null);
    const parsedMark = Number(mark);
    if (!mark.trim() || Number.isNaN(parsedMark) || parsedMark < 0) {
      setError(MESSAGES.enterValidMark[locale]);
      return;
    }
    if (parsedMark > maxMark) {
      setError(markCannotExceed(locale, maxMark));
      return;
    }

    setSaving(true);
    const { error: saveError } = row.grade
      ? await editGrade(row.grade.id, { mark: parsedMark, feedback: feedback.trim() || null })
      : await gradeAndReturn({
          submissionId: row.submission!.id,
          mark: parsedMark,
          feedback: feedback.trim() || null,
          gradedBy,
        });
    setSaving(false);
    if (saveError) {
      setError(isMaxMarkError(saveError) ? markCannotExceed(locale, maxMark) : MESSAGES.saveError[locale]);
      return;
    }
    onSaved();
  }

  return (
    <div>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      <div className="margin-bottom--sm">
        <label htmlFor={`mark-${row.student.id}`}>Mark (out of {maxMark})</label>
        <input
          id={`mark-${row.student.id}`}
          type="number"
          className="input"
          min={0}
          max={maxMark}
          step="0.01"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
        />
      </div>
      <div className="margin-bottom--sm">
        <label htmlFor={`feedback-${row.student.id}`}>Feedback (optional)</label>
        <textarea
          id={`feedback-${row.student.id}`}
          className="input"
          rows={2}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>
      <button type="button" className="button button--sm button--primary" disabled={saving} onClick={handleSave}>
        {saving ? MESSAGES.saving[locale] : row.grade ? 'Update grade' : 'Grade & return'}
      </button>
    </div>
  );
}

function QueueRowView({
  row,
  gradedBy,
  maxMark,
  onSaved,
}: {
  row: QueueRow;
  gradedBy: string;
  maxMark: number;
  onSaved: () => void;
}): React.ReactElement {
  const locale = useLocale();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const label = row.student.full_name ?? ANONYMIZED_LABEL;

  useEffect(() => {
    if (row.submission?.file_path) {
      getSubmissionFileUrl(row.submission.file_path).then(({ data }) => setFileUrl(data));
    } else {
      setFileUrl(null);
    }
  }, [row.submission?.file_path]);

  return (
    <tr>
      <td>{label}</td>
      <td>{statusLabel(row.status, locale)}</td>
      <td>
        {row.submission?.text_content && <p>{row.submission.text_content}</p>}
        {fileUrl && (
          <a href={fileUrl} target="_blank" rel="noreferrer">Submitted file</a>
        )}
      </td>
      <td>
        {row.grade && !editing ? (
          <div>
            <p>
              {row.grade.mark} / {maxMark}
              {row.grade.feedback && <> - {row.grade.feedback}</>}
            </p>
            <button type="button" className="button button--sm button--secondary" onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
        ) : row.submission ? (
          <GradeForm
            row={row}
            gradedBy={gradedBy}
            maxMark={maxMark}
            onSaved={() => {
              setEditing(false);
              onSaved();
            }}
          />
        ) : (
          <span>-</span>
        )}
      </td>
    </tr>
  );
}

function QueueContent({ classId, assignmentId }: { classId: string; assignmentId: string }): React.ReactElement {
  const locale = useLocale();
  const { profile, verifiedTeacher } = useAuth();
  const { loading: classLoading, classRow, role } = useClassRole(classId);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [rows, setRows] = useState<QueueRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data: assignmentData, error: assignmentError } = await getAssignment(assignmentId);
    if (assignmentError || !assignmentData) {
      setError(MESSAGES.loadAssignmentError[locale]);
      return;
    }
    setAssignment(assignmentData);
    const { data, error: queueError } = await fetchQueue(classId, assignmentData);
    if (queueError) setError(MESSAGES.loadQueueError[locale]);
    else setRows(data ?? []);
  }, [classId, assignmentId, locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (classLoading) return <p>{MESSAGES.loading[locale]}</p>;
  if (!classRow || role !== 'teacher') {
    return (
      <div className="alert alert--danger" role="alert" aria-live="assertive">
        {MESSAGES.noAccess[locale]}
      </div>
    );
  }
  if (error) {
    return <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>;
  }
  if (!assignment || !rows || !profile) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      <h2>Grading queue - {assignment.title}</h2>
      <p>Due {new Date(assignment.due_at).toLocaleString()} · Max mark {assignment.max_mark}</p>
      {verifiedTeacher && <AnswerKeyPanel assignment={assignment} />}
      {rows.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Status</th>
              <th>Submission</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <QueueRowView
                key={row.student.id}
                row={row}
                gradedBy={profile.id}
                maxMark={assignment.max_mark}
                onSaved={load}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function QueuePage(): React.ReactElement {
  const classId = useQueryParam('classId');
  const assignmentId = useQueryParam('assignmentId');
  return (
    <Layout title="Grading queue">
      <AuthGuard requireRole="teacher">
        <main className="container auth-page margin-vert--lg">
          {classId && assignmentId ? (
            <QueueContent classId={classId} assignmentId={assignmentId} />
          ) : (
            <p>No assignment selected.</p>
          )}
        </main>
      </AuthGuard>
    </Layout>
  );
}
