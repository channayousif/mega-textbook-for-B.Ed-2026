---
id: 20261140
title: GICP400 Unit Seven G3 Review
stage: general
date: 2026-11-07
surface: agent
model: claude-opus-5-5
feature: gicp-400
branch: crew/gicp-400-u07-review_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["claude", "review", "gicp-400-u07-review_en"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0.json
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/
 - specs/content/gicp-400/tasks.md
tests:
 - npm run check:content (14/14 pass)
 - node scripts/review-evidence.mjs validate (structurally valid, escalate)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Ran an independent advisory G3 review of GICP-400 Unit 7, read the Dean (2005) and Kennedy (2012) full texts and the constitutional articles, and recorded disposition escalate with 10 blocking and 4 uncertain findings. G3 stays open and unsigned. No unit content changed.

## Outcome

- ✅ Impact: evidence report, summary and advisory tracker row for Unit 7 G3.
- 🧪 Tests: check:content 14/14 pass; report validates; render-review not performed (prohibited by the brief).
- 📁 Files: report JSON, evidence folder, tasks.md row, this PHR.
- 🔁 Next prompts: separate author repair of the listed findings, then a fresh reviewer run.
- 🧠 Reflection: all gates passed while the source attributions were wrong; only reading the paper exposed it.

## Handoff (for CEO and agents)

- Shipped / changed: advisory G3 report for GICP-400 Unit 7 at specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0.json.
- Decisions the team must respect: Unit 7 is not G3 reviewed. Do not repair content inside a review run. The Dean full text was retrievable, so the old access limit no longer excuses the attributions.
- Pending / next owner: author repair job for the 10 blocking findings; owner ruling on how the unit treats the ideology strand and Dean's finding on Islamic education and exclusionary citizenship; browser and A4 inspection on a host where it is allowed. This is repair round 1 of ADR-0019's limit of 2.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: bound source excerpt carried invented framework labelled as paraphrase; librsvg renders var() SVGs solid black; first read of the assessment exposed part of the key.
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS (format only).
- Prompt variant (if applicable): crew review_en brief.
- Next experiment (smallest change to try): have reviewers read the assessment with the answers section cut off at the first read.
