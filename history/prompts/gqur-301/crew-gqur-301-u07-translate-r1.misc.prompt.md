---
id: crew-gqur-301-u07-translate-r1
title: crew translate GQUR-301 unit 7
stage: misc
date: 2026-10-24
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u07-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261025-gqur-301-u07-draft-urdu-mirror.general.prompt.md
 - history/prompts/general/20261026-validate-unit-seven-urdu-retry.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/unit-teacher-notes.mdx
 - specs/content/gqur-301/reviews/unit-07/G2/20261024T194740254Z-gates.json
 - specs/content/gqur-301/reviews/unit-07/G2/20261024T194934533Z-gates.json
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194740254Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194740254Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194740254Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194740254Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194740254Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194740254Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194740254Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194740254Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194934533Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194934533Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194934533Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194934533Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194934533Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194934533Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194934533Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261024T194934533Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - specs/content/gqur-301/translations/unit-07/check-content-final.log
 - specs/content/gqur-301/translations/unit-07/check-content-main.log
 - specs/content/gqur-301/translations/unit-07/check-content-retry-before.log
 - specs/content/gqur-301/translations/unit-07/check-content-retry-final.log
 - specs/content/gqur-301/translations/unit-07/check-content-reviewed-probe.log
 - specs/content/gqur-301/translations/unit-07/figure-variants.log
 - specs/content/gqur-301/translations/unit-07/handoff.md
 - specs/content/gqur-301/translations/unit-07/input-digests.json
 - specs/content/gqur-301/translations/unit-07/parity-and-mdx.log
 - static/content-status.json
 - static/img/figures/gqur-301/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-07/fig-U7-1.ur.svg
 - static/img/figures/gqur-301/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-07/fig-U7-2.ur.svg
 - static/img/figures/gqur-301/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-07/fig-U7-3.ur.svg
 - static/img/figures/gqur-301/unit-07/fig-U7-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-07/fig-U7-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u07-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u07-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-07/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gqur-301-u07-repair_en, repair_en, claude) ERQ 4 is now a collected real-school-data task; a fresh G3 reviewer should judge whether this meets the course-spec real-Pakistan-data requirement.
- (gqur-301-u07-repair_en, repair_en, claude) P1-P4 (author-run provenance, open G1 under D-2026-0070, rendered/A4 inspection, answer-blind verification) were not repairable by the author and remain open.
- (gqur-301-u07-repair_en, repair_en, claude) There is no Urdu mirror yet; G4 must translate the repaired ERQ 2/4, RRQ 9/10 and topic-02 Worked example 2.
- (gqur-301-u07-review_en, review_en, codex) Repair assessment findings F1-F3 and resolve G1, provenance and rendered-review gaps before fresh review.
- (gqur-301-u07-review_en, review_en, codex) Repair assessment findings F1-F3 and resolve G1, provenance and rendered-review gaps before fresh review.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GQUR-301 Unit 7 (docs/semester-2/gqur-301/unit-07): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Validated the complete Unit 7 Urdu mirror and repaired stale G2 evidence, tracker linkage and derived content status.

## Outcome

- Impact: translate for GQUR-301 Unit 7 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 44 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Validated the complete Unit 7 Urdu mirror and repaired stale G2 evidence, tracker linkage and derived content status.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft; independent G3/G5 review and authorized rendered Urdu inspection remain pending.
  - Translation remains draft; independent G3/G5 review and authorized rendered Urdu inspection remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
