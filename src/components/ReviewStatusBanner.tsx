import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Publication notice for units that are not certified (Constitution Art. VII.7 as
 * amended by ADR-0026). Two tiers, because there are now two ways to be published
 * without certification:
 *
 *   'gated'       the deterministic gates passed and NO reviewer has read it.
 *   'provisional' an independent agent review passed, but nothing is signed.
 *
 * A certified unit has no key in the map and renders nothing. The notice
 * disappears by itself when the tracker row reaches a certified `done`, because
 * the state is derived, not authored.
 *
 * Deliberately NOT modelled on `TranslationStatusBadge`'s usage. That component
 * is hand-placed in each MDX file with a literal prop, nothing enforces it
 * agrees with the file's own front matter, and EFMP-302 already shows the drift
 * (its units badge only `index.mdx` while EFMP-301 Unit 1 badges all seven
 * files). This one is rendered by the theme from tracker-derived state, so it
 * cannot disagree with the gate and cannot be forgotten on a file.
 */

type Tier = 'gated' | 'provisional';

const MESSAGES: Record<Tier, { label: Record<'en' | 'ur', string>; body: Record<'en' | 'ur', React.ReactNode> }> = {
  gated: {
    label: {
      en: 'Draft - expert review pending',
      ur: 'مسودہ - ماہرانہ نظرثانی باقی ہے',
    },
    body: {
      en: (
        <>
          Note: This unit is complete and passes the platform’s automated checks, but it is not reviewed yet. So, treat its sources and claims with care. You are encouraged to <a href="#feedback-widget">report errors and provide feedback</a>.
        </>
      ),
      ur: (
        <>
          نوٹ: یہ یونٹ مکمل ہے اور پلیٹ فارم کی خودکار جانچ سے گزر چکا ہے، لیکن ابھی اس پر نظرثانی نہیں کی گئی۔ اس لیے اس کے ذرائع اور دعووں کو احتیاط سے لیں۔ ہم آپ کی حوصلہ افزائی کرتے ہیں کہ <a href="#feedback-widget">غلطیوں کی نشاندہی کریں اور اپنی رائے دیں</a>۔
        </>
      ),
    },
  },
  provisional: {
    label: {
      en: 'Final Review Pending',
      ur: 'حتمی نظرثانی باقی ہے',
    },
    body: {
      en: (
        <>
          This unit has passed an independent automated review and is published for use. A final human review is still outstanding, so treat its details as provisional. Please use the <a href="#feedback-widget">feedback form at the bottom of the page</a> to report any errors.
        </>
      ),
      ur: (
        <>
          یہ یونٹ ایک خودکار آزاد جائزے سے گزر چکا ہے اور استعمال کے لیے شائع کیا گیا ہے۔ حتمی انسانی نظرثانی ابھی باقی ہے، اس لیے اس کی تفصیلات کو عارضی سمجھیں۔ براہ کرم کسی بھی غلطی کی نشاندہی کے لیے صفحے کے آخر میں موجود <a href="#feedback-widget">فیڈبیک فارم</a> استعمال کریں۔
        </>
      ),
    },
  },
};

export default function ReviewStatusBanner({
  courseCode,
  unitNo,
}: {
  courseCode: string | null;
  unitNo: number | null;
}): React.ReactElement | null {
  const { siteConfig, i18n } = useDocusaurusContext();
  if (courseCode === null || unitNo === null) return null;

  const notices = (siteConfig.customFields?.reviewNotices as Record<string, string> | undefined) ?? {};
  const raw = notices[`${courseCode}:${unitNo}`];
  if (raw === undefined) return null;

  // An unrecognised tier must never mean "no notice". A unit the build does not
  // understand is disclosed at the strongest level rather than published silently
  // as though it were certified.
  const tier: Tier = raw === 'provisional' ? 'provisional' : 'gated';
  const locale: 'en' | 'ur' = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const message = MESSAGES[tier];

  return (
    <div className={`review-banner review-banner--${tier}`} role="note">
      <strong className="review-banner__label">{message.label[locale]}</strong>
      <span className="review-banner__body">{message.body[locale]}</span>
    </div>
  );
}
