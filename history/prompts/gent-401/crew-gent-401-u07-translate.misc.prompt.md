---
id: crew-gent-401-u07-translate
title: crew translate GENT-401 unit 7
stage: misc
date: 2026-11-24
surface: agent
model: agy
feature: gent-401
branch: crew/gent-401-u07-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gent-401/crew-gent-401-u07-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/unit-teacher-notes.mdx
 - specs/content/gent-401/reviews/unit-07/G4/translation-handoff.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-1.ur.svg
 - static/img/figures/gent-401/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-2.ur.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.ur.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.ur.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u07-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u07-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GENT-401 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-07/`.

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
- (gent-401-u07-author-conflict4, fix, claude_crew) Unit 7's G2 evidence `20261124T060041498Z-gates.json` is unaffected (no GENT-401 G2 manifest hashes `sources/texts/*`); Unit 7 stays English-only with banner fig-U7-5 prompt-only and G3/G5 unticked, so G3 en-review is the next stage.
- (gent-401-u07-author-conflict4, fix, claude_crew) `openstax-entrepreneurship.md` now holds main's Unit 5 chapter 9 block then the branch's Unit 7 block; per-unit note numbers restart, so later jobs should append, not renumber.
- (gent-401-u07-author-conflict4, fix, claude_crew) `glossary.json` merged both sides with no duplicate keys; `D-2026-0053` and `G-2026-212` are pre-existing main IDs cited by Unit 7, not new branch IDs.
- (gent-401-u07-author-conflict3, fix, claude_crew) The OpenStax `Consulted:` line is now the 28-section union; the closing `## Use in GENT-401` summary still lists only Units 1, 4 and 6 (main's partial index already omitted Unit 3), so a later job may add Unit 7.
- (gent-401-u07-author-conflict3, fix, claude_crew) No GENT-401 G2 manifest hashes `sources/texts/*`, so the shared source-text change does not stale Unit 7's G2 row (`20261124T060041498Z-gates.json`); Unit 7 stays English-only with banner fig-U7-5 prompt-only and G3/G5 unticked, so G3 en-review is the next stage.


## Response snapshot

Translated GENT-401 Unit 7 into its complete 5-file Urdu mirror with 4 localized RTL schematic figures, dark variants, verified text geometry, exact heading parity, and passing content gates.

## Outcome

- Impact: translate for GENT-401 Unit 7 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GENT-401 Unit 7 into its complete 5-file Urdu mirror with 4 localized RTL schematic figures, dark variants, verified text geometry, exact heading parity, and passing content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G4 translation complete for GENT-401 Unit 7 with `translation_status: draft` preserved across all files; G5 independent review remains open.
  - Four localized `.ur.svg` figures and generated `.ur.dark.svg` variants passed text measurement cleanly; banner `fig-U7-5` remains `prompt-only` for illustration.
  - Proposed terms for owner review and G5 are documented in `specs/content/gent-401/reviews/unit-07/G4/translation-handoff.md`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
