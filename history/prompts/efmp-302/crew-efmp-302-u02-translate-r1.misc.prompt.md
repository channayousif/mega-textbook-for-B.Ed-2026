---
id: crew-efmp-302-u02-translate-r1
title: crew re-verify EFMP-302 unit 2 Urdu mirror
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: efmp-302
branch: crew/efmp-302-u02-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-302/crew-efmp-302-u02-translate-r1.misc.prompt.md
  - specs/content/efmp-302/tasks.md
tests:
  - npm run check:content
  - npm run figures:variants:check
  - npm run test:crew
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Carried out the crew task for EFMP-302 Unit 2 on branch `crew/efmp-302-u02-translate-r1` following `.claude/skills/translate-unit/SKILL.md`:

1. Read AGENTS.md, CLAUDE.md, translate-unit SKILL.md, and all references (`parity-contract.md`, `urdu-register.md`, `assessment-translation.md`).
2. Verified bound terminology from `specs/content/terminology.csv` for EFMP-302 Unit 2: Professional Ethics (پیشہ ورانہ اخلاقیات), Code of Ethical Conduct (ضابطہ اخلاق), Ethical Dilemma (اخلاقی مخمصہ), Reflective Decision Making (غور و فکر پر مبنی فیصلہ سازی).
3. Verified the Urdu mirror (7 files: `index.mdx`, `topic-01.mdx` to `topic-04.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`) under `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/` against current English baseline `2752ef28` (unchanged from `65d2428e`):
   - Exact 1:1 file set and heading-level vector match across all 7 files.
   - Component calls match 1:1 across locales (Figure, Glossary, PrintHandout, BloomTag, ObjectiveList, ActivityCard).
   - Figure ID set and archetype kinds match 1:1 across locales (13 figure carriers: 8 schematic SVGs with `.ur.svg` sources and 5 WebP illustrations).
   - Figure variants check passed (`npm run figures:variants:check`).
   - Assessment bank retains exactly 10 MCQs, 10 RRQs, and 5 ERQs; option letters (الف, ب, ج, د), marks, translated Bloom tags, and the MCQ 6 source-attribution caveat in the bounded answer key are verified.
   - Zero em dashes (U+2014) across all files.
4. Executed temporary probe flipping `index.mdx` files to `reviewed`: `validate:content` passed (structural parity), `check:figures` passed (figure parity), and `check:pipeline-gate` confirmed zero terminology findings (only open G4/G5 tracker rows reported per ADR-0019). Reverted `translation_status` back to `draft`.
5. Updated Unit 2 G4 tracker row in `specs/content/efmp-302/tasks.md` to record the 2026-10-18 agy re-verification; status remains `▣` in-progress and `translation_status` stays `draft`.
6. All 13 content gates pass via `npm run check:content`.

## Outcome

- ✅ Impact: Verified EFMP-302 Unit 2 complete Urdu mirror against current English baseline at G4; recorded tracker row in `tasks.md`; translation_status stays draft pending independent G5.
- 🧪 Tests: npm run check:content (13/13 gates PASS), npm run figures:variants:check PASS, npm run test:crew PASS.
- 📁 Files: 2 files modified/added (`tasks.md`, PHR).
- 🔁 Next prompts: Independent G5 review in a separate fresh session per ADR-0019.
- 🧠 Reflection: The Urdu mirror had already been authored and refined, and the English baseline has not changed. This continuation verified complete structural, semantic, and terminology parity.

## Handoff (for CEO and agents)

- Shipped / changed: Updated Unit 2 G4 tracker row in `specs/content/efmp-302/tasks.md`; authored PHR `crew-efmp-302-u02-translate-r1.misc.prompt.md`.
- Decisions the team must respect: `translation_status` stays `draft` (skill Step 7); G4 stays `▣` and G5 remains open pending independent review under ADR-0019.
- Pending / next owner: Independent G5 reviewer in a separate fresh session.
- Paperclip issues affected: None.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): check:content PASS (13/13).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): None.
