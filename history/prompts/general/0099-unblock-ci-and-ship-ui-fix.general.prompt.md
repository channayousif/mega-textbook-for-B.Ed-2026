---
id: 0099
title: Unblock CI and ship UI fix
stage: general
date: 2026-10-06
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/ci-u3-manifest-and-ui
user: channayousif
command: none
labels: ["board-direct", "ci", "deploy", "pipeline-gate", "efmp-302", "ui", "openclaw"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/112
files:
  - specs/content/efmp-302/tasks.md
  - src/css/custom.css
  - src/theme/Root.tsx
tests:
  - node scripts/check-pipeline-gate.mjs (pass)
  - npx tsc --noEmit (only an unrelated index.tsx JSX-namespace error from the stale node_modules symlink)
  - PR #111 CI (build + e2e)
---

## Prompt

check if that ui task is live

ok fix

## Response snapshot

- Not live: 38f64a91 existed only on the stale local main (65 behind origin) and was never pushed. Separately, prod was held on 71dfa698 because CI on origin/main had failed since #103.
- Root cause of the CI failure: #103 (TEX-29) added a 🟡 provisional Unit 3 G3 row backed by `reviews/unit-03/G3/AGY_CONVERSATION_ID.json`, which has a placeholder reviewer_run_id and a stale input manifest. TEX-27 (#104, D-2026-0046) had already refused that publication.
- Fix (PR #111, branch fix/ci-u3-manifest-and-ui, worktree off origin/main): removed that row, which makes the pipeline gate pass. Cherry-picked the UI commit, resolving Root.tsx/custom.css conflicts by keeping main's RouteAnalytics and reading-typography refresh plus the print handler and justification rule. Removed one em dash.

## Outcome

- Impact: once #111 is green and merged, the deploy job releases everything merged today, including the UI fix.
- Follow-up: the Unit 5 row at tasks.md:115 also cites a placeholder-identity report. The gate's placeholder regex misses `AGY_CONVERSATION_ID`.
- Reflection: an OpenClaw worker committed to the stale shared checkout. Workers need a fresh worktree off origin/main.

## Handoff (for CEO and agents)

- Shipped: #111 (merged 14da9b6d) unblocked CI on main and carried the desktop justification, equal figure widths and print-image fixes. #112 withdraws the Unit 5 provisional row and tightens `acceptProvisionalReport`.
- Decisions to respect: a report whose `reviewer_run_id` is a template token (e.g. `AGY_CONVERSATION_ID`) or has zero duration is not evidence of an independent review, and the gate now refuses it. Agents must record their real Paperclip run id.
- Pending: EFMP-302 Unit 3 needs a fresh G3 cycle (G-2026-70). The extra Unit 5 cycle granted by D-2026-0046 is still owed. Owner: CEO TEX (ProgramManager).
- Affected issues: TEX-29 and TEX-31 (their provisional rows are withdrawn), TEX-27.

## Follow-up prompts (same session)

propose fix for still open..

all accepted. go on

- PR #112 (stacked on #111): `acceptProvisionalReport` now refuses bare `*_ID` template run identities and zero-duration reviews. The Unit 5 🟡 row is withdrawn, with a note that the D-2026-0046 Unit 5 cycle is still owed. G2 evidence was regenerated for 41 units, because editing a bound validator re-binds every manifest. Gate: 2 certified, 0 provisional, 41 gate-checked. Review tests 40/40.
- OpenClaw (outside repo, .bak-20261006 backups): `paperclip-board` now triggers on any CEO-addressed message and forbids doing that work locally. TOOLS.md and `discord-claude-code` now require a fresh worktree off origin/main plus push and PR, never committing in the shared checkout.
- Local checkout reset is pending the #111 merge: `backup/38f64a91` branch, then `git reset --keep origin/main`.
- The owner chose an admin merge of #111 (a review approval was required). Merged as 14da9b6d.
- Local checkout: `backup/38f64a91` created, then `git reset --keep origin/main`. The README.md edit and untracked files were kept.
