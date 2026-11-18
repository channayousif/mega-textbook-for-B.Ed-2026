---
id: crew-gicp-400-u04-translate
title: crew translate GICP-400 unit 4
stage: misc
date: 2026-11-06
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u04-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261137-refresh-unit-4-translation-evidence.general.prompt.md
 - history/prompts/general/20261138-complete-unit-4-urdu-mirror.general.prompt.md
 - history/prompts/gicp-400/crew-gicp-400-u04-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/unit-assessment.mdx
 - specs/content/gicp-400/reviews/unit-04/G2/20261106T191728706Z-gates.json
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T191728706Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T191728706Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T191728706Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T191728706Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T191728706Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T191728706Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T191728706Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T191728706Z/validate-content.txt
 - specs/content/gicp-400/reviews/unit-04/translation-validation.md
 - specs/content/gicp-400/reviews/unit-04/translation-validation/conditional-parity.txt
 - specs/content/gicp-400/reviews/unit-04/translation-validation/figure-variants.txt
 - specs/content/gicp-400/reviews/unit-04/translation-validation/final-content.txt
 - specs/content/gicp-400/tasks.md
 - specs/content/gicp-400/translations/unit-04/handoff.md
 - static/img/figures/gicp-400/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-1.ur.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-2.ur.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-3.ur.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-4.ur.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-5.ur.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-5.ur.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-6.ur.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u04-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-04/`.

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
- (gicp-400-u04-review_en, review_en, codex) G3 remains open: provenance, independent source/assessment verification and permitted render inspection are still required.
- (gicp-400-u04-review_en, review_en, codex) G3 remains open: provenance, independent source/assessment verification and permitted render inspection are still required.
- (gicp-400-u04-author, author, claude) Unit 4 cites `pak-constitution-2024-edition` (same work as the spec's mapped `pak-constitution-1973`, printed-page locators); the G3 reviewer should confirm that key is acceptable. It deliberately excludes the Twenty-seventh Amendment as a dated snapshot.
- (gicp-400-u04-author, author, claude) `measure-figure-text.mjs` for the six `fig-U4-*` SVGs and the site build are still unrun; the banner remains prompt-only and G6 is open.
- (gicp-400-u04-author, author, claude) Do not edit `sources/texts/pak-constitution-1973.md` from a unit job, because that invalidates Unit 1's G2 evidence; the `tasks.md` row for Unit 4 will conflict with sibling jobs on merge, so keep every unit's rows.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GICP-400 Unit 4 (docs/semester-3/gicp-400/unit-04): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Verified the complete GICP-400 Unit 4 Urdu mirror, refreshed and bound deterministic G2 evidence, and confirmed that all 14 content gates pass cleanly.

## Outcome

- Impact: translate for GICP-400 Unit 4 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 35 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the complete GICP-400 Unit 4 Urdu mirror, refreshed and bound deterministic G2 evidence, and confirmed that all 14 content gates pass cleanly.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Both English and Urdu unit locales remain `translation_status: draft` with G3, G4, and G5 open pending independent review and qualification.
  - Refreshed and bound deterministic G2 gate evidence following translation handoff integration, passing all 14 content gates and figure variant checks.
  - Browser-based rendered inspection across 1280px, 360px, and A4 print emulation remains pending for a permitted session under the environment restrictions.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
