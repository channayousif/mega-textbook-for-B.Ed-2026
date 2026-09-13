import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { useAuth } from '@site/src/contexts/AuthContext';
import { fetchContentIndex } from '@site/src/lib/assignments';
import { fetchCourseOptions, type CourseOptionGroup } from '@site/src/lib/courseOptions';
import {
  fetchAuthoringItems, createQuizItem, updateQuizItem, deleteQuizItem,
  fetchAnswerKeys, upsertAnswerKey,
} from '@site/src/lib/quizAuthoring';
import type { QuizItem, AnswerKey, SubmissionQuizItemKind } from '@site/src/lib/types';

/**
 * Verified-teacher quiz-item / answer-key authoring (Spec 011, US6 / FR-014). Gated on
 * `verifiedTeacher`; RLS (migration 0040) is the real enforcement. Closes the standing
 * Spec 003 "quiz item / answer-key authoring UI" backlog item.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  title: { en: 'Quiz authoring', ur: 'کوئز تیاری' },
  gated: {
    en: 'This area is for verified teachers. Ask an admin to verify your account to author quiz items and answer keys.',
    ur: 'یہ حصہ تصدیق شدہ اساتذہ کے لیے ہے۔ کوئز آئٹمز اور جوابی کلیدیں بنانے کے لیے کسی ایڈمن سے اپنے اکاؤنٹ کی تصدیق کروائیں۔',
  },
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  course: { en: 'Course', ur: 'کورس' },
  unit: { en: 'Unit', ur: 'یونٹ' },
  pickCourse: { en: 'Select a course…', ur: 'کورس منتخب کریں…' },
  pickUnit: { en: 'Select a unit…', ur: 'یونٹ منتخب کریں…' },
  items: { en: 'Quiz items', ur: 'کوئز آئٹمز' },
  noItems: { en: 'No quiz items for this unit yet.', ur: 'اس یونٹ کے لیے ابھی کوئی کوئز آئٹم نہیں۔' },
  addItem: { en: 'Add item', ur: 'آئٹم شامل کریں' },
  stem: { en: 'Question', ur: 'سوال' },
  option: { en: 'Option', ur: 'اختیار' },
  correct: { en: 'Correct', ur: 'درست' },
  addOption: { en: 'Add option', ur: 'اختیار شامل کریں' },
  save: { en: 'Save', ur: 'محفوظ کریں' },
  cancel: { en: 'Cancel', ur: 'منسوخ' },
  edit: { en: 'Edit', ur: 'ترمیم' },
  del: { en: 'Delete', ur: 'حذف کریں' },
  confirmDel: { en: 'Delete this quiz item?', ur: 'یہ کوئز آئٹم حذف کریں؟' },
  saveError: { en: 'Could not save. You may not be a verified teacher.', ur: 'محفوظ نہیں ہو سکا۔ ہو سکتا ہے آپ تصدیق شدہ استاد نہ ہوں۔' },
  answerKeys: { en: 'Answer keys', ur: 'جوابی کلیدیں' },
  formative: { en: 'Formative', ur: 'تشکیلی' },
  summative: { en: 'Summative', ur: 'جامع' },
  keyContent: { en: 'Marking guidance / model answers', ur: 'نمبر دہی کی رہنمائی / نمونہ جوابات' },
  saved: { en: 'Saved ✓', ur: 'محفوظ ✓' },
} as const;

const BLANK_OPTIONS = [
  { key: 'A', text: '' },
  { key: 'B', text: '' },
  { key: 'C', text: '' },
  { key: 'D', text: '' },
];

type ItemDraft = { questionText: string; options: { key: string; text: string }[]; correctOption: string };

function ItemForm({
  initial,
  onSave,
  onCancel,
  pending,
  locale,
}: {
  initial: ItemDraft;
  onSave: (d: ItemDraft) => void;
  onCancel: () => void;
  pending: boolean;
  locale: 'en' | 'ur';
}): React.ReactElement {
  const [d, setD] = useState<ItemDraft>(initial);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(d); }}
      className="margin-bottom--md"
      style={{ border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: 6, padding: '0.75rem 1rem' }}
    >
      <div className="margin-bottom--sm">
        <label htmlFor="qa-stem">{MESSAGES.stem[locale]}</label>
        <textarea id="qa-stem" className="input" rows={2} required value={d.questionText} onChange={(e) => setD({ ...d, questionText: e.target.value })} />
      </div>
      {d.options.map((o, i) => (
        <div key={o.key} className="margin-bottom--sm">
          <label>
            <input
              type="radio"
              name="qa-correct"
              className="auth-tap-target"
              checked={d.correctOption === o.key}
              onChange={() => setD({ ...d, correctOption: o.key })}
              aria-label={`${MESSAGES.correct[locale]} ${o.key}`}
            />{' '}
            {MESSAGES.option[locale]} {o.key}
          </label>
          <input
            className="input"
            value={o.text}
            required
            onChange={(e) => {
              const options = [...d.options];
              options[i] = { ...o, text: e.target.value };
              setD({ ...d, options });
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className="button button--secondary button--sm margin-bottom--sm"
        onClick={() => setD({ ...d, options: [...d.options, { key: String.fromCharCode(65 + d.options.length), text: '' }] })}
      >
        {MESSAGES.addOption[locale]}
      </button>
      <div>
        <button type="submit" className="button button--primary button--sm margin-right--sm" disabled={pending || !d.correctOption}>
          {MESSAGES.save[locale]}
        </button>
        <button type="button" className="button button--secondary button--sm" onClick={onCancel}>
          {MESSAGES.cancel[locale]}
        </button>
      </div>
    </form>
  );
}

function AuthoringContent(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [courseOpts, setCourseOpts] = useState<CourseOptionGroup[]>([]);
  const [unitsByCourse, setUnitsByCourse] = useState<Record<string, number[]>>({});
  const [courseCode, setCourseCode] = useState('');
  const [unitNo, setUnitNo] = useState<number | ''>('');

  const [items, setItems] = useState<QuizItem[] | null>(null);
  const [keys, setKeys] = useState<AnswerKey[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [keyDrafts, setKeyDrafts] = useState<Record<string, string>>({});
  const [keySaved, setKeySaved] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchCourseOptions(), fetchContentIndex()]).then(([groups, index]) => {
      if (cancelled) return;
      setCourseOpts(groups);
      const byCourse: Record<string, number[]> = {};
      for (const e of index) {
        (byCourse[e.course_code] ??= []);
        if (!byCourse[e.course_code].includes(e.unit_no)) byCourse[e.course_code].push(e.unit_no);
      }
      for (const k of Object.keys(byCourse)) byCourse[k].sort((a, b) => a - b);
      setUnitsByCourse(byCourse);
    });
    return () => { cancelled = true; };
  }, []);

  const load = useCallback(async () => {
    if (!courseCode || unitNo === '') {
      setItems(null);
      setKeys([]);
      return;
    }
    const [itemsRes, keysRes] = await Promise.all([
      fetchAuthoringItems(courseCode, unitNo),
      fetchAnswerKeys(courseCode, unitNo),
    ]);
    if (itemsRes.error) setError(MESSAGES.saveError[locale]);
    setItems(itemsRes.data ?? []);
    setKeys(keysRes.data ?? []);
    const drafts: Record<string, string> = {};
    for (const k of keysRes.data ?? []) drafts[k.kind] = k.content;
    setKeyDrafts(drafts);
  }, [courseCode, unitNo, locale]);

  useEffect(() => {
    load();
  }, [load]);

  const units = useMemo(() => unitsByCourse[courseCode] ?? [], [unitsByCourse, courseCode]);

  async function handleCreate(d: ItemDraft): Promise<void> {
    if (!profile || unitNo === '') return;
    setPending(true);
    setError(null);
    const { error: e } = await createQuizItem(
      { courseCode, unitNo, questionText: d.questionText.trim(), options: d.options, correctOption: d.correctOption },
      profile.id,
    );
    setPending(false);
    if (e) {
      setError(MESSAGES.saveError[locale]);
      return;
    }
    setAdding(false);
    await load();
  }

  async function handleUpdate(id: string, d: ItemDraft): Promise<void> {
    setPending(true);
    setError(null);
    const { error: e } = await updateQuizItem(id, {
      question_text: d.questionText.trim(),
      options: d.options,
      correct_option: d.correctOption,
    });
    setPending(false);
    if (e) {
      setError(MESSAGES.saveError[locale]);
      return;
    }
    setEditingId(null);
    await load();
  }

  async function handleDeleteItem(id: string): Promise<void> {
    if (typeof window !== 'undefined' && !window.confirm(MESSAGES.confirmDel[locale])) return;
    setPending(true);
    await deleteQuizItem(id);
    setPending(false);
    await load();
  }

  async function handleSaveKey(kind: SubmissionQuizItemKind): Promise<void> {
    if (!profile || unitNo === '') return;
    setPending(true);
    setError(null);
    const { error: e } = await upsertAnswerKey(courseCode, unitNo, kind, (keyDrafts[kind] ?? '').trim(), profile.id);
    setPending(false);
    if (e) {
      setError(MESSAGES.saveError[locale]);
      return;
    }
    setKeySaved(kind);
    await load();
  }

  return (
    <div>
      <h1>{MESSAGES.title[locale]}</h1>
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}

      <div className="margin-bottom--md">
        <label htmlFor="qa-course">{MESSAGES.course[locale]} </label>
        <select
          id="qa-course"
          className="input"
          value={courseCode}
          onChange={(e) => { setCourseCode(e.target.value); setUnitNo(''); }}
        >
          <option value="">{MESSAGES.pickCourse[locale]}</option>
          {courseOpts.map((g) => (
            <optgroup key={g.trackId + (g.ordinal ?? '')} label={locale === 'ur' ? g.label_ur : g.label_en}>
              {g.courses.filter((c) => c.hasContent).map((c) => (
                <option key={c.code} value={c.code}>{c.code} - {locale === 'ur' ? c.title_ur : c.title_en}</option>
              ))}
            </optgroup>
          ))}
        </select>
        {courseCode && (
          <>
            {' '}
            <label htmlFor="qa-unit">{MESSAGES.unit[locale]} </label>
            <select id="qa-unit" className="input" value={unitNo} onChange={(e) => setUnitNo(e.target.value ? Number(e.target.value) : '')}>
              <option value="">{MESSAGES.pickUnit[locale]}</option>
              {units.map((u) => <option key={u} value={u}>{MESSAGES.unit[locale]} {u}</option>)}
            </select>
          </>
        )}
      </div>

      {courseCode && unitNo !== '' && (
        <>
          <h2>{MESSAGES.items[locale]}</h2>
          {!items ? (
            <p>{MESSAGES.loading[locale]}</p>
          ) : (
            <>
              {items.length === 0 && <p>{MESSAGES.noItems[locale]}</p>}
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {items.map((it) => (
                  <li key={it.id} className="margin-bottom--md">
                    {editingId === it.id ? (
                      <ItemForm
                        initial={{
                          questionText: it.question_text,
                          options: it.options.length ? it.options : BLANK_OPTIONS,
                          correctOption: it.correct_option ?? '',
                        }}
                        onSave={(d) => handleUpdate(it.id, d)}
                        onCancel={() => setEditingId(null)}
                        pending={pending}
                        locale={locale}
                      />
                    ) : (
                      <div style={{ border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: 6, padding: '0.75rem 1rem' }} data-testid="quiz-item">
                        <p style={{ fontWeight: 700, margin: '0 0 0.5rem' }}>{it.question_text}</p>
                        <ul style={{ margin: 0 }}>
                          {it.options.map((o) => (
                            <li key={o.key}>
                              <strong>{o.key}.</strong> {o.text}{' '}
                              {it.correct_option === o.key && <span aria-label={MESSAGES.correct[locale]}>✓</span>}
                            </li>
                          ))}
                        </ul>
                        <div className="margin-top--sm">
                          <button type="button" className="button button--secondary button--sm margin-right--sm" onClick={() => setEditingId(it.id)}>
                            {MESSAGES.edit[locale]}
                          </button>
                          <button type="button" className="button button--danger button--sm" disabled={pending} onClick={() => handleDeleteItem(it.id)}>
                            {MESSAGES.del[locale]}
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {adding ? (
                <ItemForm
                  initial={{ questionText: '', options: BLANK_OPTIONS, correctOption: '' }}
                  onSave={handleCreate}
                  onCancel={() => setAdding(false)}
                  pending={pending}
                  locale={locale}
                />
              ) : (
                <button type="button" className="button button--primary button--sm" onClick={() => setAdding(true)}>
                  {MESSAGES.addItem[locale]}
                </button>
              )}
            </>
          )}

          <h2 className="margin-top--lg">{MESSAGES.answerKeys[locale]}</h2>
          {(['formative', 'summative'] as SubmissionQuizItemKind[]).map((kind) => (
            <div key={kind} className="margin-bottom--md">
              <h3>{kind === 'formative' ? MESSAGES.formative[locale] : MESSAGES.summative[locale]}</h3>
              <label htmlFor={`qa-key-${kind}`}>{MESSAGES.keyContent[locale]}</label>
              <textarea
                id={`qa-key-${kind}`}
                className="input"
                rows={5}
                value={keyDrafts[kind] ?? ''}
                onChange={(e) => setKeyDrafts({ ...keyDrafts, [kind]: e.target.value })}
              />
              <button type="button" className="button button--primary button--sm margin-top--sm" disabled={pending} onClick={() => handleSaveKey(kind)}>
                {MESSAGES.save[locale]}
              </button>{' '}
              {keySaved === kind && <span role="status">{MESSAGES.saved[locale]}</span>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function QuizAuthoringPage(): React.ReactElement {
  const locale = useLocale();
  const { verifiedTeacher, loading } = useAuth();

  return (
    <Layout title="Quiz authoring">
      <AppDashboardShell role="teacher">
        {loading ? (
          <p>{MESSAGES.loading[locale]}</p>
        ) : verifiedTeacher ? (
          <AuthoringContent />
        ) : (
          <div className="alert alert--info" role="alert">
            <p><strong>{MESSAGES.title[locale]}</strong></p>
            <p>{MESSAGES.gated[locale]}</p>
            <p><Link to="/app/teacher" className="button button--primary button--sm">{locale === 'ur' ? 'جائزہ پر واپس' : 'Back to Overview'}</Link></p>
          </div>
        )}
      </AppDashboardShell>
    </Layout>
  );
}
