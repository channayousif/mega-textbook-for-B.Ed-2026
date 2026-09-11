import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from '@site/src/components/AuthGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import {
  listForTeacher, listPublishedForStudent, publishAssignment, unpublishAssignment,
  updateAssignment, deleteAssignment,
} from '@site/src/lib/assignments';
import { fetchOwnSubmission, computeStudentStatus, statusLabel } from '@site/src/lib/submissions';
import { fetchOwnBestScore } from '@site/src/lib/quiz';
import type { Assignment, AssignmentStudentStatus } from '@site/src/lib/types';

/** A quiz-sourced assignment has no `submissions` row at all (it's scored via `quiz_attempts`) - routes to quiz.tsx, not assignment.tsx/queue.tsx. */
function detailHref(classId: string, a: Assignment): string {
  const page = a.source_kind === 'quiz' ? 'quiz' : 'assignment';
  return `/app/classes/${page}?classId=${classId}&assignmentId=${a.id}`;
}

/**
 * Assignment list - teacher (all, incl. unpublished) / student (published
 * only, with computed status) - Spec 003, T035/T062. FR-005, FR-006, FR-016.
 */

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  noAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  loadAssignmentsError: { en: 'Could not load assignments.', ur: 'اسائنمنٹس لوڈ نہیں ہو سکیں۔' },
  updateAssignmentError: { en: 'Could not update the assignment.', ur: 'اسائنمنٹ اپ ڈیٹ نہیں ہو سکی۔' },
  edit: { en: 'Edit', ur: 'ترمیم' },
  del: { en: 'Delete', ur: 'حذف کریں' },
  save: { en: 'Save', ur: 'محفوظ کریں' },
  cancel: { en: 'Cancel', ur: 'منسوخ' },
  deleteBlocked: {
    en: 'Cannot delete: this assignment has submissions. Unpublish it instead.',
    ur: 'حذف نہیں ہو سکتا: اس اسائنمنٹ میں جمع کرائے گئے کام ہیں۔ اس کے بجائے اسے غیر شائع کریں۔',
  },
  confirmDelete: { en: 'Delete this assignment?', ur: 'یہ اسائنمنٹ حذف کریں؟' },
  bulkPublish: { en: 'Publish selected', ur: 'منتخب شائع کریں' },
  bulkUnpublish: { en: 'Unpublish selected', ur: 'منتخب غیر شائع کریں' },
  bulkClose: { en: 'Close selected (due now)', ur: 'منتخب بند کریں (ابھی واجب)' },
  bulkResult: { en: 'Done: {ok} succeeded, {fail} failed.', ur: 'مکمل: {ok} کامیاب، {fail} ناکام۔' },
  fTitle: { en: 'Title', ur: 'عنوان' },
  fDue: { en: 'Due', ur: 'واجب' },
  fMax: { en: 'Max mark', ur: 'زیادہ سے زیادہ نمبر' },
  fLate: { en: 'Allow late submissions', ur: 'تاخیر سے جمع کرانا قبول کریں' },
  fInstr: { en: 'Instructions', ur: 'ہدایات' },
} as const;

function toLocalInput(iso: string): string {
  // datetime-local wants "YYYY-MM-DDTHH:mm" in local time
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

type EditDraft = { title: string; due: string; max: number; late: boolean; instructions: string };

function TeacherAssignmentsList({ classId }: { classId: string }): React.ReactElement {
  const locale = useLocale();
  const [assignments, setAssignments] = useState<Assignment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EditDraft | null>(null);

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

  function beginEdit(a: Assignment): void {
    setEditingId(a.id);
    setError(null);
    setDraft({
      title: a.title,
      due: toLocalInput(a.due_at),
      max: a.max_mark,
      late: a.allow_late,
      instructions: a.instructions ?? '',
    });
  }

  async function saveEdit(id: string): Promise<void> {
    if (!draft) return;
    setPendingId(id);
    const { error: e } = await updateAssignment(id, {
      title: draft.title.trim(),
      due_at: new Date(draft.due).toISOString(),
      max_mark: draft.max,
      allow_late: draft.late,
      instructions: draft.instructions.trim() || null,
    });
    setPendingId(null);
    if (e) {
      setError(MESSAGES.updateAssignmentError[locale]);
      return;
    }
    setEditingId(null);
    setDraft(null);
    await load();
  }

  async function handleDelete(a: Assignment): Promise<void> {
    if (typeof window !== 'undefined' && !window.confirm(MESSAGES.confirmDelete[locale])) return;
    setPendingId(a.id);
    const { error: e } = await deleteAssignment(a.id);
    setPendingId(null);
    if (e) {
      // RLS refuses a delete when submissions exist -> surface the specific reason.
      setError(MESSAGES.deleteBlocked[locale]);
      return;
    }
    await load();
  }

  function toggleSelect(id: string): void {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function bulk(kind: 'publish' | 'unpublish' | 'close'): Promise<void> {
    const ids = [...selected];
    if (ids.length === 0) return;
    setPendingId('bulk');
    setError(null);
    let ok = 0;
    let fail = 0;
    for (const id of ids) {
      const res =
        kind === 'publish'
          ? await publishAssignment(id)
          : kind === 'unpublish'
            ? await unpublishAssignment(id)
            : await updateAssignment(id, { due_at: new Date().toISOString() });
      if (res.error) fail += 1;
      else ok += 1;
    }
    setPendingId(null);
    setSelected(new Set());
    setMessage(MESSAGES.bulkResult[locale].replace('{ok}', String(ok)).replace('{fail}', String(fail)));
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
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      {message && <div className="alert alert--success" role="status">{message}</div>}

      {selected.size > 0 && (
        <div className="margin-bottom--sm" data-testid="bulk-bar">
          <button type="button" className="button button--sm button--secondary margin-right--sm" disabled={pendingId !== null} onClick={() => bulk('publish')}>
            {MESSAGES.bulkPublish[locale]}
          </button>
          <button type="button" className="button button--sm button--secondary margin-right--sm" disabled={pendingId !== null} onClick={() => bulk('unpublish')}>
            {MESSAGES.bulkUnpublish[locale]}
          </button>
          <button type="button" className="button button--sm button--secondary" disabled={pendingId !== null} onClick={() => bulk('close')}>
            {MESSAGES.bulkClose[locale]}
          </button>
        </div>
      )}

      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th><span className="sr-only">Select</span></th>
              <th>Title</th>
              <th>Due</th>
              <th>Max mark</th>
              <th>Status</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <React.Fragment key={a.id}>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      className="auth-tap-target"
                      checked={selected.has(a.id)}
                      onChange={() => toggleSelect(a.id)}
                      aria-label={a.title}
                    />
                  </td>
                  <td><Link to={detailHref(classId, a)}>{a.title}</Link></td>
                  <td>{new Date(a.due_at).toLocaleString()}</td>
                  <td>{a.max_mark}</td>
                  <td>{a.published ? 'Published' : 'Draft'}</td>
                  <td>
                    <button type="button" className="button button--sm button--secondary" disabled={pendingId !== null} onClick={() => toggle(a)}>
                      {a.published ? 'Unpublish' : 'Publish'}
                    </button>{' '}
                    <button type="button" className="button button--sm button--secondary" disabled={pendingId !== null} onClick={() => beginEdit(a)}>
                      {MESSAGES.edit[locale]}
                    </button>{' '}
                    <button type="button" className="button button--sm button--danger" disabled={pendingId !== null} onClick={() => handleDelete(a)}>
                      {MESSAGES.del[locale]}
                    </button>{' '}
                    {a.source_kind === 'quiz' ? (
                      <Link to={detailHref(classId, a)}>Results</Link>
                    ) : (
                      <Link to={`/app/classes/queue?classId=${classId}&assignmentId=${a.id}`}>Grade</Link>
                    )}
                  </td>
                </tr>
                {editingId === a.id && draft && (
                  <tr>
                    <td colSpan={6}>
                      <div className="margin-bottom--sm">
                        <label htmlFor={`ae-title-${a.id}`}>{MESSAGES.fTitle[locale]}</label>
                        <input id={`ae-title-${a.id}`} className="input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                      </div>
                      <div className="margin-bottom--sm">
                        <label htmlFor={`ae-due-${a.id}`}>{MESSAGES.fDue[locale]}</label>
                        <input id={`ae-due-${a.id}`} type="datetime-local" className="input" value={draft.due} onChange={(e) => setDraft({ ...draft, due: e.target.value })} />
                      </div>
                      <div className="margin-bottom--sm">
                        <label htmlFor={`ae-max-${a.id}`}>{MESSAGES.fMax[locale]}</label>
                        <input id={`ae-max-${a.id}`} type="number" min={1} className="input" value={draft.max} onChange={(e) => setDraft({ ...draft, max: Number(e.target.value) })} />
                      </div>
                      <div className="margin-bottom--sm">
                        <label>
                          <input type="checkbox" className="auth-tap-target" checked={draft.late} onChange={(e) => setDraft({ ...draft, late: e.target.checked })} />{' '}
                          {MESSAGES.fLate[locale]}
                        </label>
                      </div>
                      <div className="margin-bottom--sm">
                        <label htmlFor={`ae-instr-${a.id}`}>{MESSAGES.fInstr[locale]}</label>
                        <textarea id={`ae-instr-${a.id}`} className="input" rows={3} value={draft.instructions} onChange={(e) => setDraft({ ...draft, instructions: e.target.value })} />
                      </div>
                      <button type="button" className="button button--primary button--sm margin-right--sm" disabled={pendingId !== null} onClick={() => saveEdit(a.id)}>
                        {MESSAGES.save[locale]}
                      </button>
                      <button type="button" className="button button--secondary button--sm" onClick={() => { setEditingId(null); setDraft(null); }}>
                        {MESSAGES.cancel[locale]}
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
        // A quiz-sourced assignment has no `submissions` row at all - it's
        // scored via `quiz_attempts`/`quiz_best_scores`, not `grades`. Score
        // exists <=> "graded" (an instant score IS the returned result, same
        // as a teacher-returned grade conceptually - data-model.md's
        // "Graded / Returned" row applies here via a best score, not a
        // `grades` row).
        if (a.source_kind === 'quiz') {
          const { data: bestScore } = await fetchOwnBestScore(a.id, profile.id);
          const status = computeStudentStatus({ dueAtIso: a.due_at, submission: null, graded: bestScore !== null });
          return { assignment: a, status };
        }
        const { data: submission } = await fetchOwnSubmission(a.id, profile.id);
        // "graded" isn't determined here (that reads `grades`, on the detail
        // page) - this list treats "submitted"/"late" as the ceiling, matching
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
      <h2>Assignments - {classRow.name}</h2>
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
