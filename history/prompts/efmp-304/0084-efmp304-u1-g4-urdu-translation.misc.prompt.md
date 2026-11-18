---
id: "0084"
title: "EFMP-304 Unit 1 G4 Urdu Translation"
stage: misc
date: 2026-10-03
surface: agent
model: claude-sonnet-4-6
feature: efmp-304
branch: main
user: M Yousif Channa
command: "Translate EFMP-304 Unit 1 from English to Urdu"
labels: ["translation", "urdu", "g4", "efmp-304", "unit-01"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/course-overview.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-05.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/unit-assessment.mdx
tests:
  - npm run check:content (13/13 gates PASS in draft mode)
---

## Prompt

Translate EFMP-304 Unit 1 from English to Urdu.

Working directory: /home/a2ahs/mega_book_for_B.Ed

Task: Translate all 8 English .mdx files in docs/semester-2/efmp-304/unit-01/ into complete Urdu mirrors at i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/

English files to translate:
1. docs/semester-2/efmp-304/course-overview.mdx (175 words)
2. docs/semester-2/efmp-304/unit-01/index.mdx (520 words)
3. docs/semester-2/efmp-304/unit-01/topic-01.mdx (1380 words)
4. docs/semester-2/efmp-304/unit-01/topic-02.mdx (1377 words)
5. docs/semester-2/efmp-304/unit-01/topic-03.mdx (1317 words)
6. docs/semester-2/efmp-304/unit-01/topic-04.mdx (1262 words)
7. docs/semester-2/efmp-304/unit-01/topic-05.mdx (1229 words)
8. docs/semester-2/efmp-304/unit-01/unit-assessment.mdx (2500 words)

Requirements: Follow the translate-unit skill, academic-plain Urdu, preserve all structure, match frozen terminology bank, include key_terms block, run all gates, leave translation_status as draft.

## Response snapshot

8 Urdu mirror files created under i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/. All 13 content gates pass (draft mode). Parity check run with reviewed flip confirmed expected failures: missing .ur.svg files (generate-figures Step 5 needed) and tracker rows (G4/G5 sign-off needed). Both index files reverted to draft.

Terminology used from bank: Critical Thinking (تنقیدی سوچ), Assessment (تشخیص), Self-Assessment (خود جائزہ), Rubric (معیارِ جانچ).

Proposed terms not in bank: Egocentrism (خود مرکزیت), Group conformity (گروہی موافقت), Statement (بیان), Claim (دعوی), Issue (مسئلہ), Argument (استدلال).

## Outcome

- ✅ Impact: G4 Urdu mirror for EFMP-304 Unit 1 created; 8 files, ~9500 Urdu words; all structural gates green.
- 🧪 Tests: npm run check:content 13/13 PASS (draft mode)
- 📁 Files: 8 new Urdu .mdx files in i18n/ur/...semester-2/efmp-304/
- 🔁 Next prompts: generate-figures Step 5 for .ur.svg variants; G5 review by g5-reviewer agent
- 🧠 Reflection: Six core terms (Egocentrism, Group conformity, Statement, Claim, Issue, Argument) are used in this unit but not in terminology.csv. They are drawn from glossary.json definitions. Owner should bank these before G5 review.

## Evaluation notes (flywheel)

- Failure modes observed: None in draft mode. Parity gates (figures, pipeline-gate) fire only at reviewed status as expected.
- Graders run and results (PASS/FAIL): npm run check:content - PASS (13/13)
- Prompt variant (if applicable): translate-unit skill
- Next experiment (smallest change to try): Run generate-figures Step 5 to create .ur.svg files before G5 review
