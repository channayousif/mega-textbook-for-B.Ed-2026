---
id: 20261302
title: Crew EFPG-402 Unit 2 translation retry, G2 evidence refresh
stage: green
date: 2026-11-27
surface: agent
model: claude-sonnet-5-5
feature: efpg-402
branch: crew/efpg-402-u02-translate
user: M Yousif Channa
command: crew job efpg-402-u02-translate
labels: ["claude", "crew", "translation"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efpg-402/reviews/unit-02/G2/
  - specs/content/efpg-402/tasks.md
tests:
  - scripts/heavy.sh node scripts/prepare-gate-evidence.mjs EFPG-402 2
  - scripts/heavy.sh npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

The brief reported a failure from the previous attempt: Unit 2 G2 evidence was stale. The new translation handoff file is a bound input that the earlier evidence did not include. Regenerated the G2 evidence and repointed the Unit 2 G2 tracker row. No translation or figure content changed.

## Outcome

- ✅ Impact: the stale G2 finding is cleared.
- 🧪 Tests: all eight G2 draft gates pass; check:content rerun after the commit.
- 📁 Files: one new gate evidence JSON with its logs, tracker row, this record.
- 🔁 Next prompts: independent G3, then G5 with rendered Urdu inspection.
- 🧠 Reflection: a translation job that adds a handoff file must refresh G2 evidence after committing it.

## Handoff (for CEO and agents)

- Shipped / changed: refreshed Unit 2 G2 evidence on the crew branch; not pushed.
- Decisions the team must respect: translation_status stays draft; G3, G4 completion and G5 remain open.
- Pending / next owner: G3 and G5 reviewers; owner on proposed terms in translations/unit-02/handoff.md. Any edit to that handoff file makes G2 stale again.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: previous attempt added a bound input without refreshing G2 evidence.
- Graders run and results (PASS/FAIL): G2 draft gates PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): have the translate-unit skill say to refresh G2 evidence after writing the handoff.
