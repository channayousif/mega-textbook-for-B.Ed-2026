# VM resilience investigation, 2026-11-04

## Evidence

Read-only inspection at approximately 21:07 local time (UTC+5). Host: 2 CPUs, 11,925 MiB RAM, 4 GiB swap. Root disk: 76% used, 47 GiB available. Available RAM after recovery: 8,197 MiB.

Sysstat sa04 records the incident between approximately 20:00 and 20:50: load 55-72, 58-70 blocked tasks, 55-69% CPU I/O wait during the worst intervals. sda at 20:10 and 20:20 averaged 307 ms and 275 ms request latency, queue depth 71-76, and approximately 95 MB/s reads. Swap remained about 2.57 GB used, with low swap-in rates during most of the prolonged stall. Thus this was substantial disk-read contention and memory pressure, but continuous swap thrashing alone is not established. File-cache reclaim, workload reads and storage throttling require further discrimination.

Existing persistent user-1005.slice controls: MemoryHigh=8 GiB, MemoryMax=9 GiB, MemorySwapMax=1,572,864,000 bytes. CPU quota unlimited. Cumulative memory.events: high=6,811,494, max=0, oom=0, oom_kill=1. These counters lack timestamps and cannot independently attribute the current incident. memory.peak=9,402,847,232 bytes. earlyoom is running, configured to act at 8% available RAM AND 15% free swap. Incident samples still had roughly 20% available RAM and 39% free swap, so those thresholds do not cover this type of stall.

scripts/heavy.sh enforces two cooperative locks, without a RAM/pressure admission check or kernel-enforced job budget. scripts/deploy-prod.sh still installs dependencies and builds on production, although CI already uploads site-build.

## Recommended durable design, pending recovery context

1. Put agent workers, builds and their browser children into a dedicated aggregate systemd slice. Keep interactive SSH and essential application services outside that slice. Initial candidate aggregate limits: MemoryHigh=5 GiB, MemoryMax=6 GiB, MemorySwapMax=512 MiB, CPUQuota=150%, CPUWeight=20 and IOWeight=20. These are starting values for measured validation, not established capacity. CPU quota caps aggregate CPU time but does not dedicate a CPU; I/O weights depend on controller and device support. Apply a hard aggregate limit so two jobs cannot each consume the full VM budget. Keep the existing outer user limits as defense in depth.
2. Route every worker launcher through this slice, including other repositories, scheduled agents, browser tools and deployment jobs. Moving only scripts/heavy.sh leaves bypass paths. Check actual child cgroup placement. Separate per-job cgroups allow a failed job to be terminated without killing the whole crew or SSH. Do not cap the entire shared user to these candidate limits.
3. Add memory and PSI admission checks to the heavy wrapper after acquiring a slot: queue while MemAvailable is below 3 GiB or sustained memory/I/O pressure is excessive. Retain the owner-authorized maximum of two slots, but allow pressure to admit fewer. Add bounded queue times and visible refusal diagnostics. A start check alone cannot protect against later growth; the slice is essential.
4. Replace production npm ci/build with download of the successful exact-SHA CI site-build artifact, validate archive paths and expected bilingual files, stage the release, then publish with rollback. Preserve exact-SHA CI success gating. Confirm artifact retention, permissions, output reproducibility and deployed configuration before changing deployment. This revises ADR-0008 and needs owner consent for an ADR.
5. Add pressure-aware monitoring with cooldown and persisted measurements. Stop admission first; only terminate an identified disposable worker cgroup under a documented escalation policy. Keep production, SSH and DB processes outside the victim set. Record cgroup events, PSI, disk latency, disk space and workload identity. Investigate failed logrotate separately with privileged logs.
6. Validate with one representative bounded job in a quiet period, observe SSH/site/DB responsiveness, then validate two only if capacity permits. Do not stress production into another outage. Verify persistence after a planned reboot and keep a tested rollback for unit files and launchers.

## Constraints and outstanding evidence

No host settings changed, processes killed, services restarted or cloud resources provisioned. No heavy tests launched. Shared ChatGPT URL returned only a landing page; requested recovery details from owner. Privileged journal, Docker statistics and service changes are unavailable because sudo requires a password. Obtain incident kernel logs, earlyoom logs, recovery commands, and per-container budgets before selecting final values. Existing user services include proxies and gateways, which must be classified before changing aggregate placement. Remain within existing OCI Always Free allocation; do not resize or add storage.

Reference: https://www.freedesktop.org/software/systemd/man/252/systemd.resource-control.html

## Implemented containment, 22:08-22:16 local

The owner-supplied recovery context identifies VS Code Remote SSH as the primary incident
contributor: ending extension hosts reportedly freed approximately 4.3 GiB and coincided
with blocked-I/O recovery. This is recovery evidence, not independent proof of a particular
extension. No installed extension has been blamed or disabled without profiling evidence.

Installed development.slice (5G high, 6G max, 512M swap, 150% CPU), with editor and agent
siblings using the approved budgets. Kernel values verified. Existing outer user limits
remain 8G high, 9G max and 1,572,864,000 bytes swap. Gateways and ordinary SSH remain in
their existing groups. No production services were restarted. Existing uncontained editor
and Claude processes were deliberately preserved.

Machine settings and top-level extension versions backed up under
`~/.local/state/development-containment/backups/20261104T220825853461/` before changes;
the expanded exclusions and dedicated server settings are in the subsequent installation
backup `20261104T220903432527/`. Private sampled metadata has a bounded four-file retention.
The dedicated tmux server and monitor are enabled and active with zero restarts.

Local forced-command checks preserved stdin, literal dollar/backtick arguments and exit 23.
A heartbeat in a tmux pane beneath development-agents.slice survived stopping the editor
slice; the named session remained available. This tmux build creates tmux-spawn scopes
beneath the agent slice, so ancestry is the invariant, not membership in the service's
exact leaf cgroup. The test session was removed. A disposable 32M cgroup rejected an 80 MiB
allocation; the user journal confirmed `oom-kill` at 22:10:15. No host memory exhaustion or
production stress was attempted. Three lightweight admission tests passed, covering
thresholds, healthy-window reset and missing-data timeout. Systemd unit verification,
shell/Python syntax and whitespace checks passed.

The dedicated SSH public key is still owner/client supplied. Windows 11 PowerShell key
creation instructions were provided. Real Remote SSH transport/forwarding, multiple-window
ancestry, reconnect/update behavior, full editor workflows, extension bisect/profile and a
normal workday observation remain pending. A separate VS Code server install path prevents
accidental reuse of old uncontained servers. The old server must close only after buffers
and Claude migration are handled explicitly. The server-side implementation alone does not
retroactively contain those existing processes. See `ops/development/README.md` and
`specs/maintenance/vscode-containment/tasks.md` for rollout and rollback. ADR-0008 CI-artifact
deployment reuse remains a separate owner decision; no deployment changes were made.

## Dedicated editor key authorized, 22:41 local

Owner supplied a dedicated Ed25519 public key. Verified fingerprint
`SHA256:PeK7+uTFWoiy2jLlYIKYVnTA4Lsf1PfQgGJINRGr/hE` and appended exactly one
forced-command entry using `scripts/development/authorize-editor-key.py`. Existing
authorized_keys content was preserved byte for byte; file mode is 0600. Backup:
`~/.local/state/development-containment/backups/20261104T224128491765/authorized_keys`.
Editor slice and agent-tmux service are active. Client alias/settings and real Remote SSH
verification remain owner-side pending steps. Existing connections were not stopped.

## Client SSH alias placement verified

The owner ran the dedicated alias from Windows and supplied:

```text
0::/user.slice/user-1005.slice/user@1005.service/development.slice/development-editor.slice/run-u481.scope
```

This confirms client SSH command placement under the editor budget. It does not yet
verify the VS Code server, watchers, extension hosts, integrated terminals or forwarding.
Next: merge the dedicated `remote.SSH.serverInstallPath` mapping in local VS Code user
settings, open a new connection through textbook-editor, then check terminal cgroup
ancestry. Preserve existing Claude sessions pending explicit migration.

## Actual VS Code terminal remains uncontained

Owner supplied `0::/user.slice/user-1005.slice/session-22454.scope` from the
VS Code terminal. Read-only inspection found a newly started CLI launcher (PID 346300)
inside development-editor.slice/run-u551.scope, but its executable and CLI data
paths remain under `.vscode-server`. The active server (PID 4074773) and terminal
host (PID 4076031) started at approximately 20:58 and remain in session-22454.scope.
The dedicated `.vscode-server-contained` directory contains only prepared settings,
with no installed server. Thus SSH containment works, but the real editor reused
the old uncontained server; the dedicated installation path has not taken effect.
Requested only the client's Remote - SSH `SSH Resolver called for` and
`remote.SSH.serverInstallPath` log lines to distinguish alias/settings mismatch
from transport behavior. No processes stopped, moved or patched. VS Code transport
acceptance remains unchecked; preserve old Claude sessions pending migration.

## Effective client setting missing, 23:24 resolver evidence

Owner-provided Remote - SSH log confirms alias `textbook-editor` and effective
`remote.SSH.serverInstallPath = {}`. Thus the dedicated path mapping is absent from
the effective local configuration. Both useLocalServer and useExecServer are false;
no transport change is warranted on this evidence. The resolver reads the client's
`C:\Users\admin\.ssh\config_a2ahs.txt`. Next: set the exact alias mapping in the
active local VS Code user profile, reconnect, verify the effective log value and
terminal ancestry. No host processes or settings changed in this diagnostic turn.

## Actual dedicated editor ancestry verified

Owner supplied terminal ancestry in development-editor.slice/run-u708.scope. Read-only
inspection confirmed dedicated server PID 435564, extension host 437271, watcher 437319
and terminal host 437551 all share that scope. Original server and its Claude sessions
remain outside and were preserved. Editor usage at inspection was approximately 1.08 GiB.
The live legacy transport uses `.vscode-server-contained/.vscode-server` as its server
data root. Prepared settings had been one level above; copied watcher/search exclusions
into the actual Machine settings directory and updated installer to prepare both layouts.
No server restart. Explicit application forwarding, multiwindow/reconnect/update checks,
Claude migration, extension profiling and workday observation remain pending.
