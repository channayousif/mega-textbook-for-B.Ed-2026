---
id: crew-gpks-402-u02-repair_en-r1
title: crew repair_en GPKS-402 unit 2
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gpks-402
branch: crew/gpks-402-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-02/topic-01.mdx
 - docs/semester-2/gpks-402/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/topic-02.mdx
 - specs/content/gpks-402/figures/unit-02.md
 - specs/content/gpks-402/reviews/unit-02/G2/20261110T051752668Z-gates.json
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261110T051752668Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261110T051752668Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261110T051752668Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261110T051752668Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261110T051752668Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261110T051752668Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261110T051752668Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261110T051752668Z/validate-content.txt
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u02-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gpks-402/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-02/`.

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
From `specs/content/gpks-402/reviews/unit-02/G3/20261108T203238Z-g3-desk-69c5585e.json` (disposition: revise). Resolve each one:
- [blocking] docs/semester-2/gpks-402/unit-02/unit-assessment.mdx MCQ 2/key 2 and ERQ 1 rubric, plus topic-01.mdx activity table and fig-U2-1 alt text: college is dated 1875, while topic-01 Explanation distinguishes the 1875 school from the 1877 college. MCQ 2 offers no 1877 option. Author must verify the distinction and align stems, keys, prose and figure labels.
- [blocking] docs/semester-2/gpks-402/unit-02/topic-02.mdx Common Misconception: 1916 to 1929 is 13 years, not more than twenty-five. Correct the interval and audit the repeated duration in teacher notes and MCQ 10.
- [blocking] docs/semester-2/gpks-402/unit-02/topic-02.mdx The Decisive Democratic Mandate: 446 / 495 = 90.10%, not 87%. Verify the underlying source and align the count, denominator, percentage, MCQ 9/key and ERQ 4 rubric.
- [blocking] docs/semester-2/gpks-402/unit-02/unit-assessment.mdx MCQ 4 option C says proportional representation, but topic-02 Simla Deputation explicitly describes weightage beyond numerical proportion. Distinguish these and supply an unambiguous correct option.
- [blocking] docs/semester-2/gpks-402/unit-02/topic-02.mdx Worked Example compares 1937 votes with 1945–46 seats. These are different measures; use a sourced common denominator before asking learners to infer the size of electoral change.
- [blocking] specs/content/gpks-402/sources/unit-02.md Unverifiable sources: entries do not record dated retrieval attempts and owner authorisation required by the G3 unavailable-source exception. Topic prose states detailed claims without disclosing their uncorroborated support. Obtain bound source passages or a complete authorised declaration and qualify the unsupported prose.
- [blocking] docs/semester-2/gpks-402/unit-02/unit-assessment.mdx ERQ 4 Critical Historical Evaluation awards credit for a predetermined conclusion. Permit evidence-based competing judgments; distinguish seat mandate from universal suffrage and a referendum.
- [advisory] docs/semester-2/gpks-402/unit-02/topic-01.mdx uses unexplained terms including existential crisis, disenfranchised underclass, and magnum opus. Simplify or define them for the HSC readership.
- [uncertain] No parent-supplied author run identity or exact reviewer model version was supplied. The author commit is known, but is not a session identity. Fresh reviewer session did not author these bytes; full provenance remains unverified.
- [uncertain] Current desktop, narrow-screen and A4 print inspection unavailable: crew brief prohibits builds, servers and Playwright. No render-review command was executed or claimed. Accessibility remains unverified.
- [uncertain] Assessment stems and supplied answers were displayed together during inspection. No solve-before-key record can be claimed for this session. A fresh reviewer must independently solve all 25 items before viewing the answers.

## Notes from earlier jobs on this unit
- (gpks-402-u02-repair_en, repair_en, agy) GPKS-402 Unit 2 G2 gate evidence refreshed and all 14 content gates pass; ready for fresh independent G3 English review followed by G5 Urdu review.
- (gpks-402-u02-review_en, review_en, codex) Repair recorded assessment and chronology defects, then obtain fresh review with verified sources, provenance and screen/print inspection.
- (gpks-402-u02-review_en, review_en, codex) Repair recorded assessment and chronology defects, then obtain fresh review with verified sources, provenance and screen/print inspection.
- (gpks-402-u02-translate-conflict1, fix, agy) Preserved Unit 2 G4 ur-translation tracker row alongside main's Unit 4 rows in specs/content/gpks-402/tasks.md.
- (gpks-402-u02-translate-conflict1, fix, agy) English draft inconsistencies (fig-U2-4 width, MCQ 10 duration, MCQ 4 weightage) and bank spelling الی گڑھ remain carried into Urdu and need review before G5.


## Response snapshot

Applied the remaining G3 report 69c5585e repairs to GPKS-402 Unit 2 (fig-U2-1 manifest college date, magnum opus simplification, explicit uncorroborated-source disclosures in EN and UR), appended the advisory tracker row, refreshed G2 gate evidence, and committed everything on the branch.

## Outcome

- Impact: repair_en for GPKS-402 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the remaining G3 report 69c5585e repairs to GPKS-402 Unit 2 (fig-U2-1 manifest college date, magnum opus simplification, explicit uncorroborated-source disclosures in EN and UR), appended the advisory tracker row, refreshed G2 gate evidence, and committed everything on the branch.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G5 should read the new Urdu uncorroborated-source disclosures in topic-01/topic-02 for natural academic register.
  - G3 stays open; provenance, rendered accessibility and solve-before-key still need a fresh reviewer (ADR-0019).
  - G2 gate evidence refreshed at 20261110T051752668Z after the English edits; all 14 content gates pass.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
