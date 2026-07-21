import React, { useState } from 'react';
import FooterOriginal from '@theme-original/DocItem/Footer';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/contexts/AuthContext';
import { markUnitStudied } from '@site/src/lib/unitProgress';

/**
 * Swizzled DocItem/Footer (Spec 004, T025, research.md R5, FR-006).
 *
 * Renders a "Mark as studied" control on any unit content page — activates
 * automatically wherever the page's front matter carries `course_code`/
 * `unit_no` (every one of a unit's five files, per Spec 001's data model),
 * with zero per-file content-author action required. Only rendered for a
 * signed-in student; renders nothing for anyone else or on non-unit pages.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  markStudied: { en: 'Mark as studied', ur: 'پڑھا ہوا نشان زد کریں' },
  studied: { en: 'Marked as studied ✓', ur: 'پڑھا ہوا نشان زد ✓' },
  markError: { en: 'Could not mark this unit studied.', ur: 'اس یونٹ کو پڑھا ہوا نشان زد نہیں کیا جا سکا۔' },
} as const;

export default function DocItemFooterWrapper(): React.ReactElement {
  const locale = useLocale();
  const { frontMatter } = useDoc() as { frontMatter: Record<string, unknown> };
  const { role, profile } = useAuth();
  const [marked, setMarked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const courseCode = typeof frontMatter?.course_code === 'string' ? frontMatter.course_code : null;
  const unitNo = typeof frontMatter?.unit_no === 'number' ? frontMatter.unit_no : null;

  async function handleMark(): Promise<void> {
    if (!profile || !courseCode || unitNo === null) return;
    setPending(true);
    const { error: markError } = await markUnitStudied(profile.id, courseCode, unitNo);
    setPending(false);
    if (markError) {
      setError(MESSAGES.markError[locale]);
      return;
    }
    setMarked(true);
  }

  return (
    <>
      {role === 'student' && courseCode && unitNo !== null && (
        <div className="margin-top--md">
          {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
          {marked ? (
            <p>{MESSAGES.studied[locale]}</p>
          ) : (
            <button
              type="button"
              className="button button--secondary button--sm"
              disabled={pending}
              onClick={handleMark}
            >
              {MESSAGES.markStudied[locale]}
            </button>
          )}
        </div>
      )}
      <FooterOriginal />
    </>
  );
}
