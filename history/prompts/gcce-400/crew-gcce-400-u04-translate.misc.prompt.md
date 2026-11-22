---
id: crew-gcce-400-u04-translate
title: crew translate GCCE-400 unit 4
stage: misc
date: 2026-11-22
surface: agent
model: antigravity
feature: gcce-400
branch: crew/gcce-400-u04-translate
user: crew
command: crew translate
labels: ["crew", "antigravity", "translate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gcce-400/crew-gcce-400-u04-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/unit-teacher-notes.mdx
 - specs/content/gcce-400/tasks.md
 - specs/content/gcce-400/translations/unit-04/check-content-parity.txt
 - specs/content/gcce-400/translations/unit-04/handoff.md
 - static/img/figures/gcce-400/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-1.ur.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-2.ur.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-3.ur.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-4.ur.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-5.ur.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-5.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u04-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GCCE-400 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-04/`.

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
- (gcce-400-u04-author, author, claude_crew) Five SVGs were hand-authored by Claude (AGENTS.md/ADR-0024 assigns deterministic schematics to Claude), optimised and measured; banner fig-U4-6 stays prompt-only for the illustrate job, and no `.ur.svg` exists yet because the Urdu mirror is a separate G4 job.
- (gcce-400-u04-author, author, claude_crew) G3 en-review is open; the tracker note asks the reviewer to confirm the youniss-levine-2009 title-level use, the oecd-2011-social-cohesion definition against the report, and constitutional currency of Articles 16, 19 and 25.
- (gcce-400-u04-author, author, claude_crew) G2 evidence binds the committed English bytes at `specs/content/gcce-400/reviews/unit-04/G2/20261122T114158475Z-gates.json`; any further edit to the unit files or figure manifest will stale it.

## Response snapshot

Translated GCCE-400 Unit 4 into its complete Urdu mirror at G4, authored 5 localized schematic SVGs with derived dark twins, verified all 14 content gates green with `translation_status` still `draft`, and recorded the G4 tracker note and handoff.

## Outcome

- Impact: translate for GCCE-400 Unit 4 by antigravity.
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 19 file(s), listed above.
- Next prompts: independent G5 Urdu review.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Complete five-file Urdu mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/`, five localized SVG pairs with derived dark twins under `static/img/figures/gcce-400/unit-04/`, G4 tracker row updated in `specs/content/gcce-400/tasks.md`, and translation handoff with parity log under `specs/content/gcce-400/translations/unit-04/`.
- Decisions the team must respect: G4/G5 stay advisory until qualified independent review sign-off; `translation_status` remains `draft`. English files were not modified, preserving G2 evidence.
- Pending / next owner: independent G5 Urdu reviewer.
- Notes for the next job on this unit:
  - `scripts/render-inspect.mjs --locale ur` was not run (job brief forbids build/dev server); G5 owns the 360px and A4 print inspection and RTL table/diagram flow.
  - The nine authored concept labels in `concepts/unit-04.md` and proposed civic terms in `translations/unit-04/handoff.md` await review.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none; all gates passed.
- Graders run and results (PASS/FAIL): check:content PASS (all 14 gates pass).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): none.
