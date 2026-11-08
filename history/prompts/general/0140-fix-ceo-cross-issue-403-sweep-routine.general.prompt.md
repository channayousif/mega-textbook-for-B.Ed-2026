---
id: 0140
title: Fix CEO cross-issue 403 with sweep routine
stage: general
date: 2026-10-16
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: paperclip-board
labels: ["board-direct", "paperclip", "programmanager", "permissions", "ops"]
links:
  spec: null
  ticket: TEX-85
  adr: null
  pr: null
files:
 - /home/a2ahs/org/textbook/roles/programmanager-claude.md (outside repo; sweep section rewritten)
 - history/prompts/general/0140-fix-ceo-cross-issue-403-sweep-routine.general.prompt.md
tests:
 - Fired routine 7261149e once; CEO run ece55a1b was issue-bound (TEX-89), posted its summary on TEX-58, and recorded 0 cross-issue rejections
---

## Prompt

fix the CEO 403 permissions so it can wake agents

## Response snapshot

The CEO's 403s were not caused by a missing grant. Two server rules in Paperclip (read from `@paperclipai/server/dist`) explain them:
1. `POST /api/agents/:id/wakeup` and `/heartbeat/invoke` are hardcoded so that when an agent calls them, the target must be itself ("Agent can only invoke itself"). No permission key changes this.
2. `cross-issue-influence-limit.js` rejects any agent write to an issue other than the run's own issue unless the run's `contextSnapshot` names an issue (`cross_issue_influence_run_context_required`), with a cap of 20 cross-issue writes per run. The CEO's 2h timer heartbeats had no issue, so every comment, status change and wake-by-comment it tried got 403. Its one assignment-bound run (09:05) had worked.

Fix: created routine "CEO company sweep" (7261149e-8754-4fb3-bc49-e1d42d96bc32), assigned to ProgramManager, cron `0 */2 * * *` UTC, skip_if_active, skip_missed. Each fire creates a sweep issue, so the CEO's run is issue-bound. Turned off the CEO's timer heartbeat (wakeOnDemand stays on). Rewrote the "Regular sweep" section of its instructions: wake agents by commenting on their issue with `resume: true` or by @-mentioning them, never with /wakeup. Unblock with blocked -> todo. Keep to the 20-write budget. Treat stale provider-quota monitors as a resume case. Removed the false claim that @-mentions don't wake agents (`issue_comment_mentioned` exists in code).

Verification: a manual fire created TEX-89. Run ece55a1b was bound to it, posted its summary on TEX-58, closed TEX-89 as done, and the activity log shows `cross_issue_influence_observed` x1 and no rejections.

## Outcome

- ✅ Impact: CEO sweeps can now comment, change status and wake agents (via comments) on any issue.
- 🧪 Tests: one live routine fire, verified via the activity log.
- 📁 Files: CEO instructions (outside repo; backup in session scratchpad) and this PHR.
- 🔁 Next prompts: check the 18:00Z scheduled sweep runs and wakes an idle agent if one is idle.
- 🧠 Reflection: "403" here meant the run had no issue attached, not that a permission was missing; reading the server source settled it quickly.

## Handoff (for CEO and agents)

- Shipped / changed: routine "CEO company sweep" every 2h; CEO timer heartbeat off; CEO sweep instructions rewritten.
- Decisions the team must respect: agents never call /wakeup for another agent; they wake each other by commenting on the target's issue (`resume: true`), with an @-mention, or with blocked -> todo, and only from an issue-bound run. A run can write to at most 20 other issues.
- Pending / next owner: TEX-61 (CurriculumOwner) is still the gate-repair bottleneck; CurriculumOwner config access (`agents:suggest-changes`) was not granted (board, not requested).
- Paperclip issues affected: TEX-85, TEX-58, TEX-89.

## Evaluation notes (flywheel)

- Failure modes observed: an earlier instruction told the CEO to use an endpoint agents are never allowed to call; timer runs have no issue, so their cross-issue writes fail.
- Graders run and results (PASS/FAIL): live sweep PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): apply the same routine pattern to any other agent that needs a periodic cross-issue sweep.
