---
id: crew-gqur-301-u11-translate
title: crew translate GQUR-301 unit 11
stage: misc
date: 2026-10-22
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u11-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/_category_.json
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/unit-teacher-notes.mdx
 - static/content-status.json
 - static/img/figures/gqur-301/unit-11/fig-U11-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-1.ur.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-2.ur.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-3.ur.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u11-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u11-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 11 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-11/`.

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
- (gqur-301-u11-review_en, review_en, claude) F1 (RRQ 10 model answer says 5.0, correct is 2.75 for one flawed item) needs a separate author repair; the rest are advisory.
- (gqur-301-u11-review_en, review_en, claude) The next G3 attempt needs a real 360px, A4 print and dark-theme render plus `measure-figure-text.mjs` on fig-U11-1..4, run through `scripts/heavy.sh`, and the Lane and OpenStax passages bound under `sources/texts/`.


## Response snapshot

Translated GQUR-301 Unit 11 (Probabilistic Models) into its complete Urdu G4 mirror  -  index, two topic files, 10/10/5 assessment with bounded answers, teacher notes  -  plus four translated-label `.ur.svg` figure variants with dark variants, all 13 content gates passing.

## Outcome

- Impact: translate for GQUR-301 Unit 11 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GQUR-301 Unit 11 (Probabilistic Models) into its complete Urdu G4 mirror  -  index, two topic files, 10/10/5 assessment with bounded answers, teacher notes  -  plus four translated-label `.ur.svg` figure variants with dark variants, all 13 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Statistics terms (ماڈل, دو حدی, نارمل, متوقع قدر, تغیر, تجربی قاعدہ) are authored/concept-graph labels not in the frozen terminology bank  -  propose them to the owner for banking at G5. The earlier G3 advisory F1 (RRQ 10 model answer: 5.0 instead of 2.75) is an English content defect; this Urdu mirrors the uncorrected English and should be re-checked after the author repair. No rendered Urdu inspection (render-inspect.mjs) was run  -  G5 should verify Nastaliq shaping and A4 print for the ne...
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
