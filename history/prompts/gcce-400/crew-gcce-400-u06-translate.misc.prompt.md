---
id: crew-gcce-400-u06-translate
title: crew translate GCCE-400 unit 6
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: gcce-400
branch: crew/gcce-400-u06-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gcce-400/crew-gcce-400-u06-translate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-06/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-06/unit-teacher-notes.mdx
  - specs/content/gcce-400/tasks.md
  - specs/content/gcce-400/reviews/unit-06/G2/20261122T161030644Z-gates.json
  - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T161030644Z/check-bloom-bands.txt
  - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T161030644Z/check-concept-graph.txt
  - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T161030644Z/check-depth-gate.txt
  - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T161030644Z/check-docs-sync.txt
  - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T161030644Z/check-figures.txt
  - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T161030644Z/check-no-answer-keys.txt
  - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T161030644Z/check-no-em-dash.txt
  - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T161030644Z/validate-content.txt
  - specs/content/gcce-400/translations/unit-06/check-content-parity.txt
  - specs/content/gcce-400/translations/unit-06/handoff.md
  - static/img/figures/gcce-400/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-1.ur.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-2.ur.dark.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-2.ur.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-3.ur.dark.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-3.ur.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-4.ur.dark.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-4.ur.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-5.ur.dark.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-5.ur.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-6.ur.dark.svg
  - static/img/figures/gcce-400/unit-06/fig-U6-6.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job gcce-400-u06-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GCCE-400 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-06/`.

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
- (gcce-400-u06-author-conflict1, fix, claude_crew) Unit 6 G3 en-review stays open; the reviewer should confirm the CoE handbook attribution (rm.coe.int returns HTTP 403 here, use the Internet Archive snapshot), the Shair et al. (2022) figures and the Pakistani examples in `specs/content/gcce-400/sources/unit-06.md`.
- (gcce-400-u06-author-conflict1, fix, claude_crew) Banner `fig-U6-7` is prompt-only and no `.ur.svg` exists yet (Urdu mirror is a separate job); the seven new glossary entries' Urdu definitions are authored and need G5 checking.
- (gcce-400-u06-author-conflict1, fix, claude_crew) In the tasks.md conflict the branch's combined Unit 1 + Unit 6 reading-estimate paragraph was consolidated into a Unit 6-only paragraph so main's Unit 1 and general sentences stay verbatim; check that wording if the tracker is regenerated.
- (gcce-400-u06-author, author, claude_crew) Branch base is 4823107ca; origin/main advanced to 430e60570 (Unit 2 merged) while this job ran, so merge main before opening the PR (a plain `git diff origin/main..HEAD` shows Unit 2 as deleted).
- (gcce-400-u06-author, author, claude_crew) G3 en-review stays open; the reviewer should confirm the CoE handbook attribution (read via an Internet Archive snapshot because rm.coe.int returns HTTP 403 here), the Shair et al. (2022) figures and the Pakistani examples in `specs/content/gcce-400/sources/unit-06.md`.

## Response snapshot

Translated GCCE-400 Unit 6 into its complete Urdu mirror at G4, verified localized SVG schematics and variants, refreshed stale G2 gate evidence after adding translation handoff files, verified structural parity across all 6 files, and passed all 14 content gates cleanly.

## Outcome

- Impact: translate for GCCE-400 Unit 6 by agy.
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: Adding translation handoff files binds to the unit's G2 input manifest, requiring prepare-gate-evidence refresh.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GCCE-400 Unit 6 into its complete Urdu mirror at G4, verified localized SVG schematics and variants, refreshed G2 gate evidence for Unit 6, and passed all 14 content gates cleanly.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `translation_status` remains `draft` across English and Urdu indices pending independent G5 review.
  - `render-inspect.mjs` was omitted per crew brief resource restrictions; G5 should verify Nastaliq shaping at 360px and A4 print layout.
  - Eight authored concept labels and proposed technology terms are documented in `specs/content/gcce-400/translations/unit-06/handoff.md`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
