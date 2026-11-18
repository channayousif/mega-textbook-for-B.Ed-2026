---
id: crew-gicp-400-u07-translate
title: crew translate GICP-400 unit 7
stage: misc
date: 2026-11-06
surface: agent
model: codex
feature: gicp-400
branch: crew/gicp-400-u07-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261141-record-blocked-unit-seven-translation.general.prompt.md
 - specs/content/gicp-400/reviews/unit-07/G4/translation-handoff.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u07-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u07-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-07/`.

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
- (gicp-400-u07-review_en, review_en, claude) Repair needs the actual Dean text (ecommons.aku.edu PDF) and Kennedy text (mdpi.com/2227-7102/2/3/121); do not reuse `sources/texts/dean-2005-citizenship.md`, whose second paragraph is the root of the misattribution.
- (gicp-400-u07-review_en, review_en, claude) The Article 251 fix also touches the `fig-U7-3` label and dark variant plus RRQ 5 and 7 models, and `fig-U7-1` needs its label moved; run `measure-figure-text` where Chromium is allowed.
- (gicp-400-u07-review_en, review_en, claude) The ideology strand awaits an owner ruling; browser and A4 inspection are still outstanding, and this was review round 1 of ADR-0019's limit of 2.
- (gicp-400-u07-author-conflict1, fix, opencode) tasks.md now has two Unit 5 G3 en-review rows (main's codex advisory escalation plus the older placeholder); both were kept on purpose under the append-only rule, not a duplication bug.
- (gicp-400-u07-author-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally; fresh checkouts and CI regenerate it via the prestart hook.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Recorded Unit 7’s translation blocker and repair dependencies without changing draft status or claiming G4 completion.

## Outcome

- Impact: translate for GICP-400 Unit 7 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded Unit 7’s translation blocker and repair dependencies without changing draft status or claiming G4 completion.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English repairs and the owner’s ideology ruling must precede translation.
  - English repairs and the owner’s ideology ruling must precede translation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
