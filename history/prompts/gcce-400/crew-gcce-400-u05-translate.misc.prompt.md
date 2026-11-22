---
id: crew-gcce-400-u05-translate
title: crew translate GCCE-400 unit 5
stage: misc
date: 2026-11-22
surface: agent
model: claude_crew
feature: gcce-400
branch: crew/gcce-400-u05-translate
user: crew
command: crew translate
labels: ["crew", "claude_crew", "translate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gcce-400/crew-gcce-400-u05-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/unit-teacher-notes.mdx
 - specs/content/gcce-400/figures/unit-05.md
 - specs/content/gcce-400/reviews/unit-05/G2/20261122T152925023Z-gates.json
 - specs/content/gcce-400/reviews/unit-05/G2/20261122T154535059Z-gates.json
 - specs/content/gcce-400/reviews/unit-05/G2/20261122T154837329Z-gates.json
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/validate-content.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154535059Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154535059Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154535059Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154535059Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154535059Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154535059Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154535059Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154535059Z/validate-content.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154837329Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154837329Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154837329Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154837329Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154837329Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154837329Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154837329Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T154837329Z/validate-content.txt
 - specs/content/gcce-400/tasks.md
 - specs/content/gcce-400/translations/unit-05/check-content-parity.txt
 - specs/content/gcce-400/translations/unit-05/handoff.md
 - static/img/figures/gcce-400/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-1.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-3.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-4.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u05-translate

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GCCE-400 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-05/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gcce-400-u05-author, author, agy) G3 English review and G4 Urdu translation remain open as separate jobs; banner fig-U5-7 is prompt-only for the illustrate pass.
- (gcce-400-u05-author, author, agy) Reviewers should confirm the Lawyers' Movement timeline against Batool et al. (2019) and the cited constitutional provisions against the latest text.


## Response snapshot

Translated GCCE-400 Unit 5 (Advocacy and Activism) into a complete six-file academic-plain Urdu mirror with six RTL-mirrored `.ur.svg` figures and dark twins, bank-bound key_terms, refreshed G2 evidence, a G4 tracker note and translator handoff, all committed on `crew/gcce-400-u05-translate` with translation_status left at draft.

## Outcome

- Impact: translate for GCCE-400 Unit 5 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 50 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GCCE-400 Unit 5 (Advocacy and Activism) into a complete six-file academic-plain Urdu mirror with six RTL-mirrored `.ur.svg` figures and dark twins, bank-bound key_terms, refreshed G2 evidence, a G4 tracker note and translator handoff, all committed on `crew/gcce-400-u05-translate` with translation_status left at draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G5 must inspect rendered Urdu at 360px and A4 print; `scripts/render-inspect.mjs --locale ur` was not run (brief forbids build/dev server) and the RTL table order in `fig-U5-2`/`fig-U5-4` is unverified visually.
  - Editing `specs/content/gcce-400/figures/unit-05.md` or `translations/unit-05/*` invalidates this unit's G2 evidence by construction; the next job touching them must re-run `prepare-gate-evidence.mjs` and repoint the G2 row.
  - `origin/main` advanced during this job (Unit 4 merged); `specs/content/gcce-400/tasks.md` was edited by both, so a merge conflict there is likely.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
