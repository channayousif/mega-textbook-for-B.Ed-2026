---
id: 531
title: "GENG-301 U01 G3 English review"
stage: general
date: 2026-10-19
surface: agent
model: longcat/LongCat-2.0
feature: none
branch: crew/geng-301-u01-review_en
user: board-direct
command: "Read .crew/brief.md and carry it out completely"
labels: ["content-review", "G3", "geng-301"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/geng-301/reviews/unit-01/G3/manifest.json
  - specs/content/geng-301/reviews/unit-01/G3/20261019T000000000Z-g3.json
  - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/validate-content.txt
  - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-depth-gate.txt
  - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-figures.txt
  - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-no-em-dash.txt
  - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-no-answer-keys.txt
  - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-docs-sync.txt
  - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/measure-figure-text.txt
tests:
  - "node scripts/review-evidence.mjs validate specs/content/geng-301/reviews/unit-01/G3/20261019T000000000Z-g3.json"
  - "npm run check:content (baseline; check:content-status fails on main too)"
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

## Response snapshot

Acted as independent G3 English reviewer for GENG-301 Unit 1. Ran review-unit skill: prepared manifest (100 inputs), reviewed all 7 criteria against the G3 rubric, ran all 6 mandatory gate commands plus measure-figure-text, validated open-access source writing2015, inspected SVG figures. Produced validated G3 evidence report at specs/content/geng-301/reviews/unit-01/G3/20261019T000000000Z-g3.json. Disposition: revise.

## Outcome

- Impact: G3 review report produced with one blocking finding (RRQ 5 answer key error) and two advisory findings (openstax/writing2015 source binding mismatch, SVG wordmark overflow).
- Tests: Report validates structurally (revise). All deterministic gates pass.
- Files: 9 files committed (report, manifest, 7 log files). No unit content modified.
- Next prompts: Await revision job to fix RRQ 5 answer key, then re-review.
- Reflection: measure-figure-text caught a visual defect that check:figures misses — worth adding to the standard review checklist.

## Handoff (for CEO and agents)

- Shipped / changed: G3 evidence report (revise disposition) with evidence artifacts and PHR committed on branch crew/geng-301-u01-review_en.
- Decisions the team must respect: Did NOT mark G3 done, did NOT modify unit content, did NOT self-sign. Report is advisory only.
- Pending / next owner: A content author must fix the RRQ 5 answer key (unit-assessment.mdx:205) — change "sentence 3" to "sentence 1" in the model answer. After fix, a fresh G3 reviewer rechecks.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: check:figures gate does not measure glyph geometry; measure-figure-text is a useful supplementary check.
- Graders run and results (PASS/FAIL): validate PASS (structural).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
