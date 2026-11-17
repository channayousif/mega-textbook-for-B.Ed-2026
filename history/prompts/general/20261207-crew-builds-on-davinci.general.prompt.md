---
id: 20261207
title: Crew builds on davinci via heavy.sh offload hook
stage: general
date: 2026-11-17
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/heavy-remote-build
user: channayousif
command: move the crew builds to davinci too
labels: [board-direct, ops, host-resources, crew]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/heavy.sh
  - ops/development/README.md
  - history/prompts/general/20261207-crew-builds-on-davinci.general.prompt.md
tests:
  - "End-to-end: ~/.config/mega-book/heavy-remote npm run build from ~/crew-wt/giss-401-u07-illustrate-r1 built on davinci, rc=0, build/ copied back, worktree clean (11m42s incl. first npm ci)"
  - "Not-handled paths: outside ~/crew-wt and non-build commands return 99"
  - "scripts/heavy.sh fall-through: local slot + admission still run; exit codes pass through (7 -> 7)"
---

## Prompt

move the crew builds to davinci too

## Response snapshot

Context: on 2026-11-17 the production host livelocked for 2.5 h (user slice stuck at MemoryHigh). Host-level fixes were applied outside this repository: MemoryHigh removed, systemd-oomd enabled, prod deploy builds moved to davinci (~/bin/deploy-via-davinci.sh), and both crew ticks moved into the capped development-agents.slice (6 GiB). Crew `npm run build` runs (about 400 in the logs, 2.4 GB each) are the largest remaining load inside that cap.

This PR adds an optional hook to `scripts/heavy.sh`: when `~/.config/mega-book/heavy-remote` exists and is executable, heavy.sh calls it first. Exit 99 means "not handled" and the original two-slot path with admission runs unchanged. On the production host the hook is `~/bin/crew-remote-build.sh`. It handles only `npm run build` from a crew worktree under `~/crew-wt/`. It pushes HEAD to `refs/crew/build` in davinci's `~/crew-build/repo`, so the news feed's `git log` sees real history. It then rsyncs uncommitted files with checksums and builds there in a capped scope (5 GiB, 1.5 CPUs, shared lock with the prod build). The output streams back, `build/` is copied into the worktree, and the build's exit code is returned. Transport failures fall back to the local slot. `ops/development/README.md` gains a "Remote builds" section.

## Outcome

- ✅ Impact: crew production builds no longer run on the host that serves textbook.com.pk and Supabase; hosts without the hook file behave exactly as before.
- 🧪 Tests: manual end-to-end build on davinci from a real crew worktree; decline paths; heavy.sh fall-through and exit-code passthrough.
- 📁 Files: scripts/heavy.sh (hook, 8 lines), ops/development/README.md (Remote builds section), this PHR.
- 🔁 Next prompts: if crew vitest or Playwright runs become a problem, extend the host script (it already receives the full command).
- 🧠 Reflection: keeping policy in a host-level script keeps the repository change tiny and lets the host disable offload by deleting one symlink.

## Handoff (for CEO and agents)

- Shipped / changed: heavy.sh calls an optional host offload hook before taking a local slot; crew `npm run build` runs on davinci once this is merged and worktrees are recreated from main.
- Decisions the team must respect: keep using `scripts/heavy.sh npm run build` exactly (the hook matches that command); do not call the host script directly; exit 99 is reserved for "not handled".
- Pending / next owner: owner merges this PR; existing crew worktrees pick it up when they rebase or are recreated.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the first davinci build hit the V8 heap limit (default heap sized from the 5 GiB cgroup); fixed with NODE_OPTIONS=--max-old-space-size=3584 in the davinci scripts.
- Graders run and results (PASS/FAIL): manual end-to-end PASS; decline paths PASS; fall-through PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): measure crew build wall time on davinci against local over a week.
