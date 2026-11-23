---
id: crew-gcce-400-u04-repair_en
title: crew repair_en GCCE-400 unit 4
stage: misc
date: 2026-11-24
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-04/topic-01.mdx
 - docs/semester-4/gcce-400/unit-04/topic-02.mdx
 - docs/semester-4/gcce-400/unit-04/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/unit-assessment.mdx
 - specs/content/gcce-400/sources/unit-04.md
 - specs/content/gcce-400/reviews/unit-04/G2/20261123T224424097Z-gates.json
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T224424097Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T224424097Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T224424097Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T224424097Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T224424097Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T224424097Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T224424097Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T224424097Z/validate-content.txt
 - specs/content/gcce-400/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u04-repair_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gcce-400/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-04/`.

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
From `specs/content/gcce-400/reviews/unit-04/G3/crew-run1-20261124.json` (disposition: revise). Resolve each one:
- [blocking] F1: docs/semester-4/gcce-400/unit-04/topic-02.mdx, Approaches to effective community engagement, IAP2 table: the Collaborate example "A committee of residents and council staff agrees on the site" presents a joint decision, and the topic never states that the agency remains the decision-maker at Involve and Collaborate, although the bound EPA page says "as at involve, the agency is still the ultimate decision-maker" and sources/texts/epa-2026-participation.md claims the topic uses this point. docs/semester-4/gcce-400/unit-04/unit-assessment.mdx RRQ 6 model similarity ("the agency still make...
- [advisory] F3: unit-assessment.mdx ERQ 4 rubric states "the committee only informs"; the scenario includes one meeting, so a learner classifying it as a token consult should also earn the marks.
- [advisory] F4: MCQ key positions A1/B5/C4/D0 (no item keyed D); MCQ 5 tagged Remember but requires applying the characteristics to a new case (Understand/Apply).
- [advisory] F5: topic-01.mdx places fig-U4-2 (table image) directly above a markdown table with the same six rows; the duplication adds length without new meaning.
- [advisory] F6: Further-reading entries use bare URLs as link text (render-inspect advisory); the youniss-levine-2009 Unverifiable declaration records no owner-authorisation line, acceptable here only because use is title-level.
- [uncertain] F2: render-inspect reported fig-U4-2, fig-U4-4 and fig-U4-5 as not loaded on the production pages (lazy images below the fold). Served files are HTTP 200 and byte-identical to HEAD, so this is unverified rendering, not a content defect; a rerun that scrolls the figures into view would settle it.

## Notes from earlier jobs on this unit
- (gcce-400-u04-review_en, review_en, claude) F1 needs an author repair in topic-02.mdx (the Collaborate row of the participation-levels table, plus one sentence that the agency still decides) or in the model answer for short-answer question 6; the next G3 run is cycle 2 of 2.
- (gcce-400-u04-review_en, review_en, claude) render-inspect reported fig-U4-2, fig-U4-4 and fig-U4-5 as not loaded, but the live files are byte-identical to the repo; a rerun that scrolls them into view should clear this.
- (gcce-400-u04-illustrate, illustrate, agy) G3 en-review remains open (reviewer to confirm youniss-levine-2009 title use, oecd-2011-social-cohesion definition, and constitutional currency of Articles 16, 19, and 25).
- (gcce-400-u04-illustrate, illustrate, agy) G5 ur-review remains open (translation_status is draft across English and Urdu indices; G5 owns 360px and A4 print layout inspection).
- (gcce-400-u04-translate, translate, agy) `translation_status` remains `draft` across English and Urdu indices pending independent G5 review.

## Response snapshot

Applied the G3 run-1 findings for GCCE-400 Unit 4 in English and Urdu: F1 reworded the IAP2 Collaborate example to a shared recommendation the council adopts and added one sentence that the agency still decides at Involve and Collaborate; F3 made the ERQ 4 rubric accept a token consult; F4 retagged MCQ 5 as Apply and re-keyed it D so the key set is A1/B4/C4/D1; F5 removed the duplicate markdown table under fig-U4-2; F6 gave the further-reading URLs descriptive link text and cited D-2026-0001 in the youniss-levine declaration. F2 is unverified lazy rendering, not a content defect, and is recorded as not repairable here. Regenerated the G2 gate evidence, repointed the G2 row and appended the advisory G3 repair row.

## Outcome

- Impact: repair_en for GCCE-400 Unit 4 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree (14 content gates, exit 0).
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: G3 run-1 repairs F1, F3, F4, F5 and F6 applied in English and Urdu; G2 gate evidence regenerated at the repaired HEAD; Unit 4 G2 row repointed and advisory G3 repair row appended. G3 stays unticked.
- Decisions the team must respect: G3/G5 remain advisory until a qualified sign-off; nothing here certifies the unit.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - A fresh independent G3 (cycle 2 of 2) is needed. F2 (fig-U4-2, fig-U4-4 and fig-U4-5 reported as not loaded by render-inspect) is unverified lazy rendering, not a content defect; the production site still runs the pre-repair commit, so check whether it has redeployed before any render and accessibility inspection.
  - The MCQ 5 option order and key changed in both locales, and the fig-U4-2 markdown table was removed, so a G5 Urdu review should check the new Urdu wording and the figure-only worked example.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
