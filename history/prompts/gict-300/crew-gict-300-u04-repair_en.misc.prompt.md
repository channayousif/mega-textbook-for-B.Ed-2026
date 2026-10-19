---
id: crew-gict-300-u04-repair_en
title: crew repair_en GICT-300 unit 4
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gict-300
branch: crew/gict-300-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gict-300/unit-04/topic-01.mdx
 - docs/semester-1/gict-300/unit-04/topic-02.mdx
 - docs/semester-1/gict-300/unit-04/topic-03.mdx
 - docs/semester-1/gict-300/unit-04/topic-04.mdx
 - docs/semester-1/gict-300/unit-04/unit-assessment.mdx
 - history/prompts/general/0531-repair-gict300-unit-four-review.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/unit-assessment.mdx
 - specs/content/gict-300/reviews/unit-04/G2/20261019T140725503Z-gates.json
 - specs/content/gict-300/reviews/unit-04/G2/logs-20261019T140725503Z/check-bloom-bands.txt
 - specs/content/gict-300/reviews/unit-04/G2/logs-20261019T140725503Z/check-concept-graph.txt
 - specs/content/gict-300/reviews/unit-04/G2/logs-20261019T140725503Z/check-depth-gate.txt
 - specs/content/gict-300/reviews/unit-04/G2/logs-20261019T140725503Z/check-docs-sync.txt
 - specs/content/gict-300/reviews/unit-04/G2/logs-20261019T140725503Z/check-figures.txt
 - specs/content/gict-300/reviews/unit-04/G2/logs-20261019T140725503Z/check-no-answer-keys.txt
 - specs/content/gict-300/reviews/unit-04/G2/logs-20261019T140725503Z/check-no-em-dash.txt
 - specs/content/gict-300/reviews/unit-04/G2/logs-20261019T140725503Z/validate-content.txt
 - specs/content/gict-300/reviews/unit-04/G3/repair-run002.md
 - specs/content/gict-300/sources/unit-04.md
 - specs/content/gict-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gict-300-u04-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gict-300-u04-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gict-300/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICT-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gict-300/`, and `static/img/figures/gict-300/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gict-300/reviews/unit-04/G3/agent-g3-gict300-u4-run002.json` (disposition: revise). Resolve each one:
- [blocking] B1 (assessment): "twelve characters" is stated for the 11-character password Pk!9#mQ2vLx in four places: unit-assessment.mdx line 147 (MCQ-3 rationale), unit-assessment.mdx lines 175-177 (RRQ-6 model answer), the rendered table text of static/img/figures/gict-300/unit-04/fig-U4-6.svg and fig-U4-6.dark.svg, and specs/content/gict-300/figures/unit-04.md line 17 (prompt). Count: P-k-!-9-#-m-Q-2-v-L-x = 11. The miscount also hides that the exemplar falls one character short of the unit's own cited guidance (Bourgeois et al. 2019, "at least 12 random characters", topic-03.mdx lines 38-41), so a ...
- [blocking] B2 (sources): specs/content/gict-300/sources/unit-04.md lines 3-6 preamble still claims "the registry-verified keys and the guide-required keys are also cited in prose". The registry-verified half is now true (bourgeois2019, nistCloud2011 as Mell and Grance 2011, erendorYildirim2022 all appear in body prose), but the guide-required keys do not: laudonLaudon appears only at topic-02.mdx lines 136-137 and stairReynolds only at topic-04.mdx lines 137-138, both inside Further reading and both self-described as "cited at bibliographic level". This is a residual of run-001 finding F4 (false pream...
- [advisory] A1 (concepts, residual of run-001 A7): after the bank redistribution two concept-graph mappings are stale. concepts/unit-04.md line 20 maps RRQ-03 to CON:GICT-300-4-4 (CIA triad), but RRQ-03 is the phishing-tells item and contains no CIA content; line 26 maps RRQ-08 to CON:GICT-300-4-10 (Authentication factors), but RRQ-08 is the cloud question (correctly listed under CON:GICT-300-4-12 line 28). The a7200d2 remap updated CON:4-12 and the 4.2/4.4 rows but left these two. check:concept-graph validates linkage structurally, not semantically, so it cannot catch this.
- [advisory] A2 (spec figure plan, residual of run-001 A8): specs/content/gict-300/content-spec.md lines 322-324 still describe fig-U4-7 as "where your file goes when you save it to the cloud (4.3)", while the delivered figure is the pupil-record four-questions diagram placed in 4.4 (spec topic list line 307; figures/unit-04.md line 18; topic-04.mdx line 33). U4-05 (cloud computing basics) is left without its planned visual; 4.3 still meets the two-figure density gate with fig-U4-5 and fig-U4-6. NOTE for the parent: a7200d2's commit message (and the run-002 handoff) claim this line was aligned with the ...
- [advisory] A3 (residual of run-001 A9): the course-wide reading list (content-spec.md "## Reading list") assigns stairReynolds to units 1, 2, 6, while Unit 4's own governance (mapped readings, sources/unit-04.md, coverage reinforcement) uses it for U4-06. One of the two assignments should change.
- [advisory] A4 (residual of run-001 A12): 11 bare-URL link texts remain in Further reading sections (render tool: topic-01 four, topic-02 two, topic-03 three, topic-04 two). Descriptive link text would serve screen-reader users better; not a WCAG failure at this severity.
- [advisory] A5 (residual of run-001 A15): the spec blueprint asks for "one integrative item producing a data-protection plan for a school"; the delivered integrative item (ERQ-5) is an evaluation essay on "Online safety is a set of habits, not a product you can buy", and the data-protection plan is delivered as the topic-4.4 ERQ-4. ERQ-4 does connect 4.4 to Topic 4.1 and the vendor scenario, so the mapping is defensible, but the integrative slot is not the plan the blueprint names.
- [advisory] A6 (tooling, residual of run-001 A11): the ADR-0027 citation-key regex in scripts/lib/review-evidence.mjs does not match camelCase keys, so sources/texts/nistCloud2011.md and sources/texts/erendorYildirim2022.md are not digest-bound in this review's input manifest even though the unit cites both. I verified both files at HEAD during this review: sha256 5e1b79f72539e0652cd1ed00fb8e70b442d67e5a3e30f8ed4f51eef100097de6 (nistCloud2011.md) and 5b0fc2174562a5bc3f63868dfde0e17aecc97b51bb783b39340fb01339095523 (erendorYildirim2022.md), both last committed at 702fb1d. A regex fix belongs to the revi...
- [advisory] A7 (sources governance): the erendorYildirim2022 Supports cell (sources/unit-04.md line 19) says "education measurably matters"; the retrieved abstract concludes cybersecurity education "should be given" - a recommendation, not a measured effect of education. The learner prose (topic-01.mdx lines 92-96) stays within the abstract (weak awareness despite heavy use), so this overstatement is confined to the governance table.
- [advisory] A8 (environment, out of scope for this unit): at HEAD e12079a five of the six contract gates exit 1 solely on the stale geng-300 tree: validate:content (13 front-matter errors, all docs/semester-1/geng-300/unit-01), check:depth-gate (4 failures, GENG-300 Unit 1), check:figures (1, GENG-300 Unit 1), check:no-em-dash (9 em dashes, all specs/content/geng-300/intake/evaluation.md, unchanged since a3077f7), check:no-answer-keys (2 matches, both geng-300 build pages). Zero GICT-300 findings in any gate. I re-ran all five over a scoped overlay (CONTENT_ROOT=/tmp/g3-run002-overlay: the repo bytes m...

## Notes from earlier jobs on this unit
- (gict-300-u04-translate-r1, translate, agy) Unit 4 Urdu mirror has complete 7-file structural, heading, and figure parity with English baseline ef87f8f4; translation_status remains draft pending fresh independent G5 review.
- (gict-300-u04-translate-r1, translate, agy) Declared key_terms in index.mdx are bound to terminology.csv; all 15 unbanked concept labels from concepts/unit-04.md are documented in reviews/unit-04/G4/translation-handoff.md for curriculum owner review.
- (gict-300-u04-translate, translate, agy) All 15 key_terms in Unit 4 index.mdx remain unbanked in terminology.csv (flagged in concepts/unit-04.md) and await curriculum owner banking.
- (gict-300-u04-translate, translate, agy) The G4 tracker row in specs/content/gict-300/tasks.md is set to in-progress (▣) and translation_status remains draft pending independent G5 review.


## Response snapshot

Repaired Unit 4 bilingual reading links, integrative assessment and source claim, verified prior fixes, and refreshed G2 evidence.

## Outcome

- Impact: repair_en for GICT-300 Unit 4 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 4 bilingual reading links, integrative assessment and source claim, verified prior fixes, and refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - A3 needs curriculum-owner reconciliation; A6 needs review-tooling repair. G3 remains unticked pending independent review.
  - A3 needs curriculum-owner reconciliation; A6 needs review-tooling repair. G3 remains unticked pending independent review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
