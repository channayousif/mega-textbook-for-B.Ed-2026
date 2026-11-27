---
id: 20261301
title: Reviewer account live and main ruleset switched to required CI
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: crew
branch: docs/phr-ruleset-switch
user: M Yousif Channa
command: none
labels: [board-direct, crew, ci, governance, ops]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/crew/20261301-ruleset-required-ci-reviewer-live.green.prompt.md
tests:
  - crew batch PR #927 approved by textbookcompk-rewiewer and merged without --admin
---

## Prompt

merged and key is saved, collaboration account connected

## Response snapshot

- Verified #926 merged (09:20Z) and that `~/crew-system` (the cron tick's checkout) has `scripts/crew/reviewer.mjs`.
- The owner saved the token as `GITHUB_PAT_REVIEWER=`; the crew reads `REVIEWER_GH_TOKEN`. Rewrote `~/.crew/mega-book/reviewer.env` to `REVIEWER_GH_TOKEN=...`, mode 600 (backup `reviewer.env.bak`, mode 600). The token resolves to `textbookcompk-rewiewer`, permission write.
- Checked that nothing pushes directly to main: no script does, and every first-parent commit on main since 2026-10-15 is a PR merge.
- Updated ruleset 22506050 ("Protect the main"): kept deletion, non_fast_forward and the 1-approval pull_request rule; added required_status_checks `changes`, `build`, `figure-geometry`, `rls`, `e2e` (GitHub Actions, non-strict); `bypass_actors: []`. Previous JSON saved in `~/backups/worktree-leftovers/ruleset-22506050-before-20261127.json`.
- End to end: crew batch #927 went BLOCKED/REVIEW_REQUIRED under the new rule, then at the next tick the crew approved it as `textbookcompk-rewiewer` and merged it (09:45Z) without `--admin`.

## Outcome

- ✅ Impact: a PR with red or pending CI can no longer reach main by any route, and approvals come from a separate account.
- 🧪 Tests: #927 merged through the new path.
- 📁 Files: this PHR (the change itself is a GitHub setting and a host-local secret file).
- 🔁 Next prompts: watch the first owner-session PR go through `pr_review` (agy, agy2, codex).
- 🧠 Reflection: check secret files against the documented key name before declaring a feature live.

## Handoff (for CEO and agents)

- Shipped / changed: ruleset 22506050 now requires CI and has no bypass; reviewer account `textbookcompk-rewiewer` approves crew PRs and reviewed owner PRs.
- Decisions the team must respect: never `gh pr merge --admin` (it no longer works); owner-session PRs wait for the crew's independent `pr_review` approval; emergency only: owner disables the ruleset, merges, re-enables.
- Pending / next owner: first `pr_review` on an owner PR (this PR is a candidate); ADR suggested (`/sp.adr independent-reviewer-and-required-ci`), owner to decide.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the owner's secret used a different key name than documented.
- Graders run and results (PASS/FAIL): end-to-end crew merge PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have the crew warn when reviewer.env exists but holds no `REVIEWER_GH_TOKEN`.
