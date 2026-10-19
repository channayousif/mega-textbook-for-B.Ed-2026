---
id: crew-efmp-303-u02-translate
title: crew translate EFMP-303 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: efmp-303
branch: crew/efmp-303-u02-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u02-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/topic-01.mdx
 - specs/content/efmp-303/reviews/unit-02/G4/translation-handoff.md
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u02-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u02-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-303 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Verified EFMP-303 Unit 2's six-file Urdu mirror against the English baseline, repaired topic-01 phrasing (شاہد to شواہد), verified all 6 .ur.svg and .ur.dark.svg figure assets, verified key terms against terminology.csv, confirmed clean temporary reviewed parity flip (reverted), authored G4 translation handoff, recorded in-progress G4 tracker row, and passed all 13 content gates.

## Outcome

- Impact: translate for EFMP-303 Unit 2 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before committing.
- Files: 4 file(s), listed above.
- Next prompts: Independent G5 review in a separate fresh session per ADR-0019.
- Reflection: The previous worker exited without committing because the Urdu files existed from an earlier authoring run but the G4 tracker row and handoff were never committed. Full verification, phrasing fix, handoff documentation, and tracker recording resolve the task completely.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded G4 ur-translation tracker row in `specs/content/efmp-303/tasks.md`; authored `specs/content/efmp-303/reviews/unit-02/G4/translation-handoff.md`; repaired wording in `topic-01.mdx`; created PHR.
- Decisions the team must respect: `translation_status` remains `draft` pending independent G5 review; no tracker rows marked done without signed reviewer evidence.
- Pending / next owner: Independent G5 reviewer in a fresh session.
- Notes for the next job on this unit:
  - Urdu mirror translation_status remains draft across all 6 unit files pending fresh independent G5 review.
  - All 6 .ur.svg and .ur.dark.svg schematic figures are placed and verified clean.
  - Concept labels and unbanked terms are documented in `specs/content/efmp-303/reviews/unit-02/G4/translation-handoff.md` for owner review.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); previous worker exited without committing
- Graders run and results (PASS/FAIL): check:content PASS (13/13 gates)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
