---
id: crew-gicp-400-u07-translate-r1
title: crew translate GICP-400 unit 7
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u07-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261191-gicp-400-unit-07-urdu-translation.general.prompt.md
 - history/prompts/gicp-400/crew-gicp-400-u07-translate-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/unit-assessment.mdx
 - specs/content/gicp-400/reviews/unit-07/G4/translation-handoff.md
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-1.ur.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-2.ur.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u07-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u07-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-07/`.

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
- (gicp-400-u07-repair_en, repair_en, agy) The ideology strand remains pending an owner ruling before translation (G4) or final certification.
- (gicp-400-u07-repair_en, repair_en, agy) G3 tracker row is appended as advisory revise with repairs applied and remains unticked (▢) awaiting fresh round-2 independent review under ADR-0019.
- (gicp-400-u07-repair_en, repair_en, agy) All 14 content gates pass and `measure-figure-text.mjs` passes with zero errors on all modified SVG variants.
- (gicp-400-u07-translate, translate, codex) English repairs and the owner’s ideology ruling must precede translation.
- (gicp-400-u07-translate, translate, codex) English repairs and the owner’s ideology ruling must precede translation.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Completed GICP-400 Unit 7 draft Urdu translation at G4 across all three MDX files and three localised schematic SVGs with derived dark twins, passing all 14 content gates.

## Outcome

- Impact: translate for GICP-400 Unit 7 by agy (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed GICP-400 Unit 7 draft Urdu translation at G4 across all three MDX files and three localised schematic SVGs with derived dark twins, passing all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 7 draft Urdu mirror has full structural, component and figure parity; translation_status remains draft awaiting independent G5 review.
  - Rendered mobile 360px and A4 print layout inspection remain outstanding under the crew browser restriction.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
