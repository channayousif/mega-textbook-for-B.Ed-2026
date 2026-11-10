---
id: crew-efmp-406-u01-repair_en-r1
title: crew repair_en EFMP-406 unit 1 (r1)
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: efmp-406
branch: crew/efmp-406-u01-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-406/crew-efmp-406-u01-repair_en-r1.misc.prompt.md
  - specs/content/efmp-406/reviews/unit-01/G3/20261110-repair-notes.md
  - specs/content/efmp-406/tasks.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-406-u01-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u01-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-406/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-01/`.

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
From `specs/content/efmp-406/reviews/unit-01/G3/20261108T203238Z-g3-desk-5985010a.json` (disposition: revise). Resolve each one:
- [advisory] Teaching case illustrations and hypothetical examples: Fictional classroom scenarios (Nadia in Tando Allahyar, Bilal in Sukkur, Sana, Imran, Mariam's mother, munshi and khata cases) are original instructional examples designed for pedagogy and do not represent empirical case studies or official school inspection records.
- [advisory] Headless review tooling constraint: The crew job brief explicitly prohibits running npm run build, a dev server, or Playwright Chromium. Visual, structural, and presentation checks were conducted via measure-figure-text.mjs (all 8 SVG variants exit 0 with zero overflow or collision), static heading and table container analysis, and Sharp PNG rasterization with CSS variables resolved.
- [advisory] Abstract-level citation for Shakir et al. (2012): The publisher full text returned HTTP 403 on 2026-11-02, so citations are strictly limited to findings reported in the published abstract retrieved via Semantic Scholar.
- [advisory] Catalog entry pending owner ruling: EFMP-406 is proposed for Semester 3 in catalog/courses.json but not yet committed pending an owner ruling, as noted in content-spec.md.

## Notes from earlier jobs on this unit
- (efmp-406-u01-repair_en, repair_en, agy) Urdu pages remain uninspected on Playwright Chromium, narrow width (360px), and A4 print per crew host constraints; the G5 review must verify these.
- (efmp-406-u01-repair_en, repair_en, agy) Proposed Urdu terms in specs/content/efmp-406/translations/unit-01/handoff.md and catalog/courses.json entry for EFMP-406 remain pending owner rulings.
- (efmp-406-u01-translate, translate, claude) The Urdu pages have never been checked as rendered (Playwright, narrow width, A4 print); the G5 review session needs to do this.
- (efmp-406-u01-translate, translate, claude) Proposed Urdu terms the term bank does not hold are listed in specs/content/efmp-406/translations/unit-01/handoff.md and need an owner ruling.
- (efmp-406-u01-translate, translate, claude) Merging main made the Unit 1 G2 gate record stale; after any later main merge, rerun prepare-gate-evidence.mjs and point the G2 row at the new file.

## Response snapshot

Applied G3 advisory repairs for EFMP-406 Unit 1 report `20261108T203238Z-g3-desk-5985010a.json`, recorded repair handoff documentation, and appended the advisory revise repair tracker row leaving G3 unticked.

## Outcome

- Impact: repair_en-r1 for EFMP-406 Unit 1 by agy.
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 3 file(s), listed above.
- Next prompts: fresh independent G3 English review and G5 Urdu review.
- Reflection: all four advisory items from the 2026-11-08 desk review are fully accounted for without modifying frozen specs, gates or catalog files.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded G3 advisory repair notes for EFMP-406 Unit 1 report `20261108T203238Z-g3-desk-5985010a.json`, appended the advisory revise repair tracker row in `specs/content/efmp-406/tasks.md` leaving G3 unticked, and passed all 14 content gates.
- Decisions the team must respect: G3 remains open and unsigned; no author self-certification or human initials used; catalog entry for EFMP-406 remains pending curriculum-owner ruling.
- Pending / next owner: fresh independent G3 English review session and authorized browser inspection.
- Notes for the next job on this unit:
  - Urdu pages remain uninspected on Playwright Chromium, narrow width (360px), and A4 print per crew host constraints; the G5 review must verify these.
  - Proposed Urdu terms in specs/content/efmp-406/translations/unit-01/handoff.md and catalog/courses.json entry for EFMP-406 remain pending owner rulings.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
