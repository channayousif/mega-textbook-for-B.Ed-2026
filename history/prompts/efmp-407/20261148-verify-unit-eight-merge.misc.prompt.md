---
id: 20261148
title: Verify Unit Eight Merge
stage: misc
date: 2026-11-07
surface: agent
model: gpt-6
feature: efmp-407
branch: crew/efmp-407-u08-author
user: crew
command: Execute .crew/brief.md
labels: ["crew", "codex", "efmp-407-u08-author-conflict2"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/20261148-verify-unit-eight-merge.misc.prompt.md
tests:
 - npm run check:content (PASS: all 14 gates)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Crew brief read and executed verbatim:

# Crew job efmp-407-u08-author-conflict2

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u08-author conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

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
- (efmp-407-u08-author-conflict1, fix, opencode) `specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md` is bound to both Unit 7 and Unit 8, so any future edit to it re-stales both G2 manifests and needs `prepare-gate-evidence.mjs` for each.
- (efmp-407-u08-author-conflict1, fix, opencode) Unit 8 banner fig-U8-5 is still prompt-only, its ten Urdu concept labels await G5, and browser figure geometry is unmeasured locally (CI `figure-geometry` covers it).
- (efmp-407-u08-author-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally only; it is not part of the commit.
- (efmp-407-u08-author, author, agy) Banner figure fig-U8-5 is prompt-only in specs/content/efmp-407/figures/unit-08.banner.md awaiting illustration pass.
- (efmp-407-u08-author, author, agy) All ten Urdu concept labels in specs/content/efmp-407/concepts/unit-08.md are authored and require G5 review.


## Response snapshot

Fetched origin and ran git merge origin/main: already up to date. Earlier conflict-resolution commits are intact. Shared registries match main exactly. All 14 content gates passed.

## Outcome

- ✅ Impact: Verified the existing merge rather than introducing an unnecessary merge or content edit.
- 🧪 Tests: PASS: all 14 content gates; no baseline comparison required because there are no failures.
- 📁 Files: This prompt history record only.
- 🔁 Next prompts: Continue independent review, translation and illustration jobs already recorded in the tracker.
- 🧠 Reflection: A stale conflict brief can refer to conflicts already resolved by an earlier worker. Verify Git state before editing.

## Handoff (for CEO and agents)

- Shipped / changed: Fetched origin, verified main is already merged, and preserved previous work.
- Decisions the team must respect: No registry edits, gate certification, publication changes, push or PR.
- Pending / next owner: Crew owners retain the existing banner, Urdu review and CI geometry follow-ups.
- Paperclip issues affected: efmp-407-u08-author-conflict2; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: The requested conflict no longer exists in the fetched repository state.
- Graders run and results (PASS/FAIL): PASS: check:content, all 14 gates.
- Prompt variant (if applicable): crew brief conflict2
- Next experiment (smallest change to try): None required.
