import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from '@site/src/components/AuthGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import { getAssignment } from '@site/src/lib/assignments';
import {
  submitOrResubmit, fetchOwnSubmission, isSubmissionEditable, validateFile, getSubmissionFileUrl,
} from '@site/src/lib/submissions';
import { fetchGradeForSubmission } from '@site/src/lib/grading';
import type { Assignment, Grade, Submission } from '@site/src/lib/types';

/**
 * Assignment detail - student submit/resubmit view (Spec 003, T036/T062).
 * FR-007, FR-008, FR-016 (bilingual status/error text; static labels stay
 * English, matching Spec 002's login.tsx precedent).
 */

const MESSAGES = {
  blocked: {
    en: 'The deadline for this assignment has passed and late submissions are not accepted.',
    ur: 'اس اسائنمنٹ کی آخری تاریخ گزر چکی ہے اور تاخیر سے جمع کروانا قبول نہیں کیا جاتا۔',
  },
  lateNotice: {
    en: 'The due date has passed. This submission will be recorded as late.',
    ur: 'آخری تاریخ گزر چکی ہے۔ یہ جمع شدہ کام تاخیر سے شمار ہوگا۔',
  },
  locked: {
    en: 'The due date has passed - you can no longer edit this submission.',
    ur: 'آخری تاریخ گزر چکی ہے - اب آپ یہ جمع شدہ کام تبدیل نہیں کر سکتے۔',
  },
  fileTooLarge: { en: 'That file is larger than 10 MB.', ur: 'یہ فائل 10 MB سے بڑی ہے۔' },
  fileTypeRejected: { en: 'That file type is not accepted.', ur: 'اس قسم کی فائل قبول نہیں کی جاتی۔' },
  emptySubmission: { en: 'Enter some text or choose a file.', ur: 'کچھ متن لکھیں یا کوئی فائل منتخب کریں۔' },
  submitError: { en: 'Could not submit. Please try again.', ur: 'جمع نہیں کروایا جا سکا۔ براہِ کرم دوبارہ کوشش کریں۔' },
  submittedLate: { en: 'Submitted - marked late.', ur: 'جمع کروا دیا گیا - تاخیر سے۔' },
  submittedOnTime: { en: 'Submitted on time.', ur: 'وقت پر جمع کروا دیا گیا۔' },
  submitting: { en: 'Submitting…', ur: 'جمع ہو رہا ہے…' },
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  noClassAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  loadAssignmentError: { en: 'Could not load this assignment.', ur: 'یہ اسائنمنٹ لوڈ نہیں ہو سکی۔' },
  noAssignmentAccess: { en: "You don't have access to this assignment.", ur: 'اس اسائنمنٹ تک آپ کی رسائی نہیں ہے۔' },
} as const;

function StudentSubmissionForm({
  assignment,
  studentId,
}: {
  assignment: Assignment;
  studentId: string;
}): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    const { data } = await fetchOwnSubmission(assignment.id, studentId);
    setSubmission(data);
    // Only sync `text` from a fetched submission when one actually exists
    // (resuming an editable draft). Found via a CI-only failure that also
    // reproduced locally once: this fetch is async, and unconditionally
    // calling setText('') on the no-submission-yet path can resolve AFTER
    // the student has already started typing, silently wiping their input -
    // `text` already starts at '' from useState, so there's nothing to sync
    // when there's no prior submission to restore.
    if (data) {
      setText(data.text_content ?? '');
      const { data: gradeData } = await fetchGradeForSubmission(data.id);
      setGrade(gradeData);
    } else {
      setGrade(null);
    }
  }, [assignment.id, studentId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (submission?.file_path) {
      getSubmissionFileUrl(submission.file_path).then(({ data }) => setFileUrl(data));
    } else {
      setFileUrl(null);
    }
  }, [submission?.file_path]);

  const pastDue = Date.now() > new Date(assignment.due_at).getTime();
  const editable = isSubmissionEditable(assignment);
  const wouldBeLate = pastDue && assignment.allow_late;
  const blocked = pastDue && !assignment.allow_late && !submission;

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        setError(fileError === 'too_large' ? MESSAGES.fileTooLarge[locale] : MESSAGES.fileTypeRejected[locale]);
        return;
      }
    }
    if (!text.trim() && !file && !submission?.file_path) {
      setError(MESSAGES.emptySubmission[locale]);
      return;
    }

    setSubmitting(true);
    const { data, error: submitError } = await submitOrResubmit({
      assignmentId: assignment.id,
      studentId,
      textContent: text.trim() || null,
      file,
    });
    setSubmitting(false);
    if (submitError) {
      setError(editable ? MESSAGES.submitError[locale] : MESSAGES.blocked[locale]);
      return;
    }
    setSubmission(data);
    setFile(null);
    setMessage(data?.late ? MESSAGES.submittedLate[locale] : MESSAGES.submittedOnTime[locale]);
  }

  if (blocked) {
    return (
      <div className="alert alert--danger" role="alert" aria-live="assertive">{MESSAGES.blocked[locale]}</div>
    );
  }

  return (
    <div>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      {message && (
        <div className="alert alert--success" role="status">{message}</div>
      )}
      {wouldBeLate && !submission && (
        <div className="alert alert--warning" role="status">{MESSAGES.lateNotice[locale]}</div>
      )}
      {!editable && submission && (
        <div className="alert alert--warning" role="status">{MESSAGES.locked[locale]}</div>
      )}
      {submission && (
        <p>
          Current status: {submission.late ? 'Submitted (late)' : 'Submitted (on time)'} -{' '}
          {new Date(submission.submitted_at).toLocaleString()}
          {fileUrl && (
            <>
              {' · '}
              <a href={fileUrl} target="_blank" rel="noreferrer">Current file</a>
            </>
          )}
        </p>
      )}
      {grade && (
        <div className="alert alert--success" role="status">
          Grade: {grade.mark} / {assignment.max_mark}
          {grade.feedback && <> - {grade.feedback}</>}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="margin-bottom--sm">
          <label htmlFor="submissionText">Your answer</label>
          <textarea
            id="submissionText"
            className="input"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div className="margin-bottom--sm">
          <label htmlFor="submissionFile">Attach a file (optional, PDF/DOC/DOCX/PNG/JPEG, up to 10 MB)</label>
          <input
            id="submissionFile"
            type="file"
            disabled={!editable}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <button type="submit" className="button button--primary" disabled={!editable || submitting}>
          {submitting ? MESSAGES.submitting[locale] : submission ? 'Resubmit' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

function AssignmentContent({
  classId,
  assignmentId,
}: {
  classId: string;
  assignmentId: string;
}): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const { profile } = useAuth();
  const { loading: classLoading, classRow, role } = useClassRole(classId);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAssignment(assignmentId).then(({ data, error: loadError }) => {
      if (loadError || !data) setError(MESSAGES.loadAssignmentError[locale]);
      else setAssignment(data);
    });
  }, [assignmentId, locale]);

  if (classLoading) return <p>{MESSAGES.loading[locale]}</p>;
  if (!classRow) {
    return (
      <div className="alert alert--danger" role="alert" aria-live="assertive">
        {MESSAGES.noClassAccess[locale]}
      </div>
    );
  }
  if (error) {
    return (
      <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
    );
  }
  if (!assignment) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      <h2>{assignment.title}</h2>
      <p>Due {new Date(assignment.due_at).toLocaleString()} · Max mark {assignment.max_mark}</p>
      {assignment.instructions && <p>{assignment.instructions}</p>}

      {role === 'teacher' ? (
        <p>
          <Link to={`/app/classes/queue?classId=${classId}&assignmentId=${assignmentId}`}>
            View submissions / grade
          </Link>
        </p>
      ) : role === 'student' && profile ? (
        <StudentSubmissionForm assignment={assignment} studentId={profile.id} />
      ) : (
        <p>{MESSAGES.noAssignmentAccess[locale]}</p>
      )}
    </div>
  );
}

export default function AssignmentPage(): React.ReactElement {
  const classId = useQueryParam('classId');
  const assignmentId = useQueryParam('assignmentId');
  return (
    <Layout title="Assignment">
      <AuthGuard requireRole={['teacher', 'student']}>
        <main className="container auth-page margin-vert--lg">
          {classId && assignmentId ? (
            <AssignmentContent classId={classId} assignmentId={assignmentId} />
          ) : (
            <p>No assignment selected.</p>
          )}
        </main>
      </AuthGuard>
    </Layout>
  );
}
