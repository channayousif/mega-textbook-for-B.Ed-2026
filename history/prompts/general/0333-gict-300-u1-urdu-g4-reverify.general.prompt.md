---
id: 0333
title: GICT-300 Unit 1 Urdu G4 re-verify
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/gict-300-u01-translate
user: M Yousif Channa
command: crew job gict-300-u01-translate (.crew/brief.md, translate-unit skill)
labels: ["crew", "claude", "gict-300", "translate-unit", "G4", "urdu"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/unit-teacher-notes.mdx
 - static/img/figures/gict-300/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gict-300/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gict-300/unit-01/fig-U1-5.ur.svg
 - static/img/figures/gict-300/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/gict-300/unit-01/fig-U1-7.ur.svg
 - static/img/figures/gict-300/unit-01/fig-U1-7.ur.dark.svg
 - specs/content/gict-300/tasks.md
tests:
 - npm run check:content (13/13 pass, draft state)
 - npm run check:content with both index.mdx temporarily flipped to reviewed (parity and figure gates pass; pipeline-gate reports only G4/G5 rows and 12 unbanked key_terms), then reverted to draft
 - npm run figures:variants:check (OK)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Brief: translate GICT-300 Unit 1 into its complete Urdu mirror at G4 using the translate-unit skill, bound to specs/content/terminology.csv; record the G4 tracker row as the skill says; translation_status stays draft; check:content must add no finding beyond origin/main; commit, do not push or open a PR.)

## Response snapshot

The Urdu mirror for all 7 files already existed and was structurally at parity with the English baseline ee13c3e2: the same headings, components, figure IDs and a 10/10/5 bank with matching option order and key. A passage-by-passage semantic pass fixed the following: the abacus "beads" had been rendered as تیلیاں (sticks) in topic-02 and in the fig-U1-3 label; "mix of skills" had been rendered as مرکز (centre); the unbanked سبق منصوبہ was replaced by the banked سبقی منصوبہ; ترقی was replaced by the banked نشوونما for "teacher development"; a teacher-notes clause ("let the paradox resolve into ...") had been dropped; "how well they are taught to [use them]" had an ambiguous referent; and there were grammar and typo fixes (بایومیٹرک, فوٹو کاپی, gender agreement, "one clause" as فقرہ). The fig-U1-5 label grammar and the fig-U1-7 alt/desc ("dashed side box") were fixed, and the dark variants were regenerated. The G4 tracker row was set to ▣ with a note, with no initials and no ✅, following the skill.

## Outcome

- ✅ Impact: GICT-300 U1 Urdu mirror is semantically closer to the EN baseline and ready for a fresh independent G5.
- 🧪 Tests: check:content green; the reviewed-flip run is clean apart from the expected G4/G5 rows and the unbanked key_terms.
- 📁 Files: 7 Urdu MDX files, 3 .ur.svg files plus their dark variants, and the tracker row.
- 🔁 Next prompts: owner banks the 12 GICT-300 U1 key terms; run a fresh G5 (run002) against the current bytes.
- 🧠 Reflection: an "existing" Urdu mirror still carried meaning errors that no gate sees (wrong noun for abacus beads, a dropped clause). The semantic pass is the real G4 work.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu fixes in GICT-300 Unit 1 (7 files) and 3 Urdu figure variants. The tracker row G4 is at ▣ with a note. Nothing has been pushed and there is no PR.
- Decisions the team must respect: translation_status stays draft. G4 is not ✅ because the skill forbids a translator from flipping it. G5 must be run by a fresh, independent reviewer.
- Pending / next owner:
  - Curriculum owner: bank the 12 key_terms in the UR index.mdx. None of them is in terminology.csv. They are: کمپیوٹر خواندگی; معلومات و مواصلات کی ٹیکنالوجی (آئی سی ٹی); ڈیجیٹل صلاحیتوں کے شعبے; کمپیوٹر کی ارتقائی تاریخ; محفوظ پروگرام کا تصور; کمپیوٹر کی پانچ نسلیں; افادیت کے لحاظ سے درجہ بندی; حجم اور طاقت کے لحاظ سے درجہ بندی; اندرونی جڑا ہوا کمپیوٹر (Embedded computer, a candidate pair with سرایت شدہ کمپیوٹر); ڈیجیٹل خلا; مختلف شعبوں میں آئی سی ٹی کے استعمالات; آئی سی ٹی کے اثرات پر متوازن نقطہ نظر.
  - Shared glossary.json: the "Abacus" definition_ur still says تیلیوں کو سلائیوں پر (sticks), which should be دانوں کو سلاخوں پر (beads on rods). This is outside the crew job's scope and was left unchanged.
  - G5 reviewer: run002. Rendered Urdu inspection (render-inspect --locale ur) was not run, because the brief forbids npm run build.
- Paperclip issues affected: none (crew-driven).

## Evaluation notes (flywheel)

- Failure modes observed: a prior Urdu mirror passed every gate while still carrying noun mistranslations and an omitted clause.
- Graders run and results (PASS/FAIL): check:content PASS; reviewed-flip parity PASS (expected pipeline-gate findings only); figures:variants:check PASS.
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): add a glossary definition_ur check to the G5 checklist for terms the unit uses.
