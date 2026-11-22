---
id: crew-gcce-400-u03-author-conflict1
title: merge origin main into gcce-400 unit 3 author branch
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u03-author
user: crew
command: crew merge-conflict
labels: ["crew", "claude"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gcce-400/tasks.md
 - history/prompts/gcce-400/crew-gcce-400-u03-author-conflict1.misc.prompt.md
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u03-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gcce-400-u03-author conflicts with main (specs/content/gcce-400/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GCCE-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-03/`.

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
- (gcce-400-u03-author, author, agy) G3 en-review remains open; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
- (gcce-400-u03-author, author, agy) Urdu translation (G4/G5) is a separate downstream job; the unit is published under the required untranslated notice.

## Response snapshot

Merged origin/main into crew/gcce-400-u03-author, resolved the single conflict in specs/content/gcce-400/tasks.md by keeping both sides (Unit 2 rows from main, Unit 3 rows from this branch, plus both reading-estimate blocks), rebuilt static/content-status.json and ran the 14 content gates, which all pass.

## Outcome

- Impact: merge conflict resolution for GCCE-400 Unit 3 author branch (attempt 1).
- Tests: npm run check:content PASS (all 14 content gates), after npm run build:content-status.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merged origin/main into crew/gcce-400-u03-author and resolved the one conflict in specs/content/gcce-400/tasks.md, keeping main's Unit 2 entries and this branch's Unit 3 entries; all 14 content gates pass on the merged tree.
- Decisions the team must respect: main's five Unit 2 glossary terms were kept and ordered after main's existing entries; the pre-existing duplicate glossary term "Classroom Management" was left as-is because main already carries it; no English unit file, figure, source, coverage or concept was re-authored, so no fresh G2 gate evidence was generated.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - G3 en-review remains open; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
  - Urdu translation (G4/G5) is a separate downstream job; the unit is published under the required untranslated notice.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief conflict1
- Next experiment (smallest change to try): none
