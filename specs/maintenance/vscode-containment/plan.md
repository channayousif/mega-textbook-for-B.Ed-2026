# Implementation plan

1. Inventory extension versions and back up settings before any overwrite.
2. Install versioned user slices and launchers, without moving existing workloads.
3. Apply remote watcher/search exclusions, keeping authored corpora visible.
4. Start independent tmux and bounded metadata monitoring under the existing user manager.
5. Add pressure admission inside the existing two-slot lock wrapper.
6. Validate local transport semantics, agent ancestry/survival and bounded memory refusal.
7. Authorize a fresh client public key; reconnect through a dedicated alias and isolated
   VS Code server installation; verify actual Remote SSH before accepting rollout.
8. Observe one workday. Restore client alias/settings first on rollback; retain tmux and
   its parent budgets until sessions finish, then restore saved units.

Constitution check: focused maintenance; no content, RLS, deployment or publication
changes; README and AGENTS updated; user budgets preserve production headroom.
ADR-0008 deployment behavior stays unchanged. No new ADR is created.
