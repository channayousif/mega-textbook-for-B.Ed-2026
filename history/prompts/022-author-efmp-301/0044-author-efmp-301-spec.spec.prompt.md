---
id: "0044"
title: "Author EFMP-301 completion feature spec"
stage: spec
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: "orchestrator task assignment (sp.specify flow)"
labels: [spec, efmp-301, educational-psychology, semester-1, completion, sdd]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-book-for-B.Ed-2026/pull/66
files:
  - specs/022-author-efmp-301/spec.md
  - specs/022-author-efmp-301/checklists/requirements.md
tests:
  - none
---

## Prompt

Orchestrator assignment (from the owner prompt "complete the remaining uncomplete courses of
semester 1"): complete EFMP-301 Educational Psychology, which currently has only Unit 1
(the golden unit). Extend the existing Unit-1-scoped content-spec to the guide-determined
full course, re-run G0/G1 intake, author units 2+ through the full bilingual pipeline, PR.

## Response snapshot

Created the feature spec for 022-author-efmp-301 on branch 022-author-efmp-301
(pre-assigned number, no auto-detect). Three stories: (P1) course completed and accessible
with Unit 1 preserved byte-identical; (P2) quality standards and gates; (P3) sources
verified and Urdu parity. Eleven FRs covering the content-spec extension (derived units 2+
partition per D-2026-0012), evaluator intake under the pre-allocated D-2026-0043..0052
block, per-unit authoring through the Spec 008 structure with figures and gates, advisory
G3/G5 reviews, the golden-unit freeze (FR-010), and tracker extension without touching
Unit 1 rows. Edge cases: derived partition ownership, open-access guide URLs vs
D-2026-0001, Unit 1 review findings escalated not applied, Unit 1's open G5 row gaining
advisory evidence only.

## Outcome

- ✅ Impact: feature spec created and validated against the quality checklist (all items pass).
- 🧪 Tests: none at spec stage.
- 📁 Files: specs/022-author-efmp-301/spec.md, specs/022-author-efmp-301/checklists/requirements.md.
- 🔁 Next prompts: plan, then tasks, then the content pipeline.
- 🧠 Reflection: the golden-unit freeze is a first-class requirement (FR-010) rather than a convention note, because this is the first completion feature whose course contains a certified published unit.

## Evaluation notes (flywheel)

- Failure modes observed: none; the assignment was captured in full and routed to the feature directory.
- Graders run and results (PASS/FAIL): not applicable at spec stage.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
