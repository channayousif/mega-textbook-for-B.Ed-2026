---
id: 0900
title: Free leftover crew merge-fix worktrees
stage: general
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-free-conflict-worktrees
user: M Yousif Channa
command: (board-direct) crew status, then "ok, fix all"
labels: ["board-direct", "crew", "worktrees", "bugfix"]
links:
  spec: null
  ticket: null
  adr: history/adr/0030-crew-replaces-paperclip-control-plane.md
  pr: null
files:
 - scripts/crew/crew.mjs
 - tests/crew/worktrees.test.mjs
 - ~/.crew/mega-book/board.json (lead edit under tick.lock; backup board.json.bak-20261028-conflictfix)
tests:
 - npm run test:crew (82 pass, including the new freeBranch test)
---

## Prompt

ok, fix all

(Context: answering my proposal after "crew status". The two prompts before it, "check rls failed" and "crew status", were read-only. The RLS failure on main's run for #354 was 7 test files timing out at 30 s, with no assertion failing; the next main run passed.)

## Response snapshot

**Bug:**
- A merge fix (`<job>-conflictN`) gets its own worktree when its parent's folder was dropped while it waited for a batch.
- `cleanup()` skips every job with a parent, and the fix-success path never removed that folder, so `-conflict1` kept the parent's branch checked out.
- Every later merge fix then failed at `git worktree add -B` ("already used by worktree ...-conflict1").
- This left 14 leftover folders and 18 red jobs. Four units were stuck at the five-fix limit: GNAS-301 U5/U6 and GQUR-300 U3/U5 `review_en`.

**Code fix (this PR):**
- `freeBranch(board, branch)` runs before `worktree add`. It removes any folder under `WT_DIR` that holds the branch, unless a running job owns it.
- A fix job that finishes successfully removes its own folder when that folder is not its parent's.
- A test against a real git repo covers it.

**Live repair (under `tick.lock`):**
- I removed the 14 leftover `-conflict1` worktrees. Each job was merged and none had unpushed or uncommitted work.
- I closed the 12 dead `-conflict2..4` jobs, which had never launched.
- I requeued the four `-conflict5` merge fixes.
- The board now shows red 2, down from 18: the two GNAS parents, which return to ready when their fixes land.

## Outcome

- ✅ Impact: the four units are moving again, and merge fixes no longer leak worktrees once this merges.
- 🧪 Tests: 82/82 crew tests pass.
- 📁 Files: listed above.
- 🔁 Next prompts: merge this PR; the crew's control checkout picks it up on the next tick.
- 🧠 Reflection: when one function (`cleanup`) assumes a property (a parent shares its worktree) that another (`dropWaitingWorktrees`) breaks, folders leak. Freeing the branch at the point of use is the robust guard.

## Handoff (for CEO and agents)

- Shipped / changed: the `freeBranch` guard, plus self-cleanup on fix success.
- Decisions the team must respect:
  - Merge-fix worktrees are disposable. The branch on origin is the record.
  - A folder that a running job owns is never removed.
- Pending / next owner: the owner merges this PR, which touches protected `scripts/crew/`. Until then the live crew still runs the old code, so a successful `-conflict5` leaves its folder behind; it is harmless, since it is the last allowed fix.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed:
  - Leaked worktrees blocked launches.
  - The board reported "could not join a batch", which hid the real cause, the launch error.
- Graders run and results (PASS/FAIL): test:crew PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): when a launch fails because a branch is already in use, surface that in the stall alert instead of counting it as a merge-fix attempt.
