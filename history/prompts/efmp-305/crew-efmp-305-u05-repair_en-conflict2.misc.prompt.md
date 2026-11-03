---
id: crew-efmp-305-u05-repair_en-conflict2
title: crew fix EFMP-305 unit 5 (conflict2)
stage: misc
date: 2026-11-04
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/efmp-301/unit-04/topic-01.mdx
  - docs/semester-1/efmp-301/unit-04/unit-assessment.mdx
  - history/prompts/efmp-301/crew-efmp-301-u04-repair_en.misc.prompt.md
  - history/prompts/general/2446-efmp-301-u04-repair-en.general.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/unit-assessment.mdx
  - specs/content/efmp-301/coverage/unit-04.md
  - specs/content/efmp-301/reviews/unit-04/G2/20261103T174846654Z-gates.json
  - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-bloom-bands.txt
  - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-concept-graph.txt
  - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-depth-gate.txt
  - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-docs-sync.txt
  - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-figures.txt
  - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-no-answer-keys.txt
  - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/check-no-em-dash.txt
  - specs/content/efmp-301/reviews/unit-04/G2/logs-20261103T174846654Z/validate-content.txt
  - specs/content/efmp-301/sources/unit-04.md
  - specs/content/efmp-301/tasks.md
  - history/prompts/efmp-305/crew-efmp-305-u05-repair_en-conflict2.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-305-u05-repair_en-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-305-u05-repair_en conflicts with main (specs/content/efmp-305/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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

## Notes from earlier jobs on this unit
- (efmp-305-u05-repair_en-conflict1, fix, opencode) The branch's Unit 5 G2 row (`20261103T180403253Z-gates.json`) is the authoritative last matching row; main's Unit 3 row is preserved unchanged.
- (efmp-305-u05-repair_en-conflict1, fix, opencode) F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.
- (efmp-305-u05-repair_en-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally; CI generates it before the gate.
- (efmp-305-u05-repair_en, repair_en, codex) Refresh static/content-status.json after scope approval, then rerun check:content.
- (efmp-305-u05-repair_en, repair_en, codex) Owner/host must supply F1 provenance/rendering and arrange fresh independent G3, including MCQ re-solve; G3 remains unticked.

## Response snapshot

Fetched origin/main and merged it into `crew/efmp-305-u05-repair_en`. The merge was clean: conflict1 had already resolved the `specs/content/efmp-305/tasks.md` conflict, and main's only new work since that merge was the EFMP-301 Unit 4 repair, which does not touch this branch's files. The four shared registries were unchanged on both sides since the merge base, so no append-only union or ID renumbering was needed. Regenerated the gitignored `static/content-status.json` and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-305 Unit 5 by opencode (attempt 2, conflict sync).
- Tests: `npm run check:content` passed (14/14 content gates).
- Files: 19 file(s), listed above (18 brought in by the main merge, plus this PHR).
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merged origin/main (`b7f563c7c`) into `crew/efmp-305-u05-repair_en` as `merge: sync crew/efmp-305-u05-repair_en with origin/main`; no conflicts remained, no shared-registry union or ID renumbering was required; regenerated `static/content-status.json`; all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - The branch's Unit 5 G2 row (`20261103T180403253Z-gates.json`) is the authoritative last matching row; main's Unit 3 row is preserved unchanged.
  - F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.
  - `static/content-status.json` is gitignored and was regenerated locally; CI generates it before the gate.
  - The brief's stated `tasks.md` conflict was already resolved by conflict1's merge `cda326287`; this run only synced main's later EFMP-301 Unit 4 repair.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1 (conflict2)
- Next experiment (smallest change to try): none
