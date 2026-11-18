---
id: crew-giss-401-u06-translate
title: crew translate GISS-401 unit 6
stage: misc
date: 2026-11-06
surface: agent
model: codex
feature: giss-401
branch: crew/giss-401-u06-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261133-translate-giss-401-unit-06-urdu.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/unit-assessment.mdx
 - specs/content/giss-401/reviews/unit-06/G4/translation-handoff.md
 - static/img/figures/giss-401/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-1.ur.svg
 - static/img/figures/giss-401/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-2.ur.svg
 - static/img/figures/giss-401/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-3.ur.svg
 - static/img/figures/giss-401/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-4.ur.svg
 - static/img/figures/giss-401/unit-06/fig-U6-5.ur.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-5.ur.svg
 - static/img/figures/giss-401/unit-06/fig-U6-6.ur.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u06-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-06/`.

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
- (giss-401-u06-review_en, review_en, agy) GISS-401 Unit 6 English draft passed independent G3 advisory review with pass disposition; G3 tracker row remains open ▢ without certification.
- (giss-401-u06-review_en, review_en, agy) All six unit SVG figures rasterized to PNG with verified mean luminance; geometry measurement via measure-figure-text.mjs was skipped per crew brief constraint against launching Playwright/Chromium and is deferred to CI figure-geometry check.
- (giss-401-u06-review_en, review_en, agy) Unit 6 is ready for Urdu translation (G4 ur-translation) and Urdu figure mirror asset generation.
- (giss-401-u06-author, author, claude) G3 needs a qualified Islamic Studies reviewer who also fetches the full UDHR text independently; it is declared unverifiable because official pages returned HTTP 403.
- (giss-401-u06-author, author, claude) Other GISS-401 unit branches also add to `tasks.md`, `sources/texts/quran-translation.md` and `sources/texts/bhat-2019-education.md`; expect add/add merge conflicts there and keep every unit's sections.


## Response snapshot

Translated all five GISS-401 Unit 6 pages and the full assessment, added six Urdu figures with dark variants, and committed the handoff and PHR.

## Outcome

- Impact: translate for GISS-401 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all five GISS-401 Unit 6 pages and the full assessment, added six Urdu figures with dark variants, and committed the handoff and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft; independent G5 and browser/A4/SVG geometry checks are pending.
  - Translation remains draft; independent G5 and browser/A4/SVG geometry checks are pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
