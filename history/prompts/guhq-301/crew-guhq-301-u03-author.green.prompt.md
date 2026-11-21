---
id: crew-guhq-301-u03-author
title: crew author GUHQ-301 unit 3
stage: misc
date: 2026-11-21
surface: agent
model: opencode
feature: guhq-301
branch: crew/guhq-301-u03-author
user: crew
command: crew author
labels: ["crew", "opencode", "author"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/guhq-301/unit-03/index.mdx
 - docs/semester-3/guhq-301/unit-03/topic-01.mdx
 - docs/semester-3/guhq-301/unit-03/topic-02.mdx
 - docs/semester-3/guhq-301/unit-03/unit-assessment.mdx
 - history/prompts/guhq-301/crew-guhq-301-u03-author.green.prompt.md
 - specs/content/guhq-301/concepts/unit-03.md
 - specs/content/guhq-301/coverage/unit-03.md
 - specs/content/guhq-301/figures/unit-03.banner.md
 - specs/content/guhq-301/figures/unit-03.md
 - specs/content/guhq-301/reviews/unit-03/G2/20261121T203610749Z-gates.json
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261121T203610749Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261121T203610749Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261121T203610749Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261121T203610749Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261121T203610749Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261121T203610749Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261121T203610749Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261121T203610749Z/validate-content.txt
 - specs/content/guhq-301/sources/texts/dukes-2010-treebank.md
 - specs/content/guhq-301/sources/unit-03.md
 - specs/content/guhq-301/tasks.md
 - static/img/figures/guhq-301/unit-03/fig-U3-1.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-1.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-2.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-2.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-3.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-3.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-4.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u03-author

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GUHQ-301 Unit 3 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Authored GUHQ-301 Unit 3 (Quranic Syntax and Sentence Structure) in English with two topic cycles, a 10/10/5 assessment, four placed schematic SVGs, full governance artefacts, tracker rows and G2 gate evidence.

## Outcome

- Impact: author for GUHQ-301 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 29 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GUHQ-301 Unit 3 (Quranic Syntax and Sentence Structure) in English with two topic cycles, a 10/10/5 assessment, four placed schematic SVGs, full governance artefacts, tracker rows and G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 and the Urdu mirror remain open; the Urdu job needs `.ur.svg` mirrors for fig-U3-1/2/3/4 and a G5 check of the eight authored concept labels. Banner fig-U3-5 is still `prompt-only` for the illustrate job.
  - The "passive is common" claim rests on four counted examples, not a corpus frequency count, and is flagged in `sources/unit-03.md` for the G3 religious-content reviewer.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
