---
id: 0144
title: Salvage EFMP-303 course integration
stage: misc
date: 2026-10-17
surface: agent
model: GPT-6
feature: efmp-303
branch: crew/efmp-303-u00-salvage
user: owner
command: Read .crew/brief.md
labels: [board-direct, efmp-303, salvage]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-40
  adr: null
  pr: null
files:
  - glossary.json
  - specs/decisions/log.md
  - specs/gaps.md
  - specs/content/efmp-303/
  - static/img/figures/efmp-303/unit-02/fig-U2-1.svg
  - static/img/figures/efmp-303/unit-03/fig-U3-2.svg
  - static/img/figures/efmp-303/unit-03/fig-U3-2.dark.svg
tests:
  - npm run check:content (13/13 PASS)
  - origin/main baseline check:content (12 PASS, missing generated content-status file)
  - prepare-gate-evidence EFMP-303 Units 1-6 (48/48 command results PASS)
  - figures:variants --check, scoped to EFMP-303 (52 PASS)
  - git diff --check (PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

### Delegated brief (verbatim)

# Crew job efmp-303-u00-salvage

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u00-salvage`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
This branch carries earlier, unfinished work from PR #120 (agent/TEX-40). Run `git fetch origin && git rebase origin/main`, resolve every conflict (keep this unit's content; take main's version of shared files such as the style guide, gates and catalog), then make every content gate pass. Extra instructions: Also merge origin/agent/TEX-74 (figure fix) and origin/agent/TEX-73 (U2 G3/G5 reviews) into this branch before fixing gates. Shared files (glossary.json, specs/decisions/log.md, specs/gaps.md, terminology.csv): keep both sides' entries, never drop main's rows. The pipeline gate fails on main today only on stale G2 manifests for other courses; ignore those.

## Scope
The whole EFMP-303 course: its docs and i18n trees, `specs/content/efmp-303/`, its figures, and the shared files its PR already touches.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.

## Response snapshot

Rebased the existing EFMP-303 course onto origin/main, preserving main's shared entries and the course's later repairs. Merged origin/agent/TEX-74 and origin/agent/TEX-73. Synced fig-U3-2 desc to the existing page alt, derived its dark variant, generated the ignored content-status artifact, and refreshed G2 evidence for all six units with the repository tooling. All 13 content gates pass.

## Outcome

- Impact: Course integration preserved; all deterministic content gates pass without exceptions.
- Tests: Initial run found six stale G2 records, two figure desc mismatches and missing generated content-status. Main baseline passed 12 gates and failed only on the missing generated status file. Final branch run passed all 13 gates; 52 dark variants also passed freshness.
- Files: Shared conflict resolutions, imported figure fix and independent review reports, synchronized Unit 3 desc, six new G2 records with real command logs, and refreshed tracker evidence paths. Historical evidence remains unchanged.
- Next prompts: Independent academic review and later publication remain outside this salvage task.
- Reflection: Review reports are historical evidence and do not authorize self-certification.

## Handoff (for CEO and agents)

- Shipped / changed: Rebased onto main, merged TEX-74 and TEX-73, preserved main shared rows and later course repairs, repaired fig-U3-2 provenance, and refreshed all six G2 references. All 13 content gates pass.
- Decisions the team must respect: Preserve owner decisions and main's shared rows; do not mark G3/G5 done or alter approved specifications.
- Pending / next owner: No salvage work remains. The curriculum owner retains review/publication decisions. No push, PR, build or dev server was performed; .crew/ remains the supplied untracked job input.
- Paperclip issues affected: TEX-40, TEX-74, TEX-73.

## Evaluation notes (flywheel)

- Failure modes observed: Shared glossary and decision-log rebase conflicts; divergent course repairs in the figure-fix branch.
- Graders run and results (PASS/FAIL): PASS: all 13 content gates; 48 G2 command results; 52 scoped dark variants; main-row preservation and merge ancestry checks. Initial failures were repaired; main had no stale G2 findings at fetched commit 6f471631.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): No further repair is needed for the requested deterministic gates.

### Final content-gate output

```text
> bed-mega-textbook@0.1.0 check:content
> node scripts/run-gates.mjs content

Running 13 content gates

  validate:content        PASS  1.9s
  check:pipeline-gate     PASS  12.6s
  check:depth-gate        PASS  0.7s
  check:figures           PASS  1.2s
  check:no-em-dash        PASS  1.3s
  check:no-answer-keys    PASS  1.1s
  check:concept-graph     PASS  0.9s
  check:bloom-bands       PASS  1.1s
  check:source-floor      PASS  1.2s
  check:licence           PASS  2.2s
  licence:map:check       PASS  1.0s
  check:content-status    PASS  1.1s
  check:docs-sync         PASS  0.8s

All content gates passed.
```
