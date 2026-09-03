import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import AuthGuard from '@site/src/components/AuthGuard';
import { fetchAllAggregatedFeedback, type ActivityAggregateSummary } from '@site/src/lib/activityFeedback';

/**
 * Admin: aggregated Activity Feedback per activity (Spec 005, T032, FR-008)
 * - average rating and every recorded what-didn't-work note across every
 * teacher who has rated it, to prioritize content revisions.
 */
function AdminFeedbackContent(): React.ReactElement {
  const [summaries, setSummaries] = useState<ActivityAggregateSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error: loadError } = await fetchAllAggregatedFeedback();
    if (loadError) {
      setError('Could not load aggregated feedback.');
      return;
    }
    setSummaries(data ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <main className="container auth-page margin-vert--lg">
      <h1>Aggregated Activity Feedback</h1>

      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}

      {!summaries ? (
        <p>Loading…</p>
      ) : summaries.length === 0 ? (
        <p>No activities have been rated yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Unit</th>
              <th>Kind</th>
              <th>Average rating</th>
              <th>Responses</th>
              <th>What didn&apos;t work</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((s) => (
              <tr key={`${s.courseCode}-${s.unitNo}-${s.sourceKind}`} data-testid="aggregate-feedback-row">
                <td>{s.courseCode}</td>
                <td>{s.unitNo}</td>
                <td>{s.sourceKind}</td>
                <td data-testid="aggregate-average-rating">{s.averageRating.toFixed(1)}</td>
                <td>{s.responseCount}</td>
                <td>
                  {s.whatDidntNotes.length === 0 ? '-' : (
                    <ul>
                      {s.whatDidntNotes.map((note, i) => <li key={i}>{note}</li>)}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default function AdminFeedbackPage(): React.ReactElement {
  return (
    <Layout title="Admin: activity feedback">
      <AuthGuard requireRole="admin">
        <AdminFeedbackContent />
      </AuthGuard>
    </Layout>
  );
}
