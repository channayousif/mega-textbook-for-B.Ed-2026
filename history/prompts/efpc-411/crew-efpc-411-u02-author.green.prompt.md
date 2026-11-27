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
 - specs/content/efpc-411/reviews/unit-02/G2/20261127T021038913Z-gates.json
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021038913Z/check-bloom-bands.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021038913Z/check-concept-graph.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021038913Z/check-depth-gate.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021038913Z/check-docs-sync.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021038913Z/check-figures.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021038913Z/check-no-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021038913Z/check-no-em-dash.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261127T021038913Z/validate-content.txt
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

Authored EFPC-411 Unit 2 (School Placement Observation Tasks) from its approved content-spec: an index opening, four nine-part topic cycles, the 10/10/5 unit assessment with a bounded answers section, the coverage, sources, concept graph and figure manifest artifacts, and eight hand-authored schematic SVGs with derived dark variants. Recorded G2 gate evidence and pointed the tracker row at it.

## Outcome

- Impact: author for EFPC-411 Unit 2 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the branch was committed.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFPC-411 Unit 2 English draft with placed schematic figures, governance artifacts and G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything. English only; the Urdu mirror is a separate job.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Banner figure fig-U2-9 is prompt-only in `specs/content/efpc-411/figures/unit-02.banner.md`, ready for the illustration pipeline.
  - `mcburney-fry` and `elt-methods-texts` are declared under `## Unverifiable sources` in `sources/unit-02.md`; both are print-only and their scope matches the coverage matrix.
  - `est_reading_minutes` was set at about 200 wpm (the top of the skill's 180-200 band, and near the corpus median of 189) to land the unit total at 59 inside the approved 44-64 band; the raw total at 180 wpm would be 66.
  - The bound note for `hec-2013-edupsy` is new at `sources/texts/hec-2013-edupsy.md`; its evidence notes cite unit and theme names rather than page numbers because the guide's printed page numbering does not match the PDF pagination.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
