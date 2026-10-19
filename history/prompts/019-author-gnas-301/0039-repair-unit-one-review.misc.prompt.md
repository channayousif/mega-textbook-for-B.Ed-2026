---
id: 0039
title: Repair Unit One Review Findings
stage: misc
date: 2026-10-19
surface: agent
model: GPT-6
feature: 019-author-gnas-301
branch: crew/gnas-301-u01-repair_en
user: owner
command: Read .crew/brief.md
labels: [board-direct, gnas-301, repair]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gnas-301/unit-01/topic-03.mdx
  - docs/semester-1/gnas-301/unit-01/unit-teacher-notes.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/unit-teacher-notes.mdx
  - specs/content/gnas-301/tasks.md
  - specs/content/gnas-301/reviews/unit-01/repair-20261019.md
  - specs/content/gnas-301/reviews/unit-01/G2/
tests:
  - npm run check:content
  - scripts/heavy.sh npm test
  - npm run gates:evidence -- GNAS-301 1
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Verified both G3 reports against existing repairs. Completed descriptive DOI links, explicit
cross-topic teacher references and drinking-water source identification in English and Urdu.
Appended the requested advisory tracker row with G3 unticked. Recorded finding-by-finding
repair provenance. Refreshing G2 deterministic evidence after committing its bound inputs.

## Outcome

- Impact: Remaining Unit 1 repairs applied without duplicating fixes already on main.
- Tests: All 314 tests passed across 26 files. Initial main-equivalent content run passed
  12 gates; missing generated content-status was the only failure. Content changes require
  fresh Unit 1 G2 evidence; final gate outcome is recorded in the follow-up validation record.
- Files: Unit 1 EN/UR prose, tracker, repair record and G2 evidence only, plus this required PHR.
- Next prompts: Owner-authorised independent review under G-2026-24.
- Reflection: Shared source edits invalidate another unit's evidence, so avoided that edit.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 1 source clarity, DOI accessibility, teacher cross-references and advisory repair record.
- Decisions the team must respect: No G3/G5 certification; preserve two-cycle review limit and G-2026-24.
- Pending / next owner: Curriculum owner owns fresh review authority, course overview 3 (2-1) correction and shared water-excerpt heading advisory. Shared excerpt already explicitly supports Unit 1 in its body.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Existing main repairs made original report quotes stale; shared source edit staled Unit 2 G2 and was reverted.
- Graders run and results (PASS/FAIL): Unit tests PASS; final content gates and G2 evidence recorded with follow-up validation.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent review only with owner authorisation.
