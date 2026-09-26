import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import AuthGuard from '@site/src/components/AuthGuard';
import {
  fetchModerationQueue, transitionSuggestion, isIllegalTransitionError,
  type ModerationQueueFilters,
} from '@site/src/lib/suggestions';
import type { ImprovementSuggestion, SuggestionCategory, SuggestionStatus } from '@site/src/lib/types';

/**
 * Admin moderation queue (Spec 005, T019, FR-005) - every suggestion from
 * every teacher, filterable by status/category/course, with a
 * transition-with-note control presenting only the currently legal next
 * status per row (research.md R5's one-directional graph, enforced at the
 * database layer by enforce_suggestion_status_transition() regardless of
 * what this page renders).
 */

const CATEGORY_OPTIONS: SuggestionCategory[] = ['typo', 'clarity', 'factual', 'pedagogy', 'translation', 'other'];
const STATUS_OPTIONS: SuggestionStatus[] = ['submitted', 'under_review', 'accepted', 'rejected', 'published'];

const NEXT_STATUSES: Record<SuggestionStatus, SuggestionStatus[]> = {
  submitted: ['under_review'],
  under_review: ['accepted', 'rejected'],
  accepted: ['published'],
  rejected: [],
  published: [],
};

function AdminSuggestionsContent(): React.ReactElement {
  const [rows, setRows] = useState<ImprovementSuggestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<ModerationQueueFilters>({});

  const load = useCallback(async () => {
    const { data, error: loadError } = await fetchModerationQueue(filters);
    if (loadError) {
      setError('Could not load the moderation queue.');
      return;
    }
    setRows(data ?? []);
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleTransition(row: ImprovementSuggestion, nextStatus: SuggestionStatus): Promise<void> {
    setPendingId(row.id);
    setError(null);
    const { error: transitionError } = await transitionSuggestion(row.id, nextStatus, notes[row.id] ?? row.admin_note ?? null);
    setPendingId(null);
    if (transitionError) {
      setError(
        isIllegalTransitionError(transitionError)
          ? `Cannot move this suggestion to "${nextStatus}" from its current status.`
          : 'Could not update this suggestion.',
      );
      return;
    }
    await load();
  }

  return (
    <main className="container auth-page margin-vert--lg">
      <h1>Suggestion moderation queue</h1>

      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}

      <div className="margin-bottom--md">
        <label htmlFor="filter-status">Status</label>
        <select
          id="filter-status"
          className="input"
          data-testid="filter-status"
          value={filters.status ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, status: (e.target.value || undefined) as SuggestionStatus | undefined }))}
        >
          <option value="">All</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <label htmlFor="filter-category" className="margin-left--md">Category</label>
        <select
          id="filter-category"
          className="input"
          data-testid="filter-category"
          value={filters.category ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, category: (e.target.value || undefined) as SuggestionCategory | undefined }))}
        >
          <option value="">All</option>
          {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <label htmlFor="filter-course" className="margin-left--md">Course</label>
        <input
          id="filter-course"
          className="input"
          data-testid="filter-course"
          value={filters.courseCode ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, courseCode: e.target.value || undefined }))}
        />
      </div>

      {!rows ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <p>No suggestions match these filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Category</th>
              <th>Body</th>
              <th>Status</th>
              <th>Note</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} data-testid="moderation-row">
                <td>{row.page_slug}</td>
                <td>{row.category}</td>
                <td>{row.body}</td>
                <td data-testid="moderation-status">{row.status}</td>
                <td>
                  <input
                    className="input"
                    aria-label={`Admin note for ${row.id}`}
                    defaultValue={row.admin_note ?? ''}
                    onChange={(e) => setNotes((n) => ({ ...n, [row.id]: e.target.value }))}
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
                  {row.status === 'accepted' && <Link className="button button--sm button--primary margin-left--sm" to={`/app/admin/agent-jobs?suggestion=${row.id}`}>Queue agent job</Link>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default function AdminSuggestionsPage(): React.ReactElement {
  return (
    <Layout title="Admin: suggestion moderation">
      <AuthGuard requireRole="admin">
        <AdminSuggestionsContent />
      </AuthGuard>
    </Layout>
  );
}
