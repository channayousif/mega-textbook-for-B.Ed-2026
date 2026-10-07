/**
 * Brand constants shared by the site chrome and the figure pipeline
 * (Spec 013). The figure-side twin is `scripts/lib/figure-palette.mjs`, which
 * the gate and the SVG generator use; this file is the browser-bundle copy, kept
 * deliberately tiny so a content page does not pull a Node script into its
 * bundle. `check:docs-sync` asserts the two agree.
 */
export const WORDMARK_TEXT = 'textbook.com.pk';
export const SITE_NAME = 'Mega Textbook';
export const PUBLISHER = 'Mega Textbook';
export const SITE_URL = 'https://textbook.com.pk';
