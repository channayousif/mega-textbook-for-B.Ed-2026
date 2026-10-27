---
id: 2429
title: Fix EFMP-304 Unit 1 figure text-geometry (37 findings)
stage: fix
date: 2026-10-26
surface: static/img/figures/efmp-304/unit-01/*.svg + Figure carriers in docs/i18n
model: LongCat-2.0 (longcat/LongCat-2.0)
feature: efmp-304-u01-fix
branch: crew/efmp-304-u01-fix
user: opencode
command: "Read .crew/brief.md in the current directory and carry it out completely."
labels: [opencode, figure-geometry, efmp-304, unit-01]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-304/unit-01/fig-U1-1.ur.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-2.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-3.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-3.ur.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-5.ur.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-6.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-7.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-9.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-2.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-3.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-5.ur.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-6.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-7.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-9.dark.svg
  - docs/semester-2/efmp-304/unit-01/topic-02.mdx
  - docs/semester-2/efmp-304/unit-01/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-04.mdx
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/reviews/unit-01/G2/20261026T234000836Z-gates.json
tests:
  - scripts/measure-figure-text.mjs (exit 0)
  - npm run check:content (12/13 pass; content-status pre-exists on main)
  - npm run figures:variants (8 dark variants written)
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

## Response snapshot

Fixed 37 text-figure-geometry findings across 8 SVGs in EFMP-304 Unit 1: restructured fig-U1-2 as a true 3-column layout (IS / is-NOT / row labels) to clear 7 label overlaps; grew the viewBox from 470 to 520 and extended border/divider rects in fig-U1-3 (English) to stop the bottom-row spill; widened flowchart decision and terminal boxes in fig-U1-7 (English) to fit three-line labels (e.g. "for how it came to be)"); centered barrier names and wrapped the two longest ("self-confirming search", "unexamined assumption") in fig-U1-6; centered critical-thinker labels and wrapped "willing to say I do not know" in fig-U1-9; moved the Urdu wordmark to bottom-left (x=12) in fig-U1-1.ur, fig-U1-3.ur, fig-U1-5.ur with an inline style="text-anchor:start" to defeat the CSS text-anchor:middle override. Updated Figure carrier height from 470 to 520 for fig-U1-3 and fig-U1-7 in both English and Urdu topic files. Regenerated all dark variants. Ran prepare-gate-evidence for G2, pointed tasks.md G2 row at the new gates file, and appended "Stale since the figure-geometry repair; needs a fresh G3 run" to the G3 advisory row. Committed in two conventional commits.

## Outcome

- ✅ Impact: All 37 measure-figure-text failures resolved (exit 0); check:content passes for all gates that main passes; no em dashes introduced; no prose edited.
- 🧪 Tests: measure-figure-text exits 0; check:content 12/13 (content-status pre-existing on main).
- 📁 Files: 22 changed across two commits.
- 🔁 Next prompts: Fresh independent G3 review and dependent G5 review remain pending for EFMP-304 Unit 1.
- 🧠 Reflection: The Urdu wordmark RTL issue was subtle - CSS text-anchor:middle on the base `text {}` rule overrides the inline text-anchor attribute, requiring an inline `style` attribute for specificity. This pattern exists in other Urdu SVGs and may need a systematic fix.

## Handoff (for CEO and agents)

- Shipped / changed: 8 light SVGs + 8 dark variants repaired; Figure carriers updated; G2 gate evidence refreshed; tasks.md updated.
- Decisions the team must respect: fig-U1-3 and fig-U1-7 viewBox is now 780x520 (carriers match); Urdu wordmark at bottom-left (x=12) with inline style="text-anchor:start".
- Pending / next owner: Independent G3 review (now stale) and G5 review for EFMP-304 Unit 1. Independent G3/G5 remain pending.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: CSS text-anchor:middle on base `text {}` rule silently overrides inline text-anchor on wordmark in Urdu SVGs, causing RTL overflow; viewBox height changes must be mirrored in Figure carriers.
- Graders run and results (PASS/FAIL): measure-figure-text PASS (exit 0); check:content PASS for scope gates.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Consider adding `.wm { text-anchor: start; }` to the boilerplate CSS in svg-authoring.md so all wordmarks are explicit and RTL-safe without inline style overrides.
