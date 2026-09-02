---
id: 0001
title: Implement figure rendering — component, gate, skill, EFMP-302 U1
stage: green
date: 2026-09-01
surface: agent
model: claude-sonnet-5
feature: 009-figure-rendering
branch: 009-figure-rendering
user: channayousif
command: continue implement
labels: ["figures", "mdx-component", "svg", "content-gate", "bilingual", "skill"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0012-figure-rendering-component-manifest-lifecycle-and-the-generate-figures-skill.md (Accepted)
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/19
files:
  - .gitignore
  - CLAUDE.md
  - README.md
  - package.json
  - package-lock.json
  - src/components/Figure.tsx
  - src/theme/MDXComponents.tsx
  - src/css/custom.css
  - scripts/check-figures.mjs
  - scripts/optimize-figure.mjs
  - tests/unit/figures-gate.test.mjs
  - tests/unit/optimize-figure.test.mjs
  - specs/008-rich-unit-pedagogy/contracts/figures-manifest.md
  - specs/backlog.md
  - specs/content/style-guide.md
  - specs/content/efmp-302/figures/unit-01.md
  - specs/009-figure-rendering/plan.md
  - specs/009-figure-rendering/tasks.md
  - .claude/skills/generate-figures/SKILL.md
  - .claude/skills/generate-figures/references/svg-authoring.md
  - .claude/skills/generate-figures/references/raster-hf-mcp.md
  - .claude/skills/generate-figures/references/placement.md
  - .claude/skills/generate-figures/references/bilingual-figures.md
  - .claude/skills/author-unit/references/figure-prompts.md
  - docs/semester-1/efmp-302/unit-01/topic-01.mdx
  - docs/semester-1/efmp-302/unit-01/topic-02.mdx
  - docs/semester-1/efmp-302/unit-01/topic-03.mdx
  - docs/semester-1/efmp-302/unit-01/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-04.mdx
  - static/img/figures/efmp-302/unit-01/fig-U1-1.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-2.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-3.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-4.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-1.ur.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-2.ur.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-3.ur.svg
  - static/img/figures/efmp-302/unit-01/fig-U1-4.ur.svg
tests:
  - npx vitest run (11 files, 113 tests) — pass
  - npm run validate:content — pass
  - npm run check:pipeline-gate — pass
  - npm run check:depth-gate — pass
  - npm run check:figures — pass
  - npm run check:no-answer-keys — pass
  - npm run check:add-course — pass
  - npm run build (en + ur) — pass
---

## Prompt

continue implement

(session resumed on branch `009-figure-rendering`; Phases 1–4 of `tasks.md` were partially in
place from a prior session — `Figure.tsx`, `MDXComponents.tsx`, `.figure` CSS, the
`check-figures.mjs` rewrite + `figures-gate.test.mjs` extension, `optimize-figure.mjs` +
`sharp` devDep. The instruction was to continue through the remaining tasks.)

## Response snapshot

Completed Spec 009 Phases 1–7 (T001–T033; T034–T036 partial):

- **Phase 1 (governance)** — `.gitignore` adds `specs/content/**/figures/.staging/`; the
  Spec 008 `figures-manifest.md` pointer, `style-guide.md` v3.1, and `backlog.md` note were
  already in place.
- **Phase 2–4** — verified: `<Figure>` component + global registration + `.figure` CSS;
  column-aware `<Figure>`-carrier-aware `check-figures.mjs`; offline `optimize-figure.mjs`
  (`sharp` devDep). One fix: `Figure.tsx`'s JSDoc contained a literal `*/` (from an embedded
  `{/* FIGURE[...] */}`) that broke the webpack parse — reworded.
- **Phase 5 (skill)** — new `.claude/skills/generate-figures/` (`SKILL.md` + `svg-authoring.md`,
  `raster-hf-mcp.md`, `placement.md`, `bilingual-figures.md`); `author-unit`'s
  `figure-prompts.md` now points at it; README gains a "Rendering figures" subsection.
- **Phase 6 (proving unit)** — EFMP-302 Unit 1's four figures authored as self-contained flat
  SVG (`fig-U1-1` comparison table, `fig-U1-2` two-panel industrial/inquiry scene, `fig-U1-3`
  accountability/autonomy/collegiality triangle, `fig-U1-4` six-influence identity web), each
  with a Nastaliq `.ur.svg` translated-label variant; all 8 ≤ 4.4 KB after `optimize:figure`.
  Comment markers in the 4 EN `topic-0N.mdx` + 4 UR stubs replaced by
  `<Figure id kind="diagram" src alt />`; manifest rewritten to v2, all rows `placed`.
- **Phase 7** — `CLAUDE.md` Active Technologies updated; drift reconciled into `plan.md`
  ("Implementation notes"): embedded-`<img>` SVGs follow the Docusaurus page theme (not raw OS
  `prefers-color-scheme`); marker arrowheads need a theme-aware fill *class* (added to
  `svg-authoring.md`); the bilingual comparison table keeps EN geometry, labels only.

Visual check (chromium via `playwright-core`, built site on `npm run serve`): all four EN
figures legible in light and dark; UR figures render with translated labels; the
`<figure><img loading="lazy" decoding="async">` markup and `/img/figures/...` asset paths are
correct in both `build/` and `build/ur/`.

## Outcome

- ✅ Impact: Spec 008 figure prompt-markers are now rendered images on the page in both locales;
  the `generate-figures` skill + `<Figure>` + manifest v2 + widened `check:figures` are the
  reusable rendering layer, proven on EFMP-302 Unit 1's four figures.
- 🧪 Tests: full suite 113/113; every content/engineering gate green; `npm run build` (en+ur) green.
- 📁 Files: 40 changed/added (1 component, 1 gate rewrite, 1 optimiser, 2 test files, 1 skill +
  4 refs, 8 SVG assets, 8 topic files, manifest v2, governance/docs).
- 🔁 Next prompts: `/sp.adr` for ADR-0012 (T034); commit + PR (T036); backfill `/sp.plan` +
  `/sp.tasks` PHRs for 009.
- 🧠 Reflection: SVG-first held up — 4/4 proving figures are `diagram`, zero raster needed;
  `sharp` stays untouched by the proving run. The one real gotcha was theming behind `<img>`
  (page `color-scheme` propagation, and attribute `fill` escaping the dark media block).

## Evaluation notes (flywheel)

- Failure modes observed: (1) `*/` inside a JSDoc block comment broke the MDX/webpack build;
  (2) `<marker>` `fill="#hex"` attribute is not caught by `@media (prefers-color-scheme: dark)`
  → invisible arrowheads on a dark page; (3) an RTL-mirrored comparison-table column order
  clipped Urdu labels — reverted to EN geometry + translated text.
- Graders run and results (PASS/FAIL): validate:content PASS, check:pipeline-gate PASS,
  check:depth-gate PASS, check:figures PASS, check:no-answer-keys PASS, check:add-course PASS,
  vitest PASS (113), build PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): a `check:figures` assertion comparing `<figId>.svg`
  and `<figId>.ur.svg` element counts, to catch bilingual structural drift (currently out of
  scope).
