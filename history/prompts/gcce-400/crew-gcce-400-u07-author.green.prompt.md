---
id: crew-gcce-400-u07-author
title: crew author GCCE-400 unit 7
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u07-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-07/index.mdx
 - docs/semester-4/gcce-400/unit-07/topic-01.mdx
 - docs/semester-4/gcce-400/unit-07/topic-02.mdx
 - docs/semester-4/gcce-400/unit-07/topic-03.mdx
 - docs/semester-4/gcce-400/unit-07/topic-04.mdx
 - docs/semester-4/gcce-400/unit-07/unit-assessment.mdx
 - docs/semester-4/gcce-400/unit-07/unit-teacher-notes.mdx
 - glossary.json
 - specs/content/gcce-400/concepts/unit-07.md
 - specs/content/gcce-400/coverage/unit-07.md
 - specs/content/gcce-400/figures/unit-07.banner.md
 - specs/content/gcce-400/figures/unit-07.md
 - specs/content/gcce-400/reviews/unit-07/G2/20261122T132732300Z-gates.json
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/validate-content.txt
 - specs/content/gcce-400/sources/texts/constitution-pakistan.md
 - specs/content/gcce-400/sources/texts/openstax-sociology-3e.md
 - specs/content/gcce-400/sources/texts/pbs-census-2023.md
 - specs/content/gcce-400/sources/unit-07.md
 - specs/content/gcce-400/tasks.md
 - static/img/figures/gcce-400/unit-07/fig-U7-1.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-1.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-2.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-2.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-3.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-3.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-4.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-4.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-5.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-5.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-6.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-6.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-7.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-7.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-8.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-8.svg
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs static/img/figures/gcce-400/unit-07/*.svg
---

## Prompt

# Crew job gcce-400-u07-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GCCE-400 Unit 7 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-07/`.

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

Authored GCCE-400 Unit 7 in English (four topics, 10/10/5 assessment, teacher notes, eight placed schematic SVGs, banner prompt, coverage/sources/concepts/manifests, six new glossary terms) with G2 evidence and tracker row, and check:content fully green.

## Outcome

- Impact: author for GCCE-400 Unit 7 by claude (attempt 1).
- Tests: npm run check:content passed (14 of 14 gates); measure-figure-text exited 0 on all eight figures and their dark variants.
- Files: 44 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GCCE-400 Unit 7 in English (four topics, 10/10/5 assessment, teacher notes, eight placed schematic SVGs with dark variants, banner prompt, coverage/sources/concepts/manifests, six new glossary terms) with G2 evidence and tracker row, and check:content fully green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; nothing in this branch certifies review or publication. No em dash appears anywhere in the authored prose or SVG text nodes.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - glossary.json gained six terms appended at the end; expect merge conflicts if sibling jobs also append there.
  - The census narrative gives a national male-female literacy gap of 16.16 percentage points while its own summary table shows 68.00 and 52.84; the unit quotes the table values and records the discrepancy in sources/unit-07.md.
  - kymlicka-norman-2000 and youniss-levine-2009 are print-only and declared under `## Unverifiable sources`; no page or finding from either is claimed.
  - course-overview.mdx still mentions only Unit 1 (left alone because editing it would make every unit's G2 evidence out of date); no .ur.svg yet; banner fig-U7-9 is prompt-only for the illustrate job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: the figure gate compares each SVG `<desc>` byte-for-byte with the carrier alt, so a paraphrased alt fails; the geometry check caught one 12px caption running 41.5px past the viewBox. Both were fixed by editing the SVG, not the alt.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text PASS on 16 files.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
