---
id: crew-efpg-402-u05-repair_en-r1
title: crew repair_en EFPG-402 unit 5
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efpg-402
branch: crew/efpg-402-u05-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude_crew", "repair_en"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-05/topic-03.mdx
 - docs/semester-4/efpg-402/unit-05/topic-05.mdx
 - docs/semester-4/efpg-402/unit-05/unit-assessment.mdx
 - history/prompts/general/20261313-efpg402-u05-repair-en-r1.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/unit-assessment.mdx
 - specs/content/efpg-402/reviews/unit-05/G2/20261128T110621064Z-gates.json
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T110621064Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T110621064Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T110621064Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T110621064Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T110621064Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T110621064Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T110621064Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T110621064Z/validate-content.txt
 - specs/content/efpg-402/sources/unit-05.md
 - specs/content/efpg-402/tasks.md
 - static/img/figures/efpg-402/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u05-repair_en-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u05-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efpg-402/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

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

## Open findings from the latest G3 report
From `specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en-r1/report.json` (disposition: revise). Resolve each one:
- [uncertain] render-review tooling limitation (unchanged from cycle 1): scripts/render-inspect.mjs exited 1 with 10 defects, all of the form "fig-U5-12: variant light not served" for the five WebP classroom illustrations (fig-U5-12 to fig-U5-16). Section D builds its geometry URL as <id>.svg, but those figures are .webp, so the URLs 404 by construction. Direct HTTP checks confirm all five WebPs are served at https://textbook.com.pk (HTTP 200) and the rendered pages show them with natural dimensions; the ten schematic SVGs, all pages at three viewports and the print view are clean. Recorded as a tool lim...

## Notes from earlier jobs on this unit
- (efpg-402-u05-review_en-r1, review_en, claude_crew) The only blocker to a `pass` is the render tool: `scripts/render-inspect.mjs` section D should derive its geometry URL from the manifest row's real extension instead of hardcoding `.svg`. That is a repo tooling change, outside this unit's content scope.
- (efpg-402-u05-review_en-r1, review_en, claude_crew) The ten render defects are all `fig-U5-12..16`; do not repair content for them.
- (efpg-402-u05-repair_en, repair_en, claude) Not in the G3 report, still open: fig-U5-4 (EN and UR) leaves out the fifth Herbartian step, Application.
- (efpg-402-u05-repair_en, repair_en, claude) Topic 5.3 credits a four-part ABCD framework to Mager (1962), which is unverified and may be wrong; the figure and check question 1 there speak of three components.
- (efpg-402-u05-repair_en, repair_en, claude) Clean-up time is 7 minutes in fig-U5-9 and the Topic 5.5 timetable but 5 minutes in the activity and ERQ 5 marking guide; `render-inspect.mjs` still requests `.svg` for WebP figures.


## Response snapshot

Repaired EFPG-402 Unit 5's remaining G3 content findings (added the Herbartian Application step to fig-U5-4, corrected Topic 5.3's Mager/ABCD attribution, and aligned the clean-up buffer at 7 minutes) in English and Urdu, refreshed G2 evidence, and recorded the repairs-applied tracker row with G3 left open.

## Outcome

- Impact: repair_en for EFPG-402 Unit 5 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired EFPG-402 Unit 5's remaining G3 content findings (added the Herbartian Application step to fig-U5-4, corrected Topic 5.3's Mager/ABCD attribution, and aligned the clean-up buffer at 7 minutes) in English and Urdu, refreshed G2 evidence, and recorded the repairs-applied tracker row with G3 left open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `scripts/render-inspect.mjs` section D still builds `.svg` geometry URLs for the `.webp` illustrations (fig-U5-12..16); that repo tooling fix is outside this unit's content scope and is the report's only unresolved finding.
  - the clean-up buffer was standardized on 7 minutes (fig-U5-9 and the Topic 5.5 timetable were the majority value; the activity and ERQ 5 rubric moved from 5), so a fresh review should check that value against the course guide.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
