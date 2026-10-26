---
id: 0884
title: figure-print-clipping-and-overlap-check
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/figure-print-overlap
user: M Yousif Channa
command: "for image https://textbook.com.pk/img/figures/efmp-304/unit-04/fig-U4-1.svg is not properly displaying on Print/Save as PDF. further improve the SVG image building skill to avoid overlaping elements in some of generated images. this is a general issue."
labels: ["board-direct", "figures", "print", "ci", "skills", "efmp-304"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/css/custom.css
  - scripts/measure-figure-text.mjs
  - .github/workflows/ci.yml
  - .claude/skills/generate-figures/SKILL.md
  - .claude/skills/generate-figures/references/svg-authoring.md
  - .claude/skills/generate-figures/references/svg-codex-handoff.md
  - .claude/skills/generate-figures/references/bilingual-figures.md
  - .claude/skills/translate-unit/SKILL.md
  - AGENTS.md
  - static/img/figures/efmp-304/unit-04/fig-U4-1.svg
  - static/img/figures/efmp-304/unit-04/fig-U4-1.dark.svg
  - docs/semester-2/efmp-304/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-01.mdx
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/reviews/unit-04/G2/20261026T222320327Z-gates.json
  - tests/e2e/handout-print.spec.ts
tests:
  - node scripts/measure-figure-text.mjs on old/new fig-U4-1 (old fails 4, new passes; UR passes)
  - node scripts/measure-figure-text.mjs --report over 1006 SVGs (562 problems in 63 of 90 unit folders; samples rendered and confirmed real)
  - npm run check:content (13/13), npm run figures:variants:check
  - npm run build; tests/e2e/handout-print.spec.ts (new print-fit test)
---

## Prompt

for image https://textbook.com.pk/img/figures/efmp-304/unit-04/fig-U4-1.svg is not properly displaying on Print/Save as PDF. further improve the SVG image building skill to avoid overlaping elements in some of generated images. this is a general issue.

## Response snapshot

Cause 1 (print): the phone rule `@media (max-width: 768px)` that lets wide figures scroll (`max-width: none`) also matched the A4 page box (~680px), so 780px figures were clipped on paper. Scoped it to `screen` and made print scale every figure to the column. Cause 2 (overlap): `measure-figure-text.mjs` only checked viewBox and wordmark; it now also fails text over text (or closer than 4px on a line, using a 0.9em band so tall Nastaliq boxes do not false-positive), and text spilling out of the rect it starts in; added `--changed <base>` and `--report`, and fixed an argv bug that skipped the first file. New CI job `figure-geometry` measures only SVGs a PR adds or changes (owner ruling: existing figures reported, not failed). Skills gained a "Fit and spacing" section (width budget, column padding, wrap-don't-shrink, sized classes) and a mandatory measure step for EN and UR. fig-U4-1 EN re-wrapped (UR was already clean); carrier width 820 -> 780. Corpus report: 562 problems in 63 of 90 unit folders.

## Outcome

- PR opened (see session); EFMP-304 U4 G2 refreshed, G3 pass marked stale (needs a fresh G3 run before sign-off).

## Handoff (for CEO and agents)

- Shipped: print-safe figures; overlap/spill detection; CI gate on changed SVGs; skill rules.
- Decisions to respect: owner ruling 2026-10-27, gate only changed SVGs; never shrink text below 12px to fit, wrap or grow instead; measure EN and `.ur.svg` before deriving dark variants.
- Pending: corpus repair, 63 unit folders flagged; per-unit crew repair jobs to be queued after the owner sees the count. EFMP-304 U4 needs a fresh G3.
- Paperclip issues affected: none.
