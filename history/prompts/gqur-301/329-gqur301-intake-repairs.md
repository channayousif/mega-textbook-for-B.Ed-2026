---
id: 329
title: "GQUR-301 intake repairs"
stage: repair
date: 2026-10-10
surface: agent
model: LongCat-2.0
feature: gqur-301
branch: agent/tex-41
user: curriculumlead
command: revise-topic
labels: ["bilingual-author", "gqur-301", "intake-repairs"]
links:
  spec: null
  ticket: TEX-41
  adr: null
  pr: null
files:
  - specs/content/gqur-301/content-spec.md
  - specs/content/gqur-301/tasks.md
tests:
  - check:content (all gates pass except pipeline gate - expected)
---

## Prompt

G0/G1 intake result (D-2026-0049) with owner rulings (D-2026-0053). Make all author repairs from intake, fix tasks.md G1 claims, comment "repairs done" and set in_review.

## Response snapshot

Applied all repairs: readings (baboons→Babones, zaslow→CUP 2020, lock2008→Wiley 2012, openstax-stats→2023, siegfried2020 removed), coverage (guide refs, week schedule, locator), structure (checklist topics aligned, Unit 5 concept-map added), tasks.md G1 claims reverted. All content gates pass except pipeline gate (expected: draft + G2 in-progress).

## Outcome

- ✅ Impact: intake gaps addressed; spec ready for re-evaluation
- 🧪 Tests: all content gates pass except pipeline gate
- 📁 Files: content-spec.md, tasks.md
- 🔁 Next prompts: board re-runs intake; on approval continue authoring Units 3-6
- 🧠 Reflection: the board pushed intake evaluation and owner rulings to the branch before my run; pulling first was essential

## Handoff (for CEO and agents)

- Shipped / changed: content-spec.md (readings, coverage, structure repairs), tasks.md (G1 claims reverted)
- Decisions the team must respect: siegfried2020 removed (not open access); baboons resolved to Babones; Unit 5 concept-map added
- Pending / next owner: board re-runs intake on fresh manifest; on approval spec moves to status:approved
- Paperclip issues affected: [TEX-41](/TEX/issues/TEX-41)

## Evaluation notes (flywheel)

- Failure modes observed: initial PATCH to in_review failed (no review path); resolved by staying in_progress with repairs-done comment
- Graders run and results: all content gates pass except pipeline gate
- Prompt variant: null
- Next experiment: null
