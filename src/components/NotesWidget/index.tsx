/**
 * Floating notes widget (Feature 034 T019, #806): a button on every textbook page opens a small
 * panel where a signed-in student or teacher writes a private note tied to the page, sees the
 * page's latest notes, and follows a link to their dashboard Notes list. Signed-out readers get a
 * sign-in prompt. Notes live in student_notes; RLS (0038, widened to teachers by 0058) keeps each
 * row private to its author, so this component never sees anyone else's notes.
 */
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { useAuth } from '@site/src/contexts/AuthContext';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';
import { createNote, listOwnNotes } from '@site/src/lib/studentNotes';
import type { StudentNote } from '@site/src/lib/types';
import Icon from '@site/src/components/icons/Icon';
import s from './styles.module.css';

type Locale = 'en' | 'ur';
const T = {
  open: { en: 'Notes', ur: 'نوٹس' },
  title: { en: 'My notes on this page', ur: 'اس صفحے پر میرے نوٹس' },
  close: { en: 'Close notes', ur: 'نوٹس بند کریں' },
  placeholder: { en: 'Write a private note…', ur: 'ذاتی نوٹ لکھیں…' },
  label: { en: 'New note', ur: 'نیا نوٹ' },
  save: { en: 'Save note', ur: 'نوٹ محفوظ کریں' },
  saving: { en: 'Saving…', ur: 'محفوظ ہو رہا ہے…' },
  saved: { en: 'Saved.', ur: 'محفوظ ہو گیا۔' },
  error: { en: 'Could not save the note.', ur: 'نوٹ محفوظ نہیں ہو سکا۔' },
  none: { en: 'No notes on this page yet.', ur: 'اس صفحے پر ابھی کوئی نوٹ نہیں۔' },
  all: { en: 'All my notes', ur: 'میرے تمام نوٹس' },
  signIn: { en: 'Sign in to keep private notes while you read.', ur: 'پڑھتے ہوئے ذاتی نوٹس رکھنے کے لیے سائن ان کریں۔' },
  signInLink: { en: 'Sign in', ur: 'سائن ان' },
  roleOnly: { en: 'Notes are for student and teacher accounts.', ur: 'نوٹس طالب علم اور استاد کے اکاؤنٹس کے لیے ہیں۔' },
  private: { en: 'Only you can see your notes.', ur: 'آپ کے نوٹس صرف آپ دیکھ سکتے ہیں۔' },
} as const;

type Props = { locale: Locale; pageTitle: string | null; courseCode: string | null; unitNo: number | null; topicNo: number | null };

const samePage = (n: StudentNote, p: Props): boolean =>
  p.courseCode !== null
    ? n.course_code === p.courseCode && (n.unit_no ?? null) === p.unitNo && (n.topic_no ?? null) === p.topicNo
    : n.course_code === null && n.title === p.pageTitle;

export default function NotesWidget(props: Props): React.ReactElement | null {
  const { locale, pageTitle, courseCode, unitNo, topicNo } = props;
  const { session, profile, role, loading } = useAuth() as unknown as {
    session: unknown; profile: { id: string } | null; role: string | null; loading: boolean;
  };
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<StudentNote[] | null>(null);
  const [body, setBody] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const fab = useRef<HTMLButtonElement>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const titleId = useId();
  const canWrite = role === 'student' || role === 'teacher';
  const dashboard = role === 'teacher' ? '/app/teacher/notes' : '/app/dashboard/notes';

  const close = useCallback(() => { setOpen(false); fab.current?.focus(); }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open || !canWrite) return;
    area.current?.focus();
    let live = true;
    void listOwnNotes().then(({ data }) => { if (live) setNotes((data ?? []).filter((n) => samePage(n, props)).slice(0, 3)); });
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, canWrite, courseCode, unitNo, topicNo, pageTitle]);

  // A new page starts with a closed, empty panel.
  useEffect(() => { setOpen(false); setNotes(null); setBody(''); setStatus('idle'); }, [pathname]);

  const save = async () => {
    if (!profile || !body.trim()) return;
    setStatus('saving');
    const { data, error } = await createNote(profile.id, {
      body: body.trim(), title: pageTitle, courseCode, unitNo, topicNo,
    });
    if (error) { setStatus('error'); return; }
    setBody('');
    setStatus('saved');
    if (data) setNotes((prev) => [data, ...(prev ?? [])].slice(0, 3));
  };

  return (
    <div className={s.root} dir={locale === 'ur' ? 'rtl' : 'ltr'}>
      {open && (
        <div className={s.panel} role="dialog" aria-modal="false" aria-labelledby={titleId}>
          <div className={s.head}>
            <h2 id={titleId} className={s.title}>{T.title[locale]}</h2>
            <button type="button" className={s.close} onClick={close} aria-label={T.close[locale]}>
              <Icon name="close" size={20} accent={false} />
            </button>
          </div>
          {loading ? null : !session ? (
            <p className={s.text}>{T.signIn[locale]} <a href={loginUrlWithReturnTo(pathname, 'login')}>{T.signInLink[locale]}</a></p>
          ) : !canWrite ? (
            <p className={s.text}>{T.roleOnly[locale]}</p>
          ) : (
            <>
              <label className={s.label} htmlFor={`${titleId}-body`}>{T.label[locale]}</label>
              <textarea id={`${titleId}-body`} ref={area} className={s.area} rows={4} maxLength={8000}
                placeholder={T.placeholder[locale]} value={body}
                onChange={(e) => { setBody(e.target.value); if (status !== 'saving') setStatus('idle'); }} />
              <div className={s.row}>
                <button type="button" className="button button--primary button--sm" onClick={save}
                  disabled={!body.trim() || status === 'saving'}>
                  {status === 'saving' ? T.saving[locale] : T.save[locale]}
                </button>
                <span className={s.status} role="status" aria-live="polite">
                  {status === 'saved' ? T.saved[locale] : status === 'error' ? T.error[locale] : ''}
                </span>
              </div>
              {notes !== null && (notes.length === 0
                ? <p className={s.muted}>{T.none[locale]}</p>
                : <ul className={s.list}>{notes.map((n) => <li key={n.id}>{n.body}</li>)}</ul>)}
              <p className={s.foot}><span className={s.muted}>{T.private[locale]}</span> <Link to={dashboard}>{T.all[locale]}</Link></p>
            </>
          )}
        </div>
      )}
      <button ref={fab} type="button" className={s.fab} aria-expanded={open} onClick={() => (open ? close() : setOpen(true))}
        data-testid="notes-fab">
        <Icon name="notes" size={22} accent={false} />
        <span className={s.fabLabel}>{T.open[locale]}</span>
      </button>
    </div>
  );
}
