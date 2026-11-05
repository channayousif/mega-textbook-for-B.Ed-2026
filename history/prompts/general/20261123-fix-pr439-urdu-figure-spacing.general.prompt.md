---
id: 20261123
title: Fix PR439 Urdu figure spacing
stage: general
date: 2026-11-05
surface: agent
model: GPT-6
feature: 009-figure-rendering
branch: crew/batch-20261103-1902
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "ci-fix"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/439
files:
  - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.dark.svg
  - history/prompts/general/20261123-fix-pr439-urdu-figure-spacing.general.prompt.md
tests:
  - npm run check:content (all 14 PASS)
  - FIGURE_ROOT=static/img/figures/efmp-303/unit-01 node scripts/build-figure-variants.mjs --check (PASS)
  - XML parse and exact coordinate-only diff assertions (PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read PR #439 checks and failed run 41699726049. Shifted the last-row Urdu policy label left by 10px in light and dark SVGs to resolve the CI-reported 3.9px gap against a 4px minimum.

## Outcome

- ✅ Impact: Minimal coordinate repair preserves all labels and instructional meaning.
- 🧪 Tests: All 14 content gates PASS; XML and derived-variant checks PASS.
- 📁 Files: Two SVG coordinate changes and this PHR.
- 🔁 Next prompts: CI geometry rerun after the crew pushes the branch.
- 🧠 Reflection: Use a useful margin rather than a subpixel adjustment at the threshold.

## Handoff (for CEO and agents)

- Shipped / changed: Policy label x coordinate 640 to 630 in both Urdu variants.
- Decisions the team must respect: Brief forbids Playwright, builds, dev servers and pushing; none run. G3/G5 status untouched.
- Pending / next owner: Crew CI must confirm browser geometry; inferred gap is 13.9px using CI metrics.
- Paperclip issues affected: PR #439; crew job batch-20261103-1902-cifix1.

## Evaluation notes (flywheel)

- Failure modes observed: Urdu fallback font left only 3.9px between neighbouring final-row labels.
- Graders run and results (PASS/FAIL): Variant freshness PASS; valid XML and exact coordinate displacement PASS; all 14 content gates PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Rerun CI figure-geometry on the committed repair.
