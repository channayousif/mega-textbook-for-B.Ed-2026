---
id: crew-guhq-301-u02-author-conflict1
title: crew fix GUHQ-301 unit 2
stage: misc
date: 2026-11-21
surface: agent
model: opencode
feature: guhq-301
branch: crew/guhq-301-u02-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/guhq-301/unit-02/index.mdx
 - docs/semester-3/guhq-301/unit-02/topic-01.mdx
 - docs/semester-3/guhq-301/unit-02/topic-02.mdx
 - docs/semester-3/guhq-301/unit-02/topic-03.mdx
 - docs/semester-3/guhq-301/unit-02/topic-04.mdx
 - docs/semester-3/guhq-301/unit-02/unit-assessment.mdx
 - history/prompts/guhq-301/crew-guhq-301-u02-author-conflict1.green.prompt.md
 - history/prompts/guhq-301/crew-guhq-301-u02-author.green.prompt.md
 - specs/content/guhq-301/concepts/unit-02.md
 - specs/content/guhq-301/coverage/unit-02.md
 - specs/content/guhq-301/figures/unit-02.md
 - specs/content/guhq-301/reviews/unit-02/G2/20261121T204849878Z-gates.json
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/validate-content.txt
 - specs/content/guhq-301/sources/texts/dukes-2010-treebank.md
 - specs/content/guhq-301/sources/unit-02.md
 - specs/content/guhq-301/tasks.md
 - static/img/figures/guhq-301/unit-02/fig-U2-1.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-1.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-2.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-2.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-3.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-3.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-4.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-4.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-5.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-5.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-6.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-6.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-7.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-7.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-8.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u02-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/guhq-301-u02-author conflicts with main (specs/content/guhq-301/sources/texts/dukes-2010-treebank.md, specs/content/guhq-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GUHQ-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-02/`.

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
- (guhq-301-u02-author, author, opencode) Urdu job needs `.ur.svg` mirrors for all eight figures (several contain Arabic) and G5 review of the twelve authored Urdu concept labels.
- (guhq-301-u02-author, author, opencode) Conjugation/pronoun/negation/preposition tables are general-knowledge grammar flagged in sources/unit-02.md for the G3 reviewer, who must also make the religious-content check in content-spec drafting note 7.


## Response snapshot

Merged origin/main into `crew/guhq-301-u02-author`, resolving the `dukes-2010-treebank.md` and `tasks.md` conflicts while keeping both sides' entries, and all 14 content gates pass.

## Outcome

- Impact: fix for GUHQ-301 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into `crew/guhq-301-u02-author`, resolving the `dukes-2010-treebank.md` and `tasks.md` conflicts while keeping both sides' entries, and all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 2 Urdu mirror still needs `.ur.svg` files for all eight figures and G5 review of the twelve authored Urdu concept labels.
  - G3 reviewer must make the religious-content check (content-spec drafting note 7) and confirm the general-knowledge conjugation/pronoun/negation/preposition tables flagged in `specs/content/guhq-301/sources/unit-02.md`.
  - The merged `dukes-2010-treebank.md` excerpt sits outside both units' G2 input manifests (`citedKeysFor` derives `dukes-2010`), so editing it does not refresh G2 evidence.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
