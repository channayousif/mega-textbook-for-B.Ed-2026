---
id: 0866
title: Clean worktrees and rerun PR 317
stage: general
date: 2026-10-24
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "ops", "disk"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/317
files:
 - history/prompts/general/0866-clean-worktrees-rerun-pr-317.general.prompt.md
tests:
 - crew tick --dry-run (would launch batch-20261023-1645-cifix1 and intel-2026-10-24-distill)
---

## Prompt

yes, clean up worktrees and rerun #317

## Response snapshot

Re-ran failed jobs of CI run 39989454243 (PR #317, attempt 2). Removed eight worktrees that were clean with nothing unpushed: .claude/worktrees/TEX-45 (stale "initializing" lock), .claude/worktrees/crew-weekly-maint-intel, ~/wt-batch-resolver (#316 merged), ~/wt-e2e-fix (#318), ~/wt-gpks-intake (#319), ~/wt-gqur-guide (#293), ~/wt-tick-fix (#314), /tmp/gqur-u13-main-baseline (detached). Branches kept. Disk free went from 6636 MB to 26263 MB, clearing the crew's 8192 MB launch guard. Kept: TEX-90 (agent/TEX-43, 16 dirty files, 16 unpushed commits), s2-courses (content/efmp-304-units-2-6, 7 dirty, 7 unpushed), TEX-28, ~/wt-geng301-log (no PR found), ~/wt-gpks-intake2 (#320 open), and all crew-wt job worktrees.

## Outcome

- Impact: crew unblocked after ~37 h idle on the disk guard.
- Tests: crew tick dry-run confirms launches resume.
- Files: this PHR only (worktree removals are outside the tree).
- Next prompts: decide fate of TEX-90 and s2-courses unpushed work; #320 owner merge; gqur-301-u07-translate decision.
- Reflection: the crew digest should alert on a disk-guard stall.

## Handoff (for CEO and agents)

- Shipped: disk freed; #317 CI re-run started.
- Decisions to respect: TEX-90 and s2-courses worktrees hold unpushed work; do not remove without owner review.
- Pending: owner on #320, gqur-301-u07-translate, the two kept worktrees; crew will launch #317 cifix1 on the next tick, possibly redundant if the re-run goes green.
- Affected: PR #317, crew queue.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment: n/a
