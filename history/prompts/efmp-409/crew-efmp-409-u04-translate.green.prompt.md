---
id: crew-efmp-409-u04-translate
title: crew translate EFMP-409 unit 4
stage: green
date: 2026-11-25
surface: agent
model: gemini-flash
feature: efmp-409
branch: crew/efmp-409-u04-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-409/crew-efmp-409-u04-translate.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/unit-teacher-notes.mdx
  - specs/content/efmp-409/reviews/unit-04/G4/translation-handoff.md
  - specs/content/efmp-409/tasks.md
  - static/img/figures/efmp-409/unit-04/fig-U4-1.ur.dark.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-1.ur.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-2.ur.dark.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-2.ur.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-3.ur.dark.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-3.ur.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-4.ur.dark.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-4.ur.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-5.ur.dark.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-5.ur.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-6.ur.dark.svg
  - static/img/figures/efmp-409/unit-04/fig-U4-6.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-409-u04-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFMP-409 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-04/`.

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
- (efmp-409-u04-author-conflict2, fix, claude_crew) `specs/content/efmp-409/tasks.md` now lists Units 1-4; keep main's Unit 3 rows when editing Unit 4 rows, and note main's Unit 2 G4/G5/G6 rows now describe the completed Urdu translation.
- (efmp-409-u04-author-conflict2, fix, claude_crew) banner `fig-U4-7` is still prompt-only, the Urdu mirror is a separate job, and G3 still needs a qualified scholar for the Islamic material.
- (efmp-409-u04-author-conflict1, fix, claude_crew) The shared HEC note is not in Unit 4's G2 input manifest, so the existing G2 evidence stayed valid and was not regenerated.
- (efmp-409-u04-author-conflict1, fix, claude_crew) Unit 4's evidence notes are now 11-13 in `hec-2013-foundations.md`; main's 6-10 are byte-for-byte untouched, so do not renumber them.
- (efmp-409-u04-author-conflict1, fix, claude_crew) banner `fig-U4-7` is still prompt-only and the Urdu mirror is a separate job; G3 still needs a qualified scholar for the Islamic material.

## Response snapshot

Translated EFMP-409 Unit 4 into its complete Urdu mirror (6 files), localized six schematic SVGs with derived dark twins, passed all content gates and conditional parity probe, recorded G4 tracker row, and prepared G4 handoff.

## Outcome

- Impact: translation for EFMP-409 Unit 4 by agy.
- Tests: `npm run check:content` passed with all 14 content gates green, SVG text geometry passed via `scripts/heavy.sh node scripts/measure-figure-text.mjs`, and dark variants verified with `npm run figures:variants:check`.
- Files: 21 file(s), listed above.

## Handoff (for CEO and agents)

- Shipped: complete 6-file Urdu mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/`, 6 localized `.ur.svg` and 6 `.ur.dark.svg` figure assets under `static/img/figures/efmp-409/unit-04/`, tracker updated at `specs/content/efmp-409/tasks.md`, and handoff at `specs/content/efmp-409/reviews/unit-04/G4/translation-handoff.md`.
- Decisions: `translation_status` remains `draft` pending independent G5 review; key terms in `index.mdx` bound strictly to frozen `terminology.csv`; zero em dash enforced.
- Pending: independent G5 review for the Urdu mirror; qualified scholar check of Islamic material (Surah Al-Alaq, Hadith, Charter of Medina, Last Sermon, As-Suffa) per content-spec drafting note 8.
