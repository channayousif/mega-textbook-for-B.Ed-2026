---
id: 20261137
title: Author GICP400 Unit Seven
stage: general
date: 2026-11-06
surface: agent
model: opencode-longcat-2.0
feature: gicp-400
branch: crew/gicp-400-u07-author
user: crew
command: Read .crew/brief.md and carry it out
labels: ["opencode", "author", "gicp-400-u07-author"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/gicp-400/unit-07/index.mdx
  - docs/semester-3/gicp-400/unit-07/topic-01.mdx
  - docs/semester-3/gicp-400/unit-07/unit-assessment.mdx
  - specs/content/gicp-400/concepts/unit-07.md
  - specs/content/gicp-400/coverage/unit-07.md
  - specs/content/gicp-400/figures/unit-07.md
  - specs/content/gicp-400/sources/unit-07.md
  - specs/content/gicp-400/sources/texts/kennedy-2012-civic.md
  - specs/content/gicp-400/sources/texts/dean-2005-citizenship.md
  - specs/content/gicp-400/reviews/unit-07/G2/20261106T190031290Z-gates.json
  - specs/content/gicp-400/tasks.md
  - static/img/figures/gicp-400/unit-07/fig-U7-1.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-1.dark.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-2.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-2.dark.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-3.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-3.dark.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job gicp-400-u07-author

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GICP-400 Unit 7 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-07/`.

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

Authored GICP-400 Unit 7 in English (index, one nine-part topic, 10/10/5 assessment, three placed SVG figures with dark variants, coverage/sources/figures/concepts governance files, G2 evidence and PHR), teaching civic education, national integration and teacher responsibility from the approved Week 15 spec.

## Outcome

- Impact: author for GICP-400 Unit 7 by opencode (attempt 1).
- Tests: `npm run check:content` passed in the job worktree (all 14 content gates).
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GICP-400 Unit 7 in English (index, Topic 7.1, 10/10/5 assessment, three placed SVG figures with dark variants, coverage/sources/figures/concepts files, G2 evidence and PHR). Week 15's three sub-topics (civic education, national integration, responsibilities of teachers) are taught in one topic file.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything. The unit is English-only; the Urdu mirror is a separate job.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - The three figures are hand-authored schematics. Browser geometry (`scripts/measure-figure-text.mjs`) and visual inspection were not run because the crew brief prohibits Chromium and Playwright; CI's `figure-geometry` job will measure them on the PR.
  - `dean-2005-citizenship` is shared with GPKS-402 Unit 6. The GICP-400 bound excerpt is an original paraphrase of the verified abstract, not the GPKS-402 excerpt file. A reviewer should check the original passages.
  - `tasks.md` is shared with sibling GICP-400 jobs; expect a merge conflict on the Unit 7 rows.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
