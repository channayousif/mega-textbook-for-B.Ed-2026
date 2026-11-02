---
id: crew-efmp-406-u06-author-conflict5
title: crew fix EFMP-406 unit 6
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u06-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-406/crew-efmp-406-u06-author-conflict5.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-406-u06-author-conflict5

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-406-u06-author conflicts with main (specs/content/efmp-406/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-406 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-06/`.

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
- (efmp-406-u06-author-conflict4, fix, codex) Independent G3/G5 reviews, Urdu translation and authorised browser geometry checks remain open.
- (efmp-406-u06-author-conflict4, fix, codex) Independent G3/G5 reviews, Urdu translation and authorised browser geometry checks remain open.
- (efmp-406-u06-author-conflict2, fix, opencode) Unit 6 G3 review, G4 Urdu translation, G5 review, and the browser geometry check (Playwright-prohibited) remain open; next authorised browser session owns the figure geometry pass.
- (efmp-406-u06-author, author, codex) Browser geometry measurement remains pending because the brief prohibits Playwright; non-browser renders were inspected.
- (efmp-406-u06-author, author, codex) Independent G3/G5 review and Urdu translation remain open.

## Response snapshot

Fetched origin and found origin/main already an ancestor of the branch, so `git merge origin/main` was a no-op and no merge commit was needed. Confirmed the four shared registries are byte-identical to main, confirmed main's tracker rows survive in order ahead of the branch's Unit 6 rows, and passed all 13 content gates.

## Outcome

- ✅ Impact: fix for EFMP-406 Unit 6 by opencode (attempt 1).
- 🧪 Tests: npm run check:content passed 13/13 gates on the branch.
- 📁 Files: 1 file(s), listed above.
- 🔁 Next prompts: the crew planner derives the unit's next stage from main after merge.
- 🧠 Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the branch already contains origin/main; no merge commit was required; all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
