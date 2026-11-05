---
id: 20261124
title: Repair GENG301 Unit6 G3 Findings
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 (Codex; exact build unavailable)
feature: geng-301-unit-06
branch: crew/geng-301-u06-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: [codex, crew, geng-301, unit-06]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - docs/semester-2/geng-301/unit-06/
  - specs/content/geng-301/concepts/unit-06.md
  - specs/content/geng-301/figures/unit-06.md
  - specs/content/geng-301/sources/unit-06.md
  - specs/content/geng-301/tasks.md
  - specs/content/geng-301/reviews/unit-06/repair-en.md
  - specs/content/geng-301/reviews/unit-06/G2/
  - static/img/figures/geng-301/unit-06/
  - history/prompts/general/20261124-repair-geng301-unit6-g3.general.prompt.md
tests:
  - npm run check:content (repair loop and origin/main baseline)
  - scripts/heavy.sh npm test
  - FIGURE_ROOT=static/img/figures/geng-301/unit-06 node scripts/build-figure-variants.mjs --check
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied F1-F8 author repairs, retained open G3, documented unavailable host provenance/render evidence and missing Urdu mirror. Refreshing G2 evidence after committing repaired inputs.

## Outcome

- ✅ Impact: Repairs address source provenance, worked examples, assessment fairness and coverage, figure meaning and scheduling.
- 🧪 Tests: Content checks initially found stale G2 and generated status cache; baseline confirms cache absence. Final results recorded in repair-en.md.
- 📁 Files: Unit 6 English topics, assessment, notes, concept/source/figure records, tracker and six SVG assets; repair handoff and PHR.
- 🔁 Next prompts: Host supplies genuine provenance, SVG geometry and fresh render evidence; independent review subject to cycle-limit authorisation.
- 🧠 Reflection: Fictional exercise data must be labelled at the point of use and must never authenticate a real source.

## Handoff (for CEO and agents)

- Shipped / changed: F1-F8 repairs with matching rubrics and dark variants; see repair-en.md.
- Decisions the team must respect: G3/G5 remain incomplete; no self-signing, publication or independent-review claims. D-2026-0001 is a retrieval declaration policy only.
- Pending / next owner: Parent/host owns E1/E2, SVG geometry and fresh independent review. No Urdu Unit 6 mirror exists.
- Paperclip issues affected: geng-301-u06-repair_en; no issue ID supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Content edits stale G2 manifests. Geometry tool requires prohibited Playwright; source-only checks cannot certify accessibility.
- Graders run and results (PASS/FAIL): Final deterministic check and test results recorded in repair-en.md after completion.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh host-bound geometry and render inspection, followed by authorised independent review.
