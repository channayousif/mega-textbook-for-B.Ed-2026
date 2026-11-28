---
id: 20261310
title: EFPC-411 Unit 1 G3 desk repairs
stage: general
date: 2026-11-28
surface: agent
model: claude-sonnet-5-5
feature: efpc-411
branch: crew/efpc-411-u01-repair_en-r1
user: crew
command: crew repair_en
labels: [claude]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-4/efpc-411/unit-01/topic-03.mdx
  - docs/semester-4/efpc-411/unit-01/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-04.mdx
  - specs/content/efpc-411/sources/unit-01.md
  - specs/content/efpc-411/sources/texts/hec-2013-practicum.md
  - specs/content/efpc-411/sources/texts/teach-primary-2021.md
  - specs/content/efpc-411/coverage/unit-01.md
  - specs/content/efpc-411/tasks.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Rewrote the two bound source notes from the PDFs, bound U1-04 to the Teach manual p. 12 and recorded the rest as author guidance, cited Schön (1983) and declared it unverifiable, corrected the cycle-stage sentence, mirrored both prose edits into Urdu, appended the G3 advisory row and regenerated G2 evidence for Units 1 and 2.

## Outcome

- ✅ Impact: three of the four open G3 findings repaired; render review still needs a deploy
- 🧪 Tests: npm run check:content (result in the commit that carries this record)
- 📁 Files: listed above plus G2 evidence for Units 1 and 2
- 🔁 Next prompts: fresh G3 review (needs owner authorisation under ADR-0019)
- 🧠 Reflection: source notes must be written from the retrieved text, not from what a handbook of that kind usually says

## Handoff (for CEO and agents)

- Shipped / changed: Unit 1 source and coverage repairs and two prose fixes, committed on the crew branch, not pushed
- Decisions the team must respect: G3 stays unticked; schon-1983 is declared unverifiable
- Pending / next owner: owner authorises a further G3 cycle; render review after deploy; the shared source notes changed after Unit 2's G3 desk sign-off, and Unit 2 topic-02 attributes "three to four lessons using proformas" to a handbook that has neither phrase
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: shared source notes make another unit's G2 evidence stale
- Graders run and results (PASS/FAIL): content gates
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): check bound notes against PDF text at authoring time
