---
id: 20261038
title: Resolve GPKS Unit Six Conflicts
stage: general
date: 2026-10-28
surface: agent
model: GPT-6
feature: gpks-402
branch: crew/gpks-402-u06-author
user: owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "gpks-402-u06-author-conflict1"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - glossary.json
  - specs/content/gpks-402/tasks.md
  - specs/content/gpks-402/coverage/unit-06.md
  - specs/content/gpks-402/sources/unit-06.md
  - specs/content/gpks-402/sources/texts/pak-constitution-1973-unit-06.md
  - specs/content/gpks-402/sources/texts/worldbank-pdu-2025-unit-06.md
  - specs/content/gpks-402/reviews/unit-06/G2/
tests:
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs GPKS-402 6
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated task brief (verbatim):

# Crew job gpks-402-u06-author-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gpks-402-u06-author conflicts with main (glossary.json, specs/content/gpks-402/sources/texts/pak-constitution-1973.md, specs/content/gpks-402/sources/texts/worldbank-pdu-2025.md, specs/content/gpks-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (gpks-402-u06-author, author, agy) Total reading time across the 5 unit files is 96 minutes (index: 4, topic-01: 22, topic-02: 24, topic-03: 21, unit-assessment: 25), inside the 90-125 min depth budget.
- (gpks-402-u06-author, author, agy) Downstream Urdu mirror job will need .ur.svg localized twins of fig-U6-1 through fig-U6-6 and G5 review of authored Urdu concept labels in concepts/unit-06.md.


## Response snapshot

Merged origin/main, preserved both glossary contributions and all unit tracker progress, isolated Unit 6 source excerpts, and regenerated deterministic G2 evidence.

## Outcome

- ✅ Impact: Unit 6 merge conflicts resolved without changing main source evidence or G3/G5 status.
- 🧪 Tests: All eight deterministic G2 checks pass. All 13 content gates pass on the merged branch and origin/main after regenerating ignored content-status reports.
- 📁 Files: Glossary append, Unit 6 source keys and excerpts, tracker, evidence and this PHR.
- 🔁 Next prompts: Independent G3 and downstream Urdu work remain separate jobs.
- 🧠 Reflection: Shared source bytes bind existing evidence; unit-specific excerpts avoid invalidating unrelated units.

## Handoff (for CEO and agents)

- Shipped / changed: Merge and Unit 6 source isolation with fresh G2 evidence.
- Decisions the team must respect: Main glossary order and source bytes preserved; no registry collision or renumbering needed.
- Pending / next owner: Independent reviewer owns G3; Urdu job owns translation and G5 handoff.
- Paperclip issues affected: gpks-402-u06-author-conflict1; no linked issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Python alias was unavailable; corrected with python3 and amended merge before continuing. Shared source additions invalidated Unit 1 and Unit 5 manifests; resolved with Unit 6 source keys.
- Graders run and results (PASS/FAIL): G2 draft checks PASS; npm run check:content PASS (13/13) on merged branch and origin/main; git diff --check PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Use distinct bounded excerpt keys when source selections differ between units.
