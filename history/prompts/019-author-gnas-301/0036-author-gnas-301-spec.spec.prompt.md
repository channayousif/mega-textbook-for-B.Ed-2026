---
id: "0036"
title: "Author GNAS-301 feature spec"
stage: spec
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 019-author-gnas-301
branch: 019-author-gnas-301
user: M Yousif Channa
command: "orchestrator task assignment (sp.specify flow)"
labels: [spec, gnas-301, environmental-science, semester-1, sdd]
links:
  spec: specs/019-author-gnas-301/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/019-author-gnas-301/spec.md
  - specs/019-author-gnas-301/checklists/requirements.md
tests:
  - none
---

## Prompt

Orchestrator assignment (condensed; the verbatim original user prompt is in PHR-0035): author course GNAS-301 Environmental Science, Semester 1, bilingual, placement docs/semester-1/gnas-301/ (degree track), guide block "1st 2026.txt" lines 143-387, spec number 019 pre-assigned, branch 019-author-gnas-301, D-code block D-2026-0020..0029, G-code block G-2026-22..24. Run the sp.specify flow to create the feature spec.

## Response snapshot

Created feature branch 019-author-gnas-301 via create-new-feature.sh (with --number 019, which skips the script's fetch path). Authored specs/019-author-gnas-301/spec.md from the spec template, modeled on 018-author-geng300: three user stories (P1 course authored and accessible in EN+UR, P2 quality standards and gates, P3 verifiable sources + Urdu parity), 11 functional requirements, 7 success criteria, and edge cases for the derived unit partition (D-2026-0012), print monographs (D-2026-0001), and the catalog "3 (2-1)" vs guide "Credit Hours 3" precedence. Planning targets: 6 units, 28 topics, 52 sub-topics from the guide's 16-week topical outline. Quality checklist passes all items.

## Outcome

- ✅ Impact: feature 019 spec created and validated; ready for /sp.plan.
- 🧪 Tests: none (specification stage).
- 📁 Files: specs/019-author-gnas-301/spec.md, specs/019-author-gnas-301/checklists/requirements.md.
- 🔁 Next prompts: /sp.plan then /sp.tasks for feature 019.
- 🧠 Reflection: the GNAS-301 guide numbers its outline by week (Week 1-16), so the week schedule is guide-supplied; only the week-to-unit merge is derived and must be labelled as such per D-2026-0012.

## Evaluation notes (flywheel)

- Failure modes observed: create-new-feature.sh runs `git fetch --all --prune` when --number is omitted; passing --number 019 avoids it (sibling agents share the .git).
- Graders run and results (PASS/FAIL): not applicable.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
