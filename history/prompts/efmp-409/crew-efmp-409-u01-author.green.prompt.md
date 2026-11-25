---
id: crew-efmp-409-u01-author
title: crew author EFMP-409 unit 1
stage: misc
date: 2026-11-25
surface: agent
model: claude
feature: efmp-409
branch: crew/efmp-409-u01-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - catalog/course-guides.json
 - docs/semester-4/efmp-409/_category_.json
 - docs/semester-4/efmp-409/course-overview.mdx
 - docs/semester-4/efmp-409/unit-01/index.mdx
 - docs/semester-4/efmp-409/unit-01/topic-01.mdx
 - docs/semester-4/efmp-409/unit-01/topic-02.mdx
 - docs/semester-4/efmp-409/unit-01/unit-assessment.mdx
 - docs/semester-4/efmp-409/unit-01/unit-teacher-notes.mdx
 - specs/content/efmp-409/concepts/unit-01.md
 - specs/content/efmp-409/coverage/unit-01.md
 - specs/content/efmp-409/figures/unit-01.banner.md
 - specs/content/efmp-409/figures/unit-01.md
 - specs/content/efmp-409/reviews/unit-01/G2/20261125T022045316Z-gates.json
 - specs/content/efmp-409/reviews/unit-01/G2/logs-20261125T022045316Z/check-bloom-bands.txt
 - specs/content/efmp-409/reviews/unit-01/G2/logs-20261125T022045316Z/check-concept-graph.txt
 - specs/content/efmp-409/reviews/unit-01/G2/logs-20261125T022045316Z/check-depth-gate.txt
 - specs/content/efmp-409/reviews/unit-01/G2/logs-20261125T022045316Z/check-docs-sync.txt
 - specs/content/efmp-409/reviews/unit-01/G2/logs-20261125T022045316Z/check-figures.txt
 - specs/content/efmp-409/reviews/unit-01/G2/logs-20261125T022045316Z/check-no-answer-keys.txt
 - specs/content/efmp-409/reviews/unit-01/G2/logs-20261125T022045316Z/check-no-em-dash.txt
 - specs/content/efmp-409/reviews/unit-01/G2/logs-20261125T022045316Z/validate-content.txt
 - specs/content/efmp-409/sources/texts/etymonline-education.md
 - specs/content/efmp-409/sources/texts/hec-2013-foundations.md
 - specs/content/efmp-409/sources/texts/nep-2009.md
 - specs/content/efmp-409/sources/texts/openstax-philosophy.md
 - specs/content/efmp-409/sources/texts/qmmb-jinnah-1947.md
 - specs/content/efmp-409/sources/texts/quran-translation.md
 - specs/content/efmp-409/sources/texts/sep-curren-education.md
 - specs/content/efmp-409/sources/texts/susanti-2023-tarbiyah.md
 - specs/content/efmp-409/sources/unit-01.md
 - specs/content/efmp-409/tasks.md
 - static/guides/semester-4/efmp-409.pdf
 - static/img/figures/efmp-409/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-1.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-2.dark.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-2.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-3.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-4.dark.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u01-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFMP-409 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it). This course has no course-overview.mdx yet: write it as part of this commit, modelled on docs/semester-3/gicp-400/course-overview.mdx, so later author jobs and the course's G2 evidence can bind it.

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-01/`.

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

Authored EFMP-409 Unit 1 (two topics, 10/10/5 assessment, teacher notes, four placed SVG figures) with its course overview, catalog guide entry, sources, coverage, concepts, tracker and G2 evidence, all content gates green.

## Outcome

- Impact: author for EFMP-409 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 40 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFMP-409 Unit 1 (two topics, 10/10/5 assessment, teacher notes, four placed SVG figures) with its course overview, catalog guide entry, sources, coverage, concepts, tracker and G2 evidence, all content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The G3 reviewer should have a qualified scholar check the Islamic material in Topic 1.1 (Qur'an 96:1-5 and 39:9; tarbiyah, ta'lim, ta'dib with the al-Attas attribution), per content-spec drafting note 8.
  - The Jinnah 1947 wording comes from the official QMMB quotes page, because the PIE scan of the conference proceedings has no text layer. The banner fig-U1-5 is still prompt-only, and the concept labels in Urdu are authored and need G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
