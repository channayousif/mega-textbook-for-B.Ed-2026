---
id: crew-gent-401-u05-author-conflict2
title: crew fix GENT-401 unit 5
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u05-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-05/index.mdx
 - docs/semester-4/gent-401/unit-05/topic-01.mdx
 - docs/semester-4/gent-401/unit-05/topic-02.mdx
 - docs/semester-4/gent-401/unit-05/unit-assessment.mdx
 - docs/semester-4/gent-401/unit-05/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/gent-401/crew-gent-401-u05-author-conflict1.misc.prompt.md
 - history/prompts/gent-401/crew-gent-401-u05-author-conflict2.misc.prompt.md
 - history/prompts/gent-401/crew-gent-401-u05-author.green.prompt.md
 - specs/content/gent-401/concepts/unit-05.md
 - specs/content/gent-401/coverage/unit-05.md
 - specs/content/gent-401/figures/unit-05.banner.md
 - specs/content/gent-401/figures/unit-05.md
 - specs/content/gent-401/reviews/unit-05/G2/20261124T054301209Z-gates.json
 - specs/content/gent-401/reviews/unit-05/G2/20261124T094530692Z-gates.json
 - specs/content/gent-401/reviews/unit-05/G2/20261124T102242274Z-gates.json
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T054301209Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T054301209Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T054301209Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T054301209Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T054301209Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T054301209Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T054301209Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T054301209Z/validate-content.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/validate-content.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T102242274Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T102242274Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T102242274Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T102242274Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T102242274Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T102242274Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T102242274Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T102242274Z/validate-content.txt
 - specs/content/gent-401/sources/texts/cegielska-2018-startup-financing.md
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/sources/texts/scott-2017-efmd.md
 - specs/content/gent-401/sources/texts/sintha-2020-break-even.md
 - specs/content/gent-401/sources/texts/wati-2018-crowdfunding.md
 - specs/content/gent-401/sources/unit-05.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-05/fig-U5-1.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-1.svg
 - static/img/figures/gent-401/unit-05/fig-U5-2.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-2.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.svg
 - static/img/figures/gent-401/unit-05/fig-U5-4.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u05-author-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u05-author conflicts with main (specs/content/gent-401/sources/texts/scott-2017-efmd.md, specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENT-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-05/`.

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
- (gent-401-u05-author-conflict1, fix, claude_crew) Unit 5 Urdu mirror, `.ur.svg` variants and the `fig-U5-5` illustrate job remain open for separate G4/G5 and illustrate jobs.
- (gent-401-u05-author-conflict1, fix, claude_crew) G3 should confirm the Polish and Indonesian substitute sources are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`specs/content/gent-401/sources/unit-05.md`).
- (gent-401-u05-author-conflict1, fix, claude_crew) `scott-2017-efmd.md` now has one header plus Unit 3 and Unit 5 sections; the branch's duplicate header was dropped as a duplicate of main's.
- (gent-401-u05-author, author, claude_crew) The Urdu mirror and `.ur.svg` files are deliberately absent (separate G4/G5 job; EN index is `translation_status: draft`), and banner `fig-U5-5` is a prompt-only row for the illustrate job.
- (gent-401-u05-author, author, claude_crew) G3 should confirm the three substitute open-access sources (Polish startup financing, MSME break-even, Indonesian crowdfunding) are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`sources/unit-05.md`).


## Response snapshot

Merged origin/main into crew/gent-401-u05-author, resolved the two GENT-401 source and tracker conflicts additively (main's Unit 4 first, then this branch's Unit 5), refreshed Unit 5's G2 gate evidence, and committed the merge plus its PHR with all 14 content gates passing.

## Outcome

- Impact: fix for GENT-401 Unit 5 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 55 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gent-401-u05-author, resolved the two GENT-401 source and tracker conflicts additively (main's Unit 4 first, then this branch's Unit 5), refreshed Unit 5's G2 gate evidence, and committed the merge plus its PHR with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5's Urdu mirror, `.ur.svg` variants and the `fig-U5-5` illustrate row remain open for separate G4/G5 and illustrate jobs; EN index stays `translation_status: draft`.
  - G3 should confirm the Polish, Indonesian and MSME substitute sources are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`specs/content/gent-401/sources/unit-05.md`).
  - The merged `scott-2017-efmd.md` is now a three-section shared file (Units 3, 4, 5); the next merge should expect the Unit 4 section from main to stay ahead of Unit 5.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
