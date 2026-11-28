---
id: crew-gent-401-u07-repair_en
title: crew repair_en GENT-401 unit 7
stage: misc
date: 2026-11-28
surface: agent
model: agy
feature: gent-401
branch: crew/gent-401-u07-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-4/gent-401/unit-07/topic-01.mdx
  - docs/semester-4/gent-401/unit-07/topic-02.mdx
  - docs/semester-4/gent-401/unit-07/unit-assessment.mdx
  - docs/semester-4/gent-401/unit-07/unit-teacher-notes.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/unit-teacher-notes.mdx
  - specs/content/gent-401/figures/unit-07.md
  - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
  - specs/content/gent-401/tasks.md
  - static/img/figures/gent-401/unit-07/fig-U7-2.dark.svg
  - static/img/figures/gent-401/unit-07/fig-U7-2.svg
  - static/img/figures/gent-401/unit-07/fig-U7-2.ur.dark.svg
  - static/img/figures/gent-401/unit-07/fig-U7-2.ur.svg
  - static/img/figures/gent-401/unit-07/fig-U7-3.dark.svg
  - static/img/figures/gent-401/unit-07/fig-U7-3.svg
  - static/img/figures/gent-401/unit-07/fig-U7-3.ur.dark.svg
  - static/img/figures/gent-401/unit-07/fig-U7-3.ur.svg
  - static/img/figures/gent-401/unit-07/fig-U7-4.dark.svg
  - static/img/figures/gent-401/unit-07/fig-U7-4.svg
  - static/img/figures/gent-401/unit-07/fig-U7-4.ur.dark.svg
  - static/img/figures/gent-401/unit-07/fig-U7-4.ur.svg
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied all blocking findings (F1-F8) and advisory findings (A1-A8) from the latest G3 review report (20261127T192818Z-g3-desk-ccff9884.json) for GENT-401 Unit 7 across English and Urdu mirror files, updated SVGs with measure-figure-text verification, regenerated G2 gate evidence, and recorded an advisory tracker row.

## Outcome

- Impact: repair_en for GENT-401 Unit 7 by agy.
- Tests: npm run check:content and gates passed.
- Files: 23 files modified.
- Next prompts: fresh independent G3 English review when scheduled.

## Handoff (for CEO and agents)

- Shipped / changed:
  - F1: Rebuilt Hira pitch table times to sum to 180 s (3 minutes) and aligned the ask (Rs 24,000 sponsor share for 4 corners at Rs 6,000 each with schools paying Rs 12,000) checkable from model row in EN and UR.
  - F2 & A6: Aligned risk matrix in fig-U7-2 and prose to all 4 quadrants with low/high axes, removed origin arrowhead, placed 4 distinct risks across all quadrants in EN and UR.
  - F3: Unified pitch-part count to seven parts consistently across fig-U7-3, prose, tables, and assessment items in EN and UR.
  - F4 & A7: Aligned ERQ 1 prompt with rubric criterion (requesting reasoned judgement on taking the chance) and aligned ERQ 5 prompt with rubric (requesting ask and next step), making ERQ 5 integrative across Topics 7.1 and 7.2.
  - F5 & A1: Repaired MCQ 3 stem, MCQ 4 distractor rationale, and rebalanced MCQ keys (A2/B3/C3/D2).
  - F6: Replaced altered OpenStax 10.5 quotation with verbatim wording in topic-01.mdx and bound note 12.
  - F7 & F9: Removed unsupported OpenStax 7.3 attribution and separated OpenStax 12.2 complementary skills from practical rule.
  - F8: Added communication skill column to fig-U7-4 and fig-U7-4.ur.svg (and dark variants).
  - A2, A3, A4, A5, A8: Fixed grammar typos, removed duplicate risk causes, cited Yuwono & Rachmawati (2024) and Blair (2021) in explanation, aligned teacher notes, and corrected RRQ 6 taxonomy to Understand.
  - G2 evidence regenerated cleanly and tracker row updated; G3 remains open and unticked.
- Decisions the team must respect: G3 remains unticked pending fresh qualified independent review.
- Pending / next owner: crew lead / independent G3 reviewer.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results: check:content PASS, check:figures PASS, check:no-em-dash PASS, measure-figure-text PASS
