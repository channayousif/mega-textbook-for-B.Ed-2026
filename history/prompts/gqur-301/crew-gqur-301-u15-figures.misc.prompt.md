---
id: crew-gqur-301-u15-figures
title: crew figures GQUR-301 unit 15
stage: misc
date: 2026-10-23
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u15-figures
user: crew
command: crew figures
labels: ["crew", "claude", "figures"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-15/topic-01.mdx
 - docs/semester-2/gqur-301/unit-15/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-03.mdx
 - specs/content/gqur-301/figures/unit-15.md
 - specs/content/gqur-301/reviews/unit-15/G2/20261023T070714921Z-gates.json
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261023T070714921Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261023T070714921Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261023T070714921Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261023T070714921Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261023T070714921Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261023T070714921Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261023T070714921Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-20261023T070714921Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-15/fig-U15-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-1.ur.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-2.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-2.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-2.ur.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-3.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-3.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-3.ur.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-4.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-4.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-4.ur.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-5.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-5.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-5.ur.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-5.ur.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-6.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-6.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-6.ur.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u15-figures

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u15-figures`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Render every prompt-only schematic figure for GQUR-301 Unit 15 (generate-figures skill): diagrams, tables, concept maps, flowcharts and timelines as SVG with their .ur.svg variants. Leave raster illustrations at prompt-only for the illustrate job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 15 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-15/`.

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
- (gqur-301-u15-review_en, review_en, claude) The author repair must add SVGs for fig-U15-2 to fig-U15-6, or turn them back into FIGURE markers, because `check:figures` passes even though the files are missing.
- (gqur-301-u15-review_en, review_en, claude) Fix fig-U15-3 to match the z = 1.84 right-tailed reject, fix the fig-U15-2 alt text (75 is inside the 75.31 cutoff), and rewrite the ERQ 2 and RRQ 10 keys.
- (gqur-301-u15-review_en, review_en, claude) Replace the 6 broken citation links with real pages (e.g. onlinestatbook.com/2/logic_of_hypothesis_testing/significance.html, /2/tests_of_means/single_mean.html, OpenStax 9.3), correct sources/unit-15.md, and store the source passages so the next review can check them offline.
- (gqur-301-u15-author, author, opencode) The English draft (index, topic-01/02/03, unit-assessment, teacher-notes) and governance files (coverage, sources, figures, concepts) were authored in commit e9cb5127 and are unchanged. Next job on this unit is a G3 independent English review in a fresh reviewer session (ADR-0019), then G4 Urdu translation.


## Response snapshot

Rendered GQUR-301 Unit 15 schematic figures fig-U15-2 to fig-U15-6 (Codex EN SVGs) plus Urdu and dark variants for all six, corrected the fig-U15-2/3/5 prompts and alt text to match the worked examples, and refreshed the G2 evidence.

## Outcome

- Impact: figures for GQUR-301 Unit 15 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 38 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Rendered GQUR-301 Unit 15 schematic figures fig-U15-2 to fig-U15-6 (Codex EN SVGs) plus Urdu and dark variants for all six, corrected the fig-U15-2/3/5 prompts and alt text to match the worked examples, and refreshed the G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu labels in fig-U15-1 to fig-U15-6 were only checked by font measurement, not in a browser; run `scripts/measure-figure-text.mjs` and do a G5 read. The glossary has no Urdu statistics terms, so "نارمل منحنی" and "فیصلہ کن قدر" are unconfirmed.
  - The fig-U15-2 and fig-U15-3 fixes are figure-only. The G3 findings on the ERQ 2 and RRQ 10 keys, the 6 broken citation links and sources/unit-15.md are still open for the author repair.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
