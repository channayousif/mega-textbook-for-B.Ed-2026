---
id: 0001
title: Content pipeline spec refined
stage: spec
date: 2026-08-24
surface: agent
model: claude-sonnet-5
feature: 006-content-pipeline
branch: 006-content-pipeline
user: channayousif@gmail.com
command: /sp.specify
labels: ["content-pipeline", "spec", "sdd"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/006-content-pipeline/spec.md
 - specs/006-content-pipeline/checklists/requirements.md
tests:
 - none (spec-only stage; no code or automated tests introduced)
---

## Prompt

after teacher dashboard, go for @SDD/006-content-pipeline.md, refine the feature further after evaluating the file

## Response snapshot

Evaluated `SDD/006-content-pipeline.md` (the draft content-authoring-pipeline design: stages
G0–G8, section→file folding rule, CP1–CP10 requirements, division of labour, build plan,
acceptance criteria) against the shipped state of Specs 001/003/005 and the Constitution (Art.
II/III/V/VI/VII) to ground it in what actually exists (golden template, front-matter validators,
`improvement_suggestions` schema, quiz_items backend, EFMP-301 Unit 1 already published from Spec
001's earlier template work).

Created branch `006-content-pipeline` via `create-new-feature.sh --number 6 --short-name
content-pipeline`, then wrote `specs/006-content-pipeline/spec.md` using the spec template:
5 prioritized user stories (course intake→content-spec; EN draft→Content gate; UR
translation/review; task-tracker progress visibility; suggestion-driven revision loop closing
Spec 005's feedback loop), edge cases, 18 functional requirements (FR-001..FR-018, derived from
and renumbering the original CP1–CP10 plus new ones covering stage sequencing, quiz-answer
leakage prevention, and gap escalation), 8 key entities, 7 success criteria, assumptions, and
dependencies.

Identified three scope-significant ambiguities in the original draft (enforcement level of the
pipeline's own gates; whether Definition of Done includes full Sem 1–4 production or just the
golden-unit proof; how G6 quiz-bank authoring — deliberately deferred per Spec 003's backlog note
— should be handled) and resolved them via `AskUserQuestion` rather than silently defaulting, per
CLAUDE.md's Human-as-Tool Strategy. Curriculum owner selected: (1) a new automated CI gate
blocking merge on task-tracker/content-spec/terminology-bank state (FR-016), (2) pipeline-proof-
only scope for this spec's Definition of Done (FR-017), (3) a lightweight git-ignored quiz staging
worksheet as the G6 handoff artifact, never committed (FR-018). Updated the spec's FR-016/017/018,
Assumptions, Edge Cases, Key Entities (added Quiz Staging Worksheet), and Success Criteria (added
SC-007) to reflect the answers, and recorded them in a "Clarifications — Session 2026-08-24"
section. Also corrected the original draft's informal `revises: SUG-123` suggestion-linkage
placeholder to reference Spec 005's real `improvement_suggestions.id` (UUID).

Generated and passed `specs/006-content-pipeline/checklists/requirements.md` (all items checked;
notes document how the three clarifications were resolved). No `[NEEDS CLARIFICATION]` markers
remain in the spec. Feature is ready for `/sp.clarify` (optional, since clarifications are already
resolved) or directly `/sp.plan`.

## Outcome

- ✅ Impact: Produced a refined, fully-specified `spec.md` for the content-authoring pipeline
  (Spec 006), correcting the original SDD draft's suggestion-ID inconsistency and closing three
  scope ambiguities with curriculum-owner decisions, ready for planning.
- 🧪 Tests: none — spec-authoring stage only.
- 📁 Files: `specs/006-content-pipeline/spec.md` (new), `specs/006-content-pipeline/checklists/requirements.md` (new).
- 🔁 Next prompts: `/sp.plan` for Spec 006 (or `/sp.clarify` first if the curriculum owner wants
  to revisit any answer); eventually `/sp.tasks`.
- 🧠 Reflection: The original SDD draft was unusually mature (already had FR-numbered
  requirements, a folding-rule table, and acceptance criteria), so refinement work was mostly
  grounding it against what Specs 001/003/005 actually implemented (not what they were speculated
  to implement when 006 was drafted) and surfacing genuine scope forks rather than rewriting from
  scratch.

## Evaluation notes (flywheel)

- Failure modes observed: none blocking; the original draft's `revises: SUG-123` placeholder
  would have been a real integration bug if carried into `/sp.plan` unchanged (Spec 005 uses UUID
  identifiers, not a `SUG-NNN` numbering scheme) — caught by cross-referencing specs/005 before
  writing FR-011.
- Graders run and results (PASS/FAIL): spec quality checklist — PASS (all items).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
