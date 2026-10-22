---
id: "0547"
title: "Requeue quota jobs, fix crew quota bugs"
stage: general
date: 2026-10-23
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-quota-detection
user: M Yousif Channa
command: yes requeue them and queue the U7 repair, fix crew bug
labels: ["board-direct", "crew", "ops", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/crew/workers.mjs
  - scripts/crew/crew.mjs
  - tests/crew/workers.test.mjs
  - history/prompts/general/0546-crew-status-stalled-on-worker-quotas.general.prompt.md
  - history/prompts/general/0547-requeue-quota-jobs-fix-crew-quota-bugs.general.prompt.md
tests:
  - npm run test:crew (49/49 pass, 2 new)
---

## Prompt

yes requeue them and queue the U7 repair, fix crew bug

## Response snapshot

Board (live state, ~/.crew/mega-book, under tick.lock): requeued gqur-301-u13-author, u15-author,
u14-review_en and gsos-301-u03/u05/u06-author; added gqur-301-u07-repair_en (applies the U7 G3 report's
three blocking findings before translation is retried). Claude verified back after its weekly reset;
codex set cooling until 2026-10-23T02:05Z and agy until 2026-10-23T22:15Z so no attempt is spent on
them. The requeued jobs' old logs/exit files were renamed `*.pre-requeue-20261023` and their stale
`avoid`/`feedback` cleared.

Crew fixes (four bugs, all seen in the 2026-10-22 stall):
1. `QUOTA_RE` missed "hit your weekly limit" (claude) and "model is at capacity" (codex).
2. A quota requeue kept the attempt counted; it now refunds it.
3. `j.avoid` (third attempt goes to another worker) was set but never passed to `pickWorker`.
4. A requeued job reuses its log name, so a stale `.exit` file made reap take the old exit code
   while the new worker still ran; `launch` now removes it. `crew retry` also clears `avoid`/`feedback`.

## Outcome

- Impact: crew resumes on claude/opencode now, codex after 07:00 PKT; quota exits no longer turn jobs red.
- Tests: npm run test:crew, 49/49 pass.

## Handoff (for CEO and agents)

- Shipped: crew quota-detection and retry fixes (this PR); board requeues applied directly to live state.
- Decisions to respect: a worker limit never counts as a job attempt.
- Pending: gqur-301-u07-translate stays gate_red until the repair_en merges (then requeue it);
  gqur-301-u11-author (committed, red on the G2 pipeline gate) needs a lead look. 76 G3 sign-offs await a person.
- Paperclip issues affected: none.
