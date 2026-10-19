import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

/**
 * Honest translation-state banner (FR-003), shown on the Urdu site only.
 *  - Urdu file, translation_status draft  -> "Draft translation"
 *  - no Urdu file (English fallback shown) -> "Urdu translation not yet available"
 *  - translation_status reviewed           -> nothing rendered
 *
 * The badge is hand-placed in both the EN and UR `index.mdx` with a literal
 * `status="draft"`, so the prop alone put "Draft translation" on English pages
 * (owner report, 2026-10-17). The state is now read from where the page came
 * from and its own front matter; the prop is only a fallback.
 */
export default function TranslationStatusBadge({
  status,
}: {
  status: 'draft' | 'untranslated' | 'reviewed';
}): React.ReactElement | null {
  const { i18n } = useDocusaurusContext();
  const { metadata, frontMatter } = useDoc();
  if (i18n.currentLocale !== 'ur') return null;

  const fallback = !metadata.source.startsWith('@site/i18n/');
  const declared = (frontMatter as { translation_status?: string }).translation_status;
  const state = fallback ? 'untranslated' : declared === 'reviewed' || declared === 'draft' ? declared : status;
  if (state === 'reviewed') return null;

  const label =
    state === 'draft'
      ? 'Draft translation - not yet human-reviewed / مسودہ ترجمہ'
      : 'Urdu translation not yet available - showing English / اردو ترجمہ ابھی دستیاب نہیں';

  return (
    <div className={`translation-badge translation-badge--${state}`} role="note">
      {label}
    </div>
  );
}
