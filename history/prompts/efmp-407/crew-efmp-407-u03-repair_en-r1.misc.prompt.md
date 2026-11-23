---
id: crew-efmp-407-u03-repair_en-r1
title: crew repair_en EFMP-407 unit 3
stage: misc
date: 2026-11-23
surface: agent
model: claude
feature: efmp-407
branch: crew/efmp-407-u03-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-03/index.mdx
 - docs/semester-3/efmp-407/unit-03/topic-01.mdx
 - docs/semester-3/efmp-407/unit-03/topic-02.mdx
 - docs/semester-3/efmp-407/unit-03/topic-03.mdx
 - docs/semester-3/efmp-407/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/unit-assessment.mdx
 - specs/content/efmp-407/reviews/unit-03/G2/20261123T034841126Z-gates.json
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261123T034841126Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261123T034841126Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261123T034841126Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261123T034841126Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261123T034841126Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261123T034841126Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261123T034841126Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261123T034841126Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u03-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

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
From `specs/content/efmp-407/reviews/unit-03/G3/20261122T175629Z-g3-desk-138b4db3.json` (disposition: revise). Resolve each one:
- [blocking] F1: Undisclosed unsupported national-framework details; summary.md Repair and handoff.
- [blocking] F2: SDG 5 Category 1 guidance contradicts Category 2 teaching.
- [blocking] F6: Undefined specialist language exceeds entry-reader standard.
- [blocking] F7: Unlabelled invented outcome figures and insufficient water-example safeguards.
- [advisory] F5: Target 4.1 and ESD/GCED reduction, formative demand labels and rubric zero levels need revision.
- [uncertain] F3: Required actual narrow-screen and print rendering unavailable under crew prohibition.
- [uncertain] F4: Original source quotations and full host provenance remain unverified; missing citation inventory entries.

## Notes from earlier jobs on this unit
- (efmp-407-u03-translate-r1, translate, opencode) The English `index.mdx` still says the unit is "awaiting ... Urdu translation"; the Urdu mirror translates it faithfully, so an English revision should fix that stale note.
- (efmp-407-u03-translate-r1, translate, opencode) Open G3 findings F1-F7 remain; F2 (SDG 5 category) is reconciled in English and mirrored. F3/F4 render and provenance are unverified under the crew prohibition, and `render-inspect.mjs --locale ur` was not run, so narrow-view and A4 inspection remain for G5.
- (efmp-407-u03-repair_en-conflict2, fix, opencode) F3 (narrow-screen/print rendering) and F4 (host provenance) remain unverified under the crew prohibition; a fresh independent G3 run should verify the repairs.
- (efmp-407-u03-repair_en-conflict2, fix, opencode) No Urdu mirror exists for Unit 3; G4 must reconcile the SDG 5 category guidance and wire the banner figure from `specs/content/efmp-407/figures/unit-03.illustration-notes.md`.
- (efmp-407-u03-repair_en-conflict1, fix, opencode) The merge was clean (no manual conflicts); git's ort strategy combined both sides of specs/content/efmp-407/tasks.md correctly, preserving main's entries and the branch's G3 advisory row.


## Response snapshot

Applied the remaining fixes from G3 report 138b4db3 to EFMP-407 Unit 3 in English and Urdu (Sindh SDG unit roles marked as reported, zero-mark notes in the topic mini-rubrics, a safe-water condition in the RRQ 7 model answer, an updated translation note), refreshed the G2 evidence, and appended the advisory G3 tracker row.

## Outcome

- Impact: repair_en for EFMP-407 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the remaining fixes from G3 report 138b4db3 to EFMP-407 Unit 3 in English and Urdu (Sindh SDG unit roles marked as reported, zero-mark notes in the topic mini-rubrics, a safe-water condition in the RRQ 7 model answer, an updated translation note), refreshed the G2 evidence, and appended the advisory G3 tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F3 (narrow-screen and A4 print rendering) and F4 (checking the original source passages and host provenance) cannot be resolved inside the crew's limits. They need a permitted render job and the authoring host's records.
  - The Sindh SDG tier membership and unit duties still depend on the 2018 framework, which we don't have a copy of. The text now discloses this, but nobody has checked it against the official document.
  - A fresh independent G3 run should check these repairs. Under ADR-0019, the next review cycle may need the owner's authorisation, recorded in `specs/decisions/log.md`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
