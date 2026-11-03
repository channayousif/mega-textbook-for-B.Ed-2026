---
id: 20261114
title: Repair EFMP-301 Unit 2 sources binding from G3 desk report
stage: general
date: 2026-11-03
surface: agent
model: claude-opus-5-5
feature: efmp-301
branch: crew/efmp-301-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en", "efmp-301"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-301/sources/unit-02.md
 - specs/content/efmp-301/coverage/unit-02.md
 - specs/content/efmp-301/tasks.md
 - specs/content/efmp-301/reviews/unit-02/G2/20261103T041919512Z-gates.json
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261103T041919512Z/
tests:
 - npm run check:content (13/13 PASS)
 - npm run gates:evidence -- EFMP-301 2 (8/8 PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

The latest G3 report, reviews/unit-02/G3/20261102T211054Z-g3-desk-8fe42573.json (owner
desk, disposition revise), marks every finding resolved but still fails the `sources`
criterion. That is finding 2: guide book 1 (seifert-hk), a mapped reading in the
content-spec, was missing from the table in sources/unit-02.md. The previous repair only
reworded the prose at lines 6-10. This run took the other repair the finding names. It
added a seifert-hk row to the sources table. The depth gate requires every source key to
be grounded in coverage, so the run also added seifert-hk coverage rows for U2-1, U2-4
and U2-6. These match the three Chapter 3 sections already bound in
sources/texts/seifert-hk.md (3.1, 3.2 and 3.3). The prose note now says the book is bound
below, while the teaching prose still cites the seifert2009 edition. The run then
refreshed the G2 evidence on a clean tree, updated the G2 tracker row, and appended an
advisory G3 row with G3 left unticked. No prose, Urdu or figure files changed.

## Outcome

- ✅ Impact: G3 sources criterion (finding 2) repaired; check:content 13/13 green.
- 🧪 Tests: check:content PASS (13/13); gates:evidence EFMP-301 2 PASS (8/8).
- 📁 Files: sources/unit-02.md, coverage/unit-02.md, tasks.md, new G2 evidence.
- 🔁 Next prompts: owner-authorised fresh G3 run, including the 360px and print render check.
- 🧠 Reflection: when a reviewer gives an "add it to the table or correct the prose" choice and the owner still fails the criterion after the prose fix, take the other branch. Note that the depth gate forces any new source key into coverage, and its Supports cell must list exactly those IDs.

## Handoff (for CEO and agents)

- Shipped / changed: seifert-hk bound in the Unit 2 sources table and coverage (U2-1, U2-4, U2-6); G2 evidence 20261103T041919512Z; tracker G2 row updated; advisory G3 row appended.
- Decisions the team must respect: seifert-hk is a corroborating source only; the unit prose cites seifert2009, and no seifert-hk citation was added to the MDX.
- Pending / next owner: owner (CMY) for a fresh G3 desk review. ADR-0019 cycles are exhausted, so another agent cycle needs owner authorisation. The 360px and A4 print render inspection is still open and needs a browser host.
- Paperclip issues affected: none (crew job efmp-301-u02-repair_en-r1).

## Evaluation notes (flywheel)

- Failure modes observed: a prior repair resolved the finding text but not the criterion the owner judged.
- Graders run and results (PASS/FAIL): check:content PASS; gates:evidence PASS.
- Prompt variant (if applicable): crew repair_en brief r1.
- Next experiment (smallest change to try): repair briefs could quote any failing criteria next to the findings.
