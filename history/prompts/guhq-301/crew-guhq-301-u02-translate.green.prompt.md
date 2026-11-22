---
id: crew-guhq-301-u02-translate
title: crew translate GUHQ-301 unit 2
stage: green
date: 2026-11-22
surface: agent
model: gemini-3.8-flash
feature: guhq-301
branch: crew/guhq-301-u02-translate
user: crew
command: crew translate
labels: ["crew", "antigravity", "translate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/guhq-301/crew-guhq-301-u02-translate.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/unit-assessment.mdx
  - specs/content/guhq-301/tasks.md
  - specs/content/guhq-301/reviews/unit-02/G4/check-content-parity.txt
  - specs/content/guhq-301/reviews/unit-02/G4/translation-handoff.md
  - static/img/figures/guhq-301/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-1.ur.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-2.ur.dark.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-2.ur.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-3.ur.dark.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-3.ur.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-4.ur.dark.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-4.ur.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-5.ur.dark.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-5.ur.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-6.ur.dark.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-6.ur.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-7.ur.dark.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-7.ur.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-8.ur.dark.svg
  - static/img/figures/guhq-301/unit-02/fig-U2-8.ur.svg
tests:
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/guhq-301/unit-02/fig-U2-*.ur.svg
  - npm run figures:variants:check
---

## Prompt

# Crew job guhq-301-u02-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GUHQ-301 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-02/`.

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
- (guhq-301-u02-author-conflict1, fix, opencode) Unit 2 Urdu mirror still needs `.ur.svg` files for all eight figures and G5 review of the twelve authored Urdu concept labels.
- (guhq-301-u02-author-conflict1, fix, opencode) G3 reviewer must make the religious-content check (content-spec drafting note 7) and confirm the general-knowledge conjugation/pronoun/negation/preposition tables flagged in `specs/content/guhq-301/sources/unit-02.md`.
- (guhq-301-u02-author-conflict1, fix, opencode) The merged `dukes-2010-treebank.md` excerpt sits outside both units' G2 input manifests (`citedKeysFor` derives `dukes-2010`), so editing it does not refresh G2 evidence.
- (guhq-301-u02-author, author, opencode) Urdu job needs `.ur.svg` mirrors for all eight figures (several contain Arabic) and G5 review of the twelve authored Urdu concept labels.
- (guhq-301-u02-author, author, opencode) Conjugation/pronoun/negation/preposition tables are general-knowledge grammar flagged in sources/unit-02.md for the G3 reviewer, who must also make the religious-content check in content-spec drafting note 7.

## Response snapshot

Translated GUHQ-301 Unit 2 into its complete six-page Urdu mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/` (index, topics 01 to 04, and unit-assessment with 10/10/5 bank and bounded answers section), created and verified all eight `.ur.svg` figures with their derived dark variants, verified full gate parity via temporary review flip, and recorded the G4 tracker note while keeping translation_status as draft.

## Outcome

- Impact: complete G4 Urdu translation of GUHQ-301 Unit 2.
- Tests: `npm run check:content` passed (14/14); with both index files temporarily at reviewed, `validate:content` parity, `check:figures` Urdu parity and `check:pipeline-gate` key terms pass with only expected G4/G5 row notices; `measure-figure-text` exits 0 on all eight `.ur.svg`; `figures:variants:check` clean across 1455 figures.
- Files: 26 files (6 MDX files, 8 `.ur.svg` figures, 8 `.ur.dark.svg` twins, tasks.md, check-content-parity.txt, handoff.md, PHR).
- Next prompts: independent G5 review session for Unit 2.

## Handoff (for CEO and agents)

- Shipped / changed: complete draft Urdu mirror of GUHQ-301 Unit 2 (index, topic-01 to topic-04, 10/10/5 unit-assessment), eight RTL-mirrored `.ur.svg` figures with derived dark twins, a bank-bound `key_terms` block, and recorded G4 tracker row. `translation_status` stays `draft`; the G4 row keeps status ▢ with a factual note.
- Decisions: option letters الف) ب) ج) د) preserved with letter-identical answer key correspondence (ب، ج، ج، ب، ج، ج، ب، ب، ج، ج); no English unit file or figures manifest was modified so G2 evidence remains valid.
- Pending: independent G5 review of Urdu translation, verse renderings, and the twelve authored Urdu concept labels.
- Issues: GUHQ-301 Unit 2.
