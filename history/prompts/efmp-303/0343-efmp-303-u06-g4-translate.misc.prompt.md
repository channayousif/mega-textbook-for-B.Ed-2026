---
id: 0343
title: efmp-303-u06-g4-translate
stage: misc
date: 2026-10-18
surface: agent
model: longcat/LongCat-2.0
feature: efmp-303
branch: crew/efmp-303-u06-translate
user: board-direct
command: translate-unit EFMP-303 Unit 6 (G4 Urdu mirror)
labels: [translate, efmp-303, unit-06, g4, urdu]
links:
  spec: null
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
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-06/G4/translation-handoff.md
tests:
  - npm run check:content (12/13 pass; 1 pre-existing failure on origin/main)
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

The brief required: translate EFMP-303 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row; translation_status stays draft.

## Response snapshot

Translated all 6 Urdu mirror files for EFMP-303 Unit 6: index.mdx (with key_terms block of 9 bank-bound terms), topic-01.mdx (Learning from other countries), topic-02.mdx (Technology and planning), topic-03.mdx (Future directions), unit-assessment.mdx (10/10/5 bank with Urdu MCQ option labels الف/ب/ج/د in original order, translated Bloom tags, bounded answers section), and unit-teacher-notes.mdx. Updated G4 tracker row to ▣ with auto:gates evidence. Created translation handoff document. All 12 applicable content gates pass; the single failure (check:content-status) is pre-existing on origin/main. Zero em dashes confirmed. Temporary reviewed-flip parity/figures/key_terms checks passed clean and were reverted.

## Outcome

- ✅ Impact: EFMP-303 Unit 6 now has a complete structural and semantic Urdu mirror at G4, ready for independent G5 review. 9 key_terms bound to frozen terminology.csv.
- 🧪 Tests: check:content 12/13 (1 pre-existing); parity/figures/key_terms clean under temporary reviewed flip.
- 📁 Files: 6 new Urdu mirror files + 1 handoff document + 1 tracker row update.
- 🔁 Next prompts: independent G5 Urdu review (separate session, different model/vendor), then generate-figures Step 5 for .ur.svg variants.
- 🧠 Reflection: The temporary reviewed-flip technique surfaces parity/figure/terminology gaps that are silent while draft. Essential for gate-passing confidence before handoff.

## Handoff (for CEO and agents)

- Shipped / changed: 6 Urdu mirror files for EFMP-303 Unit 6 at docs/semester-2/efmp-303/unit-06/ mirrored to i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/; G4 tracker row marked ▣; translation-handoff.md created.
- Decisions the team must respect: translation_status stays draft (G5 has not happened); .ur.svg figure variants not created (generate-figures domain, ADR-0024); option order preserved (B remains ب); Summative Assessment uses مجموعی جائزہ (banked pair).
- Pending / next owner: independent G5 Urdu review (fresh session, different model/vendor quota); generate-figures Step 5 for 6 .ur.svg variants; rendered desktop/narrow/A4 inspection (brief prohibited build).
- Paperclip issues affected: none directly; EFMP-303 corpus Urdu parity (Article III.2 corpus completion requirement) advanced by one unit.

## Evaluation notes (flywheel)

- Failure modes observed: several typos introduced during large-batch Urdu writing (Latin characters in Urdu words: تعلیmی, ٹیکنALOGی, اکپھتا, حجمعی) - all fixed before commit. Risk remains for unseen typos.
- Graders run and results (PASS/FAIL): content gates PASS (12/13, 1 pre-existing).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
