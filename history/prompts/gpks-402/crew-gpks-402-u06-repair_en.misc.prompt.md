---
id: crew-gpks-402-u06-repair_en
title: crew repair_en GPKS-402 unit 6
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gpks-402
branch: crew/gpks-402-u06-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
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
 - history/prompts/gpks-402/550-repair-gpks402-u06-g3.general.prompt.md
 - specs/content/gpks-402/coverage/unit-06.md
 - specs/content/gpks-402/reviews/unit-06/G2/20261105T112904958Z-gates.json
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261105T112904958Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261105T112904958Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261105T112904958Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261105T112904958Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261105T112904958Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261105T112904958Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261105T112904958Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261105T112904958Z/validate-content.txt
 - specs/content/gpks-402/sources/texts/mocc-2021-nccp.md
 - specs/content/gpks-402/sources/texts/nacta-nap-2014.md
 - specs/content/gpks-402/sources/texts/national-nutrition-survey-2018.md
 - specs/content/gpks-402/sources/texts/national-water-policy-2018.md
 - specs/content/gpks-402/sources/texts/paigham-e-pakistan-2018.md
 - specs/content/gpks-402/sources/texts/satp-pakistan-fatalities.md
 - specs/content/gpks-402/sources/texts/unicef-education-2024.md
 - specs/content/gpks-402/sources/texts/worldbank-pdu-2025-unit-06.md
 - specs/content/gpks-402/sources/texts/worldbank-poverty-equity-brief-2024.md
 - specs/content/gpks-402/sources/unit-06.md
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u06-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
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
From `specs/content/gpks-402/reviews/unit-06/G3/20261102T212207Z-g3-desk-181b4e13.json` (disposition: revise). Resolve each one:
- [blocking] F02 sources: sources/texts/worldbank-pdu-2025-unit-06.md contains purported quotations without authentic page locators and section names not present in the original PDF contents. Topic-02 Population growth and Poverty and unemployment inherit unsupported precision. Authenticate original passages, correct quotation/paraphrase labels and bind dated metric definitions; see source-inspection.md.
- [blocking] F03 sources: coverage/unit-06.md maps U6-06 solely to Burki 1999, while topic-02 Terrorism and extremism asserts post-2001 history, 2002-2024 deaths/costs, NAP 2014 and Paigham 2018. Bind suitable later primary sources or remove/qualify these claims. Complete the unavailable-source declaration with dated attempts and authorisation context.
- [blocking] F05 assessment: unit-assessment ERQ 2 stem asks population, poverty, unemployment and environment, while its rubric adds extremism, NAP and policy implementation evaluation. Align explicit task and scoring demands. RRQ 8 permits any two valid policy or agricultural responses but its score categories require one of each.
- [blocking] F06 readability: topic-01 uses geoeconomics and topic-02 uses intercensal, youth dependency ratio, economic disenfranchisement and kinetic military operations without accessible first-use definitions or bilingual glossary support (style-guide EN readability rules). Replace or define specialist terms and shorten dense explanatory paragraphs.
- [advisory] F07 pedagogy/assessment: Provide offline source cards or dated data for topic-02 real-data inquiry and topic-03 provincial research. ERQ 5 should credit evidence-based critique of teacher agency and its structural limits rather than an inspiring manifesto. Avoid describing GB/AJK as provinces in topic-03 Balanced, inclusive curricula.
- [uncertain] F01 provenance: No parent-prepared frozen handoff or actual author run identity was supplied. Authoring commit cefc07d1703a127cb9093cc2ffe951ec67246fb2 is verified git history, not an author session ID. Reviewer session is actual CODEX_SESSION_ID. Exact serving model version is not exposed. Obtain trusted provenance before accepting a fresh report.
- [uncertain] F04 sources: Khan, Dean and MOCC candidate excerpts remain unauthenticated; the latter two lack original retrieval URLs in the ledger. Check original passages and dates, especially current multilateral counts, flood impacts and the claimed universal 25% forest standard. Missing original evidence is not a verified pass.
- [uncertain] F08 accessibility: Crew brief forbids build, server and Playwright. Narrow-page, keyboard and A4-print rendering unavailable; no render-review executed. No successful visual inspection or rendered-image evidence claimed.

## Notes from earlier jobs on this unit
- (gpks-402-u06-translate-r1, translate, codex) English author must repair scoring and unresolved G3 findings before translation resumes; status remains draft.
- (gpks-402-u06-translate-r1, translate, codex) English author must repair scoring and unresolved G3 findings before translation resumes; status remains draft.
- (gpks-402-u06-translate, translate, codex) English author must repair scoring and unresolved G3 findings before translation resumes.
- (gpks-402-u06-translate, translate, codex) English author must repair scoring and unresolved G3 findings before translation resumes.
- (gpks-402-u06-review_en, review_en, codex) Author must repair source support, assessment scoring and vocabulary; host must supply provenance and rendered-page evidence. G3/G5 remain open.


## Response snapshot

Applied the latest G3 report's repairs to GPKS-402 Unit 6 (corrected the fabricated World Bank PDU excerpt, bound later terrorism sources and completed the Burki unavailability declaration, aligned ERQ 2/RRQ 8 scoring, defined or replaced specialist terms, and addressed the advisory pedagogy items), with all content gates green.

## Outcome

- Impact: repair_en for GPKS-402 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the latest G3 report's repairs to GPKS-402 Unit 6 (corrected the fabricated World Bank PDU excerpt, bound later terrorism sources and completed the Burki unavailability declaration, aligned ERQ 2/RRQ 8 scoring, defined or replaced specialist terms, and addressed the advisory pedagogy items), with all content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F01 (author-run provenance) and F08 (rendered narrow/A4 evidence) remain host-supplied; G3 stays open under ADR-0019.
  - No Urdu mirror exists for Unit 6, so the revise-topic mirror step was not applicable; translation remains a separate job.
  - A fresh independent G3 review is needed before the unit can be ticked; the refreshed G2 evidence is at `reviews/unit-06/G2/20261105T112904958Z-gates.json`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
