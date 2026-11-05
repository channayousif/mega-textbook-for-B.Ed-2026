---
id: crew-gqur-301-u11-repair_en
title: crew repair_en GQUR-301 unit 11
stage: misc
date: 2026-11-05
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u11-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-11/topic-01.mdx
  - docs/semester-2/gqur-301/unit-11/unit-assessment.mdx
  - docs/semester-2/gqur-301/unit-11/unit-teacher-notes.mdx
  - history/prompts/gqur-301/crew-gqur-301-u11-repair_en.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/unit-teacher-notes.mdx
  - specs/content/gqur-301/reviews/unit-11/G2/20261105T142816987Z-gates.json
  - specs/content/gqur-301/reviews/unit-11/G2/logs-20261105T142816987Z/check-bloom-bands.txt
  - specs/content/gqur-301/reviews/unit-11/G2/logs-20261105T142816987Z/check-concept-graph.txt
  - specs/content/gqur-301/reviews/unit-11/G2/logs-20261105T142816987Z/check-depth-gate.txt
  - specs/content/gqur-301/reviews/unit-11/G2/logs-20261105T142816987Z/check-docs-sync.txt
  - specs/content/gqur-301/reviews/unit-11/G2/logs-20261105T142816987Z/check-figures.txt
  - specs/content/gqur-301/reviews/unit-11/G2/logs-20261105T142816987Z/check-no-answer-keys.txt
  - specs/content/gqur-301/reviews/unit-11/G2/logs-20261105T142816987Z/check-no-em-dash.txt
  - specs/content/gqur-301/reviews/unit-11/G2/logs-20261105T142816987Z/validate-content.txt
  - specs/content/gqur-301/reviews/unit-11/repairs/20261105-agy.md
  - specs/content/gqur-301/reviews/unit-11/repairs/check-content-final.txt
  - specs/content/gqur-301/sources/unit-11.md
  - specs/content/gqur-301/tasks.md
tests:
  - npm run check:content
---

## Prompt

# Crew job gqur-301-u11-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u11-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-11/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 11 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-11/`.

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
From `specs/content/gqur-301/reviews/unit-11/G3/20261102T212207Z-g3-desk-7832f50b.json` (disposition: revise). Resolve each one:
- [blocking] docs/semester-2/gqur-301/unit-11/unit-assessment.mdx, RRQ 10 model answer: the stem describes 'a poorly written question' (one item) with two absurd distractors, but the model answer says 'On a 10-item test, the expected guessing score jumps from 2.5 to 5.0 marks'. That holds only if every item had two absurd distractors. With one flawed item the expected score rises from 2.5 to 9 x 0.25 + 0.5 = 2.75. Repair: either make the stem say every item (or the whole test) has two absurd distractors, or rewrite the model answer to state that the flawed item's p rises from 0.25 to 0.5 and the 10-item...
- [advisory] docs/semester-2/gqur-301/unit-11/topic-01.mdx Summative task mini-rubric and docs/semester-2/gqur-301/unit-11/unit-assessment.mdx ERQ 1 rubric: the marking guidance names 'fixed cost and expected count' and 'probabilistic' without the expected values a marker needs (Topic 11.1: ribbons 3 x 60 x Rs 20 = Rs 3,600, expected attendance 0.9 x 200 = 180, expected juice Rs 9,000; ERQ 1 Task B: 300 x 0.04 = 12 cases a month, Rs 3,600 expected). Repair: add these values to the Secure descriptors.
- [advisory] docs/semester-2/gqur-301/unit-11/unit-assessment.mdx ERQ 3 rubric, Threshold Calculations: credits only the rounded empirical-rule counts (200; 1,280). Topic 11.2 'Real-life application 2' tells learners the precise lower-tail area (2.28%) is better for an order, so a learner using 2.28% (182) or 15.87% (1,269) should also earn full marks. Repair: add 'or the precise-area values 182 and 1,269' to Band 3, or state 'use the rounded empirical rule' in the ERQ stem as the RRQ preamble does.
- [advisory] docs/semester-2/gqur-301/unit-11/unit-assessment.mdx MCQ 2 is labelled (Apply) but asks why a given calculation is deterministic, which is Understand. The MCQ band still holds (Remember-Apply). Repair: relabel (Understand) or have the learner perform a classification of a new case.
- [advisory] specs/content/gqur-301/sources/unit-11.md intro paragraph names OpenStax 'Section 6.1-6.2', but only Section 6.1 is cited in the unit and listed in the consulted locators. Repair: say 'Section 6.1' or add the 6.2 locator and what it supports.
- [advisory] docs/semester-2/gqur-301/unit-11/unit-teacher-notes.mdx Opening inquiry: 'the second is a probability distribution' conflates the situation with the model. Repair: 'the second needs a probabilistic model'.
- [uncertain] specs/content/gqur-301/tasks.md Unit 11 'G1 unit-spec' row is open (intake re-evaluation advised, D-2026-0070). The content-spec ## Unit 11 matches guide Chapter 11 (11.1, 11.2) and the unit follows it, but G3 cannot treat an unapproved unit spec as authority. Needs owner/evaluator G1 decision; not an author repair.
- [uncertain] Source passages (Lane binomial and normal-intro pages; OpenStax 4.3 and 6.1) are not bound in the prepared manifest. The reviewer read them live on 2026-10-22 and found them supportive (see crew-20261023/source-inspection.md), but unbound references cannot underpin an accepted decision. Host should bind the passages (e.g. specs/content/gqur-301/sources/texts/) for the next bundle.
- [uncertain] Rendered accessibility is unverified: no narrow-viewport, A4 print or dark-theme inspection and no glyph measurement of the four SVGs, because the crew brief forbids builds, servers, Playwright and Chromium in this job (crew-20261023/render-limitation.md). Source-level inspection found no evident overflow (crew-20261023/figure-inspection.md).

## Notes from earlier jobs on this unit
- (gqur-301-u11-translate-conflict4, fix, opencode) Pre-existing stash `crew-existing-generated-status` (timestamp/commit-only content-status bytes from conflict3) remains unpopped  -  the regenerated merged file supersedes it; no action needed.
- (gqur-301-u11-translate-conflict4, fix, opencode) Earlier notes' RRQ 10 (5.0 vs 2.75) and missing statistics terms remain out of scope here  -  separate author-repair and owner-advisory jobs still pending.
- (gqur-301-u11-translate-conflict3, fix, opencode) Statistics terms (ماڈل, دو حدی, etc.) still absent from frozen terminology bank  -  propose to owner at G5, out of scope here.
- (gqur-301-u11-translate-conflict3, fix, opencode) G3 F1 defect (RRQ 10 model answer says 5.0, correct is 2.75) still in English source  -  Urdu mirrors uncorrected text; re-check after author repair.
- (gqur-301-u11-translate-conflict3, fix, opencode) No render-inspect.mjs run on Urdu Nastaliq shaping or A4 print  -  G5 should verify before certification.

## Response snapshot

Repaired Unit 11 RRQ 10 distractor calculation, explicit rubric values in Topic 11.1 and ERQ 1, normal-tail area credits in ERQ 3, MCQ 2 bloom label, OpenStax source locator, and teacher notes phrasing, mirrored edits into Urdu, refreshed G2 draft gate evidence, and appended the advisory G3 tracker row.

## Outcome

- Impact: repair_en for GQUR-301 Unit 11 by agy.
- Tests: npm run check:content passed with all 14 gates green.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 11 assessment calculations, rubric reference values, Bloom taxonomy label, source locator, and teacher notes prompt; mirrored changes into Urdu; refreshed G2 gate evidence and recorded G3 repair row.
- Decisions the team must respect: G3 remains unticked pending fresh independent review; G1 intake re-evaluation (D-2026-0070) remains open for owner/evaluator resolution.
- Pending / next owner: fresh independent G3 reviewer session.
- Notes for the next job on this unit:
  - G3 remains unticked and open.
  - G1 unit-spec approval and source binding in manifest remain uncertain findings requiring host/owner action.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
