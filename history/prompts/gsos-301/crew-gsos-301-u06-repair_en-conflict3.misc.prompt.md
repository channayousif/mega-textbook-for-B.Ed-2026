---
id: crew-gsos-301-u06-repair_en-conflict3
title: crew fix GSOS-301 unit 6
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u06-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gsos-301/tasks.md
  - history/prompts/gsos-301/crew-gsos-301-u06-repair_en-conflict3.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job gsos-301-u06-repair_en-conflict3

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gsos-301-u06-repair_en conflicts with main (specs/content/gsos-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GSOS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-06/`.

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
- (gsos-301-u06-repair_en-conflict1, fix, opencode) G3 remains unticked; permitted browser/print inspection and fresh independent review are pending.
- (gsos-301-u06-repair_en-conflict1, fix, opencode) G4 stays blocked until a fresh independent G3 review confirms the Unit 6 repairs.
- (gsos-301-u06-repair_en, repair_en, codex) G3 remains unticked; permitted browser/print inspection and fresh independent review are pending.
- (gsos-301-u06-repair_en, repair_en, codex) G3 remains unticked; permitted browser/print inspection and fresh independent review are pending.
- (gsos-301-u06-translate-r1, translate, codex) English author must repair the citation, Sialkot typo and assessment mappings before G4 resumes.

## Response snapshot

Merged origin/main into crew/gsos-301-u06-repair_en and resolved the single conflict in specs/content/gsos-301/tasks.md.

## Outcome

- Impact: merge conflict resolution for GSOS-301 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed after regenerating the gitignored static/content-status.json.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge of origin/main; tasks.md keeps main's Unit 4 G3 repair row before this branch's Unit 6 G3 repair row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
