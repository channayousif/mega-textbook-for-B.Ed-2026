---
id: 20261032
title: Repair batch CI Urdu geometry
stage: general
date: 2026-10-28
surface: agent
model: GPT-6
feature: 012-visual-density-standard
branch: crew/batch-20261027-2015
user: crew
command: Read .crew/brief.md and carry it out
labels: [codex, crew, ci-fix]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/349
files:
  - static/img/figures/gict-300/unit-02/fig-U2-6.ur.svg
  - static/img/figures/gict-300/unit-02/fig-U2-6.ur.dark.svg
  - static/img/figures/gqur-300/unit-06/fig-U6-6.ur.svg
  - static/img/figures/gqur-300/unit-06/fig-U6-6.ur.dark.svg
  - history/prompts/general/20261032-repair-batch-ci-urdu-geometry.general.prompt.md
tests:
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs (four repaired SVGs)
  - scripts/heavy.sh node scripts/measure-figure-text.mjs --changed origin/main
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrapped colliding Urdu labels in GICT-300 Unit 2 and GQUR-300 Unit 6, preserving wording and synchronizing dark variants. Investigated PR 349 CI logs and recorded unrelated e2e findings.

## Outcome

- ✅ Impact: Removed all six CI text collisions with four SVG edits.
- 🧪 Tests: All 13 content gates PASS. All 276 batch SVGs PASS geometry (12 non-failing cosmetic shape/wordmark notices). Four repaired SVGs also PASS individually. git diff --check PASS.
- 📁 Files: Four Urdu SVGs and this PHR.
- 🔁 Next prompts: Platform owner should repair the existing G3 desk e2e selector and investigate the moderation filter timeout.
- 🧠 Reflection: Urdu glyph widths need measured wrapping; preserve wording rather than shrinking text.

## Handoff (for CEO and agents)

- Shipped / changed: Wrapped the boot-flow note and enrollment-rate definition in both light and dark Urdu assets.
- Decisions the team must respect: No English inputs, tracker gates, review certification, publication state, or application code changed. Urdu-only variants do not invalidate the English G2 input manifest.
- Pending / next owner: Platform/test owner: g3-signoff.spec.ts:50 selects the first tbody row inside collapsed By course details at src/pages/app/admin/g3-signoff.tsx:75. Scope it to the units table. suggestion-moderation.spec.ts:80 timed out awaiting removal of a category-filtered row and passed on retry. No src, tests or supabase files differ from origin/main in this batch. No build, server or e2e suite run locally.
- Paperclip issues affected: PR #349; no separate issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Six Urdu text collisions across four variants; unrelated e2e hidden-row selector failure and flaky moderation category filter.
- Graders run and results (PASS/FAIL): Repaired SVG geometry PASS; all 276 changed SVGs PASS; all 13 content gates PASS; git diff --check PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Rerun CI after the platform owner fixes the G3 desk selector.
