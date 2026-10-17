---
id: 0143
title: Crew replaces Paperclip CEO
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-system
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "orchestration", "paperclip-paused"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/crew.mjs
 - scripts/crew/workers.mjs
 - scripts/crew/state.mjs
 - scripts/crew/notify.mjs
 - scripts/crew/tick.sh
 - ops/crew/README.md
 - .claude/skills/crew-lead/SKILL.md
 - .gitignore
tests:
 - worker smoke test (claude, codex, agy, opencode each answered "ok")
 - crew.mjs plan --dry-run (31 jobs derived from main)
 - failover dry-run (agy cooling, then only claude healthy)
 - notify dry-run and one real message to Discord and WhatsApp
---

## Prompt

i want you to takeover the all work from paperclip CEO TEX, i think it is not effective enough to complete the corpus writing task for our project. instead I have Claude, opencode using Longcat model, Codex, Agy and openclaw using Longcat, quite a workforce with separate subscriptions, to manage such projects. build a system in which all work in coordination as a team to finish the lengthy and complex work efficintly. current paperclip mekes it more defficult.

Follow-up answers: pause Paperclip and keep data; salvage then close the draft PRs; auto-merge when CI is green; "there are times when any one may be unavailable due to quota/Limit. Plan in such a way that the work does not suffer due to such scenarios."; "keep the openclaw for delivering information to me, there are two channels whatsapp and discord configured. keep me informed with it and get directions/permissions as alternative channel when im away."

## Response snapshot

Built the crew: a repo-native dispatcher (scripts/crew) that derives unit-stage jobs from main's content state, runs them on four workers (claude, codex, agy, opencode/LongCat) in parallel worktrees with ranked fallback chains and quota cooldowns, enforces reviewer family != producer family, judges each job by "no new gate findings versus main", opens PRs with a PHR, auto-merges on green CI except protected paths, and talks to the owner through openclaw (Discord #etextbook-platform, WhatsApp for urgent items and C-### decisions). A cron tick every 15 minutes keeps it moving without a lead session. Paperclip agents and the CEO sweep routine are paused. Six Semester 2 salvage jobs are seeded from the draft PRs.

## Outcome

- Impact: Paperclip no longer drives the corpus; the crew does.
- Tests: smoke, plan dry-run, failover dry-run and notify tests passed (see tests above).
- Files: 8 files, listed above.
- Next prompts: owner merges this PR; then the crew runs from a control checkout on main.
- Reflection: main was red on 44 stale G2 manifests (style guide v4.6), which would have blocked every PR; the baseline-relative gate check and PR #145 address it.

## Handoff (for CEO and agents)

- Shipped / changed: crew system (scripts/crew, ops/crew/README.md, crew-lead skill); Paperclip agents and routine paused, data kept.
- Decisions the team must respect: Paperclip is paused; do not resume it alongside the crew. G3/G5 stay advisory (ADR-0019). Protected-path PRs need an owner decision.
- Pending / next owner: owner to merge this PR and PR #145 (unblocks main); crew lead runs salvage of EFMP-303, EFMP-305, GQUR-301, GENG-301, GSOS-301, GPKS-402.
- Paperclip issues affected: all open TEX issues are frozen in place; draft PRs #119-#156 are closed as their salvage PRs open.

## Evaluation notes (flywheel)

- Failure modes observed: Paperclip stalls (run binding 403s, cancelled issues, session limits); main red on a corpus-wide standard change.
- Graders run and results (PASS/FAIL): smoke PASS, failover PASS, notify PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): measure the first salvage job's attempts and wall time; tune JOB_TIMEOUT and MAX_PARALLEL.
