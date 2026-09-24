---
id: 0001
title: "specify-geng300-course"
stage: spec
date: 2026-09-22
surface: agent
model: LongCat-2.0
feature: 018-author-geng300
branch: 018-author-geng300
user: a2ahs
command: /sp.specify
labels: ["course-authoring", "geng-300", "functional-english", "spec"]
links:
  spec: specs/018-author-geng300/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/018-author-geng300/spec.md
  - specs/018-author-geng300/checklists/requirements.md
tests:
  - All checklist items pass
---

## Prompt

Author a course: GENG-300 · Functional English, see the approved plan

## Response snapshot

Created feature branch `018-author-geng300` and wrote the course authoring specification.
The spec defines 4 units based on the course guide's 3 syllabus sections, with 4 CLOs
mapped across units. User stories cover course accessibility, quality standards, and
source citation. Functional requirements cover intake evaluation, content-spec creation,
unit authoring, governance artefacts, figure generation, and gate validation.

## Outcome

- ✅ Impact: Specification ready for `/sp.clarify` or `/sp.plan`
- 🧪 Tests: All checklist items pass
- 📁 Files: 2 files created (spec.md, checklists/requirements.md)
- 🔁 Next prompts: `/sp.clarify` or `/sp.plan`
- 🧠 Reflection: Course authoring is a content task, not a software feature, but the
  spec template was adapted successfully. The key insight is that the course has 4 CLOs
  (not 5), no week schedule in the guide, and is English-only.

## Evaluation notes (flywheel)

- Failure modes observed: Initial branch number was 001 (already taken); corrected to 018
  after user feedback.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
