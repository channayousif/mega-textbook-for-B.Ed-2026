---
id: 20261114
title: Repair EFMP-301 Unit 3 G3 findings
stage: general
date: 2026-11-03
surface: agent
model: Codex (exact model build unavailable)
feature: 022-author-efmp-301
branch: crew/efmp-301-u03-repair_en
user: crew owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "efmp-301", "unit-03"]
links:
  spec: specs/022-author-efmp-301/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/efmp-301/unit-03/
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-03/
  - specs/content/efmp-301/coverage/unit-03.md
  - specs/content/efmp-301/sources/unit-03.md
  - specs/content/efmp-301/figures/unit-03.md
  - specs/content/efmp-301/tasks.md
  - specs/content/efmp-301/reviews/unit-03/G3/20261103-repair-notes.md
  - static/img/figures/efmp-301/unit-03/fig-U3-6*.svg
tests:
  - npm run check:content (baseline all 13 pass; final validation pending)
  - scripts/heavy.sh npm test (running)
  - FIGURE_ROOT=static/img/figures/efmp-301/unit-03 node scripts/build-figure-variants.mjs
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied bilingual assessment, learning-mechanism, coverage and introduction repairs. Appended an unticked advisory G3 row naming the report. Recorded missing render, glyph and provenance evidence. Refreshing G2 evidence; content-status scope approval requested.

## Outcome

- ✅ Impact: Corrected the actionable G3 findings without certification.
- 🧪 Tests: Baseline content gates passed. Post-edit checks found stale G2 evidence, an unused source binding and stale derived status. Repairs and final checks in progress.
- 📁 Files: Unit 3 EN/UR prose, coverage, sources, figure manifest/assets, tracker and repair record; mandatory PHR.
- 🔁 Next prompts: Owner to resolve render/provenance evidence and independent review escalation.
- 🧠 Reflection: Removing unsupported source bindings also requires moving background reading outside the coverage registry.

## Handoff (for CEO and agents)

- Shipped / changed: Conditional Amjad model; fair ERQ scoring; learning/performance distinction; conditional silence explanation; corrected coverage and introduction.
- Decisions the team must respect: G3/G5 remain open. No independent acceptance or author identity invented. No builds, servers or Playwright.
- Pending / next owner: Parent/owner: current render and glyph geometry, original provenance and fresh independent review. Derived content-status scope approval pending.
- Paperclip issues affected: EFMP-301 Unit 3 G3 report 20261102T211054Z-g3-desk-1ffb278b.json; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial edit script stopped on an exact-string mismatch and was resumed on the verified current anchor. No stale feedback was silently skipped.
- Graders run and results (PASS/FAIL): Baseline 13/13 PASS; final validation pending.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Validate fresh G2 evidence against committed repaired inputs.
