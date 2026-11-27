---
id: 20261300
title: Why main goes red, and the crew reviewer account
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: crew
branch: feat/crew-reviewer-account
user: M Yousif Channa
command: none
labels: [board-direct, crew, ci, governance]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/crew/reviewer.mjs
  - scripts/crew/crew.mjs
  - scripts/crew/workers.mjs
  - tests/crew/reviewer.test.mjs
  - tests/crew/worker-chains.test.mjs
  - AGENTS.md
  - ops/crew/README.md
  - history/prompts/crew/20261300-reviewer-account-required-ci.green.prompt.md
tests:
  - node --test tests/crew/*.test.mjs (216 pass)
  - node scripts/check-docs-sync.mjs (in sync)
  - crew tick --dry-run against a copied state dir with a dummy reviewer token
---

## Prompt

why main is getting red repeatedly, investigate fix

(Follow-up after the plan was shown:) the condition of one review is also not appropriate because anly one owner account is working on it, no one is there to review it. we can assign new GitHub account to reviewer worker crew which is independent

(Owner answers:) Reviewer account first (keep things as they are until the reviewer account exists, then switch both rules at once); second GitHub user for authentication.

## Response snapshot

Investigation of the last 70 main CI runs: two long red streaks, both in `e2e`. 11-25 22:55 to 11-26 16:30 began with #875/#876 (landing carousels, reviewer section) and ended with #891; 11-26 21:07 to 11-27 02:16 began with #894/#900 (untranslated toggle, chart) and ended with #910. Every starting PR had a FAILURE e2e when it was merged. The `Protect the main` ruleset (22506050) has no required status checks and requires 1 approval, which only `gh pr merge --admin` could satisfy (single owner account), and that bypass also let red PRs through. The crew merges only on all-green; its batches inherited the red main.

Implemented (inert until the owner creates the account):
- `scripts/crew/reviewer.mjs`: token from `~/.crew/mega-book/reviewer.env` only (workers never inherit it), approve/merge/comment args, CI state, which PR heads need review, review job shape, verdict action.
- `crew.mjs`: with the token, crew PRs are approved by the reviewer account, then merged with `--match-head-commit` and no `--admin`; a new `pr-review` phase queues a read-only `pr_review` job (agy, agy2, codex: never anthropic) for each green, non-draft, non-crew PR head; a pass becomes an approval, a revise a review comment. Without the token the old `--admin` merge stays.
- `AGENTS.md`: never merge red or pending PRs or admin-merge past a red check. `ops/crew/README.md`: "Reviewer account" section and step 6.

## Outcome

- ✅ Impact: once the account exists and the ruleset is switched, red PRs cannot reach main and approvals are real.
- 🧪 Tests: crew suite 216/216; docs-sync in sync; dry-run tick ran clean (no PR green yet, so no review queued, which is correct).
- 📁 Files: one new crew module and its tests, crew wiring, stage chain, two docs.
- 🔁 Next prompts: owner creates the reviewer account and token; then switch ruleset 22506050 (required checks changes, build, figure-geometry, rls, e2e; no bypass actors).
- 🧠 Reflection: "PR merged with red CI" was visible in every streak's first PR; a required-check rule would have stopped both.

## Handoff (for CEO and agents)

- Shipped / changed: reviewer-account support in the crew (off until `reviewer.env` exists); AGENTS.md merge rule.
- Decisions the team must respect: no `--admin` merges past red or pending checks; PRs by owner sessions are reviewed only by non-anthropic workers; the ruleset switch waits for the reviewer account (owner, 2026-11-27).
- Pending / next owner: owner: create the account (2FA, Write access) and token, write `~/.crew/mega-book/reviewer.env` (mode 600); lead: then update ruleset 22506050 and confirm the next crew batch merges via the approval. ADR suggested, not created.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: interactive sessions admin-merged PRs with red e2e under time pressure.
- Graders run and results (PASS/FAIL): crew tests PASS; docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): after the switch, watch one week of main runs for any red caused by a merge.
