---
id: crew-gsos-301-u02-translate
title: crew translate GSOS-301 unit 2
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: gsos-301
branch: crew/gsos-301-u02-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0343-gsos301-u02-g4-translate.general.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-teacher-notes.mdx
  - specs/content/gsos-301/tasks.md
  - static/img/figures/gsos-301/unit-02/fig-U2-1.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-2.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-2.ur.dark.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-3.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-3.ur.dark.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-4.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-4.ur.dark.svg
tests:
  - npm run check:content
  - npm run figures:variants:check
  - npm run check:no-em-dash
  - npm run check:no-answer-keys
  - npm run check:figures
---

## Prompt

# Crew job gsos-301-u02-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u02-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Response snapshot

Translated GSOS-301 Unit 2 into its complete Urdu mirror at G4 per `.claude/skills/translate-unit/SKILL.md`:
1. Localized all four figures into `.ur.svg` (`fig-U2-1.ur.svg`, `fig-U2-2.ur.svg`, `fig-U2-3.ur.svg`, `fig-U2-4.ur.svg`) with Nastaliq font stacks, RTL text anchors and reading order, and derived `.ur.dark.svg` via `npm run figures:variants`.
2. Produced complete academic-plain Urdu translations for all 5 unit files (`index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx`), ensuring exact 1:1 heading vector parity, component count preservation, zero em dashes, and `key_terms` bound to `terminology.csv`.
3. Translated 10/10/5 assessment bank and bounded answers section without English answer-key tokens.
4. Updated `specs/content/gsos-301/tasks.md` G4 tracker row. All 13 content gates pass.

## Outcome

- ✅ Impact: GSOS-301 Unit 2 complete G4 Urdu mirror created and verified against all content gates.
- 🧪 Tests: `npm run check:content` passes all 13 gates.
- 📁 Files: 5 MDX files in `i18n/ur/.../gsos-301/unit-02/`, 8 figure variant SVGs in `static/img/figures/gsos-301/unit-02/`, `specs/content/gsos-301/tasks.md`.
- 🔁 Next prompts: G5 independent Urdu review.
- 🧠 Reflection: Following translate-unit skill procedures systematically produced a clean, fully verified translation without regressions.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Urdu mirror and localized figures for GSOS-301 Unit 2.
- Decisions the team must respect: translation_status stays draft; G4 row updated; no self-signing of G5.
- Pending / next owner: Independent G5 Urdu reviewer session for GSOS-301 Unit 2.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: Pre-existing missing `content-status.json` built via `build:content-status`.
- Graders run and results (PASS/FAIL): npm run check:content → 13 PASS / 0 FAIL.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
