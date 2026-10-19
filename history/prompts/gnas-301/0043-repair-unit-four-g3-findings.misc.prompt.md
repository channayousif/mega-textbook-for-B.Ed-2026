---
id: 0043
title: Repair Unit Four G3 Findings
stage: misc
date: 2026-10-19
surface: agent
model: GPT-6
feature: gnas-301
branch: crew/gnas-301-u04-repair_en
user: owner
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "gnas-301", "G3-repair"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gnas-301/unit-04/topic-01.mdx
  - docs/semester-1/gnas-301/unit-04/topic-02.mdx
  - docs/semester-1/gnas-301/unit-04/topic-03.mdx
  - docs/semester-1/gnas-301/unit-04/topic-04.mdx
  - docs/semester-1/gnas-301/unit-04/topic-05.mdx
  - docs/semester-1/gnas-301/unit-04/topic-06.mdx
  - docs/semester-1/gnas-301/unit-04/topic-07.mdx
  - docs/semester-1/gnas-301/unit-04/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-05.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-06.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-07.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/unit-assessment.mdx
  - specs/content/gnas-301/concepts/unit-04.md
  - specs/content/gnas-301/coverage/unit-04.md
  - specs/content/gnas-301/sources/unit-04.md
  - specs/content/gnas-301/tasks.md
tests:
  - npm run check:content (branch and origin/main comparison)
  - scripts/heavy.sh npm test
  - node scripts/prepare-gate-evidence.mjs GNAS-301 4
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied remaining Unit 4 G3 findings with matching Urdu edits, corrected source and concept mappings, redistributed MCQ options and linked Further reading. Appended advisory tracker row with G3 unticked. Preserve earlier repairs; commit locally without pushing.

## Outcome

- ✅ Impact: Repairs prepared for owner review without claiming G3 acceptance.
- 🧪 Tests: Content gates compared against origin/main; final results recorded in follow-up validation record. All 314 tests across 26 files passed.
- 📁 Files: Unit 4 EN/UR topics, assessment, governance tables and PHR.
- 🔁 Next prompts: Owner handles G-2026-31 before any third review cycle.
- 🧠 Reflection: Shared excerpt edits stale Unit 3 evidence; corrected notes recorded in Unit 4 source record instead.

## Handoff (for CEO and agents)

- Shipped / changed: Bounded Unit 4 repairs and deterministic G2 evidence refresh.
- Decisions the team must respect: G3 remains unticked; no self-certification or publication changes. Existing repairs retained.
- Pending / next owner: Owner owns G-2026-31 third-cycle authorization. Missing generated static/content-status.json also fails on origin/main.
- Paperclip issues affected: null; no TEX issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial repair run invalidated G2 manifests; refresh Unit 4 evidence, preserve shared excerpts to avoid Unit 3 changes.
- Graders run and results (PASS/FAIL): 314 unit tests PASS; eight G2 draft checks PASS; final content-gate comparison recorded below.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent review only after owner authorization.

## Final validation

- Branch and origin/main each pass 12 of 13 content gates. Both fail only check:content-status because static/content-status.json is missing. No new findings remain.
- All 314 tests in 26 unit-test files passed.
- Eight deterministic G2 checks passed; fresh Unit 4 evidence and tracker reference recorded.
- EN/UR MCQ key agreement checked after option swaps. git diff --check passed.
- No push or PR; G3 remains unticked.
