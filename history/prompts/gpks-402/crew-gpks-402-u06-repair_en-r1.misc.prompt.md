---
id: crew-gpks-402-u06-repair_en-r1
title: crew repair_en GPKS-402 unit 6
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u06-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-06/topic-01.mdx
 - docs/semester-2/gpks-402/unit-06/topic-02.mdx
 - docs/semester-2/gpks-402/unit-06/topic-03.mdx
 - docs/semester-2/gpks-402/unit-06/unit-assessment.mdx
 - history/prompts/gpks-402/crew-gpks-402-u06-repair_en-r1.misc.prompt.md
 - specs/content/gpks-402/reviews/unit-06/G2/20261110T062724508Z-gates.json
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/validate-content.txt
 - specs/content/gpks-402/sources/texts/dean-2005-citizenship.md
 - specs/content/gpks-402/sources/texts/khan-2015-foreign-policy.md
 - specs/content/gpks-402/sources/unit-06.md
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u06-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u06-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gpks-402/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-06/`.

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
From `specs/content/gpks-402/reviews/unit-06/G3/20261108T203238Z-g3-desk-558b2467.json` (disposition: revise). Resolve each one:
- [blocking] F02 sources: sources/texts/worldbank-pdu-2025-unit-06.md contains purported quotations without authentic page locators and section names not present in the original PDF contents. Topic-02 Population growth and Poverty and unemployment inherit unsupported precision. Authenticate original passages, correct quotation/paraphrase labels and bind dated metric definitions; see source-inspection.md.
- [blocking] F03 sources: coverage/unit-06.md maps U6-06 solely to Burki 1999, while topic-02 Terrorism and extremism asserts post-2001 history, 2002-2024 deaths/costs, NAP 2014 and Paigham 2018. Bind suitable later primary sources or remove/qualify these claims. Complete the unavailable-source declaration with dated attempts and authorisation context.
- [blocking] F05 assessment: unit-assessment ERQ 2 stem asks population, poverty, unemployment and environment, while its rubric adds extremism, NAP and policy implementation evaluation. Align explicit task and scoring demands. RRQ 8 permits any two valid policy or agricultural responses but its score categories require one of each.
- [blocking] F06 readability: topic-01 uses geoeconomics and topic-02 uses intercensal, youth dependency ratio, economic disenfranchisement and kinetic military operations without accessible first-use definitions or bilingual glossary support (style-guide EN readability rules). Replace or define specialist terms and shorten dense explanatory paragraphs.
- [advisory] F07 pedagogy/assessment: Provide offline source cards or dated data for topic-02 real-data inquiry and topic-03 provincial research. ERQ 5 should credit evidence-based critique of teacher agency and its structural limits rather than an inspiring manifesto. Avoid describing GB/AJK as provinces in topic-03 Balanced, inclusive curricula.
- [uncertain] F01 provenance: No parent-prepared frozen handoff or actual author run identity was supplied. Authoring commit cefc07d1703a127cb9093cc2ffe951ec67246fb2 is verified git history, not an author session ID. Reviewer session is actual CODEX_SESSION_ID. Exact serving model version is not exposed. Obtain trusted provenance before accepting a fresh report.
- [uncertain] F04 sources: Khan, Dean and MOCC candidate excerpts remain unauthenticated; the latter two lack original retrieval URLs in the ledger. Check original passages and dates, especially current multilateral counts, flood impacts and the claimed universal 25% forest standard. Missing original evidence is not a verified pass.
- [uncertain] F08 accessibility: Crew brief forbids build, server and Playwright. Narrow-page, keyboard and A4-print rendering unavailable; no render-review executed. No successful visual inspection or rendered-image evidence claimed.

## Notes from earlier jobs on this unit
- (gpks-402-u06-repair_en-conflict1, fix, opencode) F01 (author-run provenance) and F08 (rendered narrow/A4 evidence) remain host-supplied; G3 stays open under ADR-0019.
- (gpks-402-u06-repair_en-conflict1, fix, opencode) No Urdu mirror exists for Unit 6, so translation remains a separate job.
- (gpks-402-u06-repair_en-conflict1, fix, opencode) A fresh independent G3 review is needed before the unit can be ticked; refreshed G2 evidence is at `specs/content/gpks-402/reviews/unit-06/G2/20261105T112904958Z-gates.json`.
- (gpks-402-u06-repair_en, repair_en, opencode) F01 (author-run provenance) and F08 (rendered narrow/A4 evidence) remain host-supplied; G3 stays open under ADR-0019.
- (gpks-402-u06-repair_en, repair_en, opencode) No Urdu mirror exists for Unit 6, so the revise-topic mirror step was not applicable; translation remains a separate job.


## Response snapshot

Repaired GPKS-402 Unit 6 per G3 review report 558b2467 by binding dated metric sources and supplying offline data/resource cards, aligning assessment stems and rubrics for ERQ 2, ERQ 5 and RRQ 8, clarifying specialist terms and excerpt paraphrase labels, and refreshing G2 gate evidence.

## Outcome

- Impact: repair_en for GPKS-402 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GPKS-402 Unit 6 per G3 review report 558b2467 by binding dated metric sources and supplying offline data/resource cards, aligning assessment stems and rubrics for ERQ 2, ERQ 5 and RRQ 8, clarifying specialist terms and excerpt paraphrase labels, and refreshing G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F01 author-run provenance and F08 rendered narrow/A4 evidence remain host-supplied; G3 stays open under ADR-0019.
  - A fresh independent G3 review of Unit 6 is needed before the unit can be ticked; refreshed G2 gate evidence is at [20261110T062724508Z-gates.json](file:///home/a2ahs/crew-wt/gpks-402-u06-repair_en-r1/specs/content/gpks-402/reviews/unit-06/G2/20261110T062724508Z-gates.json).
  - No Urdu mirror exists yet for Unit 6, so Urdu translation remains a separate job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
