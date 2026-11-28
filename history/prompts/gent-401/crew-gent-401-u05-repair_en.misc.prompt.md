---
id: crew-gent-401-u05-repair_en
title: GENT-401 Unit 5 G3 repairs
stage: misc
date: 2026-11-28
surface: agent
model: claude-sonnet-5-5
feature: gent-401
branch: crew/gent-401-u05-repair_en
user: crew
command: revise-topic
labels: [claude, crew, repair_en]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-4/gent-401/unit-05/
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-05/
  - static/img/figures/gent-401/unit-05/
  - specs/content/gent-401/
tests:
  - npm run check:content
  - npm test
  - node scripts/measure-figure-text.mjs
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief task: "Apply the findings of the latest G3 report under specs/content/gent-401/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked."

## Response snapshot

Applied the findings of report 20261127T192818Z-g3-desk-f43b7b2c.json in English and Urdu, re-prepared G2 evidence and appended an open G3 row.

## Outcome

- ✅ Impact: savings figure consistent (Rs 20,000); fig-U5-1 redrawn to scale; Scott credited for the network and media point; MCQ keys now A2/B2/C3/D3; Sintha softened; advisories fixed; Scott notes 7-9 bound.
- 🧪 Tests: 14 content gates pass; npm test 636 of 636; measure-figure-text clean on the 8 changed SVGs.
- 📁 Files: Unit 5 topic and assessment pages (EN and UR), fig-U5-1 and fig-U5-3 (all variants), manifest, sources, bound notes, tracker, G2 evidence.
- 🔁 Next prompts: fresh independent G3 run with render inspection once this is deployed.
- 🧠 Reflection: sharp renders these SVGs black unless the CSS variables are inlined in a scratch copy first.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 5 G3 repairs committed on the branch; not pushed.
- Decisions the team must respect: Imran has Rs 20,000 and needs Rs 50,000; the uncle's offer is now a bank officer's loan offer; fig-U5-3 uses amount in its first decision and treats reward crowdfunding as an add-on.
- Pending / next owner: independent G3 rerun including 360px and A4 print inspection; G5 for the changed Urdu.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none blocking.
- Graders run and results (PASS/FAIL): content gates PASS; unit tests PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
