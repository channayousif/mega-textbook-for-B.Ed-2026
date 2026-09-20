import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * "Final Review Pending" notice for units published at Constitution Art. VII.7
 * provisional review (ADR-0025).
 *
 * A provisional unit passed an independent agent review but carries no signed,
 * qualified certification, so it is visible and honest about what that means.
 * The notice disappears by itself once the tracker row reaches a certified
 * `done`, because the state is derived, not authored.
 *
 * Deliberately NOT modelled on `TranslationStatusBadge`'s usage. That component
 * is hand-placed in each MDX file with a literal prop, nothing enforces it
 * agrees with the file's own front matter, and EFMP-302 already shows the drift
 * (its units badge only `index.mdx` while EFMP-301 Unit 1 badges all seven
 * files). This one is rendered by the theme from tracker-derived state, so it
 * cannot disagree with the gate and cannot be forgotten on a file.
 */

const MESSAGES = {
  label: {
    en: 'Final Review Pending',
    ur: 'حتمی نظرثانی باقی ہے',
  },
  body: {
    en: 'This unit has passed an independent automated review and is published for use. A final human review is still outstanding, so treat its details as provisional.',
    ur: 'یہ یونٹ ایک خودکار آزاد جائزے سے گزر چکا ہے اور استعمال کے لیے شائع کیا گیا ہے۔ حتمی انسانی نظرثانی ابھی باقی ہے، اس لیے اس کی تفصیلات کو عارضی سمجھیں۔',
  },
} as const;

export default function ReviewStatusBanner({
  courseCode,
  unitNo,
}: {
  courseCode: string | null;
  unitNo: number | null;
}): React.ReactElement | null {
  const { siteConfig, i18n } = useDocusaurusContext();
  if (courseCode === null || unitNo === null) return null;

  const units = (siteConfig.customFields?.provisionalUnits as string[] | undefined) ?? [];
  if (!units.includes(`${courseCode}:${unitNo}`)) return null;

  const locale: 'en' | 'ur' = i18n.currentLocale === 'ur' ? 'ur' : 'en';

  return (
    <div className="review-banner review-banner--provisional" role="note">
      <strong className="review-banner__label">{MESSAGES.label[locale]}</strong>
      <span className="review-banner__body">{MESSAGES.body[locale]}</span>
    </div>
  );
}
