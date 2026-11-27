---
id: crew-efpc-411-u01-translate
title: crew translate EFPC-411 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efpc-411
branch: crew/efpc-411-u01-translate
user: crew
command: crew translate
labels: ["crew", "claude_crew", "translate"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpc-411/crew-efpc-411-u01-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/unit-assessment.mdx
 - specs/content/efpc-411/reviews/unit-01/G4/translation-handoff.md
 - specs/content/efpc-411/tasks.md
 - static/img/figures/efpc-411/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-1.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-2.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-3.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-4.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-5.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-7.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-7.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-8.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u01-translate

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFPC-411 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-01/`.

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
- (efpc-411-u01-author-cifix1, fix, claude_crew) Push the branch so PR #882 re-runs CI; the RLS red was shared-DB schema drift (main's 0058), not EFPC-411 content.
- (efpc-411-u01-author-cifix1, fix, claude_crew) Unit 1 English is ready for independent G3; banner figure fig-U1-9 is still prompt-only for the illustration pipeline.
- (efpc-411-u01-author, author, agy) Unit 1 English draft is ready for independent G3 review; banner figure fig-U1-9 is prompt-only for the illustration pipeline.


## Response snapshot

Translated EFPC-411 Unit 1 into a complete draft Urdu mirror with eight RTL-localised Nastaliq figure pairs, recorded the G4 handoff, and left `translation_status: draft` with all 14 content gates green.

## Outcome

- Impact: translate for EFPC-411 Unit 1 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFPC-411 Unit 1 into a complete draft Urdu mirror with eight RTL-localised Nastaliq figure pairs, recorded the G4 handoff, and left `translation_status: draft` with all 14 content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English G3 is still `▢` (not accepted); this Urdu is bound to English `ff6248a9`, so any English repair requires matching Urdu repairs and a fresh G5.
  - `render-inspect.mjs EFPC-411 1 --locale ur` was not run (brief bans dev servers/browser runs other than `measure-figure-text.mjs`); Nastaliq shaping at 360px, bidi punctuation and A4 clipping are unverified.
  - `key_terms` deliberately carries only banked pairs; the 27 unbanked unit terms (classroom observation, checklist, rating scale, anecdotal record, observer bias, constructive feedback and so on) are proposals in the handoff for the owner, not silent bank edits.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
