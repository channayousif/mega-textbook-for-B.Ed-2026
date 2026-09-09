import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { useAuth } from '@site/src/contexts/AuthContext';
import { listOwnClasses } from '@site/src/lib/classes';
import { fetchContentIndex, type ContentIndexEntry } from '@site/src/lib/assignments';
import { logActivity, fetchOwnLog } from '@site/src/lib/teachingLog';
import { submitFeedback, fetchOwnFeedback } from '@site/src/lib/activityFeedback';
import type { Class, TeachingLogEntry } from '@site/src/lib/types';

/**
 * My Teaching Log (Spec 005, T024/T030) - FR-006: log a teaching activity
 * (unit/activity, class, date, duration, reflection) in a single, fast entry
 * flow; view the own log most-recent-first. Each entry's "Give feedback"
 * affordance is wired in US5 (T030) to open Activity Feedback for that
 * entry's activity.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load your teaching log.', ur: 'آپ کا تدریسی لاگ لوڈ نہیں ہو سکا۔' },
  logActivity: { en: 'Log a teaching activity', ur: 'تدریسی سرگرمی لاگ کریں' },
  class: { en: 'Class', ur: 'کلاس' },
  activity: { en: 'Unit / activity', ur: 'یونٹ / سرگرمی' },
  date: { en: 'Date', ur: 'تاریخ' },
  durationMinutes: { en: 'Duration (minutes)', ur: 'دورانیہ (منٹ)' },
  reflection: { en: 'Reflection', ur: 'تاثرات' },
  save: { en: 'Save', ur: 'محفوظ کریں' },
  saving: { en: 'Saving…', ur: 'محفوظ ہو رہا ہے…' },
  saveError: { en: 'Could not save this log entry.', ur: 'یہ لاگ اندراج محفوظ نہیں ہو سکا۔' },
  myTeachingLog: { en: 'My Teaching Log', ur: 'میرا تدریسی لاگ' },
  noEntries: {
    en: 'You have not logged any teaching activity yet.',
    ur: 'ابھی تک آپ نے کوئی تدریسی سرگرمی لاگ نہیں کی۔',
  },
  noClasses: {
    en: 'You have no classes yet. Create one before logging an activity.',
    ur: 'ابھی تک آپ کی کوئی کلاس نہیں ہے۔ سرگرمی لاگ کرنے سے پہلے ایک کلاس بنائیں۔',
  },
  giveFeedback: { en: 'Give feedback', ur: 'رائے دیں' },
  rating: { en: 'Rating (1-5)', ur: 'ریٹنگ (1-5)' },
  whatWorked: { en: 'What worked', ur: 'کیا کارگر رہا' },
  whatDidnt: { en: "What didn't work", ur: 'کیا کارگر نہیں رہا' },
  actualMinutes: { en: 'Actual time taken (minutes)', ur: 'اصل وقت (منٹ)' },
  submitFeedback: { en: 'Submit feedback', ur: 'رائے جمع کرائیں' },
  feedbackSubmitted: { en: 'Feedback submitted ✓', ur: 'رائے جمع ہو گئی ✓' },
  feedbackError: { en: 'Could not submit feedback.', ur: 'رائے جمع نہیں ہو سکی۔' },
} as const;

type ContentOption = ContentIndexEntry;

/** T030 - inline feedback form wired to a specific log entry's activity. */
function LogEntryFeedback({ entry, locale }: { entry: TeachingLogEntry; locale: 'en' | 'ur' }): React.ReactElement {
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [whatWorked, setWhatWorked] = useState('');
  const [whatDidnt, setWhatDidnt] = useState('');
  const [actualMinutes, setActualMinutes] = useState(entry.duration_minutes);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const { data } = await fetchOwnFeedback(entry.course_code, entry.unit_no, entry.source_kind);
      if (data) {
        setRating(data.rating);
        setWhatWorked(data.what_worked ?? '');
        setWhatDidnt(data.what_didnt ?? '');
        setActualMinutes(data.actual_minutes);
      }
    })();
  }, [open, entry]);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!profile) return;
    setPending(true);
    setError(null);
    const { error: submitError } = await submitFeedback({
      teacherId: profile.id,
      courseCode: entry.course_code,
      unitNo: entry.unit_no,
      sourceKind: entry.source_kind,
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

  if (submitted) return <p data-testid="log-feedback-submitted">{MESSAGES.feedbackSubmitted[locale]}</p>;

  if (!open) {
    return (
      <button
        type="button"
        className="button button--secondary button--sm margin-left--sm"
        data-testid="log-give-feedback-button"
        onClick={() => setOpen(true)}
      >
        {MESSAGES.giveFeedback[locale]}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="margin-top--sm">
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      <label htmlFor={`log-feedback-rating-${entry.id}`}>{MESSAGES.rating[locale]}</label>
      <input
        id={`log-feedback-rating-${entry.id}`}
        type="number"
        min={1}
        max={5}
        className="input"
        data-testid="log-feedback-rating-input"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        required
      />
      <textarea
        className="input"
        placeholder={MESSAGES.whatWorked[locale]}
        value={whatWorked}
        onChange={(e) => setWhatWorked(e.target.value)}
      />
      <textarea
        className="input"
        placeholder={MESSAGES.whatDidnt[locale]}
        value={whatDidnt}
        onChange={(e) => setWhatDidnt(e.target.value)}
      />
      <label htmlFor={`log-feedback-minutes-${entry.id}`}>{MESSAGES.actualMinutes[locale]}</label>
      <input
        id={`log-feedback-minutes-${entry.id}`}
        type="number"
        min={1}
        className="input"
        value={actualMinutes}
        onChange={(e) => setActualMinutes(Number(e.target.value))}
        required
      />
      <button type="submit" className="button button--primary button--sm" data-testid="log-feedback-submit-button" disabled={pending}>
        {MESSAGES.submitFeedback[locale]}
      </button>
    </form>
  );
}

function TeachingLogContent(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [classes, setClasses] = useState<Class[] | null>(null);
  const [contentIndex, setContentIndex] = useState<ContentIndexEntry[] | null>(null);
  const [entries, setEntries] = useState<TeachingLogEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [classId, setClassId] = useState('');
  const [contentKey, setContentKey] = useState('');
  const [occurredOn, setOccurredOn] = useState(() => new Date().toISOString().slice(0, 10));
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [reflection, setReflection] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!profile) return;
    const [classesRes, entriesRes] = await Promise.all([
      listOwnClasses(profile.id),
      fetchOwnLog(),
    ]);
    if (classesRes.error || entriesRes.error) {
      setError(MESSAGES.loadError[locale]);
      return;
    }
    const active = (classesRes.data ?? []).filter((c) => c.status === 'active');
    setClasses(active);
    if (active.length > 0 && !classId) setClassId(active[0].id);
    setEntries(entriesRes.data ?? []);
    setContentIndex(await fetchContentIndex());
  }, [profile, locale, classId]);

  useEffect(() => {
    load();
  }, [load]);

  const selectedClass = classes?.find((c) => c.id === classId) ?? null;

  const contentOptions: ContentOption[] = useMemo(() => {
    if (!contentIndex || !selectedClass) return [];
    return contentIndex.filter((e) => e.course_code === selectedClass.course_code);
  }, [contentIndex, selectedClass]);

  useEffect(() => {
    if (contentOptions.length > 0 && !contentKey) {
      const first = contentOptions[0];
      setContentKey(`${first.unit_no}::${first.kind}`);
    }
  }, [contentOptions, contentKey]);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!profile || !selectedClass) return;
    const [unitNoStr, kind] = contentKey.split('::');
    const unitNo = Number(unitNoStr);
    if (!unitNo || !kind) return;

    setSaving(true);
    setError(null);
    const { error: saveError } = await logActivity({
      teacherId: profile.id,
      classId: selectedClass.id,
      courseCode: selectedClass.course_code,
      unitNo,
      sourceKind: kind as TeachingLogEntry['source_kind'],
      occurredOn,
      durationMinutes,
      reflection,
    });
    setSaving(false);
    if (saveError) {
      setError(MESSAGES.saveError[locale]);
      return;
    }
    setReflection('');
    await load();
  }

  if (!classes || !entries) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}

      <h2>{MESSAGES.logActivity[locale]}</h2>
      {classes.length === 0 ? (
        <p>{MESSAGES.noClasses[locale]}</p>
      ) : (
        <form onSubmit={handleSubmit} data-testid="teaching-log-form">
          <div className="margin-bottom--sm">
            <label htmlFor="log-class">{MESSAGES.class[locale]}</label>
            <select
              id="log-class"
              className="input"
              data-testid="log-class-select"
              value={classId}
              onChange={(e) => { setClassId(e.target.value); setContentKey(''); }}
            >
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="margin-bottom--sm">
            <label htmlFor="log-activity">{MESSAGES.activity[locale]}</label>
            <select
              id="log-activity"
              className="input"
              data-testid="log-activity-select"
              value={contentKey}
              onChange={(e) => setContentKey(e.target.value)}
            >
              {contentOptions.map((opt) => (
                <option key={`${opt.unit_no}::${opt.kind}`} value={`${opt.unit_no}::${opt.kind}`}>
                  Unit {opt.unit_no} - {opt.title} ({opt.kind})
                </option>
              ))}
            </select>
          </div>
          <div className="margin-bottom--sm">
            <label htmlFor="log-date">{MESSAGES.date[locale]}</label>
            <input
              id="log-date"
              type="date"
              className="input"
              data-testid="log-date-input"
              value={occurredOn}
              onChange={(e) => setOccurredOn(e.target.value)}
              required
            />
          </div>
          <div className="margin-bottom--sm">
            <label htmlFor="log-duration">{MESSAGES.durationMinutes[locale]}</label>
            <input
              id="log-duration"
              type="number"
              min={1}
              className="input"
              data-testid="log-duration-input"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              required
            />
          </div>
          <div className="margin-bottom--sm">
            <label htmlFor="log-reflection">{MESSAGES.reflection[locale]}</label>
            <textarea
              id="log-reflection"
              className="input"
              data-testid="log-reflection-input"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button button--primary button--sm" data-testid="log-save-button" disabled={saving}>
            {saving ? MESSAGES.saving[locale] : MESSAGES.save[locale]}
          </button>
        </form>
      )}

      <h2>{MESSAGES.myTeachingLog[locale]}</h2>
      {entries.length === 0 ? (
        <p>{MESSAGES.noEntries[locale]}</p>
      ) : (
        <ul>
          {entries.map((entry) => {
            const className = classes.find((c) => c.id === entry.class_id)?.name ?? '';
            return (
              <li key={entry.id} data-testid="teaching-log-row">
                {entry.occurred_on} - {className} - Unit {entry.unit_no} ({entry.source_kind}) -
                {' '}{entry.duration_minutes} min - {entry.reflection}
                <LogEntryFeedback entry={entry} locale={locale} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function TeachingLogPage(): React.ReactElement {
  return (
    <Layout title="My Teaching Log">
      <AppDashboardShell role="teacher">
          <TeachingLogContent />
      </AppDashboardShell>
    </Layout>
  );
}
