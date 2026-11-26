---
id: 20261293
title: EFMP-302 course review rubric and key fixes after independent check
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: fix/efmp-302-course-review-rubrics
user: M Yousif Channa
command: continue to next issue (#820 follow-up)
labels: [board-direct, content]
links:
  spec: specs/008-rich-unit-pedagogy/contracts/end-of-course-review.md
  ticket: "#820"
  adr: null
  pr: null
files:
  - docs/semester-1/efmp-302/course-review.mdx
  - specs/034-backlog-tracking/tasks.md
tests:
  - CI content gates (check:all) on the PR
---

## Prompt

continue to next issue

## Response snapshot

The crew's EFMP-302 course review (batch PR #906) merged. Applied the four findings from the
independent advisory check (Claude Sonnet; the author was claude_crew, LongCat family), each
checked against EFMP-302 Topic 6.4: the MCQ 15 key now maps each destroyer to its block (one goal,
the activity's named time, evidence of change decided in advance, the mid-year review date); the
ERQ 3 rubric scores which block comes first (the gap with its evidence), with weights rebalanced
to keep 20 marks; the ERQ 4 rubric replaces the "donor-relations objection" the stem never raised
with a practical-next-step criterion; the ERQ 5 rubric lists Topic 6.4's six blocks (gap, evidence
it is real, one goal, activity naming the time, evidence of change, mid-year review date).

## Outcome

- ✅ Impact: the course review's marking guidance matches its questions and the unit text.
- 🧪 Tests: CI gates.
- 📁 Files: course-review.mdx, tasks.md.
- 🔁 Next prompts: Urdu mirror of the course review (a later crew translate job).
- 🧠 Reflection: rubric drift (criteria the stem never asks for) is the common defect in generated assessments; check rubric against stem.

## Handoff (for CEO and agents)

- Shipped / changed: #820 completed (the PR closes it).
- Decisions the team must respect: course-level pages follow the end-of-course-review contract; rubric criteria must match what the stem asks.
- Pending / next owner: Urdu mirror when the crew translates EFMP-302 course-level pages.
- Paperclip issues affected: none; GitHub #820.

## Evaluation notes (flywheel)

- Failure modes observed: rubric criteria not asked by the stem (ERQ 4), block list drift (ERQ 5).
- Graders run and results (PASS/FAIL): independent advisory check PASS with minor revisions (all applied)
- Prompt variant (if applicable): crew salvage brief with explicit contract
- Next experiment (smallest change to try): add "rubric matches stem" to the crew's course-review brief.
