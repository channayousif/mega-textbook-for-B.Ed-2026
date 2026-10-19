---
id: 0041
title: Continue Unit Three Urdu
stage: green
date: 2026-10-18
surface: agent
model: GPT-6
feature: gict-300
branch: crew/gict-300-u03-translate-r1
user: owner
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "crew", "gict-300", "translation", "G4"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/unit-assessment.mdx
  - specs/content/gict-300/tasks.md
  - specs/content/gict-300/reviews/unit-03/G4/translation-handoff.md
  - history/prompts/gict-300/0041-continue-unit-three-urdu.green.prompt.md
tests:
  - "npm run check:content (initial, temporary reviewed and final draft runs)"
  - "Direct seven-file metadata, heading, component, glossary, URL, figure and assessment parity assertions"
  - "npm run figures:variants:check"
  - "npm run build:content-status (generated report only)"
  - "git diff --check"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Resumed the merged complete seven-file Urdu mirror, repaired literal register and assessment wording, checked parity and terminology, updated the existing in-progress G4 row and handoff, and committed locally without pushing or opening a PR. All pages remain draft; independent G3/G5 and fresh rendering remain with the review owner.

## Outcome

- ✅ Impact: Completed the requested G4 continuation without changing English content or certification state.
- 🧪 Tests: All 13 final draft content gates pass; direct parity assertions and figure-variant freshness pass. Temporary reviewed run only reports unfinished G4/G5 and the initially missing generated status report; both index edits were restored.
- 📁 Files: Four Urdu MDX files, Unit 3 G4 tracker note and handoff, and this PHR.
- 🔁 Next prompts: Review owner: resolve accepted G3 and arrange fresh independent G5 plus desktop, narrow and A4 inspection.
- 🧠 Reflection: The complete translation was already merged into origin/main; continue with bounded repairs and preserve the independent review boundary.

## Handoff (for CEO and agents)

- Shipped / changed: Disk-reading, payroll, double-click and clarity wording repaired; topic register improved; parity and terminology checked.
- Decisions the team must respect: Keep translation_status draft and G4 in progress; do not mark G3/G5 done, change the frozen bank, build the site, push or open a PR.
- Pending / next owner: Review owner owns accepted G3 and fresh independent G5/rendering; curriculum owner owns unbanked terminology proposals listed in the unit handoff.
- Paperclip issues affected: None supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Fresh checkout lacked ignored static/content-status.json; regenerated via report script. Temporary reviewed flag deliberately triggers incomplete G4/G5 findings. Python alias unavailable; used python3.
- Graders run and results (PASS/FAIL): PASS: final check:content, direct parity, figure variants, whitespace. Render inspection not run because the brief prohibits builds and servers.
- Prompt variant (if applicable): crew/gict-300-u03-translate-r1
- Next experiment (smallest change to try): Fresh independent review of the frozen Urdu bytes with actual rendering after accepted G3.
