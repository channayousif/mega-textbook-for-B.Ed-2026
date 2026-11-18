---
id: 20261178
title: Commit heavy-job admission control and the development containment kit
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/heavy-admission-and-dev-slices
user: M Yousif Channa
command: none
labels: [board-direct, ops, host]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/heavy.sh
  - AGENTS.md
  - scripts/development/ (wait-for-headroom.py, agent-terminal, development-monitor, install.py, verify-live.py, authorize-editor-key.py, vscode-ssh-command)
  - ops/development/ (README.md and five systemd units)
tests:
  - scripts/heavy.sh true
  - python and bash syntax checks
---

## Prompt

1. ok
2 yes
3. yes
4. All dashboards need proper redesign, optimized for user accessibility and smooth operations (UI/UX) (inspired by https://demos.themeselection.com/materio-mui-nextjs-admin-template-free/demo), the language selector icon and reading tools icon "Aa" need a fresh self explainatory looks
5. udu looks fine

## Response snapshot

Items 1 and 2 (this PR): the memory and I/O pressure admission in scripts/heavy.sh (a slot is followed by 30 healthy seconds with MemAvailable at least 3 GiB and PSI some avg10 at most 10%, timing out after 30 minutes with exit 75) and its AGENTS.md rule existed only as uncommitted edits in the owner's main checkout, together with the untracked development containment kit (scripts/development and ops/development). Both files were unchanged on main, so the edits applied cleanly. Every kit file was read for secrets first: none (the README uses a placeholder host; the key script accepts public keys only). The systemd units carry the limits the owner raised on 2026-11-08: development-agents.slice MemoryHigh=5G, MemoryMax=6G and development.slice MemoryHigh=7G, MemoryMax=8G. Items 3 and 4 follow in their own PRs under the approved plan; item 5 needs no work.

## Outcome

- ✅ Impact: worktrees, the crew and CI checkouts get the same admission control the main checkout had; the containment kit is versioned.
- 🧪 Tests: scripts/heavy.sh true acquired a slot, waited for headroom and ran; Python and Bash syntax checks pass.
- 📁 Files: heavy.sh, AGENTS.md, scripts/development, ops/development.
- 🔁 Next prompts: PR B header controls and captions, then the dashboard rebuild.
- 🧠 Reflection: uncommitted ops changes in one checkout silently do not apply to worktrees.

## Handoff (for CEO and agents)

- Shipped / changed: scripts/heavy.sh admission control and the development containment kit are in git.
- Decisions the team must respect: never bypass heavy.sh admission under pressure; the systemd units in ops/development are the record of the host's slice limits, so change them there and in ~/.config/systemd/user together.
- Pending / next owner: none.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): heavy.sh smoke test PASS; syntax PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
