---
id: 20261132
title: Repair EFMP-406 Unit 3 draft Urdu and refresh G2 evidence
stage: general
date: 2026-11-06
surface: codex
model: GPT-6
feature: content-pipeline
branch: crew/efmp-406-u03-translate-r1
user: crew
command: Read .crew/brief.md
labels: [codex, crew]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/
  - specs/content/efmp-406/tasks.md
  - specs/content/efmp-406/reviews/unit-03/G2/
tests:
  - npm run check:content
  - Temporary reviewed parity check, reverted to draft
  - Four Urdu MDX files compile and match heading and metadata structure
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing four-page Urdu mirror and eight figure variants. Corrected mistranslations and restored hedges; refreshed stale deterministic G2 evidence with the repository tool. Recorded delivery in the existing open G4 row without certification.

## Outcome

- ✅ Impact: Draft translation repaired and stale G2 evidence replaced.
- 🧪 Tests: Initial content run failed only on Unit 3 stale G2. Fresh eight-command G2 run passed. Temporary reviewed parity run had only expected unfinished G4/G5 and derived status staleness. Final content run: all 14 gates PASS, recorded in continuation logs.
- 📁 Files: Four Urdu MDX files, tracker, fresh G2 evidence and logs, continuation handoff and this PHR.
- 🔁 Next prompts: Independent G5 and authorised render/geometry inspection.
- 🧠 Reflection: Translation handoff files are English G2-bound inputs even when Urdu SVG variants are correctly excluded.

## Handoff (for CEO and agents)

- Shipped / changed: Continued commit 2a19c0a7d; repaired obvious Urdu meaning and register errors, generated fresh G2 evidence and updated tracker notes.
- Decisions the team must respect: English prose unchanged. Translation remains draft. No new G4 row or G3/G5 certification; no push or PR.
- Pending / next owner: Independent reviewer owns G5; authorised browser host owns Nastaliq, narrow viewport, A4 and SVG geometry checks prohibited by this brief. Proposed terms remain listed in translations/unit-03/handoff.md.
- Paperclip issues affected: EFMP-406 Unit 3 crew job; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Existing evidence predated seven committed translation handoff/log files. Urdu draft had literal mistranslations and a lost modal hedge.
- Graders run and results (PASS/FAIL): G2 eight deterministic draft commands PASS; source structure and MDX checks PASS; final check:content all 14 gates PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run independent rendered bilingual comparison in a permitted session.
