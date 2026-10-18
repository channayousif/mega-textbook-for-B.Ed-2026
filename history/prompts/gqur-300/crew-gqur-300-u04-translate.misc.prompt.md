---
id: crew-gqur-300-u04-translate
title: crew translate GQUR-300 unit 4
stage: misc
date: 2026-10-18
surface: agent
model: longcat/LongCat-2.0
feature: gqur-300
branch: crew/gqur-300-u04-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-300/crew-gqur-300-u04-translate.misc.prompt.md
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u04-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u04-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-300 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Verified the complete GQUR-300 Unit 4 Urdu mirror and figure variants against English baseline, confirmed structural parity clean under temporary reviewed flip (reverted), updated the G4 tracker row to in-progress with detailed notes, and passed all 13 content gates.

## Outcome

- Impact: translate verification and G4 tracker update for GQUR-300 Unit 4.
- Tests: npm run check:content passed (all 13 gates).
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: Urdu mirror was already present on origin/main from an earlier commit; this job verified and recorded the G4 row.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the complete GQUR-300 Unit 4 Urdu mirror (6 files, 12 .ur.svg/.ur.dark.svg figure variants) against the English baseline, confirmed structural parity clean under a temporary reviewed flip (then reverted), updated the G4 tracker row to in-progress with detailed notes, and passed all 13 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All 12 key_terms in Unit 4 index.mdx (Area, Centimetre, Circle, Kilogram, Millilitre, Perimeter, Radius, Rectangle, Square, Triangle, Unit of measurement, Volume) remain unbanked in terminology.csv and await curriculum owner banking.
  - The G4 tracker row in specs/content/gqur-300/tasks.md is set to in-progress (▣) and translation_status remains draft pending independent G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
