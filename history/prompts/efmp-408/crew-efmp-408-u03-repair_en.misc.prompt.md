---
id: crew-efmp-408-u03-repair_en
title: crew repair_en EFMP-408 unit 3
stage: misc
date: 2026-11-25
surface: agent
model: claude
feature: efmp-408
branch: crew/efmp-408-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-408/unit-03/topic-01.mdx
 - docs/semester-4/efmp-408/unit-03/topic-02.mdx
 - docs/semester-4/efmp-408/unit-03/topic-03.mdx
 - docs/semester-4/efmp-408/unit-03/topic-04.mdx
 - docs/semester-4/efmp-408/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/unit-assessment.mdx
 - specs/content/efmp-408/reviews/unit-03/G2/20261125T180358838Z-gates.json
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261125T180358838Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261125T180358838Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261125T180358838Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261125T180358838Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261125T180358838Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261125T180358838Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261125T180358838Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-03/G2/logs-20261125T180358838Z/validate-content.txt
 - specs/content/efmp-408/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u03-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-408/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-03/`.

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
From `specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json` (disposition: revise). Resolve each one:
- [advisory] unit-assessment.mdx:156 (MCQ 10 key): the rationale says the stem article "an" "points toward vowel-beginning options", but all four options (Harappa, Taxila, Mohenjo-daro, Lahore) begin with consonants, so the clue points at no option and the stem is ungrammatical against the keyed answer C. The letter A is still the best answer. REPAIR: rewrite the item so the article matches the keyed option (or drop the article) and correct the key rationale.
- [advisory] unit-assessment.mdx RRQ 1 ("Define a Table of Specifications"), RRQ 7 ("Describe the anatomical structure of a multiple-choice question") and RRQ 9 ("State three essential structural rules") are tagged *(Remember)*, below the style-guide default RRQ band Understand to Analyze (style-guide.md:248); the content-spec Unit 3 section declares no other band. The labels match the thinking actually required. REPAIR: raise the three items to Understand/Apply demand or record an owner ruling that this unit RRQ band extends to Remember.
- [advisory] The unit carries 16 formative items (4 per topic: topic-01.mdx:133-136, topic-02.mdx:128-131, topic-03.mdx:122-125, topic-04.mdx:144-147) against the approved "formative 12 items, 3 per topic" (content-spec.md:193) and the standing owner ruling D-2026-0093 item 4 ("3 formative items per topic whatever its topic count"). REPAIR: reduce to 3 per topic or record an owner ruling.
- [advisory] topic-01.mdx:61 attributes "three objective criteria" for weightage to "(HEC, 2012)"; the bound HEC guide (TestDevEval_Sept13.txt:1266-1272) specifies content coverage, question types, marks distribution and sometimes cognitive levels, never these three criteria. topic-01.mdx:86-89 also states an uncited 30/40/30 "sound professional standard". REPAIR: cite a source for the criteria and the distribution or mark them as the author synthesis.
- [advisory] topic-02.mdx:94 states "Studies consistently show" that neat handwriting and rhetoric raise marks, with no citation; the bound Seifert excerpt names halo effects and rubrics but no study or effect size. REPAIR: cite a source or soften to a documented classroom observation.
- [advisory] topic-02.mdx:101 names "AKU-EB and the Sindh Higher Education Commission" as bodies that enforce four mandatory marking protocols, and topic-04.mdx:86 attributes the advice against "All of the above"/"None of the above" to "the Higher Education Commission and the Aga Khan University Examination Board". AKU-EB is in the bound guide (TestDevEval_Sept13.txt:1447, for the review checklist); the Sindh Higher Education Commission and the all-of-the-above advice are in no bound source. REPAIR: reground these attributions in a bound source or state them as general professional practice.
- [advisory] Bare-URL link text on the Further reading lists of topic-01.mdx:177-178, topic-02.mdx:174-175, topic-03.mdx:174-175 and topic-04.mdx:192-193 (HEC and Open Textbook Library URLs). Screen-reader users hear only the URL. REPAIR: use descriptive link text with the URL in the destination.
- [advisory] The unit key terms (Table of Specifications, blueprint, weightage, stem, distractor, matching, true/false) have no glossary.json entry, although style-guide.md:131 and :311 ask for a bilingual glossary entry for technical terms. Each is defined inline, so comprehension holds. REPAIR: add the terms to the bilingual bank when convenient.
- [uncertain] topic-02.mdx:131 formative item 4 ("Critique this marking procedure and explain why marking question-by-question ... produces fairer scores") is tagged *(Analyze)*, above the formative band Remember/Understand/Apply declared at content-spec.md:193 and required by style-guide.md:237. The label matches the actual demand, so either reword the item to the band or record an owner ruling that the band extends.

## Notes from earlier jobs on this unit
- (efmp-408-u03-review_en, review_en, claude_crew) G3 stays open and unsigned under an advisory `revise`; a repair job owns A-1 to A-4 and S-1 to S-3, then a fresh manifest and independent re-review.
- (efmp-408-u03-review_en, review_en, claude_crew) do not re-report `render-inspect`'s `fig-U3-7` "did not load" as a content defect; it is a lazy-load measurement artifact, resolved in `logs/render-verify.txt`.
- (efmp-408-u03-review_en, review_en, claude_crew) `sources/texts/hec-2013-testdev.md` is not manifest-bound (the key regex captures `hec-2013`); verify HEC claims against the bound full guide text.
- (efmp-408-u03-illustrate, illustrate, agy) G2 gate evidence for Unit 3 refreshed to 20261125T142256890Z-gates.json with full logs committed.
- (efmp-408-u03-illustrate, illustrate, agy) Banner figure fig-U3-9 is placed in English and Urdu index.mdx; Unit 3 G3 review and G5 review remain open for independent evaluation.


## Response snapshot

Applied all EFMP-408 Unit 3 G3 r1 repairs in EN and UR (MCQ 10 rebuilt, RRQ 1/7/9 raised to Understand, formative items cut to 3 per topic, unsupported attributions reworded, descriptive link text), refreshed G2 evidence and added the "repairs applied" G3 tracker row with G3 left open.

## Outcome

- Impact: repair_en for EFMP-408 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all EFMP-408 Unit 3 G3 r1 repairs in EN and UR (MCQ 10 rebuilt, RRQ 1/7/9 raised to Understand, formative items cut to 3 per topic, unsupported attributions reworded, descriptive link text), refreshed G2 evidence and added the "repairs applied" G3 tracker row with G3 left open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The glossary finding is still open. Adding the unit's terms (Table of Specifications, blueprint, weightage, stem, distractor, matching, true/false) to `glossary.json` needs a job allowed to edit files outside the unit.
  - The new MCQ 10 uses Amri as its keyed option; a reviewer may want it checked against a bound source.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
