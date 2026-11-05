---
id: crew-geng-301-u02-repair_en-r1-conflict1
title: crew merge main GENG-301 unit 2
stage: misc
date: 2026-11-05
surface: agent
model: longcat/LongCat-2.0
feature: geng-301
branch: crew/geng-301-u02-repair_en-r1
user: crew
command: crew repair_en (merge main and resolve conflicts)
labels: ["crew", "opencode", "repair_en", "merge"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - Merge commit: Merge remote-tracking branch 'origin/main' into crew/geng-301-u02-repair_en-r1 (52787d830)
 - history/prompts/geng-301/crew-geng-301-u02-repair_en-r1-conflict1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u02-repair_en-r1-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-301-u02-repair_en-r1 conflicts with main (specs/content/geng-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-02/`.

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
- (geng-301-u02-repair_en-r1, repair_en, agy) Wordmark text geometry in static/img/figures/geng-301/unit-02/ was not inspected with Chromium because browser runs were barred; owner or subsequent reviewer should verify rendered geometry.
- (geng-301-u02-repair_en-r1, repair_en, agy) The content-spec continues to map openstax2021 while unit prose/sources bind writing2015; reconciling the approved spec remains an owner decision.
- (geng-301-u02-review_en-r1-conflict1, fix, agy) Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.
- (geng-301-u02-review_en-r1, review_en, codex) Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.
- (geng-301-u02-review_en-r1, review_en, codex) Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.

## Response snapshot

Fetched origin/main (5663b5d45) and merged it into crew/geng-301-u02-repair_en-r1. The merge was clean: no conflict markers, no unmerged paths, and no file under the GENG-301 Unit 2 scope needed manual reconciliation. Verified the shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are byte-identical to origin/main, so no branch-added ID collided and no main entry was dropped. Verified specs/content/geng-301/tasks.md keeps every main row in order and appends this branch's new Unit 2 G3 advisory row. All 14 content gates pass.

## Outcome

- ✅ Impact: branch now contains origin/main plus the existing Unit 2 G3 repair work; merge commit 52787d830.
- 🧪 Tests: npm run check:content - all 14 gates PASS (validate:content, check:pipeline-gate, check:depth-gate, check:figures, check:svg-style, check:no-em-dash, check:no-answer-keys, check:concept-graph, check:bloom-bands, check:source-floor, check:licence, licence:map:check, check:content-status, check:docs-sync).
- 📁 Files: merge commit only; no scope-file edits were required because main did not touch the GENG-301 Unit 2 files this branch changed.
- 🔁 Next prompts: none for this merge job; the unit still needs a fresh independent G3 review and owner decisions on the deferred findings.
- 🧠 Reflection: the brief predicted a tasks.md conflict, but at fetch time origin/main had not changed that file since the merge base, so git's ort strategy merged cleanly. The append-only union rule was checked and needed no edits.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit 52787d830 on crew/geng-301-u02-repair_en-r1 bringing in origin/main 5663b5d45; all content gates pass.
- Decisions the team must respect: G3 stays open and unsigned (ADR-0019); this merge does not certify anything and does not change the Unit 2 tracker row status.
- Pending / next owner: owner must resolve the deferred F1 wordmark geometry, openstax2021 source mapping and session provenance, and arrange a fresh independent G3 review.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none - the merge was clean and all gates passed without intervention.
- Graders run and results (PASS/FAIL): npm run check:content - PASS (14/14).
- Prompt variant (if applicable): crew brief v1 (conflict1).
- Next experiment (smallest change to try): none.
