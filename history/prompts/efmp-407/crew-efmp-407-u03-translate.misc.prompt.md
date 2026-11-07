---
id: crew-efmp-407-u03-translate
title: crew translate EFMP-407 unit 3
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u03-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261161-efmp-407-u03-evidence-repair.general.prompt.md
 - history/prompts/general/2462-efmp-407-u03-translation-blocked.general.prompt.md
 - specs/content/efmp-407/reviews/unit-03/G2/20261107T173333898Z-gates.json
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T173333898Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T173333898Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T173333898Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T173333898Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T173333898Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T173333898Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T173333898Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T173333898Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
 - specs/content/efmp-407/translation/unit-03.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-03/`.

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
- (efmp-407-u03-review_en, review_en, codex) Author repairs are needed for source support, contradictory SDG 5 category guidance, readability and worked examples; rendering and provenance remain unverified.
- (efmp-407-u03-review_en, review_en, codex) Author repairs are needed for source support, contradictory SDG 5 category guidance, readability and worked examples; rendering and provenance remain unverified.
- (efmp-407-u03-author-r1, author, claude) The G2 evidence covers Unit 3's committed English files, so any later edit to them makes it stale; refresh it with `node scripts/prepare-gate-evidence.mjs --refresh-stale`.
- (efmp-407-u03-author-r1, author, claude) `static/content-status.json` is gitignored, but `check:content-status` fails after any `tasks.md` edit until you run `npm run build:content-status` locally.
- (efmp-407-u03-author-r1, author, claude) Banner `fig-U3-7` is still prompt-only, and five stray Unit 1 rows remain inside the Unit 2 backward-design table in `tasks.md` (outside this job's scope).

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-407 Unit 3 (docs/semester-3/efmp-407/unit-03): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Refreshed Unit 3 G2 evidence and documented the unresolved English baseline blocker preventing Urdu translation.

## Outcome

- Impact: translate for EFMP-407 Unit 3 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Refreshed Unit 3 G2 evidence and documented the unresolved English baseline blocker preventing Urdu translation.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English author must reconcile SDG 5 category guidance before G4 resumes; draft status remains unchanged.
  - English author must reconcile SDG 5 category guidance before G4 resumes; draft status remains unchanged.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
