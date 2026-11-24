---
id: crew-gent-401-u04-translate
title: crew translate GENT-401 unit 4
stage: misc
date: 2026-11-24
surface: agent
model: agy
feature: gent-401
branch: crew/gent-401-u04-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gent-401/crew-gent-401-u04-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/unit-teacher-notes.mdx
 - specs/content/gent-401/reviews/unit-04/G4/translation-handoff.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-1.ur.svg
 - static/img/figures/gent-401/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-2.ur.svg
 - static/img/figures/gent-401/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-3.ur.svg
 - static/img/figures/gent-401/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u04-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GENT-401 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-04/`.

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
- (gent-401-u04-author-conflict2, fix, claude_crew) Unit 4's G2 evidence is 20261124T062449556Z-gates.json; the stale 20261124T062155314Z and 20261124T050320192Z evidence directories are still on the branch and can be pruned.
- (gent-401-u04-author-conflict2, fix, claude_crew) The merged scott-2017-efmd.md binds Unit 4 notes with pp. 53-76 locators authored only on this branch; a G3 reviewer should check them against the printed pagination.
- (gent-401-u04-author-conflict2, fix, claude_crew) The merge pulled main's Unit 2 (docs, specs, figures, G2 evidence, glossary terms, PHRs), which is outside this job's Unit 4 scope and was not re-reviewed here.
- (gent-401-u04-author-conflict1, fix, claude_crew) Unit 4's G2 evidence is now 20261124T062449556Z-gates.json; the earlier 20261124T062155314Z and 20261124T050320192Z evidence directories are stale leftovers this branch can prune if wanted.
- (gent-401-u04-author-conflict1, fix, claude_crew) The merged scott-2017-efmd.md binds Unit 4 notes with pp. 53-76 locators that only the branch authored; a G3 reviewer should check them against the printed pagination.


## Response snapshot

Translated GENT-401 Unit 4 into its complete five-file Urdu mirror with four localized schematic SVG pairs and derived dark twins, verified clean gates, and recorded the G4 handoff.

## Outcome

- Impact: translate for GENT-401 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GENT-401 Unit 4 into its complete five-file Urdu mirror with four localized schematic SVG pairs and derived dark twins, verified clean gates, and recorded the G4 handoff.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 4 business plan terms (کاروباری منصوبہ، انتظامی خلاصہ، تصور اور مقصد کے بیانات، مارکیٹنگ کا منصوبہ، عملیاتی منصوبہ، تنظیمی ڈھانچہ) are authored proposals not in terminology.csv; an independent G5 reviewer should verify them.
  - Four localized RTL schematic SVGs (fig-U4-1 to fig-U4-4) and derived dark variants passed text geometry measurement cleanly and match page alt text.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
