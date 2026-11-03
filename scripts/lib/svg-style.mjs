/**
 * Drawing-level style rules for course figure SVGs (owner report, 2026-11-03).
 *
 * WHY THIS EXISTS. check-figures.mjs gates the token block, accessibility and
 * size, but nothing governed the drawing itself. A survey of origin/main found 33
 * figures using CSS classes their own <style> never defines (they render as
 * default black, invisible on the dark plate), 342 distinct class names against a
 * 19-class boilerplate, 21 font sizes (some 7px) and 17 stroke widths. All of it
 * passed every gate. These rules are a cheap regex pass, no browser, so they run
 * in the content tier.
 *
 * The scales come from the boilerplate in
 * .claude/skills/generate-figures/references/svg-authoring.md.
 */

/** Font sizes (px). 11 is the wordmark only; 12 the floor for any label. */
export const FONT_SIZES = [11, 12, 13, 14, 15, 16, 18, 20];
/** Stroke widths. 1-1.5 rules and grids, 2 panels, 2.5 primary lines, 3 emphasis. */
export const STROKE_WIDTHS = [1, 1.5, 2, 2.5, 3];
/** Root font stacks. Urdu files lead with Nastaliq faces. */
export const FONT_STACK_EN = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
export const FONT_STACK_UR = "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', system-ui, sans-serif";
/** The canvas width that renders 1:1 under the site's 760px figure cap. */
export const CANVAS_WIDTHS = [760, 780];

const uniq = (xs) => [...new Set(xs)];
const num = (s) => Number.parseFloat(s);

function styleText(svg) {
  return [...svg.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
}

/** Class names a selector in the file's <style> defines. */
export function definedClasses(svg) {
  const css = styleText(svg).replace(/\/\*[\s\S]*?\*\//g, '');
  // Selector text only: drop declaration bodies, then collect `.name` tokens.
  const selectors = css.replace(/\{[^}]*\}/g, ' ');
  return new Set([...selectors.matchAll(/\.(-?[A-Za-z_][\w-]*)/g)].map((m) => m[1]));
}

/** Class names used on elements (class="a b"). */
export function usedClasses(svg) {
  return uniq([...svg.matchAll(/\sclass="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/).filter(Boolean)));
}

export function fontSizes(svg) {
  const css = styleText(svg);
  return uniq([
    ...[...css.matchAll(/font-size\s*:\s*([\d.]+)(?:px)?/g)].map((m) => num(m[1])),
    ...[...svg.matchAll(/\sfont-size="([\d.]+)(?:px)?"/g)].map((m) => num(m[1])),
  ]).sort((a, b) => a - b);
}

export function strokeWidths(svg) {
  const css = styleText(svg);
  return uniq([
    ...[...css.matchAll(/stroke-width\s*:\s*([\d.]+)/g)].map((m) => num(m[1])),
    ...[...svg.matchAll(/\sstroke-width="([\d.]+)"/g)].map((m) => num(m[1])),
  ]).sort((a, b) => a - b);
}

export function rootFontFamily(svg) {
  const m = svg.match(/<svg\b[^>]*\sfont-family="([^"]*)"/);
  return m ? m[1].replace(/&(#39|apos);/g, "'").replace(/&quot;/g, '"') : null;
}

export function viewBoxWidth(svg) {
  const m = svg.match(/<svg\b[^>]*\sviewBox="\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)/);
  return m ? num(m[1]) : null;
}

/**
 * Every rule violation in one SVG, as stable string codes (the baseline stores
 * these). `isUrdu` selects the expected font stack.
 */
export function svgStyleViolations(svg, { isUrdu = false } = {}) {
  const out = [];
  const defined = definedClasses(svg);
  for (const c of usedClasses(svg)) if (!defined.has(c)) out.push(`undefined-class:${c}`);
  if (/\sclass=""/.test(svg)) out.push('empty-class');
  for (const s of fontSizes(svg)) if (!FONT_SIZES.includes(s)) out.push(`font-size:${s}`);
  for (const w of strokeWidths(svg)) if (!STROKE_WIDTHS.includes(w)) out.push(`stroke-width:${w}`);
  const ff = rootFontFamily(svg);
  const want = isUrdu ? FONT_STACK_UR : FONT_STACK_EN;
  if (ff !== want) out.push('font-stack');
  const w = viewBoxWidth(svg);
  if (w !== null && !CANVAS_WIDTHS.includes(w)) out.push(`canvas-width:${w}`);
  for (const id of offBoxMarkers(svg)) out.push(`marker-off-box:${id}`);
  return out;
}

/**
 * Markers whose shape lies outside the marker's own viewBox, so the arrowhead
 * never renders. An older RTL mirror rewrote marker coordinates as if they were
 * canvas coordinates (13 Urdu figures, found 2026-11-03).
 */
export function offBoxMarkers(svg) {
  const out = [];
  for (const m of svg.matchAll(/<marker\b([^>]*)>([\s\S]*?)<\/marker>/g)) {
    const vb = (m[1].match(/viewBox="([^"]+)"/) || [])[1];
    if (!vb) continue;
    const [x0, y0, w, h] = vb.split(/[\s,]+/).map(Number);
    const nums = [...m[2].matchAll(/\s(?:d|points)="([^"]+)"/g)].flatMap((x) => x[1].match(/-?[\d.]+/g) || []).map(Number);
    if (nums.some((n) => n < Math.min(x0, y0) - 1 || n > Math.max(x0 + w, y0 + h) + 1)) {
      out.push((m[1].match(/\sid="([^"]+)"/) || [])[1] ?? '?');
    }
  }
  return out;
}

/** Codes that are never grandfathered: they are visible rendering bugs. */
export const NEVER_BASELINED = (code) => code.startsWith('undefined-class:') || code.startsWith('marker-off-box:');
