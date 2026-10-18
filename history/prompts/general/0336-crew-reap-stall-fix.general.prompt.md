---
id: "0336"
title: "Crew reap stall fix"
stage: general
date: 2026-10-18
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-reap-fix
user: M Yousif Channa
command: crew status / yes, fix it and open the PR
labels: ["board-direct", "crew", "ops", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/crew.mjs
 - history/prompts/general/0336-crew-reap-stall-fix.general.prompt.md
tests:
 - node --check scripts/crew/crew.mjs
 - git add -A --sparse --dry-run in the three stuck job worktrees (old form exit 1, new form exit 0, no .crew/node_modules staged)
 - node --test tests/crew/*.test.mjs
---

## Prompt

crew status

yes, fix it and open the PR

## Response snapshot

crew status showed the board unchanged for 2 hours. The 3 "running" jobs (geng-301-u00-salvage-cifix1,
gsos-301-u00-salvage-conflict1, gpks-402-u00-salvage-conflict1) had exited 0 on 2026-10-17 between 14:39
and 15:16 host time, but every tick since (53 in cron.log) failed in reap: `git add -A --sparse ':!.crew'
':!node_modules'` exits 1 because the exclude pathspecs name gitignored paths. The throw aborted the whole
reap loop, so all 3 slots stayed held and the 40 queued jobs never launched. Fix: plain
`git add -A --sparse` plus `/.crew/` and `/node_modules` in the shared info/exclude (excludeCrewFiles), and
per-job try/catch in reap (reapOne) so one job's error is logged once on that job and the rest proceed.

## Outcome

- Impact: the crew resumes reaping and launching on the first tick after merge.
- Tests: listed above.
- Files: scripts/crew/crew.mjs.
- Reflection: the stall was silent; status still said "all workers ok". A stale-running alert is a candidate follow-up.

## Handoff (for CEO and agents)

- Shipped: reap fix in scripts/crew/crew.mjs.
- Decisions to respect: none new.
- Pending: owner merges (scripts/ is protected). After the next tick, gsos-301-u00-salvage-conflict1 will
  commit a merge whose ci.yml differs from main (5 lines removed); PR #165 then touches .github/ and will
  not auto-merge; the owner should check that ci.yml diff before approving.
- Paperclip issues affected: none (Paperclip paused).
