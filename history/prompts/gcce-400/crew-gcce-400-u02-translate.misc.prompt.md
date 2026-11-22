---
id: crew-gcce-400-u02-translate
title: crew translate GCCE-400 unit 2
stage: misc
date: 2026-11-22
surface: agent
model: claude_crew
feature: gcce-400
branch: crew/gcce-400-u02-translate
user: crew
command: crew translate
labels: ["crew", "claude_crew", "translate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gcce-400/crew-gcce-400-u02-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-02/unit-teacher-notes.mdx
 - specs/content/gcce-400/reviews/unit-02/G2/20261122T133248694Z-gates.json
 - specs/content/gcce-400/reviews/unit-02/G2/logs-20261122T133248694Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-02/G2/logs-20261122T133248694Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-02/G2/logs-20261122T133248694Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-02/G2/logs-20261122T133248694Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-02/G2/logs-20261122T133248694Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-02/G2/logs-20261122T133248694Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-02/G2/logs-20261122T133248694Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-02/G2/logs-20261122T133248694Z/validate-content.txt
 - specs/content/gcce-400/tasks.md
 - specs/content/gcce-400/translations/unit-02/check-content-parity.txt
 - specs/content/gcce-400/translations/unit-02/handoff.md
 - static/img/figures/gcce-400/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/gcce-400/unit-02/fig-U2-1.ur.svg
 - static/img/figures/gcce-400/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/gcce-400/unit-02/fig-U2-2.ur.svg
 - static/img/figures/gcce-400/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/gcce-400/unit-02/fig-U2-3.ur.svg
 - static/img/figures/gcce-400/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/gcce-400/unit-02/fig-U2-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u02-translate

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GCCE-400 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-02/`.

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
- (gcce-400-u02-author, author, claude) glossary.json gained 5 terms appended at the end; expect merge conflicts if sibling jobs also append there.
- (gcce-400-u02-author, author, claude) G3 should check the Sindh Local Government Act claim (street lighting as local-council work) against the Act's schedule; Batool 2019 was used from its abstract only.
- (gcce-400-u02-author, author, claude) course-overview.mdx still mentions only Unit 1 (left alone because editing it would make every unit's G2 evidence out of date); no .ur.svg yet; banner fig-U2-5 is prompt-only.


## Response snapshot

Translated GCCE-400 Unit 2 into a complete five-file Urdu mirror with four localized RTL `.ur.svg` figures, bank-bound `key_terms`, a G4 tracker note and handoff, and refreshed G2 gate evidence, all committed with `translation_status` left at `draft`.

## Outcome

- Impact: translate for GCCE-400 Unit 2 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GCCE-400 Unit 2 into a complete five-file Urdu mirror with four localized RTL `.ur.svg` figures, bank-bound `key_terms`, a G4 tracker note and handoff, and refreshed G2 gate evidence, all committed with `translation_status` left at `draft`.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `scripts/render-inspect.mjs --locale ur` was not run (the brief forbids build/dev server); G5 owns the 360px and A4 print inspection and the RTL table reading order in `fig-U2-4`.
  - the proposed Urdu civic terms in `specs/content/gcce-400/translations/unit-02/handoff.md` need an owner decision; `terminology.csv` and `glossary.json` were deliberately left unchanged.
  - G3 en-review stays open (Sindh Local Government Act street-lighting example, Batool 2019 abstract-only use, constitutional currency).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
