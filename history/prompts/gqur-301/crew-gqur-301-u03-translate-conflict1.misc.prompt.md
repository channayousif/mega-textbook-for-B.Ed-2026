---
id: crew-gqur-301-u03-translate-conflict1
title: crew fix GQUR-301 unit 3
stage: misc
date: 2026-10-21
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u03-translate
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/008-rich-unit-pedagogy/018-translate-gqur301-unit3-urdu.green.prompt.md
 - history/prompts/008-rich-unit-pedagogy/019-resume-gqur301-unit3-translation.green.prompt.md
 - history/prompts/general/536-gqur301-unit-three-merge.general.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u03-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/_category_.json
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/unit-teacher-notes.mdx
 - specs/content/gqur-301/reviews/unit-03/G2/20261021T071753539Z-gates.json
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/final-check-content.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - specs/content/gqur-301/translations/unit-03/check-content-final.txt
 - specs/content/gqur-301/translations/unit-03/check-content-main.txt
 - specs/content/gqur-301/translations/unit-03/check-content-parity.txt
 - specs/content/gqur-301/translations/unit-03/check-content-resume-initial.txt
 - specs/content/gqur-301/translations/unit-03/check-content-resume-parity.txt
 - specs/content/gqur-301/translations/unit-03/handoff.md
 - specs/content/gqur-301/translations/unit-03/structural-check.txt
 - static/img/figures/gqur-301/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-1.ur.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-2.ur.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-3.ur.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u03-translate-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u03-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u03-translate conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-03/`.

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
- (gqur-301-u03-translate, translate, codex) Translation remains draft; independent G3/G5 review and browser inspection remain pending.
- (gqur-301-u03-translate, translate, codex) Translation remains draft; independent G3/G5 review and browser inspection remain pending.
- (gqur-301-u03-review_en-r1, review_en, agy) G3 review is advisory and unsigned (status ▢, no initials) under ADR-0019; disposition is pass with advisory finding F1 (headless render limitation).
- (gqur-301-u03-review_en-r1, review_en, agy) All four figure SVGs pass measure-figure-text cleanly with no viewBox overflow (two cosmetic wordmark collisions reported in fig-U3-2 but not failed).
- (gqur-301-u03-review_en-r1, review_en, agy) Next lifecycle stage for Unit 3 is G4 Urdu translation.


## Response snapshot

Merged main into the Unit 3 translation branch, preserved both tracker updates, and passed all content gates.

## Outcome

- Impact: fix for GQUR-301 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 36 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged main into the Unit 3 translation branch, preserved both tracker updates, and passed all content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
