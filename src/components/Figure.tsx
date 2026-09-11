import React from 'react';
import { WORDMARK_TEXT } from '@site/src/lib/brand';

/**
 * Renders a teaching figure (Spec 009, extended by Spec 013).
 *
 *  - `src` is a root-absolute site path into `static/`, e.g.
 *    `/img/figures/efmp-302/unit-01/fig-U1-1.svg` (a schematic) or `…/fig-U1-2.webp`
 *    (illustration). No import, locale-agnostic.
 *  - `alt` is the accessible description, verbatim from the figure marker
 *    (Constitution Art. III.8) - required and non-empty.
 *  - `kind` is the Spec 012 archetype (six values); it only adds a `figure--<kind>`
 *    class hook - the gate reads the archetype from the manifest, not this prop.
 *  - `width`/`height` are the SVG's viewBox extents. They reserve the box before
 *    the image loads, so an illustrated page does not shift as figures arrive.
 *
 * THEMING (Spec 013, D1). A schematic ships as two committed files - the
 * authored `x.svg` and the derived `x.dark.svg` - and BOTH are rendered, with
 * CSS showing one per `[data-theme]`. This looks redundant and is not:
 *
 *  - An SVG behind `<img>` cannot see the page's theme attribute. The previous
 *    design themed itself with `@media (prefers-color-scheme: dark)`, which
 *    follows the OPERATING SYSTEM, so a light-OS reader who clicked the site's
 *    dark toggle got white plates punched into a dark page.
 *  - `useColorMode()` cannot fix it either: it is `useState(isBrowser ? … :
 *    defaultMode)`, so static generation emits the light `src` and swaps after
 *    hydration - a guaranteed flash plus a wasted fetch on every dark page load.
 *    Docusaurus sets `data-theme` in a pre-paint inline script, so the CSS
 *    switch has none of that.
 *  - Inlining the SVG would work too, but destroys the image URL, and these
 *    figures are meant to be findable in Google Images.
 *
 * Both `<img>` carry the IDENTICAL `alt`. `display:none` removes a node from the
 * accessibility tree, so exactly one is ever exposed; blanking the hidden one
 * would leave dark-mode screen-reader users with an unlabelled figure.
 *
 * Contract: specs/009-figure-rendering/contracts/figure-component.md.
 */
export type FigureKind =
  | 'table'
  | 'concept-map'
  | 'flowchart'
  | 'timeline'
  | 'diagram'
  | 'illustration';

/** Rasters have no theme variant; only hand-authored SVG schematics do. */
function darkVariant(src: string): string | null {
  return src.endsWith('.svg') && !src.endsWith('.dark.svg')
    ? src.replace(/\.svg$/, '.dark.svg')
    : null;
}

export default function Figure({
  id,
  src,
  alt,
  caption,
  kind,
  width,
  height,
}: {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  kind?: FigureKind;
  width?: number;
  height?: number;
}): React.ReactElement {
  const darkSrc = darkVariant(src);
  const dims = width && height ? { width, height } : {};

  return (
    <figure className={kind ? `figure figure--${kind}` : 'figure'} id={id}>
      <img
        className={darkSrc ? 'figure__img figure__img--light' : 'figure__img'}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        {...dims}
      />
      {darkSrc ? (
        <img
          className="figure__img figure__img--dark"
          src={darkSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          {...dims}
        />
      ) : null}
      <figcaption className="figure__caption">
        {caption ? <span className="figure__caption-text">{caption}</span> : null}
        {/* The domain is Latin script; without an explicit direction it
            bidi-reorders inside an RTL caption. */}
        <span className="figure__credit" dir="ltr">{WORDMARK_TEXT}</span>
      </figcaption>
    </figure>
  );
}
