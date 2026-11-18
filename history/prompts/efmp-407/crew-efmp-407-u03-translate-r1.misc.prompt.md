---
id: crew-efmp-407-u03-translate-r1
title: crew translate EFMP-407 unit 3
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u03-translate-r1
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u03-translate-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/unit-assessment.mdx
 - specs/content/efmp-407/reviews/unit-03/G2/20261110T104223301Z-gates.json
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T104223301Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T104223301Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T104223301Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T104223301Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T104223301Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T104223301Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T104223301Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T104223301Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
 - specs/content/efmp-407/translation/unit-03.md
 - static/img/figures/efmp-407/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-5.ur.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-6.ur.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-translate-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u03-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

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

## Notes from earlier jobs on this unit
- (efmp-407-u03-repair_en-conflict2, fix, opencode) F3 (narrow-screen/print rendering) and F4 (host provenance) remain unverified under the crew prohibition; a fresh independent G3 run should verify the repairs.
- (efmp-407-u03-repair_en-conflict2, fix, opencode) No Urdu mirror exists for Unit 3; G4 must reconcile the SDG 5 category guidance and wire the banner figure from `specs/content/efmp-407/figures/unit-03.illustration-notes.md`.
- (efmp-407-u03-repair_en-conflict1, fix, opencode) The merge was clean (no manual conflicts); git's ort strategy combined both sides of specs/content/efmp-407/tasks.md correctly, preserving main's entries and the branch's G3 advisory row.
- (efmp-407-u03-repair_en-conflict1, fix, opencode) F3 (narrow-screen/print rendering) and F4 (host provenance) remain unverified under the crew prohibition; a fresh independent G3 run should verify the repairs.
- (efmp-407-u03-repair_en-conflict1, fix, opencode) No Urdu mirror exists for Unit 3; G4 must reconcile the SDG 5 category guidance and wire the banner figure from specs/content/efmp-407/figures/unit-03.illustration-notes.md.


## Response snapshot

Translated EFMP-407 Unit 3 into a complete Urdu mirror (5 pages, 6 RTL schematic variants with dark twins, banner wired) with all content gates green and the G4 tracker row recorded as prepared.

## Outcome

- Impact: translate for EFMP-407 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 29 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFMP-407 Unit 3 into a complete Urdu mirror (5 pages, 6 RTL schematic variants with dark twins, banner wired) with all content gates green and the G4 tracker row recorded as prepared.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The English `index.mdx` still says the unit is "awaiting ... Urdu translation"; the Urdu mirror translates it faithfully, so an English revision should fix that stale note.
  - Open G3 findings F1-F7 remain; F2 (SDG 5 category) is reconciled in English and mirrored. F3/F4 render and provenance are unverified under the crew prohibition, and `render-inspect.mjs --locale ur` was not run, so narrow-view and A4 inspection remain for G5.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
