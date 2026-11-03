---
id: crew-efmp-301-u04-repair_en
title: crew repair_en EFMP-301 unit 4
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-04/topic-01.mdx
 - docs/semester-1/efmp-301/unit-04/unit-assessment.mdx
 - history/prompts/general/2446-efmp-301-u04-repair-en.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/unit-assessment.mdx
 - specs/content/efmp-301/coverage/unit-04.md
 - specs/content/efmp-301/reviews/unit-04/G2/20261103T174846654Z-gates.json
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/validate-content.txt
 - specs/content/efmp-301/sources/unit-04.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u04-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-04/`.

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
From `specs/content/efmp-301/reviews/unit-04/G3/20261102T213456Z-g3-desk-147d237b.json` (disposition: escalate). Resolve each one:
- [advisory] Prose/figure capture factor list mismatch carried from run001: docs/semester-1/efmp-301/unit-04/topic-01.mdx:56-57 names capture factors as "novelty, contrast, movement, meaning and emotion", while fig-U4-2 (and its manifest row) carries six factors "novelty, contrast, meaning, emotion, task demand, expectation" ("movement" is absent from the figure, and "task demand"/"expectation" are absent from the prose list). Aligning the two lists will give learners a unified vocabulary.
- [advisory] MCQ answer-position balance carried from run001: 8 of 10 keyed answers sit on option b (Q1, Q2, Q3, Q4, Q5, Q7, Q9, Q10) and 2 on option c (Q6, Q8), with none on options a or d in unit-assessment.mdx:162-173. Rebalance option positions in a future maintenance pass.
- [uncertain] Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run build, a dev server, or Playwright (render-review command unperformed, exit code 1). Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc, figure text measurement) pass from source, but visual accessibility remains unverified until a permitted browser/print inspection can be run on a live build.
- [uncertain] Registry/excerpt mismatch (vosniadou2001) carried from run001: specs/content/efmp-301/sources/unit-04.md line 19 and specs/content/efmp-301/coverage/unit-04.md lines 12, 15 declare vosniadou2001 supports U4-4 (relating new information to prior knowledge; taking time to practice) and U4-5 (concept formation), but the bound excerpt specs/content/efmp-301/sources/texts/vosniadou2001.md contains only Principle 11 (developmental differences, marked "used by Units 1-2"). No unit prose cites Vosniadou (Further Reading only), so no learner-facing claim rests on it, but the declared support remains ...

## Notes from earlier jobs on this unit
- (efmp-301-u04-fix-r1, fix, codex) Pre-existing static/content-status.json changes remain unstaged.
- (efmp-301-u04-fix-r1, fix, codex) Other Urdu figures retain existing label spills, especially fig-U4-4; independent G3/G5 review remains pending.
- (efmp-301-u04-fix-r1, fix, codex) Pre-existing static/content-status.json changes remain unstaged.
- (efmp-301-u04-review_en, review_en, agy) All 5 blocking findings from run001 were resolved; 1 uncertain finding (vosniadou2001 excerpt vs coverage declaration) remains carried.
- (efmp-301-u04-review_en, review_en, agy) Visual small-screen and A4 print layout inspection was unperformed due to job execution rules prohibiting build/dev server/Playwright and must be verified on an authorized host.


## Response snapshot

Aligned the Topic 4.1 capture-factor list with fig-U4-2, rebalanced the Unit 4 MCQ answer positions, removed the unsupported vosniadou2001 coverage bindings (EN+UR where applicable), refreshed G2 evidence and appended the advisory G3 repair tracker row with G3 left open.

## Outcome

- Impact: repair_en for EFMP-301 Unit 4 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Aligned the Topic 4.1 capture-factor list with fig-U4-2, rebalanced the Unit 4 MCQ answer positions, removed the unsupported vosniadou2001 coverage bindings (EN+UR where applicable), refreshed G2 evidence and appended the advisory G3 repair tracker row with G3 left open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - MCQ option order changed in both locales (keys 1a 2b 3d 4b 5d 6c 7a 8c 9a 10d); a G5 re-review should check the Urdu reorder.
  - 360px and A4 print inspection of Unit 4 is still unperformed and needs a host where building and browsers are allowed.
  - vosniadou2001 is no longer in Unit 4's sources table or coverage; re-binding it needs a longer excerpt plus both table and coverage rows.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
