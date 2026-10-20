---
id: crew-gqur-301-u02-translate
title: Record Unit Two Translation Blocker
stage: misc
date: 2026-10-19
surface: agent
model: GPT-6
feature: gqur-301
branch: crew/gqur-301-u02-translate
user: owner
command: crew brief execution
labels: [board-direct, translation, blocked]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gqur-301/reviews/unit-02/translation-blocked.md
  - history/prompts/gqur-301/crew-gqur-301-u02-translate.misc.prompt.md
tests:
  - npm run check:content
  - npm run build:content-status
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read the crew brief, project guidance and translate-unit skill with its parity, register, assessment and G5 references. Confirmed that HEAD and origin/main both identify 08da05778d49de8edd40949353bca256e956f3ed and no earlier branch work exists. The existing G3 escalation contains English errors still present in the actual assessment and topic prose. Followed the skill's explicit stop instruction rather than translating a known defective English baseline. Recorded the exact prerequisite blockers and ownership. No Urdu translation, figure variants, tracker certification or reviewed status was created.

## Outcome

- Impact: Recorded why G4 cannot safely start under the mandated skill.
- Tests: Initial check:content passed 12/13; missing ignored content-status cache was also present on the identical origin/main baseline. Generated the cache and reran all content gates.
- Files: Translation blocker and this PHR only.
- Next prompts: Separate English author repairs the full existing G3 report; resume G4 on a frozen repaired baseline.
- Reflection: A green deterministic gate cannot resolve an incorrect assessment or statistical claim.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 2 translation prerequisite blocker with baseline identity and confirmed passage locators.
- Decisions the team must respect: translate-unit says to stop when English is wrong; do not silently repair meaning in Urdu. Translation status stays draft, and the existing tracker remains unchanged. No review certification.
- Pending / next owner: English author owns repairs; host owns provenance and current render bundle; independent reviewer owns renewed G3; translator resumes afterwards. Build and browser work are prohibited by this job brief.
- Paperclip issues affected: No TEX issue supplied in the translation brief.

## Evaluation notes (flywheel)

- Failure modes observed: Known English errors block skill execution; initial ignored-cache setup failure.
- Graders run and results (PASS/FAIL): Initial check:content FAIL only on missing static/content-status.json; final rerun recorded below.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Repair RRQ 10 and the other existing G3 findings in a separately authorised English authoring pass.

Final validation: all 13 content gates PASS; git diff --check PASS. No push or PR.
