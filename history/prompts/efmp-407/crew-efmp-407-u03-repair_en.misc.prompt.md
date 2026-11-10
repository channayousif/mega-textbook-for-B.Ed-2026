---
id: crew-efmp-407-u03-repair_en
title: crew repair_en EFMP-407 unit 3
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-03/topic-01.mdx
 - docs/semester-3/efmp-407/unit-03/topic-02.mdx
 - docs/semester-3/efmp-407/unit-03/topic-03.mdx
 - docs/semester-3/efmp-407/unit-03/unit-assessment.mdx
 - history/prompts/general/20261110-efmp-407-u03-repair-en.general.prompt.md
 - specs/content/efmp-407/coverage/unit-03.md
 - specs/content/efmp-407/reviews/unit-03/G2/20261110T021245039Z-gates.json
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/unesco-2015-gced.md
 - specs/content/efmp-407/sources/unit-03.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-407/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-03/`.

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
From `specs/content/efmp-407/reviews/unit-03/G3/20261108T203238Z-g3-desk-dd5ef8ea.json` (disposition: revise). Resolve each one:
- [blocking] F1: Undisclosed unsupported national-framework details; summary.md Repair and handoff.
- [blocking] F2: SDG 5 Category 1 guidance contradicts Category 2 teaching.
- [blocking] F6: Undefined specialist language exceeds entry-reader standard.
- [blocking] F7: Unlabelled invented outcome figures and insufficient water-example safeguards.
- [advisory] F5: Target 4.1 and ESD/GCED reduction, formative demand labels and rubric zero levels need revision.
- [uncertain] F3: Required actual narrow-screen and print rendering unavailable under crew prohibition.
- [uncertain] F4: Original source quotations and full host provenance remain unverified; missing citation inventory entries.

## Notes from earlier jobs on this unit
- (efmp-407-u03-illustrate, illustrate, agy) Placed banner fig-U3-7.webp in English index.mdx; when translation creates the Urdu mirror, wire the banner using the draft snippet in specs/content/efmp-407/figures/unit-03.illustration-notes.md.
- (efmp-407-u03-illustrate, illustrate, agy) English author repairs remain prerequisite for G4 translation to reconcile SDG 5 category guidance and resolve open G3 findings.
- (efmp-407-u03-translate, translate, codex) English author must reconcile SDG 5 category guidance before G4 resumes; draft status remains unchanged.
- (efmp-407-u03-translate, translate, codex) English author must reconcile SDG 5 category guidance before G4 resumes; draft status remains unchanged.
- (efmp-407-u03-review_en, review_en, codex) Author repairs are needed for source support, contradictory SDG 5 category guidance, readability and worked examples; rendering and provenance remain unverified.


## Response snapshot

Applied the latest G3 findings to EFMP-407 Unit 3 (source disclosure, SDG 5 category fix, readability, fictional-case and water-safety safeguards, assessment rubric and label revisions, and the missing source inventory entries), refreshed G2 evidence, and left G3 unticked.

## Outcome

- Impact: repair_en for EFMP-407 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the latest G3 findings to EFMP-407 Unit 3 (source disclosure, SDG 5 category fix, readability, fictional-case and water-safety safeguards, assessment rubric and label revisions, and the missing source inventory entries), refreshed G2 evidence, and left G3 unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F3 narrow-screen/print rendering and F4 host provenance remain unverified under the crew prohibition; a fresh independent G3 run should verify the repairs.
  - No Urdu mirror exists for Unit 3; G4 must reconcile the SDG 5 category guidance and wire the banner figure from `specs/content/efmp-407/figures/unit-03.illustration-notes.md`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
