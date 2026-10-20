---
id: crew-gqur-301-u01-translate-r1
title: crew translate GQUR-301 unit 1
stage: misc
date: 2026-10-20
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u01-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/006-content-pipeline/0022-recheck-gqur301-unit-one-translation.misc.prompt.md
 - specs/content/gqur-301/reviews/unit-01/translation-blocked.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u01-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u01-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-01/`.

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
- (gqur-301-u01-translate, translate, codex) Repair topic-03 tables and fig-U1-5 before resuming G4.
- (gqur-301-u01-translate, translate, codex) Repair topic-03 tables and fig-U1-5 before resuming G4.
- (gqur-301-u01-repair_en, repair_en, claude) The 16 unit-01 SVGs have not been re-measured in Chromium. Run `node scripts/measure-figure-text.mjs static/img/figures/gqur-301/unit-01/*.svg` where a browser is allowed, and check the new fig-U1-1 layout.
- (gqur-301-u01-repair_en, repair_en, claude) X2 (narrow-viewport and A4 print check) is still open, the NCC progression grid PDF has not been found or read, and the unit has no Urdu version yet (G4 pending).
- (gqur-301-u01-review_en-conflict1, fix, codex) Prior review findings remain for the unit repair job: SVG overflows, RRQ 5 counts, and topic-02 citations.


## Response snapshot

Reconfirmed and documented the English arithmetic blocker, validated all content gates, and committed the handoff.

## Outcome

- Impact: translate for GQUR-301 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Reconfirmed and documented the English arithmetic blocker, validated all content gates, and committed the handoff.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Repair topic-03 tables and fig-U1-5 before resuming translation.
  - Repair topic-03 tables and fig-U1-5 before resuming translation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
