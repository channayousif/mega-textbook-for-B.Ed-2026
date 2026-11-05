---
id: crew-gsos-301-u05-repair_en-conflict1
title: crew merge GSOS-301 unit 5
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u05-repair_en
user: crew
command: crew merge
labels: ["crew", "opencode", "merge"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gsos-301/tasks.md
 - history/prompts/gsos-301/crew-gsos-301-u05-repair_en-conflict1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u05-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gsos-301-u05-repair_en conflicts with main (specs/content/gsos-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GSOS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-05/`.

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
- (gsos-301-u05-repair_en, repair_en, codex) Render inspection remains blocked by the brief; a permitted session must perform mobile/print checks before G3 can close.
- (gsos-301-u05-repair_en, repair_en, codex) Render inspection remains blocked by the brief; a permitted session must perform mobile/print checks before G3 can close.
- (gsos-301-u05-review_en, review_en, opencode) The blocking finding is the unverified visual accessibility (render review). A separate render inspection (build + serve + small-screen/print checks) must be run before this unit can be certified G3. The three no-external-source items (Lady Health Worker 1994 start, low-fee private schooling spread, Council of Islamic Ideology advisory role) and the unextracted OpenStax 15.1 wording are advisory only.
- (gsos-301-u05-author, author, claude) Three Pakistani facts are not tied to a source and are marked `no-external-source` for the G3 reviewer to check: the Lady Health Worker programme starting in 1994, the spread of low-fee private schools, and the Council of Islamic Ideology's advisory role.
- (gsos-301-u05-author, author, claude) The Urdu translation job needs to make `.ur.svg` versions of fig-U5-1 to fig-U5-4. All 14 Urdu concept labels are newly authored (none are in `terminology.csv`) and need G5 review.

## Response snapshot

Merged origin/main onto crew/gsos-301-u05-repair_en, resolved the single conflict in specs/content/gsos-301/tasks.md (kept main's Unit 3 G3 row then this branch's Unit 5 G3 row), regenerated static/content-status.json, and confirmed all 14 content gates pass.

## Outcome

- Impact: merge for GSOS-301 Unit 5 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main onto crew/gsos-301-u05-repair_en, resolved the single conflict in specs/content/gsos-301/tasks.md (kept main's Unit 3 G3 row then this branch's Unit 5 G3 row), regenerated static/content-status.json, and confirmed all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Render inspection remains blocked by the brief; a permitted session must perform mobile/print checks before G3 can close.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
