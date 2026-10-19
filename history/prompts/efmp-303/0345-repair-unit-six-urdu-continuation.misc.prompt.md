---
id: 0345
title: Repair unit six Urdu continuation
stage: misc
date: 2026-10-19
surface: agent
model: Codex (GPT-6)
feature: efmp-303
branch: crew/efmp-303-u06-translate-r1
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["board-direct", "crew", "codex", "translation"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/unit-teacher-notes.mdx
 - specs/content/efmp-303/reviews/unit-06/G4/translation-handoff.md
 - specs/content/efmp-303/tasks.md
 - static/img/figures/efmp-303/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-1.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-3.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-4.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-5.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-5.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-6.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-6.ur.svg
 - specs/content/efmp-303/reviews/unit-06/G4/continuation-20261019/figure-variants.log
 - specs/content/efmp-303/reviews/unit-06/G4/continuation-20261019/reviewed-probe.log
 - specs/content/efmp-303/reviews/unit-06/G4/continuation-20261019/structural-parity.log
 - specs/content/efmp-303/reviews/unit-06/G4/continuation-20261019/check-content.log
 - history/prompts/efmp-303/0345-repair-unit-six-urdu-continuation.misc.prompt.md
tests:
 - npm run check:content
 - temporary reviewed check:content probe (restored)
 - npm run figures:variants:check
 - six-pair structural, metadata, terminology and assessment checks
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing Urdu mirror, repaired semantic and register errors, synchronised six figure descriptions and derived variants, and recorded G4 production evidence. Translation remains draft; independent G5 and rendered inspection remain pending under the brief restriction. All work committed locally without pushing or opening a PR.

## Outcome

- ✅ Impact: Six-file translation draft repaired without changing English baseline.
- 🧪 Tests: Final content gate results recorded in the G4 continuation check-content.log; conditional probe finds only open G4/G5 and temporary status-report staleness.
- 📁 Files: Six Urdu MDX pages, twelve Urdu SVG variants, G4 tracker notes, handoff, gate logs and this PHR.
- 🔁 Next prompts: Fresh independent G5 after accepted G3; rendered desktop, narrow and A4 inspection.
- 🧠 Reflection: Green draft gates conceal translation meaning errors; passage-level checks remain essential.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu semantic corrections, accessible descriptions, regenerated dark variants and verification evidence.
- Decisions the team must respect: Frozen terminology unchanged; English baseline f3197932aff6ec56382a14e68341c0636d7a46e8 retained; G4 stays in progress and translation_status stays draft.
- Pending / next owner: Independent review owner must obtain accepted G3 and perform G5 and rendered inspection. No builds or servers permitted in this job.
- Paperclip issues affected: No Paperclip issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Existing translation confused policy choices with elections, weakened comparison and omitted planning-capacity qualification.
- Graders run and results (PASS/FAIL): Structural, terminology, figure identity, alt/desc equality and 10/10/5 checks PASS. Final gate result in committed log. Conditional pipeline intentionally FAIL for open stages; content-status restored afterward.
- Prompt variant (if applicable): crew-efmp-303-u06-translate-r1
- Next experiment (smallest change to try): Independent bilingual and rendered review of this frozen bundle.
