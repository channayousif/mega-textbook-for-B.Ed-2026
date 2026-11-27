---
id: crew-efpg-402-u03-translate
title: crew translate EFPG-402 unit 3
stage: misc
date: 2026-11-27
surface: agent
model: agy2
feature: efpg-402
branch: crew/efpg-402-u03-translate
user: crew
command: crew translate
labels: ["crew", "agy2", "translate"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpg-402/20261305-efpg402-u03-translate-g2-refresh.green.prompt.md
 - history/prompts/efpg-402/crew-efpg-402-u03-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/topic-07.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-03/unit-assessment.mdx
 - specs/content/efpg-402/reviews/unit-03/G2/20261127T170751869Z-gates.json
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T170751869Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T170751869Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T170751869Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T170751869Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T170751869Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T170751869Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T170751869Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T170751869Z/validate-content.txt
 - specs/content/efpg-402/tasks.md
 - specs/content/efpg-402/translations/unit-03/handoff.md
 - static/img/figures/efpg-402/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-10.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-10.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-11.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-11.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-12.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-12.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-13.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-13.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-14.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-14.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-5.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-6.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-6.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-7.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-7.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-8.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-8.ur.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-9.ur.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-9.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u03-translate

You are the agy2 worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFPG-402 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-03/`.

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
- (efpg-402-u03-review_en, review_en, agy2) All content criteria pass; visual rendering remains unverified because deployed SHA differs from HEAD on unit index and banner illustration; report disposition is advisory escalate.
- (efpg-402-u03-review_en, review_en, agy2) Advisory tracker row prepared in specs/content/efpg-402/reviews/unit-03/G3/agy-run1-20261127/advisory-tracker-row.md; G3 stage row in tasks.md remains open for parent integration.
- (efpg-402-u03-illustrate, illustrate, agy) English G3 review and Urdu mirror (G4/G5) remain open; Urdu translation job will need to translate topic files and create the 14 `.ur.svg` twins.
- (efpg-402-u03-author, author, claude) The 14 Unit 3 SVGs were drawn by Claude because Codex was out of quota; G3 should check whether each one fits its point. Urdu `.ur.svg` labels and banner fig-U3-15 (prompt-only) are still to do.
- (efpg-402-u03-author, author, claude) Unit 3 cites the existing `ncp-science-2022` and `sep-scientific-method` excerpts unchanged. Editing either file will make both Unit 1's and Unit 3's G2 evidence out of date.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFPG-402 Unit 3 (docs/semester-4/efpg-402/unit-03): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Refreshed stale G2 gate evidence for EFPG-402 Unit 3 and verified that the draft Urdu mirror passes all content gates.

## Outcome

- Impact: translate for EFPG-402 Unit 3 by agy2 (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 50 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Refreshed stale G2 gate evidence for EFPG-402 Unit 3 and verified that the draft Urdu mirror passes all content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 3 Urdu mirror (9 files) and 14 localized `.ur.svg` figures are drafted with translation_status draft; G3 English review and independent G5 Urdu review remain pending.
  - G2 en-draft gate evidence was refreshed at specs/content/efpg-402/reviews/unit-03/G2/20261127T170751869Z-gates.json and all 14 content gates pass cleanly.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
