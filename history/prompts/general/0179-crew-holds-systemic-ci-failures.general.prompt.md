---
id: 0179
title: Crew holds systemic CI failures
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/systemic-ci-hold
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "ci"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/crew.mjs
tests:
 - queueCiFixes on 5 synthetic cases (3 PRs same check -> held + alert; 1 PR -> fix job; main failed same check -> held; PR with an extra non-systemic failure -> fix job; 2 PRs below threshold -> fix jobs)
 - PR #183 full CI green including e2e (confirms #197)
---

## Prompt

yes

(Reply to: "make the crew check main first: if main's latest run fails the same way, don't queue per-PR fix jobs. Should I add that?")

## Response snapshot

`managePrs` now collects red PRs and decides after the loop (`queueCiFixes`). A failed check counts as systemic when it also failed on main's latest finished, non-cancelled CI run, or when it fails on 3 or more PRs in the same tick. A PR whose every failed check is systemic is held: no fix job is queued, it stays `pr_open` so a re-run picks it up, and its history notes the hold. The owner gets one ⚠️ alert naming the checks and PRs, repeated only when the set changes or after 6 h. A PR with any non-systemic failure still gets a fix job, as before.

## Outcome

- Impact: a CI or main breakage no longer sends workers to "fix" every PR (it happened three times on 2026-10-17; one worker copied ci.yml into a content branch).
- Tests: listed above.
- Files: 1.
- Next prompts: none.
- Reflection: per-PR remediation needs a check for shared causes first.

## Handoff (for CEO and agents)

- Shipped / changed: systemic-failure hold in the crew.
- Decisions the team must respect: a failure shared with main or 3+ PRs is fixed at the source (main or the workflow), not per PR.
- Pending / next owner: none.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: per-PR fix jobs for a shared cause.
- Graders run and results (PASS/FAIL): synthetic cases PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): tune the 3-PR threshold after a week.
