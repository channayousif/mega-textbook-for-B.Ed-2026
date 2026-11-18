---
id: crew-gqur-301-u07-repair_en-r1-conflict1
title: crew fix GQUR-301 unit 7
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u07-repair_en-r1
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-07/unit-assessment.mdx
 - docs/semester-2/gqur-301/unit-07/unit-teacher-notes.mdx
 - history/prompts/gqur-301/crew-gqur-301-u07-repair_en-r1-conflict1.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u07-repair_en-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/unit-teacher-notes.mdx
 - specs/content/gqur-301/reviews/unit-07/G2/20261106T105023654Z-gates.json
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261106T105023654Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261106T105023654Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261106T105023654Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261106T105023654Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261106T105023654Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261106T105023654Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261106T105023654Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261106T105023654Z/validate-content.txt
 - specs/content/gqur-301/sources/texts/openstax-algebra.md
 - specs/content/gqur-301/sources/unit-07.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u07-repair_en-r1-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u07-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u07-repair_en-r1 conflicts with main (specs/content/gqur-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (gqur-301-u07-repair_en-r1, repair_en, claude) ERQ 4's constant-intake assumption is an author choice for owner adjudication; the report says the final cycle is exhausted, so a further review needs recorded owner authorization in `specs/decisions/log.md`.
- (gqur-301-u07-repair_en-r1, repair_en, claude) P1-P4 and immutable source captures are not author-repairable; `translations/unit-07/handoff.md` and `input-digests.json` still describe the pre-repair ERQ 4 bytes, so G5 must review the new Urdu text.
- (gqur-301-u07-review_en-r1, review_en, codex) Owner must resolve ERQ 4 projection assumptions, G1/provenance, rendered evidence and answer-blind verification; further cycles require recorded authorization.
- (gqur-301-u07-review_en-r1, review_en, codex) Owner must resolve ERQ 4 projection assumptions, G1/provenance, rendered evidence and answer-blind verification; further cycles require recorded authorization.
- (gqur-301-u07-translate-r1, translate, codex) Translation remains draft; independent G3/G5 review and authorized rendered Urdu inspection remain pending.


## Response snapshot

Merged origin/main into crew/gqur-301-u07-repair_en-r1, resolved the append-only tasks.md conflict keeping both sides' rows, regenerated content-status.json, and passed all content gates.

## Outcome

- Impact: fix for GQUR-301 Unit 7 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gqur-301-u07-repair_en-r1, resolved the append-only tasks.md conflict keeping both sides' rows, regenerated content-status.json, and passed all content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 7 P1-P4 (author-run provenance, open G1, rendered inspection, answer-blind verification) and immutable source captures remain open for the evaluator/review host; G3 stays open (ADR-0019).
  - ERQ 4's constant-intake assumption is an author choice for owner adjudication; the final review cycle is exhausted, so further review needs recorded owner authorization in specs/decisions/log.md.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
