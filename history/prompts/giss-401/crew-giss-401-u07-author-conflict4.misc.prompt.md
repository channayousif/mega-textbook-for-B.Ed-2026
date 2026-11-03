---
id: crew-giss-401-u07-author-conflict4
title: crew fix GISS-401 unit 7
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u07-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/2440-translate-giss401-unit-one.general.prompt.md
 - history/prompts/giss-401/crew-giss-401-u01-translate.misc.prompt.md
 - history/prompts/giss-401/crew-giss-401-u07-author-conflict4.misc.prompt.md
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

# Crew job giss-401-u07-author-conflict4

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u07-author conflicts with main (specs/content/giss-401/sources/texts/quran-translation.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-07/`.

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
- (giss-401-u07-author, author, claude) Reading time is 2+22+16 = 40 min, at the top of the 25-40 band only with round-to-nearest (41 if every page rounds up), so text added at G3 needs the band re-baselined.
- (giss-401-u07-author, author, claude) `sources/texts/quran-translation.md` (U7 section appended at the end) and `tasks.md` stage rows will conflict with sibling GISS-401 unit branches on merge; the hadith use the separate key `sahih-bukhari-33-893`.
- (giss-401-u07-author, author, claude) Figures fig-U7-1..3 were not measured by measure-figure-text (Chromium barred); Urdu `.ur.svg` mirrors and the G3 Islamic Studies scholar review remain open.

## Response snapshot

Merged origin/main into the Unit 7 authoring branch. The merge was conflict-free: main's new commits (GISS-401 unit 1 Urdu translation, PR #425) touch only unit-01 files, while this branch's Unit 7 source and tracker changes are untouched by main. Verified the append-only boundary in `specs/content/giss-401/sources/texts/quran-translation.md` keeps main's U1/U6 sections and this branch's U7 section in order with no duplicate heading, and that no shared registry changed on either side in this merge window. Ran the content gate suite.

## Outcome

- Impact: merge fix for GISS-401 Unit 7 by opencode (attempt 1).
- Tests: npm run check:content passed, 13/13 content gates, no findings.
- Files: 19 file(s), listed above (18 brought in from origin/main plus this work record).
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main (GISS-401 unit 1 Urdu translation, PR #425) into `crew/giss-401-u07-author`; the merge was conflict-free and Unit 7's source and tracker rows are preserved.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
