---
id: crew-gicp-400-u03-translate
title: crew translate GICP-400 unit 3
stage: misc
date: 2026-11-06
surface: agent
model: claude
feature: gicp-400
branch: crew/gicp-400-u03-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261139-gicp-400-unit-03-urdu-mirror.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/unit-assessment.mdx
 - specs/content/gicp-400/reviews/unit-03/G4/translation-handoff.md
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/gicp-400/unit-03/fig-U3-1.ur.svg
 - static/img/figures/gicp-400/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/gicp-400/unit-03/fig-U3-2.ur.svg
 - static/img/figures/gicp-400/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/gicp-400/unit-03/fig-U3-3.ur.svg
 - static/img/figures/gicp-400/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/gicp-400/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

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

Translated GICP-400 Unit 3 into a complete draft Urdu mirror with four mirrored figures and dark twins, a G4 handoff, a tracker note and a PHR, leaving translation_status at draft and G4/G5 open.

## Outcome

- Impact: translate for GICP-400 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GICP-400 Unit 3 into a complete draft Urdu mirror with four mirrored figures and dark twins, a G4 handoff, a tracker note and a PHR, leaving translation_status at draft and G4/G5 open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English defects are listed in the G4 handoff and left unfixed: "disvoting rights", "holded", "an powerful", the fig-U3-3 alt not matching its rows, and uncited or untaught items; any English fix needs a matching Urdu edit.
  - `measure-figure-text.mjs` and `render-inspect.mjs --locale ur` have not run on this unit; run them before G5.
  - G3 is still an unsigned advisory escalation (Abbas 2023 and Shah 2026 full texts unbound), so an accepted G5 cannot bind until that is resolved.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
