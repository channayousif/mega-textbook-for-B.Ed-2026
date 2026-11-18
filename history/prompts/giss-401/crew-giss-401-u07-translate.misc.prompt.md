---
id: crew-giss-401-u07-translate
title: crew translate GISS-401 unit 7
stage: misc
date: 2026-11-06
surface: agent
model: claude
feature: giss-401
branch: crew/giss-401-u07-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/giss-401/2457-translate-giss401-unit-seven-urdu.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-07/unit-assessment.mdx
 - specs/content/giss-401/reviews/unit-07/G4/conditional-parity-gates.txt
 - specs/content/giss-401/reviews/unit-07/G4/content-gates.txt
 - specs/content/giss-401/reviews/unit-07/G4/translation-handoff.md
 - static/img/figures/giss-401/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/giss-401/unit-07/fig-U7-1.ur.svg
 - static/img/figures/giss-401/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/giss-401/unit-07/fig-U7-2.ur.svg
 - static/img/figures/giss-401/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/giss-401/unit-07/fig-U7-3.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u07-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u07-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-07/`.

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
- (giss-401-u07-review_en, review_en, codex) G3 remains pending: repair assessment and privacy findings; obtain scholar review, provenance and browser/print evidence.
- (giss-401-u07-review_en, review_en, codex) G3 remains pending: repair assessment and privacy findings; obtain scholar review, provenance and browser/print evidence.
- (giss-401-u07-author-conflict5, fix, opencode) `measure-figure-text` was never run on fig-U7-1..3 (Chromium barred); CI `figure-geometry` is the first measured check.
- (giss-401-u07-author-conflict5, fix, opencode) Urdu `.ur.svg` mirrors and the G3 Islamic Studies scholar review remain open; reading time sits at the top of the 25-40 band (40 min, 41 if rounded up).
- (giss-401-u07-author-conflict5, fix, opencode) No ID reassignment was needed (D-2026-0001 is pre-existing and identical on both sides; no branch-added G-YYYY-NN or glossary key collided).


## Response snapshot

Added the complete draft Urdu G4 mirror of GISS-401 Unit 7 (three pages, three mirrored figures with dark variants, handoff, gate evidence and PHR), with `translation_status` left at draft and `check:content` passing 14 of 14.

## Outcome

- Impact: translate for GISS-401 Unit 7 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the complete draft Urdu G4 mirror of GISS-401 Unit 7 (three pages, three mirrored figures with dark variants, handoff, gate evidence and PHR), with `translation_status` left at draft and `check:content` passing 14 of 14.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Build, `measure-figure-text` and `render-inspect --locale ur` have not been run on the Urdu pages or `.ur.svg` figures, so a permitted session must run them; check the U+200F bidi marks in the figures in the browser.
  - Urdu Qur'an and hadith quotations are translator renderings pending scholar review; the `Saheeh International` source statement deliberately differs from the Unit 1 mirror, and the proposed terms are in the G4 handoff.
  - English G3 repairs (ERQ 2 rubric, MCQ 10 tag, private family detail in the roster table and `fig-U7-2`) will need matching Urdu page and `.ur.svg` edits, and they invalidate any G5 review done before them.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
