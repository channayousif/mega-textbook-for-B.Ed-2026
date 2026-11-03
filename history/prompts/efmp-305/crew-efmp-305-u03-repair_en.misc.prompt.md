---
id: crew-efmp-305-u03-repair_en
title: crew repair_en EFMP-305 unit 3
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: efmp-305
branch: crew/efmp-305-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-305/concepts/unit-03.md
 - specs/content/efmp-305/reviews/unit-03/G2/20261103T124014823Z-gates.json
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261103T124014823Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261103T124014823Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261103T124014823Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261103T124014823Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261103T124014823Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261103T124014823Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261103T124014823Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-03/G2/logs-20261103T124014823Z/validate-content.txt
 - specs/content/efmp-305/reviews/unit-04/G2/20261103T124015000Z-gates.json
 - specs/content/efmp-305/reviews/unit-04/G2/logs-20261103T124015000Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-04/G2/logs-20261103T124015000Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-04/G2/logs-20261103T124015000Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-04/G2/logs-20261103T124015000Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-04/G2/logs-20261103T124015000Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-04/G2/logs-20261103T124015000Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-04/G2/logs-20261103T124015000Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-04/G2/logs-20261103T124015000Z/validate-content.txt
 - specs/content/efmp-305/sources/texts/cast2024.md
 - specs/content/efmp-305/sources/texts/serman2026.md
 - specs/content/efmp-305/sources/texts/subandiyah2025.md
 - specs/content/efmp-305/sources/unit-03.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u03-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-305/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/efmp-305/reviews/unit-03/G3/20261102T212207Z-g3-desk-d26592ad.json` (disposition: revise). Resolve each one:
- [blocking] Repository-wide gate exit codes: Repository-level execution of npm run check:depth-gate exits with code 1 due to EFMP-305 Unit 6 (unit-total estimated reading time is 193 minutes, exceeding the 140–170 min band). In addition, npm run check:figures exits with code 1 due to figure alt-text differences in EFMP-304 Units 3–6. While EFMP-305 Unit 3 itself is fully compliant on reading time (176 min total, 145 min across topics, within the 150–180 min band) and figure density/archetypes (all 6 figures placed with clean SVG text metrics and 0 collisions), the repository-level command exit codes pr...
- [advisory] Terminology banking proposal: In specs/content/efmp-305/concepts/unit-03.md:24-30, several Urdu concept labels (such as مواد میں تنوع, عمل میں تنوع, حاصلِ کار میں تنوع, سہولت کاری, ترمیم, تعلم کے لیے عالمگیر ڈیزائن, اشتراکی تعلم) are proposed for banking in the TEX-69 handoff rather than committed directly into frozen specs/content/terminology.csv. Trainee translators at G4 must adhere to these banked labels.
- [uncertain] Unverifiable source full-text retrieval at G1: Per specs/content/efmp-305/sources/unit-03.md:40-62 and decision D-2026-0001, all 5 sources (subandiyah2025, serman2026, vernon2020, florian2014, cast2024) are author-selected and Crossref/web verified at metadata and licence level, but full texts were not retrieved to this host and no excerpts are bound under sources/texts/. Conceptual citations in prose are appropriately qualified and bounded, but full-text verification remains pending at G2.


## Response snapshot

Bound full-text excerpts for three Unit 3 sources, corrected the stale terminology note, refreshed Unit 3/4 G2 evidence and appended an open advisory G3 repair row for desk report d26592ad.

## Outcome

- Impact: repair_en for EFMP-305 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Bound full-text excerpts for three Unit 3 sources, corrected the stale terminology note, refreshed Unit 3/4 G2 evidence and appended an open advisory G3 repair row for desk report d26592ad.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Peer tutoring was the weakest observed behaviour in `serman2026`, so topic-02's "report exactly this use" overstates peer explanation as the mechanism (noted in `sources/texts/serman2026.md`).
  - The `serman2026` reference in topic-02 prints "Serman, & Ningrum." with no initials; the record gives Serman, S., & Ningrum, E. S. C.
  - `vernon2020` and `florian2014` are still metadata-only; any later edit to `sources/texts/cast2024.md` makes both Unit 3 and Unit 4 G2 evidence stale again.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
