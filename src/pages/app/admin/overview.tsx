import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import { fetchQueue, transitionFeedback } from '@site/src/lib/contentFeedback';
import { fetchAdminAggregate, type SelfAssessmentAggregateRow } from '@site/src/lib/selfAssessment';
import { getSupabase } from '@site/src/lib/supabase';
import { fetchAllPages } from '@site/src/lib/pagination';
import { fetchContentStatus, type ContentStatusReport } from '@site/src/lib/contentStatus';
import { fetchCatalog, type Catalog, type CatalogCourse } from '@site/src/lib/catalog';
import type { ContentFeedback, ContentFeedbackStatus } from '@site/src/lib/types';

/**
 * Curriculum-owner console (Spec 010, T025/T030, Story 3) - one page
 * presenting what the other stories produce: the content/figure status
 * report (Story 4), feedback counts per status linking to the full queue,
 * the self-assessment aggregate, and platform-wide progress aggregates. Each
 * panel has an explicit empty state (FR-026, FR-030).
 *
 * The progress panel deliberately calls `fetchOwnUnitProgress()`/
 * `fetchEarnedAchievements()` UNMODIFIED (Spec 004's own helpers) - under an
 * admin session RLS's own `is_admin()` branch on both tables already returns
 * every student's rows, so no new admin-wide query is needed (plan.md's
 * Structure Decision: reuse, don't re-derive).
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  title: { en: 'Curriculum-owner console', ur: 'نصاب کے ذمہ دار کا کنسول' },
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load the console.', ur: 'کنسول لوڈ نہیں ہو سکا۔' },

  contentStatusTitle: { en: 'Content and figure status', ur: 'مواد اور تصاویر کی صورتحال' },
  contentStatusEmpty: {
    en: 'Not yet available - run the content-status report to populate this panel.',
    ur: 'ابھی دستیاب نہیں - اس پینل کو بھرنے کے لیے مواد کی صورتحال کی رپورٹ چلائیں۔',
  },
  contentStatusGeneratedAt: { en: 'Last produced', ur: 'آخری بار تیار کردہ' },
  figuresPendingTitle: { en: 'Figures still pending', ur: 'ابھی زیر التوا تصاویر' },
  figuresPendingEmpty: { en: 'No figures are pending.', ur: 'کوئی تصویر زیر التوا نہیں۔' },
  refresh: { en: 'Refresh', ur: 'تازہ کریں' },

  feedbackTitle: { en: 'Reader feedback', ur: 'قارئین کی رائے' },
  feedbackEmpty: { en: 'No reader feedback has been filed yet.', ur: 'ابھی تک قارئین کی کوئی رائے جمع نہیں ہوئی۔' },
  openQueue: { en: 'Open the full queue', ur: 'مکمل قطار کھولیں' },
  openItemsTitle: { en: 'Open items', ur: 'زیر التوا اشیاء' },
  triageError: { en: 'Could not update this item.', ur: 'یہ آئٹم اپ ڈیٹ نہیں ہو سکا۔' },

  catalogTitle: { en: 'Edit catalog entry', ur: 'کیٹلاگ اندراج میں ترمیم کریں' },
  catalogEmpty: { en: 'Catalog not yet available.', ur: 'کیٹلاگ ابھی دستیاب نہیں۔' },
  catalogPickCourse: { en: 'Course', ur: 'کورس' },
  catalogTitleEn: { en: 'Title (English)', ur: 'عنوان (انگریزی)' },
  catalogTitleUr: { en: 'Title (Urdu)', ur: 'عنوان (اردو)' },
  catalogCreditHours: { en: 'Credit hours', ur: 'کریڈٹ آورز' },
  catalogCategory: { en: 'Category', ur: 'قسم' },
  catalogDownload: { en: 'Download updated courses.json', ur: 'اپ ڈیٹ شدہ courses.json ڈاؤن لوڈ کریں' },
  catalogNote: {
    en: 'This never writes to the database - review and commit the downloaded file yourself.',
    ur: 'یہ کبھی ڈیٹا بیس میں نہیں لکھتا - ڈاؤن لوڈ شدہ فائل خود جائزہ لے کر کمٹ کریں۔',
  },

  selfAssessmentTitle: { en: 'Self-assessment aggregate', ur: 'خود جانچ کا مجموعی جائزہ' },
  selfAssessmentEmpty: {
    en: 'No self-assessment ticks recorded yet.',
    ur: 'ابھی تک کوئی خود جانچ کا نشان ریکارڈ نہیں ہوا۔',
  },

  progressTitle: { en: 'Student progress', ur: 'طلبہ کی پیش رفت' },
  progressEmpty: { en: 'No student progress recorded yet.', ur: 'ابھی تک طلبہ کی کوئی پیش رفت ریکارڈ نہیں ہوئی۔' },
  achievementsEmpty: { en: 'No achievements earned yet.', ur: 'ابھی تک کوئی کامیابی حاصل نہیں ہوئی۔' },
} as const;

const STATUS_ORDER: ContentFeedbackStatus[] = ['open', 'planned', 'resolved', 'declined'];

function FeedbackPanel({ locale }: { locale: 'en' | 'ur' }): React.ReactElement {
  const [rows, setRows] = useState<ContentFeedback[] | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await fetchQueue({});
    setRows(data ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleTriage(row: ContentFeedback, nextStatus: 'planned' | 'declined'): Promise<void> {
    setPendingId(row.id);
    setError(null);
    const { error: transitionError } = await transitionFeedback(row.id, nextStatus);
    setPendingId(null);
    if (transitionError) {
      setError(MESSAGES.triageError[locale]);
      return;
    }
    await load();
  }

  if (rows === null) return <p>{MESSAGES.loading[locale]}</p>;

  const counts = STATUS_ORDER.reduce<Record<string, number>>((acc, status) => {
    acc[status] = rows.filter((r) => r.status === status).length;
    return acc;
  }, {});
  const openRows = rows.filter((r) => r.status === 'open');

  return (
    <section className="margin-top--lg" data-testid="owner-feedback-panel">
      <h3>{MESSAGES.feedbackTitle[locale]}</h3>
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      {rows.length === 0 ? (
        <p>{MESSAGES.feedbackEmpty[locale]}</p>
      ) : (
        <>
          <ul>
            {STATUS_ORDER.map((status) => (
              <li key={status} data-testid="owner-feedback-status-count">{status}: {counts[status]}</li>
            ))}
          </ul>
          {openRows.length > 0 && (
            <>
              <h4>{MESSAGES.openItemsTitle[locale]}</h4>
              <ul>
                {openRows.map((row) => (
                  <li key={row.id} data-testid="owner-feedback-open-row">
                    {row.course_code} - Unit {row.unit_no ?? '-'}
                    {row.topic_no ? ` - Topic ${row.topic_no}` : ''}: {row.comment}
                    <button
                      type="button"
                      className="button button--sm button--secondary margin-left--sm"
                      data-testid="owner-feedback-triage-planned"
                      disabled={pendingId === row.id}
                      onClick={() => handleTriage(row, 'planned')}
                    >
                      planned
                    </button>
                    <button
                      type="button"
                      className="button button--sm button--secondary margin-left--sm"
                      data-testid="owner-feedback-triage-declined"
                      disabled={pendingId === row.id}
                      onClick={() => handleTriage(row, 'declined')}
                    >
                      declined
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
      <p><Link to="/app/admin/feedback-queue">{MESSAGES.openQueue[locale]}</Link></p>
    </section>
  );
}

function SelfAssessmentAggregatePanel({ locale }: { locale: 'en' | 'ur' }): React.ReactElement {
  const [rows, setRows] = useState<SelfAssessmentAggregateRow[] | null>(null);

  useEffect(() => {
    fetchAdminAggregate().then(({ data }) => setRows(data ?? []));
  }, []);

  if (rows === null) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <section className="margin-top--lg" data-testid="owner-self-assessment-panel">
      <h3>{MESSAGES.selfAssessmentTitle[locale]}</h3>
      {rows.length === 0 ? (
        <p>{MESSAGES.selfAssessmentEmpty[locale]}</p>
      ) : (
        <ul>
          {rows.map((r) => (
            <li key={`${r.course_code}|${r.unit_no}`} data-testid="owner-self-assessment-row">
              {r.course_code} - Unit {r.unit_no}: {r.ticked_count} ticks across {r.distinct_students} student(s)
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * Admin-wide unit_progress/student_achievements reads, paginated (pagination.ts) - a bare
 * `.select('*')` on either table under an admin's own `is_admin()` RLS branch would silently
 * truncate at PostgREST's `max_rows` once real usage accumulates (`unit_progress` already has
 * thousands of rows from platform history). Deliberately queries the tables directly with the
 * SAME two columns Spec 004's `fetchOwnUnitProgress()`/`fetchEarnedAchievements()` already read
 * - not re-deriving unit-coverage/achievement logic, only fixing how many rows come back.
 */
async function fetchAdminProgressCounts(): Promise<Record<string, number>> {
  const supabase = await getSupabase();
  if (!supabase) return {};
  const { data } = await fetchAllPages<{ course_code: string }>(
    (from, to) => supabase.from('unit_progress').select('course_code').order('id', { ascending: true }).range(from, to),
  );
  const byCourse: Record<string, number> = {};
  for (const row of data ?? []) {
    byCourse[row.course_code] = (byCourse[row.course_code] ?? 0) + 1;
  }
  return byCourse;
}

async function fetchAdminAchievementCounts(): Promise<Record<string, number>> {
  const supabase = await getSupabase();
  if (!supabase) return {};
  const { data } = await fetchAllPages<{ achievement_key: string }>(
    (from, to) => supabase.from('student_achievements').select('achievement_key').order('id', { ascending: true }).range(from, to),
  );
  const byKey: Record<string, number> = {};
  for (const row of data ?? []) {
    byKey[row.achievement_key] = (byKey[row.achievement_key] ?? 0) + 1;
  }
  return byKey;
}

function ProgressAggregatesPanel({ locale }: { locale: 'en' | 'ur' }): React.ReactElement {
  const [progressByCourseCode, setProgressByCourseCode] = useState<Record<string, number> | null>(null);
  const [achievementsByKey, setAchievementsByKey] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetchAdminProgressCounts().then(setProgressByCourseCode);
    fetchAdminAchievementCounts().then(setAchievementsByKey);
  }, []);

  if (!progressByCourseCode || !achievementsByKey) return <p>{MESSAGES.loading[locale]}</p>;

  const progressEntries = Object.entries(progressByCourseCode);
  const achievementEntries = Object.entries(achievementsByKey);

  return (
    <section className="margin-top--lg" data-testid="owner-progress-panel">
      <h3>{MESSAGES.progressTitle[locale]}</h3>
      {progressEntries.length === 0 ? (
        <p>{MESSAGES.progressEmpty[locale]}</p>
      ) : (
        <ul>
          {progressEntries.map(([courseCode, count]) => (
            <li key={courseCode} data-testid="owner-progress-row">{courseCode}: {count} unit(s) covered (all students)</li>
          ))}
        </ul>
      )}
      {achievementEntries.length === 0 ? (
        <p>{MESSAGES.achievementsEmpty[locale]}</p>
      ) : (
        <ul>
          {achievementEntries.map(([key, count]) => (
            <li key={key} data-testid="owner-achievement-row">{key}: {count}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ContentStatusPanel({ locale }: { locale: 'en' | 'ur' }): React.ReactElement {
  const [report, setReport] = useState<ContentStatusReport | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    setReport(await fetchContentStatus());
    setLoaded(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (!loaded) return <p>{MESSAGES.loading[locale]}</p>;

  const allPending = (report?.courses ?? []).flatMap((c) => c.units.flatMap((u) => u.figures_pending));

  return (
    <section data-testid="owner-content-status-panel">
      <h3>{MESSAGES.contentStatusTitle[locale]}</h3>
      {!report || report.courses.length === 0 ? (
        <p>{MESSAGES.contentStatusEmpty[locale]}</p>
      ) : (
        <>
          <p data-testid="owner-content-status-generated-at">
            {MESSAGES.contentStatusGeneratedAt[locale]}: {new Date(report.generated_at).toLocaleString()}
            <button
              type="button"
              className="button button--sm button--secondary margin-left--sm"
              data-testid="owner-content-status-refresh"
              onClick={load}
            >
              {MESSAGES.refresh[locale]}
            </button>
          </p>
          <ul>
            {report.courses.flatMap((course) => course.units.map((unit) => (
              <li key={`${course.course_code}|${unit.unit_no}`} data-testid="owner-content-status-row">
                {course.course_code} - Unit {unit.unit_no}: {unit.authored ? 'authored' : 'planned'},
                {' '}{unit.translation_status ?? 'n/a'}, depth {unit.depth_check},
                {' '}figures {unit.figures.prompt_only}/{unit.figures.generated}/{unit.figures.placed}
                {' '}(prompt-only/generated/placed)
              </li>
            )))}
          </ul>
          <h4>{MESSAGES.figuresPendingTitle[locale]}</h4>
          {allPending.length === 0 ? (
            <p>{MESSAGES.figuresPendingEmpty[locale]}</p>
          ) : (
            <ul>
              {allPending.map((p) => (
                <li key={`${p.course_code}|${p.unit_no}|${p.figure_id}`} data-testid="owner-figures-pending-row">
                  {p.course_code} - Unit {p.unit_no} - Topic {p.topic}: {p.figure_id}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

function CatalogEditPanel({ locale }: { locale: 'en' | 'ur' }): React.ReactElement {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [edits, setEdits] = useState<Partial<CatalogCourse>>({});
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchCatalog().then((data) => {
      setCatalog(data);
      setLoaded(true);
    });
  }, []);

  const allCourses = (catalog?.semesters ?? []).flatMap((s) => s.courses);
  const selected = allCourses.find((c) => c.code === selectedCode) ?? null;

  function handleSelect(code: string): void {
    setSelectedCode(code);
    const course = allCourses.find((c) => c.code === code);
    setEdits(course ? { ...course } : {});
    setDownloadUrl(null);
  }

  function handleGenerate(): void {
    if (!catalog || !selected) return;
    const updated: Catalog = {
      ...catalog,
      semesters: catalog.semesters.map((s) => ({
        ...s,
        courses: s.courses.map((c) => (c.code === selected.code ? { ...c, ...edits } : c)),
      })),
    };
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(URL.createObjectURL(new Blob([JSON.stringify(updated, null, 2)], { type: 'application/json' })));
  }

  if (!loaded) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <section className="margin-top--lg" data-testid="owner-catalog-panel">
      <h3>{MESSAGES.catalogTitle[locale]}</h3>
      {!catalog || allCourses.length === 0 ? (
        <p>{MESSAGES.catalogEmpty[locale]}</p>
      ) : (
        <>
          <label htmlFor="catalog-course-select">{MESSAGES.catalogPickCourse[locale]}</label>
          <select
            id="catalog-course-select"
            className="input"
            data-testid="catalog-course-select"
            value={selectedCode}
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="">-</option>
            {allCourses.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>

          {selected && (
            <div className="margin-top--sm">
              <div className="margin-bottom--sm">
                <label htmlFor="catalog-title-en">{MESSAGES.catalogTitleEn[locale]}</label>
                <input
                  id="catalog-title-en"
                  className="input"
                  data-testid="catalog-title-en-input"
                  value={edits.title_en ?? ''}
                  onChange={(e) => setEdits((prev) => ({ ...prev, title_en: e.target.value }))}
                />
              </div>
              <div className="margin-bottom--sm">
                <label htmlFor="catalog-title-ur">{MESSAGES.catalogTitleUr[locale]}</label>
                <input
                  id="catalog-title-ur"
                  className="input"
                  data-testid="catalog-title-ur-input"
                  value={edits.title_ur ?? ''}
                  onChange={(e) => setEdits((prev) => ({ ...prev, title_ur: e.target.value }))}
                />
              </div>
              <div className="margin-bottom--sm">
                <label htmlFor="catalog-credit-hours">{MESSAGES.catalogCreditHours[locale]}</label>
                <input
                  id="catalog-credit-hours"
                  className="input"
                  data-testid="catalog-credit-hours-input"
                  value={edits.credit_hours ?? ''}
                  onChange={(e) => setEdits((prev) => ({ ...prev, credit_hours: e.target.value }))}
                />
              </div>
              <div className="margin-bottom--sm">
                <label htmlFor="catalog-category">{MESSAGES.catalogCategory[locale]}</label>
                <input
                  id="catalog-category"
                  className="input"
                  data-testid="catalog-category-input"
                  value={edits.category ?? ''}
                  onChange={(e) => setEdits((prev) => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <button
                type="button"
                className="button button--sm button--secondary"
                data-testid="catalog-generate-button"
                onClick={handleGenerate}
              >
                {MESSAGES.catalogDownload[locale]}
              </button>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download="courses.json"
                  className="button button--sm margin-left--sm"
                  data-testid="catalog-download-link"
                >
                  {MESSAGES.catalogDownload[locale]}
                </a>
              )}
              <p>{MESSAGES.catalogNote[locale]}</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function OverviewContent(): React.ReactElement {
  const locale = useLocale();

  return (
    <div>
      <h1>{MESSAGES.title[locale]}</h1>
      <ContentStatusPanel locale={locale} />
      <FeedbackPanel locale={locale} />
      <SelfAssessmentAggregatePanel locale={locale} />
      <ProgressAggregatesPanel locale={locale} />
      <CatalogEditPanel locale={locale} />
    </div>
  );
}

export default function AdminOverviewPage(): React.ReactElement {
  return (
    <Layout title="Curriculum-owner console">
      <OwnerConsoleGuard>
        <main className="container auth-page margin-vert--lg">
          <OverviewContent />
        </main>
      </OwnerConsoleGuard>
    </Layout>
  );
}
