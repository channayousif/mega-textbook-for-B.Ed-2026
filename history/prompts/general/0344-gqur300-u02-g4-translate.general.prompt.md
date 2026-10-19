---
id: 0344
title: GQUR-300 Unit 2 Urdu G4 translate
stage: general
date: 2026-10-18
surface: agent
model: LongCat-2.0
feature: none
branch: crew/gqur-300-u02-translate-r1
user: M Yousif Channa
command: crew job gqur-300-u02-translate-r1 (.crew/brief.md, translate-unit skill)
labels: ["crew", "opencode", "gqur-300", "translate-unit", "G4", "urdu"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/unit-assessment.mdx
tests:
 - npm run check:content (12/13 pass; check:content-status FAIL is pre-existing on main, not in scope)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Brief: translate GQUR-300 Unit 2 into its complete Urdu mirror at G4 using the translate-unit skill, bound to specs/content/terminology.csv; check:content must add no finding beyond origin/main; commit, do not push or open a PR.)

## Response snapshot

The Urdu mirror for all 6 files already existed from a prior uncommitted attempt on this branch and was structurally at parity with the English baseline: same headings, components, figure IDs, .ur.svg references and a 10/10/5 bank. A quality pass found and fixed the following: MCQ option letters were Latin (a/b/c/d) instead of Urdu (الف/ب/ج/د); the MCQ answer key also used Latin letters; Bloom tags (*(Remember)*, *(Understand)*, *(Apply)*, *(Analyze)*, *(Evaluate)*) were untranslated across all topic files and the assessment; **Analyze** in ERQ rubric prose was untranslated. All were translated to Urdu script. No new prose was authored; this was a correction pass on an existing translation. Em-dash and answer-key gates were verified clean.

## Outcome

- ✅ Impact: GQUR-300 U2 Urdu mirror now uses Urdu script for assessment options, answer keys, and Bloom tags, meeting G5 review readiness on those points.
- 🧪 Tests: check:content 12/13 pass; the only failure (check:content-status) is pre-existing on origin/main and outside this job's scope.
- 📁 Files: 4 Urdu MDX files corrected (topic-01, topic-02, topic-03, unit-assessment). index.mdx and unit-teacher-notes.mdx were already correct.
- 🔁 Next prompts: curriculum owner banks the 10 key_terms (all unbanked); run a fresh G5 review.
- 🧠 Reflection: the prior attempt was structurally complete but left Latin letters and English Bloom tags throughout the assessment — exactly the kind of thing a G5 reviewer flags. A translation-quality pass after structural parity is always warranted.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu translations for MCQ option letters, answer-key letters, Bloom tags, and rubric-prose **Analyze** in GQUR-300 Unit 2. translation_status remains draft. Nothing pushed, no PR.
- Decisions the team must respect: translation_status stays draft. G4 is not flipped to reviewed. The 10 key_terms remain unbanked (not this job's call). No G5 authority claimed.
- Pending / next owner:
  - Curriculum owner: bank the 10 key_terms in the UR index.mdx (Decimal/اعشاریہ, Exponent/وسیع, Fraction/کسر, Integer/صحیح اعداد, Percentage/فیصد, Power/قوت, Proportion/تناسب, Ratio/نسبت, Square root/جذر, Whole number/تمام اعداد). None are in terminology.csv.
  - G5 reviewer: independent review of the full Urdu mirror. Rendered Urdu inspection (render-inspect --locale ur) was not run because the brief forbids npm run build.
- Paperclip issues affected: none (crew-driven).

## Evaluation notes (flywheel)

- Failure modes observed: a prior Urdu mirror had structural parity but retained Latin MCQ options and English Bloom tags throughout — visible to any G5 reviewer.
- Graders run and results (PASS/FAIL): check:content 12/13 PASS (check:content-status FAIL pre-existing on main).
- Prompt variant (if applicable): crew brief v1, translate-unit skill.
- Next experiment (smallest change to try): add a Bloom-tag and option-letter check to the G4 self-check list before handoff.
