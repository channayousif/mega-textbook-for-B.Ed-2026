---
id: crew-efpc-411-u02-author
title: crew author EFPC-411 unit 2
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efpc-411
branch: crew/efpc-411-u02-author
user: crew
command: crew author
labels: ["crew", "claude_crew", "author"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpc-411/unit-02/index.mdx
 - docs/semester-4/efpc-411/unit-02/topic-01.mdx
 - docs/semester-4/efpc-411/unit-02/topic-02.mdx
 - docs/semester-4/efpc-411/unit-02/topic-03.mdx
 - docs/semester-4/efpc-411/unit-02/topic-04.mdx
 - docs/semester-4/efpc-411/unit-02/unit-assessment.mdx
 - history/prompts/efpc-411/crew-efpc-411-u02-author.green.prompt.md
 - specs/content/efpc-411/concepts/unit-02.md
 - specs/content/efpc-411/coverage/unit-02.md
 - specs/content/efpc-411/figures/unit-02.banner.md
 - specs/content/efpc-411/figures/unit-02.md
 - specs/content/efpc-411/reviews/unit-02/G2/20261127T021552146Z-gates.json
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021552146Z/check-bloom-bands.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021552146Z/check-concept-graph.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021552146Z/check-depth-gate.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021552146Z/check-docs-sync.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021552146Z/check-figures.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021552146Z/check-no-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021552146Z/check-no-em-dash.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021552146Z/validate-content.txt
 - specs/content/efpc-411/sources/texts/hec-2013-edupsy.md
 - specs/content/efpc-411/sources/unit-02.md
 - specs/content/efpc-411/tasks.md
 - static/img/figures/efpc-411/unit-02/fig-U2-1.dark.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-1.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-2.dark.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-2.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-3.dark.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-3.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-4.dark.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-4.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-5.dark.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-5.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-6.dark.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-6.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-7.dark.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-7.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-8.dark.svg
 - static/img/figures/efpc-411/unit-02/fig-U2-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u02-author

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFPC-411 Unit 2 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-02/`.

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

Authored EFPC-411 Unit 2 (School Placement Observation Tasks) as a four-topic per-topic English unit with a 10/10/5 assessment, eight placed schematic figures, full governance artefacts and G2 gate evidence, leaving `npm run check:content` green.

## Outcome

- Impact: author for EFPC-411 Unit 2 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFPC-411 Unit 2 (School Placement Observation Tasks) as a four-topic per-topic English unit with a 10/10/5 assessment, eight placed schematic figures, full governance artefacts and G2 gate evidence, leaving `npm run check:content` green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Banner fig-U2-9 is `prompt-only` in `figures/unit-02.banner.md`, ready for the illustrate job.
  - `mcburney-fry` and `elt-methods-texts` are print-only and declared under `## Unverifiable sources`; their scope matches the coverage matrix.
  - `est_reading_minutes` was set at ~200 wpm (top of the skill's 180-200 band) to land the unit total at 59 inside the approved 44-64 band; at 180 wpm the raw total would be 66.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
