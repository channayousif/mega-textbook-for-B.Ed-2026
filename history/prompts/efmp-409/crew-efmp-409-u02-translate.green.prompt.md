---
id: crew-efmp-409-u02-translate
title: crew translate EFMP-409 unit 2
stage: misc
date: 2026-11-25
surface: agent
model: gemini-flash
feature: efmp-409
branch: crew/efmp-409-u02-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-409/crew-efmp-409-u02-translate.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-02/unit-teacher-notes.mdx
  - specs/content/efmp-409/reviews/unit-02/G4/translation-handoff.md
  - specs/content/efmp-409/tasks.md
  - static/img/figures/efmp-409/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/efmp-409/unit-02/fig-U2-1.ur.svg
  - static/img/figures/efmp-409/unit-02/fig-U2-2.ur.dark.svg
  - static/img/figures/efmp-409/unit-02/fig-U2-2.ur.svg
  - static/img/figures/efmp-409/unit-02/fig-U2-3.ur.dark.svg
  - static/img/figures/efmp-409/unit-02/fig-U2-3.ur.svg
  - static/img/figures/efmp-409/unit-02/fig-U2-4.ur.dark.svg
  - static/img/figures/efmp-409/unit-02/fig-U2-4.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-409-u02-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFMP-409 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-02/`.

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
- (efmp-409-u02-author, author, claude_crew) G3 needs a qualified scholar to check Topic 2.2's Islamic material (Objectives Resolution text, Qur'an 96:1-5 and 39:9, tarbiyah/ta'lim/ta'dib), per content-spec drafting note 8.
- (efmp-409-u02-author, author, claude_crew) banner `fig-U2-5` is still prompt-only, and the Urdu concept labels are authored and need G5 review.
- (efmp-409-u02-author, author, claude_crew) the declared reading-minutes total 52, at the ceiling of the approved 40-52 band; the draft ran long and redundant passages were cut rather than dropping required worked examples. `tasks.md` is shared with the other EFMP-409 unit jobs and will conflict on merge.

## Response snapshot

Translated EFMP-409 Unit 2 into its complete Urdu mirror (5 files), localized four schematic SVGs with derived dark twins, passed all content gates and conditional parity probe, recorded G4 tracker row, and prepared G4 handoff.

## Outcome

- Impact: translation for EFMP-409 Unit 2 by agy.
- Tests: `npm run check:content` passed with all 14 content gates green, SVG text geometry passed via `scripts/heavy.sh node scripts/measure-figure-text.mjs`, and dark variants verified with `npm run figures:variants:check`.
- Files: 16 file(s), listed above.

## Handoff (for CEO and agents)

- Shipped: complete 5-file Urdu mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-02/`, 4 localized `.ur.svg` and 4 `.ur.dark.svg` figure assets under `static/img/figures/efmp-409/unit-02/`, tracker updated at `specs/content/efmp-409/tasks.md`, and handoff at `specs/content/efmp-409/reviews/unit-02/G4/translation-handoff.md`.
- Decisions: `translation_status` remains `draft` pending independent G5 review; key terms in `index.mdx` bound strictly to frozen `terminology.csv`; zero em dash enforced.
- Pending: independent G5 review for the Urdu mirror; qualified scholar check of Islamic material in Topic 2.2 per drafting note 8.
