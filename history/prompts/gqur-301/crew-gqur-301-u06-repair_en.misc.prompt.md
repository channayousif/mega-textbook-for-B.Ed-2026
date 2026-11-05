---
id: crew-gqur-301-u06-repair_en
title: crew repair_en GQUR-301 unit 6
stage: misc
date: 2026-11-05
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u06-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-06/topic-02.mdx
 - docs/semester-2/gqur-301/unit-06/topic-03.mdx
 - docs/semester-2/gqur-301/unit-06/unit-assessment.mdx
 - history/prompts/general/20261126-repair-gqur-unit-6-findings.general.prompt.md
 - specs/content/gqur-301/coverage/unit-06.md
 - specs/content/gqur-301/figures/unit-06.md
 - specs/content/gqur-301/reviews/unit-06/G2/20261105T130949430Z-gates.json
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261105T130949430Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261105T130949430Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261105T130949430Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261105T130949430Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261105T130949430Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261105T130949430Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261105T130949430Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261105T130949430Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-06/author-repair/content-final.log
 - specs/content/gqur-301/reviews/unit-06/author-repair/content-initial.log
 - specs/content/gqur-301/reviews/unit-06/author-repair/content-main.log
 - specs/content/gqur-301/reviews/unit-06/author-repair/handoff.md
 - specs/content/gqur-301/reviews/unit-06/author-repair/source-verification.md
 - specs/content/gqur-301/reviews/unit-06/author-repair/unit-tests.log
 - specs/content/gqur-301/reviews/unit-06/author-repair/validation.md
 - specs/content/gqur-301/sources/texts/pbs-census2023.md
 - specs/content/gqur-301/sources/unit-06.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-06/fig-U6-6.dark.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u06-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-06/`.

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
From `specs/content/gqur-301/reviews/unit-06/G3/20261102T212207Z-g3-desk-f6cc2233.json` (disposition: revise). Resolve each one:
- [blocking] F3: topic-02.mdx Explanation and unit-assessment.mdx RRQ 4 guidance say squaring makes every deviation positive, although zero remains zero. Replace with non-negative through separate author repair.
- [blocking] F4: content-spec.md Course review plan requires a real-Pakistan-data task per unit. ERQ 1-5 use unattributed classroom illustration datasets; add a sourced real-data task without inventing provenance.
- [blocking] F5: topic-03.mdx Is more spread good or bad and fig-U6-6 treat placement-test spread as proof of useful separation; ERQ 3 rubric prescribes one programme solely from low SD. Qualify by test validity, diagnostic evidence and learner needs.
- [blocking] F6: unit-assessment.mdx RRQ 10 guidance asserts all School M classes are close to 92 percent from SD=2 alone. Use lower overall dispersion and inspect individual classes; SD alone does not establish the universal statement.
- [advisory] F7: RRQ 6 mainly rehearses definitions and units, closer to Understand than its Analyze label; Topic 6.3 formative item 3 asks explanation rather than routine application.
- [uncertain] F1: G1 remains open after D-2026-0070; intake-3 binds the former six-unit partition. Owner/evaluator must resolve current authority. See summary.md#authority.
- [uncertain] F2: Host supplied no author run identity or prepared parent handoff. Author commit identifies provenance only, not a verified author session. Exact model build unavailable. Reviewer session ID is genuine; input manifest matches locally frozen committed files.
- [uncertain] F8: No current narrow-screen or A4 print page inspection under crew prohibitions. Supplemental geometry command accidentally invoked Chromium without heavy.sh; exited and closed browser, not a render-review pass. See render-limitation.log.

## Notes from earlier jobs on this unit
- (gqur-301-u06-translate-r1, translate, codex) Separate English author must resolve Unit 6 precision, inference and assessment defects before G4 resumes.
- (gqur-301-u06-translate-r1, translate, codex) Separate English author must resolve Unit 6 precision, inference and assessment defects before G4 resumes.
- (gqur-301-u06-translate, translate, codex) Separate English author must resolve Unit 6 precision and assessment defects before translation resumes.
- (gqur-301-u06-translate, translate, codex) Separate English author must resolve Unit 6 precision and assessment defects before translation resumes.
- (gqur-301-u06-review_en, review_en, codex) Author repairs and G1/provenance resolution remain pending; current narrow-screen and A4 inspection is still required.


## Response snapshot

Repaired Unit 6 statistical precision, teaching inferences and assessment alignment, added a sourced PBS task, and refreshed draft evidence.

## Outcome

- Impact: repair_en for GQUR-301 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 27 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 6 statistical precision, teaching inferences and assessment alignment, added a sourced PBS task, and refreshed draft evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open pending authority/provenance resolution and authorised geometry, narrow-screen and A4 inspection; Urdu translation remains pending.
  - G3 remains open pending authority/provenance resolution and authorised geometry, narrow-screen and A4 inspection; Urdu translation remains pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
