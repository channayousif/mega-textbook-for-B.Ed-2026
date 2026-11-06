---
id: crew-giss-401-u03-translate
title: crew translate GISS-401 unit 3
stage: misc
date: 2026-11-06
surface: agent
model: claude
feature: giss-401
branch: crew/giss-401-u03-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/2456-translate-giss401-unit-three-urdu.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-03/unit-assessment.mdx
 - specs/content/giss-401/reviews/unit-03/G4/conditional-parity-gates.txt
 - specs/content/giss-401/reviews/unit-03/G4/content-gates.txt
 - specs/content/giss-401/reviews/unit-03/G4/translation-handoff.md
 - static/img/figures/giss-401/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/giss-401/unit-03/fig-U3-1.ur.svg
 - static/img/figures/giss-401/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/giss-401/unit-03/fig-U3-2.ur.svg
 - static/img/figures/giss-401/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/giss-401/unit-03/fig-U3-3.ur.svg
 - static/img/figures/giss-401/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/giss-401/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u03-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-03/`.

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
- (giss-401-u03-review_en, review_en, codex) Substantive review needs author-run provenance, a prepared handoff, permitted browser/print inspection, and an Islamic Studies specialist.
- (giss-401-u03-review_en, review_en, codex) Substantive review needs author-run provenance, a prepared handoff, permitted browser/print inspection, and an Islamic Studies specialist.
- (giss-401-u03-author-conflict2, fix, opencode) `quran-translation.md` is now a shared per-unit excerpt file (Unit 1, Unit 3, Unit 4); do not collapse it back to one unit.
- (giss-401-u03-author-conflict2, fix, opencode) Unit 3 G2 evidence is current at `specs/content/giss-401/reviews/unit-03/G2/20261103T012212981Z-gates.json`; older evidence files are superseded but left in place.
- (giss-401-u03-author-conflict2, fix, opencode) Branch is even with `origin/main` at `e6cbd65e3`; `static/content-status.json` is gitignored and must be rebuilt after any tracker edit.


## Response snapshot

Translated GISS-401 Unit 3 into a complete draft Urdu mirror (four pages, four localised figures with dark variants, G4 handoff and PHR), with content gates passing and browser checks left for a permitted session.

## Outcome

- Impact: translate for GISS-401 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GISS-401 Unit 3 into a complete draft Urdu mirror (four pages, four localised figures with dark variants, G4 handoff and PHR), with content gates passing and browser checks left for a permitted session.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu Qur'an and hadith quotations are my renderings of the English quotations, not a published Urdu translation, and need an Islamic Studies check (12 block quotes, plus short phrases in the seventh MCQ and fig-U3-3).
  - Six English issues are kept as written and listed in the G4 handoff, including fig-U3-4 omitting Sutomo's moral feeling stage, fig-U3-3 attributing 5:8 to An-Nisa, and "Sir" addressed to a trainee described as "she"; any English fix needs a matching Urdu edit.
  - A permitted session must still run the build, `measure-figure-text` and `render-inspect --locale ur`, and should check the invisible U+200F marks in the Urdu SVG lines.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
