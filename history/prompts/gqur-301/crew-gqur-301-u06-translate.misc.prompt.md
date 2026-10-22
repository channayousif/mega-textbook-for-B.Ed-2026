---
id: crew-gqur-301-u06-translate
title: crew translate GQUR-301 unit 6
stage: misc
date: 2026-10-21
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u06-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261021-repair-unit-six-evidence-placement.general.prompt.md
 - history/prompts/general/537-record-unit-six-translation-blocker.general.prompt.md
 - specs/content/gqur-301/reviews/unit-06/translation-validation/content-gates-final.txt
 - specs/content/gqur-301/reviews/unit-06/translation-validation/content-gates-main.txt
 - specs/content/gqur-301/reviews/unit-06/translation-validation/content-gates-rerun.txt
 - specs/content/gqur-301/reviews/unit-06/translation-validation/content-gates.txt
 - specs/content/gqur-301/reviews/unit-06/translation-validation/handoff.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u06-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u06-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-06/`.

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
- (gqur-301-u06-review_en, review_en, codex) Author repairs and G1/provenance resolution remain pending; current narrow-screen and A4 inspection is still required.
- (gqur-301-u06-review_en, review_en, codex) Author repairs and G1/provenance resolution remain pending; current narrow-screen and A4 inspection is still required.
- (gqur-301-u06-author, author, claude) The Urdu mirror still needs translated `.ur.svg` versions of fig-U6-1 to fig-U6-6, and the 10 Urdu concept labels in `concepts/unit-06.md` are my own wording and need G5 review.
- (gqur-301-u06-author, author, claude) `course-overview.mdx` still lists Unit 6 as "(coming soon)" with no link to `./unit-06/index.mdx`.
- (gqur-301-u06-author, author, claude) Do not add Unit 6 notes to `sources/texts/lane2023.md` or `openstax-stats.md`; that makes the G2 records for GQUR-301 Units 1-5 out of date.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GQUR-301 Unit 6 (docs/semester-2/gqur-301/unit-06): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Corrected Unit 6 evidence placement, recorded the translation blocker, and committed validation showing all content gates pass.

## Outcome

- Impact: translate for GQUR-301 Unit 6 by codex (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 8 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Corrected Unit 6 evidence placement, recorded the translation blocker, and committed validation showing all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Separate English author must resolve Unit 6 precision and assessment defects before translation resumes.
  - Separate English author must resolve Unit 6 precision and assessment defects before translation resumes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
