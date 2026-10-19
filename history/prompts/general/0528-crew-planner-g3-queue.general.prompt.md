---
id: "0528"
title: "Crew planner fix and G3 queue"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-planner-g3-queue
user: M Yousif Channa
command: crew status (then: merge #164/#162 now; fix planner + G3 queue)
labels: ["board-direct", "crew", "planner", "g3"]
links:
  spec: null
  ticket: null
  adr: "history/adr/0019"
  pr: null
files:
 - scripts/crew/planner.mjs
 - scripts/crew/crew.mjs
 - tests/crew/planner.test.mjs
 - history/prompts/general/0528-crew-planner-g3-queue.general.prompt.md
tests:
 - node --test tests/crew/*.test.mjs (20 pass)
 - crew.mjs plan --dry-run against a copy of the crew state (15 repair_en planned, 43 units await G3)
---

## Prompt

crew status

(Follow-up answers in the same session: #164/#162 "Merge both now"; G3 gate "Fix planner + G3 queue".)

## Response snapshot

The crew was idle (0 running, 0 queued) with 58 of 60 units short of G3. Causes: (1) the planner
treated translation as done only on a G4 tracker ✅, which needs human initials, so 36 finished Urdu
mirrors looped on translate until the two-merged-runs guard silenced them; (2) latestReport() picked
the alphabetically last JSON in a review folder, manifest.json, so no disposition was ever seen and no
repair_en was planned for 65 revise reports (and the repair brief's G3 findings were empty).
Fix: scripts/crew/planner.mjs (stagesFor, awaitingG3, mirrorComplete, pickLatestReport): translation is
done when every English page has its Urdu file; review_ur waits for an accepted G3; reports are
identified by their disposition and ordered by completed_at. Each plan records board.awaitingG3, shown in
crew status, BOARD.md and the daily digest. #164/#162: owner ruled merge (re-opens GENG-301/GQUR-301
G0/G1); both conflict with main in the shared registries, so they were put back on PR watch with the
owner approval recorded for their 7 protected files each; the crew's merge fix runs, then it merges on
green CI.

## Outcome

- Impact: dry run plans 15 repair_en jobs (was 0); 43 units listed as awaiting G3 sign-off
  (12 pass, 14 escalate, 17 revise with repairs applied).
- Tests: listed above.
- Files: listed above.

## Handoff (for CEO and agents)

- Shipped: planner fix + G3 queue (PR, owner merges; scripts/ is protected).
- Decisions to respect: G3/G5 sign-off stays human (ADR-0019); review_ur is planned only after G3 is
  done. Owner ruled #164 and #162 merge on 2026-10-19 knowing it re-opens GENG-301/GQUR-301 G0/G1.
- Pending: owner merge of this PR; owner G3 sign-off for 43 units; crew merge fixes on #164/#162.
- Paperclip issues affected: none.
