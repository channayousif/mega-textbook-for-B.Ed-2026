---
id: crew-gcce-400-u07-author
title: crew author GCCE-400 unit 7
stage: misc
date: 2026-11-23
surface: agent
model: claude_crew
feature: gcce-400
branch: crew/gcce-400-u07-author
user: crew
command: crew author
labels: ["crew", "claude_crew", "author"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-07/index.mdx
 - docs/semester-4/gcce-400/unit-07/topic-01.mdx
 - docs/semester-4/gcce-400/unit-07/topic-02.mdx
 - docs/semester-4/gcce-400/unit-07/topic-03.mdx
 - docs/semester-4/gcce-400/unit-07/topic-04.mdx
 - docs/semester-4/gcce-400/unit-07/unit-assessment.mdx
 - docs/semester-4/gcce-400/unit-07/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/gcce-400/crew-gcce-400-u07-author.green.prompt.md
 - specs/content/gcce-400/concepts/unit-07.md
 - specs/content/gcce-400/coverage/unit-07.md
 - specs/content/gcce-400/figures/unit-07.banner.md
 - specs/content/gcce-400/figures/unit-07.md
 - specs/content/gcce-400/reviews/unit-07/G2/20261122T132732300Z-gates.json
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/validate-content.txt
 - specs/content/gcce-400/sources/texts/constitution-pakistan.md
 - specs/content/gcce-400/sources/texts/openstax-sociology-3e.md
 - specs/content/gcce-400/sources/texts/pbs-census-2023.md
 - specs/content/gcce-400/sources/unit-07.md
 - specs/content/gcce-400/tasks.md
 - static/img/figures/gcce-400/unit-07/fig-U7-1.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-1.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-2.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-2.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-3.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-3.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-4.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-4.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-5.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-5.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-6.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-6.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-7.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-7.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-8.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-8.svg
tests:
 - npm run check:content
---

## Prompt

The original brief for this job (the standard author brief for GCCE-400 Unit 7, Diversity, Inclusion and Social Justice) was removed from the worktree before reap, so it could not be quoted here. Restored by the lead (Claude Code, board-direct) on 2026-11-23 so the finished job could be reaped; the job wrote its own PHR (4708ea50a).


## Response snapshot

Authored GCCE-400 Unit 7 (four topics, 10/10/5 assessment, teacher notes, eight placed schematic SVGs, governance artefacts and six glossary terms) in English with G2 gate evidence recorded, all 14 content gates green.

## Outcome

- Impact: author for GCCE-400 Unit 7 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 43 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GCCE-400 Unit 7 (four topics, 10/10/5 assessment, teacher notes, eight placed schematic SVGs, governance artefacts and six glossary terms) in English with G2 gate evidence recorded, all 14 content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The 2023 census narrative states a national male-female literacy gap of 16.16 percentage points while its own summary table shows 68.00 and 52.84; the unit quotes the table values and the discrepancy is recorded in sources/unit-07.md.
  - kymlicka-norman-2000 and youniss-levine-2009 are print-only and declared under `## Unverifiable sources`; G3 should confirm the framing attributed to them, as Units 1 and 2 were asked to.
  - course-overview.mdx still introduces only Unit 1 (left unchanged because it is bound into every unit's G2 evidence); banner fig-U7-9 is prompt-only and there are no .ur.svg files yet.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
