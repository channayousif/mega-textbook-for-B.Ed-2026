---
id: 20261184
title: Remote development docs, containment spec and test, repo and branch clean-up
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: docs/remote-dev-containment
user: M Yousif Channa
command: none
labels: [board-direct, ops, housekeeping]
links:
  spec: specs/maintenance/vscode-containment/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - README.md
  - specs/maintenance/vscode-containment/ (spec, plan, tasks)
  - tests/ops/test_development_containment.py
  - .gitignore
tests:
  - python3 -m unittest discover -s tests/ops -v
---

## Prompt

delete all leftout branches on origin which are already merged on main, cleanup tidyup things on remote and also sync local main with origin, suggest fix for any uncommitted files on local main

go ahead with all four

## Response snapshot

Deleted the 90 origin branches fully merged into main (origin had 120; no PRs were open). Synced the owner's local main, 853 commits behind, by fast-forward: AGENTS.md, scripts/heavy.sh and 13 untracked ops/development and scripts/development files were identical to main and were replaced by it; README.md, package.json and package-lock.json went to a stash; everything was backed up first in ~/backups/local-main-20261108-2256. On approval of all four suggestions: (1) this PR commits the stashed README "Remote development on the production host" section, the containment spec, plan and tasks, and its admission unit test, and ignores __pycache__; the stashed http-proxy dependency and stale package scripts are dropped; (2) scratch files and the SSH host note were deleted from the checkout, with the SSH entry moved to ~/.ssh/config; (3) zips and the untracked course-guide files moved to ~/assets; (4) the origin branches whose PRs were merged or closed but which carried commits not in main were deleted, keeping the two branches with no PR.

## Outcome

- ✅ Impact: origin holds only live branches; the owner's checkout matches main; the containment kit has its docs, spec and test in git.
- 🧪 Tests: tests/ops 3 of 3 PASS.
- 📁 Files: README, containment spec and test, .gitignore.
- 🔁 Next prompts: owner decisions on the uncommitted ADR-0028 draft, the EFMP-304 Urdu course overview (for the crew) and the old Paperclip-era PHRs.
- 🧠 Reflection: delete_branch_on_merge is off for this repo, which is why merged branches accumulated.

## Handoff (for CEO and agents)

- Shipped / changed: remote-development section in README; specs/maintenance/vscode-containment; tests/ops.
- Decisions the team must respect: run python3 -m unittest discover -s tests/ops after changing scripts/development/wait-for-headroom.py.
- Pending / next owner: ADR-0028 draft and the EFMP-304 Urdu course overview remain untracked in the owner's checkout; the crew branch crew/gqur-301-u15-repair_en (16 commits, no PR) was kept.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): unittest PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): turn on automatic head-branch deletion in the repo settings.
