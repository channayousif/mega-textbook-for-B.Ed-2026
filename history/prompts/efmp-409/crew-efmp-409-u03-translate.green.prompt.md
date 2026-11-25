---
id: crew-efmp-409-u03-translate
title: crew translate EFMP-409 unit 3
stage: green
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: efmp-409
branch: crew/efmp-409-u03-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-409/crew-efmp-409-u03-translate.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-05.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-06.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/unit-teacher-notes.mdx
  - specs/content/efmp-409/reviews/unit-03/G4/translation-handoff.md
  - specs/content/efmp-409/tasks.md
  - static/img/figures/efmp-409/unit-03/fig-U3-1.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-10.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-11.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-12.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-2.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-3.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-4.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-5.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-6.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-7.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-8.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-9.ur.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-10.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-11.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-12.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-2.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-4.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-5.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-6.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-7.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-8.ur.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-9.ur.dark.svg
tests:
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-409/unit-03/*.ur.svg
  - npm run figures:variants:check
---

## Prompt

# Crew job efmp-409-u03-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFMP-409 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-03/`.

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
- (efmp-409-u03-author-conflict1, fix, claude_crew) No shared registry was touched by either side, so no ID remapping was needed.
- (efmp-409-u03-author-conflict1, fix, claude_crew) Unit 3 G2 evidence still points at reviews/unit-03/G2/20261125T070051288Z-gates.json; no English unit file, figure manifest, source, coverage or concept changed, so no fresh evidence run was required.
- (efmp-409-u03-author-conflict1, fix, claude_crew) Banner fig-U3-13 stays prompt-only; the G3 Islamic-content scholar check and the 13 authored Urdu concept labels remain open for G5.
- (efmp-409-u03-author, author, agy) Banner illustration fig-U3-13 is prompt-only in figures/unit-03.banner.md for Codex raster generation.
- (efmp-409-u03-author, author, agy) G3 reviewer should check Islamic educational content (Ibn Khaldun and Iqbal) with a qualified scholar per spec note 8.

## Response snapshot

Translated EFMP-409 Unit 3 into its complete nine-page Urdu mirror (index, six topics, assessment, teacher notes), localized and RTL-mirrored the twelve schematic SVGs with derived dark twins, passed the temporary reviewed-flip probe (only the two expected G4/G5 row findings) and the final draft gate run (14/14 PASS), recorded the G4 tracker note with status left open, and wrote the G4 handoff.

## Outcome

- Impact: G4 draft translation for EFMP-409 Unit 3, by Claude in the crew.
- Tests: `npm run check:content` 14/14 PASS at draft; flipped probe clean apart from the expected G4/G5 rows; `measure-figure-text.mjs` exit 0 on all 12 `.ur.svg`; `figures:variants:check` OK; every Urdu SVG rendered once in headless Chromium through `scripts/heavy.sh` and read by eye.
- Files: listed above.

## Handoff (for CEO and agents)

- Shipped: 9 Urdu pages under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/`, 12 `.ur.svg` and 12 `.ur.dark.svg` under `static/img/figures/efmp-409/unit-03/`, tracker notes for Unit 3 G4 and G6 in `specs/content/efmp-409/tasks.md`, and `specs/content/efmp-409/reviews/unit-03/G4/translation-handoff.md`.
- Decisions: `translation_status` stays `draft`; `key_terms` use only banked terms; school-of-thought terms follow the authored concept labels (مثالیات, واقعیت, فطریت, افادیت پسندی) and are listed as proposed terms; Iqbal couplets are given in their original Urdu; Urdu SVG labels are wrapped in RLM marks, following the EFMP-301 Unit 2 precedent.
- Pending: independent G5 review (owner queue), including rendered inspection, which was not run here; G3 English review with a scholar check of the Ibn Khaldun and Iqbal material; an owner ruling on the proposed Urdu terms; English-side issues listed in the handoff (drafting-note leak in Topic 3.4, tadrij/tadarruj inconsistency, Figure 3.11 dimension count) for an author or revise job.
- Issues affected: none recorded.
