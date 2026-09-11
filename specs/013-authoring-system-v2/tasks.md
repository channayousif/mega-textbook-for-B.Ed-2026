# Tasks: Authoring system v2

**Spec**: `specs/013-authoring-system-v2/spec.md` | **Plan**: `./plan.md`
Status: `[ ]` todo · `[x]` done

## Phase A - Foundation (no visible change)

- [ ] T001 `src/css/custom.css`: full seven-shade Infima primary ramp (light) derived from `#1f6f5c`.
- [ ] T002 `src/css/custom.css`: `[data-theme='dark']` primary ramp.
- [ ] T003 `src/css/custom.css`: dark-mode values for `.translation-badge--draft`, `--untranslated`, `.bloom-tag` (hardcoded light today).
- [ ] T004 `scripts/lib/figure-palette.mjs`: `LIGHT_TOKENS`, `DARK_TOKENS`, `rootBlock()`, `WORDMARK_TEXT`, `SVG_BUDGET`, `RASTER_BUDGET`, `MAX_EDGE`, `PALETTE_EXEMPT`.
- [ ] T005 `scripts/lib/gates.mjs`: `CONTENT_GATES` + `FULL_GATES` (must include `check:pipeline-gate`).
- [ ] T006 `scripts/optimize-figure.mjs`: import budgets from the shared lib.
- [ ] T007 Unit tests for `figure-palette.mjs` (token completeness, AA contrast assertions).

## Phase B+C - Rendering and assets (ONE commit; see plan risk 1)

- [ ] T008 `src/components/Figure.tsx`: dual `<img>`, derived `darkSrc`, identical `alt` on both.
- [ ] T009 `src/components/Figure.tsx`: attribution `<figcaption>` with `dir="ltr"` credit span.
- [ ] T010 `src/components/Figure.tsx`: `width`/`height` to kill CLS.
- [ ] T011 `src/css/custom.css`: `[data-theme]` figure visibility rules + `.figure__credit`.
- [ ] T012 `src/css/custom.css`: `@media print` forces the light variant.
- [ ] T013 `scripts/build-figure-variants.mjs` + `--check`.
- [ ] T014 `scripts/migrate-figure-palette.mjs` (throwaway).
- [ ] T015 Migrate 16 SVGs to tokens; delete every `@media (prefers-color-scheme: dark)` block.
- [ ] T016 Add the wordmark to all 16 (bottom-right EN / bottom-left UR, `aria-hidden`, not in `<desc>`).
- [ ] T017 Generate and commit the 16 `.dark.svg` files.
- [ ] T018 Verify the mechanical pass changed no rendered colour.
- [ ] T019 **Separate commit**: editorial accent pass on `fig-U1-4/5/6/8`. Exclude `fig-U1-1` (tick/cross table).
- [ ] T020 `vercel.json`: `X-Robots-Tag: noindex` for `**/*.dark.svg`.

## Phase D - Enforcement

- [ ] T021 `check-figures.mjs`: `lintSvg()` - viewBox sanity, `role`/`<title>`/`<desc>`.
- [ ] T022 `check-figures.mjs`: palette conformance (no literal outside `:root`; `:root` byte-identical).
- [ ] T023 `check-figures.mjs`: exactly one wordmark; wordmark absent from `<desc>`.
- [ ] T024 `check-figures.mjs`: size budget, no `<script>`/`<foreignObject>`/external refs.
- [ ] T025 `check-figures.mjs`: no em dash in SVG text nodes (closes the `static/` hole).
- [ ] T026 `check-figures.mjs`: dark-variant freshness; `.ur.svg` shape parity (exclude text nodes).
- [ ] T027 `check-figures.mjs`: **fix Bug B** - key the Urdu requirement on `src.endsWith('.svg')`.
- [ ] T028 `check-figures.mjs`: alt-vs-manifest check, report-only first.
- [ ] T029 Gate fixtures in `tests/unit/figures-gate.test.mjs` for T021-T027, incl. the Bug B regression.
- [ ] T030 `scripts/check-docs-sync.mjs` + `--fix`; generated blocks for the four drifted constants.
- [ ] T031 `scripts/run-gates.mjs`; `check:content` / `check:all` / `check:docs-sync` / `figures:variants` npm scripts.
- [ ] T032 `check-docs-sync.mjs` asserts `ci.yml`'s step list matches `FULL_GATES`.
- [ ] T033 Insert generated blocks into the 8 prose files; run `--fix`.
- [ ] T034 Fix exposed drift: v3.3 changelog gap, `placement.md` + `bilingual-figures.md` stale enum, `placement.md` phantom alt gate, both twins' phantom rubric claim, 3 broken contract paths in `author-unit/SKILL.md`, `ci.yml:36` stale comment.
- [ ] T035 Rewrite `svg-authoring.md` boilerplate for tokens; delete `/* tick glyph - dark, not green */`; add the "delete all colour - does it still read?" self-check.
- [ ] T036 Add the new gates to `.github/workflows/ci.yml`.

## Phase E - SEO

- [ ] T037 Brand assets: `favicon.ico` (fixes a sitewide 404), wordmark SVG, navbar logo, 1200x630 OG card.
- [ ] T038 `docusaurus.config.ts`: `themeConfig.image` + `metadata`; add the navbar `logo`.
- [ ] T039 `docusaurus.config.ts`: sitemap `ignorePatterns` for `/app/**` and `/search`; per-kind `changefreq`/`priority`.
- [ ] T040 `static/robots.txt` + sitemap index covering both locales.
- [ ] T041 Front-matter schema: add `description` (+ optional `keywords`, `image`).
- [ ] T042 `validate-content.mjs`: require `description`; fixture tests.
- [ ] T043 Author EN descriptions for all content pages.
- [ ] T044 Author UR descriptions for all translated pages.
- [ ] T045 `src/theme/DocItem/Metadata.tsx`: JSON-LD `Organization`, `WebSite`, `Course`, `LearningResource`.
- [ ] T046 `.lighthouserc.json`: assert CLS.

## Phase F - Governance

- [ ] T047 Constitution 2.8.0 -> 2.9.0: Art. III.8 clause, Art. VII gate row, SYNC IMPACT REPORT.
- [ ] T048 `style-guide.md` 3.3 -> 3.4 with the missing v3.3 AND the new v3.4 changelog entries.
- [ ] T049 Mirror the style-guide changes into `structure-standard.md` (the twin).
- [ ] T050 ADR-0018: dual-`<img>` over `useColorMode`/SVGR; commit-vs-prebuild variants.
- [ ] T051 `CLAUDE.md` + `specs/backlog.md` reconciliation.
- [ ] T052 Impl PHR.

## Phase G - Title rewrite (last; P3)

- [ ] T053 Title/H1 rewrite for search intent, course by course.
- [ ] T054 After each course: `validate:content` green, no URL change.
