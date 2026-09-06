import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import {
  fetchQueue, transitionFeedback, isIllegalTransitionError, exportUnitFeedback,
  type FeedbackQueueFilters,
} from '@site/src/lib/contentFeedback';
import type { ContentFeedback, ContentFeedbackScope, ContentFeedbackStatus } from '@site/src/lib/types';

/**
 * Owner triage queue (Spec 010, T022, FR-018-021) - every content-feedback item
 * from every reader, filterable by course/unit/topic/status/scope/locale, with a
 * transition-with-note-and-ref control presenting only the currently legal next
 * status per row (data-model.md's four-state lifecycle, enforced at the database
 * layer by enforce_content_feedback_status_transition() regardless of what this
 * page renders). Mirrors admin/suggestions.tsx's shape.
 */

const STATUS_OPTIONS: ContentFeedbackStatus[] = ['open', 'planned', 'resolved', 'declined'];
const SCOPE_OPTIONS: ContentFeedbackScope[] = ['whole_page', 'passage'];
const LOCALE_OPTIONS: ('en' | 'ur')[] = ['en', 'ur'];

const NEXT_STATUSES: Record<ContentFeedbackStatus, ContentFeedbackStatus[]> = {
  open: ['planned', 'resolved', 'declined'],
  planned: ['resolved', 'declined'],
  resolved: ['open'],
  declined: ['open'],
};

function ExportUnitFeedbackControl(): React.ReactElement {
  const [courseCode, setCourseCode] = useState('');
  const [unitNo, setUnitNo] = useState('');
  const [exportDoc, setExportDoc] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function handleExport(): Promise<void> {
    if (!courseCode || !unitNo) return;
    setPending(true);
    setError(null);
    setCopied(false);
    const { data, error: exportError } = await exportUnitFeedback(courseCode, Number(unitNo));
    setPending(false);
    if (exportError || data === null) {
      setError('Could not export this unit\'s feedback.');
      return;
    }
    setExportDoc(data);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(URL.createObjectURL(new Blob([data], { type: 'text/markdown' })));
  }

  async function handleCopy(): Promise<void> {
    if (!exportDoc) return;
    await navigator.clipboard.writeText(exportDoc);
    setCopied(true);
  }

  return (
    <section className="margin-bottom--lg" data-testid="export-unit-feedback-section">
      <h3>Export unit feedback</h3>
      <label htmlFor="export-course">Course</label>
      <input
        id="export-course"
        className="input"
        data-testid="export-course-input"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />
      <label htmlFor="export-unit" className="margin-left--md">Unit</label>
      <input
        id="export-unit"
        type="number"
        className="input"
        data-testid="export-unit-input"
        value={unitNo}
        onChange={(e) => setUnitNo(e.target.value)}
      />
      <button
        type="button"
        className="button button--sm button--secondary margin-left--md"
        data-testid="export-unit-feedback-button"
        disabled={pending || !courseCode || !unitNo}
        onClick={handleExport}
      >
        {pending ? 'Exporting…' : 'Export'}
      </button>
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      {exportDoc !== null && (
        <div className="margin-top--sm">
          <textarea
            className="input"
            data-testid="export-unit-feedback-output"
            readOnly
            value={exportDoc}
            rows={10}
            style={{ width: '100%' }}
          />
          <button type="button" className="button button--sm" onClick={handleCopy}>
            {copied ? 'Copied ✓' : 'Copy to clipboard'}
          </button>
          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`${courseCode}-unit-${unitNo}-feedback.md`}
              className="button button--sm margin-left--sm"
              data-testid="export-unit-feedback-download"
            >
              Download
            </a>
          )}
        </div>
      )}
    </section>
  );
}

function AdminFeedbackQueueContent(): React.ReactElement {
  const [rows, setRows] = useState<ContentFeedback[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [refs, setRefs] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<FeedbackQueueFilters>({});

  const load = useCallback(async () => {
    const { data, error: loadError } = await fetchQueue(filters);
    if (loadError) {
      setError('Could not load the feedback queue.');
      return;
    }
    setRows(data ?? []);
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleTransition(row: ContentFeedback, nextStatus: ContentFeedbackStatus): Promise<void> {
    setPendingId(row.id);
    setError(null);
    const { error: transitionError } = await transitionFeedback(row.id, nextStatus, {
      ownerNote: notes[row.id] ?? row.owner_note ?? null,
      resolutionRef: refs[row.id] ?? row.resolution_ref ?? null,
    });
    setPendingId(null);
    if (transitionError) {
      setError(
        isIllegalTransitionError(transitionError)
          ? `Cannot move this item to "${nextStatus}" from its current status.`
          : 'Could not update this item.',
      );
      return;
    }
    await load();
  }

  return (
    <main className="container auth-page margin-vert--lg">
      <h1>Content feedback queue</h1>

      <ExportUnitFeedbackControl />

      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}

      <div className="margin-bottom--md">
        <label htmlFor="filter-course">Course</label>
        <input
          id="filter-course"
          className="input"
          data-testid="filter-course"
          value={filters.courseCode ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, courseCode: e.target.value || undefined }))}
        />

        <label htmlFor="filter-unit" className="margin-left--md">Unit</label>
        <input
          id="filter-unit"
          type="number"
          className="input"
          data-testid="filter-unit"
          value={filters.unitNo ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, unitNo: e.target.value ? Number(e.target.value) : undefined }))}
        />

        <label htmlFor="filter-topic" className="margin-left--md">Topic</label>
        <input
          id="filter-topic"
          type="number"
          className="input"
          data-testid="filter-topic"
          value={filters.topicNo ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, topicNo: e.target.value ? Number(e.target.value) : undefined }))}
        />

        <label htmlFor="filter-status" className="margin-left--md">Status</label>
        <select
          id="filter-status"
          className="input"
          data-testid="filter-status"
          value={filters.status ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, status: (e.target.value || undefined) as ContentFeedbackStatus | undefined }))}
        >
          <option value="">All</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <label htmlFor="filter-scope" className="margin-left--md">Scope</label>
        <select
          id="filter-scope"
          className="input"
          data-testid="filter-scope"
          value={filters.scope ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, scope: (e.target.value || undefined) as ContentFeedbackScope | undefined }))}
        >
          <option value="">All</option>
          {SCOPE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <label htmlFor="filter-locale" className="margin-left--md">Locale</label>
        <select
          id="filter-locale"
          className="input"
          data-testid="filter-locale"
          value={filters.locale ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, locale: (e.target.value || undefined) as 'en' | 'ur' | undefined }))}
        >
          <option value="">All</option>
          {LOCALE_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {!rows ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <p>No feedback items match these filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Scope / quoted passage</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Owner note</th>
              <th>Resolution ref</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} data-testid="feedback-queue-row">
                <td>
                  {row.course_code} / Unit {row.unit_no ?? '-'}
                  {row.topic_no ? ` / Topic ${row.topic_no}` : ''} ({row.page_kind}, {row.locale})
                </td>
                <td>
                  {row.scope === 'passage' && row.quoted_passage ? (
                    <blockquote data-testid="feedback-quoted-passage">{row.quoted_passage}</blockquote>
                  ) : (
                    <em>whole page</em>
                  )}
                </td>
                <td>{row.comment}</td>
                <td data-testid="feedback-status">{row.status}</td>
                <td>
                  <input
                    className="input"
                    aria-label={`Owner note for ${row.id}`}
                    defaultValue={row.owner_note ?? ''}
                    onChange={(e) => setNotes((n) => ({ ...n, [row.id]: e.target.value }))}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    aria-label={`Resolution reference for ${row.id}`}
                    defaultValue={row.resolution_ref ?? ''}
                    onChange={(e) => setRefs((r) => ({ ...r, [row.id]: e.target.value }))}
                  />
                </td>
                <td>
                  {NEXT_STATUSES[row.status].map((next) => (
                    <button
                      key={next}
                      type="button"
                      className="button button--sm button--secondary margin-left--sm"
                      data-testid={`transition-to-${next}`}
                      disabled={pendingId === row.id}
                      onClick={() => handleTransition(row, next)}
                    >
                      {next}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default function AdminFeedbackQueuePage(): React.ReactElement {
  return (
    <Layout title="Admin: content feedback queue">
      <OwnerConsoleGuard>
        <AdminFeedbackQueueContent />
      </OwnerConsoleGuard>
    </Layout>
  );
}
