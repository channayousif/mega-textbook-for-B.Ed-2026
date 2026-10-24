---
id: 0865
title: Check crew status and open PRs
stage: general
date: 2026-10-24
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "status-check", "ops"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0865-check-crew-status-and-open-prs.general.prompt.md
tests:
 - none (read-only status check)
---

## Prompt

check crew status and open prs

## Response snapshot

Crew is stalled: every 15-min tick since about 2026-10-22 has logged "disk free <8192 MB; not launching" (150 ticks; / is 95% full, 6.5 GB free). Board: running 0, queued 6, ready 1, batched 3, red 2, merged 309; all workers ok; 81 units await owner G3 sign-off. Red: batch PR #317 (rls/e2e failed on ECONNRESET to Supabase, same intermittent pattern as #318; build passed) with cifix1 queued; gqur-301-u07-translate failed 3 times and needs the lead. Open PRs: #317 (crew batch GQUR-301 U13 figures, GSOS-301 U3 review, U6 author) and #320 (GPKS-402 intake D-2026-0074, build green, awaiting owner). Largest reclaimable disk: 9 GB of stale worktrees under .claude/worktrees (TEX-45, TEX-90, s2-courses, crew-weekly-maint-intel at ~2.2-2.4 GB each), 3.7 GB ~/.cache.

## Outcome

- Impact: none; read-only.
- Tests: none.
- Files: this PHR only.
- Next prompts: free disk (prune stale worktrees) to unblock crew; re-run #317 CI; merge #320 after D-2026-0074 confirm; decide on gqur-301-u07-translate.
- Reflection: the disk guard fails silently from the owner's view; the digest should flag a launch stall.

## Handoff (for CEO and agents)

- Shipped: nothing.
- Decisions to respect: none new.
- Pending: owner to approve worktree cleanup (crew blocked until disk >8 GB free); #317 CI re-run; #320 owner merge; gqur-301-u07-translate lead decision (stop or repair_en first).
- Affected: crew queue (6 queued jobs), PR #317, PR #320.

## Evaluation notes (flywheel)

- Failure modes observed: crew silently idle ~37 h on disk guard.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment: add disk-stall alert to crew digest.
