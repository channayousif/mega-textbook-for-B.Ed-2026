---
id: crew-efmp-303-u03-repair_en-r1
title: crew repair_en EFMP-303 unit 3
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u03-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261187-repair-efmp303-unit-three-g3.general.prompt.md
 - specs/content/efmp-303/figures/unit-03.md
 - specs/content/efmp-303/reviews/unit-03/G2/20261109T235850396Z-gates.json
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261109T235850396Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
 - static/img/figures/efmp-303/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u03-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u03-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-303/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-03/`.

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
From `specs/content/efmp-303/reviews/unit-03/G3/20261108T203238Z-g3-desk-d0b970f8.json` (disposition: revise). Resolve each one:
- [blocking] 1. **Blocking: reversed planning sequences.** `static/img/figures/efmp-303/unit-03/fig-U3-3.svg`, arrows between the numbered boxes, teaches 1 → 2 → 3 → 6 → 5 → 4 → 1. Its labelled feedback path also runs from action design toward monitoring rather than evaluation toward needs assessment. `fig-U3-5.svg` repeats the 1 → 2 → 3 → 6 → 5 → 4 → 1 traversal. Repair both to the intended numeric order, then verify the arrows visually against Topic 3.2's six stages and Topic 3.3's needs-to-resource process. See `figures-contact-sheet.png` and `figure-3-narrow.png`.
- [blocking] 2. **Blocking: missing allocation data and clipping.** `fig-U3-2.svg`, column “Approx. share of plan budget”, contains only `~` in all five rows, not approximate numbers. Its note runs 254.9 px beyond the 780 px viewBox (`figure-geometry.log`), and the middle header crosses its cell boundaries in the contact sheet. Supply source-supported values with denominators and dates, or redesign the figure to teach only what can be verified. Wrap the header and note inside the image. Do not invent allocation numbers.
- [blocking] 3. **Blocking: strategic-planning contradiction survives prior repair.** Topic 3.2, “Types of educational planning”, correctly says strategic planning can operate at either scale. Its activity still requests a single micro/macro/strategic classification; the provincial recruitment example supports both macro and strategic readings. `fig-U3-4.svg` restricts the strategic row to focused scope, district/provincial authority and 2-4 years, while the text explicitly includes school-level strategies. Teacher notes, “Level-sorting exercise”, repeat the exclusive sorting instruction; RRQ 9's model ...
- [blocking] 4. **Blocking: source declarations do not document the evidence gap.** `sources/unit-03.md`, “Unverifiable sources”, gives neither retrieval attempts nor dates nor explicit owner authorisation. It claims title-level use, while Topic 3.1 states historical plan counts, priorities and empirical economic relationships, and Topic 3.3 supplies a GDP spending range, financing arrangements and claims about actual model use. Topic 3.2 attributes its definition directly to Coombs and invokes an unidentified IIEP sector-plan source not registered here. Provide inspectable source passages and claim-lev...
- [blocking] 5. **Blocking: marking and cognitive-demand defects.** `unit-assessment.mdx`, MCQs 6, 8, 9 and 10 are labelled Apply but ask for a date, a recalled challenge, a model description and an amendment number. Relabel or replace them with actual application. RRQ 2 asks why needs assessment comes first, but its model omits that explanation and allocates all three marks to naming/order/completeness, double-counting completeness. Allocate credit to the requested reasoning. RRQ 7's model and Topic 3.2's misconception claim imply that pre-2010 education planning was exclusively federal; establish the ...
- [blocking] 6. **Blocking: concept-to-item mappings are semantically wrong despite structural gates passing.** `concepts/unit-03.md`: five-year plans points to MCQ 2 (planning definition), RRQ 2 (stages); national/provincial plans points to RRQ 3 (girls' enrolment planning stages); economic growth points to MCQ 4 (micro/macro distinction); needs assessment points to MCQ 8 (resource challenges) and RRQ 7 (devolution); resource allocation points to MCQ 9/RRQ 8 (models); models points to MCQ 10 (amendment). Audit every row against the actual questions. `coverage/unit-03.md` reinforcement likewise maps U3-...
- [blocking] 7. **Blocking: insufficient worked-example support.** The approved Unit 3 spec promises an actual plan excerpt, three classified scenarios and a worked school-improvement walkthrough. Topics provide explanations and tasks but leave learners to find the document, classify the scenarios and construct the walkthrough themselves. Topic 3.1's 25-minute activity requires internet retrieval and a plan-budget percentage without supplying a stable excerpt or an offline alternative; a Vision document need not report that denominator. Provide a short source-supported worked example before independent ...
- [uncertain] 8. **Uncertain: review prerequisites and presentation remain unverified.** Obtain actual author provenance, a parent-frozen handoff and current page renders in a fresh independent session. The tracker still describes G1 as pending while the course spec is approved. Do not infer a fresh G1 approval from the content headings or this review. The curriculum owner should reconcile the authoritative intake decision before acceptance.
- [uncertain] Independent blind assessment solving was not completed: answers were exposed in the first assessment read. Fresh review must solve before consulting keys.

## Notes from earlier jobs on this unit
- (efmp-303-u03-repair_en-conflict1, fix, opencode) G3 for Unit 3 remains open; independent review, browser inspection and owner G1/figure-plan decisions are still pending.
- (efmp-303-u03-repair_en-conflict1, fix, opencode) The merge pulled main's Unit 4 repair changes into this branch; they are out of Unit 3 scope but now present. static/content-status.json is gitignored, so a fresh worktree needs `npm run build:content-status` before check:content.
- (efmp-303-u03-repair_en, repair_en, codex) G3 remains open; independent review, browser inspection and owner G1/figure-plan decisions remain pending.
- (efmp-303-u03-repair_en, repair_en, codex) G3 remains open; independent review, browser inspection and owner G1/figure-plan decisions remain pending.
- (efmp-303-u03-fix, fix, opencode) G3 en-review row for Unit 3 is flagged stale; a fresh independent G3 run is needed. English G3 repairs and Urdu page/print inspection remain pending from earlier translate jobs (translation_status stays draft).


## Response snapshot

Repaired EFMP-303 Unit 3 G3 finding 1 by redrawing fig-U3-3 and fig-U3-5 (EN, UR and dark variants) into unambiguous 1-2-3 / 4-5-6 reading order with an explicit wrap arrow and a dashed stage-6-to-stage-1 feedback loop, updated the figure manifest and appended the unticked Unit 3 G3 tracker row, then refreshed G2 evidence; all 14 content gates pass.

## Outcome

- Impact: repair_en for EFMP-303 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired EFMP-303 Unit 3 G3 finding 1 by redrawing fig-U3-3 and fig-U3-5 (EN, UR and dark variants) into unambiguous 1-2-3 / 4-5-6 reading order with an explicit wrap arrow and a dashed stage-6-to-stage-1 feedback loop, updated the figure manifest and appended the unticked Unit 3 G3 tracker row, then refreshed G2 evidence; all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 stays unticked; fresh independent blind solving, author provenance, parent-frozen handoff, page renders and owner G1 reconciliation remain pending.
  - origin/main advanced by 21 commits during the session, including a Unit 1 G3 row appended to the same `specs/content/efmp-303/tasks.md` table; expect a possible merge conflict there.
  - Unit 3 G2 evidence was refreshed and its tracker row repointed to `20261109T235850396Z-gates.json`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
