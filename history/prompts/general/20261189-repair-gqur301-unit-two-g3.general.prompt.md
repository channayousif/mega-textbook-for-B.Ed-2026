---
id: 20261189
title: Repair GQUR-301 Unit 2 from the latest G3 report
stage: general
date: 2026-11-10
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u02-repair_en-r1
user: crew
command: opencode worker on .crew/brief.md
labels: ["crew", "opencode", "gqur-301", "unit-02", "g3-repair"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/gqur-301/tasks.md
  - history/prompts/general/20261189-repair-gqur301-unit-two-g3.general.prompt.md
tests:
  - npm run build:content-status
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Verified the four blocking findings in the latest G3 desk report are already resolved in the current bytes by repair commit b35bd9059, appended the required unticked advisory G3 tracker row naming the report, and left G3 open.

## Outcome

- ✅ Impact: Confirmed figure geometry, conditional assessment guidance, the Analyze rubric criterion and the worked chart scaffolding already meet the report's F1-F4 requirements.
- 🧪 Tests: npm run check:content passed 14/14 on the unchanged baseline after regenerating static/content-status.json.
- 📁 Files: specs/content/gqur-301/tasks.md (new advisory G3 row).
- 🔁 Next prompts: Fresh independent G3 review with frozen source and render evidence; resolve G1/provenance.
- 🧠 Reflection: The latest desk report re-stated the round-1 findings; the current bytes already carry the repairs, so no content edit was needed.

## Handoff (for CEO and agents)

- Shipped / changed: Appended the Unit 2 G3 advisory repair row naming specs/content/gqur-301/reviews/unit-02/G3/20261108T203238Z-g3-desk-e1b082b9.json.
- Decisions the team must respect: G3 remains open; no Urdu mirror exists; no self-certification or human initials.
- Pending / next owner: Owner/evaluator resolves authority and provenance; orchestration arranges an independent answer-blind review and permitted narrow-screen and print inspection.
- Paperclip issues affected: Crew job gqur-301-u02-repair_en-r1; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: The report's input manifest does not match the current docs bytes, so its provenance is uncertain; findings were verified against the current bytes instead.
- Graders run and results (PASS/FAIL): check:content 14/14 PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent answer-blind assessment and rendered review of the repaired version.
