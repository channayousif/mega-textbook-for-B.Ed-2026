---
id: crew-efmp-304-u02-repair_en-r1
title: crew repair_en EFMP-304 unit 2
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-304/unit-02/index.mdx
 - docs/semester-2/efmp-304/unit-02/topic-01.mdx
 - docs/semester-2/efmp-304/unit-02/topic-03.mdx
 - history/prompts/efmp-304/crew-efmp-304-u02-repair_en-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-03.mdx
 - specs/content/efmp-304/reviews/unit-02/G2/20261110T003505553Z-gates.json
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261110T003505553Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261110T003505553Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261110T003505553Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261110T003505553Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261110T003505553Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261110T003505553Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261110T003505553Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-02/G2/logs-20261110T003505553Z/validate-content.txt
 - specs/content/efmp-304/reviews/unit-02/G3/20261110-repair-notes.md
 - specs/content/efmp-304/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u02-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-304/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-02/`.

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
From `specs/content/efmp-304/reviews/unit-02/G3/20261108T203238Z-g3-desk-5daf97ba.json` (disposition: revise). Resolve each one:
- [blocking] `topic-03.mdx`, Types of argument, Policy argument; Four ways to argue one thing: Says policy is the only type that can conclude “we should”, yet the authority example concludes “we should split it”, the analogy and evidence examples propose splitting, and the activity asks all four types to support “should hold parent meetings”. Separate support patterns from the subject of the conclusion and revise the contradictory exclusivity claim.
- [blocking] `topic-02.mdx`, The rhetorical triangle and Issue questions and information questions; assessment RRQ 4 model: “Request plus an offer” to Rubina is declared to argue nothing, even though a reciprocal duty offer can be a reason for accepting the request. “Arguments belong to issue questions” excludes reasoned factual conclusions even though Topic 2.2 itself offers a causal vacancy argument. Administrative power to grant leave does not determine whether a text supplies support. Teach communicative purpose and support relations with contextual qualification; allow colleagues and parents to rec...
- [blocking] `topic-03.mdx`, Classify first, judge second; `sources/texts/yuzenker2022.md`, Scope note: Candidate attributes a specific methodological position and “cart before the horse” wording to Yu and Zenker. The bound source explicitly calls the position a title-level inference, says full text was not retrieved, and supplies no supporting quoted passage. This is an evidence mismatch, not proof the published authors never said it. Bind the actual supporting passage and locator or remove the unverified attribution. Do not treat a source note's inference as a verified quotation.
- [blocking] `topic-01.mdx` through `topic-04.mdx`, Further reading; `topic-03.mdx`, opening of Types of argument; `sources/unit-02.md`, Unverifiable sources: Bassham is declared bibliographic-only, but prose says its chapters “supply” the distinctions, “source for ... argument types and their characteristic weaknesses”, and attributes recurring types to it without point-of-use disclosure. D-2026-0013 explicitly requires the bibliographic limitation at the point of use. The source declaration also lacks a dated retrieval-attempt record. Restore honest point-of-use limits and bind verifiable support for ...
- [blocking] `unit-assessment.mdx`, RRQ 7 and corresponding model: Prompt states only that three of four adopting schools improved. It gives neither an explicit causal conclusion nor a comparison with non-adopters. Model awards two marks for closing a gap to a causal conclusion and mentions schools that did not add classes, which the question never supplies. State the intended conclusion/comparison or accept the report-only reading and conditional reconstruction.
- [blocking] `unit-assessment.mdx`, RRQ 9 and model; `topic-04.mdx`, worked letter and formative item 6: “Hira has missed eleven days” plus “route should be restored” needs a causal/feasibility bridge as well as an attendance duty. The model supplies only duty and asserts that refusal rejects that duty. A head may accept the duty and dispute route causation or available remedies. Accept multiple defensible assumptions and distinguish missing empirical links from normative obligations.
- [blocking] `unit-assessment.mdx`, ERQ 3 and rubric: Four teachers are not four distinct taught types: notebook and pass-rate reasons are both evidence-shaped, followed by analogy and feasibility/policy. Topic 2.3 expressly says nobody in that meeting used authority. Rubric “all four types correctly named” risks requiring authority where none is present. Credit mixed/repeated patterns or supply four genuinely distinct cases; require evidence-based rankings without a single predetermined order.
- [blocking] `static/img/figures/efmp-304/unit-02/fig-U2-2.svg` and `.dark.svg`; `fig-U2-4.svg` and `.dark.svg`: Geometry measures U2-2 inference-label overflow of 21.7 and 43.1px beyond its 780px viewBox. Native screenshot visibly cuts off both lines. U2-4's last column heading runs into the preceding heading and extends 1.7px beyond the 900px viewBox; screenshot confirms collision. Separate author must reflow labels and regenerate dark variants. `check:figures` passes despite these defects.
- [blocking] `unit-assessment.mdx`, RRQ 8, RRQ 10, ERQ 5 and rubrics: RRQ 8 mostly recalls cue words with an explanation, despite Apply. RRQ 10 classifies near-identical taught examples, despite Analyze. ERQ 5 requests analysis and evaluative judgement, and its own rubric explicitly says Evaluate despite a Create label. Judge tags from actual work and align them; no new Create requirement is inferred from the blueprint's optional Evaluate/Create range.
- [advisory] Bound `course-overview.mdx`, Assessment: Course overview claims default 60/40, but guide lines 743-756 and this unit/spec use course-specific 30/70. Guide settles the answer. This dependency is outside the unit-edit scope, so refer repair to the course owner; this reviewer did not change it.
- [advisory] `unit-assessment.mdx`, MCQ 3; `topic-01.mdx`, dispute test: MCQ 3 assumes without context that nobody disputes the fan failure. B matches the intended explanatory reading, but causal wording can also supply evidence for a disputed fact. Add the audience context and keep “dispute” a heuristic rather than an exhaustive definition.
- [uncertain] Required independent handoff and `render-review`: Missing actual author-run identity, parent-frozen handoff, and exact deployed model revision prevent full provenance verification. No fresh Docusaurus rendering supplied; brief forbids a build/server. Native SVG screenshots are supplementary and do not satisfy 360px layout, keyboard table access, or A4 print review. Owner/host must supply provenance and a permitted rendering handoff; obtain a fresh review after repairs.

## Notes from earlier jobs on this unit
- (efmp-304-u02-illustrate, illustrate, agy) Fresh independent G3 remains required; G3/G5 were not certified.
- (efmp-304-u02-illustrate, illustrate, agy) Course owner must address overview weighting and audit Unit 3's shared source attribution.
- (efmp-304-u02-repair_en, repair_en, codex) Course owner must address overview weighting and audit Unit 3’s shared source attribution.
- (efmp-304-u02-repair_en, repair_en, codex) G3 remains unticked; fresh independent G3/G5 and permitted browser geometry/rendering checks are required.
- (efmp-304-u02-repair_en, repair_en, codex) Course owner must address overview weighting and audit Unit 3’s shared source attribution.


## Response snapshot

Resolved EFMP-304 Unit 2 G3 desk review findings across English and Urdu files, refreshed G2 gate evidence, documented repairs in G3 notes, and appended an unticked advisory repair row to tasks.md.

## Outcome

- Impact: repair_en for EFMP-304 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved EFMP-304 Unit 2 G3 desk review findings across English and Urdu files, refreshed G2 gate evidence, documented repairs in G3 notes, and appended an unticked advisory repair row to tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Course overview claims default 60/40 weighting whereas course guide and content-spec specify 30/70; course owner must resolve outside this unit.
  - G3 remains unticked; fresh independent review and live browser/print inspection under permitted tooling are required before certification.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
