---
id: 20261125
title: Merge GENG unit five repair branch
stage: general
date: 2026-11-05
surface: agent
model: gpt-6
feature: none
branch: crew/geng-301-u05-repair_en
user: crew
command: Execute .crew/brief.md
labels: ["codex", "crew", "merge-conflict"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content: all 14 gates PASS on full rerun
 - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Crew brief (verbatim):

# Crew job geng-301-u05-repair_en-conflict2

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-301-u05-repair_en conflicts with main (specs/content/geng-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-05/`.

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
- (geng-301-u05-repair_en-conflict1, fix, opencode) Merge was clean (no overlapping files with origin/main); branch content intact and all 14 content gates pass.
- (geng-301-u05-repair_en-conflict1, fix, opencode) G3 remains open for Unit 5; a fresh independent G3 review is still required after the figure-geometry repair.
- (geng-301-u05-repair_en, repair_en, codex) G3 remains open; original provenance, SVG geometry and desktop/narrow/A4 inspection need an authorised host.
- (geng-301-u05-repair_en, repair_en, codex) G3 remains open; original provenance, SVG geometry and desktop/narrow/A4 inspection need an authorised host.
- (geng-301-u05-fix, fix, opencode) G3 review remains incomplete; a fresh G3 run is needed after this figure-geometry repair. G4/G5/G6/G7 are untouched.


## Response snapshot

Fetched origin and merged origin/main. Resolved the sole tracker conflict by retaining main Unit 1 and Unit 6 repair notes before the branch Unit 5 repair note. Shared registries have no branch differences and require no renumbering. Merge committed as 1c9c95a30.

## Outcome

- ✅ Impact: Preserved main updates and all existing Unit 5 repairs.
- 🧪 Tests: All 14 content gates PASS after regenerating the ignored static/content-status.json report.
- 📁 Files: Tracker conflict resolution plus this PHR; incoming main files preserved by merge.
- 🔁 Next prompts: Fresh independent G3 review remains required.
- 🧠 Reflection: Append tracker notes in main order before branch notes; preserve review status.

## Handoff (for CEO and agents)

- Shipped / changed: Merge committed; Unit 5 repairs retained.
- Decisions the team must respect: No G3/G5 certification or publication changes; shared registries unchanged.
- Pending / next owner: Review owner: fresh independent G3 and outstanding provenance/render inspection.
- Paperclip issues affected: No issue ID supplied; GENG-301 Unit 5 crew job.

## Evaluation notes (flywheel)

- Failure modes observed: One append-position conflict in course tracker; initial gate run found a stale ignored content-status report, regenerated with npm run build:content-status.
- Graders run and results (PASS/FAIL): All 14 content gates PASS; git diff --check PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No further implementation change planned.
