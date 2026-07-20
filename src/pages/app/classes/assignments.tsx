import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from '@site/src/components/AuthGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import { listForTeacher, listPublishedForStudent, publishAssignment, unpublishAssignment } from '@site/src/lib/assignments';
import { fetchOwnSubmission, computeStudentStatus, statusLabel } from '@site/src/lib/submissions';
import { fetchOwnBestScore } from '@site/src/lib/quiz';
import type { Assignment, AssignmentStudentStatus } from '@site/src/lib/types';

/** A quiz-sourced assignment has no `submissions` row at all (it's scored via `quiz_attempts`) — routes to quiz.tsx, not assignment.tsx/queue.tsx. */
function detailHref(classId: string, a: Assignment): string {
  const page = a.source_kind === 'quiz' ? 'quiz' : 'assignment';
  return `/app/classes/${page}?classId=${classId}&assignmentId=${a.id}`;
}

/**
 * Assignment list — teacher (all, incl. unpublished) / student (published
 * only, with computed status) — Spec 003, T035/T062. FR-005, FR-006, FR-016.
 */

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  noAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  loadAssignmentsError: { en: 'Could not load assignments.', ur: 'اسائنمنٹس لوڈ نہیں ہو سکیں۔' },
  updateAssignmentError: { en: 'Could not update the assignment.', ur: 'اسائنمنٹ اپ ڈیٹ نہیں ہو سکی۔' },
} as const;

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

function TeacherAssignmentsList({ classId }: { classId: string }): React.ReactElement {
  const locale = useLocale();
  const [assignments, setAssignments] = useState<Assignment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error: loadError } = await listForTeacher(classId);
    if (loadError) setError(MESSAGES.loadAssignmentsError[locale]);
    else setAssignments(data ?? []);
  }, [classId, locale]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggle(a: Assignment): Promise<void> {
    setPendingId(a.id);
    const { error: toggleError } = a.published ? await unpublishAssignment(a.id) : await publishAssignment(a.id);
    setPendingId(null);
    if (toggleError) setError(MESSAGES.updateAssignmentError[locale]);
    await load();
  }

  if (!assignments) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      <p>
        <Link to={`/app/classes/assignment-new?classId=${classId}`} className="button button--primary button--sm">
          New assignment
        </Link>
      </p>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Due</th>
              <th>Max mark</th>
              <th>Status</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id}>
                <td>
                  <Link to={detailHref(classId, a)}>{a.title}</Link>
                </td>
                <td>{new Date(a.due_at).toLocaleString()}</td>
                <td>{a.max_mark}</td>
                <td>{a.published ? 'Published' : 'Draft'}</td>
                <td>
                  <button
                    type="button"
                    className="button button--sm button--secondary"
                    disabled={pendingId !== null}
                    onClick={() => toggle(a)}
                  >
                    {a.published ? 'Unpublish' : 'Publish'}
                  </button>
                  {' '}
                  {a.source_kind === 'quiz' ? (
                    <Link to={detailHref(classId, a)}>Results</Link>
                  ) : (
                    <Link to={`/app/classes/queue?classId=${classId}&assignmentId=${a.id}`}>Grade</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function StudentAssignmentsList({ classId }: { classId: string }): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [rows, setRows] = useState<{ assignment: Assignment; status: AssignmentStudentStatus }[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data, error: loadError } = await listPublishedForStudent(classId);
    if (loadError) {
      setError(MESSAGES.loadAssignmentsError[locale]);
      return;
    }
    const withStatus = await Promise.all(
      (data ?? []).map(async (a) => {
        // A quiz-sourced assignment has no `submissions` row at all — it's
        // scored via `quiz_attempts`/`quiz_best_scores`, not `grades`. Score
        // exists <=> "graded" (an instant score IS the returned result, same
        // as a teacher-returned grade conceptually — data-model.md's
        // "Graded / Returned" row applies here via a best score, not a
        // `grades` row).
        if (a.source_kind === 'quiz') {
          const { data: bestScore } = await fetchOwnBestScore(a.id, profile.id);
          const status = computeStudentStatus({ dueAtIso: a.due_at, submission: null, graded: bestScore !== null });
          return { assignment: a, status };
        }
        const { data: submission } = await fetchOwnSubmission(a.id, profile.id);
        // "graded" isn't determined here (that reads `grades`, on the detail
        // page) — this list treats "submitted"/"late" as the ceiling, matching
        // FR-006's status list without a second round-trip per assignment.
        const status = computeStudentStatus({ dueAtIso: a.due_at, submission, graded: false });
        return { assignment: a, status };
      }),
    );
    setRows(withStatus);
  }, [classId, profile, locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!rows) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      {rows.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Due</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ assignment: a, status }) => (
              <tr key={a.id}>
                <td>
                  <Link to={detailHref(classId, a)}>{a.title}</Link>
                </td>
                <td>{new Date(a.due_at).toLocaleString()}</td>
                <td>{statusLabel(status, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function AssignmentsContent({ classId }: { classId: string }): React.ReactElement {
  const locale = useLocale();
  const { loading, classRow, role } = useClassRole(classId);
  if (loading) return <p>{MESSAGES.loading[locale]}</p>;
  if (!classRow) {
    return (
      <div className="alert alert--danger" role="alert" aria-live="assertive">
        {MESSAGES.noAccess[locale]}
      </div>
    );
  }
  return (
    <div>
      <h2>Assignments — {classRow.name}</h2>
      {role === 'teacher' ? <TeacherAssignmentsList classId={classId} /> : <StudentAssignmentsList classId={classId} />}
    </div>
  );
}

export default function AssignmentsPage(): React.ReactElement {
  const classId = useQueryParam('classId');
  return (
    <Layout title="Assignments">
      <AuthGuard requireRole={['teacher', 'student']}>
        <main className="container auth-page margin-vert--lg">
          {classId ? <AssignmentsContent classId={classId} /> : <p>No class selected.</p>}
        </main>
      </AuthGuard>
    </Layout>
  );
}
