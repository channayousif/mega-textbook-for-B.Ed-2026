---
id: 520
title: "EFMP-305 U1 Urdu translation at G4"
stage: green
date: 2026-10-18
surface: agent
model: longcat/LongCat-2.0
feature: efmp-305
branch: crew/efmp-305-u01-translate
user: board-direct
command: /translate-unit EFMP-305 Unit 1
labels: ["translation", "urdu", "efmp-305", "g4"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-teacher-notes.mdx
  - static/img/figures/efmp-305/unit-01/fig-U1-1.ur.svg
  - static/img/figures/efmp-305/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/efmp-305/unit-01/fig-U1-2.ur.svg
  - static/img/figures/efmp-305/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/efmp-305/unit-01/fig-U1-3.ur.svg
  - static/img/figures/efmp-305/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/efmp-305/unit-01/fig-U1-4.ur.svg
  - static/img/figures/efmp-305/unit-01/fig-U1-4.ur.dark.svg
tests:
  - npm run check:content (all 13 gates pass)
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

The brief requested: Translate EFMP-305 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

## Response snapshot

Translated all five English files (index.mdx, topic-01.mdx, topic-02.mdx, unit-assessment.mdx, unit-teacher-notes.mdx) into academic-plain Urdu under i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/. Key terminology follows the frozen bank: Inclusive Education → شمولیتی تعلیم. Terms not in the bank (segregation → علیحدگی, integration → یکجائی, equality → مساوات, equity → انصاف) are drawn from glossary.json and recorded as proposed terms in the handoff. The UR index.mdx carries the key_terms block with the single bank term (Inclusive Education → شمولیتی تعلیم). The assessment bank preserves 10/10/5 counts, option letters mapped to Urdu (A→الف, B→ب, C→ج, D→د), and the bounded answers section is translated with marks unchanged. Figure alt text was translated and the .ur.svg/.ur.dark.svg <desc> elements updated to match. All 13 content gates pass.

## Outcome

- ✅ Impact: EFMP-305 Unit 1 now has a complete Urdu mirror at structural parity with the English baseline, ready for independent G5 review.
- 🧪 Tests: npm run check:content passes all 13 gates (including no-em-dash scanning i18n/, figures parity, no-answer-keys).
- 📁 Files: 5 new Urdu .mdx files, 8 updated .ur.svg/.ur.dark.svg figure files.
- 🔁 Next prompts: G5 Urdu review by an independent reviewer on the translated bundle.
- 🧠 Reflection: The concept graph file (concepts/unit-01.md) uses "شامل تعلیم" for "Inclusive education" while the frozen terminology bank mandates "شمولیتی تعلیم". This discrepancy is flagged in the handoff for owner resolution.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-305 Unit 1 Urdu mirror (5 files) committed on branch crew/efmp-305-u01-translate. translation_status remains draft. G4 tracker row NOT flipped (that is the G5 reviewer's act after acceptance).
- Decisions the team must respect: Terminology bank terms are non-negotiable; proposed terms (علیحدگی, یکجائی, مساوات, انصاف) are pending owner ratification. Do not edit terminology.csv to make translations conform.
- Pending / next owner: Independent G5 Urdu review required before translation_status can be flipped to reviewed. Proposed terminology for owner: Segregation → علیحدگی, Integration → یکجائی, Equality → مساوات, Equity → انصاف.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: The check:figures gate initially failed because the pre-existing .ur.svg <desc> elements did not match the translated carrier alt text. Fixed by updating the SVG <desc> elements and regenerating dark variants.
- Graders run and results (PASS/FAIL): npm run check:content PASS (13/13).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
