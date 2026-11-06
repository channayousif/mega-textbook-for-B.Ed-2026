---
id: crew-gicp-400-u02-translate
title: crew translate GICP-400 unit 2
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gicp-400
branch: crew/gicp-400-u02-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261138-gicp-400-unit-02-urdu-mirror.general.prompt.md
 - history/prompts/gicp-400/crew-gicp-400-u02-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/unit-assessment.mdx
 - specs/content/gicp-400/reviews/unit-02/G4/translation-handoff.md
 - static/img/figures/gicp-400/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/gicp-400/unit-02/fig-U2-1.ur.svg
 - static/img/figures/gicp-400/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/gicp-400/unit-02/fig-U2-2.ur.svg
 - static/img/figures/gicp-400/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/gicp-400/unit-02/fig-U2-3.ur.svg
 - static/img/figures/gicp-400/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/gicp-400/unit-02/fig-U2-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u02-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-02/`.

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
- (gicp-400-u02-review_en, review_en, codex) G3 remains open pending source verification, run provenance and browser/A4 inspection.
- (gicp-400-u02-review_en, review_en, codex) G3 remains open pending source verification, run provenance and browser/A4 inspection.
- (gicp-400-u02-author-conflict1, fix, opencode) The orphaned pre-merge Unit 2 G2 evidence (20261106T152644075Z-gates.json) is left in place per the repo's refresh convention.
- (gicp-400-u02-author-conflict1, fix, opencode) G3/G5 remain open (no independent review or signing), and the banner figure stays prompt-only under the crew browser prohibition.
- (gicp-400-u02-author, author, opencode) The G2 evidence path requires a course-level `course-overview.mdx`; I added it and the course `_category_.json` as a prerequisite, which is just outside the strict Unit 2 scope.


## Response snapshot

Translated GICP-400 Unit 2 into a complete Urdu mirror (index, topic-01, topic-02, unit-assessment with the 10/10/5 bank and bounded answers) plus four localised `.ur.svg` figures with derived dark twins, and recorded the G4 handoff with all gates green at draft.

## Outcome

- Impact: translate for GICP-400 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GICP-400 Unit 2 into a complete Urdu mirror (index, topic-01, topic-02, unit-assessment with the 10/10/5 bank and bounded answers) plus four localised `.ur.svg` figures with derived dark twins, and recorded the G4 handoff with all gates green at draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `measure-figure-text.mjs` and `render-inspect.mjs --locale ur` were not run (brief forbids Chromium/builds/servers); Urdu SVG label geometry is hand-checked against each viewBox only.
  - G4/G5 tracker rows stay open; the G4 handoff is at `specs/content/gicp-400/reviews/unit-02/G4/translation-handoff.md`, and the proposed non-banked Urdu terms are listed there for the owner.
  - English G3 remains escalated and unsigned; a fresh reviewer must resolve its source/provenance dependencies before accepted G5 can bind.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
