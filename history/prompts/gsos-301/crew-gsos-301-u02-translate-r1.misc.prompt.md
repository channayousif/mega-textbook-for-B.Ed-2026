---
id: crew-gsos-301-u02-translate-r1
title: crew translate GSOS-301 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u02-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gsos-301/0007-repair-unit-two-urdu-mirror.misc.prompt.md
 - history/prompts/gsos-301/0008-refresh-unit-two-gate-evidence.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-teacher-notes.mdx
 - specs/content/gsos-301/figures/unit-02.translation-handoff.md
 - specs/content/gsos-301/reviews/unit-02/G2/20261019T064629801Z-gates.json
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261019T064629801Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261019T064629801Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261019T064629801Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261019T064629801Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261019T064629801Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261019T064629801Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261019T064629801Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261019T064629801Z/validate-content.txt
 - specs/content/gsos-301/reviews/unit-02/G4/content-r1.log
 - specs/content/gsos-301/reviews/unit-02/G4/main-content-r1.log
 - specs/content/gsos-301/reviews/unit-02/G4/parity-r1.log
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u02-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u02-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

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
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gsos-301-u02-translate, translate, agy) translation_status remains draft pending independent G5 review; G4 tracker row recorded with auto:gates.
- (gsos-301-u02-translate, translate, agy) If English source citations or Mead stage age boundaries are later adjusted per G3 review notes, fig-U2-4.ur.svg and topic-02.mdx should be aligned accordingly.
- (gsos-301-u02-review_en, review_en, agy) Reconcile topic-01 and topic-02 citations (Givens & White, Henson, Lindsey) against approved sources (Conerly et al. 2021, Lindsey & Beach 2001).
- (gsos-301-u02-review_en, review_en, agy) Reconcile Mead socialization stages and ages across topic-02, fig-U2-4, and assessment items against OpenStax 5.1.
- (gsos-301-u02-review_en, review_en, agy) Recalculate Bloom cognitive demand on MCQ-07, MCQ-08, RRQ-06, and refine ERQ-02/03/04 rubrics and coverage mappings.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GSOS-301 Unit 2 (docs/semester-2/gsos-301/unit-02): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Retained the complete GSOS-301 Unit 2 Urdu mirror, refreshed stale G2 evidence, updated its tracker reference, and committed validation logs and the PHR.

## Outcome

- Impact: translate for GSOS-301 Unit 2 by codex (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Retained the complete GSOS-301 Unit 2 Urdu mirror, refreshed stale G2 evidence, updated its tracker reference, and committed validation logs and the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft; English review findings and rendered Urdu inspection remain pending before independent G5 review.
  - Translation remains draft; English review findings and rendered Urdu inspection remain pending before independent G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
