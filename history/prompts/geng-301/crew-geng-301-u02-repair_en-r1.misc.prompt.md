---
id: crew-geng-301-u02-repair_en-r1
title: crew repair_en GENG-301 unit 2 r1
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: geng-301
branch: crew/geng-301-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-02/topic-02.mdx
 - docs/semester-2/geng-301/unit-02/topic-03.mdx
 - docs/semester-2/geng-301/unit-02/topic-04.mdx
 - docs/semester-2/geng-301/unit-02/unit-assessment.mdx
 - history/prompts/geng-301/crew-geng-301-u02-repair_en-r1.misc.prompt.md
 - specs/content/geng-301/figures/unit-02.md
 - specs/content/geng-301/reviews/unit-02/G2/20261103T184648108Z-gates.json
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/validate-content.txt
 - specs/content/geng-301/tasks.md
 - static/content-status.json
 - static/img/figures/geng-301/unit-02/fig-U2-4.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u02-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-301/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-02/`.

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
From `specs/content/geng-301/reviews/unit-02/G3/20261102T212207Z-g3-desk-90a85687.json` (disposition: revise). Resolve each one:
- [blocking] sources: topic-02 Further reading chapter 4, topic-03 Further reading chapter 5, and topic-04 Strunk/White fresh-eyes attribution remain specific uncorroborated print claims. D-2026-0001 declarations do not verify these passages. Supply evidence or qualify/remove these specific attributions via separate authoring.
- [blocking] pedagogy/assessment: topic-04 Summative task asks for peer review of one's own draft, which cannot demonstrate giving and receiving peer feedback (index outcome 5). Require another reader and a response to feedback, or assess that outcome explicitly elsewhere. Its rubric must also avoid penalizing an accurately checked error-free draft.
- [blocking] accessibility: topic-04 Figure fig-U2-4 alt and SVG description call proofreading penultimate, but the SVG timeline places peer review between proofreading and publishing. Align alt/description/manifest with the actual sequence.
- [advisory] assessment: RRQ 10 labels explicit classification Analyze and rewards an explanation not requested in the stem; MCQ 10 remains Apply for category recognition. ERQ 2 is Apply despite the style guide ERQ band. Reconcile actual demand and rubric expectations, rather than blindly retagging.
- [uncertain] F1 carried: wordmark CSS repair is present in all 16 SVGs, but actual geometry, narrow layout and A4 print evidence are unavailable under the brief prohibition. Owner must arrange permitted visual/geometry inspection.
- [uncertain] F5 partially resolved: declarations and Further reading repaired; approved openstax2021 vs writing2015 mapping is explicitly deferred to owner in sources/unit-02.md. Confirm substitute mapping without modifying frozen authority during review.
- [uncertain] Review provenance/procedure: exact author/repair run identities and finer model version were not supplied; commit identities identify versions only. Supplied keys were read before reviewer derivations, so the mandatory blind-solving order cannot be asserted. Assessment and provenance require owner handling at the second/final-cycle escalation.

## Notes from earlier jobs on this unit
- (geng-301-u02-review_en-r1-conflict1, fix, agy) Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.
- (geng-301-u02-review_en-r1, review_en, codex) Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.
- (geng-301-u02-review_en-r1, review_en, codex) Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.
- (geng-301-u02-repair_en, repair_en, claude) The wordmark fix was not re-measured with `scripts/measure-figure-text.mjs`, because that script runs Chromium and this job was barred from it; the next G3 reviewer should run it on `static/img/figures/geng-301/unit-02/`.
- (geng-301-u02-repair_en, repair_en, claude) There is no Urdu mirror of Unit 2 yet, so these edits are English only. The content-spec still lists `openstax2021` as the open-access reading; changing that spec is an owner decision that affects all GENG-301 units.

## Response snapshot

Applied all findings from G3 report 20261102T212207Z-g3-desk-90a85687.json: removed and qualified uncorroborated print claims in topic-02 and topic-03 Further reading and topic-04 fresh-eyes attribution; updated topic-04 Summative task to require peer exchange and reflection on received feedback with rubric crediting accurate checks on error-free drafts; aligned fig-U2-4 alt text, SVG description, dark variant and manifest with the actual penultimate peer-review sequence; updated RRQ 10 stem to explicitly request focus analysis; updated MCQ 10 to authentic application testing outlining; retagged and reformulated ERQ 2 and its rubric for Analyze; refreshed Unit 2 G2 gate evidence; updated content status; and appended an unticked advisory G3 tracker row.

## Outcome

- Impact: repair_en for GENG-301 Unit 2 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all findings from report 20261102T212207Z-g3-desk-90a85687 (uncorroborated source claims qualified/removed, topic-04 peer review task and non-penalizing rubric updated, fig-U2-4 sequence aligned across all visual and text surfaces, RRQ 10, MCQ 10 and ERQ 2 assessment alignment), refreshed G2 gate evidence, rebuilt content status, and appended an unticked G3 tracker row.
- Decisions the team must respect: G3 stays open and unticked; this run applies content repairs only and does not certify review.
- Pending / next owner: crew lead / owner for visual geometry inspection and authorized review run.
- Notes for the next job on this unit:
  - Figure wordmark geometry was not re-measured with Chromium because browser runs are barred from this job; owner or next reviewer should verify rendered geometry.
  - The content-spec still lists openstax2021 as open-access reading; aligning the frozen spec with writing2015 remains an owner decision.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
