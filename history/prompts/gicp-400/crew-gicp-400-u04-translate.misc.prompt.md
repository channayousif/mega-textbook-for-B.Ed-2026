---
id: crew-gicp-400-u04-translate
title: crew translate GICP-400 unit 4
stage: misc
date: 2026-11-06
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u04-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/unit-assessment.mdx
  - specs/content/gicp-400/tasks.md
  - specs/content/gicp-400/translations/unit-04/handoff.md
  - static/img/figures/gicp-400/unit-04/fig-U4-1.ur.dark.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-1.ur.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-2.ur.dark.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-2.ur.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-3.ur.dark.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-3.ur.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-4.ur.dark.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-4.ur.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-5.ur.dark.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-5.ur.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-6.ur.dark.svg
  - static/img/figures/gicp-400/unit-04/fig-U4-6.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job gicp-400-u04-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-04/`.

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
- (gicp-400-u04-review_en, review_en, codex) G3 remains open: provenance, independent source/assessment verification and permitted render inspection are still required.
- (gicp-400-u04-review_en, review_en, codex) G3 remains open: provenance, independent source/assessment verification and permitted render inspection are still required.
- (gicp-400-u04-author, author, claude) Unit 4 cites `pak-constitution-2024-edition` (same work as the spec's mapped `pak-constitution-1973`, printed-page locators); the G3 reviewer should confirm that key is acceptable. It deliberately excludes the Twenty-seventh Amendment as a dated snapshot.
- (gicp-400-u04-author, author, claude) `measure-figure-text.mjs` for the six `fig-U4-*` SVGs and the site build are still unrun; the banner remains prompt-only and G6 is open.
- (gicp-400-u04-author, author, claude) Do not edit `sources/texts/pak-constitution-1973.md` from a unit job, because that invalidates Unit 1's G2 evidence; the `tasks.md` row for Unit 4 will conflict with sibling jobs on merge, so keep every unit's rows.

## Response snapshot

Translated GICP-400 Unit 4 into its complete Urdu mirror (5 MDX files, 6 Urdu SVGs with derived dark twins, updated G4 tracker row, translation handoff and PHR).

## Outcome

- Impact: G4 Urdu mirror for GICP-400 Unit 4 completed at draft status.
- Tests: `npm run check:content` passed (14 content gates clean); figure text measurement passed for all six Urdu SVGs; figure variants verified; conditional parity verified under temporary reviewed flag.
- Files: 19 files created or modified.
- Next prompts: independent G5 Urdu review (`review-unit` skill via `.claude/agents/g5-reviewer.md`).

## Handoff (for CEO and agents)

- Shipped / changed:
  - Created five Urdu mirror MDX files under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/` (`index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`).
  - Created six `.ur.svg` and derived six `.ur.dark.svg` figure variants under `static/img/figures/gicp-400/unit-04/`.
  - Added G4 draft handoff document at `specs/content/gicp-400/translations/unit-04/handoff.md`.
  - Updated GICP-400 Unit 4 G4 tracker row in `specs/content/gicp-400/tasks.md` recording draft mirror delivery while keeping status open (`▢`).
- Decisions the team must respect:
  - `translation_status` remains `draft` pending independent G5 review.
  - Zero em dashes maintained throughout.
  - No human initials or gate certification claimed.
- Pending / next owner: independent G5 reviewer (g5-reviewer agent).
- Notes for the next job on this unit:
  - G5 review is open: independent passage-level bilingual evaluation, independent assessment solving, and permitted browser/A4 print render inspection required.
  - G3 also remains open on English content.
