---
id: 2454
title: Repair Unit 12 advisory findings
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 (Codex; exact version unavailable)
feature: none
branch: crew/gqur-301-u12-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "gqur-301", "unit-12"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-12/topic-01.mdx
  - docs/semester-2/gqur-301/unit-12/topic-02.mdx
  - docs/semester-2/gqur-301/unit-12/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/unit-assessment.mdx
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-12/repair-20261105.md
tests:
  - npm run check:content (baseline and repaired state)
  - scripts/heavy.sh npm test
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied bounded English and Urdu repairs from the latest G3 report. Added actual paired practice data and a coordinate plot, a scored analysis task, precise definitions and conditional assessment guidance. Recorded already-repaired baseline SVG geometry and left G3/G5 open.

## Outcome

- ✅ Impact: Resolves authorable semantic and assessment findings without certification.
- 🧪 Tests: Baseline all 14 content gates passed. Final checks pending; refresh stale Unit 12 G2 evidence after committing bound inputs.
- 📁 Files: Six EN/UR MDX pages, advisory tracker row, author repair handoff, this PHR and scoped deterministic G2 evidence.
- 🔁 Next prompts: Host to arrange fresh independent review, authorised browser/print inspection, provenance and G1/source evidence.
- 🧠 Reflection: Missing coordinates require conditional reasoning; axis rescaling has no fixed stronger/weaker visual rule.

## Handoff (for CEO and agents)

- Shipped / changed: Parallel English and Urdu repairs plus traceable author record.
- Decisions the team must respect: G3/G5 remain open; no publication or translation status changes; SVG source already separated at origin/main.
- Pending / next owner: Host/owner: provenance, G1/intake authority, inspected source bundle and fresh independent review within cycle limits; authorised reviewer: actual browser and print artifacts.
- Paperclip issues affected: gqur-301-u12-repair_en; no external issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Reviewed SVG overlap had already been repaired in baseline. Editing English invalidates deterministic G2 inputs; preserve history and refresh only this unit.
- Graders run and results (PASS/FAIL): Baseline content gates PASS; repaired gates and unit tests pending.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Inspect current light/dark figures at narrow width and A4 under explicit browser authorisation.
