---
id: crew-gpks-402-u06-repair_en-conflict1
title: crew repair_en conflict1 GPKS-402 unit 6
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gpks-402
branch: crew/gpks-402-u06-repair_en
user: crew
command: crew repair_en conflict1
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-02/topic-01.mdx
 - docs/semester-2/gpks-402/unit-02/topic-02.mdx
 - docs/semester-2/gpks-402/unit-02/unit-assessment.mdx
 - docs/semester-2/gpks-402/unit-02/unit-teacher-notes.mdx
 - history/prompts/gpks-402/crew-gpks-402-u02-repair_en.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u06-repair_en-conflict1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/unit-teacher-notes.mdx
 - specs/content/gpks-402/figures/unit-02.md
 - specs/content/gpks-402/reviews/unit-02/G2/20261105T111715992Z-gates.json
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261105T111715992Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261105T111715992Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261105T111715992Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261105T111715992Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261105T111715992Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261105T111715992Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261105T111715992Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261105T111715992Z/validate-content.txt
 - specs/content/gpks-402/sources/texts/khan-khan-2020-aligarh.md
 - specs/content/gpks-402/sources/unit-02.md
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-02/fig-U2-1.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-1.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-1.ur.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u06-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gpks-402-u06-repair_en conflicts with main (specs/content/gpks-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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

## Notes from earlier jobs on this unit
- (gpks-402-u06-repair_en, repair_en, opencode) F01 (author-run provenance) and F08 (rendered narrow/A4 evidence) remain host-supplied; G3 stays open under ADR-0019.
- (gpks-402-u06-repair_en, repair_en, opencode) No Urdu mirror exists for Unit 6, so the revise-topic mirror step was not applicable; translation remains a separate job.
- (gpks-402-u06-repair_en, repair_en, opencode) A fresh independent G3 review is needed before the unit can be ticked; the refreshed G2 evidence is at `reviews/unit-06/G2/20261105T112904958Z-gates.json`.
- (gpks-402-u06-translate-r1, translate, codex) English author must repair scoring and unresolved G3 findings before translation resumes; status remains draft.
- (gpks-402-u06-translate-r1, translate, codex) English author must repair scoring and unresolved G3 findings before translation resumes; status remains draft.

## Response snapshot

Merged origin/main into crew/gpks-402-u06-repair_en and resolved the single conflict in specs/content/gpks-402/tasks.md by keeping both sides' appended G3 rows: main's Unit 2 advisory-revise row first, then this branch's Unit 6 advisory-revise row. No shared-registry conflict (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv were identical on both sides), so no ID renumbering was needed. The merge imported main's 152 other files (mostly other courses' repair commits). Regenerated the gitignored static/content-status.json so check:content-status compares current; all 14 content gates pass.

## Outcome

- Impact: conflict1 merge for GPKS-402 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed (14/14 content gates) after regenerating the gitignored content-status report.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit 2e973e560 resolving the tasks.md conflict with main; both G3 advisory-revise rows retained (main's Unit 2 row first, then the branch's Unit 6 row); no shared-registry entries changed.
- Decisions the team must respect: tasks.md stage rows are append-only and the last row per unit/stage is authoritative; main's Unit 2 G3 row precedes the branch's Unit 6 G3 row.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F01 (author-run provenance) and F08 (rendered narrow/A4 evidence) remain host-supplied; G3 stays open under ADR-0019.
  - No Urdu mirror exists for Unit 6, so translation remains a separate job.
  - A fresh independent G3 review is needed before the unit can be ticked; the refreshed G2 evidence is at `reviews/unit-06/G2/20261105T112904958Z-gates.json`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
