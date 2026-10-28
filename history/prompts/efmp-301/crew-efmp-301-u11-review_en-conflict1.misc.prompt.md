---
id: crew-efmp-301-u11-review_en-conflict1
title: crew fix EFMP-301 unit 11 conflict1
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u11-review_en
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u11-review_en-conflict1.misc.prompt.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u11-review_en-conflict1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u11-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-301-u11-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-11/`.

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
- (efmp-301-u11-review_en, review_en, codex) Owner escalation required for clinical source support, render evidence and review provenance; no automatic third cycle.
- (efmp-301-u11-review_en, review_en, codex) Owner escalation required for clinical source support, render evidence and review provenance; no automatic third cycle.
- (efmp-301-u11-fix, fix, codex) Fresh independent G3 review required; local generated content-status.json remains uncommitted.
- (efmp-301-u11-fix, fix, codex) Fresh independent G3 review required; local generated content-status.json remains uncommitted.


## Response snapshot

Resolved merge conflicts with origin/main on specs/content/efmp-301/tasks.md and static/content-status.json, committed the merge, and verified that all 13 content gates pass.

## Outcome

- Impact: conflict resolution for EFMP-301 Unit 11 review_en by agy.
- Tests: npm run check:content passed (13/13 gates).
- Files: specs/content/efmp-301/tasks.md, history/prompts/efmp-301/crew-efmp-301-u11-review_en-conflict1.misc.prompt.md.
- Next prompts: crew batch integration.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved merge conflicts with origin/main on tasks.md and static/content-status.json, keeping both main's updated G2 gate evidence and G3 cycle 2 advisory escalation row; untracked gitignored static/content-status.json.
- Decisions the team must respect: G3 remains advisory cycle 2 escalated to owner; no third review cycle without owner authorisation.
- Pending / next owner: crew lead.
- Notes for the next job on this unit:
  - Owner escalation required for clinical source support, render evidence and review provenance; no automatic third cycle.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
