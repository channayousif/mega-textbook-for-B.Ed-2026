/**
 * Logo kit v2 (2026-11-07): the horizontal logo in both locales (kit v2 has no
 * Urdu-first logo), with the reverse version in dark mode. The bilingual logo
 * with the Urdu tagline needs 360px or more, so it belongs in the tall header
 * that shrinks on scroll (redesign PR 4). Replaces
 * upstream's logo-plus-title, which truncated the Urdu title on phones. Upstream
 * marks this component unsafe; re-check it on a Docusaurus bump.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import { WORDMARK_TEXT } from '@site/src/lib/brand';

export default function NavbarLogo(): React.ReactElement {
  const light = useBaseUrl('/img/brand/horizontal-color.svg');
  const dark = useBaseUrl('/img/brand/horizontal-reverse.svg');
  return (
    <Link to="/" className="navbar__brand">
      <ThemedImage
        className="brand-logo"
        alt={WORDMARK_TEXT}
        width={960}
        height={190}
        sources={{ light, dark }}
      />
    </Link>
  );
}
