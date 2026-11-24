---
id: crew-efmp-408-u04-author
title: crew author EFMP-408 unit 4
stage: misc
date: 2026-11-24
surface: agent
model: claude
feature: efmp-408
branch: crew/efmp-408-u04-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-408/unit-04/index.mdx
 - docs/semester-4/efmp-408/unit-04/topic-01.mdx
 - docs/semester-4/efmp-408/unit-04/topic-02.mdx
 - docs/semester-4/efmp-408/unit-04/topic-03.mdx
 - docs/semester-4/efmp-408/unit-04/unit-assessment.mdx
 - docs/semester-4/efmp-408/unit-04/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/efmp-408/crew-efmp-408-u04-author.green.prompt.md
 - specs/content/efmp-408/concepts/unit-04.md
 - specs/content/efmp-408/coverage/unit-04.md
 - specs/content/efmp-408/figures/unit-04.banner.md
 - specs/content/efmp-408/figures/unit-04.md
 - specs/content/efmp-408/reviews/unit-01/G2/20261124T184808974Z-gates.json
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184808974Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184808974Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184808974Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184808974Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184808974Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184808974Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184808974Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184808974Z/validate-content.txt
 - specs/content/efmp-408/reviews/unit-04/G2/20261124T184351072Z-gates.json
 - specs/content/efmp-408/reviews/unit-04/G2/logs-20261124T184351072Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-04/G2/logs-20261124T184351072Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-04/G2/logs-20261124T184351072Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-04/G2/logs-20261124T184351072Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-04/G2/logs-20261124T184351072Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-04/G2/logs-20261124T184351072Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-04/G2/logs-20261124T184351072Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-04/G2/logs-20261124T184351072Z/validate-content.txt
 - specs/content/efmp-408/sources/texts/hec-2013-classroom-assessment.md
 - specs/content/efmp-408/sources/texts/seifert-sutton-2009.md
 - specs/content/efmp-408/sources/unit-04.md
 - specs/content/efmp-408/tasks.md
 - static/img/figures/efmp-408/unit-04/fig-U4-1.dark.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-1.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-2.dark.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-2.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-3.dark.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-3.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-5.dark.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-5.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-6.dark.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-6.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-7.dark.svg
 - static/img/figures/efmp-408/unit-04/fig-U4-7.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u04-author

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFMP-408 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-04/`.

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

Authored EFMP-408 Unit 4 in English from the approved content-spec: a unit opening, three nine-part topic cycles, a 10/10/5 unit assessment with a bounded answers section, teacher notes, six placed schematic SVGs with derived dark variants, and the full governance set (coverage matrix, sources list with bound evidence notes, concept graph, figure manifest and banner sidecar). Recorded G2 gate evidence and left all fourteen content gates green.

## Outcome

- ✅ Impact: author EFMP-408 Unit 4 by claude (attempt 1).
- 🧪 Tests: npm run check:content passed (14/14 content gates); measure-figure-text exited 0 on all twelve light and dark SVGs.
- 📁 Files: 46 file(s), listed above.
- 🔁 Next prompts: the crew planner derives the unit's next stage from main after merge.
- 🧠 Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-408 Unit 4 English draft at the per-topic standard, with six placed schematic figures (fig-U4-3 is the required flowchart) and the unit banner `fig-U4-4` left prompt-only for the illustrate job.
- Decisions the team must respect: the unit is English-only at `translation_status: draft`; G3/G5 stay open and no review is certified. The shared Seifert and Sutton evidence note gained its Unit 4 use, which invalidated Unit 1's accepted G2 input manifest, so Unit 1's G2 evidence was refreshed and its tracker row repointed.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path). Next unit jobs: G3 independent review, then the Urdu mirror.
- Notes for the next job on this unit:
  - All twelve SVG variants passed `measure-figure-text.mjs` with 0 errors, so label geometry is clean for translation.
  - The unit's Urdu concept labels are authored; `Rubric`, `Portfolio Assessment`, `Peer Assessment` and `Self-Assessment` are banked in `terminology.csv`, the rest need G5 review.
  - The banner `fig-U4-4` is prompt-only; the illustrate job should generate it before the unit is presented as fully illustrated.

## Evaluation notes (flywheel)

- Failure modes observed: the first draft omitted the `## A real classroom situation` heading in all three topic files and used a 206-character assessment description; both were caught by `check:depth-gate` and `validate:content` and fixed before the evidence run.
- Graders run and results (PASS/FAIL): check:content PASS (14/14).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): none.
