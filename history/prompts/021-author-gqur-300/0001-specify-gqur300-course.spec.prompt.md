---
id: "0001"
title: "Specify GQUR-300 course authoring"
stage: spec
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 021-author-gqur-300
branch: 021-author-gqur-300
user: M Yousif Channa
command: /sp.specify
labels: ["course-authoring", "gqur-300", "quantitative-reasoning", "spec", "bilingual"]
links:
  spec: specs/021-author-gqur-300/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/021-author-gqur-300/spec.md
  - specs/021-author-gqur-300/checklists/requirements.md
tests:
  - Specification quality checklist (all items pass)
---

## Prompt

(Full verbatim orchestrator brief for this session; stage-relevant core below. The brief
assigns: course GQUR-300 Quantitative Reasoning-I, semester 1, bilingual: true, placement
docs/semester-1/gqur-300/ degree track, authoritative guide "Scheme-and-Course-guides/
extracted-text/1st 2026.txt" lines 549-715 with explicit Unit 1-6 headings, spec number
021 pre-assigned, branch 021-author-gqur-300, D-code block D-2026-0040..0049, G-code
block G-2026-28..30, worktree base 39c9a95, full authoring pipeline Phases 0-6 including
G0/G1 intake evaluation, per-unit authoring with nine-part topic cycles, SVG figures with
Urdu variants, G3/G4/G5 on every unit, final gates and PR. Hard prohibitions: no edits
outside the worktree, no em dash, no new dependencies, G3/G5 advisory only, pre-allocated
code blocks only, never push to main.)

Author GQUR-300 Quantitative Reasoning-I course content. Follow the sp.specify process to
fill specs/021-author-gqur-300/spec.md from the spec template, modelled on
specs/018-author-geng300/spec.md. Stories: (P1) course fully authored and accessible,
(P2) quality standards and all gates, (P3) sources verifiable + Urdu parity. Include edge
cases (guide-silent week schedule -> D-2026-0012; print monographs -> D-2026-0001).

## Response snapshot

Created feature branch `021-author-gqur-300` (worktree base verified 39c9a95) and wrote
the course authoring specification. The spec defines 6 units per the guide's explicit
headings (Foundations of Quantitative Reasoning; Numbers and Operations; Algebraic
Reasoning; Measurement and Geometry; Data Analysis and Statistics; Quantitative Reasoning
in Everyday Life), with 5 CLOs verbatim from the guide. User stories cover course
accessibility (P1), quality standards and gates (P2), and source verifiability plus Urdu
parity (P3, bilingual: true so full Urdu mirrors are in scope). Functional requirements
cover intake evaluation, content-spec creation, 6-unit authoring, governance artefacts,
figure generation with Urdu variants, gate validation, Urdu mirrors, and legacy
placeholder-tree replacement. Success criteria include the pre-assigned D-code block
D-2026-0040..0049 (never "next free").

## Outcome

- Impact: Specification ready for `/sp.plan`
- Tests: All checklist items pass
- Files: 2 files created (spec.md, checklists/requirements.md)
- Next prompts: `/sp.plan`, then `/sp.tasks`
- Reflection: GQUR-300 differs from the GENG-300 model in three ways that the spec must
  carry: 6 units (not 4), bilingual: true (full G4/G5 Urdu scope), and degree-track
  placement (docs/semester-1/, not licence/). The guide lists 5 learning outcomes and 4
  recommended readings, two of which are print monographs (Steen; Grawe) that will need
  D-2026-0001 flagging at G1.

## Evaluation notes (flywheel)

- Failure modes observed: specs/018-author-geng300/spec.md is not present in the worktree
  base (it lives on the sibling 018 branch); read it via `git show 018-author-geng300:...`
  from the shared object database instead of touching the main checkout.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
