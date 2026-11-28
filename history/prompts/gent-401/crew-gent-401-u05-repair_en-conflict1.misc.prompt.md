---
id: crew-gent-401-u05-repair_en-conflict1
title: crew fix GENT-401 unit 5
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-05/topic-01.mdx
 - docs/semester-4/gent-401/unit-05/topic-02.mdx
 - docs/semester-4/gent-401/unit-05/unit-assessment.mdx
 - history/prompts/gent-401/crew-gent-401-u05-repair_en-conflict1.misc.prompt.md
 - history/prompts/gent-401/crew-gent-401-u05-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-05/unit-assessment.mdx
 - specs/content/gent-401/figures/unit-05.md
 - specs/content/gent-401/reviews/unit-05/G2/20261128T040717436Z-gates.json
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/validate-content.txt
 - specs/content/gent-401/sources/texts/cegielska-2018-startup-financing.md
 - specs/content/gent-401/sources/texts/scott-2017-efmd.md
 - specs/content/gent-401/sources/unit-05.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-05/fig-U5-1.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-1.svg
 - static/img/figures/gent-401/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-1.ur.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u05-repair_en-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u05-repair_en conflicts with main (specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (gent-401-u05-repair_en, repair_en, claude) The next G3 run needs render and A4/360px inspection against https://textbook.com.pk after this and the fig-U5-5 banner are deployed.
- (gent-401-u05-repair_en, repair_en, claude) G5 should check the changed Urdu (topics 5.1 and 5.2, MCQ options and keys, fig-U5-1 and fig-U5-3 labels and alt text); punctuation placement in the fig-U5-3.ur.svg box titles looked odd in a local sharp render and needs a browser check.
- (gent-401-u05-review_en, review_en, claude) The repair job should fix F1 (Imran's savings), F2 (redraw fig-U5-1 lines in all 4 variants, including `.ur.svg`, at the coordinates in `figure-check.md`), F3 (credit Scott at `topic-02.mdx:64`), F4 (rebalance MCQ keys, fix MCQ 3) and F5 (soften the Sintha claim), and F7 (add Scott ch. 10 and ch. 1 to `sources/texts/scott-2017-efmd.md`).
- (gent-401-u05-review_en, review_en, claude) render-review stays unavailable until the deployed SHA includes the fig-U5-5 banner commit. The next G3 run should then use render-inspect against https://textbook.com.pk.
- (gent-401-u05-illustrate, illustrate, agy) Unit banner fig-U5-5 is placed; Unit 5 G3 review and G5 review remain open for independent evaluation.


## Response snapshot

Merged origin/main into the Unit 5 repair branch, resolved the sole `specs/content/gent-401/tasks.md` conflict append-only (main's four repair rows plus this branch's Unit 5 row), and left all 14 content gates green with the branch committed.

## Outcome

- Impact: fix for GENT-401 Unit 5 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 30 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into the Unit 5 repair branch, resolved the sole `specs/content/gent-401/tasks.md` conflict append-only (main's four repair rows plus this branch's Unit 5 row), and left all 14 content gates green with the branch committed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 G3 stays unticked and unsigned; a fresh independent run still needs render and A4/360px inspection against https://textbook.com.pk.
  - G5 should check the changed Urdu (topics 5.1/5.2, MCQ options and keys, fig-U5-1 and fig-U5-3 labels and alt text); fig-U5-3.ur.svg box-title punctuation needs a browser check.
  - The merge deliberately keeps this branch's Unit 5 depth estimate (Topic 5.1 12 / total 41) over main's stale 11/40.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
