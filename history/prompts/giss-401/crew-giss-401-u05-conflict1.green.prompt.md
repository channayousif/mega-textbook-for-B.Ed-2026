---
id: crew-giss-401-u05-conflict1
title: crew merge conflict resolution GISS-401 unit 5
stage: green
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u05-author
user: crew
command: crew merge conflict resolution
labels: ["crew", "opencode", "merge"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/course-overview.mdx
 - specs/content/giss-401/tasks.md
 - specs/content/giss-401/sources/texts/pak-constitution-1973.md
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/reviews/unit-01/G2/20261103T001231244Z-gates.json
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T001231244Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T001231244Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T001231244Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T001231244Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T001231244Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T001231244Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T001231244Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T001231244Z/validate-content.txt
 - specs/content/giss-401/reviews/unit-05/G2/20261103T001231439Z-gates.json
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T001231439Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T001231439Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T001231439Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T001231439Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T001231439Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T001231439Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T001231439Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T001231439Z/validate-content.txt
 - history/prompts/giss-401/crew-giss-401-u05-conflict1.green.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u05-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u05-author conflicts with main (docs/semester-3/giss-401/course-overview.mdx, specs/content/giss-401/sources/texts/pak-constitution-1973.md, specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-05/`.

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
- (giss-401-u05-author, author, agy) G2 deterministic gate evidence is recorded; G3 independent English review and G4/G5 Urdu translation remain separate downstream jobs.
- (giss-401-u05-author, author, agy) Unit 5 concept graph has ten authored Urdu labels flagged for G5 review because the course key terms are not yet banked in terminology.csv.

## Response snapshot

Merged origin/main into `crew/giss-401-u05-author` and resolved all four add/add conflicts by keeping both sides: the course overview names Units 1 and 5 as available; `tasks.md` carries both the Unit 1 and Unit 5 tracker rows; `pak-constitution-1973.md` carries both U1-02 (Article 31) and U5-06 (Articles 20, 22, 25, 36, 38); `quran-translation.md` carries both the U1 and U5 verse sets. The shared-file changes invalidated both units' G2 evidence manifests, so the stale evidence was refreshed with `scripts/prepare-gate-evidence.mjs --refresh-stale` and the tracker rows repointed.

## Outcome

- Impact: merge conflict resolution for GISS-401 between `crew/giss-401-u05-author` and `origin/main`.
- Tests: `npm run check:content` passes (13/13 gates).
- Files: 22 file(s) changed or added, listed above.
- Next prompts: G3 independent English review and G4/G5 Urdu translation for Unit 5 remain separate downstream jobs.
- Reflection: no shared-registry collision occurred; this branch added no glossary keys or D-/G- IDs to the append-only registries.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved all four merge conflicts preserving both branches' entries; refreshed stale G2 gate evidence for Unit 1 and Unit 5 after the merged bound files changed; regenerated `static/content-status.json`; all content gates pass.
- Decisions the team must respect: the merged source excerpts keep main's wording and add this branch's; no main entry was removed. G2 evidence for both units was re-recorded against the merged tree (`20261103T001231244Z` for Unit 1, `20261103T001231439Z` for Unit 5).
- Pending / next owner: G3 independent English review and G4/G5 Urdu translation for Unit 5 are separate downstream jobs; the crew lead owns merge and publication.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: merging shared bound inputs (`course-overview.mdx`, `pak-constitution-1973.md`) invalidates any already-recorded G2 evidence for every unit that cites them; `--refresh-stale` is the intended repair.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (13/13).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): none.
