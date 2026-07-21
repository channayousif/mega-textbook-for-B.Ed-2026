import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StudentDashboardGuard from '@site/src/components/StudentDashboardGuard';
import { ACHIEVEMENT_CATALOG, fetchEarnedAchievements } from '@site/src/lib/achievements';
import type { AchievementKey, StudentAchievement } from '@site/src/lib/types';

/**
 * Achievements area (Spec 004, T039, FR-009). Full fixed catalog, earned and
 * not-yet-earned alike, with bilingual title/description and "how to reach
 * it" copy for unearned milestones.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load achievements.', ur: 'کامیابیاں لوڈ نہیں ہو سکیں۔' },
  title: { en: 'Achievements', ur: 'کامیابیاں' },
  earned: { en: 'Earned', ur: 'حاصل شدہ' },
  howToReach: { en: 'How to reach it:', ur: 'اسے کیسے حاصل کریں:' },
} as const;

function AchievementsContent(): React.ReactElement {
  const locale = useLocale();
  const [earned, setEarned] = useState<StudentAchievement[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error: loadError } = await fetchEarnedAchievements();
    if (loadError) setError(MESSAGES.loadError[locale]);
    else setEarned(data ?? []);
  }, [locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (!earned) return <p>{MESSAGES.loading[locale]}</p>;

  const earnedByKey = new Map(earned.map((e) => [e.achievement_key, e]));

  return (
    <div>
      <h2>{MESSAGES.title[locale]}</h2>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {(Object.keys(ACHIEVEMENT_CATALOG) as AchievementKey[]).map((key) => {
          const definition = ACHIEVEMENT_CATALOG[key];
          const earnedRow = earnedByKey.get(key);
          return (
            <li key={key} data-testid="achievement-row" style={{ marginBottom: '1.5rem' }}>
              <h3>{definition.title[locale]}</h3>
              <p>{definition.description[locale]}</p>
              {earnedRow ? (
                <p><strong>{MESSAGES.earned[locale]}</strong> — {new Date(earnedRow.earned_at).toLocaleDateString()}</p>
              ) : (
                <p>{MESSAGES.howToReach[locale]} {definition.howToReach[locale]}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function DashboardAchievementsPage(): React.ReactElement {
  return (
    <Layout title="Achievements">
      <StudentDashboardGuard>
        <main className="container auth-page margin-vert--lg">
          <AchievementsContent />
        </main>
      </StudentDashboardGuard>
    </Layout>
  );
}
