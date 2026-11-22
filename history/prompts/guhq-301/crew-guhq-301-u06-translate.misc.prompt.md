---
id: crew-guhq-301-u06-translate
title: crew translate GUHQ-301 unit 6
stage: misc
date: 2026-11-22
surface: agent
model: gemini
feature: guhq-301
branch: crew/guhq-301-u06-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/guhq-301/crew-guhq-301-u06-translate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-06/unit-assessment.mdx
  - specs/content/guhq-301/reviews/unit-06/G2/20261122T024306853Z-gates.json
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T024306853Z/check-bloom-bands.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T024306853Z/check-concept-graph.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T024306853Z/check-depth-gate.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T024306853Z/check-docs-sync.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T024306853Z/check-figures.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T024306853Z/check-no-answer-keys.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T024306853Z/check-no-em-dash.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T024306853Z/validate-content.txt
  - specs/content/guhq-301/tasks.md
  - specs/content/guhq-301/translations/unit-06/check-content-parity.txt
  - specs/content/guhq-301/translations/unit-06/handoff.md
  - static/img/figures/guhq-301/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/guhq-301/unit-06/fig-U6-1.ur.svg
  - static/img/figures/guhq-301/unit-06/fig-U6-2.ur.dark.svg
  - static/img/figures/guhq-301/unit-06/fig-U6-2.ur.svg
  - static/img/figures/guhq-301/unit-06/fig-U6-3.ur.dark.svg
  - static/img/figures/guhq-301/unit-06/fig-U6-3.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job guhq-301-u06-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GUHQ-301 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-06/`.

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
- (guhq-301-u06-author, author, agy) Urdu job needs `.ur.svg` for all three placed schematic figures and independent G5 review for the six authored Urdu concept labels.
- (guhq-301-u06-author, author, agy) G3 review must make the religious-content check (content-spec drafting note 7); classroom scenarios and pedagogical applications are flagged as instructional models.

## Response snapshot

Translated GUHQ-301 Unit 6 into its complete Urdu mirror at G4 across three pages (index, topic-01, unit-assessment) with three RTL .ur.svg figures and their derived .ur.dark.svg variants, recorded the G4 tracker note, and verified all 14 content gates pass cleanly.

## Outcome

- Impact: translate for GUHQ-301 Unit 6 by agy.
- Tests: `npm run check:content` passed (14 of 14 content gates green) after parity verification via temporary reviewed flip.
- Files: 13 files (Urdu pages, RTL figures, derived dark variants, tasks.md, handoff and parity evidence).
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Drafted the complete three-page Urdu mirror of GUHQ-301 Unit 6, authored three localized RTL .ur.svg figures with derived dark variants, updated G4 tracker status note, and documented translation handoff and parity test output.
- Decisions the team must respect: G3/G5 remain advisory until qualified independent review; translation_status stays draft.
- Pending / next owner: crew lead / G3 and G5 reviewers.
- Notes for the next job on this unit:
  - G5 review needs to check verse meanings, honorifics, and the six authored Urdu concept labels.
  - G3 review must perform the religious-content check per content-spec drafting note 7.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): check:content PASS (14/14 gates).
- Prompt variant: crew brief v1.
- Next experiment: none.
