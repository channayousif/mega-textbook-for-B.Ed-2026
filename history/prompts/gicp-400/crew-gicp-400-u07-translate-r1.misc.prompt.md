---
id: crew-gicp-400-u07-translate-r1
title: crew translate GICP-400 unit 7 (round 1)
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u07-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - history/prompts/general/20261191-gicp-400-unit-07-urdu-translation.general.prompt.md
  - history/prompts/gicp-400/crew-gicp-400-u07-translate-r1.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/unit-assessment.mdx
  - specs/content/gicp-400/reviews/unit-07/G4/translation-handoff.md
  - specs/content/gicp-400/tasks.md
  - static/img/figures/gicp-400/unit-07/fig-U7-1.ur.dark.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-1.ur.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-2.ur.dark.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-2.ur.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-3.ur.dark.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-3.ur.svg
tests:
  - npm run build:content-status
  - npm run check:content
---

## Prompt

# Crew job gicp-400-u07-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u07-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-07/`.

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
- (gicp-400-u07-repair_en, repair_en, agy) The ideology strand remains pending an owner ruling before translation (G4) or final certification.
- (gicp-400-u07-repair_en, repair_en, agy) G3 tracker row is appended as advisory revise with repairs applied and remains unticked (▢) awaiting fresh round-2 independent review under ADR-0019.
- (gicp-400-u07-repair_en, repair_en, agy) All 14 content gates pass and `measure-figure-text.mjs` passes with zero errors on all modified SVG variants.
- (gicp-400-u07-translate, translate, codex) English repairs and the owner’s ideology ruling must precede translation.
- (gicp-400-u07-translate, translate, codex) English repairs and the owner’s ideology ruling must precede translation.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Completed the GICP-400 Unit 7 Urdu mirror translation at G4:
- Refined and polished the Urdu translations for `index.mdx`, `topic-01.mdx`, and `unit-assessment.mdx`, aligning with academic-plain Urdu register, fixing typos, and ensuring exact heading, component, and assessment item parity.
- Derived dark variants (`.ur.dark.svg`) for all three localised SVG figures (`fig-U7-1.ur.svg`, `fig-U7-2.ur.svg`, `fig-U7-3.ur.svg`) and verified clean font metrics with `measure-figure-text.mjs`.
- Confirmed zero em dashes, strict adherence to `specs/content/terminology.csv`, and validated that parity checks pass under temporary `reviewed` flip.
- Documented G4 handoff and updated the G4 tracker row in `specs/content/gicp-400/tasks.md` with status `▢` (`draft`).

## Outcome

- Impact: Complete draft Urdu mirror for GICP-400 Unit 7 at G4.
- Tests: `npm run check:content` (14/14 passed), `npm run figures:variants:check` (clean), `measure-figure-text.mjs` (exit 0).
- Files: 13 files (Urdu MDX, localised SVGs, derived dark SVGs, handoff, tasks.md, prompt records).

## Handoff (for CEO and agents)

- Shipped / changed: Complete draft Urdu mirror for GICP-400 Unit 7 with 3 MDX files, 3 localised RTL SVGs and derived dark twins, updated G4 handoff and tasks.md tracker row.
- Decisions the team must respect: `translation_status` remains `draft`; G5 review requires a fresh, independent reviewer session and must not certify its own translation.
- Pending / next owner: Independent G5 reviewer for Urdu review; browser/A4 inspection in an authorized environment.
- Notes for the next job on this unit:
  - Unit 7 G4 mirror is fully draft-gate compliant and parity-clean.
  - Rendered mobile/A4 inspection is pending due to crew headless/no-browser constraint.
