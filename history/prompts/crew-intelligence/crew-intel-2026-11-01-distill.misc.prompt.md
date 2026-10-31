---
id: crew-intel-2026-11-01-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-31
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-01-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-01.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-01-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-01-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-01.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [review] x3 recent, 3 total, since 2026-10-30: fn sources
  example: F02 sources
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json
- [handoff] x2 recent, 2 total, since 2026-10-30: urdu remains draft; svg geometry, rendered inspection and independent gn review remain pending under the brief’s browser restriction.
  example: Urdu remains draft; SVG geometry, rendered inspection and independent G5 review remain pending under the brief’s browser restriction.
  evidence: job:gpks-402-u03-translate
- [review] x1 recent, 3 total, since 2026-10-28: headless review tooling constraint
  example: Headless review tooling constraint
  evidence: review:specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json, review:specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json, review:specs/content/gpks-402/reviews/unit-03/G3/608a5388-1312-4060-ac88-c7d64ddc8c72.json
- [handoff] x1 recent, 2 total, since 2026-10-28: gn tracker row in <path> is updated to open ▢ per adr-n; certification remains blocked pending trusted qualification.
  example: G3 tracker row in specs/content/gpks-402/tasks.md is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
  evidence: job:gpks-402-u04-review_en, job:gpks-402-u03-review_en
- [handoff] x1 recent, 2 total, since 2026-10-28: unit n is ready for urdu translation (gn ur-translation) and subsequent independent urdu review (gn ur-review).
  example: Unit 4 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
  evidence: job:gpks-402-u04-review_en, job:gpks-402-u03-review_en
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: the sample voices run about n.n words a second with gaps, slower than the brand bible's n wpm; size scripts from the measured pace.
  example: reflection: the sample voices run about 2.2 words a second with gaps, slower than the brand bible's 150 wpm; size scripts from the measured pace.
  evidence: phr:history/prompts/video-studio/0904-licence-intro-script-draft.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: the policy does not make the licence mandatory for jobs or tie it to pay; the section says neither.
  example: reflection: the policy does not make the licence mandatory for jobs or tie it to pay; the section says neither.
  evidence: phr:history/prompts/015-licence-content-tree/0903-why-the-teaching-licence-matters.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: a busy or gradient backdrop breaks a single-colour flood fill; model the background per row.
  example: reflection: a busy or gradient backdrop breaks a single-colour flood fill; model the background per row.
  evidence: phr:history/prompts/video-studio/0901-cast-layers-cut.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: structural gates cannot resolve semantic scoring defects.
  example: reflection: Structural gates cannot resolve semantic scoring defects.
  evidence: phr:history/prompts/general/20261048-gpks-402-u06-translation-retry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: retry scheduled before prerequisite repair landed.
  example: failure modes observed: Retry scheduled before prerequisite repair landed.
  evidence: phr:history/prompts/general/20261048-gpks-402-u06-translation-retry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: next experiment (smallest change to try): separate author repair of rrq n and erq n.
  example: next experiment (smallest change to try): Separate author repair of RRQ 8 and ERQ 2.
  evidence: phr:history/prompts/general/20261048-gpks-402-u06-translation-retry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: english stems and scoring demands disagree despite green content gates.
  example: failure modes observed: English stems and scoring demands disagree despite green content gates.
  evidence: phr:history/prompts/general/20261047-gpks-402-u06-translation-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: next experiment (smallest change to try): repair the english scoring demands before translation.
  example: next experiment (smallest change to try): Repair the English scoring demands before translation.
  evidence: phr:history/prompts/general/20261047-gpks-402-u06-translation-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: duplicate rows in tasks.md caused check:pipeline-gate to fail; keeping main's newer gn row fixed the gate.
  example: reflection: duplicate rows in tasks.md caused check:pipeline-gate to fail; keeping main's newer G2 row fixed the gate.
  evidence: phr:history/prompts/gpks-402/2435-resolve-gpks402-u04-review_en-conflict1.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: duplicate (unit, stage) rows in tasks.md caused check:pipeline-gate to fail; resolved by keeping main's row.
  example: failure modes observed: duplicate (Unit, Stage) rows in tasks.md caused check:pipeline-gate to fail; resolved by keeping main's row.
  evidence: phr:history/prompts/gpks-402/2435-resolve-gpks402-u04-review_en-conflict1.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: unauthenticated source excerpts, postdated claims attributed to n, <path> mismatch, missing render and author-run evidence. local pdftot
  example: failure modes observed: Unauthenticated source excerpts, postdated claims attributed to 1999, rubric/stem mismatch, missing render and author-run evidence. Local pdftotext unavailable; publisher PDF i
  evidence: phr:history/prompts/general/20261046-gpks402-unit06-advisory-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: next experiment (smallest change to try): repair original-source provenance and scoring alignment before preparing a fresh review bundle.
  example: next experiment (smallest change to try): Repair original-source provenance and scoring alignment before preparing a fresh review bundle.
  evidence: phr:history/prompts/general/20261046-gpks402-unit06-advisory-g3.general.prompt.md
- [review] x1 recent, 1 total, since 2026-10-30: fn provenance
  example: F01 provenance
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json
- [review] x1 recent, 1 total, since 2026-10-30: fn assessment
  example: F05 assessment
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json
- [review] x1 recent, 1 total, since 2026-10-30: fn readability
  example: F06 readability
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json
- [review] x1 recent, 1 total, since 2026-10-30: fn <path>
  example: F07 pedagogy/assessment
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json
- [review] x1 recent, 1 total, since 2026-10-30: fn accessibility
  example: F08 accessibility
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: missing run provenance and rendering permission; stems and keys displayed together, so independent pre-key solving cannot be claimed. ar
  example: failure modes observed: Missing run provenance and rendering permission; stems and keys displayed together, so independent pre-key solving cannot be claimed. Archive baseline diagnostic invalid withou
  evidence: phr:history/prompts/general/20261039-gpks402-unit-two-g3-advisory.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: next experiment (smallest change to try): supply isolated assessment stems and current render evidence to fresh reviewer.
  example: next experiment (smallest change to try): Supply isolated assessment stems and current render evidence to fresh reviewer.
  evidence: phr:history/prompts/general/20261039-gpks402-unit-two-g3-advisory.general.prompt.md
- [review] x1 recent, 1 total, since 2026-10-30: <path> mcq <path> n and erq n rubric, plus topic-n.mdx activity table and fig-un-n alt text
  example: docs/semester-2/gpks-402/unit-02/unit-assessment.mdx MCQ 2/key 2 and ERQ 1 rubric, plus topic-01.mdx activity table and fig-U2-1 alt text
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: <path> common misconception
  example: docs/semester-2/gpks-402/unit-02/topic-02.mdx Common Misconception
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: <path> the decisive democratic mandate
  example: docs/semester-2/gpks-402/unit-02/topic-02.mdx The Decisive Democratic Mandate
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: <path> mcq n option c says proportional representation, but topic-n simla deputation explicitly describes weightage beyond numerical proportion
  example: docs/semester-2/gpks-402/unit-02/unit-assessment.mdx MCQ 4 option C says proportional representation, but topic-02 Simla Deputation explicitly describes weightage beyond numerical proportion
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: <path> worked example compares n votes with n–n seats
  example: docs/semester-2/gpks-402/unit-02/topic-02.mdx Worked Example compares 1937 votes with 1945–46 seats
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: <path> unverifiable sources
  example: specs/content/gpks-402/sources/unit-02.md Unverifiable sources
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: no parent-supplied author run identity or exact reviewer model version was supplied
  example: No parent-supplied author run identity or exact reviewer model version was supplied
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: current desktop, narrow-screen and an print inspection unavailable
  example: Current desktop, narrow-screen and A4 print inspection unavailable
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: assessment stems and supplied answers were displayed together during inspection
  example: Assessment stems and supplied answers were displayed together during inspection
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: <path> uses unexplained terms including existential crisis, disenfranchised underclass, and magnum opus
  example: docs/semester-2/gpks-402/unit-02/topic-01.mdx uses unexplained terms including existential crisis, disenfranchised underclass, and magnum opus
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [review] x1 recent, 1 total, since 2026-10-30: <path> erq n critical historical evaluation awards credit for a predetermined conclusion
  example: docs/semester-2/gpks-402/unit-02/unit-assessment.mdx ERQ 4 Critical Historical Evaluation awards credit for a predetermined conclusion
  evidence: review:specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: compare a port against the original on the same input before trusting it; done here.
  example: reflection: compare a port against the original on the same input before trusting it; done here.
  evidence: phr:history/prompts/video-studio/0900-bilal-voice-d.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: retries plus a cleanup in <code> that can throw turns one flake into a growing data leak.
  example: reflection: retries plus a cleanup in `finally` that can throw turns one flake into a growing data leak.
  evidence: phr:history/prompts/general/2438-reviewer-picker-row-cap-and-crew-stall.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: unpaged admin-wide query hit postgrest max_rows (same class as the spec n pagination fix).
  example: failure modes observed: unpaged admin-wide query hit PostgREST max_rows (same class as the Spec 010 pagination fix).
  evidence: phr:history/prompts/general/2438-reviewer-picker-row-cap-and-crew-stall.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: next experiment (smallest change to try): grep other admin pages for unpaged profiles queries.
  example: next experiment (smallest change to try): grep other admin pages for unpaged profiles queries.
  evidence: phr:history/prompts/general/2438-reviewer-picker-row-cap-and-crew-stall.general.prompt.md
- [handoff] x1 recent, 1 total, since 2026-10-30: all seven gn english criteria verified passing with evidence; all n assessment items independently solved; all n svg variants pass geometry.
  example: All seven G3 English criteria verified passing with evidence; all 25 assessment items independently solved; all 8 SVG variants pass geometry.
  evidence: job:gpks-402-u03-review_en

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-01.md` only.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. The acceptance checks in your task pass; `npm run check:content` reports nothing new against origin/main;
   any `node --test tests/crew/*.test.mjs` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (intel-2026-10-31-distill, intel_distill, agy) Translation and retry jobs should be held when G3 report disposition is escalate or revise with unresolved blocking defects (candidate C1).
- (intel-2026-10-31-distill, intel_distill, agy) Unpaged PostgREST queries in admin pages risk hitting the 1000-row limit when test accounts accumulate; use fetchAllPages (candidate C2).
- (intel-2026-10-31-distill, intel_distill, agy) Merging tasks.md table rows across concurrent course jobs requires row reconciliation by (Unit, Stage) to avoid duplicate rows and pipeline gate failures (candidate C3).
- (intel-2026-10-30-distill, intel_distill, agy) Editing scripts listed under manifestRoots (such as check-figures.mjs) invalidates review evidence corpus-wide; new gate checks must be independent scripts called via npm test.
- (intel-2026-10-30-distill, intel_distill, agy) Crew briefs prohibiting Playwright cause workers to skip scripts/heavy.sh node scripts/measure-figure-text.mjs, causing avoidable CI figure-geometry failures.


## Response snapshot

10 candidates; authoring source verification (C1), translation browser restrictions (C2), and assessment pre-key solving (C3) are the strongest.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 10 candidates; authoring source verification (C1), translation browser restrictions (C2), and assessment pre-key solving (C3) are the strongest.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Candidate C2 notes that crew briefs forbidding browsers lead translators to leave Urdu units in draft without running SVG geometry (`scripts/heavy.sh node scripts/measure-figure-text.mjs`); clarifying that headless SVG geometry checks are permitted will unblock G5 handoffs.
  - Candidate C3 notes that providing full unit assessments with answer keys forces reviewers to inspect stems and keys together; generating isolated stem bundles (`unit-assessment-stems.mdx`) will restore independent pre-key solving under ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
