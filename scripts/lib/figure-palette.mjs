/**
 * The published figure token set (Spec 013, D2/D4) - the single source of truth
 * for figure colour, shared by the generator, the gate, and the prose docs.
 *
 * WHY A TOKEN BLOCK AND NOT LOOSE HEX. Before Spec 013 every SVG hard-coded
 * eight greys twice over (a base block plus an `@media (prefers-color-scheme:
 * dark)` twin). That made three things impossible at once: the gate could not
 * tell a palette colour from a typo, the dark variant could not be derived, and
 * an author had to hand-copy 13 values. Declaring colour ONCE per file, in a
 * `:root{}` block that must match `rootBlock()` byte for byte, makes the gate an
 * exact string compare and the dark variant a one-block swap.
 *
 * WHY NOT `@media (prefers-color-scheme: dark)`. It follows the OPERATING
 * SYSTEM. Docusaurus themes by toggling `[data-theme]` on <html>, and an SVG
 * behind an <img> cannot observe that attribute - so a light-OS reader who
 * clicked the site's dark toggle got white plates punched into a dark page.
 * Themes are now carried by two committed variants swapped in CSS (D1), and the
 * media block is deleted, not kept: keeping it would fight the toggle.
 *
 * WHY THESE HUES. The four accents are the Okabe-Ito colour-vision-safe axes
 * (bluish-green, blue, vermillion, reddish-purple). `--a1` IS the site's brand
 * primary, so figures and chrome finally share a hue.
 *
 * They are also deliberately STAGGERED IN LUMINANCE, on a ladder with a ~1.25
 * step, rather than all tuned to the same contrast. Four accents that clear AA
 * at the same ratio are the same shade of grey once colour is removed - and
 * this project prints A4 handouts, so that is not hypothetical. The ladder
 * keeps them separable in greyscale and for achromatopsia, not just by hue.
 *
 * TWO DIFFERENT WCAG BARS APPLY, because the tokens have two different jobs.
 * Labels on a tinted panel are drawn in `--ink`, which is TEXT and must clear
 * 4.5:1 (WCAG 1.4.3). The accent itself is the panel's STROKE - a graphical
 * object, which must clear 3:1 (WCAG 1.4.11). Requiring 4.5:1 of the stroke
 * would force either near-white panels or near-black accents and would have
 * produced exactly the drab palette this spec exists to replace.
 *
 * Colour remains REDUNDANT everywhere (Constitution Art. III.8): dash pattern,
 * shape and label keep carrying the meaning. `.yes`/`.no` stay ink-coloured
 * with glyphs and words - colour never marks correctness.
 */

/** Light ramp. Ground #ffffff; every text token >= 4.5:1 on it. */
export const LIGHT_TOKENS = {
  bg: '#ffffff',
  panel: '#eef3f1',
  ink: '#132a24',
  muted: '#566b65',
  line: '#1f6f5c',
  a1: '#1f6f5c',
  'a1-fill': '#e6efed',
  a2: '#15476b',
  'a2-fill': '#e6ebf0',
  a3: '#b8551d',
  'a3-fill': '#f0e9e5',
  a4: '#7b3886',
  'a4-fill': '#ede7ee',
  wm: '#8b9a95',
};

/** Dark ramp. Ground #1b1b1d (Infima's dark surface). Same token names. */
export const DARK_TOKENS = {
  bg: '#1b1b1d',
  panel: '#24282a',
  ink: '#e7ece9',
  muted: '#9aa7a2',
  line: '#38c6a4',
  a1: '#38c6a4',
  'a1-fill': '#1f302c',
  a2: '#2f91d6',
  'a2-fill': '#1e2931',
  a3: '#f0bd9f',
  'a3-fill': '#33251c',
  a4: '#c387cd',
  'a4-fill': '#2c212e',
  wm: '#6b7671',
};

/**
 * The exact `:root{...}` declaration an SVG must carry. The gate compares
 * against this string, so key order is part of the contract - iterate the token
 * object, never re-sort.
 */
export function rootBlock(tokens) {
  const decls = Object.entries(tokens).map(([k, v]) => `--${k}:${v}`).join(';');
  return `:root{${decls}}`;
}

/** Visible attribution baked into every figure (Spec 013 FR-007). */
export const WORDMARK_TEXT = 'textbook.com.pk';

/**
 * Asset budgets. These lived privately in optimize-figure.mjs, where CI never
 * saw them - the check ran only when an author remembered to. They move here so
 * `check:figures` can enforce the same numbers on committed bytes.
 */
export const SVG_BUDGET = 20 * 1024;
export const RASTER_BUDGET = 150 * 1024;
export const MAX_EDGE = 1600;

/**
 * Figures allowed to carry an off-palette colour (a flag, a chemical
 * indicator). Keyed by figure id, so adding one is a code change with a
 * reviewer, not a comment an author can slip in - and note that
 * optimize-figure.mjs strips XML comments, so an in-file marker would silently
 * vanish anyway.
 */
export const PALETTE_EXEMPT = new Set([]);

/** Every hex literal the published palette permits, both ramps. */
export function paletteHexes() {
  return new Set([...Object.values(LIGHT_TOKENS), ...Object.values(DARK_TOKENS)].map((h) => h.toLowerCase()));
}

/** WCAG relative luminance of a #rrggbb string. */
export function relativeLuminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two #rrggbb strings. */
export function contrastRatio(a, b) {
  const [l1, l2] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
