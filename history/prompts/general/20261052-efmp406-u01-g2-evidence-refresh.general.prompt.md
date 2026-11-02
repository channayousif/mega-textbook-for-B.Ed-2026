---
id: 20261052
title: Refresh EFMP-406 Unit 1 G2 evidence after main merge
stage: general
date: 2026-11-02
surface: agent
model: claude-opus-5-5
feature: 006-content-pipeline
branch: crew/efmp-406-u01-translate
user: crew owner
command: Read .crew/brief.md and carry it out completely
labels: ["claude", "crew", "efmp-406", "urdu-translation", "g2-evidence"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-406/tasks.md
  - specs/content/efmp-406/reviews/unit-01/G2/20261102T120245720Z-gates.json
  - specs/content/efmp-406/reviews/unit-01/G2/logs-20261102T120245720Z/
  - history/prompts/general/20261052-efmp406-u01-g2-evidence-refresh.general.prompt.md
tests:
  - npm run check:content (13/13 pass after refresh)
  - node scripts/prepare-gate-evidence.mjs EFMP-406 1 (all draft gates PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

The Urdu translation of EFMP-406 Unit 1 was already committed by the previous attempt (2b035154). This attempt merged origin/main into the branch, regenerated Unit 1 G2 gate evidence with `scripts/prepare-gate-evidence.mjs` because the old manifest was stale, repointed the Unit 1 `G2 en-draft` tracker row at the new evidence file, and reran `npm run check:content`: all 13 content gates pass. Committed locally; no push, no PR.

## Outcome

- ✅ Impact: Clears the stale G2 manifest finding that blocked the job; Urdu mirror unchanged.
- 🧪 Tests: npm run check:content exit 0 (13/13 gates).
- 📁 Files: tasks.md (one G2 row repointed), new G2 evidence JSON and logs, this PHR.
- 🔁 Next prompts: Independent G5 Urdu review of Unit 1.
- 🧠 Reflection: Merging main can stale a unit's G2 manifest even when the unit's own files are untouched; regenerate evidence after every main merge.

## Handoff (for CEO and agents)

- Shipped / changed: Fresh Unit 1 G2 evidence (20261102T120245720Z) and the tracker row pointing at it; merge of origin/main into the branch.
- Decisions the team must respect: translation_status stays draft; no G4 tracker row appended (translate-unit Step 7 forbids it); G3/G5 remain open; terminology bank unchanged.
- Pending / next owner: Independent G5 reviewer; render inspection (Playwright/A4/narrow) still not run for the Urdu pages; owner rulings on proposed terms in specs/content/efmp-406/translations/unit-01/handoff.md.
- Paperclip issues affected: Crew job efmp-406-u01-translate; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Stale G2 input manifest after main merge.
- Graders run and results (PASS/FAIL): PASS: npm run check:content (13/13).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Have the crew run `prepare-gate-evidence.mjs --refresh-stale` scoped to the job's unit after each main merge.
