---
id: 20261192
title: Fix PR536 Urdu figure header spacing
stage: general
date: 2026-11-11
surface: opencode
model: longcat/LongCat-2.0
feature: efpg-401
branch: crew/batch-20261110-1800
user: crew
command: Read .crew/brief.md and carry it out
labels: [opencode, crew, ci-fix, efpg-401]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/536
files:
  - static/img/figures/efpg-401/unit-02/fig-U2-6.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-6.ur.dark.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-8.ur.svg
  - static/img/figures/efpg-401/unit-02/fig-U2-8.ur.dark.svg
  - history/prompts/general/20261192-fix-pr536-urdu-figure-spacing.general.prompt.md
tests:
  - npm run check:content (14/14 gates PASS)
  - scripts/measure-figure-text.mjs on the four edited SVGs (PASS)
  - scripts/measure-figure-text.mjs --changed origin/main (all changed SVGs PASS)
  - FIGURE_ROOT=static/img/figures/efpg-401/unit-02 node scripts/build-figure-variants.mjs --check (PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read PR #536 checks and failed run 42870995907 (figure-geometry). CI measured the Urdu `.sh` headers 3.5px apart in fig-U2-6 and overlapping by 6.9px in fig-U2-8. Reduced `.sh` from 14px to 13px in both light and dark variants of the two figures, scaling CI's widths to gaps of about 16.8px and 7.2px.

## Outcome

- ✅ Impact: Minimal style-only repair; all labels, translation text and figure geometry otherwise unchanged.
- 🧪 Tests: All 14 content gates PASS; measure-figure-text passes on the four edited SVGs and on every SVG changed since origin/main; scoped variant freshness PASS.
- 📁 Files: Four SVG style values and this PHR.
- 🔁 Next prompts: CI must confirm browser geometry on the next run.
- 🧠 Reflection: Local Playwright uses a narrower Nastaliq font than CI's fallback, so size the repair against CI's measured widths, not the local pass.

## Handoff (for CEO and agents)

- Shipped / changed: `.sh` font-size 14px to 13px in fig-U2-6.ur.svg, fig-U2-6.ur.dark.svg, fig-U2-8.ur.svg and fig-U2-8.ur.dark.svg.
- Decisions the team must respect: No G3/G5 status, publication state, reviewer registry or evidence changes. No push and no PR opened. No em dash introduced.
- Pending / next owner: CI figure-geometry must confirm the repair; local Playwright cannot reproduce CI's wider fallback metrics.
- Paperclip issues affected: PR #536; crew job batch-20261110-1800-cifix1.

## Evaluation notes (flywheel)

- Failure modes observed: Urdu `.sh` headers overflow their columns under CI's wider fallback font; local Playwright passes because it resolves a narrower Nastaliq face.
- Graders run and results (PASS/FAIL): content gates PASS (14/14); measure-figure-text PASS; variant freshness PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Rerun CI figure-geometry on the committed repair.
