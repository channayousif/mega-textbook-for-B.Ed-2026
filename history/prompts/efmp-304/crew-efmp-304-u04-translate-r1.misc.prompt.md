---
id: crew-efmp-304-u04-translate-r1
title: crew re-verify EFMP-304 unit 4 Urdu mirror
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u04-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-304/crew-efmp-304-u04-translate-r1.misc.prompt.md
  - specs/content/efmp-304/reviews/unit-04/G4/translation-handoff.md
  - specs/content/efmp-304/tasks.md
tests:
  - npm run check:content
  - npm run test:review
  - npm run check:pipeline-gate
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

Brief: Translate EFMP-304 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

## Response snapshot

Branch `crew/efmp-304-u04-translate-r1` started at `origin/main` (`8a04b4ad`). Completed full verification of the six-page Urdu mirror against English baseline (`8a04b4ad` / `65d2428e` / `a19f0138`) per `.claude/skills/translate-unit/SKILL.md`:

1. Read AGENTS.md, CLAUDE.md, and translate-unit SKILL.md.
2. Verified all 6 mirror files (`index.mdx`, `topic-01` through `topic-04`, `unit-assessment.mdx`) and confirmed structural and heading level parity against English files.
3. Verified all 8 figure assets (`fig-U4-1` to `fig-U4-8` `.ur.svg` and derived `.ur.dark.svg` variants).
4. Verified all 20 declared `key_terms` in `index.mdx` against `terminology.csv` (all bank-bound).
5. Verified assessment bank structure: 10 MCQ (options ordered الف/ب/ج/د), 10 RRQ, 5 ERQ with bounded answers block and 4-band analytical scoring rubrics.
6. Verified zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) across all files.
7. Conducted temporary flip to `translation_status: reviewed` on both English and Urdu `index.mdx` files; verified `validate:content`, `check:figures`, and `check:pipeline-gate` all pass cleanly with zero terminology or structural findings; reverted both files to `draft`.
8. Placed G4 translation handoff at `specs/content/efmp-304/reviews/unit-04/G4/translation-handoff.md`.
9. Updated G4 tracker row in `specs/content/efmp-304/tasks.md` with in-progress (`▣`) status and handoff pointer.
10. Built `static/content-status.json` and verified all 13 content gates pass cleanly.

## Outcome

- ✅ Impact: EFMP-304 Unit 4 Urdu mirror verified complete and current at G4 draft status; all 13 content gates pass.
- 🧪 Tests: `npm run check:content` (13/13 PASS), `npm run test:review` (40/40 PASS), `npm run check:pipeline-gate` (PASS).
- 📁 Files: `specs/content/efmp-304/tasks.md`, `specs/content/efmp-304/reviews/unit-04/G4/translation-handoff.md`, `history/prompts/efmp-304/crew-efmp-304-u04-translate-r1.misc.prompt.md`.
- 🔁 Next prompts: Independent G5 review in a separate fresh session per ADR-0019.
- 🧠 Reflection: The previous attempt on this rerun branch exited without committing because the Urdu content was already present on main; conducting the full verification and committing the handoff, tracker row update, and PHR completes the brief.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded G4 ur-translation tracker row note in `specs/content/efmp-304/tasks.md`; authored `specs/content/efmp-304/reviews/unit-04/G4/translation-handoff.md`; generated PHR.
- Decisions the team must respect: `translation_status` remains `draft` pending independent G5 review; no tracker rows marked `✅` without signed reviewer evidence.
- Pending / next owner: Independent G5 reviewer in a fresh session.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: Previous rerun worker exited without committing.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (13/13 gates).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
