---
id: 20261218
title: EFPG-401 Unit 5 G3 review
stage: misc
date: 2026-11-19
surface: agent
model: claude-opus-5-5
feature: efpg-401
branch: crew/efpg-401-u05-review_en
user: crew
command: Read .crew/brief.md in the current directory and carry it out completely.
labels: [claude, crew, efpg-401, unit-05, g3-review]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json
  - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en/
  - specs/content/efpg-401/tasks.md
tests:
  - node scripts/review-evidence.mjs validate specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Ran an independent G3 English review of EFPG-401 Unit 5 (Lesson Planning) under the review-unit
skill. I prepared a fresh manifest at 0763fd82f, ran the six mandatory checks and check:content
(all passed), and solved the ten MCQs before opening the key (10/10 agreement). The report has
disposition `revise` with two blocking findings and is structurally valid. The tracker row is
advisory (`agent:claude`, unticked).

## Outcome

- Impact: advisory G3 report for EFPG-401 Unit 5; no content, figure or gate files changed.
- Tests: review-evidence validate passed; npm run check:content passed (14/14).
- Files: report JSON, evidence folder (manifest, summary, eight command logs), one tracker row.
- Next prompts: a crew repair job should address the blocking findings, then a fresh G3 review.
- Reflection: an earlier incomplete attempt on this branch left uncommitted logs, a summary and a
  tracker row pointing to a report that did not exist. I replaced them with this attempt's own
  evidence rather than build on unvalidated output.

## Handoff (for CEO and agents)

- Shipped / changed: `specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json`
  (disposition revise) plus its evidence folder, and one advisory G3 row in `specs/content/efpg-401/tasks.md`.
- Decisions the team must respect: G3 stays unticked; the report is advisory and unsigned.
  `revise` was chosen over `escalate` because both blocking defects can be repaired by the crew.
  The missing render evidence is only a matter of timing (production is at 331c3fc1, which does
  not yet include the reviewed bytes).
- Pending, owner: crew repair job for Unit 5. (1) `topic-02.mdx:71-73`: the missing-step activity
  lists all seven steps. (2) The Celce-Murcia and Sheikh attributions at topic-01:47,67,
  topic-03:71, topic-04:62, topic-05:65, topic-06:59 and topic-07:55 go beyond the title-level
  `## Unverifiable sources` declaration, and Topic 5.7 cites Celce-Murcia while coverage maps
  U5-10 to Sheikh. Advisory items are listed in the report: the "180 units" label in fig-U5-2,
  alt-text drift in fig-U5-1 and fig-U5-14, MCQ key bias (8 of 10 are B), and the RRQ 7 wording.
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: an earlier attempt's tracker row cited a report file that was never written.
- Next experiment: the next G3 attempt should run render-inspect against production once main
  containing the repaired Unit 5 is deployed.
