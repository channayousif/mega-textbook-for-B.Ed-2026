import React from 'react';

/**
 * Renders a teaching figure (Spec 009). Replaces the Spec 008 inline
 * `FIGURE[...]` MDX comment marker once an image asset exists.
 *
 *  - `src` is a root-absolute site path into `static/`, e.g.
 *    `/img/figures/efmp-302/unit-01/fig-U1-1.svg` (diagram) or `…/fig-U1-2.webp`
 *    (illustration). No import, locale-agnostic.
 *  - `alt` is the accessible description, verbatim from the figure marker
 *    (Constitution Art. III.8) — required and non-empty.
 *  - `loading="lazy"` + `decoding="async"` always (Art. V.5, low-bandwidth first).
 *
 * Contract: specs/009-figure-rendering/contracts/figure-component.md.
 * Styling: `.figure` block in src/css/custom.css (light/dark, print break-inside).
 */
export default function Figure({
  id,
  src,
  alt,
  caption,
  kind,
}: {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  kind?: 'diagram' | 'illustration';
}): React.ReactElement {
  return (
    <figure className={kind ? `figure figure--${kind}` : 'figure'} id={id}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
