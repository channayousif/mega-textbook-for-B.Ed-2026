---
id: crew-gqur-301-u14-author
title: crew author GQUR-301 unit 14
stage: misc
date: 2026-10-22
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u14-author
user: crew
command: crew author
labels: ["crew", "opencode", "author"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-14/index.mdx
 - docs/semester-2/gqur-301/unit-14/topic-01.mdx
 - docs/semester-2/gqur-301/unit-14/topic-02.mdx
 - docs/semester-2/gqur-301/unit-14/unit-assessment.mdx
 - glossary.json
 - history/prompts/general/538-gqur301-u14-author-pass-gates.general.prompt.md
 - specs/content/gqur-301/concepts/unit-14.md
 - specs/content/gqur-301/coverage/unit-14.md
 - specs/content/gqur-301/figures/unit-14.md
 - specs/content/gqur-301/reviews/unit-14/G2/20261022T002029Z-gates.json
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261022T002029Z/check_bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261022T002029Z/check_concept-graph.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261022T002029Z/check_depth-gate.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261022T002029Z/check_docs-sync.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261022T002029Z/check_figures.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261022T002029Z/check_no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261022T002029Z/check_no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261022T002029Z/validate_content.txt
 - specs/content/gqur-301/sources/unit-14.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-14/fig-U14-1.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-1.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-2.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-2.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-3.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-3.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-4.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u14-author

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u14-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GQUR-301 Unit 14 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 14 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-14/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
npm run check:content has 4 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GQUR-301 Unit 14 (docs/semester-2/gqur-301/unit-14): 'G2 en-draft' row for Unit 14 is not done (status: '▢')
✗ Figure gate failed with 1 finding(s):
- GQUR-301 Unit 14 (docs/semester-2/gqur-301/unit-14): unit has a concept-map / flowchart / timeline planned but none placed - Art. III.10 schematic requirement is a floor on rendered output, not on intent


## Response snapshot

Fixed GQUR-301 Unit 14's 3 content gate failures by authoring 4 placed schematic SVG figures (light + dark variants), creating G2 draft evidence, marking G2 en-draft done in tasks.md, and rebuilding content-status.json  -  all 13 content gates now pass with no new findings vs origin/main.

## Outcome

- Impact: author for GQUR-301 Unit 14 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed GQUR-301 Unit 14's 3 content gate failures by authoring 4 placed schematic SVG figures (light + dark variants), creating G2 draft evidence, marking G2 en-draft done in tasks.md, and rebuilding content-status.json  -  all 13 content gates now pass with no new findings vs origin/main.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - SVGs authored by Claude as secondary fallback under ADR-0024 (Codex unavailable); used plain ASCII math labels (x-bar, p-hat, sqrt) to avoid hex-color-literal false positives. Unit still needs independent G3 review, G4 Urdu translation, G5 Urdu review, and .ur.svg figure variants before publication.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
