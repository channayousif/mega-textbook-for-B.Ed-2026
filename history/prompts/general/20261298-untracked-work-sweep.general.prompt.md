---
id: 20261298
title: Untracked work sweep and Urdu draft badge wording
stage: general
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/urdu-badge-not-yet-reviewed
user: M Yousif Channa
command: none
labels: [board-direct, ops, cleanup, worktrees]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/TranslationStatusBadge.tsx
  - history/prompts/general/20261298-untracked-work-sweep.general.prompt.md
tests:
  - none (label text only; no test references the string)
---

## Prompt

is there any unfinished and untrached work remaining?

## Response snapshot

Read-only sweep of the main checkout, all 21 worktrees, open PRs and the day log, then (after plan approval and owner answers) cleanup:
- Main checkout: discarded 25 `static/studio/flashcards/**` JSON rewrites (build-studio-index side effect). Removed untracked `scripts/ops/claude-usage.mjs` and its test: already on main via PR #901, local copies differed only in comments (backed up to `~/backups/worktree-leftovers/`).
- Removed clean worktrees whose PRs had merged (crew-media-resources, maint-2026-w47-d1-review1, mb-phr-linkedin, mb-agy2, wt-pacing, an old scratchpad worktree) and `crew-wt/efpg-401-u01-plan_illustrations` (crew board: merged; same work on main as 7181c08f5/8be05fa39).
- `wt-lanes`: early draft of the news ticker superseded by PR #712; diff and its 0054 migration backed up, worktree removed.
- `wt-selfcheck`: PR #742 merged; 190 stale staged changes (an old snapshot that would delete GCCE-400 Unit 7) saved as a patch in `~/backups/worktree-leftovers/`.
- `wt-vs005`: 3 unpushed VS-005 bench commits rebased on main, 7/7 bench tests and check:no-media pass, PR #918.
- `wt-hec`: parked as WIP commit edfa6d06a on `feature/hec-curriculum-reference`, tracked by issue #919.
- `wt-urdu-badge`: this PR; the draft badge says "not yet reviewed" instead of "not yet human-reviewed".

## Outcome

- ✅ Impact: no uncommitted or unpushed non-crew work left on the host except `wt-selfcheck` (backed up, owner may remove).
- 🧪 Tests: video-bench 7/7 (PR #918); claude-usage 3/3 before removal.
- 📁 Files: one component label line, this PHR.
- 🔁 Next prompts: decide on issue #919 (HEC reference); remove `~/wt-selfcheck` once the backup patch is accepted.
- 🧠 Reflection: the main checkout lags origin, so "untracked" files may already be merged; always compare against origin/main before treating them as new work.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu draft badge wording (this PR); PR #918 (VS-005 bench); issue #919 (parked HEC reference).
- Decisions the team must respect: owner chose to park the HEC reference, not finish it now; the wt-lanes draft is superseded by #712 and was dropped.
- Pending / next owner: owner on #919; crew still owns in-flight jobs (efpc-411 u01/u02, gqur-301 u06) and today's local crew commits; #910 and #914 remain open.
- Paperclip issues affected: none (GitHub #918, #919).

## Evaluation notes (flywheel)

- Failure modes observed: stale worktrees accumulate when sessions end on usage limits.
- Graders run and results (PASS/FAIL): video-bench PASS, check:no-media PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a weekly read-only worktree report in the crew maintenance survey.
