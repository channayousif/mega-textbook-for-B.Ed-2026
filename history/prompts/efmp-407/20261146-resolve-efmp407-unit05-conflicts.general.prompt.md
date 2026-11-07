---
id: 20261146
title: Resolve EFMP-407 Unit 5 merge conflicts
stage: general
date: 2026-11-07
surface: agent
model: longcat-2.0
feature: efmp-407
branch: crew/efmp-407-u05-author
user: M Yousif Channa
command: crew job efmp-407-u05-author-conflict1
labels: [opencode, crew, efmp-407, conflict]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
  - specs/content/efmp-407/tasks.md
  - history/prompts/efmp-407/20261145-author-efmp407-unit05-english.general.prompt.md
  - history/prompts/efmp-407/crew-efmp-407-u05-author.green.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u05-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u05-author conflicts with main (specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md, specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-05/`.

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
- (efmp-407-u05-author, author, agy) Banner illustration fig-U5-7 is planned in specs/content/efmp-407/figures/unit-05.banner.md as prompt-only; requires an illustrate job.
- (efmp-407-u05-author, author, agy) Stages G3 (English review), G4 (Urdu translation), and G5 (Urdu review) remain open for downstream reviewer and translation sessions.

## Response snapshot

Merged origin/main into crew/efmp-407-u05-author and resolved both conflicts. The shared UNESCO 2017 source note now carries main's citation and access record plus its Unit 2 support/limits, followed by the branch's Unit 5 passages. The task tracker keeps main's Unit 2 rows and sections and adds the branch's Unit 5 rows. Renumbered the branch's Unit 5 PHR from 20261144 to 20261145 to clear a collision with main's Unit 2 PHR and updated its reference. All 14 content gates pass.

## Outcome

- Impact: crew/efmp-407-u05-author now merges cleanly with origin/main; Unit 5 English remains intact alongside Unit 2.
- Tests: npm run check:content 14/14 PASS after regenerating static/content-status.json.
- Files: two conflict resolutions, one PHR renumber, one reference update.
- Next prompts: G3 English review, G4 Urdu translation, G5 Urdu review, banner illustration.
- Reflection: the shared source note and tracker are the collision points for parallel unit jobs on one course.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit 50b12e167 on crew/efmp-407-u05-author; conflict-resolved source note and tracker; PHR 20261144 -> 20261145.
- Decisions the team must respect: main's entries were preserved verbatim; the branch's Unit 5 content was added alongside, not instead of, main's Unit 2 content.
- Pending / next owner: downstream G3/G4/G5 jobs and the banner illustrate job for fig-U5-7.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: parallel unit jobs on one course collide on the shared tracker and shared source notes; PHR IDs allocated independently can collide.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14).
- Prompt variant (if applicable): crew conflict brief v1.
- Next experiment (smallest change to try): allocate PHR IDs from a shared sequence at job dispatch time.
