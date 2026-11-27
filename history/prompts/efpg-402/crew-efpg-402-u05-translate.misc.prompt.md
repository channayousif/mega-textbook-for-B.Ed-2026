---
id: crew-efpg-402-u05-translate
title: crew translate EFPG-402 unit 5
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: efpg-402
branch: crew/efpg-402-u05-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpg-402/20261304-efpg402-u05-translate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/unit-assessment.mdx
 - specs/content/efpg-402/reviews/unit-05/G2/20261127T160444998Z-gates.json
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T160444998Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T160444998Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T160444998Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T160444998Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T160444998Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T160444998Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T160444998Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T160444998Z/validate-content.txt
 - specs/content/efpg-402/tasks.md
 - specs/content/efpg-402/translations/unit-05/handoff.md
 - static/img/figures/efpg-402/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-1.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-10.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-10.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-2.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-3.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-5.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-6.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-7.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-7.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-8.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-8.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-9.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-9.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u05-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFPG-402 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-05/`.

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
- (efpg-402-u05-author-conflict1, fix, claude_crew) Unit 5 G4 Urdu mirror and independent G3 English review are still open for separate jobs.
- (efpg-402-u05-author-conflict1, fix, claude_crew) `specs/content/efpg-402/sources/texts/bscs-2006-5e.md` is now shared by Unit 3 and Unit 5; keep both the "Unit 3 use" map and the Unit 5 phase-excerpt section in future edits.
- (efpg-402-u05-author-conflict1, fix, claude_crew) Unit 5 banner (`unit-05.banner.md`) is still not drafted.
- (efpg-402-u05-author, author, agy2) Urdu mirror job (G4) will need to localize the 10 placed SVGs (.ur.svg twins) and unit prose; G3 English review remains open for independent review.
- (efpg-402-u05-author, author, agy2) Unit banner (unit-05.banner.md) is not yet drafted and will be planned during raster illustration passes.


## Response snapshot

Added the draft Urdu mirror of EFPG-402 Unit 5 (seven pages and ten right-to-left figures with dark versions), with tracker notes, translation handoff, PHR and refreshed G2 evidence, committed but not pushed.

## Outcome

- Impact: translate for EFPG-402 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the draft Urdu mirror of EFPG-402 Unit 5 (seven pages and ten right-to-left figures with dark versions), with tracker notes, translation handoff, PHR and refreshed G2 evidence, committed but not pushed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Topic 5.2's 5E example has pupils tasting samples next to unlabelled soap solution and vinegar; G3 should fix the English, then the matching Urdu line in topic-02.
  - Other English defects (ERQ-04 rubric, fig-U5-4 missing "Application", 5 vs 7 minute clean-up, three vs four objective components) are in translations/unit-05/handoff.md.
  - Editing that handoff file or any bound input makes Unit 5 G2 evidence stale; G5 and rendered Urdu inspection are still open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
