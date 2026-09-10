import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from '@site/src/components/AuthGuard';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import {
  listRoster, reissueJoinCode, revokeJoinCode, archiveClass, reactivateClass,
  removeStudent, restoreStudent, updateClass,
} from '@site/src/lib/classes';
import type { RosterRow } from '@site/src/lib/classes';

/**
 * Roster management - join-code reissue/revoke, archive/reactivate,
 * remove/restore (Spec 003, T020/T021/T069/T076/T062).
 * FR-002, FR-015, FR-018, FR-020, FR-022, FR-016, 2026-07-19 clarifications.
 *
 * Query-string routing (`?classId=…`), not a nested `[classId]` route - see
 * ClassContext.tsx's header comment for why.
 */

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  noAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  loadRosterError: { en: 'Could not load the roster.', ur: 'روسٹر لوڈ نہیں ہو سکا۔' },
  reissueError: { en: 'Could not reissue the join code.', ur: 'جوائن کوڈ دوبارہ جاری نہیں ہو سکا۔' },
  revokeError: { en: 'Could not revoke the join code.', ur: 'جوائن کوڈ منسوخ نہیں ہو سکا۔' },
  archiveConfirm: {
    en: 'Archive this class? No new joins, assignments, or submissions will be possible until you reactivate it.',
    ur: 'کیا یہ کلاس آرکائیو کی جائے؟ دوبارہ فعال کرنے تک نئی شمولیت، اسائنمنٹس یا جمع کروائے گئے کام ممکن نہیں ہوں گے۔',
  },
  archiveError: { en: 'Could not archive this class.', ur: 'کلاس آرکائیو نہیں ہو سکی۔' },
  reactivateError: {
    en: 'Could not reactivate this class - you may no longer be an eligible teacher.',
    ur: 'کلاس دوبارہ فعال نہیں ہو سکی - ہو سکتا ہے اب آپ اہل استاد نہ ہوں۔',
  },
  archivedBanner: {
    en: 'This class is archived - read-only. No new joins, assignments, or submissions are possible until it is reactivated.',
    ur: 'یہ کلاس آرکائیو ہے - صرف دیکھنے کے لیے۔ دوبارہ فعال ہونے تک نئی شمولیت، اسائنمنٹس یا جمع کروائے گئے کام ممکن نہیں۔',
  },
  editClass: { en: 'Edit details', ur: 'تفصیلات میں ترمیم' },
  className: { en: 'Class name', ur: 'کلاس کا نام' },
  classTerm: { en: 'Term', ur: 'مدت' },
  save: { en: 'Save', ur: 'محفوظ کریں' },
  cancel: { en: 'Cancel', ur: 'منسوخ' },
  updateClassError: { en: 'Could not update the class.', ur: 'کلاس اپ ڈیٹ نہیں ہو سکی۔' },
} as const;

function removeConfirmMessage(locale: 'en' | 'ur', label: string): string {
  return locale === 'ur'
    ? `کیا ${label} کو اس کلاس سے ہٹایا جائے؟ ان کی رسائی فوراً ختم ہو جائے گی؛ آپ بعد میں انہیں بحال کر سکتے ہیں۔`
    : `Remove ${label} from this class? They will immediately lose access; you can restore them later.`;
}

function removeErrorMessage(locale: 'en' | 'ur', label: string): string {
  return locale === 'ur' ? `${label} کو ہٹایا نہیں جا سکا۔` : `Could not remove ${label}.`;
}

function restoreErrorMessage(locale: 'en' | 'ur', label: string): string {
  return locale === 'ur' ? `${label} کو بحال نہیں کیا جا سکا۔` : `Could not restore ${label}.`;
}

function RosterContent({ classId }: { classId: string }): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const { loading: classLoading, classRow, role, refresh: refreshClass } = useClassRole(classId);
  const [roster, setRoster] = useState<RosterRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editTerm, setEditTerm] = useState('');

  const loadRoster = useCallback(async () => {
    const { data, error: rosterError } = await listRoster(classId);
    if (rosterError) setError(MESSAGES.loadRosterError[locale]);
    else setRoster(data ?? []);
  }, [classId, locale]);

  useEffect(() => {
    loadRoster();
  }, [loadRoster]);

  const reload = useCallback(async () => {
    await refreshClass();
    await loadRoster();
  }, [refreshClass, loadRoster]);

  async function handleReissue(): Promise<void> {
    setPendingId('join_code');
    const { error: reissueError } = await reissueJoinCode(classId);
    setPendingId(null);
    if (reissueError) setError(MESSAGES.reissueError[locale]);
    await reload();
  }

  async function handleRevoke(): Promise<void> {
    setPendingId('join_code');
    const { error: revokeError } = await revokeJoinCode(classId);
    setPendingId(null);
    if (revokeError) setError(MESSAGES.revokeError[locale]);
    await reload();
  }

  async function handleArchive(): Promise<void> {
    const confirmed = window.confirm(MESSAGES.archiveConfirm[locale]);
    if (!confirmed) return;
    setPendingId('status');
    const { error: archiveError } = await archiveClass(classId);
    setPendingId(null);
    if (archiveError) setError(MESSAGES.archiveError[locale]);
    await reload();
  }

  async function handleReactivate(): Promise<void> {
    setPendingId('status');
    const { error: reactivateError } = await reactivateClass(classId);
    setPendingId(null);
    if (reactivateError) setError(MESSAGES.reactivateError[locale]);
    await reload();
  }

  async function handleRemove(enrollmentId: string, label: string): Promise<void> {
    const confirmed = window.confirm(removeConfirmMessage(locale, label));
    if (!confirmed) return;
    setPendingId(enrollmentId);
    const { error: removeError } = await removeStudent(enrollmentId);
    setPendingId(null);
    if (removeError) setError(removeErrorMessage(locale, label));
    await reload();
  }

  async function handleRestore(enrollmentId: string, label: string): Promise<void> {
    setPendingId(enrollmentId);
    const { error: restoreError } = await restoreStudent(enrollmentId);
    setPendingId(null);
    if (restoreError) setError(restoreErrorMessage(locale, label));
    await reload();
  }

  if (classLoading) return <p>{MESSAGES.loading[locale]}</p>;

  if (!classRow || role !== 'teacher') {
    return (
      <div className="alert alert--danger" role="alert" aria-live="assertive">
        {MESSAGES.noAccess[locale]}
      </div>
    );
  }

  if (!roster) return <p>{MESSAGES.loading[locale]}</p>;

  const activeStudents = roster.filter((r) => r.status === 'active');
  const removedStudents = roster.filter((r) => r.status === 'removed');
  const archived = classRow.status === 'archived';

  async function handleSaveClass(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setPendingId('class_details');
    const { error: e2 } = await updateClass(classId, {
      name: editName.trim(),
      term_label: editTerm.trim(),
    });
    setPendingId(null);
    if (e2) {
      setError(MESSAGES.updateClassError[locale]);
      return;
    }
    setEditing(false);
    await reload();
  }

  return (
    <div>
      <h2>{classRow.name}</h2>
      <p>
        {classRow.course_code} - {classRow.term_label}
        {' · '}
        <button
          type="button"
          className="button button--link button--sm"
          onClick={() => { setEditing((v) => !v); setEditName(classRow.name); setEditTerm(classRow.term_label); }}
        >
          {MESSAGES.editClass[locale]}
        </button>
      </p>
      {editing && (
        <form onSubmit={handleSaveClass} className="margin-bottom--md">
          <div className="margin-bottom--sm">
            <label htmlFor="edit-class-name">{MESSAGES.className[locale]}</label>
            <input id="edit-class-name" className="input" value={editName} onChange={(e) => setEditName(e.target.value)} required />
          </div>
          <div className="margin-bottom--sm">
            <label htmlFor="edit-class-term">{MESSAGES.classTerm[locale]}</label>
            <input id="edit-class-term" className="input" value={editTerm} onChange={(e) => setEditTerm(e.target.value)} required />
          </div>
          <button type="submit" className="button button--primary button--sm margin-right--sm" disabled={pendingId !== null}>
            {MESSAGES.save[locale]}
          </button>
          <button type="button" className="button button--secondary button--sm" onClick={() => setEditing(false)}>
            {MESSAGES.cancel[locale]}
          </button>
        </form>
      )}
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      {archived && (
        <div className="alert alert--warning" role="status">
          {MESSAGES.archivedBanner[locale]}
        </div>
      )}

      <div className="margin-vert--md">
        <h3>Join code</h3>
        <p>{classRow.join_code ?? '(revoked - no new joins possible)'}</p>
        <button
          type="button"
          className="button button--sm button--secondary"
          onClick={handleReissue}
          disabled={pendingId !== null || archived}
        >
          Reissue code
        </button>
        <button
          type="button"
          className="button button--sm button--secondary margin-left--sm"
          onClick={handleRevoke}
          disabled={pendingId !== null || archived || !classRow.join_code}
        >
          Revoke code
        </button>
      </div>

      <div className="margin-vert--md">
        {archived ? (
          <button
            type="button"
            className="button button--sm button--primary"
            onClick={handleReactivate}
            disabled={pendingId !== null}
          >
            Reactivate class
          </button>
        ) : (
          <button
            type="button"
            className="button button--sm button--danger"
            onClick={handleArchive}
            disabled={pendingId !== null}
          >
            Archive class
          </button>
        )}
      </div>

      <h3>Roster ({activeStudents.length})</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Joined</th>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {activeStudents.map((r) => {
            const label = r.profiles?.full_name ?? '(no name set)';
            return (
              <tr key={r.id}>
                <td>{label}</td>
                <td>{new Date(r.joined_at).toLocaleDateString()}</td>
                <td>
                  <button
                    type="button"
                    className="button button--sm button--secondary"
                    disabled={pendingId !== null || archived}
                    onClick={() => handleRemove(r.id, label)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
          {activeStudents.length === 0 && (
            <tr>
              <td colSpan={3}>No students enrolled yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {removedStudents.length > 0 && (
        <>
          <h3>Removed students ({removedStudents.length})</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Removed</th>
                <th><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {removedStudents.map((r) => {
                const label = r.profiles?.full_name ?? '(no name set)';
                return (
                  <tr key={r.id}>
                    <td>{label}</td>
                    <td>{r.removed_at ? new Date(r.removed_at).toLocaleDateString() : '-'}</td>
                    <td>
                      <button
                        type="button"
                        className="button button--sm button--secondary"
                        disabled={pendingId !== null || archived}
                        onClick={() => handleRestore(r.id, label)}
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default function RosterPage(): React.ReactElement {
  const classId = useQueryParam('classId');
  return (
    <Layout title="Class roster">
      <AuthGuard requireRole="teacher">
        <main className="container auth-page margin-vert--lg">
          {classId ? <RosterContent classId={classId} /> : <p>No class selected.</p>}
        </main>
      </AuthGuard>
    </Layout>
  );
}
