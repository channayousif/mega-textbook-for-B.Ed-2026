# VS Code containment and persistent agents

Approved intent: owner-supplied implementation plan, 2026-11-04. This is host maintenance,
not a student workflow or deployment change. Constitution v5.0.0 applies.

Multiple Remote SSH windows share development-editor.slice (MemoryHigh 2560M,
MemoryMax 3G, MemorySwapMax 256M, CPUQuota 100%). Persistent tmux agents use its sibling,
development-agents.slice (3G, 4G, 256M, inherited CPU quota). Both descend from
development.slice (5G, 6G, 512M, 150%). Ordinary SSH, gateways, DB and production
remain outside. Existing outer user limits remain unchanged.

A dedicated client-generated SSH key invokes an unmodified Remote SSH command through
a systemd user scope, preserving stdin, shell quoting, exit status and SSH forwarding.
No process-name kill policy, binary patches or periodic process relocation.

Agents started in the dedicated tmux service survive editor disconnection. Existing
Claude sessions require explicit finish/resume migration. No credentials in unit files.

Heavy jobs retain two host locks, then require MemAvailable >= 3 GiB and both memory
and I/O PSI some avg10 <= 10% continuously for 30 seconds. Admission times out after
30 minutes with exit 75. Unavailable pressure data fails closed.

Diagnostics every 30 seconds store only metadata, bounded to four 5 MiB files plus one
sample. Warn locally after editor memory exceeds 2.5 GiB for 60 seconds. Kernel budgets
enforce containment without automatic editor restart.

Acceptance: wrapper stream/status checks; cgroup ancestry; heartbeat across editor stop;
bounded disposable memory failure; multiple real windows, reconnect/update, forwarding,
editing/search/Git/refresh, and one workday observation. Client-dependent checks remain
pending until a dedicated key and client access are available. No production stress,
OCI allocation, swap removal, OS upgrade or deployment-artifact change.
