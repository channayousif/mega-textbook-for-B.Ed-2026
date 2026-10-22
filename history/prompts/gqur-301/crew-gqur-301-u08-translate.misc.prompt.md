---
id: crew-gqur-301-u08-translate
title: crew translate GQUR-301 unit 8
stage: misc
date: 2026-10-22
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u08-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-08/_category_.json
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-08/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-08/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-08/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-08/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-08/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-08/unit-teacher-notes.mdx
 - static/img/figures/gqur-301/unit-08/fig-U8-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-1.ur.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-2.ur.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-3.ur.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-4.ur.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-5.ur.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-5.ur.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-6.ur.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u08-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u08-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 8 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-08/`.

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
- (gqur-301-u08-review_en-conflict1, fix, opencode) Unit 8 G3 en-review advisory escalation (F1-F4) remains unresolved; separate author corrections needed.
- (gqur-301-u08-review_en-conflict1, fix, opencode) Urdu versions of fig-U8-1..6 and 8 Urdu concept labels in specs/content/gqur-301/concepts/unit-08.md remain undone and need Urdu review.
- (gqur-301-u08-review_en-conflict1, fix, opencode) course-overview.mdx still lists Unit 8 as "(coming soon)" - outside this job's scope.
- (gqur-301-u08-review_en, review_en, codex) Separate author corrections and a fresh review with provenance, bound sources and rendered accessibility evidence are required.
- (gqur-301-u08-review_en, review_en, codex) Separate author corrections and a fresh review with provenance, bound sources and rendered accessibility evidence are required.

## Feedback from the previous attempt
worker exited 1:
You've hit your weekly limit · resets 11pm (Etc/GMT-5)



## Response snapshot

Translated GQUR-301 Unit 8 (Permutations and Combinations) into complete Urdu mirror at G4: 6 MDX files (index + 3 topics + assessment + teacher notes), key_terms block bound to frozen terminology bank, 6 `.ur.svg` figure variants with matching `<desc>` and dark variants; all 13 content gates pass; translation_status left as draft for independent G5 review.

## Outcome

- Impact: translate for GQUR-301 Unit 8 by opencode (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GQUR-301 Unit 8 (Permutations and Combinations) into complete Urdu mirror at G4: 6 MDX files (index + 3 topics + assessment + teacher notes), key_terms block bound to frozen terminology bank, 6 `.ur.svg` figure variants with matching `<desc>` and dark variants; all 13 content gates pass; translation_status left as draft for independent G5 review.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - MCQ option letters transliterated (A→الف, B→ب, C→ج, D→د) per the reviewed-corpus convention; verify G5 agrees this is the established mapping for GQUR-301 before flipping to `reviewed`. The `concepts/unit-08.md` Urdu labels in the briefer's notes are already authored in the committed concept graph (those are G5-review items, not translation scope). G3 en-review for this unit had advisory escalation (F1-F4) that remains unresolved - English-side corrections are a separate job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
