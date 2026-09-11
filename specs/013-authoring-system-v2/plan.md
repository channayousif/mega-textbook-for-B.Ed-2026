# Implementation Plan: Authoring system v2

**Branch**: `013-authoring-system-v2` | **Spec**: `specs/013-authoring-system-v2/spec.md`
**Date**: 2026-09-11

## Summary

Fix figure theming, give figures a branded colour system, make that system machine-enforced,
and give the site a real SEO surface. Four concerns, one spec, because they all land in the
same three places: the style guide, the two authoring skills, and the gate scripts.

## Technical Context

TypeScript 5.6 / Node 22+, Docusaurus 3.10, React 18.3 - all existing. **No new dependency**
(Art. V.5). All new scripts are plain `.mjs`, offline, and follow the existing
`scripts/lib/*.mjs` shared-module pattern.

## Constitution Check

| Article | Bearing | Resolution |
|---|---|---|
| III.2 Urdu parity | D5 closes a live hole where 6 of 8 figures could lose their Urdu variant silently | Gate keys on asset extension |
| III.8 Accessibility | Colour is being *added* to figures | Colour stays strictly redundant; one image exposed to AT; wordmark `aria-hidden` and absent from `<desc>` |
| III.10 Visual density | Unchanged | No change to the >= 2/topic or schematic floor |
| V.5 Bundle budget | Dual assets add a second `<img>` | Files are 1.6-4.4 KB; no new dependency |
| VI.1 Standard versioning | `style-guide.md` 3.3 -> 3.4 re-freezes the standard | EFMP-302 U1 is the proving unit (retrofitted here); EFMP-301 U1 is the golden unit, already owed at 3.3, now discharged once at 3.4 |
| XI Amendment | Art. III.8 gains an explicit clause | MINOR bump 2.8.0 -> 2.9.0 with a SYNC IMPACT REPORT |

## Design decisions

### D1 - Theming: two `<img>` switched by CSS, not `useColorMode()`

Docusaurus sets `data-theme` in a pre-paint inline head script, so a CSS `[data-theme]` switch
has **zero flash**. `useColorMode()` is `useState(isBrowser ? ... : defaultMode)`, so SSG
renders `light` and swaps after hydration: a guaranteed flash plus a wasted fetch on every dark
page load. Rejected.

Inlining via SVGR is rejected outright: it removes the image URL, and Google Images
indexability is an explicit owner goal. A permanently-light plate dimmed by a CSS `filter` is
rejected because `filter` destroys the palette and voids every contrast guarantee.

`Figure.tsx` derives the dark path by string rule, so **no MDX call site changes**. Both
`<img>` carry the identical `alt`: `display:none` removes a node from the accessibility tree,
so exactly one is ever exposed, and blanking the dark one would leave dark-mode screen-reader
users with an unlabelled figure. `*.dark.svg` is marked `noindex` so the light file stays
canonical in Google Images.

### D2 - One `:root{}` token block per SVG

Colour literals appear in exactly one place per file; everything else uses `var()`. This is
what makes the rest possible:
- the palette gate becomes an exact string compare, not a colour-distance heuristic;
- the dark variant becomes a deterministic one-block swap, so it can be generated and checked;
- authoring gets *cheaper* - the agent pastes one canonical line and then writes `class="a2"`,
  instead of hand-copying 13 hex values into two blocks.

The `@media (prefers-color-scheme: dark)` block is deleted. It is the bug.

### D3 - Generate the dark variant, and commit it

Committed, not prebuild-generated, against the repo's own precedent for generated JSON. A
missing data index degrades a feature; a missing `.dark.svg` is a broken-image icon on every
figure in dark mode. CI also runs `check:figures` *before* `npm run build`, so a prebuild
artifact could not be gated. Freshness is enforced by a deterministic `--check` mode.

Revisit if the figure count passes ~40; the fix then is to reorder CI, not to change the asset
model.

### D4 - Palette: Okabe-Ito axes, contrast-verified

Four accents on CVD-safe axes (bluish-green / blue / vermillion / reddish-purple), darkened for
the light ramp and lightened for the dark ramp so **every accent clears AA (4.5:1) on both its
ground and its tinted panel, in both themes**. Green and vermillion converge under
deuteranopia, so they must never be the only pair in a figure - which holds anyway, because
colour is redundant.

The brand primary `#1f6f5c` becomes `--a1`, so figures and chrome finally share a hue.

### D5 - The Urdu-variant gate keys on the asset, not the archetype

`kind === 'diagram'` was never the real invariant. An SVG carries text and must be localised; a
raster is reused with a translated alt. So: `src.endsWith('.svg')`.

### D6 - Docs-sync: generate prose from code, narrowly

One machine-readable source per shared constant, `<!-- BEGIN GENERATED -->` blocks in prose,
and a gate that string-compares them, shipping `--fix`.

Deliberately capped at the **four constants that have actually drifted**. Scanning only
`.claude/skills/**`, `style-guide.md`, `CLAUDE.md`, `constitution.md`, and exempting `history/`
and frozen `specs/0NN-*/`. A gate that fires on historical files gets disabled within a week,
and then the drift returns.

### D7 - SEO: metadata and structured data, with a separate editorial title pass

Config, assets, robots, sitemap and JSON-LD are mechanical and land first. Per-page
descriptions and the title rewrite are editorial, land last, and are verified course by course
with `validate:content`. The parity gate compares heading *levels* only
(`validate-content.mjs:61-69`), and URLs come from file paths, so retitling is parity-safe and
URL-stable.

## Structure

```
scripts/lib/figure-palette.mjs     (new)  tokens, rootBlock(), wordmark, budgets
scripts/lib/gates.mjs              (new)  CONTENT_GATES / FULL_GATES
scripts/build-figure-variants.mjs  (new)  emit + --check the .dark.svg set
scripts/check-docs-sync.mjs        (new)  generated-block + stale-literal gate, --fix
scripts/run-gates.mjs              (new)  check:content / check:all
scripts/migrate-figure-palette.mjs (new, throwaway) one-shot greyscale -> tokens
scripts/check-figures.mjs          (edit) SVG lint; Urdu gate keys on extension
src/components/Figure.tsx          (edit) dual <img>, attribution caption, dimensions
src/css/custom.css                 (edit) full ramps, [data-theme], figure rules, print
docusaurus.config.ts               (edit) image, metadata, sitemap ignorePatterns
static/img/…                       (new)  favicon, wordmark, logo, OG card
static/robots.txt                  (new)
src/theme/DocItem/Metadata.tsx     (new)  JSON-LD
```

## Risks

1. **Phase D scope creep** - cap the generated blocks at four constants.
2. **Migration hex mapping** - `stroke:#1c1e21` and `fill:#1c1e21` map to *different* tokens;
   assert the rendered colour set is unchanged for the mechanical pass.
3. **Alt-vs-manifest check** may fail on existing content over whitespace; report-only first.
