---
id: crew-efmp-408-u03-translate
title: crew translate EFMP-408 unit 3
stage: misc
date: 2026-11-24
surface: agent
model: claude
feature: efmp-408
branch: crew/efmp-408-u03-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/unit-teacher-notes.mdx
 - specs/content/efmp-408/reviews/unit-03/G4/translation-handoff.md
 - specs/content/efmp-408/tasks.md
 - static/img/figures/efmp-408/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-5.ur.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-6.ur.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-6.ur.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-7.ur.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-7.ur.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-8.ur.dark.svg
 - static/img/figures/efmp-408/unit-03/fig-U3-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u03-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFMP-408 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-03/`.

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
- (efmp-408-u03-author, author, agy) Banner figure fig-U3-9 remains prompt-only in specs/content/efmp-408/figures/unit-03.banner.md awaiting raster asset production.
- (efmp-408-u03-author, author, agy) Unit 3 G3 review and Urdu translation (G4) stages remain open in specs/content/efmp-408/tasks.md.


## Response snapshot

Translated EFMP-408 Unit 3 into a complete draft Urdu mirror (7 pages, 8 RTL figures with dark variants), recorded the G4 tracker note and handoff, with translation_status still draft and all content gates passing.

## Outcome

- Impact: translate for EFMP-408 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFMP-408 Unit 3 into a complete draft Urdu mirror (7 pages, 8 RTL figures with dark variants), recorded the G4 tracker note and handoff, with translation_status still draft and all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Flawed items whose flaw depends on the English article "an" are kept in English with an Urdu meaning; G5 should confirm this choice (listed in reviews/unit-03/G4/translation-handoff.md).
  - Rendered Urdu pages were not inspected (no local build allowed); G5 needs render-inspect evidence. Unbanked terms such as جدولِ تخصیص, رہنمائے نمبرات and گمراہ کن متبادل are listed as proposals in the handoff.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
