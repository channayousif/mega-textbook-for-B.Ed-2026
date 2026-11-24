---
id: crew-gent-401-u02-author-conflict1
title: crew fix GENT-401 unit 2
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u02-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-02/index.mdx
 - docs/semester-4/gent-401/unit-02/topic-01.mdx
 - docs/semester-4/gent-401/unit-02/topic-02.mdx
 - docs/semester-4/gent-401/unit-02/unit-assessment.mdx
 - docs/semester-4/gent-401/unit-02/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/gent-401/crew-gent-401-u02-author-conflict1.misc.prompt.md
 - history/prompts/gent-401/crew-gent-401-u02-author.green.prompt.md
 - specs/content/gent-401/concepts/unit-02.md
 - specs/content/gent-401/coverage/unit-02.md
 - specs/content/gent-401/figures/unit-02.banner.md
 - specs/content/gent-401/figures/unit-02.md
 - specs/content/gent-401/reviews/unit-02/G2/20261124T045217007Z-gates.json
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/validate-content.txt
 - specs/content/gent-401/sources/texts/qamar-2020-social.md
 - specs/content/gent-401/sources/unit-02.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-02/fig-U2-1.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-1.svg
 - static/img/figures/gent-401/unit-02/fig-U2-2.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-2.svg
 - static/img/figures/gent-401/unit-02/fig-U2-3.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-3.svg
 - static/img/figures/gent-401/unit-02/fig-U2-4.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u02-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u02-author conflicts with main (specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENT-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-02/`.

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
- (gent-401-u02-author, author, claude_crew) G3 reviewer should confirm the `qamar-2020-social` row against its OpenAlex record W3118924195 (the DOI host `ojstest.umt.edu.pk` did not resolve on 2026-11-24) and the `butler-iea` edition year (spec says 2020).
- (gent-401-u02-author, author, claude_crew) `mellor-2009` is declared under `## Unverifiable sources` and backs only general background; no page or wording is claimed.
- (gent-401-u02-author, author, claude_crew) figures are placed English-only (no `.ur.svg`); banner `fig-U2-5` is a prompt-only row in `figures/unit-02.banner.md` for the illustrate job, and the Urdu mirror is a separate G4 job.


## Response snapshot

Merged origin/main into crew/gent-401-u02-author, resolved the glossary.json and tasks.md conflicts by keeping both sides' entries (main first, no duplicates), and left npm run check:content fully green.

## Outcome

- Impact: fix for GENT-401 Unit 2 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gent-401-u02-author, resolved the glossary.json and tasks.md conflicts by keeping both sides' entries (main first, no duplicates), and left npm run check:content fully green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 2 G2 evidence at reviews/unit-02/G2/20261124T045217007Z-gates.json is still fresh at the merge commit; no re-run needed.
  - Unit 2 remains English-only (no `.ur.svg`, no Urdu mirror); banner `fig-U2-5` is still a prompt-only row for the illustrate job, and G3/G5 are unticked.
  - glossary.json will keep conflicting for every sibling gent-401 job; the fix is always main's entries first, then the branch's, with no duplicate terms.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
