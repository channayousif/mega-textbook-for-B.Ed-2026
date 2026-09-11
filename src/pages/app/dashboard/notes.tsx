import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { useAuth } from '@site/src/contexts/AuthContext';
import { listOwnNotes, createNote, updateNote, deleteNote } from '@site/src/lib/studentNotes';
import type { StudentNote } from '@site/src/lib/types';

/**
 * Personal notes area (Spec 011, US3 / FR-008). List newest-first, create, edit, delete,
 * filter by course. RLS keeps every query scoped to the signed-in student.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  title: { en: 'Notes', ur: 'نوٹس' },
  intro: {
    en: 'Your private notes. Only you can see them. Add a note about a unit or topic from its page, or write a general one here.',
    ur: 'آپ کے ذاتی نوٹس۔ صرف آپ انہیں دیکھ سکتے ہیں۔ کسی یونٹ یا موضوع کے بارے میں نوٹ اس کے صفحے سے شامل کریں، یا یہاں ایک عام نوٹ لکھیں۔',
  },
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load your notes.', ur: 'آپ کے نوٹس لوڈ نہیں ہو سکے۔' },
  saveError: { en: 'Could not save the note.', ur: 'نوٹ محفوظ نہیں ہو سکا۔' },
  newNote: { en: 'New note', ur: 'نیا نوٹ' },
  titleLabel: { en: 'Title (optional)', ur: 'عنوان (اختیاری)' },
  bodyLabel: { en: 'Note', ur: 'نوٹ' },
  save: { en: 'Save', ur: 'محفوظ کریں' },
  saving: { en: 'Saving…', ur: 'محفوظ ہو رہا ہے…' },
  edit: { en: 'Edit', ur: 'ترمیم' },
  delete: { en: 'Delete', ur: 'حذف کریں' },
  cancel: { en: 'Cancel', ur: 'منسوخ' },
  confirmDelete: { en: 'Delete this note?', ur: 'یہ نوٹ حذف کریں؟' },
  empty: { en: 'No notes yet.', ur: 'ابھی کوئی نوٹ نہیں۔' },
  filterAll: { en: 'All courses', ur: 'تمام کورسز' },
  filterLabel: { en: 'Filter by course', ur: 'کورس کے لحاظ سے چھانٹیں' },
  general: { en: 'General', ur: 'عام' },
} as const;

function noteTag(n: StudentNote, locale: 'en' | 'ur'): string {
  if (!n.course_code) return MESSAGES.general[locale];
  const parts = [n.course_code];
  if (n.unit_no != null) parts.push(`${locale === 'ur' ? 'یونٹ' : 'Unit'} ${n.unit_no}`);
  if (n.topic_no != null) parts.push(`${locale === 'ur' ? 'موضوع' : 'Topic'} ${n.unit_no ?? ''}.${n.topic_no}`);
  return parts.join(' · ');
}

function NotesContent(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [notes, setNotes] = useState<StudentNote[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<string>('');

  const [draftTitle, setDraftTitle] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [pending, setPending] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const load = useCallback(async () => {
    const { data, error: e } = await listOwnNotes();
    if (e) {
      setError(MESSAGES.loadError[locale]);
      return;
    }
    setNotes(data ?? []);
  }, [locale]);

  useEffect(() => {
    load();
  }, [load]);

  const courseCodes = useMemo(
    () => Array.from(new Set((notes ?? []).map((n) => n.course_code).filter(Boolean) as string[])).sort(),
    [notes],
  );
  const visible = useMemo(
    () => (notes ?? []).filter((n) => !courseFilter || n.course_code === courseFilter),
    [notes, courseFilter],
  );

  async function handleCreate(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!profile || !draftBody.trim()) return;
    setPending(true);
    setError(null);
    const { error: err } = await createNote(profile.id, {
      body: draftBody.trim(),
      title: draftTitle.trim() || null,
    });
    setPending(false);
    if (err) {
      setError(MESSAGES.saveError[locale]);
      return;
    }
    setDraftTitle('');
    setDraftBody('');
    await load();
  }

  function beginEdit(n: StudentNote): void {
    setEditingId(n.id);
    setEditTitle(n.title ?? '');
    setEditBody(n.body);
  }

  async function saveEdit(id: string): Promise<void> {
    if (!editBody.trim()) return;
    setPending(true);
    setError(null);
    const { error: err } = await updateNote(id, { body: editBody.trim(), title: editTitle.trim() || null });
    setPending(false);
    if (err) {
      setError(MESSAGES.saveError[locale]);
      return;
    }
    setEditingId(null);
    await load();
  }

  async function handleDelete(id: string): Promise<void> {
    // eslint-disable-next-line no-alert
    if (typeof window !== 'undefined' && !window.confirm(MESSAGES.confirmDelete[locale])) return;
    setPending(true);
    await deleteNote(id);
    setPending(false);
    await load();
  }

  if (!notes) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      <h1>{MESSAGES.title[locale]}</h1>
      <p>{MESSAGES.intro[locale]}</p>
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}

      <form onSubmit={handleCreate} className="margin-bottom--lg">
        <h2>{MESSAGES.newNote[locale]}</h2>
        <div className="margin-bottom--sm">
          <label htmlFor="note-title">{MESSAGES.titleLabel[locale]}</label>
          <input
            id="note-title"
            className="input"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
          />
        </div>
        <div className="margin-bottom--sm">
          <label htmlFor="note-body">{MESSAGES.bodyLabel[locale]}</label>
          <textarea
            id="note-body"
            className="input"
            rows={4}
            required
            value={draftBody}
            onChange={(e) => setDraftBody(e.target.value)}
          />
        </div>
        <button type="submit" className="button button--primary button--sm" disabled={pending || !draftBody.trim()}>
          {pending ? MESSAGES.saving[locale] : MESSAGES.save[locale]}
        </button>
      </form>

      {courseCodes.length > 0 && (
        <div className="margin-bottom--md">
          <label htmlFor="note-filter">{MESSAGES.filterLabel[locale]} </label>
          <select
            id="note-filter"
            className="input"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="">{MESSAGES.filterAll[locale]}</option>
            {courseCodes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      {visible.length === 0 ? (
        <p>{MESSAGES.empty[locale]}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {visible.map((n) => (
            <li
              key={n.id}
              className="margin-bottom--md"
              style={{ border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: 6, padding: '0.75rem 1rem' }}
              data-testid="note-item"
            >
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
                {noteTag(n, locale)} · {new Date(n.created_at).toLocaleDateString()}
              </p>
              {editingId === n.id ? (
                <div className="margin-top--sm">
                  <input
                    className="input margin-bottom--sm"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    aria-label={MESSAGES.titleLabel[locale]}
                  />
                  <textarea
                    className="input"
                    rows={4}
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    aria-label={MESSAGES.bodyLabel[locale]}
                  />
                  <div className="margin-top--sm">
                    <button
                      type="button"
                      className="button button--primary button--sm margin-right--sm"
                      onClick={() => saveEdit(n.id)}
                      disabled={pending || !editBody.trim()}
                    >
                      {MESSAGES.save[locale]}
                    </button>
                    <button type="button" className="button button--secondary button--sm" onClick={() => setEditingId(null)}>
                      {MESSAGES.cancel[locale]}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {n.title && <p style={{ margin: '0.25rem 0', fontWeight: 700 }}>{n.title}</p>}
                  <p style={{ margin: '0.25rem 0', whiteSpace: 'pre-wrap' }}>{n.body}</p>
                  <div className="margin-top--sm">
                    <button
                      type="button"
                      className="button button--secondary button--sm margin-right--sm"
                      onClick={() => beginEdit(n)}
                    >
                      {MESSAGES.edit[locale]}
                    </button>
                    <button
                      type="button"
                      className="button button--danger button--sm"
                      onClick={() => handleDelete(n.id)}
                      disabled={pending}
                    >
                      {MESSAGES.delete[locale]}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function NotesPage(): React.ReactElement {
  return (
    <Layout title="Notes">
      <AppDashboardShell role="student">
        <NotesContent />
      </AppDashboardShell>
    </Layout>
  );
}
