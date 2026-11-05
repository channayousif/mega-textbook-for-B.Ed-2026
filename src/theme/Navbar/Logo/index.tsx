/**
 * The owner's logo kit (2026-11-04): the English wordmark on English pages, the
 * Urdu-first logo on Urdu pages, and the reverse versions in dark mode. Replaces
 * upstream's logo-plus-title, which truncated the Urdu title on phones. Upstream
 * marks this component unsafe; re-check it on a Docusaurus bump.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ThemedImage from '@theme/ThemedImage';
import { WORDMARK_TEXT } from '@site/src/lib/brand';

export default function NavbarLogo(): React.ReactElement {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const urdu = currentLocale === 'ur';
  const name = urdu ? 'urdu-first' : 'horizontal';
  const light = useBaseUrl(`/img/brand/${name}-color.svg`);
  const dark = useBaseUrl(`/img/brand/${name}-reverse.svg`);
  return (
    <Link to="/" className="navbar__brand">
      <ThemedImage
        className="brand-logo"
        alt={WORDMARK_TEXT}
        width={urdu ? 315 : 543}
        height={urdu ? 105 : 80}
        sources={{ light, dark }}
      />
    </Link>
  );
}
