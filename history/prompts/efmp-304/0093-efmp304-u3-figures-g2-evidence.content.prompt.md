---
id: 0093
title: "EFMP-304 U3: generate 8 SVGs, G2 evidence for Units 2 and 3"
stage: G2
date: 2026-10-05
surface: agent
model: claude-opus-5-5
feature: content-efmp-304
branch: agent/TEX-23
user: M Yousif Channa
command: issue_continuation_needed (TEX-23 resume)
labels: ["bilingualauthor", "content", "efmp-304", "figures", "g2-evidence"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: TEX-23
  adr: null
  pr: 109
files:
  - static/img/figures/efmp-304/unit-03/fig-U3-1.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-1.dark.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-2.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-2.dark.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-3.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-3.dark.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-4.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-4.dark.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-5.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-5.dark.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-6.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-6.dark.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-7.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-7.dark.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-8.svg
  - static/img/figures/efmp-304/unit-03/fig-U3-8.dark.svg
  - specs/content/efmp-304/figures/unit-03.md
  - specs/content/efmp-304/reviews/unit-02/G2/20261005T182422688Z-gates.json
  - specs/content/efmp-304/reviews/unit-03/G2/20261005T182437637Z-gates.json
  - specs/content/efmp-304/tasks.md
tests:
  - npm run check:content (all 13 gates pass for both units)
  - npm run figures:variants (8 dark variants generated)
---

## Prompt

issue_continuation_needed (TEX-23 resume after previous run completed Unit 2 G2 and Unit 3 authoring)

## Response snapshot

Generated 8 SVG schematics for Unit 3 and regenerated G2 evidence for both units.

**SVG generation:** Created a Node script to generate all 8 Unit 3 figures following the Spec 009 SVG contract (viewBox, role="img", title, desc, no width/height, light/dark tokens, wordmark). Used `npm run figures:variants` to generate dark variants. Updated manifest status from prompt-only to placed.

**G2 evidence:** Regenerated Unit 2 G2 manifest (was stale after figure updates) and generated Unit 3 G2 manifest using `prepare-gate-evidence.mjs`. Updated tasks.md tracker rows.

**Result:** All 13 content gates pass for both units.

## Outcome

- ✅ Impact: Both units now G2-clear with all 13 content gates passing
- 🧪 Tests: check:content all green for both units
- 📁 Files: 19 files across 2 commits
- 🔁 Next prompts: Unit 2 Urdu translation (G4), Unit 3 Urdu translation (G4), banner raster handoff
- 🧠 Reflection: The figures gate requires at least one placed schematic (concept-map/flowchart/timeline). Dark variants must be generated via `figures:variants` command and must match light variants with dark tokens swapped.

## Handoff (for CEO and agents)

**What shipped:** EFMP-304 Units 2 and 3 EN both G2-clear. All 13 content gates pass. Draft PR #109 updated.

**Decisions the team must respect:**
- Unit 3 SVGs are functional schematics (text labels, simple shapes) - not polished illustrations
- Banner illustrations (fig-U2-9, fig-U3-9) remain prompt-only for Codex raster handoff
- G2 evidence manifests are regenerated and committed

**What is pending and who owns it:**
- Unit 2 Urdu translation (G4): BilingualAuthor via translate-unit skill
- Unit 3 Urdu translation (G4): BilingualAuthor via translate-unit skill
- Banner raster production: Codex/WebLeadAgy (prompt-only rows ready)
- G3 en-review: CurriculumOwner

**Paperclip issues affected:** TEX-23. Both units EN complete at G2. Urdu mirrors remain.
