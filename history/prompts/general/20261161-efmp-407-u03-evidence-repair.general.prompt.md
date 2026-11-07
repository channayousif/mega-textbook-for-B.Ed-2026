---
id: 20261161
title: EFMP-407 Unit 3 translation blocker and evidence freshness repair
stage: general
date: 2026-11-07
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/efmp-407-u03-translate
user: owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "efmp-407", "translation", "evidence"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-407/translation/unit-03.md
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/reviews/unit-03/G2/
  - history/prompts/general/20261161-efmp-407-u03-evidence-repair.general.prompt.md
tests:
  - npm run check:content (branch before repair, origin/main comparison, final rerun)
  - node scripts/prepare-gate-evidence.mjs EFMP-407 3
  - npm run build:content-status
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Confirmed the existing SDG 5 category contradiction still blocks translation under the required skill. Repair stale G2 evidence introduced when the previous handoff was committed, without changing English or claiming translation completion.

## Outcome

- ✅ Impact: Unit-scoped evidence freshness repair; complete Urdu mirror remains blocked by defective English baseline.
- 🧪 Tests: PASS: all 14 branch content gates after evidence refresh; all eight evidence preparation commands; diff whitespace and prose punctuation/placeholders. PASS: all 14 origin/main gates after generating its ignored content-status cache; no additional branch findings.
- 📁 Files: Handoff, PHR, regenerated G2 logs/evidence and Unit 3 tracker reference.
- 🔁 Next prompts: English author repairs existing G3 findings before translator resumes G4.
- 🧠 Reflection: A unit-scoped handoff is a bound input; prepare evidence only after committing it.

## Handoff (for CEO and agents)

- Shipped / changed: Documented evidence invalidation cause and prepared deterministic evidence refresh.
- Decisions the team must respect: No English repair in translation; draft status stays; G3/G5 and G4 completion remain unclaimed.
- Pending / next owner: English author owns category contradiction and existing blocking findings; translator resumes on settled baseline.
- Paperclip issues affected: efmp-407-u03-translate; ticket null.

## Evaluation notes (flywheel)

- Failure modes observed: Pre-commit gate success missed the new handoff entering the committed input manifest.
- Graders run and results (PASS/FAIL): PASS: final branch check:content (14/14); evidence preparation (8/8); git diff --check; punctuation/placeholders. The initial branch run failed only the stale Unit 3 G2 manifest. A fresh origin/main checkout first lacked its ignored content-status cache; regenerated it before comparison, then all 14 origin/main gates passed. No additional branch findings.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Refresh G2 after committing bound documentation, then rerun content gates.
