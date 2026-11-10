---
id: crew-efpg-401-u03-author-conflict1
title: crew merge origin/main into efpg-401-u03-author and pass content gates
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efpg-401
branch: crew/efpg-401-u03-author
user: crew
command: crew merge
labels: ["crew", "opencode", "merge"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efpg-401/tasks.md
  - history/prompts/efpg-401/crew-efpg-401-u03-author-conflict1.misc.prompt.md
tests:
  - npm run build:content-status
  - npm run check:content
---

## Prompt

# Crew job efpg-401-u03-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efpg-401-u03-author conflicts with main (specs/content/efpg-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFPG-401 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-03/`.

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
- (efpg-401-u03-author, author, agy) Print monographs by Cook (1991), Mohammad (1998), and Celce-Murcia (1991) are registered under unretrievable sources with owner ruling D-2026-0001 per depth-gate standards.
- (efpg-401-u03-author, author, agy) Twelve schematic SVGs with derived dark twins are placed and text-geometry verified; Urdu mirror (G4) and independent review (G3) remain open for downstream crew jobs.

## Response snapshot

Fetched origin/main (724812439, PR #533) and merged it into `crew/efpg-401-u03-author`. The merge was textually clean: the branch (49 files) and main (48 files) touched disjoint paths, so no conflict markers appeared. Verified the merge result preserves every main-only file byte-for-byte and every branch-only file byte-for-byte. `specs/content/efpg-401/tasks.md` keeps main's Unit 1 rows and reading estimates plus this branch's Unit 3 row, stage rows and reading estimates. The four shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) were unchanged on both sides since the merge base, so no append or ID renumbering was needed; the only D- ID this branch references is the pre-existing corpus-wide `D-2026-0001`. Ran `npm run build:content-status` then `npm run check:content`: all 14 content gates pass with zero findings.

## Outcome

- ✅ Impact: `crew/efpg-401-u03-author` now contains origin/main and still passes every content gate, so the branch is ready for its next stage.
- 🧪 Tests: `npm run build:content-status` wrote static/content-status.json; `npm run check:content` 14/14 gates PASS (validate:content, check:pipeline-gate, check:depth-gate, check:figures, check:svg-style, check:no-em-dash, check:no-answer-keys, check:concept-graph, check:bloom-bands, check:source-floor, check:licence, licence:map:check, check:content-status, check:docs-sync).
- 📁 Files: merge commit `687f77972` plus this PHR; no content files required edits.
- 🔁 Next prompts: downstream EFPG-401 Unit 3 jobs (Urdu G4 mirror, independent G3/G5 review) can branch from this merged tip.
- 🧠 Reflection: the brief predicted a conflict in tasks.md, but main had not changed that file since the merge base, so the three-way merge was a fast-forward-like clean combine. The disjoint-paths property is worth checking in future merge jobs before assuming manual resolution is needed.

## Handoff (for CEO and agents)

- Shipped / changed: merge of origin/main into `crew/efpg-401-u03-author` (commit `687f77972`), verified clean and content-gate green; PHR recorded.
- Decisions the team must respect: no shared-registry entry was added, removed or renumbered; main's entries are intact and this branch's Unit 3 rows are intact.
- Pending / next owner: crew lead (merge/PR when CI is green); downstream jobs own Urdu G4 and independent G3/G5 for Unit 3.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none. The anticipated tasks.md conflict did not materialise because main had not modified the file since the merge base.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (14/14).
- Prompt variant (if applicable): crew brief v1, merge/conflict job.
- Next experiment (smallest change to try): have the merge job assert the disjoint-paths property (or report the intersection) before merging, so a real conflict cannot be silently auto-resolved.
