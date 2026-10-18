---
id: 0171
title: GICT-300 Unit 2 G4 Urdu mirror parity
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/gict-300-u02-translate
user: M Yousif Channa
command: crew job gict-300-u02-translate (translate-unit skill)
labels: ["crew", "gict-300", "g4", "urdu", "translate-unit"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/unit-teacher-notes.mdx
 - specs/content/gict-300/tasks.md
 - history/prompts/general/0171-gict300-u2-g4-urdu-mirror-parity.general.prompt.md
tests:
 - npm run check:content (13/13 PASS)
 - npm run check:content with both index.mdx temporarily at translation_status reviewed (parity, figure and heading gates clean; only bank and G4/G5 row findings), reverted to draft
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Brief: translate GICT-300 Unit 2 into its complete Urdu mirror at G4 with the translate-unit
skill, bound to specs/content/terminology.csv; record the G4 tracker row as the skill says;
translation_status stays draft; check:content must add no finding over origin/main; commit, do
not push or open a PR.)

## Response snapshot

A full Urdu mirror (7 files, 8 `.ur.svg` and `.ur.dark.svg` variants) already existed on main
from 2026-09-23, translated from the unchanged English commit 37fcef38 and repaired after an
advisory G5 run. Verified structural parity: same file set, identical heading level vectors in
all 7 files, component counts equal (Figure 8, Glossary 17, PrintHandout 6), identical
Glossary keys and figure IDs, every UR Figure on its `.ur.svg`, 50 numbered assessment items on
each side, MCQ answer-key letters mapped A-D to الف-د with option order unchanged. Answering the
Urdu MCQs blind matched the translated key.

Fixed one semantic defect: "volatile" had been rendered as متغیر ("variable, changeable"), which
changes what MCQ 4 tests because a writable hard disk is also changeable. It is now عارضی
(volatile) and غیر عارضی (non-volatile), with the English in brackets on first use in each file,
leaving مستقل for "permanent" as the English uses it. Fixed a gender-agreement error
(چھپی ہوئی صفحے to چھپے ہوئے صفحے, 2 places). G4 tracker row moved to ▣ with a notes line and no
initials, following the convention in other trackers.

## Outcome

- ✅ Impact: GICT-300 Unit 2 Urdu mirror is gate-clean and structurally at parity; one meaning-changing terminology defect repaired.
- 🧪 Tests: check:content 13/13 PASS; temporary reviewed flip showed only the 14 unbanked key_terms and the expected G4/G5 not-done rows.
- 📁 Files: 4 Urdu unit files, the GICT-300 tracker, this PHR.
- 🔁 Next prompts: owner banks the proposed ICT terms; fresh g5-reviewer run002 on the frozen unit.
- 🧠 Reflection: the terminology bank holds no ICT vocabulary at all, so every GICT-300 unit will fail the pipeline-gate terminology check at reviewed until it is extended.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu "volatile" terminology and an agreement error fixed in GICT-300 Unit 2 (topic-01, topic-02, unit-assessment, unit-teacher-notes); G4 row ▣ with notes. translation_status stays draft in both locales.
- Decisions the team must respect: terminology.csv was not edited. Translator choice عارضی / غیر عارضی for volatile / non-volatile is a proposal, not banked.
- Pending / next owner: curriculum owner to bank or rule on 15 proposed terms: Input device ان پٹ ڈیوائس, Output device آؤٹ پٹ ڈیوائس, Storage device اسٹوریج ڈیوائس, RAM ریم, ROM روم, Secondary storage سیکنڈری اسٹوریج, System software سسٹم سافٹ ویئر, Operating system آپریٹنگ سسٹم, Application software ایپلیکیشن سافٹ ویئر, Utility software یوٹیلیٹی سافٹ ویئر, Computer network کمپیوٹر نیٹ ورک, Switch سوئچ, Router روٹر, Protocol پروٹوکول, Volatile / Non-volatile عارضی / غیر عارضی. Note the bank's Memory row (یادداشت) is psychological memory and conflicts with ICT "memory" (میموری). Rendered inspection (render-inspect.mjs --locale ur) not run because it needs a build; a G5 reviewer or the main session must run it. G5 run002 needed (run001 predates these edits).
- Paperclip issues affected: none (crew job gict-300-u02-translate).

## Evaluation notes (flywheel)

- Failure modes observed: calque terminology (متغیر for volatile) survived an advisory G5 run; gates cannot see it.
- Graders run and results (PASS/FAIL): check:content PASS; reviewed-flip run FAIL only on bank gaps and tracker rows (expected).
- Prompt variant (if applicable): crew brief
- Next experiment (smallest change to try): bank the ICT terms once for GICT-300 before translating its remaining units.
