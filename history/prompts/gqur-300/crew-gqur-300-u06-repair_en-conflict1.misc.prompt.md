---
id: crew-gqur-300-u06-repair_en-conflict1
title: crew repair_en GQUR-300 unit 6 (conflict1)
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gqur-300
branch: crew/gqur-300-u06-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en", "merge"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gqur-300/crew-gqur-300-u06-repair_en-conflict1.misc.prompt.md
  - specs/content/gqur-300/tasks.md
tests:
  - npm run check:content (all 14 content gates passed)
---

## Prompt

# Crew job gqur-300-u06-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-300-u06-repair_en conflicts with main (specs/content/gqur-300/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-300 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-06/`.

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
- (gqur-300-u06-repair_en, repair_en, agy) G2 gate manifest was refreshed and committed under `specs/content/gqur-300/reviews/unit-06/G2/20261105T125412430Z-gates.json`; G3 remains unticked (`▢`) awaiting fresh independent review.
- (gqur-300-u06-repair_en, repair_en, agy) Point-of-use Steen (2001) disclosures (`cited at bibliographic level under D-2026-0001; claims uncorroborated by local full text`) and balanced MCQ options (3 a, 2 b, 3 c, 2 d) are mirrored identically across EN and Urdu.
- (gqur-300-u06-review_en-conflict1, fix, agy) Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.
- (gqur-300-u06-review_en, review_en, codex) Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.
- (gqur-300-u06-review_en, review_en, codex) Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.

## Feedback from the previous attempt
npm run check:content has 3 finding(s) that main does not have:
✗ Pipeline gate failed with 2 finding(s):
- GQUR-300 Unit 2 (docs/semester-1/gqur-300/unit-02): G2 en-draft: ENOENT: no such file or directory, open '/home/a2ahs/crew-wt/gqur-300-u06-repair_en-conflict1/specs/content/gqur-300/reviews/unit-02/G2/20261105T123854707Z-gates.json'
- GQUR-300 Unit 4 (docs/semester-1/gqur-300/unit-04): G2 en-draft: ENOENT: no such file or directory, open '/home/a2ahs/crew-wt/gqur-300-u06-repair_en-conflict1/specs/content/gqur-300/reviews/unit-04/G2/20261105T122519489Z-gates.json'

## Response snapshot

Merged origin/main (08a727a13) into crew/gqur-300-u06-repair_en. The only conflict was specs/content/gqur-300/tasks.md: main's tracker table plus this branch's Unit 6 advisory G3 row were both kept (main's order first, then the branch's row), with no duplicate rows. Neither side had touched the shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv), so no append-only repair was needed. The branch's unit-06 content, G2 evidence and PHR were unchanged by the merge. Regenerated the gitignored static/content-status.json with `npm run build:content-status` so the local tree matches the merged trackers; all 14 content gates then passed.

## Outcome

- Impact: merge conflict1 resolution for GQUR-300 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed (14/14) after regenerating content-status.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gqur-300-u06-repair_en, kept both sides of the tasks.md tracker conflict, and regenerated static/content-status.json so all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything. The branch's Unit 6 G3 row remains unticked.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - static/content-status.json is gitignored and was regenerated locally; CI regenerates it before the gate, so no commit is needed.
  - The two ENOENT findings from the previous attempt are resolved by main's added unit-02 and unit-04 G2 gate manifests now present in the merge.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
