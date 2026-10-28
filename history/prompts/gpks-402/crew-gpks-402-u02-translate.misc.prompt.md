---
id: crew-gpks-402-u02-translate
title: crew translate GPKS-402 unit 2
stage: misc
date: 2026-10-28
surface: agent
model: claude
feature: gpks-402
branch: crew/gpks-402-u02-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
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

# Crew job gpks-402-u02-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GPKS-402 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

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
- (gpks-402-u02-author-conflict1, fix, agy) Preserved both Unit 1 and Unit 2 G2 gate evidence and tracker rows in specs/content/gpks-402/tasks.md.
- (gpks-402-u02-author-conflict1, fix, agy) Unit 2 English draft and 4 schematic figures remain verified and ready for independent G3 English review.
- (gpks-402-u02-author, author, agy) All four Unit 2 schematic figures (fig-U2-1 timeline, fig-U2-2 diagram, fig-U2-3 flowchart, fig-U2-4 table) and their derived dark variants are placed; Urdu variants (.ur.svg) remain to be created during G4 translation.
- (gpks-402-u02-author, author, agy) G2 gate evidence is recorded in specs/content/gpks-402/reviews/unit-02/G2/ and verified with tasks.md; unit is ready for independent G3 English review.

## Feedback from the previous attempt
worker exited 1:
Permission deny rule (.claude/settings.json): Write(video-studio/episodes/**/approvals.jsonl) is not matched by file permission checks  -  only Edit(path) rules are. Use Edit(video-studio/episodes/**/approvals.jsonl) instead (Edit rules cover all file-editing tools).
You've hit your 5-hour limit · resets 7:10pm (Etc/GMT-5)



## Response snapshot

Translated GPKS-402 Unit 2 into its complete Urdu mirror (5 MDX files, 4 mirrored `.ur.svg` figures plus dark variants, `key_terms` bound to the term bank) and recorded the G4 tracker row, with `translation_status` left at draft.

## Outcome

- Impact: translate for GPKS-402 Unit 2 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GPKS-402 Unit 2 into its complete Urdu mirror (5 MDX files, 4 mirrored `.ur.svg` figures plus dark variants, `key_terms` bound to the term bank) and recorded the G4 tracker row, with `translation_status` left at draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu rendered-page inspection (`render-inspect --locale ur`) was not run because builds are forbidden; G5 needs it.
  - The English has three unfixed inconsistencies, carried into the Urdu as written: fig-U2-4 is 820 wide but tagged 780; MCQ 10 says "twenty-five years" in the option but "two decades" in the key; MCQ 4 says "proportional representation" where the topic says "weightage".
  - The bank spelling الی گڑھ (should be علی گڑھ) and the `پاکستان کے مطالعہ` form need an owner ruling before G5.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
