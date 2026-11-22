---
id: crew-gcce-400-u03-translate
title: crew translate GCCE-400 unit 3
stage: misc
date: 2026-11-22
surface: agent
model: claude_crew
feature: gcce-400
branch: crew/gcce-400-u03-translate
user: crew
command: crew translate
labels: ["crew", "claude_crew", "translate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gcce-400/crew-gcce-400-u03-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/unit-teacher-notes.mdx
 - specs/content/gcce-400/tasks.md
 - specs/content/gcce-400/translations/unit-03/check-content-parity.txt
 - specs/content/gcce-400/translations/unit-03/handoff.md
 - static/img/figures/gcce-400/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-1.ur.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-2.ur.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-3.ur.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/gcce-400/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u03-translate

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GCCE-400 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-03/`.

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
- (gcce-400-u03-author-conflict4, fix, claude_crew) Unit 4 has two G2 evidence dirs (`114158475Z` and `144142079Z`); the tracker points at the newer one and the older dir remains on disk.
- (gcce-400-u03-author-conflict4, fix, claude_crew) Unit 3 G3 en-review is still open (constitutional currency, Articles 8-28 and Article 5); Urdu G4/G5 remains a separate downstream job under the untranslated notice.
- (gcce-400-u03-author-conflict3, fix, agy) G3 en-review is still open for Unit 3; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
- (gcce-400-u03-author-conflict3, fix, agy) Urdu G4/G5 is a separate downstream job; Unit 3 stays under the required untranslated notice.
- (gcce-400-u03-author-conflict3, fix, agy) The tracker now carries Unit 1, 2, 3, 4, 5 and 6 rows; the next unit job should re-point its G2 row only if its evidence file changes.

## Response snapshot

Translated GCCE-400 Unit 3 into a complete five-file Urdu mirror with four localized RTL `.ur.svg` figures, bank-bound `key_terms`, a G4 tracker note and a handoff, all committed with `translation_status` left at `draft`.

## Outcome

- Impact: translate for GCCE-400 Unit 3 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree; the reviewed flip was run, then both index files were restored byte-for-byte to `draft`.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GCCE-400 Unit 3 into a complete five-file Urdu mirror with four localized RTL `.ur.svg` figures (and their derived dark twins), bank-bound `key_terms`, a G4 tracker note and a handoff, all committed with `translation_status` left at `draft`.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit does not certify anything. `terminology.csv` and `glossary.json` were deliberately left unchanged.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the commit touches a protected path).
- Notes for the next job on this unit:
  - `scripts/render-inspect.mjs --locale ur` was not run (the brief forbids build/dev server); G5 owns the 360px and A4 print inspection and the RTL reading order in `fig-U3-1` and `fig-U3-2`.
  - the proposed Urdu constitutional and civic terms in `specs/content/gcce-400/translations/unit-03/handoff.md` need an owner decision.
  - G3 en-review stays open (constitutional currency of Articles 8-28 and Article 5).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
