---
id: crew-gpks-402-u02-author
title: crew author GPKS-402 unit 2
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u02-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gpks-402/unit-02/index.mdx
  - docs/semester-2/gpks-402/unit-02/topic-01.mdx
  - docs/semester-2/gpks-402/unit-02/topic-02.mdx
  - docs/semester-2/gpks-402/unit-02/unit-assessment.mdx
  - docs/semester-2/gpks-402/unit-02/unit-teacher-notes.mdx
  - specs/content/gpks-402/concepts/unit-02.md
  - specs/content/gpks-402/coverage/unit-02.md
  - specs/content/gpks-402/figures/unit-02.md
  - specs/content/gpks-402/reviews/unit-02/G2/20261028T094524432Z-gates.json
  - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-bloom-bands.txt
  - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-concept-graph.txt
  - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-depth-gate.txt
  - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-docs-sync.txt
  - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-figures.txt
  - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-no-answer-keys.txt
  - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-no-em-dash.txt
  - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/validate-content.txt
  - specs/content/gpks-402/sources/unit-02.md
  - specs/content/gpks-402/tasks.md
  - static/img/figures/gpks-402/unit-02/fig-U2-1.dark.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-1.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-2.dark.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-2.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-3.dark.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-3.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-4.dark.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-4.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job gpks-402-u02-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GPKS-402 Unit 2 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-02/`.

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

- Authored GPKS-402 Unit 2 ("Reform Movements and the Pakistan Movement") according to the Spec 008 per-topic unit standard and style guide v4.4:
  - `docs/semester-2/gpks-402/unit-02/index.mdx`: unit orientation, learning outcomes, prerequisites, topic links.
  - `docs/semester-2/gpks-402/unit-02/topic-01.mdx`: 9-part learning cycle on 18th/19th century Muslim reform (Shah Waliullah, Sir Syed Ahmad Khan, Aligarh Movement, Muslim intelligentsia; U2-01..U2-03).
  - `docs/semester-2/gpks-402/unit-02/topic-02.mdx`: 9-part learning cycle on the Pakistan Movement (All-India Muslim League, separate electorates, Lucknow Pact, Fourteen Points, Allahabad Address, Lahore Resolution, 1945–46 elections, partition and independence; U2-04..U2-06).
  - `docs/semester-2/gpks-402/unit-02/unit-assessment.mdx`: unit summary, 10 MCQs (Remember–Apply), 10 RRQs (Understand–Analyze), 5 ERQs (Analyze–Create), and bounded final `## Answers and marking guidance` with full answers, mark schemes, and analytic rubrics.
  - `docs/semester-2/gpks-402/unit-02/unit-teacher-notes.mdx`: pedagogical strategies, sequencing, addressing trainee misconceptions, practical work.
  - Governance files committed: `coverage/unit-02.md` (v2), `sources/unit-02.md` (4 sources, 2 open access exceeding floor of 1), `figures/unit-02.md` (4 placed figures), `concepts/unit-02.md` (v4.0 DAG with 10 concepts).
  - Four hand-authored schematic SVGs placed under `static/img/figures/gpks-402/unit-02/` (timeline, diagram, flowchart, table) with dark variants generated.
  - Deterministic gate evidence prepared with `prepare-gate-evidence.mjs` and recorded in `tasks.md`.
  - All 13 content gates in `npm run check:content` pass with 0 errors.

## Outcome

- ✅ Impact: GPKS-402 Unit 2 fully authored, grounded in approved sources, with placed schematics and clean G2 gate evidence.
- 🧪 Tests: `npm run check:content` passed (13/13 gates).
- 📁 Files: 5 MDX unit files, 4 governance files, 8 SVG assets (4 light, 4 dark), G2 review evidence, tasks.md.
- 🔁 Next prompts: Next jobs can proceed to G3 independent English review or G4 Urdu translation.
- 🧠 Reflection: Comprehensive upfront alignment with gate rules and palette tokens enabled all 13 gates to pass cleanly on the first full iteration.

## Handoff (for CEO and agents)

- Shipped / changed: GPKS-402 Unit 2 English content, governance artefacts, 4 SVG figures with dark variants, and G2 gate evidence.
- Decisions the team must respect: Content is grounded in approved sources (`rabbani-pak-studies`, `hamid-khan-const`, `hassan-2020-two-nation`, `khan-khan-2020-aligarh`); reading minutes total 77 min (within approved 65–85 band).
- Pending / next owner: Independent G3 reviewer for English review; G4 Urdu translator for Urdu mirror.
- Paperclip issues affected: null.

## Evaluation notes (flywheel)

- Failure modes observed: None; clean gate pass.
- Graders run and results (PASS/FAIL): `check:content` 13/13 PASS.
- Prompt variant (if applicable): crew-gpks-402-u02-author.
- Next experiment (smallest change to try): None.
