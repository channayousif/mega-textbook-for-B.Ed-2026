---
id: 20261115
title: Repair EFMP301 Unit 12 G3
stage: general
date: 2026-11-03
surface: agent
model: GPT-6/Codex (exact deployed version unavailable)
feature: 022-author-efmp-301
branch: crew/efmp-301-u12-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: [codex, crew, efmp-301, unit-12]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/efmp-301/unit-12/topic-03.mdx
  - docs/semester-1/efmp-301/unit-12/unit-assessment.mdx
  - docs/semester-1/efmp-301/unit-12/unit-teacher-notes.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-12/
  - specs/content/efmp-301/sources/unit-12.md
  - specs/content/efmp-301/tasks.md
  - specs/content/efmp-301/reviews/unit-12/
tests:
  - npm run check:content (first run identifies stale Unit 12 G2 evidence; refresh and final verification recorded below)
  - scripts/heavy.sh npm test
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the latest G3 findings in English and Urdu. Recorded unresolved visual and historical provenance limits, kept G3 unticked and refreshed deterministic draft evidence. No push or PR.

## Outcome

- ✅ Impact: Corrected modelling claims, explicit illustrative case status, running question and assessment credit guidance.
- 🧪 Tests: All 13 content gates passed after refreshing Unit 12 G2 evidence and the ignored generated status snapshot; origin/main also passed all 13. All 347 unit tests in 28 files passed. No build, server or browser run.
- 📁 Files: Unit 12 learner text and Urdu mirrors, source note, tracker, repair record and G2 evidence.
- 🔁 Next prompts: Owner-arranged visual inspection and provenance resolution; owner authorisation before any further independent review cycle.
- 🧠 Reflection: Draft gate evidence must be refreshed after bound content changes; advisory repair is not review certification.

## Handoff (for CEO and agents)

- Shipped / changed: English and Urdu corrections for R002-F2/F3/F5/F6/F7, plus explicit F1/F4 limitations.
- Decisions the team must respect: No unit-end ERQ word limit; recorded human models can support learning; tablet case is constructed. G3/G5 remain open.
- Pending / next owner: Owner: current desktop/narrow/A4 inspection, historical repair-session provenance and further review-cycle authorisation.
- Paperclip issues affected: efmp-301-u12-repair_en; no ticket ID supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Content edits stale the existing G2 manifest. Historical review evidence lacks current renders and exact repair-session identity.
- Graders run and results (PASS/FAIL): PASS: check:content (13/13), npm test (347/347), draft evidence (8/8), git diff --check.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Inspect the repaired figures on an authorised rendering host.

## Verification details

- First content run: only stale Unit 12 G2 manifest. Refreshed using prepare-gate-evidence.mjs after content commit 8fcda08b2, then repointed the existing G2 reference without changing its status.
- Next run: only the ignored static/content-status.json snapshot was stale; regenerated using build:content-status. No publication tracker or publication-state record changed.
- Baseline: detached origin/main cfc41817f, independent index under .crew/baseline, all 13 gates passed after generating its missing ignored status snapshot.
- Final evidence: specs/content/efmp-301/reviews/unit-12/G2/20261103T055211136Z-gates.json.
- Unit tests: scripts/heavy.sh npm test, 28 files and 347 tests passed.
