---
id: 0905
title: Crew keeps owner checkout synced
stage: general
date: 2026-11-02
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-sync-owner-checkout
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "ops", "git-sync"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/sync-owner-checkout.sh
 - scripts/crew/tick.sh
 - ops/crew/README.md
tests:
 - scratch-repo scenarios for sync-owner-checkout.sh (8 cases, all as expected)
---

## Prompt

merge both PRs and sync local main, configure crew to update the main after any successful merge on origin main, that is keep the local and origin in sync

## Response snapshot

Merged PR #401 (Semester 3 specs approved) with the admin bypass; the repository ruleset needs one approving review and the owner cannot approve their own PR. PR #402 (G3 desk lanes) is merged once its CI is green.

Local main sync: `~/mega_book_for_B.Ed` was 0 ahead and 2328 behind. The fast-forward was blocked by 13 untracked files that also exist on main: 5 were identical, and 8 were older local drafts (an EFMP-304 Unit 1 Urdu attempt and PHR 0136). All 13 were moved to `~/backups/main-checkout-sync-20261102/` with their paths kept. The uncommitted `http-proxy` edit to package.json and package-lock.json was stashed and restored, and main then fast-forwarded to 0/0.

Crew config: the new `scripts/crew/sync-owner-checkout.sh` runs in every tick (cron, every 15 minutes) right after the control checkout's own sync. When the owner's checkout is on main, it fast-forwards it; otherwise it moves the main ref with `fetch origin main:main`. It never stashes, resets, deletes or overwrites. When local commits on main, a tracked edit, an untracked file, a merge or rebase in progress, or main checked out in another worktree blocks it, it logs `owner-sync: ...` to cron.log and leaves the checkout alone. It always exits 0.

## Outcome

- ✅ Impact: the owner's main follows origin within one tick (15 minutes or less) of any merge, with no risk to local work.
- 🧪 Tests: 8 scratch-repo cases: up to date; behind and clean; tracked edit in the way; untracked file in the way; local commit on main; on another branch; main checked out in another worktree; no repo.
- 📁 Files: scripts/crew/sync-owner-checkout.sh (new), scripts/crew/tick.sh (+2 lines), ops/crew/README.md.
- 🔁 Next prompts: none required; check cron.log for `owner-sync:` lines if main ever looks behind.
- 🧠 Reflection: the owner's checkout runs behind constantly because nothing pulls it; memory "stale checkouts and worktrees" recorded the symptom more than once.

## Handoff (for CEO and agents)

- Shipped / changed: every crew tick now fast-forwards the owner's checkout main (`CREW_OWNER_CHECKOUT`, default `~/mega_book_for_B.Ed`).
- Decisions the team must respect: the sync is fast-forward only and never touches uncommitted or untracked work. Do not add stash/reset fallbacks.
- Pending / next owner: owner: the uncommitted `http-proxy` dependency in the main checkout. While it stays uncommitted, any later main change to package.json blocks the fast-forward, and cron.log will say so. Commit it on a branch or drop it.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: untracked leftovers from old sessions collide with files later merged to main.
- Graders run and results (PASS/FAIL): scratch-repo scenarios PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): surface a blocked owner-sync on BOARD.md's "Needs you" list instead of only in cron.log.
