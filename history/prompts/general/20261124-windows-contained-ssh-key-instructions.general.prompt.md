---
id: 20261124
title: Explain Windows contained SSH key generation
stage: general
date: 2026-11-04
surface: agent
model: GPT-6 Codex
feature: none
branch: main
user: a2ahs
command: answer Windows key-generation question during rollout
labels: [board-direct, codex, host-maintenance]
links:
  spec: specs/maintenance/vscode-containment/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261124-windows-contained-ssh-key-instructions.general.prompt.md
tests:
 - Python unittest admission tests (3 passed)
 - systemd-analyze user unit verification
 - Live wrapper streams and exit-status check
 - Agent heartbeat survival across editor stop
 - Disposable 32 MiB cgroup OOM confirmed in journal
 - Real heavy-wrapper admission and command exit 75 preserved
 - Shell/Python syntax and git diff whitespace
---

## Prompt

how to generate on windows 11

## Response snapshot

Open PowerShell, generate a dedicated Ed25519 key with ssh-keygen, and send only the .pub line. Microsoft OpenSSH documentation checked.

## Outcome

- ✅ Impact: Server-side implementation active; existing workloads preserved.
- 🧪 Tests: Three admission tests passed; live wrapper/heartbeat/OOM checks passed. Client transport and workday observation pending.
- 📁 Files: Focused host-maintenance assets, instructions, investigation and PHRs.
- 🔁 Next prompts: Owner supplies public key; authorize and validate actual Remote SSH with client.
- 🧠 Reflection: tmux panes use separate scopes beneath agent slice on this host. Validate ancestor rather than exact leaf.

## Handoff (for CEO and agents)

- Shipped / changed: Budgets, tmux, sampler, admission, exclusions and setup/rollback documentation.
- Decisions the team must respect: Keep ordinary SSH and outer limits; never silently terminate existing Claude; no extension attribution without evidence.
- Pending / next owner: Owner/client key and alias; actual Remote SSH, forwarding, window/update checks, bisect/profile and normal-workday observation.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial live assertion assumed tmux service leaf; corrected to validated agent-slice ancestry. Inline scratch test quoting failed before execution and was replaced by reusable Python script.
- Graders run and results (PASS/FAIL): PASS local checks; PENDING client-dependent checks.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Connect two real VS Code windows through dedicated identity and check all child cgroups.
