---
id: 0858
title: Batch auto-resolve shared registries
stage: general
date: 2026-10-23
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/batch-registry-resolver
user: M Yousif Channa
command: board-direct crew fix
labels: ["board-direct", "crew", "batch"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/registries.mjs
 - scripts/crew/crew.mjs
 - tests/crew/registries.test.mjs
tests:
 - node --test tests/crew/*.test.mjs (54/55; the 1 failure, workers.test.mjs avoid chain, also fails on main)
 - replay of GSOS-301 U6 c3fcbed6 onto origin/main through the resolver steps; check:content 13/13
---

## Prompt

yes, open the PR for the batch resolver

## Response snapshot

Added `mergeGlossary(base, ours, theirs)` to `scripts/crew/registries.mjs` (pure, three-way, per term: main keeps its entries and order, an edit only the branch made is kept, branch-only new terms follow, main's removals stay removed, null on non-array JSON) and `resolveSharedConflicts(wt)` in `scripts/crew/crew.mjs`. When an hourly batch merge conflicts only in `glossary.json` and/or `static/content-status.json`, the batch resolves it (glossary via mergeGlossary, content-status regenerated) and commits the merge instead of aborting and queueing a merge-fix job. Any other conflict still aborts as before; the registry-damage and content gates still run on the batch. Three unit tests added. Replaying the real GSOS-301 U6 conflict gave the same result as the hand merge (4 terms appended, registryProblems clean, check:content 13/13).

## Outcome

- ✅ Impact: concurrent unit branches no longer burn merge-fix jobs on append-at-end glossary and generated status conflicts.
- 🧪 Tests: 3 new tests pass; 1 pre-existing failure unrelated.
- 📁 Files: registries.mjs, crew.mjs, registries.test.mjs.
- 🔁 Next prompts: extend to terminology.csv / decisions log if those conflicts recur.
- 🧠 Reflection: shared append-only registries need a mechanical merge, not an agent.

## Handoff (for CEO and agents)

- Shipped / changed: batch-side resolver for glossary.json and static/content-status.json conflicts.
- Decisions the team must respect: in an automated glossary merge, main's entries are never changed or reordered.
- Pending / next owner: owner merge; effective on the control checkout's next pull after merge. Pre-existing workers.test.mjs failure is unowned.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: GSOS-301 U6 exhausted 5 merge fixes against the same two files.
- Graders run and results (PASS/FAIL): crew tests PASS (new); check:content PASS on replay.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): count auto-resolved merges in the batch PR body.
