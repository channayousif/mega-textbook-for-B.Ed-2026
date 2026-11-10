---
id: crew-giss-401-u05-translate-r1
title: crew translate GISS-401 unit 5 retry 1
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: giss-401
branch: crew/giss-401-u05-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/unit-assessment.mdx
  - specs/content/giss-401/reviews/unit-05/G4/translation-handoff.md
  - specs/content/giss-401/tasks.md
  - static/img/figures/giss-401/unit-05/fig-U5-1.ur.dark.svg
  - static/img/figures/giss-401/unit-05/fig-U5-1.ur.svg
  - static/img/figures/giss-401/unit-05/fig-U5-2.ur.dark.svg
  - static/img/figures/giss-401/unit-05/fig-U5-2.ur.svg
  - static/img/figures/giss-401/unit-05/fig-U5-3.ur.dark.svg
  - static/img/figures/giss-401/unit-05/fig-U5-3.ur.svg
  - static/img/figures/giss-401/unit-05/fig-U5-4.ur.dark.svg
  - static/img/figures/giss-401/unit-05/fig-U5-4.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job giss-401-u05-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u05-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-05/`.

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
- (giss-401-u05-repair_en, repair_en, opencode) The three cited source texts (quran-translation, rahman-2020-zakat, abdel-salam-2015-democracy) are still absent from review manifests because `scripts/lib/review-evidence.mjs`'s citation-key regex does not capture keys with a suffix after the year or keys without a year; a host fix and fresh bundle are required.
- (giss-401-u05-repair_en, repair_en, opencode) G3 remains open and unsigned; genuine author-run provenance, a permitted narrow-screen/A4 render inspection with SVG glyph geometry, and the qualified Islamic Studies scholar review required by content-spec drafting note 2 are all still pending.
- (giss-401-u05-repair_en, repair_en, opencode) No Urdu mirror exists for Unit 5; G4/G5 remain downstream jobs and `translation_status` stays draft.
- (giss-401-u05-translate, translate, codex) English author must repair G3 findings before translation resumes; G4/G5 remain open and translation_status remains draft.
- (giss-401-u05-translate, translate, codex) English author must repair G3 findings before translation resumes; G4/G5 remain open and translation_status remains draft.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Translated GISS-401 Unit 5 into full Urdu mirror across 4 MDX files and 4 RTL SVG figures with dark variants, verified content gates, and recorded G4 handoff.

## Outcome

- Impact: G4 Urdu mirror drafted for GISS-401 Unit 5 by agy (attempt 2).
- Tests: `npm run check:content` 14/14 PASS; `measure-figure-text.mjs` PASS; `figures:variants:check` PASS; `check-svg-style` PASS; temporary `reviewed` flip parity checks clean.
- Files: 14 file(s), listed above.
- Next prompts: independent G5 review for Unit 5.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: G4 Urdu mirror for GISS-401 Unit 5: 4 MDX files (`index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`), 4 RTL `.ur.svg` figure schematics with derived `.ur.dark.svg` variants, translation handoff notes, and tasks.md tracker record.
- Decisions the team must respect: G3 and G5 stay open/unsigned; `translation_status` remains `draft` pending independent G5 review.
- Pending / next owner: independent G5 reviewer (g5-reviewer skill).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
