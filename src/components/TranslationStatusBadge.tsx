import React from 'react';

/**
 * Honest translation-state banner (FR-003).
 *  - status="draft"        -> "Draft translation" (UR file exists, not yet human-reviewed)
 *  - status="untranslated" -> "Urdu translation not yet available" (no UR file; EN fallback shown)
 *  - status="reviewed"     -> nothing rendered (finished bilingual unit)
 */
export default function TranslationStatusBadge({
  status,
}: {
  status: 'draft' | 'untranslated' | 'reviewed';
}): React.ReactElement | null {
  if (status === 'reviewed') return null;

  const label =
    status === 'draft'
      ? 'Draft translation — not yet human-reviewed / مسودہ ترجمہ'
      : 'Urdu translation not yet available — showing English / اردو ترجمہ ابھی دستیاب نہیں';

  return (
    <div className={`translation-badge translation-badge--${status}`} role="note">
      {label}
    </div>
  );
}
