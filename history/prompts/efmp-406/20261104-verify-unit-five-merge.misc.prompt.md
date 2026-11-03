---
id: 20261104
title: Verify Unit Five Merge
stage: misc
date: 2026-11-02
surface: agent
model: gpt-6
feature: efmp-406
branch: crew/efmp-406-u05-author
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "crew", "merge-verification"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-406/20261104-verify-unit-five-merge.misc.prompt.md
tests:
 - "git fetch origin && git merge origin/main: Already up to date"
 - "git merge-base --is-ancestor origin/main HEAD: PASS"
 - "npm run check:content: all 13 gates PASS"
 - "Shared registry diff against origin/main: empty"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Task brief read verbatim:

# Crew job efmp-406-u05-author-conflict3

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-406-u05-author conflicts with main (specs/content/efmp-406/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-406 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-05/`.

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
- (efmp-406-u05-author, author, claude) `specs/content/efmp-406/sources/texts/minott-2011-critical.md` is also added on branch `crew/efmp-406-u02-author`. This branch keeps Unit 2's text unchanged and adds a Unit 5 section at the end, so if the two conflict, take this branch's version.
- (efmp-406-u05-author, author, claude) Nobody has looked at the four Unit 5 figures on the page yet, and they have no Urdu `.ur.svg` versions. The concept-graph Urdu labels are mostly my own wording and need G5 review. Note that it uses جائزہ for "evaluation", while the terminology bank uses that word inside "Summative Assessment".
- (efmp-406-u05-author, author, claude) `course-overview.mdx` still says only Unit 1 is available. It was outside this job's scope.

## Response snapshot

Verified the existing merge includes current origin/main; all 13 content gates passed. Recorded this verification without changing content or gate status.

## Outcome

- ✅ Impact: Confirmed the prior conflict resolution remains valid against fetched main.
- 🧪 Tests: All 13 content gates passed; no baseline exceptions required.
- 📁 Files: This PHR only. Existing merges and Unit 5 gate evidence retained.
- 🔁 Next prompts: Independent English review and subsequent Urdu work remain separate crew jobs.
- 🧠 Reflection: Continue from earlier successful merge commits when main is already an ancestor.

## Handoff (for CEO and agents)

- Shipped / changed: Verified origin/main integration, unchanged shared registries, and passing content gates.
- Decisions the team must respect: Preserve existing tracker rows and evidence. G3/G5 remain open; no certification or publication action.
- Pending / next owner: Crew lead owns subsequent independent review and Urdu jobs. Prior figure inspection and Urdu figure needs remain.
- Paperclip issues affected: EFMP-406 Unit 5 crew job efmp-406-u05-author-conflict3; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: None. Requested merge was already present in earlier commits.
- Graders run and results (PASS/FAIL): PASS: all 13 content gates; PASS: main ancestry; PASS: empty shared registry diff.
- Prompt variant (if applicable): crew brief conflict3
- Next experiment (smallest change to try): None required.
