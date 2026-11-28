---
id: crew-efpc-411-u03-repair_en
title: crew repair_en EFPC-411 unit 3
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efpc-411
branch: crew/efpc-411-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude_crew", "repair_en"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpc-411/unit-03/topic-01.mdx
 - docs/semester-4/efpc-411/unit-03/topic-02.mdx
 - docs/semester-4/efpc-411/unit-03/topic-03.mdx
 - docs/semester-4/efpc-411/unit-03/topic-04.mdx
 - docs/semester-4/efpc-411/unit-03/unit-assessment.mdx
 - history/prompts/efpc-411/crew-efpc-411-u03-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/unit-assessment.mdx
 - specs/content/efpc-411/reviews/unit-03/G2/20261128T030729563Z-gates.json
 - specs/content/efpc-411/reviews/unit-03/G2/logs-20261128T030729563Z/check-bloom-bands.txt
 - specs/content/efpc-411/reviews/unit-03/G2/logs-20261128T030729563Z/check-concept-graph.txt
 - specs/content/efpc-411/reviews/unit-03/G2/logs-20261128T030729563Z/check-depth-gate.txt
 - specs/content/efpc-411/reviews/unit-03/G2/logs-20261128T030729563Z/check-docs-sync.txt
 - specs/content/efpc-411/reviews/unit-03/G2/logs-20261128T030729563Z/check-figures.txt
 - specs/content/efpc-411/reviews/unit-03/G2/logs-20261128T030729563Z/check-no-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-03/G2/logs-20261128T030729563Z/check-no-em-dash.txt
 - specs/content/efpc-411/reviews/unit-03/G2/logs-20261128T030729563Z/validate-content.txt
 - specs/content/efpc-411/tasks.md
 - static/img/figures/efpc-411/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efpc-411/unit-03/fig-U3-3.svg
 - static/img/figures/efpc-411/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efpc-411/unit-03/fig-U3-3.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u03-repair_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efpc-411/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-03/`.

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
From `specs/content/efpc-411/reviews/unit-03/G3/20261127T192818Z-g3-desk-f6c9628b.json` (disposition: revise). Resolve each one:
- [advisory] Two formative items assert counts the unit never teaches: topic-01.mdx Q1 asks for "the four mandatory administrative identifiers" although six are listed for the cover page (topic-01.mdx:47), and topic-04.mdx Q1 asks for "the three mandatory verification documents" although one verification component is taught (topic-04.mdx:53). Recommend re-aligning the counts with the taught content in a maintenance pass.
- [advisory] MCQ key clustering: 8 of the 10 keys are option B (items 1, 2, 3, 5, 6, 8, 9, 10), item 4 is A, item 7 is C, and no item uses D (unit-assessment.mdx:143-152). Distractors are content-valid, but shuffling key positions would reduce pattern guessing.
- [advisory] Minor consistency and citation items: topic-02.mdx:41 attributes the 3-4 lesson count to HEC (2013), which the bound note does not state (it is guide-determined); topic-03.mdx:47 states transitions consume 25-30% of class time with no citation; EMIS 418010204 is used for both a boys school (topic-01.mdx:75) and GGES Qasimabad girls school (fig-U3-2); the ERQ 2 rubric names "passive student chanting" although its scenario has none; ERQ 5 asks for 600-750 words while the topic-3.4 summative task asks for 600-800.
- [uncertain] Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: deployed SHA c8efed9b430b39867c1418fae61194c49cefcda9 differs from HEAD 0cbed86bb96f7a6a03420ad3e5d726a47e8f5513 on all five English unit files and on fig-U3-9..13.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.
- [uncertain] unit-assessment.mdx RRQ 8 asks the learner to "Outline the four core chronological sections that must be organized and bound into the completed observation portfolio", but the unit teaches an eight-component portfolio architecture (topic-01.mdx:45-54, topic-04.mdx:45-53, fig-U3-1). The model answer regroups the eight components into four phases. A student who answers the taught eight components would be marked wrong. Repair: align the item to the eight-part structure or teach the four-phase grouping explicitly.
- [uncertain] topic-03.mdx activity step 1 asks students to classify an authoritarian classroom excerpt "using the framework in Figure 3.6", but fig-U3-6 compares only Authoritative (Structured) and Permissive (Unstructured); the Authoritarian column is absent. The activity cannot be completed from the figure it names. Repair: add the authoritarian column to fig-U3-6 (and its manifest row stays two-style only if the activity is reworded).
- [uncertain] fig-U3-3 (static/img/figures/efpc-411/unit-03/fig-U3-3.svg) records "real leaves used" for the Grade 5 flowering-plants lesson, but the topic-02.mdx scenario establishes that the teacher only wrote terms and had the class chant, the mentor asks "Did any child touch a real leaf?", and fig-U3-11 is prompted so that no pupil holds a real plant. The sample proforma contradicts the scenario it illustrates. Repair: change the Teaching Resources cell to match the scenario (for example, board sketches and textbook diagrams only).
- [uncertain] The four-stage reflective cycle "describe, analyse, interpret, plan" (topic-02.mdx:71) and the authoritative/authoritarian/permissive management typology (topic-03.mdx:71) are both attributed to Richards & Lockhart (1994) and Scoupe et al. (2024). The bound notes for both works describe a cyclical reflective process, a descriptive/analytical distinction and action planning, but neither documents these named frameworks. Repair: cite a source that actually presents them, or present them as the unit's own synthesis without the attribution.

## Notes from earlier jobs on this unit
- (efpc-411-u03-review_en, review_en, claude_crew) If a revision job follows, the five uncertain findings above are the repair set; the report's `source-verification.md` and `assessment-solutions.md` give exact locations and derived answers.
- (efpc-411-u03-review_en, review_en, claude_crew) The deployed SHA moved after this unit's last deploy, so a future review should re-check `git diff` before trusting `render-inspect` against textbook.com.pk.
- (efpc-411-u03-review_en, review_en, claude_crew) The advisory tracker row is a proposal in `advisory-tracker-row.md`; the parent must insert it, and G3 stays open.
- (efpc-411-u03-illustrate, illustrate, agy) Raster illustrations fig-U3-9 through fig-U3-13 are placed across both English and Urdu unit files with localized Urdu alt text, sharing single WebP rasters per ADR-0029.
- (efpc-411-u03-illustrate, illustrate, agy) G2 gate evidence has been regenerated and committed at specs/content/efpc-411/reviews/unit-03/G2/20261127T115323213Z-gates.json, with tasks.md updated accordingly.


## Response snapshot

Applied all eight G3 desk-report findings to EFPC-411 Unit 3 in English and Urdu, refreshed the G2 evidence, and appended the advisory G3 row with all content gates green.

## Outcome

- Impact: repair_en for EFPC-411 Unit 3 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all eight G3 desk-report findings to EFPC-411 Unit 3 in English and Urdu, refreshed the G2 evidence, and appended the advisory G3 row with all content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U3-6 still compares only authoritative and permissive; the repair reworded the activity, so the manifest row deliberately stays two-style.
  - the render/print finding stays open (build, dev server and Playwright are prohibited by the crew brief).
  - don't re-converge the EMIS codes (boys school 418010207, GGES Qasimabad 418010204).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
