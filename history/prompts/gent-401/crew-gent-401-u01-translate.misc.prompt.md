---
id: crew-gent-401-u01-translate
title: crew translate GENT-401 unit 1
stage: misc
date: 2026-11-24
surface: agent
model: agy
feature: gent-401
branch: crew/gent-401-u01-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gent-401/crew-gent-401-u01-translate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-01/unit-teacher-notes.mdx
 - specs/content/gent-401/reviews/unit-01/G4/translation-handoff.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/gent-401/unit-01/fig-U1-1.ur.svg
 - static/img/figures/gent-401/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/gent-401/unit-01/fig-U1-2.ur.svg
 - static/img/figures/gent-401/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gent-401/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gent-401/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/gent-401/unit-01/fig-U1-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u01-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GENT-401 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-01/`.

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
- (gent-401-u01-author, author, claude) The G3 reviewer should confirm Butler's IEA edition year (spec says 2020, a search result said 2022, an IEA listing from April 2021 conflicts with 2022) and that the unverifiable mellor-2009 row backs only the premise in its title.
- (gent-401-u01-author, author, claude) This job added the GENT-401 entry to catalog/course-guides.json (pages 10-13) and cut static/guides/semester-4/gent-401.pdf so the overview passes validate:content; the owner should approve or revert it.
- (gent-401-u01-author, author, claude) Figures are placed in English only (fig-U1-1 to fig-U1-4, no .ur.svg yet); banner fig-U1-5 is a prompt-only row in figures/unit-01.banner.md for the illustrate job.


## Response snapshot

Translated GENT-401 Unit 1 into a complete 5-file Urdu mirror with 4 localized RTL schematic SVGs and derived dark variants, bound to terminology.csv with all content gates passing.

## Outcome

- Impact: translate for GENT-401 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GENT-401 Unit 1 into a complete 5-file Urdu mirror with 4 localized RTL schematic SVGs and derived dark variants, bound to terminology.csv with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Proposed unbanked terms for owner/G5 review: "Entrepreneurship" -> "کاروباری صلاحیت", "Innovation" -> "جدت", "Calculated risk" -> "سوچا سمجھا خطرہ", "Managerial thinking" -> "انتظامی سوچ".
  - All four .ur.svg figures passed measure-figure-text geometry and have derived .ur.dark.svg twins; banner fig-U1-5 remains prompt-only for the illustrate job.
  - G4 tracker row updated and translation_status stays draft pending independent G5 evaluation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
