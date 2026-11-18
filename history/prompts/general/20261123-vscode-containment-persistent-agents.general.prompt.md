---
id: 20261123
title: Contain VS Code preserve agent sessions
stage: general
date: 2026-11-04
surface: agent
model: GPT-6 Codex
feature: none
branch: main
user: a2ahs
command: implement approved maintenance plan
labels: [board-direct, codex, host-maintenance]
links:
  spec: specs/maintenance/vscode-containment/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/heavy.sh
 - scripts/development/
 - ops/development/
 - tests/ops/test_development_containment.py
 - specs/maintenance/vscode-containment/
 - AGENTS.md
 - README.md
 - history/prompts/general/2026-11-04-vm-resilience-investigation.md
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

A previous agent produced the plan below to accomplish the user's task. Implement the plan in a fresh context. Treat the plan as the source of user intent, re-read files as needed, and carry the work through implementation and verification.

# VS Code containment with persistent Claude sessions

## Summary

Treat VS Code Remote SSH as the primary incident contributor. Terminating its extension hosts freed approximately 4.3 GiB and coincided with recovery from blocked I/O. The specific extension responsible remains unproven.

Preserve multiple VS Code windows and terminal-based Claude Code. Enforce one shared editor budget, while Claude sessions run independently and survive editor disconnections.

## Implementation changes

**Reduce editor scanning and identify the extension**

- Back up existing settings and record extension versions before changes.
- Apply remote-machine watcher and search exclusions for dependencies, generated builds, caches, virtual environments, and Git objects. Keep authored content searchable and watched. Add repository-specific exclusions for generated review renders and video output.
- Open project folders rather than the home directory.
- Use an extensions-disabled baseline, then Extension Bisect and extension-host profiles to identify the offender. Disable the confirmed offender on this host pending a verified fix; do not blame a particular installed extension without evidence. Follow Microsoft’s [watcher diagnostics](https://github.com/microsoft/vscode/wiki/File-Watcher-Issues).

**Enforce aggregate resource budgets**

Create persistent systemd user slices with these initial limits:

| Group | MemoryHigh | MemoryMax | Swap maximum | CPU quota |
|---|---:|---:|---:|---:|
| Development parent | 5 GiB | 6 GiB | 512 MiB | 150% |
| All VS Code windows | 2.5 GiB | 3 GiB | 256 MiB | 100% |
| Persistent agent sessions | 3 GiB | 4 GiB | 256 MiB | Inherit parent |

- Editor and agent groups are siblings beneath the development parent; their combined usage cannot exceed its budget.
- Keep ordinary SSH sessions, gateways, production services, and databases outside these groups. Preserve existing outer user limits.
- Route Remote SSH through a dedicated SSH key and host alias. Its forced-command wrapper starts the remote command inside the editor slice using `systemd-run --user --scope`, preserving command arguments, stdin, exit status, and required SSH forwarding. Keep the normal SSH identity unchanged for recovery.
- Close existing editor connections during rollout so reconnects cannot reuse an old, uncontained server. Verify every server, watcher, extension host, and integrated terminal belongs to the editor slice.
- Test the wrapper against the installed Remote SSH transport before activating limits. Do not patch versioned VS Code binaries or rely on periodically moving processes after launch.
- An editor limit may terminate editor processes and disconnect windows. Do not automatically restart them into a crash loop.

**Preserve Claude Code outside VS Code**

- Start a dedicated tmux server through a persistent systemd user service in the agent slice, using its own socket.
- Provide `agent-terminal <session-name>` to create or attach to named sessions from VS Code terminals or ordinary SSH.
- Claude runs inside those sessions; only the attaching terminal client belongs to the editor group.
- Existing Claude processes cannot gain this protection merely by attaching tmux afterward. Finish or explicitly resume existing sessions during migration, without silently terminating them.
- Preserve working directories and normal shell configuration. Do not copy credentials into service definitions. Claude survives editor failure, but remains subject to its own resource budget.

**Add admission checks and diagnostics**

- Retain the maximum of two heavy jobs. After obtaining a slot, queue while available memory is below 3 GiB or memory/I/O PSI `some avg10` exceeds 10%. Require 30 seconds of healthy readings before admission; time out after 30 minutes with exit code 75.
- Sample slice memory, events, PSI, disk latency, and editor process roles every 30 seconds, with bounded log retention. Record metadata only, excluding command arguments and credentials.
- Warn locally when editor usage exceeds 2.5 GiB for 60 seconds. Use the kernel limits for containment; avoid broad process-name kill rules.
- Update contributor instructions, the investigation report, and the required PHR during implementation.

## Validation and rollout

- Keep an independent SSH connection open and save editor buffers before reconnecting through the new alias.
- Verify multiple windows share one budget and that reconnects and server updates remain contained.
- Run a harmless heartbeat in a persistent agent session. Stop the editor group and confirm the heartbeat survives and can be reattached from SSH and VS Code.
- Test resource-limit behavior with a small disposable cgroup, without exhausting production RAM.
- Check editing, search, Git, file refresh, terminal attachment, and forwarding. Observe one normal workday for memory growth, throttling, disk stalls, and site responsiveness.
- Roll back by restoring settings and the original SSH alias. Remove limits only after contained workloads have stopped; preserve tmux sessions.

## Assumptions and boundaries

- Multiple remote windows remain supported; disconnecting VS Code under excessive usage is acceptable.
- Budget values are conservative initial defaults. Any increase requires measured headroom while retaining the aggregate production safeguard.
- Client-side SSH configuration requires an owner-applied step if the client machine is inaccessible.
- No VM resizing, additional OCI resources, swap removal, OS upgrade, or production stress testing.
- Reusing CI artifacts remains a separate follow-up requiring the ADR-0008 deployment decision to be revisited. It is not a prerequisite for fixing this VS Code incident.

## Response snapshot

Installed user budgets, persistent tmux, remote exclusions, monitoring and pressure admission. Live local checks passed. Dedicated client key and actual Remote SSH rollout remain pending. Supplied Windows PowerShell key-generation steps.

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
