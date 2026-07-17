import React from 'react';
import glossary from '@site/glossary.json';

type Entry = { term: string; definition_en: string; definition_ur: string };

/**
 * Inline bilingual glossary term (FR-016). Renders the child text with an
 * accessible tooltip/expandable definition drawn from glossary.json. The
 * validator guarantees every `term` used here resolves to a bilingual entry (T018).
 */
export default function Glossary({
  term,
  children,
}: {
  term: string;
  children?: React.ReactNode;
}): React.ReactElement {
  const entry = (glossary as Entry[]).find((e) => e.term === term);
  const title = entry
    ? `EN: ${entry.definition_en}\nUR: ${entry.definition_ur}`
    : term;
  return (
    <abbr className="glossary-term" title={title} tabIndex={0}>
      {children ?? term}
    </abbr>
  );
}
