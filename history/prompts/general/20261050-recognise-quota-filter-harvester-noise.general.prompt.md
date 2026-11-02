---
id: 20261050
title: Recognise quota and filter harvester noise
stage: general
date: 2026-11-01
surface: agent
model: GPT-6
feature: none
branch: crew/maint-2026-w44-m2
user: crew
command: crew brief maint-2026-w44-m2
labels: ["codex", "weekly-maintenance", "M2"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/crew/workers.mjs
  - scripts/crew/intel.mjs
  - tests/crew/workers.test.mjs
  - tests/crew/intel.test.mjs
tests:
  - node --test tests/crew/*.test.mjs
  - npm run check:content (compared with origin/main)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Implemented maintenance M2: recognise hyphenated quota messages and filter reported-failure prose and question lines from log signals. Added regression coverage while leaving resetMinutes unchanged.

## Outcome

- ✅ Impact: Quota stops receive existing quota handling; harvester ignores two specified noise patterns.
- 🧪 Tests: Original crew suite: 83 passed. New regressions reproduced two failures before fixes. Updated suite: 84 passed. All 13 content gates passed with the changes and with origin/main files restored for the baseline; no new findings.
- 📁 Files: Two crew modules and their two test files; this PHR records the work.
- 🔁 Next prompts: Independent maintenance review and owner review of protected scripts.
- 🧠 Reflection: Keep the matcher extension small and verify noise filtering preserves actual errors.

## Handoff (for CEO and agents)

- Shipped / changed: Maintenance M2 code and regression tests.
- Decisions the team must respect: resetMinutes is unchanged; clock-only resets continue to return null. Registry and course content are untouched.
- Pending / next owner: Dispatcher owns PR preparation; independent reviewer and owner review remain pending. No push or PR performed.
- Paperclip issues affected: No issue supplied; crew job maint-2026-w44-m2.

## Evaluation notes (flywheel)

- Failure modes observed: Existing quota regex rejected 5-hour; reported-failure prose and question lines became error signals.
- Graders run and results (PASS/FAIL): Crew tests PASS (84 tests); content gates PASS (13 gates).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
