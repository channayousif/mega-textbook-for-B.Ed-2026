---
id: 544
title: "Fix GQUR-300 Unit 3 figure text-geometry defects in fig-U3-2"
stage: green
date: 2026-10-27
surface: .crew/brief.md (gqur-300-u03-fix)
model: claude-sonnet-4-20250514
feature: feature/015-bilingual-content
branch: crew/gqur-300-u03-fix
user: ceo
command: "Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."
labels: [crew, opencode]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gqur-300/unit-03/fig-U3-2.svg
  - static/img/figures/gqur-300/unit-03/fig-U3-2.ur.svg
  - static/img/figures/gqur-300/unit-03/fig-U3-2.dark.svg
  - static/img/figures/gqur-300/unit-03/fig-U3-2.ur.dark.svg
  - docs/semester-1/gqur-300/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/topic-01.mdx
  - specs/content/gqur-300/tasks.md
  - specs/content/gqur-300/reviews/unit-03/G2/20261027T162101088Z-gates.json
  - static/content-status.json
tests:
  - scripts/measure-figure-text.mjs (all unit-03 SVGs pass, exit 0)
  - npm run check:content (all 13 gates pass)
  - npm run figures:variants (dark variants derived)
---

## Prompt

Crew job gqur-300-u03-fix: fix the figure text-geometry problems that `scripts/measure-figure-text.mjs` reports for GQUR-300 Unit 3. The algebra vocabulary table `fig-U3-2.svg` had 4 defects (3 label overlaps between columns + 1 text spill past the viewBox boundary). Wrap or reposition labels to fit, grow the viewBox height if needed (don't shrink text below 12px), and update the `<Figure>` carrier height attributes in both English and Urdu topic files.

## Response snapshot

Opened `fig-U3-2.svg` and found all text on one line (no newlines between elements). Identified the 4 defects:

1. "a letter for a quantity that can change" overlapped "t, the number of triangles" by 8.7px
2. "a part of an expression, split by + or -" overlapped "2t and 1, the terms of 2t + 1" by 5.8px
3. "a claim that two expressions are equal" overlapped "2t + 1 = 41 asks: how many" by 11.0px
4. "the 2 in 2t + 1; 30 in 500 + 30k" spilled 16.2px past the stroke rect

Wrapped the long labels into shorter lines:
- Row 1: "a letter for a quantity" / "that can change"
- Row 2: "the number multiplying" / "the variable"; "the 2 in 2t + 1;" / "30 in 500 + 30k"
- Row 3: "a part of an expression," / "split by + or -"; "2t and 1, the terms" / "of 2t + 1"
- Row 5: "a claim that two" / "expressions are equal" / "for some value of the variable"

Grew the viewBox from 470 to 482px and the stroke rect height from 360 to 392. The Urdu `.ur.svg` only needed the viewBox height bumped to 482 (its labels already fit). Updated both `<Figure>` carriers with `width={780} height={482}`. Derived dark variants via `npm run figures:variants`. Ran `prepare-gate-evidence.mjs GQUR-300 3`, pointed the G2 row at the new gates file, and appended a stale note to the G3 row. Regenerated `content-status.json`.

## Outcome

- ✅ Impact: All 4 text-geometry defects in fig-U3-2 resolved; `measure-figure-text` exits 0; all 13 content gates pass.
- 🧪 Tests: `npm run check:content` PASS (13/13); `measure-figure-text.mjs` PASS (12/12 SVGs).
- 📁 Files: 6 files changed in the fix commit (2 SVGs, 2 dark variants, 2 topic carriers); 2 files in the evidence commit (tasks.md, gates.json); 1 file regenerated (content-status.json).
- 🔁 Next prompts: GQUR-300 Unit 3 still needs a fresh independent G3 review (row marked stale) and a G5 Urdu review.
- 🧠 Reflection: The single-line SVG format made string replacement fragile — the first attempt left a duplicate `<text>` element. Always verify with `grep` after editing single-line SVGs.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U3-2 figure geometry repaired; viewBox 470 → 482; both Figure carriers updated; G2 evidence refreshed; G3 marked stale.
- Decisions the team must respect: ViewBox height for fig-U3-2 is now 482 — any future edits to this figure must preserve that height or re-measure.
- Pending / next owner: GQUR-300 Unit 3 needs a fresh independent G3 English review (the existing G3 evidence is stale since this geometry repair). G5 Urdu review also pending. All 8 key_terms in the Unit 3 index remain unbanked in terminology.csv.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: Single-line SVG format caused a partial replacement that left a duplicate `<text>` element; caught by `grep` before committing.
- Graders run and results (PASS/FAIL): `check:content` PASS; `measure-figure-text` PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): For single-line SVGs, pretty-print before editing or use DOM-aware manipulation to avoid partial-replacement bugs.
