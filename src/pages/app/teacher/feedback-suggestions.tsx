import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { fetchOwnSuggestions } from '@site/src/lib/suggestions';
import { fetchOwnFeedbackHistory } from '@site/src/lib/activityFeedback';
import type { ImprovementSuggestion, ActivityFeedback } from '@site/src/lib/types';

/**
 * Feedback & Suggestions area (Spec 005, T015/T031) - "My Suggestions" list
 * (FR-004): every suggestion the teacher has filed, with category, body,
 * current status, and any admin note; plus the teacher's own Activity
 * Feedback history (FR-007) - every activity they've rated, most recently
 * updated first.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load your suggestions.', ur: 'آپ کی تجاویز لوڈ نہیں ہو سکیں۔' },
  mySuggestions: { en: 'My Suggestions', ur: 'میری تجاویز' },
  noSuggestions: {
    en: 'You have not filed any suggestions yet. Use "Suggest improvement" on any book page.',
    ur: 'ابھی تک آپ نے کوئی تجویز جمع نہیں کرائی۔ کسی بھی کتابی صفحے پر "بہتری تجویز کریں" استعمال کریں۔',
  },
  statusSubmitted: { en: 'Submitted', ur: 'جمع شدہ' },
  statusUnderReview: { en: 'Under review', ur: 'زیرِ جائزہ' },
  statusAccepted: { en: 'Accepted', ur: 'منظور شدہ' },
  statusRejected: { en: 'Rejected', ur: 'مسترد شدہ' },
  statusPublished: { en: 'Published', ur: 'شائع شدہ' },
  adminNote: { en: 'Admin note', ur: 'ایڈمن نوٹ' },
  myActivityFeedback: { en: 'My Activity Feedback', ur: 'میری سرگرمی رائے' },
  noFeedback: {
    en: 'You have not rated any activities yet.',
    ur: 'ابھی تک آپ نے کسی سرگرمی کو ریٹ نہیں کیا۔',
  },
} as const;

const STATUS_LABELS: Record<ImprovementSuggestion['status'], keyof typeof MESSAGES> = {
  submitted: 'statusSubmitted',
  under_review: 'statusUnderReview',
  accepted: 'statusAccepted',
  rejected: 'statusRejected',
  published: 'statusPublished',
};

function FeedbackSuggestionsContent(): React.ReactElement {
  const locale = useLocale();
  const [suggestions, setSuggestions] = useState<ImprovementSuggestion[] | null>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<ActivityFeedback[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [suggestionsRes, feedbackRes] = await Promise.all([
      fetchOwnSuggestions(),
      fetchOwnFeedbackHistory(),
    ]);
    if (suggestionsRes.error || feedbackRes.error) {
      setError(MESSAGES.loadError[locale]);
      return;
    }
    setSuggestions(suggestionsRes.data ?? []);
    setFeedbackHistory(feedbackRes.data ?? []);
  }, [locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!suggestions || !feedbackHistory) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}

      <h2>{MESSAGES.mySuggestions[locale]}</h2>
      {suggestions.length === 0 ? (
        <p>{MESSAGES.noSuggestions[locale]}</p>
      ) : (
        <ul>
          {suggestions.map((s) => (
            <li key={s.id} data-testid="suggestion-row">
              <strong>{s.category}</strong> - {s.body} - <span data-testid="suggestion-status">{MESSAGES[STATUS_LABELS[s.status]][locale]}</span>
              {s.admin_note && (
                <p><em>{MESSAGES.adminNote[locale]}: {s.admin_note}</em></p>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2>{MESSAGES.myActivityFeedback[locale]}</h2>
      {feedbackHistory.length === 0 ? (
        <p>{MESSAGES.noFeedback[locale]}</p>
      ) : (
        <ul>
          {feedbackHistory.map((f) => (
            <li key={f.id} data-testid="feedback-history-row">
              {f.course_code} Unit {f.unit_no} ({f.source_kind}) - {f.rating}/5 - {f.actual_minutes} min
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function FeedbackSuggestionsPage(): React.ReactElement {
  return (
    <Layout title="Feedback & Suggestions">
      <AppDashboardShell role="teacher">
          <FeedbackSuggestionsContent />
      </AppDashboardShell>
    </Layout>
  );
}
