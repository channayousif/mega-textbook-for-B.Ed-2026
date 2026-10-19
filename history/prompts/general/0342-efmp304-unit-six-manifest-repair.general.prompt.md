---
id: 0342
title: EFMP304 Unit Six Manifest Repair
stage: general
date: 2026-10-18
surface: agent
model: GPT-6
feature: content-pipeline
branch: crew/efmp-304-u06-translate-r1
user: owner
command: crew brief
labels: [board-direct, translation, efmp-304]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/unit-assessment.mdx
  - specs/content/efmp-304/translations/unit-06/handoff.md
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/reviews/unit-06/G2/
tests:
  - npm run check:content
  - npm run figures:variants:check
  - node scripts/prepare-gate-evidence.mjs EFMP-304 6
  - Six-page metadata and component comparison
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued existing translation work. Converted the ten MCQ option sets and answer
references to Urdu letters without changing their order or meaning. Diagnosed the
stale G2 manifest as a handoff edit after evidence preparation. Freeze bound inputs
before preparing replacement evidence and updating its tracker reference.

## Outcome

- Impact: Complete draft Urdu mirror retained and deterministic freshness repaired.
- Tests: Metadata/components match for six pages; 780 figure variants pass. Conditional parity, figures and terminology pass; open G4/G5, stale G2 and temporary stale status report are expected findings during the temporary flip. Final gate results recorded below after execution.
- Files: Assessment, handoff, G2 evidence/logs, tracker and this record.
- Next prompts: Independent G5 including full-page RTL and A4 render inspection.
- Reflection: Editing a bound handoff after preparing evidence invalidates that evidence.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu MCQ option lettering and deterministic G2 freshness repair.
- Decisions the team must respect: Translation remains draft; G4 remains in progress, G3/G5 unchanged. No build, server, push or PR under this brief.
- Pending / next owner: Fresh independent G5 and rendered inspection remain with reviewer.
- Paperclip issues affected: Existing TEX-49/TEX-50 context only; no external issue changed.

## Evaluation notes (flywheel)

- Failure modes observed: Bound handoff changed after evidence preparation; Latin option labels remained in Urdu assessment.
- Graders run and results (PASS/FAIL): Initial content run FAIL only for stale Unit 6 G2; conditional checks passed structural/figure/terminology checks with expected open review rows. Final results pending execution.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Verify replacement evidence after committing all bound inputs.
