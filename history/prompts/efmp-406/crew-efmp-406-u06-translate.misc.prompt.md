---
id: crew-efmp-406-u06-translate
title: crew translate EFMP-406 unit 6
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u06-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/unit-teacher-notes.mdx
  - specs/content/efmp-406/translations/unit-06/handoff.md
  - specs/content/efmp-406/translations/unit-06/logs/check-content-draft.txt
  - specs/content/efmp-406/translations/unit-06/logs/check-content-origin-main.txt
  - specs/content/efmp-406/translations/unit-06/logs/check-content-temporary-reviewed.txt
  - specs/content/efmp-406/translations/unit-06/logs/mdx-syntax.txt
  - specs/content/efmp-406/translations/unit-06/logs/parity-self-check.txt
  - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-2.ur.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-2.ur.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-3.ur.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-3.ur.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-4.ur.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-4.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-406-u06-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-406 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-06/`.

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
- (efmp-406-u06-review_en, review_en, agy) All 7 G3 criteria pass, 25 assessment items independently solved, and all 8 SVG variants pass geometry; report validated with advisory pass disposition.
- (efmp-406-u06-review_en, review_en, agy) The G3 tracker row in specs/content/efmp-406/tasks.md is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
- (efmp-406-u06-review_en, review_en, agy) Unit 6 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
- (efmp-406-u06-author-conflict5, fix, opencode) origin/main (5be22ec4) was already an ancestor of this branch via conflict4's merge 40a0c1d3, so the requested merge was a no-op and no merge commit was created.
- (efmp-406-u06-author-conflict5, fix, opencode) shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are byte-identical to main; the only tasks.md delta is the intended Unit 6 status update.

## Response snapshot

Translated the five Unit 6 pages and the complete 10/10/5 assessment bank, added four RTL Urdu schematic sources with derived dark variants, and kept draft status with open review gates. All 13 final content gates pass. Work committed locally without a push or PR.

## Outcome

- Impact: translate for EFMP-406 Unit 6 by opencode.
- Tests: npm run check:content passed in the final draft state; temporary reviewed parity reported only the expected open G4/G5 rows.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Five-page Urdu mirror with bank-bound key_terms, full assessment and four mirrored Urdu schematic pairs.
- Decisions the team must respect: translation_status stays draft; no review certification. The current translate-unit skill forbids appending a G4 row, so the existing G4/G5 rows remain open.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu pages have never been checked as rendered (Playwright, narrow width, A4 print); the G5 review session needs to do this.
  - Proposed Urdu terms the term bank does not hold are listed in specs/content/efmp-406/translations/unit-06/handoff.md and need an owner ruling.
  - The Chromium-backed `measure-figure-text.mjs` was not run under the crew prohibition on Playwright.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none beyond the expected conditional-gate findings.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
