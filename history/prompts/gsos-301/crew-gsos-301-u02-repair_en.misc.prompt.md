---
id: crew-gsos-301-u02-repair_en
title: crew repair_en GSOS-301 unit 2
stage: misc
date: 2026-11-05
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u02-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-02/topic-01.mdx
 - docs/semester-2/gsos-301/unit-02/topic-02.mdx
 - docs/semester-2/gsos-301/unit-02/unit-assessment.mdx
 - docs/semester-2/gsos-301/unit-02/unit-teacher-notes.mdx
 - history/prompts/general/20261129-gsos-301-unit-02-g3-repairs.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-teacher-notes.mdx
 - specs/content/gsos-301/concepts/unit-02.md
 - specs/content/gsos-301/coverage/unit-02.md
 - specs/content/gsos-301/figures/unit-02.md
 - specs/content/gsos-301/figures/unit-02.translation-handoff.md
 - specs/content/gsos-301/reviews/unit-02/G2/20261105T153101802Z-gates.json
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261105T153101802Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261105T153101802Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261105T153101802Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261105T153101802Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261105T153101802Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261105T153101802Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261105T153101802Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261105T153101802Z/validate-content.txt
 - specs/content/gsos-301/reviews/unit-02/repair-20261105.md
 - specs/content/gsos-301/sources/unit-02.md
 - specs/content/gsos-301/sources/unit-02/retrieval.json
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-02/fig-U2-4.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-4.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u02-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u02-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gsos-301/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-02/`.

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
From `specs/content/gsos-301/reviews/unit-02/G3/20261102T212207Z-g3-desk-c859e67a.json` (disposition: revise). Resolve each one:
- [blocking] F1: obsolete/misattributed prose citations; see summary F1.
- [blocking] F2: adult socialization and Mead stages conflated; figure/text age mismatch; see summary F2.
- [blocking] F3: recognition/recall labelled Apply; see summary F3.
- [blocking] F4: insufficient evidence for stage questions and weak evaluation rubrics; see summary F4.
- [blocking] F5: coverage and concept mappings point to unrelated assessment items; see summary F5.
- [advisory] F8: ethnically/ethnocentrically wording and optional personal disclosure; see summary F8.
- [uncertain] F6: actual narrow/desktop/A4 render inspection unavailable; see summary F6.
- [uncertain] F7: missing author run provenance, exact model revision and complete frozen source evidence; see summary F7.

## Notes from earlier jobs on this unit
- (gsos-301-u02-translate-r1, translate, codex) Translation remains draft; English review findings and rendered Urdu inspection remain pending before independent G5 review.
- (gsos-301-u02-translate-r1, translate, codex) Translation remains draft; English review findings and rendered Urdu inspection remain pending before independent G5 review.
- (gsos-301-u02-translate, translate, agy) translation_status remains draft pending independent G5 review; G4 tracker row recorded with auto:gates.
- (gsos-301-u02-translate, translate, agy) If English source citations or Mead stage age boundaries are later adjusted per G3 review notes, fig-U2-4.ur.svg and topic-02.mdx should be aligned accordingly.
- (gsos-301-u02-review_en, review_en, agy) Reconcile topic-01 and topic-02 citations (Givens & White, Henson, Lindsey) against approved sources (Conerly et al. 2021, Lindsey & Beach 2001).


## Response snapshot

Repaired Unit 2 citations, socialization stages, assessments, rubrics, mappings and disclosure wording in English and Urdu, and refreshed deterministic draft evidence.

## Outcome

- Impact: repair_en for GSOS-301 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 30 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 2 citations, socialization stages, assessments, rubrics, mappings and disclosure wording in English and Urdu, and refreshed deterministic draft evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked; render inspection and original provenance/complete source evidence remain pending.
  - G3 remains unticked; render inspection and original provenance/complete source evidence remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
