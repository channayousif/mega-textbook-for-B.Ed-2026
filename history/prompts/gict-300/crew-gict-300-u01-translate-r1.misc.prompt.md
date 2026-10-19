---
id: crew-gict-300-u01-translate-r1
title: crew translate GICT-300 unit 1 (attempt r1)
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: gict-300
branch: crew/gict-300-u01-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate", "gict-300", "unit-01"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/unit-assessment.mdx
 - specs/content/gict-300/reviews/unit-01/G4/translation-handoff.md
 - specs/content/gict-300/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
 - npm run figures:variants:check
---

## Prompt

# Crew job gict-300-u01-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gict-300-u01-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICT-300 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICT-300 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gict-300/`, and `static/img/figures/gict-300/unit-01/`.

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

Reconciled the GICT-300 Unit 1 Urdu translation mirror with English baseline ee13c3e2, bound declared key_terms in index.mdx to accepted terms in terminology.csv, polished embedded computer noun phrases in topic-03 and assessment summary, authored the translation handoff record at specs/content/gict-300/reviews/unit-01/G4/translation-handoff.md, updated the G4 tracker row with the handoff link, refreshed content status, and verified all 13 content gates pass cleanly.

## Outcome

- Impact: complete G4 Urdu translation handoff and mirror verification for GICT-300 Unit 1 by agy (attempt r1).
- Tests: `npm run check:content` (13/13 gates pass), `npm run figures:variants:check` (772 figures clean), temporary reviewed-flip parity check passed without error.
- Files: 6 files touched / created.
- Next prompts: fresh independent G5 Urdu review once G3 English review dependency is satisfied.
- Reflection: previous worker exited without committing because the Urdu files were already drafted, but key_terms in index.mdx had not been bound to terminology.csv, no translation handoff was authored, and the tracker lacked the handoff record link. Completing these fulfills the G4 translation contract.

## Handoff (for CEO and agents)

- Shipped / changed: Bound key_terms in index.mdx to terminology.csv, polished embedded computing class references, authored specs/content/gict-300/reviews/unit-01/G4/translation-handoff.md with all 12 proposed unbanked concepts, updated tasks.md G4 row with handoff link, and refreshed static/content-status.json.
- Decisions the team must respect: G4 remains in-progress (▣) and translation_status stays draft pending a fresh independent G5 review. No self-certification claimed.
- Notes for the next job on this unit:
  - Unit 1 Urdu mirror has full 7-file structural, heading and component parity with English baseline ee13c3e2.
  - All 12 unbanked concept labels from concepts/unit-01.md are recorded in reviews/unit-01/G4/translation-handoff.md for curriculum owner promotion.
  - All 13 content gates pass cleanly.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: previous worker exited without committing any change; addressed by completing the handoff and binding the key terms.
- Graders run and results (PASS/FAIL): check:content PASS (13/13)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
