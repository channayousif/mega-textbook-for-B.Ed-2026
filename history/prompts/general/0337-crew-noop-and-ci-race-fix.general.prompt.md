---
id: "0337"
title: "Crew no-op and CI race fix"
stage: general
date: 2026-10-18
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-noop-and-ci-race
user: M Yousif Channa
command: yes, fix both and open the PR
labels: ["board-direct", "crew", "ops", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/crew.mjs
 - scripts/crew/checks.mjs
 - tests/crew/checks.test.mjs
 - history/prompts/general/0337-crew-noop-and-ci-race-fix.general.prompt.md
tests:
 - node --test tests/crew/*.test.mjs (10 pass)
 - node --check scripts/crew/crew.mjs
---

## Prompt

yes, fix both and open the PR

## Response snapshot

After PR #200 merged and a manual tick ran (2026-10-18 19:00Z), two crew bugs showed up:
(1) geng-301-u00-salvage-cifix1 was marked done but pushed only its PHR: opencode mistyped the home path,
its external_directory permission was auto-rejected, and it exited 0. finishSuccess only checked
"ahead of origin/main", which a fix job's branch always is. Fix: launch records j.startHead and
finishSuccess requires at least one new commit since it.
(2) The same tick read #164's day-old failed build 1 s after the crew's push and queued cifix2 while the
new CI run was starting. Fix: the crew records pushedAt on the PR's job; managePrs skips that PR for
3 minutes after a push and judges it only on checks that started after the push (freshChecks, new
scripts/crew/checks.mjs).

## Outcome

- Impact: no-op fix jobs now fail and retry with feedback; no duplicate fix jobs from stale CI.
- Tests: 10 pass (3 new for freshChecks).
- Files: listed above.
- Reflection: jobs already running when this lands have no startHead and keep the old check.

## Handoff (for CEO and agents)

- Shipped: no-op detection and post-push CI settle in scripts/crew/crew.mjs.
- Decisions to respect: none new.
- Pending: owner merges (scripts/ is protected). A PR whose CI never re-runs after a crew push now waits
  instead of being judged on the old run; the lead should re-run CI in that case.
- Paperclip issues affected: none (Paperclip paused).
