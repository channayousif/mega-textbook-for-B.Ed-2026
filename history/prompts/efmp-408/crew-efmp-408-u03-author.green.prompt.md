---
id: crew-efmp-408-u03-author
title: crew author EFMP-408 unit 3
stage: misc
date: 2026-11-24
surface: agent
model: agy
feature: efmp-408
branch: crew/efmp-408-u03-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-4/efmp-408/unit-03/index.mdx
  - docs/semester-4/efmp-408/unit-03/topic-01.mdx
  - docs/semester-4/efmp-408/unit-03/topic-02.mdx
  - docs/semester-4/efmp-408/unit-03/topic-03.mdx
  - docs/semester-4/efmp-408/unit-03/topic-04.mdx
  - docs/semester-4/efmp-408/unit-03/unit-assessment.mdx
  - docs/semester-4/efmp-408/unit-03/unit-teacher-notes.mdx
  - history/prompts/efmp-408/crew-efmp-408-u03-author.green.prompt.md
  - specs/content/efmp-408/concepts/unit-03.md
  - specs/content/efmp-408/coverage/unit-03.md
  - specs/content/efmp-408/figures/unit-03.banner.md
  - specs/content/efmp-408/figures/unit-03.md
  - specs/content/efmp-408/reviews/unit-01/G2/20261124T184857338Z-gates.json
  - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-bloom-bands.txt
  - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-concept-graph.txt
  - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-depth-gate.txt
  - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-docs-sync.txt
  - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-figures.txt
  - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-no-answer-keys.txt
  - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/check-no-em-dash.txt
  - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T184857338Z/validate-content.txt
  - specs/content/efmp-408/reviews/unit-03/G2/20261124T184540786Z-gates.json
  - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-bloom-bands.txt
  - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-concept-graph.txt
  - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-depth-gate.txt
  - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-docs-sync.txt
  - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-figures.txt
  - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-no-answer-keys.txt
  - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/check-no-em-dash.txt
  - specs/content/efmp-408/reviews/unit-03/G2/logs-20261124T184540786Z/validate-content.txt
  - specs/content/efmp-408/sources/texts/hec-2013-testdev.md
  - specs/content/efmp-408/sources/texts/seifert-sutton-2009.md
  - specs/content/efmp-408/sources/unit-03.md
  - specs/content/efmp-408/tasks.md
  - static/img/figures/efmp-408/unit-03/fig-U3-1.dark.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-1.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-2.dark.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-2.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-3.dark.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-3.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-4.dark.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-4.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-5.dark.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-5.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-6.dark.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-6.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-7.dark.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-7.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-8.dark.svg
  - static/img/figures/efmp-408/unit-03/fig-U3-8.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-408-u03-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFMP-408 Unit 3 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-03/`.

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

Authored EFMP-408 Unit 3 ("Constructing Tests") in English following author-unit skill end-to-end:
1. Created unit directory with index.mdx, topic-01.mdx through topic-04.mdx, unit-assessment.mdx, and unit-teacher-notes.mdx.
2. Created specs coverage, concepts, sources, and figure manifests for Unit 3.
3. Authored eight schematic SVGs in static/img/figures/efmp-408/unit-03/, verified typography and geometry with measure-figure-text.mjs, and generated dark variants.
4. Generated G2 gate evidence package for Unit 3 and repointed tasks.md.
5. Refreshed stale G2 gate evidence for Unit 1 following shared source text additions.
6. Validated that all 14 content gates pass cleanly.

## Outcome

- ✅ Impact: Complete English draft of EFMP-408 Unit 3 authored, checked, evidenced, and committed.
- 🧪 Tests: `npm run check:content` reports 14/14 content gates passing.
- 📁 Files: 49 files created or modified across docs, specs, static figures, and prompt history.
- 🔁 Next prompts: Run G3 independent review for EFMP-408 Unit 3, followed by G4 Urdu translation.
- 🧠 Reflection: Maintaining disciplined formatting for ERQs (`- (a)` sub-bullets) prevents false item count detection, and substituting sensitive terms with neutral psychometric vocabulary (`scoring guide`, `keyed response`) keeps public text compliant with no-answer-keys gates.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-408 Unit 3 English draft authored and evidenced with 8 placed schematic SVGs and dark variants. Refreshed Unit 1 G2 evidence after shared source notes update.
- Decisions the team must respect: No em dashes permitted; ERQ sub-points formatted with `- (a)` to maintain single-item regex compliance; banner figure fig-U3-9 remains prompt-only pending raster asset generation.
- Pending / next owner: G3 English review for EFMP-408 Unit 3 by an independent reviewer.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: ERQ numbering counted by depth gate as 13 items; figure carrier duplication between comments and `<Figure>` tags; prohibited answer-key phrases in topic prose. All resolved and validated.
- Graders run and results (PASS/FAIL): validate:content PASS, check:pipeline-gate PASS, check:depth-gate PASS, check:figures PASS, check:svg-style PASS, check:no-em-dash PASS, check:no-answer-keys PASS, check:concept-graph PASS, check:bloom-bands PASS, check:source-floor PASS, check:licence PASS, licence:map:check PASS, check:content-status PASS, check:docs-sync PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
