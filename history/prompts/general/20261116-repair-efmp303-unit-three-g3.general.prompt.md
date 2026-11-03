---
id: 20261116
title: Repair EFMP303 Unit Three G3
stage: general
date: 2026-11-03
surface: agent
model: GPT-6
feature: content-efmp-303
branch: crew/efmp-303-u03-repair_en
user: crew
command: Read .crew/brief.md
labels: [codex, crew, efmp-303, unit-03]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/efmp-303/unit-03/
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/
  - specs/content/efmp-303/
  - static/img/figures/efmp-303/unit-03/
tests:
  - npm test (347 passed)
  - npm run check:content (final evidence recorded in unit handoff)
  - origin/main content gate comparison
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing figure-repair commit. Repaired source claims, worked examples, two-axis planning classifications, cognitive-demand labels, marking guidance, concept mappings and figure descriptions in English and draft Urdu. Recorded advisory repairs without G3 certification.

## Outcome

- Impact: Addressed the actionable findings of 20261102T212207Z-g3-desk-4e7be754.json.
- Tests: All 347 unit tests passed; content gates and G2 evidence tracked in the repair handoff.
- Files: Unit 3 topics, assessment, teacher notes, governance tables and figure descriptions.
- Next prompts: Fresh independent G3 with blind solving and page inspection; owner reconciles G1.
- Reflection: Existence of a source is not evidence for every claim. Bound passage locations and scope are explicit.

## Handoff (for CEO and agents)

- Shipped / changed: Bilingual draft repairs, source passage records, semantic mappings and advisory tracker row.
- Decisions the team must respect: G3/G5 remain open, translation_status remains draft; no source waiver or new G1 approval inferred. Hypothetical examples are not observations.
- Pending / next owner: Curriculum owner reconciles G1 and any approved figure-plan deviation; fresh independent reviewer obtains actual author provenance, freezes inputs and solves assessment before keys. Browser checks were prohibited by the crew brief, so page renders and browser text measurement remain pending. Existing figure repairs are preserved.
- Paperclip issues affected: No ticket supplied; crew job efmp-303-u03-repair_en.

## Evaluation notes (flywheel)

- Failure modes observed: Figure descriptions lagged repaired assets; source table and assessment mappings were structurally valid but semantically incorrect. Baseline comparison requires a real git worktree, not an archive, because evidence enumerates tracked files.
- Graders run and results (PASS/FAIL): npm test PASS; content result recorded in repair handoff.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Fresh independent review with keys withheld until solving is complete.
