---
id: crew-giss-401-u07-repair_en
title: crew repair_en GISS-401 unit 7
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u07-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/unit-07/topic-01.mdx
 - docs/semester-3/giss-401/unit-07/unit-assessment.mdx
 - history/prompts/giss-401/crew-giss-401-u07-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-07/unit-assessment.mdx
 - specs/content/giss-401/figures/unit-07.md
 - specs/content/giss-401/reviews/unit-07/G2/20261110T051317873Z-gates.json
 - specs/content/giss-401/reviews/unit-07/G2/logs-20261110T051317873Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-07/G2/logs-20261110T051317873Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-07/G2/logs-20261110T051317873Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-07/G2/logs-20261110T051317873Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-07/G2/logs-20261110T051317873Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-07/G2/logs-20261110T051317873Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-07/G2/logs-20261110T051317873Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-07/G2/logs-20261110T051317873Z/validate-content.txt
 - specs/content/giss-401/tasks.md
 - static/img/figures/giss-401/unit-07/fig-U7-2.dark.svg
 - static/img/figures/giss-401/unit-07/fig-U7-2.svg
 - static/img/figures/giss-401/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/giss-401/unit-07/fig-U7-2.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u07-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u07-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/giss-401/reviews/unit-07/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 7 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-07/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/giss-401/reviews/unit-07/G3/20261108T203238Z-g3-desk-750f7524.json` (disposition: revise). Resolve each one:
- [blocking] unit-assessment.mdx:109 asks ERQ 2 evaluation and an overall judgement, while :164 assigns 3/12 marks to unrequested Practical advice. Add that deliverable explicitly or reallocate the rubric marks in a separate authoring session.
- [blocking] topic-01.mdx duty-roster table Hard cases row and fig-U7-2.svg Mercy row tell staff why a teacher with a sick parent receives relief, without consent. Teach transparent workload criteria while preserving private family details unless disclosure is agreed; update light/dark schematics through authoring.
- [blocking] unit-assessment.mdx:83 MCQ 10 is labelled Apply but merely recalls the next step of the taught sequence; the scenario does not affect the answer. Retag Remember or require actual application to the gift case.
- [advisory] topic-01.mdx Role modelling and summaries assert actions teach more than words categorically. Qualify this as a contextual pedagogical point; Tambak teacher-competence correlations do not establish a comparative causal effect on pupils.
- [advisory] fig-U7-2 alt names the values but not each school example. Consider a prose/HTML equivalent covering every row; no rendered accessibility defect is asserted without inspection.
- [uncertain] Handoff provenance incomplete: no parent-prepared frozen manifest or actual author run ID. Reviewer-generated manifest is diagnostic only. Exact deployed model revision is unavailable. Host must supply actual provenance; unavailable is an explicit missing value, not an author identity.
- [uncertain] content-spec.md drafting note 2 requires a qualified Islamic Studies scholar at G3. Arrange review of doctrinal interpretation and the ra'i/shepherd gloss; this general reviewer claims no qualification.
- [uncertain] Required actual browser, narrow viewport and A4 print inspection, plus SVG glyph measurement, cannot run under the brief. No rendered pass or successful render-review command is claimed.
- [uncertain] Diagnostic manifest omits the three inspected sources/texts files. Supplementary hashed copies document the excerpts read, but a compliant parent source bundle and full scholarly text verification remain pending.

## Notes from earlier jobs on this unit
- (giss-401-u07-translate, translate, claude) Build, `measure-figure-text` and `render-inspect --locale ur` have not been run on the Urdu pages or `.ur.svg` figures, so a permitted session must run them; check the U+200F bidi marks in the figures in the browser.
- (giss-401-u07-translate, translate, claude) Urdu Qur'an and hadith quotations are translator renderings pending scholar review; the `Saheeh International` source statement deliberately differs from the Unit 1 mirror, and the proposed terms are in the G4 handoff.
- (giss-401-u07-translate, translate, claude) English G3 repairs (ERQ 2 rubric, MCQ 10 tag, private family detail in the roster table and `fig-U7-2`) will need matching Urdu page and `.ur.svg` edits, and they invalidate any G5 review done before them.
- (giss-401-u07-review_en, review_en, codex) G3 remains pending: repair assessment and privacy findings; obtain scholar review, provenance and browser/print evidence.
- (giss-401-u07-review_en, review_en, codex) G3 remains pending: repair assessment and privacy findings; obtain scholar review, provenance and browser/print evidence.


## Response snapshot

Applied the five author-repairable G3 findings to GISS-401 Unit 7 in English and Urdu (ERQ 2 deliverable, MCQ 10 retag, privacy fix in the roster table and fig-U7-2 schematics, qualified role-modelling claims, fig-U7-2 text equivalent), refreshed the stale G2 evidence, and appended the advisory repair tracker row.

## Outcome

- Impact: repair_en for GISS-401 Unit 7 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the five author-repairable G3 findings to GISS-401 Unit 7 in English and Urdu (ERQ 2 deliverable, MCQ 10 retag, privacy fix in the roster table and fig-U7-2 schematics, qualified role-modelling claims, fig-U7-2 text equivalent), refreshed the stale G2 evidence, and appended the advisory repair tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 is repaired but unticked and unsigned; a fresh independent G3 run on the current bytes is needed before any G5.
  - Host-owned items remain: parent provenance, compliant source bundle, qualified Islamic Studies scholar review of doctrinal interpretation and the ra'i/shepherd gloss, and actual browser/narrow-viewport/A4 print inspection.
  - The Urdu pages and `.ur.svg` figures still need a permitted build, `measure-figure-text` and `render-inspect --locale ur` run; check the U+200F bidi marks in the browser.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
