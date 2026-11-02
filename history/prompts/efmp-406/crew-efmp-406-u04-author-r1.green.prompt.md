---
id: crew-efmp-406-u04-author-r1
title: crew author EFMP-406 unit 4
stage: misc
date: 2026-11-02
surface: agent
model: claude
feature: efmp-406
branch: crew/efmp-406-u04-author-r1
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-406/authoring/unit-04.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u04-author-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u04-author-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-406 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-04/`.

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
- (efmp-406-u04-author-conflict2, fix, opencode) Catalog registration, G4 Urdu translation, G3/G5 independent reviews for EFMP-406 Unit 4 remain pending; SVG browser measurement (measure-figure-text.mjs) unrun - next visual job on unit-04 should run it before marking figures placed.
- (efmp-406-u04-author-conflict1, fix, opencode) Catalog registration, Urdu translation (G4) and independent reviews (G3/G5) for EFMP-406 Unit 4 remain pending per the author job's notes.
- (efmp-406-u04-author-conflict1, fix, opencode) Shared glossary additions from the author job were staged earlier; if a later job consumes glossary.json, verify the EFMP-406 keys are present and registrations are not duplicated.
- (efmp-406-u04-author-conflict1, fix, opencode) SVG browser measurement (measure-figure-text.mjs) was not run under this brief's Playwright prohibition; the next visual job on unit-04 should run it before marking figures placed.
- (efmp-406-u04-author, author, codex) Shared glossary additions are staged; catalog registration, Urdu translation and independent reviews remain pending.


## Response snapshot

Checked the already-merged EFMP-406 Unit 4 against its content-spec (all content checks pass) and recorded the result in its authoring file, without changing any content.

## Outcome

- Impact: author for EFMP-406 Unit 4 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Checked the already-merged EFMP-406 Unit 4 against its content-spec (all content checks pass) and recorded the result in its authoring file, without changing any content.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Five key terms (Digital reading, Social media, Meta-analysis, Qualitative study, Licence) are still only in `specs/content/efmp-406/glossary/unit-04.json`. A job allowed to edit root `glossary.json` should add them and wrap their first uses in topic-01/02 in `<Glossary>` tags.
  - `measure-figure-text.mjs` has still not been run on the four unit-04 SVGs (it needs Chromium); run it before the figures are accepted for publication.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
