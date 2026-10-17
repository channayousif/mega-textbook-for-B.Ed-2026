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
  - specs/content/efmp-303/
  - static/img/figures/efmp-303/unit-02/fig-U2-1.svg
tests:
  - npm run check:content
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

Rebased the existing EFMP-303 course onto origin/main, preserving main's shared entries and the course's later repairs. Merged origin/agent/TEX-74 and origin/agent/TEX-73. Content-gate verification and evidence refresh are in progress.

## Outcome

- Impact: Course integration preserved; deterministic verification in progress.
- Tests: First content-gate run in progress; comparison against origin/main pending.
- Files: Shared conflict resolutions, imported figure fix and independent review reports.
- Next prompts: No new authorization needed for the brief's remaining work.
- Reflection: Review reports are historical evidence and do not authorize self-certification.

## Handoff (for CEO and agents)

- Shipped / changed: Rebase and requested branch merges completed locally.
- Decisions the team must respect: Preserve owner decisions and main's shared rows; do not mark G3/G5 done or alter approved specifications.
- Pending / next owner: Codex is completing content-gate repairs and verification before the final local commit.
- Paperclip issues affected: TEX-40, TEX-74, TEX-73.

## Evaluation notes (flywheel)

- Failure modes observed: Shared glossary and decision-log rebase conflicts; divergent course repairs in the figure-fix branch.
- Graders run and results (PASS/FAIL): Content-gate run pending completion.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Repair only findings added by EFMP-303; compare remaining failures with origin/main.
