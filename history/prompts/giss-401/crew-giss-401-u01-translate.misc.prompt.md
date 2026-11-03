---
id: crew-giss-401-u01-translate
title: crew translate GISS-401 unit 1
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: giss-401
branch: crew/giss-401-u01-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/2440-translate-giss401-unit-one.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/unit-assessment.mdx
 - specs/content/giss-401/reviews/unit-01/G4/conditional-parity-gates.txt
 - specs/content/giss-401/reviews/unit-01/G4/content-gates.txt
 - specs/content/giss-401/reviews/unit-01/G4/source-parity.txt
 - specs/content/giss-401/reviews/unit-01/G4/translation-handoff.md
 - static/img/figures/giss-401/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/giss-401/unit-01/fig-U1-1.ur.svg
 - static/img/figures/giss-401/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/giss-401/unit-01/fig-U1-2.ur.svg
 - static/img/figures/giss-401/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/giss-401/unit-01/fig-U1-3.ur.svg
 - static/img/figures/giss-401/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/giss-401/unit-01/fig-U1-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u01-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (giss-401-u01-review_en-conflict1, fix, opencode) The merge keeps main's newer Unit 1 G2 gates file (20261103T002225035Z); the branch's older 20261102T230118463Z file is no longer the tracker reference.
- (giss-401-u01-review_en-conflict1, fix, opencode) Unit 1 G3 remains open (▢) and unsigned pending qualified Islamic Studies sign-off; Unit 4 arrived from main with its own G3 pending.
- (giss-401-u01-review_en-conflict1, fix, opencode) Unit 1's four SVGs have never been measured by measure-figure-text; CI figure-geometry may flag them, so G6 stays ▣.
- (giss-401-u01-review_en, review_en, agy) GISS-401 Unit 1 G3 English review passed all 7 criteria with advisory pass evidence; G3 remains open (▢) and unsigned pending qualified theological sign-off per content spec drafting note 2.
- (giss-401-u01-review_en, review_en, agy) All four English SVGs and dark variants are placed and verified non-blank via Sharp rasterization; Playwright Chromium geometry measurement was deferred per brief.


## Response snapshot

Translated all four GISS-401 Unit 1 pages and four figures into Urdu, with dark variants, validation logs and handoff notes.

## Outcome

- Impact: translate for GISS-401 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all four GISS-401 Unit 1 pages and four figures into Urdu, with dark variants, validation logs and handoff notes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Status remains draft; tracker rows remain open per the skill. Browser geometry, RTL/print inspection and independent G5 review remain pending.
  - Status remains draft; tracker rows remain open per the skill. Browser geometry, RTL/print inspection and independent G5 review remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
