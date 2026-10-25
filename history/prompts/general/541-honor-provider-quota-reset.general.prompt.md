---
id: 541
title: Honor provider quota reset
stage: general
date: 2026-10-25
surface: agent
model: GPT-6
feature: crew-maintenance
branch: crew/maint-2026-w43-m3
user: owner
command: crew maint-2026-w43-m3
labels: ["codex", "maintenance"]
links:
  spec: null
  ticket: null
  adr: history/adr/0030-crew-replaces-paperclip-control-plane.md
  pr: null
files:
  - scripts/crew/workers.mjs
  - scripts/crew/crew.mjs
  - tests/crew/workers.test.mjs
  - specs/intelligence/registry.md
  - history/prompts/general/541-honor-provider-quota-reset.general.prompt.md
tests:
  - node --test tests/crew/*.test.mjs
  - npm run check:content
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Implemented maintenance task M3: parse relative reset intervals, use the larger reset or strike cooldown, fix the stale worker-chain expectation, and add proposed intelligence I-0010.

## Outcome

- ✅ Impact: Workers wait for stated quota resets, capped at one week.
- 🧪 Tests: 63 crew tests pass; all 13 content gates pass before and after the change, with no new findings against origin/main.
- 📁 Files: Four task files and this required PHR.
- 🔁 Next prompts: Independent maintenance review and owner approval for protected scripts.
- 🧠 Reflection: The existing suite had one stale chain expectation; regression coverage now checks reset parsing and actual cooldown behavior.

## Handoff (for CEO and agents)

- Shipped / changed: Provider reset cooldown, regression tests, proposed intelligence entry.
- Decisions the team must respect: QUOTA_RE and quota attempt refund remain unchanged; absolute clock times retain strike backoff.
- Pending / next owner: Dispatcher owns subsequent review; owner approval is required because scripts are protected. No push or PR performed.
- Paperclip issues affected: No linked ticket; crew maintenance M3 for 2026-W43.

## Evaluation notes (flywheel)

- Failure modes observed: Baseline stale worker-chain expectation; initial parser rejected sentence-ending punctuation, corrected before completion.
- Graders run and results (PASS/FAIL): PASS: 63 crew tests, all 13 baseline and final content gates, Node syntax checks, whitespace validation.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Observe the C5 signature after owner adoption; no effectiveness claim yet.
