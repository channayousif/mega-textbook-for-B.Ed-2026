---
id: crew-gqur-301-u15-illustrate
title: crew illustrate GQUR-301 unit 15
stage: misc
date: 2026-11-28
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u15-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-15/topic-01.mdx
 - history/prompts/gqur-301/crew-gqur-301-u15-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-01.mdx
 - specs/content/gqur-301/figures/unit-15.md
 - specs/content/gqur-301/reviews/unit-15/G2/20261127T230927009Z-gates.json
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261127T230927009Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261127T230927009Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261127T230927009Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261127T230927009Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261127T230927009Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261127T230927009Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261127T230927009Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261127T230927009Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-15/fig-U15-8.webp
tests:
 - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Generated topic 15.1 illustration fig-U15-8 via agy2 (imagen-3.0), inspected and placed in English and Urdu topic 15.1 files, updated manifest to placed. Recorded agy2 image quota exhaustion for subsequent illustration rows.

## Outcome

- Impact: illustrate for GQUR-301 Unit 15 by agy.
- Tests: npm run check:content.
- Files: listed above.
- Next prompts: crew illustrate with remaining producers or after agy2 quota reset for fig-U15-9, fig-U15-10, and unit banner fig-U15-7.
- Reflection: agy2 generated fig-U15-8 cleanly and then hit resource exhaustion (HTTP 429) on subsequent generations.

## Handoff (for CEO and agents)

- Shipped / changed: Produced, verified, and placed fig-U15-8 (Topic 15.1) in both English and Urdu topic files.
- Decisions the team must respect: agy2 image quota exhausted (resets in ~133h); fig-U15-9, fig-U15-10, and banner fig-U15-7 remain at prompt-only for next producer or quota reset.
- Pending / next owner: crew planner / lead.
- Notes for the next job on this unit:
  - fig-U15-9, fig-U15-10, and banner fig-U15-7 remain at prompt-only.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: agy2 individual image quota reached after producing fig-U15-8.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
