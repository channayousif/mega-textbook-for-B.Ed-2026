---
id: crew-gpks-402-u02-translate-conflict1
title: crew fix GPKS-402 unit 2
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u02-translate
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gpks-402/crew-gpks-402-u02-translate-conflict1.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u02-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/unit-teacher-notes.mdx
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-1.ur.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-2.ur.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-3.ur.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u02-translate-conflict1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gpks-402-u02-translate conflicts with main (specs/content/gpks-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GPKS-402 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-02/`.

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
- (gpks-402-u02-translate, translate, claude) Urdu rendered-page inspection (`render-inspect --locale ur`) was not run because builds are forbidden; G5 needs it.
- (gpks-402-u02-translate, translate, claude) The English has three unfixed inconsistencies, carried into the Urdu as written: fig-U2-4 is 820 wide but tagged 780; MCQ 10 says "twenty-five years" in the option but "two decades" in the key; MCQ 4 says "proportional representation" where the topic says "weightage".
- (gpks-402-u02-translate, translate, claude) The bank spelling الی گڑھ (should be علی گڑھ) and the `پاکستان کے مطالعہ` form need an owner ruling before G5.
- (gpks-402-u02-author-conflict1, fix, agy) Preserved both Unit 1 and Unit 2 G2 gate evidence and tracker rows in specs/content/gpks-402/tasks.md.
- (gpks-402-u02-author-conflict1, fix, agy) Unit 2 English draft and 4 schematic figures remain verified and ready for independent G3 English review.


## Response snapshot

Merged origin/main into crew/gpks-402-u02-translate, resolved the conflict in specs/content/gpks-402/tasks.md by preserving Unit 2 G4 translation and Unit 4 rows, and verified all content gates pass.

## Outcome

- Impact: fix for GPKS-402 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gpks-402-u02-translate, resolved the conflict in specs/content/gpks-402/tasks.md by preserving Unit 2 G4 translation and Unit 4 rows, and verified all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Preserved Unit 2 G4 ur-translation tracker row alongside main's Unit 4 rows in specs/content/gpks-402/tasks.md.
  - English draft inconsistencies (fig-U2-4 width, MCQ 10 duration, MCQ 4 weightage) and bank spelling الی گڑھ remain carried into Urdu and need review before G5.
  - Rendered page inspection (render-inspect --locale ur) was not run because builds are forbidden; G5 review needs it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
