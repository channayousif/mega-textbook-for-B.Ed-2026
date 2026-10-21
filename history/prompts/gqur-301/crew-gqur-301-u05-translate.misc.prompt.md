---
id: crew-gqur-301-u05-translate
title: crew translate GQUR-301 unit 5
stage: misc
date: 2026-10-21
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u05-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/unit-teacher-notes.mdx
 - static/img/figures/gqur-301/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-1.ur.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-2.ur.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-3.ur.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-4.ur.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-5.ur.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/gqur-301/unit-05/fig-U5-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u05-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u05-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-05/`.

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
- (gqur-301-u05-review_en, review_en, codex) Resolve assessment findings, G1/source evidence, run provenance and rendered inspection before fresh review.
- (gqur-301-u05-review_en, review_en, codex) Resolve assessment findings, G1/source evidence, run provenance and rendered inspection before fresh review.

## Feedback from the previous attempt
worker exited 1:
You've hit your weekly limit · resets 11pm (Etc/GMT-5)



## Response snapshot

Translated GQUR-301 Unit 5 (Measures of Central Tendency - II) into its complete Urdu G4 mirror: 6 prose files (index, 3 topics, assessment with 10/10/5 bank + answers, teacher notes) and 6 .ur.svg figure variants, all committed on branch crew/gqur-301-u05-translate.

## Outcome

- Impact: translate for GQUR-301 Unit 5 by opencode (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GQUR-301 Unit 5 (Measures of Central Tendency - II) into its complete Urdu G4 mirror: 6 prose files (index, 3 topics, assessment with 10/10/5 bank + answers, teacher notes) and 6 .ur.svg figure variants, all committed on branch crew/gqur-301-u05-translate.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - terminology.csv holds none of this unit's terms; all Urdu labels are authored per the concept graph (Mode->عادہ, Mean->اوسط, Median->میڈین, Modal class->عادی جماعت) and need G5 confirmation.
  - figure desc/alt alignment was checked by gate but G5 should verify Nastaliq rendering and text-fit inside the inherited viewBox at narrow width and A4 print.
  - brief noted earlier G3 escalation items (RRQ 6 counterexample, RRQ 7 majority language, source/provenance) remain open on the English baseline; this Urdu mirror follows the current English text as-is.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
