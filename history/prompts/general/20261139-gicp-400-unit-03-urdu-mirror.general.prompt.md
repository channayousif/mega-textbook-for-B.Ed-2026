---
id: 20261139
title: Translate GICP-400 Unit 3 into a complete draft Urdu mirror
stage: general
date: 2026-11-07
surface: agent
model: claude-opus-5-5
feature: gicp-400
branch: crew/gicp-400-u03-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["claude", "crew", "translation", "gicp-400"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/unit-assessment.mdx
  - static/img/figures/gicp-400/unit-03/fig-U3-1.ur.svg
  - static/img/figures/gicp-400/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/gicp-400/unit-03/fig-U3-2.ur.svg
  - static/img/figures/gicp-400/unit-03/fig-U3-2.ur.dark.svg
  - static/img/figures/gicp-400/unit-03/fig-U3-3.ur.svg
  - static/img/figures/gicp-400/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/gicp-400/unit-03/fig-U3-4.ur.svg
  - static/img/figures/gicp-400/unit-03/fig-U3-4.ur.dark.svg
  - specs/content/gicp-400/reviews/unit-03/G4/translation-handoff.md
  - specs/content/gicp-400/tasks.md
tests:
  - npm run check:content (draft and temporary reviewed parity runs)
  - npm run figures:variants:check
  - scratch MDX mirror assertions and @mdx-js/mdx compile of all four files
  - Pillow/raqm Noto Nastaliq width measurement of all four Urdu SVGs
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief, preserved verbatim:

# Crew job gicp-400-u03-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-03/`.

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
- (gicp-400-u03-review_en, review_en, agy) G3 remains open and advisory under escalate disposition due to unbound secondary source texts and execution prohibitions on browser/print inspection tooling.
- (gicp-400-u03-review_en, review_en, agy) Live browser rendering (360px viewport, table scrolling, A4 print) and SVG text-geometry validation must be executed on a host permitted to run Chromium.
- (gicp-400-u03-review_en, review_en, agy) Journal articles Abbas (2023) and Shah (2026) full texts should be bound in the repository or declared under unverifiable sources.
- (gicp-400-u03-author-conflict1, fix, opencode) Independent review, Urdu translation, browser geometry validation and banner production remain pending for Unit 3.
- (gicp-400-u03-author-conflict1, fix, opencode) The merge brought in main's Unit 1/2/4/5 content and review evidence; only the tasks.md conflict was resolved here.

## Response snapshot

Translated all four Unit 3 pages and the full 10/10/5 assessment bank into Urdu, localised and mirrored four schematic SVGs with derived dark twins, added the G4 delivery note and handoff, and left `translation_status` at `draft`.

## Outcome

- Impact: Complete Urdu source mirror ready for independent G5 review.
- Tests: All 14 content gates pass in draft. The temporary `reviewed` flip produced only the two expected pipeline findings (Unit 3 G4 and G5 rows not done).
- Files: Four Urdu MDX files, four Urdu light SVGs, four dark SVGs, the G4 handoff, the tracker note and this PHR.
- Next prompts: Permitted `measure-figure-text.mjs` and Urdu desktop, narrow and A4 inspection; English repairs listed in the handoff; independent G5 after G3 is accepted.
- Reflection: The self-closing Glossary form renders English inside Urdu prose, so it reads best as a parenthetical after the Urdu term.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 3 Urdu draft and mirrored figures, translated from English commit `864814f473d418241aae7d897d01d4c579b7599e`. Nothing is pushed.
- Decisions the team must respect: Terminology bank and English files unchanged. `translation_status` stays `draft`. The G4 row stays open with a delivery note, per translate-unit Step 7. No G3/G5 certification or publication is claimed.
- Pending / next owner: A session allowed to run Chromium owns `measure-figure-text.mjs` and render inspection; `revise-topic` or a G3 repair job owns the English defects in the handoff ("disvoting", "holded", "an powerful", the fig-U3-3 alt gap); an independent reviewer owns G5; the curriculum owner owns the proposed terms.
- Issues affected: No issue identifier supplied; crew job gicp-400-u03-translate.

## Evaluation notes (flywheel)

- Failure modes observed: `static/content-status.json` goes stale after any tracker edit, so `check:content` fails until `npm run build:content-status` is rerun. The brief says to record the G4 row as the skill says, and the skill says never to append one, so only the existing row's note changed.
- Graders run and results (PASS/FAIL): PASS `npm run check:content` in draft; PASS reviewed flip with only the two expected findings; PASS `figures:variants:check`; NOT RUN `measure-figure-text.mjs`, build and `render-inspect.mjs`, prohibited by the brief.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the Chromium geometry check on these four SVGs before G5.
