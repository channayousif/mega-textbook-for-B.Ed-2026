---
id: crew-gpks-402-u04-author-conflict2
title: crew fix GPKS-402 unit 4
stage: misc
date: 2026-10-28
surface: agent
model: gemini-flash
feature: gpks-402
branch: crew/gpks-402-u04-author
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u04-author-conflict2

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gpks-402-u04-author conflicts with main (specs/content/gpks-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GPKS-402 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-04/`.

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
- (gpks-402-u04-author-conflict1, fix, claude) The merge left two newer G2 evidence files (Unit 4 `20261028T110357781Z`, Unit 1 `20261028T110408565Z`); the older evidence files are still in the repo but no tracker row points to them.
- (gpks-402-u04-author-conflict1, fix, claude) The pak-constitution-1973 excerpt now has both units' sections, and Articles 33 and 36 appear in each. The unmerged Unit 3 branch will need the same treatment, which will make the G2 evidence stale again.
- (gpks-402-u04-author, author, claude) `sources/texts/pak-constitution-1973.md`, `sources/texts/hussain-kokab-2012-18th.md`, `tasks.md` and `glossary.json` are also added or edited on the unmerged Unit 1 and Unit 3 branches; whoever merges these must combine both sides (each excerpt file keeps per-unit sections).
- (gpks-402-u04-author, author, claude) The Urdu mirror job needs `.ur.svg` versions of fig-U4-1..7 and Urdu labels for all 15 concepts; none of this unit's concepts is in terminology.csv yet.
- (gpks-402-u04-author, author, claude) Codex's sandbox cannot start Chromium, so the main session must run the figure text-fit check; Codex also garbled one SVG's colour block (fig-U4-3), so render every Codex SVG before trusting it.

## Feedback from the previous attempt
worker exited 1:
Permission deny rule (.claude/settings.json): Write(video-studio/episodes/**/approvals.jsonl) is not matched by file permission checks - only Edit(path) rules are. Use Edit(video-studio/episodes/**/approvals.jsonl) instead (Edit rules cover all file-editing tools).
You've hit your 5-hour limit · resets 7:10pm (Etc/GMT-5)

## Response snapshot

Merged origin/main into the Unit 4 branch, resolved the conflict in specs/content/gpks-402/tasks.md preserving both Unit 4 and Unit 5 rows, and verified all 13 content gates pass.

## Outcome

- Impact: fix for GPKS-402 Unit 4 merge conflict by agy.
- Tests: npm run check:content passed with 13/13 content gates passing.
- Files: specs/content/gpks-402/tasks.md
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gpks-402-u04-author, resolved conflict in specs/content/gpks-402/tasks.md keeping both Unit 4 and Unit 5 tracker status entries, and verified that all 13 check:content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead.
- Notes for the next job on this unit:
  - Both Unit 4 and Unit 5 are tracked as placed (EN) in tasks.md with G2 gate evidence recorded.
  - Unit 4 Urdu translation and independent review (G3/G5) remain open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
