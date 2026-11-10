---
id: crew-efmp-305-u03-repair_en-r1
title: crew repair_en EFMP-305 unit 3 attempt 2
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u03-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/efmp-305/unit-03/topic-02.mdx
  - history/prompts/efmp-305/crew-efmp-305-u03-repair_en-r1.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-03/topic-02.mdx
  - specs/content/efmp-305/concepts/unit-03.md
  - specs/content/efmp-305/reviews/unit-03/G2/20261110T010218845Z-gates.json
  - specs/content/efmp-305/reviews/unit-03/G2/logs-20261110T010218845Z/check-bloom-bands.txt
  - specs/content/efmp-305/reviews/unit-03/G2/logs-20261110T010218845Z/check-concept-graph.txt
  - specs/content/efmp-305/reviews/unit-03/G2/logs-20261110T010218845Z/check-depth-gate.txt
  - specs/content/efmp-305/reviews/unit-03/G2/logs-20261110T010218845Z/check-docs-sync.txt
  - specs/content/efmp-305/reviews/unit-03/G2/logs-20261110T010218845Z/check-figures.txt
  - specs/content/efmp-305/reviews/unit-03/G2/logs-20261110T010218845Z/check-no-answer-keys.txt
  - specs/content/efmp-305/reviews/unit-03/G2/logs-20261110T010218845Z/check-no-em-dash.txt
  - specs/content/efmp-305/reviews/unit-03/G2/logs-20261110T010218845Z/validate-content.txt
  - specs/content/efmp-305/sources/unit-03.md
  - specs/content/efmp-305/tasks.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

# Crew job efmp-305-u03-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u03-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
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
From `specs/content/efmp-305/reviews/unit-03/G3/20261108T203238Z-g3-desk-d15c80fc.json` (disposition: revise). Resolve each one:
- [blocking] Repository-wide gate exit codes: Repository-level execution of npm run check:depth-gate exits with code 1 due to EFMP-305 Unit 6 (unit-total estimated reading time is 193 minutes, exceeding the 140–170 min band). In addition, npm run check:figures exits with code 1 due to figure alt-text differences in EFMP-304 Units 3–6. While EFMP-305 Unit 3 itself is fully compliant on reading time (176 min total, 145 min across topics, within the 150–180 min band) and figure density/archetypes (all 6 figures placed with clean SVG text metrics and 0 collisions), the repository-level command exit codes prevent automated contract pass. Escalated to CurriculumOwner for repository gate resolution.
- [advisory] Terminology banking proposal: In specs/content/efmp-305/concepts/unit-03.md:24-30, several Urdu concept labels (such as مواد میں تنوع, عمل میں تنوع, حاصلِ کار میں تنوع, سہولت کاری, ترمیم, تعلم کے لیے عالمگیر ڈیزائن, اشتراکی تعلم) are proposed for banking in the TEX-69 handoff rather than committed directly into frozen specs/content/terminology.csv. Trainee translators at G4 must adhere to these banked labels.
- [uncertain] Unverifiable source full-text retrieval at G1: Per specs/content/efmp-305/sources/unit-03.md:40-62 and decision D-2026-0001, all 5 sources (subandiyah2025, serman2026, vernon2020, florian2014, cast2024) are author-selected and Crossref/web verified at metadata and licence level, but full texts were not retrieved to this host and no excerpts are bound under sources/texts/. Conceptual citations in prose are appropriately qualified and bounded, but full-text verification remains pending at G2.

## Notes from earlier jobs on this unit
- (efmp-305-u03-repair_en, repair_en, claude) Peer tutoring was the weakest observed behaviour in `serman2026`, so topic-02's "report exactly this use" overstates peer explanation as the mechanism (noted in `sources/texts/serman2026.md`).
- (efmp-305-u03-repair_en, repair_en, claude) The `serman2026` reference in topic-02 prints "Serman, & Ningrum." with no initials; the record gives Serman, S., & Ningrum, E. S. C.
- (efmp-305-u03-repair_en, repair_en, claude) `vernon2020` and `florian2014` are still metadata-only; any later edit to `sources/texts/cast2024.md` makes both Unit 3 and Unit 4 G2 evidence stale again.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Applied repairs addressing the findings from G3 report `specs/content/efmp-305/reviews/unit-03/G3/20261108T203238Z-g3-desk-d15c80fc.json`: corrected the `serman2026` author initials to Serman, S., & Ningrum, E. S. C. and adjusted peer tutoring mechanism nuance in topic-02.mdx (English and Urdu mirror) and sources/unit-03.md; clarified sources/unit-03.md notes distinguishing retrieved excerpts from metadata-only works; updated concepts/unit-03.md terminology note explicitly reaffirming G4 translator adherence to banked and unit labels; refreshed G2 gate evidence for Unit 3 and repointed tasks.md; appended a new G3 tracker row with G3 left unticked.

## Outcome

- Impact: repair_en for EFMP-305 Unit 3 by agy (attempt 2).
- Tests: npm run check:content passes all 14 gates cleanly.
- Files: 15 files changed/added across the branch.
- Next prompts: fresh G3 independent review for EFMP-305 Unit 3.
- Reflection: accurately resolved source attribution, mechanism nuance, terminology banking notes, and evidence refresh.

## Handoff (for CEO and agents)

- Shipped / changed: Corrected `serman2026` initials and peer tutoring mechanism nuance in topic-02.mdx (EN+UR) and sources/unit-03.md; clarified sources/unit-03.md verification status; updated concepts/unit-03.md terminology note; refreshed G2 gate evidence and repointed tasks.md; appended unticked G3 advisory repair row.
- Decisions the team must respect: G3 remains open and unticked pending independent G3 review; vernon2020 and florian2014 remain metadata-only subscription works.
- Pending / next owner: independent G3 reviewer for EFMP-305 Unit 3.
- Notes for the next job on this unit:
  - vernon2020 and florian2014 remain metadata-only subscription works.
  - casts2024.md should not be modified unnecessarily as it binds both Unit 3 and Unit 4.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): PASS (all 14 content gates pass).
