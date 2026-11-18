---
id: 556-repair-geng301-unit-five-g3
title: Repair GENG-301 Unit 5 from the latest G3 report
stage: misc
date: 2026-11-10
surface: agent
model: crew
feature: geng-301
branch: crew/geng-301-u05-repair_en-r1
user: crew
command: opencode worker on .crew/brief.md
labels: ["crew", "opencode", "geng-301", "unit-05", "g3-repair"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: history/adr/0019-agent-review-independence.md
  pr: null
files:
  - specs/content/geng-301/tasks.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the findings of the latest G3 report (20261108T203238Z-g3-desk-a5cfa8c0.json) to GENG-301 Unit 5. Verified that all six blocking content findings were already resolved on origin/main by the prior repair commit 8fe0b1e4a (20261103-repair-en.md): fictional study labelled; MCQ 6 rewards a qualified claim; RRQ 10 supplies a fictional column extract; RRQ 5 requires an evidence placeholder and RRQ 3 retains the statistical qualification; register guidance and figure labels qualified; weeks 14-15 restored. The latest report's input manifest does not match the current Unit 5 bytes, confirming it was generated against a pre-repair state. No further content edits were required. Appended the Unit 5 G3 tracker row for the latest report and committed.

## Outcome

- ✅ Impact: Unit 5 G3 findings verified resolved; all content gates pass; tracker row appended.
- 🧪 Tests: `npm run check:content` all 14 gates pass.
- 📁 Files: 1 tracker row appended (specs/content/geng-301/tasks.md).
- 🔁 Next prompts: fresh G3 review of Unit 5 after owner authorisation (ADR-0019 cycles exhausted).
- 🧠 Reflection: The latest G3 report was run against a pre-repair version of the content files; always verify each finding against current bytes before editing.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 5 G3 tracker row appended for report 20261108T203238Z-g3-desk-a5cfa8c0.json; repairs verified present in the committed Unit 5 files.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this change certifies nothing.
- Pending / next owner: fresh G3 review of Unit 5 (ADR-0019 cycles exhausted, needs owner authorisation); render inspection (narrow viewport and A4 print) still unavailable in crew jobs.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: stale review reports can describe a pre-repair state; always diff the report input manifest against current bytes.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
