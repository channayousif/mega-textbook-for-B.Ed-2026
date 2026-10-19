---
id: 20261018-efmp304-u1-continuation
title: Continue Unit One Urdu Translation
stage: misc
date: 2026-10-18
surface: agent
model: GPT-6
feature: efmp-304
branch: crew/efmp-304-u01-translate-r1
user: crew
command: execute .crew/brief.md
labels: ["board-direct", "codex", "crew", "translation"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-05.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/unit-assessment.mdx
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/reviews/unit-01/G4/translation-handoff.md
  - history/prompts/efmp-304/20261018-continue-unit-one-translation.misc.prompt.md
tests:
  - npm run build:content-status
  - npm run check:content
  - npm run figures:variants:check
  - Direct metadata, heading, component, figure and frozen terminology comparisons
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing seven-page Urdu mirror and ten Urdu figures. Moved the translation handoff under reviews so the record does not invalidate unchanged English G2 evidence. Normalized Urdu page digits to the skill-required Western numerals, regenerated ignored local status data and verified deterministic parity. Translation remains draft with G3/G5 open.

## Outcome

- Impact: Repaired the branch-specific stale G2 manifest without changing English prose or evidence policy.
- Tests: Content gate results recorded in the handoff; dark variants and direct structural checks pass.
- Files: Six Urdu pages, tracker link, relocated handoff and this PHR.
- Next prompts: Independent review and authorized RTL/print rendering.
- Reflection: Handoff location affects evidence freshness because translations folders are bound inputs.

## Handoff (for CEO and agents)

- Shipped / changed: Continued G4 translation, repaired evidence freshness, standardized digits and recorded checks.
- Decisions the team must respect: Frozen terminology unchanged; draft status retained; no G3/G5 certification. Crew brief prohibits builds and dev servers.
- Pending / next owner: Authorized review host supplies narrow-width and A4 renders; independent reviewers own G3/G5 and the English issues already recorded in the handoff.
- Paperclip issues affected: None identified in this crew brief.

## Evaluation notes (flywheel)

- Failure modes observed: Handoff added to English-bound input set; absent or stale ignored content-status artifact.
- Graders run and results (PASS/FAIL): See handoff for final actual run; direct metadata, headings, component counts, key terms, figure paths and dark variants PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Keep lifecycle records under reviews to avoid invalidating content input manifests.
