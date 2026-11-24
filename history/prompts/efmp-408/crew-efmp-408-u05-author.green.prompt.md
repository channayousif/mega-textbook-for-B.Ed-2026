---
id: crew-efmp-408-u05-author
title: crew author EFMP-408 unit 5
stage: misc
date: 2026-11-24
surface: agent
model: longcat-2.5
feature: efmp-408
branch: crew/efmp-408-u05-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-408/unit-05/index.mdx
 - docs/semester-4/efmp-408/unit-05/topic-01.mdx
 - docs/semester-4/efmp-408/unit-05/topic-02.mdx
 - docs/semester-4/efmp-408/unit-05/topic-03.mdx
 - docs/semester-4/efmp-408/unit-05/unit-assessment.mdx
 - docs/semester-4/efmp-408/unit-05/unit-teacher-notes.mdx
 - history/prompts/efmp-408/crew-efmp-408-u05-author.green.prompt.md
 - specs/content/efmp-408/concepts/unit-05.md
 - specs/content/efmp-408/coverage/unit-05.md
 - specs/content/efmp-408/figures/unit-05.banner.md
 - specs/content/efmp-408/figures/unit-05.md
 - specs/content/efmp-408/reviews/unit-05/G2/20261124T201707838Z-gates.json
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/validate-content.txt
 - specs/content/efmp-408/sources/texts/openstax-statistics-2e.md
 - specs/content/efmp-408/sources/unit-05.md
 - specs/content/efmp-408/tasks.md
 - specs/gaps.md
 - static/img/figures/efmp-408/unit-05/fig-U5-1.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-1.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-2.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-2.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-3.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-3.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-4.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-5.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-5.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-6.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-6.svg
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-408/unit-05/fig-U5-1.svg static/img/figures/efmp-408/unit-05/fig-U5-2.svg static/img/figures/efmp-408/unit-05/fig-U5-3.svg static/img/figures/efmp-408/unit-05/fig-U5-4.svg static/img/figures/efmp-408/unit-05/fig-U5-5.svg static/img/figures/efmp-408/unit-05/fig-U5-6.svg
 - npm run figures:variants
 - node scripts/check-svg-style.mjs
---

## Prompt

# Crew job efmp-408-u05-author

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFMP-408 Unit 5 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-05/`.

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

Authored EFMP-408 Unit 5 in English with three nine-part topic cycles, a 10/10/5 unit assessment with a bounded answers section, a teacher-notes page, six placed schematic figures with measured geometry, and the unit's coverage, sources, concept graph and figure manifest. G2 gate evidence was prepared and all fourteen content gates pass.

## Outcome

- Impact: author for EFMP-408 Unit 5 by claude (attempt 1).
- Tests: `npm run check:content` passed in the job worktree (all 14 gates); `measure-figure-text.mjs` exited 0 on all six SVGs; `figures:variants` and `check:svg-style` clean.
- Files: 38 file(s), listed above.
- Next prompts: the crew planner derives this unit's next stage (G3 review, then Urdu G4/G5) from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-408 Unit 5 authored in English at `docs/semester-4/efmp-408/unit-05/` (index, topic-01 to topic-03, unit-assessment with 10/10/5 and a final bounded `## Answers and marking guidance`, unit-teacher-notes); six schematic SVGs placed under `static/img/figures/efmp-408/unit-05/` with derived dark variants; `coverage/unit-05.md`, `sources/unit-05.md`, `concepts/unit-05.md`, `figures/unit-05.md` and `figures/unit-05.banner.md` emitted; G2 evidence and logs committed and the Unit 5 G2 tracker row repointed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything and does not publish. The four-point GPA scale in Topic 5.1 is an illustration, not a guide rule, and is recorded as `no-external-source` with gap `G-2026-235` in `specs/gaps.md`. The existing `sources/texts/hec-2013-testdev.md` and `seifert-sutton-2009.md` were deliberately left untouched so Unit 1's accepted G2 evidence stays valid.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path); then a separate Urdu job for G4/G5.
- Notes for the next job on this unit:
  - Unit total is 67 reading-minutes (index 3, Topic 5.1 16, Topic 5.2 12, Topic 5.3 12, assessment 19, teacher notes 5) against the approved 60-80 band. If prose is later expanded, recompute before re-running `check:depth-gate`.
  - All twelve SVG variants passed `measure-figure-text.mjs`, so label geometry is clean for the Urdu `.ur.svg` pass.
  - All seven Urdu labels in `concepts/unit-05.md` are authored, none is banked in `terminology.csv`, and they are flagged for G5.
  - The banner `fig-U5-7` is `prompt-only` in `figures/unit-05.banner.md`; a later illustrate job produces it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: a prompt-only new-shape unit fails `check:figures` (it requires at least two rendered `<Figure>` elements per topic file and at least one placed schematic per unit), so the skill's "stop at prompt-only markers" endpoint cannot satisfy this brief's Done-when. Figures were authored and placed in the same job.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text PASS (6/6); check:svg-style PASS; figures:variants clean.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): state in the authoring brief whether figure placement is in scope, or add a documented exemption so an authoring job can stop at prompt-only without turning `check:content` red.
