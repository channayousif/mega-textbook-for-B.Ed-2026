---
id: crew-efpg-402-u01-translate
title: crew translate EFPG-402 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: gemini
feature: efpg-402
branch: crew/efpg-402-u01-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpg-402/crew-efpg-402-u01-translate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-01/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-01/unit-assessment.mdx
 - specs/content/efpg-402/tasks.md
 - specs/content/efpg-402/translations/unit-01/handoff.md
 - static/img/figures/efpg-402/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-1.ur.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-10.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-10.ur.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-2.ur.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-3.ur.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-4.ur.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-5.ur.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-6.ur.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-7.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-7.ur.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-8.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-8.ur.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-9.ur.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-9.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u01-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFPG-402 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-01/`.

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
- (efpg-402-u01-author, author, claude) catalog/course-guides.json was edited (EFPG-402 entry, pages 21-24, plus static/guides/semester-4/efpg-402.pdf) despite the brief's catalog ban, because validate:content requires it for the overview and sibling jobs did the same; revert if the ban covers this file.
- (efpg-402-u01-author, author, claude) Urdu mirror job needs ten .ur.svg label translations (generator kept at .crew/gen_figs.py); banner fig-U1-11 is prompt-only for the illustrate job; npm run build has not been run on these pages.
- (efpg-402-u01-author, author, claude) Topic 1.2 runs 10 reading-min against the spec's 6-9 per-topic guide (unit total 58 is within 42-61); fig-U1-6 prompt was changed to a top-to-bottom layout.

## Response snapshot

Translated EFPG-402 Unit 1 into its complete 7-file Urdu mirror at G4 bound to terminology.csv (`index.mdx`, five topic files with titles `موضوع N.M - ...`, and `unit-assessment.mdx` with 10/10/5 bank and bounded answers section), placed ten `.ur.svg` figures with their `.ur.dark.svg` variants (verified by measure-figure-text), recorded G4 tracker row and handoff, with all 14 content gates passing.

## Outcome

- Impact: translate for EFPG-402 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed cleanly in the job worktree.
- Files: 30 file(s), listed above.
- Next prompts: independent G5 review.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Urdu mirror for EFPG-402 Unit 1 (7 MDX files), 10 localized `.ur.svg` figure pairs with derived `.ur.dark.svg` twins, translation handoff document, updated task tracker, and prompt record.
- Decisions the team must respect: G4 translation complete at draft status; G5 review remains open and independent under ADR-0019; translation_status stays draft pending qualified G5 review.
- Pending / next owner: independent G5 reviewer (g5-reviewer session).
- Notes for the next job on this unit:
  - Urdu mirror complete for all 7 unit files and ten localized SVG pairs with dark twins.
  - Banner fig-U1-11 remains prompt-only for the illustrate job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
