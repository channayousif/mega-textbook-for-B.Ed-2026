---
id: crew-gcce-400-u04-author
title: crew author GCCE-400 unit 4
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u04-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-04/index.mdx
 - docs/semester-4/gcce-400/unit-04/topic-01.mdx
 - docs/semester-4/gcce-400/unit-04/topic-02.mdx
 - docs/semester-4/gcce-400/unit-04/unit-assessment.mdx
 - docs/semester-4/gcce-400/unit-04/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/gcce-400/crew-gcce-400-u04-author.green.prompt.md
 - specs/content/gcce-400/concepts/unit-04.md
 - specs/content/gcce-400/coverage/unit-04.md
 - specs/content/gcce-400/figures/unit-04.banner.md
 - specs/content/gcce-400/figures/unit-04.md
 - specs/content/gcce-400/reviews/unit-04/G2/20261122T114158475Z-gates.json
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261122T114158475Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261122T114158475Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261122T114158475Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261122T114158475Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261122T114158475Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261122T114158475Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261122T114158475Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-04/G2/logs-20261122T114158475Z/validate-content.txt
 - specs/content/gcce-400/sources/texts/bala-2013-khudai-khidmatgar.md
 - specs/content/gcce-400/sources/texts/epa-2026-participation.md
 - specs/content/gcce-400/sources/texts/hasan-2006-orangi.md
 - specs/content/gcce-400/sources/texts/macqueen-2001-community.md
 - specs/content/gcce-400/sources/texts/oecd-2011-social-cohesion.md
 - specs/content/gcce-400/sources/texts/retallick-2005-smc.md
 - specs/content/gcce-400/sources/unit-04.md
 - specs/content/gcce-400/tasks.md
 - static/img/figures/gcce-400/unit-04/fig-U4-1.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-1.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-2.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-2.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-3.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-3.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-4.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-4.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-5.dark.svg
 - static/img/figures/gcce-400/unit-04/fig-U4-5.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u04-author

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GCCE-400 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-04/`.

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

Completed GCCE-400 Unit 4 by rendering and placing its five schematic figures, recording the G2 gate evidence, and ticking the tracker row, so all 14 content gates pass.

## Outcome

- Impact: author for GCCE-400 Unit 4 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree.
- Files: 38 file(s) listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed GCCE-400 Unit 4 (English) with the per-topic unit, five placed schematic SVGs and dark variants, G2 gate evidence, and the tracker rows.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - The five SVGs were authored directly by Claude (Codex was not invoked for this run); each passed optimize:figure and measure-figure-text, and dark variants were derived with figures:variants.
  - Banner fig-U4-6 remains prompt-only for the illustrate job, and no .ur.svg figures exist yet because the Urdu mirror is a separate job.
  - G3 en-review stays open; the tracker note asks the reviewer to confirm the youniss-levine-2009 title-level use, the oecd-2011-social-cohesion definition, and constitutional currency of Articles 16, 19 and 25.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
