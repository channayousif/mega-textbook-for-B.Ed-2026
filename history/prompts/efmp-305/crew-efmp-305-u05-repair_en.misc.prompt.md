---
id: crew-efmp-305-u05-repair_en
title: crew repair_en EFMP-305 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: efmp-305
branch: crew/efmp-305-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-05/topic-01.mdx
 - docs/semester-2/efmp-305/unit-05/topic-02.mdx
 - docs/semester-2/efmp-305/unit-05/topic-03.mdx
 - docs/semester-2/efmp-305/unit-05/unit-assessment.mdx
 - docs/semester-2/efmp-305/unit-05/unit-teacher-notes.mdx
 - history/prompts/general/20261035-repair-efmp305-unit-five-findings.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/unit-teacher-notes.mdx
 - specs/content/efmp-305/figures/unit-05.md
 - specs/content/efmp-305/reviews/unit-05/G2/20261103T131119616Z-gates.json
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/validate-content.txt
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/content-baseline.log
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/content-final.log
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/geometry.log
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/repair-notes.md
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/source-check.md
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/unit-tests.log
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/validation.md
 - specs/content/efmp-305/sources/unit-05.md
 - specs/content/efmp-305/tasks.md
 - static/img/figures/efmp-305/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-305/unit-05/fig-U5-4.svg
 - static/img/figures/efmp-305/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efmp-305/unit-05/fig-U5-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u05-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-305/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-05/`.

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
From `specs/content/efmp-305/reviews/unit-05/G3/20261102T212207Z-g3-desk-6054cf1d.json` (disposition: revise). Resolve each one:
- [blocking] 2. **F2, blocking, assessment ambiguity.** unit-assessment.mdx, MCQ 7: B correctly rejects the ICT Act's territorial applicability; C also correctly describes that Act's admission bar; D combines them. The answer note explicitly awards B when reasoning is visible although the instructions say choose one. Repair to one unambiguous best answer and consistent scoring, then independently re-solve.
- [blocking] 3. **F3, blocking, audit coverage and feasibility.** topic-02.mdx, 'The school responsibilities audit', lists five headings that omit explicit tests for transport (duty 8), life/social skills (9) and all modes of education (10). ERQ 3 demands a section-by-section audit using those same five headings; its top band does not repair those omissions. The 'nine of ten' immediately available assertion also ignores transport and inaccessible buildings, both of which can require money. Figure fig-U5-4's alt/prompt repeats that assurance. Add checks for all ten duties, distinguish evidence of noncomp...
- [blocking] 4. **F4, blocking, privacy and inconsistent pedagogy.** topic-03.mdx Activity Part 1 says nobody collects the private reservation; teacher notes 'Running the activities' explicitly forbid asking what was written. The same topic's Summative task item 5 and four-mark Self-account criterion then require that reservation. Permit a hypothetical or voluntarily chosen reflection, with equal marks for declining disclosure, and align teacher notes. Also align teacher notes 'Where trainees reliably go wrong' item 6, which refuses every analysis without a classroom-level gap, with the learner task's i...
- [blocking] 5. **F5, blocking, source overstatement.** topic-03.mdx 'What Pakistani teachers themselves report' says each factor accounts for roughly equal variance, while sources/unit-05.md anis2025 explicitly excludes any variance claim and the next paragraph says no strength of effect or number is asserted. Equal factor variances would not by themselves establish that attitudes, resources and preparedness are inseparable. Retrieve and bind the relevant results, qualify the inference and reconcile the source declaration. The Summary and RRQ 8 model also repeat roughly equal dimensions.
- [advisory] 7. **F7, advisory, misleading source framing.** topic-01.mdx's case uses precise school numbers and an unsupported taluka-average comparison; topic-03.mdx cites examples from previous cohorts and says half of first drafts fail, without provenance. Label constructed illustrations and remove invented empirical precision or supply evidence. sources/unit-05.md's six unavailable sources are declared, so missing full text alone is not treated as an automatic failure under D-2026-0001. Specific overclaims, rather than URL availability, drive F5 and F6.
- [advisory] 8. **F8, advisory, stale asset narrative.** figures/unit-05.md rows are placed and carriers/assets exist, but its closing paragraph says all six are prompt-only. Tracker G6 notes have the same stale description. Author/asset owner should reconcile narrative in a separate repair; reviewer has not changed bound inputs.
- [uncertain] 1. **F1, uncertain, provenance and rendering.** Parent author-run provenance and exact model build are unavailable, and current browser/print evidence is absent. Owner/host must supply these for a fresh review. A regenerated manifest alone is insufficient proof of independent handoff.
- [uncertain] 6. **F6, uncertain, legal inference beyond bound excerpts.** topic-01.mdx 'What a national education policy is, and what it is not' says no parent can take a policy to court or ask for an order. The bound NEP excerpt establishes wording, not judicial enforceability or use in constitutional proceedings. topic-02.mdx 'Reasonable accommodation, taught properly' similarly infers comprehensive cost and fundamental-alteration rules from a definition without bound interpretive authority. Have an appropriately qualified source/reviewer delimit these propositions. Teach the narrower distinction betw...

## Notes from earlier jobs on this unit
- (efmp-305-u05-fix, fix, codex) Scope approval pending for generated content-status refresh; fresh independent G3 remains required.
- (efmp-305-u05-fix, fix, codex) Scope approval pending for generated content-status refresh; fresh independent G3 remains required.
- (efmp-305-u05-translate-r1, translate, agy) All 6 .ur.svg/.ur.dark.svg figure variants are wired with exact carrier alt matching SVG desc tags.
- (efmp-305-u05-translate-r1, translate, agy) All 3 key_terms in index.mdx conform to terminology.csv; translation_status stays draft pending independent G5 review.
- (efmp-305-u05-translate-r1, translate, agy) 26 unbanked concept labels documented in reviews/unit-05/G4/translation-handoff.md for curriculum owner review.


## Response snapshot

Repaired Unit 5 English and Urdu assessment, audit, privacy, source and legal framing, figure coverage, and stale tracker narratives.

## Outcome

- Impact: repair_en for EFMP-305 Unit 5 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 34 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 5 English and Urdu assessment, audit, privacy, source and legal framing, figure coverage, and stale tracker narratives.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Refresh static/content-status.json after scope approval, then rerun check:content.
  - Owner/host must supply F1 provenance/rendering and arrange fresh independent G3, including MCQ re-solve; G3 remains unticked.
  - Refresh static/content-status.json after scope approval, then rerun check:content.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
