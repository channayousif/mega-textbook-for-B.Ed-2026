---
id: crew-giss-401-u02-translate-r1
title: crew translate GISS-401 unit 2
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u02-translate-r1
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/unit-assessment.mdx
 - specs/content/svg-style-baseline.json
 - static/img/figures/giss-401/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-1.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-2.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-3.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-4.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-5.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-5.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-6.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u02-translate-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u02-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-02/`.

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
- (giss-401-u02-repair_en, repair_en, agy) Resolved the non-direct-ruling Ijma/Qiyas blueprint gap in English Topic 2.1 and unit assessment so translation may resume.
- (giss-401-u02-repair_en, repair_en, agy) G3 remains unticked pending independent Islamic Studies scholar review, mobile/print inspection, and fresh solve-before-key evaluation.
- (giss-401-u02-repair_en, repair_en, agy) Six Unit 2 SVGs await CI figure-geometry verification and subsequent Urdu `.ur.svg` authoring during translation.
- (giss-401-u02-translate, translate, codex) A separate English author and qualified scholar must resolve the Ijma/Qiyas assessment gap before translation resumes.
- (giss-401-u02-translate, translate, codex) A separate English author and qualified scholar must resolve the Ijma/Qiyas assessment gap before translation resumes.


## Response snapshot

Translated GISS-401 Unit 2 into a complete Urdu mirror (index, topics 2.1 to 2.3, unit assessment) with six authored `.ur.svg` figure variants and dark twins, all content gates green, committed as `58ded2cda`.

## Outcome

- Impact: translate for GISS-401 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GISS-401 Unit 2 into a complete Urdu mirror (index, topics 2.1 to 2.3, unit assessment) with six authored `.ur.svg` figure variants and dark twins, all content gates green, committed as `58ded2cda`.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Render inspection (`scripts/render-inspect.mjs`) could not be run because the brief bars `npm run build` and any dev server, and no Chromium is available in this checkout; `scripts/heavy.sh node scripts/measure-figure-text.mjs` passed on all six `.ur.svg`, so G5 should do the rendered Nastaliq, narrow-viewport and A4-print inspection.
  - The English baseline translated is commit `386bcc98c` (G3 revise findings applied); `translation_status` is `draft` in both index files and no G4/G5 tracker row was appended, per the skill.
  - Islamic-studies terms are absent from `specs/content/terminology.csv`; the prose uses natural Urdu consistent with unit-01 (`ماخذ`, `وحی`, `اجماع`, `قیاس`, `اسناد`, `متن`, `صحیح`, `حسن`, `ضعیف`, `مکی`, `مدني`, `ہجرت`, `تفسیر`, `شرعی حکم`, `فقہاء`, `مصحف`, `صحابہ`), which the owner may want to bank; `Memory`/`Attention` were included in `key_terms` because the English words appear, but only in ordinary senses.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
