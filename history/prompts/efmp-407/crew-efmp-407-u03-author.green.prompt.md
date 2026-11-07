---
id: crew-efmp-407-u03-author
title: crew author EFMP-407 unit 3
stage: misc
date: 2026-11-07
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u03-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-03/index.mdx
 - docs/semester-3/efmp-407/unit-03/topic-01.mdx
 - docs/semester-3/efmp-407/unit-03/topic-02.mdx
 - docs/semester-3/efmp-407/unit-03/topic-03.mdx
 - docs/semester-3/efmp-407/unit-03/unit-assessment.mdx
 - history/prompts/general/20261143-author-efmp-407-unit-three.general.prompt.md
 - specs/content/efmp-407/authoring/unit-03.md
 - specs/content/efmp-407/concepts/unit-03.md
 - specs/content/efmp-407/coverage/unit-03.md
 - specs/content/efmp-407/figures/unit-03.banner.md
 - specs/content/efmp-407/figures/unit-03.md
 - specs/content/efmp-407/sources/texts/akkari-maleq-2020-gce.md
 - specs/content/efmp-407/sources/texts/khoo-jorgensen-2021.md
 - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
 - specs/content/efmp-407/sources/unit-03.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-03/fig-U3-1.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-1.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-2.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-2.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-3.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-4.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-4.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-5.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-5.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-6.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-407 Unit 3 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Authored EFMP-407 Unit 3 English draft end to end with full topic prose, 10/10/5 assessment bank, 6 placed SVG schematics with dark twins, governance manifests, and zero gate findings.

## Outcome

- Impact: author for EFMP-407 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFMP-407 Unit 3 English draft end to end with full topic prose, 10/10/5 assessment bank, 6 placed SVG schematics with dark twins, governance manifests, and zero gate findings.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Staged with `coming_soon: true` and tracker `G2: ▣` matching repo precedent (`efmp-406` Unit 4) because `course-overview.mdx` is owned and created by concurrent sibling job `crew/efmp-407-u01-author`; once `course-overview.mdx` merges, `coming_soon: true` can be cleared to ungate full G2 evidence generation and subsequent G3 review. Chromium figure geometry measurement is deferred to CI.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
