# ADR-0018: Figure theming, a published palette, and generating the standard's prose

- **Status**: Accepted
- **Date**: 2026-09-11
- **Feature**: 013-authoring-system-v2
- **Supersedes**: part of ADR-0017 (archetype taxonomy stands; the greyscale rendering does not)

## Context

Hands-on review found the figures "monochrome and somewhat dull". The audit found three
independent causes and one outright defect behind that impression.

The defect: every SVG themed itself with `@media (prefers-color-scheme: dark)` inside its own
`<style>`, which follows the **operating system**. Docusaurus themes by toggling `[data-theme]`
on `<html>`, and `src/css/custom.css` had no `[data-theme]` rules at all. An SVG behind an
`<img>` cannot observe that attribute, so a light-OS reader who clicked the site's dark toggle
saw white plates punched into a dark page.

The causes: `svg-authoring.md` prescribed a hard-coded eight-grey boilerplate including
`/* tick glyph - dark, not green */`; the manifest prompts all said "high contrast, no
colour-only meaning"; and the site had no palette to borrow from (one `--ifm-color-primary`,
five Infima shades missing, no dark ramp).

And a governance problem that made any fix temporary: `check-figures.mjs` never read a byte of
an SVG, so any colour or branding rule would be advisory. The six-value `Kind` enum already
existed in seven prose files plus one code constant, "run the gates" in four inconsistent
variants, and two skill files still described the pre-Spec-012 vocabulary.

## Decision

**1. Two committed variants per schematic, switched by CSS on `[data-theme]`.**

Rejected `useColorMode()`: it is `useState(isBrowser ? … : defaultMode)`, so static generation
emits the light `src` and swaps after hydration - a guaranteed flash and a wasted fetch on every
dark page load. Docusaurus sets `data-theme` in a pre-paint inline script, so a CSS switch has
neither.

Rejected inlining via SVGR: it removes the image URL, and Google Images indexability is an
explicit owner goal. It would also add a dependency against the standing no-new-dependency rule
and break the manifest `Src` contract the gate checks.

Rejected a permanently-light plate dimmed by a CSS `filter`: `filter` destroys a brand palette
and makes every contrast ratio unpredictable, so no WCAG claim would survive.

Both `<img>` carry the identical `alt`, because `display:none` removes a node from the
accessibility tree - exactly one is ever exposed, and blanking the hidden one would leave
dark-mode screen-reader users with an unlabelled figure.

**2. Colour lives in one `:root{}` token block per file.**

This is what makes everything else possible: the dark variant becomes a deterministic one-block
swap (so it can be generated and its freshness proved), and the palette gate becomes an exact
string compare rather than a colour-distance heuristic that could never be trusted.

**3. The dark variant is generated and committed, not built at prebuild.**

The repo gitignores its generated JSON indexes, and this deliberately differs. A missing data
index degrades a feature; a missing `.dark.svg` is a broken-image icon on every figure in dark
mode. CI also runs `check:figures` before `npm run build`, so a prebuild artifact could not be
gated at all.

**4. The accents are staggered in luminance, not tuned to one contrast.**

Four accents that all clear AA at the same ratio are the same shade of grey once colour is
removed - and this project prints A4 handouts, so that is not hypothetical. A ~1.25 luminance
ladder keeps them separable in greyscale and for achromatopsia. Two WCAG bars apply, because the
tokens have two jobs: labels on a tinted panel are `--ink` and must clear 4.5:1 as text, while
the accent is the panel's stroke and clears 3:1 as a graphical object. Requiring 4.5:1 of the
stroke forces either near-white panels or near-black accents, which is how the original drab
palette came about.

**5. The prose is generated from the code, narrowly.**

`check-docs-sync.mjs` compares marked regions against a canonical rendering, capped at the four
constants that have actually drifted, and scoped to the living standard. `history/` and frozen
`specs/0NN-*` are out of scope, and `style-guide.md` is scanned from its first body section: a
changelog legitimately quotes superseded vocabulary when recording its own history. A gate that
fires on an immutable record gets disabled within a week, and then the drift returns.

## Consequences

- Four files per figure (light/dark x EN/UR), at 1.6-4.4 KB each. Revisit past ~40 figures; the
  fix then is to reorder CI, not to change the asset model.
- `style-guide.md` freezes at v3.4, which re-freezes `terminology.csv` (Spec 006 FR-007) and
  triggers Art. VI.1's proving-unit ritual. EFMP-302 Unit 1 is the proving unit, retrofitted
  here. EFMP-301 Unit 1, the golden unit, was already owed at v3.3, so the single outstanding
  authoring pass now discharges both debts at the final version.
- Constitution Art. III.8 gains an explicit clause; MINOR bump to v2.9.0.
- A latent Art. III.2 hole closed: the `.ur.svg` requirement keyed on `kind === 'diagram'`, so
  six of eight figures could lose their Urdu variant with CI green.
- A latent Art. III.9 breach found and fixed: six figures carried em dashes in their text nodes,
  invisible because `check-no-em-dash.mjs` never scanned `static/`.
