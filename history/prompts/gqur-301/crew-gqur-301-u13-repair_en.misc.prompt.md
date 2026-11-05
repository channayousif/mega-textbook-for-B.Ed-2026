---
id: crew-gqur-301-u13-repair_en
title: crew repair_en GQUR-301 unit 13
stage: misc
date: 2026-11-05
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u13-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-13/topic-01.mdx
 - docs/semester-2/gqur-301/unit-13/topic-02.mdx
 - docs/semester-2/gqur-301/unit-13/unit-assessment.mdx
 - history/prompts/general/20261129-gqur-301-unit-13-english-repairs.general.prompt.md
 - specs/content/gqur-301/concepts/unit-13.md
 - specs/content/gqur-301/coverage/unit-13.md
 - specs/content/gqur-301/reviews/unit-13/G2/20261105T150901818Z-gates.json
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261105T150901818Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261105T150901818Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261105T150901818Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261105T150901818Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261105T150901818Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261105T150901818Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261105T150901818Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261105T150901818Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-13/repair-en-handoff.md
 - specs/content/gqur-301/sources/unit-13.md
 - specs/content/gqur-301/sources/unit-13/passage-notes.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u13-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u13-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-13/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 13 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 13 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-13/`.

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
From `specs/content/gqur-301/reviews/unit-13/G3/20261102T212207Z-g3-desk-ddaaaeb1.json` (disposition: revise). Resolve each one:
- [blocking] docs/semester-2/gqur-301/unit-13/topic-01.mdx and topic-02.mdx, four Figure elements: all four referenced SVGs are absent, including their unit directory. figures/unit-13.md still says prompt-only with blank Kind/Src. See figure-audit.log. A separate author/asset producer must complete planned assets and reconcile lifecycle, then obtain actual narrow/light/dark/A4 inspection. Passing check:figures does not establish asset existence for these prompt-only rows.
- [blocking] docs/semester-2/gqur-301/unit-13/unit-assessment.mdx, RRQ8 and its model guidance: both plots explicitly use the same data, so their correlation is identical. The guidance nevertheless awards Plot A a larger absolute r. Repair the premise to genuinely different, comparably scaled datasets or accept invariant r with a justified explanation; do not penalise the mathematically correct same-data response.
- [blocking] docs/semester-2/gqur-301/unit-13/topic-02.mdx, What the regression line does not do: near-zero r does not guarantee near-zero unstandardised slope or predictions numerically near the response mean. b=r*sY/sX depends on scale. source-inspection.md gives an explicit small-r/large-slope counterexample. Qualify the statement using standardised variables or relative response variation; replace the dotless-j mean symbol with readable y-bar notation.
- [blocking] docs/semester-2/gqur-301/unit-13/topic-01.mdx, What the sign and size of r tell a teacher, and topic-02.mdx, Using the line to predict: a large sample |r| alone does not establish confidence that a population link exists, and interpolation is not automatically reliable without fit, sampling and uncertainty conditions. Restrict statements to the observed sample and qualify predictive reliability; near-zero r is negligible linear association rather than necessarily exact absence.
- [blocking] Both topic Summative task mini-rubrics demand only routine computation, interpretation and repetition of the generic causation caveat, despite Analyze labels. Require case-specific alternative explanation, comparison or model diagnosis with corresponding criteria. unit-assessment.mdx RRQ1 Remember and RRQ10 Evaluate are outside the required Understand-Analyze band; ERQ1/2 routine calculation is Apply despite Analyze labels. The course review plan also requires a real-Pakistan-data task: the illustrative Sanghar table and a design proposal do not identify a real dataset or require actual dat...
- [advisory] coverage/unit-13.md reinforcement rows misassign coefficient computation to MCQ7 (residual), MCQ10 (causal inference), RRQ4 (line/prediction), RRQ7 (interpolation); revise their mappings. Topic13.1 classification rows overlap at .30 and .70; specify endpoint conventions and contextual limitations. concepts/unit-13.md includes a replacement character in an Urdu label; flag it for the separate translation/G5 owner, without claiming an Urdu review.
- [uncertain] Current G1 authority is unverified: tasks.md Unit13 G1 remains open, and intake-3/evaluation.md evaluates the superseded six-unit partition. D-2026-0070 and guide 2nd 2026.txt:511-513 support the current topic structure but do not certify this unit. Owner/evaluator must supply current authority; reviewer cannot approve G1.
- [uncertain] The host supplied no prepared parent bundle or actual author/reviewer conversation identities; the current fresh reviewer did not author the reviewed bytes and prepared/recomputed a clean local 87-path manifest, but cannot independently establish author-run provenance. Exact model version is also unavailable. Explicit unavailable identity fields are limitation disclosures, not real run IDs. This report cannot support acceptance or provisional publication.
- [uncertain] Required actual browser/narrow-screen/A4 presentation evidence is unavailable under the brief prohibition on build/server/Playwright. No render-review command or screenshot is claimed. See render-limitation.md; source/configuration suggests raw mathematical notation also needs author/engineering inspection. A fresh authorised review must inspect current rendered inputs.
- [uncertain] Relevant source passages were not supplied as bound inputs: bound lane2023.md covers Chapters1/2, not4/14; relevant OpenStax/NIST passages are absent from the manifest. Supplementary primary pages were read and recorded in source-inspection.md but cannot silently support acceptance. The exact .30/.70 classification attribution to Lane remains unverified. sources/unit-13.md bibliographic-only Lock declaration lacks the rubric required dated attempts/Unverifiable sources section and inaccurately says it is referenced in the prose. Supply an honest complete source bundle/declaration.

## Notes from earlier jobs on this unit
- (gqur-301-u13-fix, fix, codex) Final gate remains blocked by the content-status digest; fresh G3 review remains required.
- (gqur-301-u13-fix, fix, codex) Final gate remains blocked by the content-status digest; fresh G3 review remains required.
- (gqur-301-u13-translate-r1, translate, claude) English Unit 13 still has G3 F1-F5 unfixed (question 8 same-data contradiction, the r-to-slope claim, unqualified interpolation), plus a stray "ȷ" (U+0237) at topic-02.mdx:123. A separate English repair has to land on main before translation can start.
- (gqur-301-u13-translate-r1, translate, claude) There are no Urdu files for Unit 13 yet. The Urdu figure assets from gqur-301-u13-figures are waiting to be placed once the topics are translated.
- (gqur-301-u13-figures, figures, codex) Urdu assets await placement when Unit 13’s missing Urdu topics are translated.


## Response snapshot

Corrected Unit 13 statistical claims, assessment demands, coverage and source records, and committed fresh draft evidence.

## Outcome

- Impact: repair_en for GQUR-301 Unit 13 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Corrected Unit 13 statistical claims, assessment demands, coverage and source records, and committed fresh draft evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open; G1 authority, provenance, rendered inspection and Urdu translation require separate owners.
  - G3 remains open; G1 authority, provenance, rendered inspection and Urdu translation require separate owners.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
