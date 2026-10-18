---
id: crew-efmp-303-u06-review_en
title: "G3 review EFMP-303 Unit 6"
stage: misc
date: 2026-10-18
surface: agent
model: LongCat-2.0
feature: efmp-303
branch: crew/efmp-303-u06-review_en
user: board-direct
command: "Read .crew/brief.md in the current directory and carry it out completely."
labels: ["g3-review", "efmp-303", "unit-06"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-303/reviews/unit-06/G3/manifest.json
  - specs/content/efmp-303/reviews/unit-06/G3/20261018T200000000Z.json
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/validate:content.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:depth-gate.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:figures.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:no-em-dash.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:no-answer-keys.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:docs-sync.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/render-review.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/fig-U6-3-render.png
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-1.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-2.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-3.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-4.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-5.txt
  - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-6.txt
tests:
  - "npm run check:content: all 13 gates pass"
  - "node scripts/review-evidence.mjs validate: report structurally valid (pass)"
  - "node scripts/measure-figure-text.mjs: all 6 figures within viewBox bounds"
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

## Response snapshot

Acted as independent G3 English reviewer for EFMP-303 Unit 6 per review-unit skill and g3-reviewer agent definition. Prepared input manifest (99 inputs), ran all 6 mandatory gate commands (validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys, check:docs-sync), captured render-review evidence (including one PNG render of fig-U6-3 via sharp), measured all 6 figure SVGs, and verified authority (guide weeks 13-15 match coverage matrix), sources (gem-report2020, nep2017, SDG4 UN page), assessment correctness (10/10/5 bank independently solved), and all 7 G3 criteria. Produced and validated a pass-disposition evidence report.

## Outcome

- Impact: G3 English review evidence committed on branch; unit meets all G3 criteria.
- Tests: 13/13 content gates pass; report validates; 6/6 figures measure clean.
- Files: 16 new files under specs/content/efmp-303/reviews/unit-06/G3/.
- Next prompts: G4 Urdu translation (if scheduled); no G5 review until G4 exists.
- Advisory findings: (1) fig-U6-2 cosmetic wordmark collision - pre-existing on main, not new; (2) Khan (2018) in Further reading - replaced by gem-report2020 in content-spec but still listed.

## Handoff (for CEO and agents)

- Shipped / changed: G3 pass evidence report at specs/content/efmp-303/reviews/unit-06/G3/20261018T200000000Z.json with full gate logs and figure measurements.
- Decisions the team must respect: Report is advisory until real Ed25519 signing and registry qualification occur (reviewer cannot self-certify). Disposition is pass but does not authorize gate completion by itself.
- Pending / next owner: G4 Urdu mirror not yet authored for this unit. G5 review cannot run until G4 exists. Advisory findings left unresolved (fig-U6-2 cosmetic, Khan reference).
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: check:content-status gate initially failed due to missing content-status.json (pre-existing on main, git-ignored, built via build:content-status).
- Graders run and results: 13/13 content gates PASS; review-evidence validate PASS.
- Prompt variant: N/A (single-shot crew brief).
- Next experiment: N/A.
