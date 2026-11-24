---
id: crew-gent-401-u07-author
title: crew author GENT-401 unit 7
stage: green
date: 2026-11-24
surface: agent
model: claude
feature: gent-401
branch: crew/gent-401-u07-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-07/index.mdx
 - docs/semester-4/gent-401/unit-07/topic-01.mdx
 - docs/semester-4/gent-401/unit-07/topic-02.mdx
 - docs/semester-4/gent-401/unit-07/unit-assessment.mdx
 - docs/semester-4/gent-401/unit-07/unit-teacher-notes.mdx
 - glossary.json
 - specs/content/gent-401/concepts/unit-07.md
 - specs/content/gent-401/coverage/unit-07.md
 - specs/content/gent-401/figures/unit-07.banner.md
 - specs/content/gent-401/figures/unit-07.md
 - specs/content/gent-401/reviews/unit-07/G2/20261124T060041498Z-gates.json
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/validate-content.txt
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/sources/texts/pitch-competition.md
 - specs/content/gent-401/sources/texts/sme-risk-review.md
 - specs/content/gent-401/sources/unit-07.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-07/fig-U7-1.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-1.svg
 - static/img/figures/gent-401/unit-07/fig-U7-2.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-2.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.svg
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-07/fig-U7-1.svg static/img/figures/gent-401/unit-07/fig-U7-2.svg static/img/figures/gent-401/unit-07/fig-U7-3.svg static/img/figures/gent-401/unit-07/fig-U7-4.svg
---

## Prompt

# Crew job gent-401-u07-author

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GENT-401 Unit 7 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-07/`.

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

Authored GENT-401 Unit 7 in English (index, two nine-part topic cycles, 10/10/5 unit assessment with a bounded answers section, teacher notes, four placed schematic SVGs with derived dark variants, coverage matrix v2, sources consulted with bound notes, concept graph v4, banner sidecar, two glossary entries, task tracker rows and G2 gate evidence). All 14 content gates pass and the figure text geometry check exits 0.

## Outcome

- ✅ Impact: author for GENT-401 Unit 7 by claude (crew job gent-401-u07-author).
- 🧪 Tests: `npm run check:content` passed in the job worktree after the G2 tracker row was added; `scripts/measure-figure-text.mjs` exited 0 on all four SVGs; `check:svg-style` passed on the committed bytes.
- 📁 Files: 32 file(s), listed above.
- 🔁 Next prompts: downstream G3 independent review and Urdu translation jobs.
- 🧠 Reflection: the draft landed at 45 reading-minutes against the 32-44 band, so the prose was tightened rather than re-baselining the budget; the final total is 44, at the top of the band.

## Handoff (for CEO and agents)

- Shipped / changed: GENT-401 Unit 7 English draft at the per-topic standard, with four placed schematics (fig-U7-3 is the required flowchart) and the governance artefacts the gates read.
- Decisions the team must respect: the seven-part pitch structure (hook, problem, solution, market, model, team, ask, next step) and the risk-matrix quadrant reading are the author's teaching devices built on OpenStax sections 7.3 and 13.7, not the book's own procedures; the unit banner (fig-U7-5) stays `prompt-only` for the illustrate job.
- Pending / next owner: G3 independent review and G4 Urdu translation, both separate jobs. The two DOAJ substitutes (`sme-risk-review`, `pitch-competition`) are read only to their abstracts, so a reviewer should hold the unit to that limit.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the shared `sources/texts/openstax-entrepreneurship.md` must be edited in place rather than duplicated per unit, because the review-evidence scope rule binds an excerpt to the units that cite its key, and a separate file would bind to every unit and invalidate accepted reviews.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS; `measure-figure-text` PASS after fixing two caption overlaps and three text spills.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): have the authoring skill state the reading-minutes band arithmetic on first draft, since the overrun was only found after a full word count.
