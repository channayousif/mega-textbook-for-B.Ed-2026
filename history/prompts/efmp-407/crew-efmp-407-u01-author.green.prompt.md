---
id: crew-efmp-407-u01-author
title: crew author EFMP-407 unit 1
stage: misc
date: 2026-11-07
surface: agent
model: claude
feature: efmp-407
branch: crew/efmp-407-u01-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/_category_.json
 - docs/semester-3/efmp-407/course-overview.mdx
 - docs/semester-3/efmp-407/unit-01/index.mdx
 - docs/semester-3/efmp-407/unit-01/topic-01.mdx
 - docs/semester-3/efmp-407/unit-01/topic-02.mdx
 - docs/semester-3/efmp-407/unit-01/topic-03.mdx
 - docs/semester-3/efmp-407/unit-01/unit-assessment.mdx
 - docs/semester-3/efmp-407/unit-01/unit-teacher-notes.mdx
 - history/prompts/efmp-407/20261143-author-efmp407-unit01-english.general.prompt.md
 - specs/content/efmp-407/authoring/unit-01.md
 - specs/content/efmp-407/concepts/unit-01.md
 - specs/content/efmp-407/coverage/unit-01.md
 - specs/content/efmp-407/figures/unit-01.banner.md
 - specs/content/efmp-407/figures/unit-01.md
 - specs/content/efmp-407/reviews/unit-01/G2/20261107T065935249Z-gates.json
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T065935249Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T065935249Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T065935249Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T065935249Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T065935249Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T065935249Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T065935249Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T065935249Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/ilyas-2025-diamer-basha.md
 - specs/content/efmp-407/sources/texts/iucn-pakistan-2003.md
 - specs/content/efmp-407/sources/texts/purvis-2019-pillars.md
 - specs/content/efmp-407/sources/texts/sindh-epa-2014.md
 - specs/content/efmp-407/sources/texts/un-rio20-2012.md
 - specs/content/efmp-407/sources/texts/un-stockholm-1972.md
 - specs/content/efmp-407/sources/texts/wced-1987.md
 - specs/content/efmp-407/sources/texts/world-bank-2022-floods.md
 - specs/content/efmp-407/sources/unit-01.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-1.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-2.dark.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-2.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-3.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-4.dark.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-4.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-5.dark.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-5.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-6.dark.svg
 - static/img/figures/efmp-407/unit-01/fig-U1-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u01-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-407 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-01/`.

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

Authored EFMP-407 Unit 1 in English with its course overview, six placed schematics, governance files, tracker and G2 gate evidence, leaving G3, G4 and G5 open.

## Outcome

- Impact: author for EFMP-407 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 45 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFMP-407 Unit 1 in English with its course overview, six placed schematics, governance files, tracker and G2 gate evidence, leaving G3, G4 and G5 open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Figure text geometry is unmeasured (`measure-figure-text.mjs` needs a browser, forbidden by the brief), so check CI's `figure-geometry` result on the six SVGs and fix any overlap before translating labels.
  - Topic 1.2 teaches that the Brundtland Report came from a commission and tells learners how to handle the guide's "conferences" wording (D-2026-0076, G-2026-169); keep this in the Urdu mirror, and G3 should check the one Orr sentence, which rests on secondary sources.
  - All eleven Urdu labels in `concepts/unit-01.md` are authored because none is in `terminology.csv`, and banner `fig-U1-7` is still `prompt-only`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
