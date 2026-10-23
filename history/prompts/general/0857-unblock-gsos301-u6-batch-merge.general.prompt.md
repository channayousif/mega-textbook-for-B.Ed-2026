---
id: 0857
title: Unblock GSOS-301 U6 batch merge
stage: general
date: 2026-10-23
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/gsos-301-u06-author
user: M Yousif Channa
command: board-direct crew repair
labels: ["board-direct", "crew", "gsos-301"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/314
files:
 - glossary.json
 - static/content-status.json
tests:
 - npm run check:content (13/13 PASS)
---

## Prompt

merge on green, GSOS-301 U6 author still cannot jooin a batch

## Response snapshot

PR #314 (tick.sh resets the generated content-status before merging main): first CI run failed only on a flaky `ENOTEMPTY` rmdir in the review-evidence test cleanup hook; failed jobs re-run with an admin merge on green.

GSOS-301 U6: `gsos-301-u06-author` went gate_red at 15:37Z after 5 merge-fix jobs. Each fix merged main cleanly, but within the hour another batch landed and the branch conflicted again in two files every unit touches: `glossary.json` (every unit appends its terms at the end of the array) and the generated `static/content-status.json`. Merged origin/main by hand in the job worktree: glossary as main's entries in main's order plus the branch's 4 new terms (Social change, Modernization, Poverty, Deviance); main's "Classroom management" entry kept unchanged; content-status taken from main and regenerated. `check:content` 13/13 PASS. Job set back to `ready` on the crew board (not `crew retry`, which would re-author from scratch).

## Outcome

- ✅ Impact: U6 eligible for the next hourly batch.
- 🧪 Tests: check:content 13/13.
- 📁 Files: glossary.json, static/content-status.json (merge commit on crew/gsos-301-u06-author).
- 🔁 Next prompts: make the batch auto-resolve glossary.json (JSON union) and content-status.json (regenerate) instead of sending every such conflict to a fix job.
- 🧠 Reflection: append-at-end shared registries guarantee conflicts between concurrent unit branches; fix jobs cannot win a race against hourly batches.

## Handoff (for CEO and agents)

- Shipped / changed: U6 branch merged with main and ready; crew board edited by the lead under the tick lock.
- Decisions the team must respect: glossary merges keep main's entries untouched; branch entries go after them.
- Pending / next owner: if another batch merges a glossary change first, U6 conflicts again and goes straight to red (5-fix cap reached); systemic batch-side resolver needs owner approval.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: recurring glossary.json / content-status.json conflicts misreported as needing agent merge fixes; 5 fixes spent without progress.
- Graders run and results (PASS/FAIL): check:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): in batchPhase tryMerge, on conflict limited to glossary.json and static/content-status.json, resolve by JSON union and regeneration, then commit.
