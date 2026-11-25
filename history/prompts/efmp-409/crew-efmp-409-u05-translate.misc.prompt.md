---
id: crew-efmp-409-u05-translate
title: crew translate EFMP-409 unit 5
stage: misc
date: 2026-11-25
surface: agent
model: claude
feature: efmp-409
branch: crew/efmp-409-u05-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-05/unit-teacher-notes.mdx
 - specs/content/efmp-409/reviews/unit-05/G4/translation-handoff.md
 - specs/content/efmp-409/tasks.md
 - static/img/figures/efmp-409/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-1.ur.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-2.ur.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-3.ur.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-4.ur.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-5.ur.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u05-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFMP-409 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-05/`.

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
- (efmp-409-u05-author-conflict3, fix, claude_crew) The pipeline-gate failure is explained by the tasks.md conflict: a one-sided resolution drops Unit 5's G2 row, so keep-both was required.
- (efmp-409-u05-author-conflict3, fix, claude_crew) Unit 5 G2 evidence still points at reviews/unit-05/G2/20261125T085534293Z-gates.json and revalidates; no Unit 5 content changed, so no fresh prepare-gate-evidence run was needed.
- (efmp-409-u05-author-conflict3, fix, claude_crew) Reading-minutes total 62 is exactly at the 46-62 ceiling, banner fig-U5-7 is still prompt-only, and Unit 5 is English only, so G3/G4/G5 stay open.
- (efmp-409-u05-author-conflict2, fix, claude_crew) The brief's premise did not reproduce: the tasks.md merge was clean, so the hourly batch's failure likely came from a different conflict resolution, not from a missing G2 row.
- (efmp-409-u05-author-conflict2, fix, claude_crew) Unit 5 G2 evidence still points at reviews/unit-05/G2/20261125T085534293Z-gates.json; no Unit 5 English file, manifest, source, coverage or concept changed, so no fresh prepare-gate-evidence run was required.


## Response snapshot

Translated EFMP-409 Unit 5 into a complete draft Urdu mirror with six RTL-localized figures, a G4 handoff and tracker note, with all content gates passing.

## Outcome

- Impact: translate for EFMP-409 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFMP-409 Unit 5 into a complete draft Urdu mirror with six RTL-localized figures, a G4 handoff and tracker note, with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The concept labels for CON:EFMP-409-5-3 and 5-4 use اجراء for "implementation", while the Urdu prose uses نفاذ for implementation and اجرا for "launch"; G5 should decide whether to align the labels.
  - fig-U5-4 and fig-U5-5 Urdu viewBoxes are taller than the English (540 vs 430, 400 vs 330), and labels with hyphenated numbers use LRM inside an RTL embedding; keep both if these figures are edited again.
  - Urdu rendered-page inspection (render-inspect at 360 px and A4) has not been done; G5 should do it on the live site.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
