/**
 * Logo kit v2 header logo (owner ruling 2026-11-06): on wide screens the bilingual logo
 * with the Urdu tagline at 90px while the page is at the top, shrinking to the plain
 * horizontal logo once the reader scrolls. Phones always show the horizontal logo (the
 * kit's bilingual logo needs 360px). Reverse versions in dark mode. Without JavaScript
 * the top-of-page state stays. Kit v2 has no Urdu-first logo, so both locales share it.
 * Upstream marks this component unsafe; re-check it on a Docusaurus bump.
 */
import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import { WORDMARK_TEXT } from '@site/src/lib/brand';

/** Hysteresis, so the header does not flicker when its own height change moves the page. */
const SHRINK_AT = 96;
const GROW_AT = 8;

function useScrolledFlag(): void {
  useEffect(() => {
    const root = document.documentElement;
    let scrolled = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const next = scrolled ? y > GROW_AT : y > SHRINK_AT;
      if (next !== scrolled) {
        scrolled = next;
        root.toggleAttribute('data-nav-scrolled', next);
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.removeAttribute('data-nav-scrolled');
    };
  }, []);
}

export default function NavbarLogo(): React.ReactElement {
  useScrolledFlag();
  const horizontal = {
    light: useBaseUrl('/img/brand/horizontal-color.svg'),
    dark: useBaseUrl('/img/brand/horizontal-reverse.svg'),
  };
  const bilingual = {
    light: useBaseUrl('/img/brand/bilingual-color.svg'),
    dark: useBaseUrl('/img/brand/bilingual-reverse.svg'),
  };
  return (
    <Link to="/" className="navbar__brand" aria-label={WORDMARK_TEXT}>
      {/* Spans carry the swap: ThemedImage's own display rule would beat a class on the img. */}
      <span className="brand-logo-slot brand-logo-slot--tall"><ThemedImage className="brand-logo" alt="" width={960} height={240} sources={bilingual} /></span>
      <span className="brand-logo-slot brand-logo-slot--short"><ThemedImage className="brand-logo" alt="" width={960} height={190} sources={horizontal} /></span>
    </Link>
  );
}
