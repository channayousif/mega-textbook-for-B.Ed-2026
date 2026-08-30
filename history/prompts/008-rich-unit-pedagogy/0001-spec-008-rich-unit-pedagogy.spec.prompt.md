---
id: 0001
title: Spec 008 rich unit pedagogy
stage: spec
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 008-rich-unit-pedagogy
branch: 008-rich-unit-pedagogy
user: channayousif
command: /sp.specify
labels: ["content-standard", "unit-structure", "assessment", "figures", "author-unit-skill", "spec-007-successor"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/008-rich-unit-pedagogy/spec.md
 - specs/008-rich-unit-pedagogy/checklists/requirements.md
 - /home/a2ahs/.claude/plans/1-restructure-the-unit-jazzy-river.md
tests:
 - none (spec stage)
---

## Prompt

Original request (verbatim):

> 1. Restructure the unit (eg Unit 1 opening -> topic 1.1 -> topic 1.2 -> ... -> End of unit 1 matter) and each topic with (1.1 topic opening with real life example -> Explanation -> Active/collaborative learning activity -> formative assessment -> Short summary -> self assessment checklist -> apply at practicum school -> summative assessment -> further reading resources) and in the end chapter summary -> Summative Assessment (10 MCQs, 10 RRQs, 5 ERQs) with answers/ruberics in the end. Identify the places where Images can be placed with prompts to generate related image as teaching aids. At the end of course course summary, Practice Questions in all formats and project ideas for practicum in real schools. Create such unit writer reusable skill or sub-agent whichever is appropriate.

Plan-mode research produced the approved plan at
`/home/a2ahs/.claude/plans/1-restructure-the-unit-jazzy-river.md`. Four owner decisions were locked
via AskUserQuestion: (1) deliver as a full SDD feature spec 008; (2) amend the answer-key policy to
permit a bounded `## Answers and marking guidance` final section; (3) per-topic files
(`topic-NN.mdx`) superseding Spec 006 FR-004 in part; (4) figure markers = MDX comment markers +
manifest + a new `check:figures` gate. The `/sp.specify` invocation carried the full design brief
(structure, locked decisions, opt-in/additive guarantee, DoD scope, proving unit, measurable
outcomes) as the feature description.

## Response snapshot

Created feature branch `008-rich-unit-pedagogy` (FEATURE_NUM 008) and wrote `spec.md`:

- **5 prioritised user stories** — P1 author a unit as nested per-topic cycles (the proving-unit
  path); P2 declare a unit's topic partition in the content-spec (the opt-in); P2 automated gates
  catch a structurally incomplete unit with a named reason; P3 self-learner works the assessment
  banks with answers; P3 legacy five-file units keep passing untouched.
- **29 functional requirements** grouped: the unit structure standard + nine-part cycle (FR-001–007);
  the bounded answers-and-marking-guidance policy + the front-matter-ban-retained + LMS-store-unaffected
  carve-out (FR-008–011); figure markers + manifest + gate (FR-012–014); content-spec topic-list
  opt-in + re-baselined depth budget + approved-status gate (FR-015–017); opt-in/additive + depth-gate
  rewrite + coverage-matrix v2 (FR-018–021); the rewritten single skill + reference sync (FR-022–023);
  constitution amendment + FR-004 superseding note + style-guide v3.0 + README (FR-024–027); bilingual
  handoff (FR-028); DoD scoped to EFMP-302 Unit 1 English + Urdu handoff (FR-029).
- **10 measurable success criteria** — 100% checklist partition + coverage completeness; ≥3 scholarly
  sources; first-run gate pass + human Content gate; 100% gate-failure with a named condition for each
  violation class; register unchanged; style-guide reads "3.0"; every legacy unit + add-course stays
  green; every topic has a consistent figure marker; a second author needs zero structure questions;
  built-site answer scan finds answer material only in the bounded sections.
- **Key Entities**, **Assumptions**, **Dependencies** (Constitution v2.5.0→v2.6.0; Specs 001/003/006/007),
  **Out of Scope** (Units 2–6, other courses, golden-unit re-proof, the actual course-review page,
  Urdu re-translation, image generation, a topic teaching-log kind, sidebar grouping).

Also wrote `specs/008-rich-unit-pedagogy/checklists/requirements.md`. All quality-checklist items
pass; no `[NEEDS CLARIFICATION]` markers (the four branching decisions were pre-settled).

## Outcome

- ✅ Impact: Feature 008 specced; branch + spec + quality checklist in place; ready for `/sp.plan`.
- 🧪 Tests: none (spec stage).
- 📁 Files: `spec.md` (new), `checklists/requirements.md` (new), approved plan file referenced.
- 🔁 Next prompts: `/sp.plan` for `008-rich-unit-pedagogy` (design already drafted in the approved
  plan file — the plan run will formalise plan.md / research.md / data-model.md / contracts / quickstart).
- 🧠 Reflection: The spec deliberately names concrete artefacts (file roles, canonical headings,
  gate conditions) per the Spec 007 precedent, because the structure itself is the deliverable;
  tech choices stay out and belong in plan.md.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): spec quality checklist — PASS (16/16).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during `/sp.plan`, confirm the depth-gate rewrite keeps
  the legacy path byte-for-byte (regression floor is SC-007).
