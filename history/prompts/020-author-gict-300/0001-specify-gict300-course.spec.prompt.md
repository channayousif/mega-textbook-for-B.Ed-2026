---
id: "0001"
title: "specify-gict300-course"
stage: spec
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 020-author-gict-300
branch: 020-author-gict-300
user: a2ahs
command: /sp.specify
labels: ["course-authoring", "gict-300", "application-of-ict", "spec"]
links:
  spec: specs/020-author-gict-300/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/020-author-gict-300/spec.md
  - specs/020-author-gict-300/checklists/requirements.md
tests:
  - All checklist items pass
---

## Prompt

Orchestrator task (excerpt): "You are the dedicated authoring agent for course GICT-300
(Application of ICT), Semester 1 of the B.Ed (4-Year) programme ... Phase 1 - SDD scaffolding
... Read .claude/commands/sp.specify.md and follow its process to fill
specs/020-author-gict-300/spec.md from .specify/templates/spec-template.md. Model on
specs/018-author-geng300/spec.md. Stories: (P1) course fully authored and accessible, (P2)
quality standards and all gates, (P3) sources verifiable + Urdu parity. Include edge cases
(guide-silent week schedule -> D-2026-0012; print monographs -> D-2026-0001)."

## Response snapshot

Created feature branch `020-author-gict-300` (pre-assigned number 020, short name
author-gict-300) and wrote the course authoring specification. The spec defines 6 units
following the guide's explicit Unit 1-6 headings (31 leaf sub-topics), with 8 CLOs mapped
across units. User stories cover course accessibility (P1), quality standards and gates (P2),
and verifiable sources plus Urdu parity (P3). Functional requirements cover intake evaluation
under the pre-assigned D-2026-0030..0039 block, content-spec creation, 6-unit authoring,
governance artefacts, SVG figure generation with Urdu variants, gate validation, the complete
Urdu mirror (bilingual: true), advisory G3/G5 reviews, and legacy placeholder replacement.

## Outcome

- ✅ Impact: Specification ready for `/sp.plan`
- 🧪 Tests: All checklist items pass (specs/020-author-gict-300/checklists/requirements.md)
- 📁 Files: 2 files created (spec.md, checklists/requirements.md)
- 🔁 Next prompts: `/sp.plan`
- 🧠 Reflection: Unlike GENG-300 (English-only, licence track), GICT-300 is bilingual and
  degree-track, so the spec adds FR-008 (Urdu mirror) and FR-009 (G3/G5 advisory reviews) on
  top of the 018 model. The catalog records 3 (2-1) credit hours against the guide's plain
  "3", consistent with the guide's hands-on practical emphasis; no Art. II.3 conflict.

## Evaluation notes (flywheel)

- Failure modes observed: none. The 018 spec model was directly adaptable.
- Graders run and results (PASS/FAIL): PASS (checklist complete)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
