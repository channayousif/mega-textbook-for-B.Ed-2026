---
id: crew-gsos-301-u05-translate
title: crew translate GSOS-301 unit 5
stage: misc
date: 2026-10-22
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u05-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-05/unit-teacher-notes.mdx
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u05-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u05-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-05/`.

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
- (gsos-301-u05-review_en, review_en, opencode) The blocking finding is the unverified visual accessibility (render review). A separate render inspection (build + serve + small-screen/print checks) must be run before this unit can be certified G3. The three no-external-source items (Lady Health Worker 1994 start, low-fee private schooling spread, Council of Islamic Ideology advisory role) and the unextracted OpenStax 15.1 wording are advisory only.
- (gsos-301-u05-author, author, claude) Three Pakistani facts are not tied to a source and are marked `no-external-source` for the G3 reviewer to check: the Lady Health Worker programme starting in 1994, the spread of low-fee private schools, and the Council of Islamic Ideology's advisory role.
- (gsos-301-u05-author, author, claude) The Urdu translation job needs to make `.ur.svg` versions of fig-U5-1 to fig-U5-4. All 14 Urdu concept labels are newly authored (none are in `terminology.csv`) and need G5 review.
- (gsos-301-u05-author, author, claude) The sharp image renderer draws these SVGs solid black because it can't read their colour variables, so to preview one, substitute the colour values first.


## Response snapshot

translate for GSOS-301 Unit 5

## Outcome

- Impact: translate for GSOS-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: translate for GSOS-301 Unit 5
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
