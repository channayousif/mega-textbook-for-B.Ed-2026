---
id: crew-gsos-301-u04-repair_en-r1
title: crew repair_en GSOS-301 unit 4
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: gsos-301
branch: crew/gsos-301-u04-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gsos-301/crew-gsos-301-u04-repair_en-r1.misc.prompt.md
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u04-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u04-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gsos-301/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-04/`.

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
From `specs/content/gsos-301/reviews/unit-04/G3/20261108T203238Z-g3-desk-c9f8007e.json` (disposition: revise). Resolve each one:
- [blocking] A1: unit-assessment.mdx final MCQ 2 guidance gives 60.00% instead of 68.00%, despite option B and government Table 10.2.
- [blocking] A2: unit-assessment.mdx ERQ rubrics 1-5 have three-cell rows beneath two-column headers.
- [blocking] A3: unit-assessment.mdx RRQ 1-2 require Remember instead of the approved Understand-to-Analyze demand.
- [blocking] C1: coverage/unit-04.md reinforcement maps mobility to gender MCQ 6 and ranking dimensions to printing MCQ 5.
- [advisory] T1: stale draft/pending-intake prose conflicts with approved frontmatter and confirmed intake ruling.
- [advisory] Assessment quality: nine B keys, weak distractors and RRQ 7/9 scoring under-specify analysis; teacher sequence introduces activity before full feminist explanation.
- [uncertain] S1: source audit incomplete; print text unavailable, unavailable-source declarations lack full dates/authorisation, retrieved text not frozen in original handoff.
- [uncertain] P1: author run identity and exact model version unavailable; manifest prepared locally rather than supplied by parent.
- [uncertain] X1: browser/narrow/print inspection prohibited by brief and unavailable; no render evidence.

## Notes from earlier jobs on this unit
- (gsos-301-u04-repair_en-conflict1, fix, opencode) G3 stays unticked; P1 author-run provenance and X1 browser/print render inspection remain open because the brief prohibits build/server/browser.
- (gsos-301-u04-repair_en-conflict1, fix, opencode) No Urdu mirror exists for Unit 4, so G4 stays blocked until a fresh independent G3 confirms these repairs.
- (gsos-301-u04-repair_en-conflict1, fix, opencode) content-spec.md's introductory "Status is draft" paragraph still conflicts with its approved frontmatter; it is an approved spec, so it is an owner edit outside this job's scope.
- (gsos-301-u04-repair_en, repair_en, opencode) G3 remains unticked; P1 author-run provenance and X1 browser/print render inspection stay open because the brief prohibits build/server/browser.
- (gsos-301-u04-repair_en, repair_en, opencode) content-spec.md's introductory "Status is draft" paragraph still conflicts with its approved frontmatter; it is an approved spec, so it is an owner edit outside this job's scope.


## Response snapshot

Verified all findings from G3 desk report c9f8007e are resolved in current bytes and appended the advisory repair tracker row to specs/content/gsos-301/tasks.md with all content gates passing.

## Outcome

- Impact: repair_en for GSOS-301 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified all findings from G3 desk report c9f8007e are resolved in current bytes and appended the advisory repair tracker row to specs/content/gsos-301/tasks.md with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 stays unticked; P1 author-run provenance and X1 browser/print render inspection remain open because the brief prohibits build/server/browser.
  - No Urdu mirror exists for Unit 4, so G4 stays blocked until a fresh independent G3 confirms these repairs.
  - content-spec.md's introductory "Status is draft" paragraph still conflicts with its approved frontmatter; it is an approved spec, so it is an owner edit outside this job's scope.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
