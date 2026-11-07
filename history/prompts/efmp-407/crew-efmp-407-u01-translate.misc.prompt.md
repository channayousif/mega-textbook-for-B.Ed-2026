---
id: crew-efmp-407-u01-translate
title: crew translate EFMP-407 unit 1
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u01-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261148-efmp407-translation-evidence-refresh.general.prompt.md
 - history/prompts/general/554-efmp407-translation-baseline-blocker.general.prompt.md
 - specs/content/efmp-407/reviews/unit-01/G2/20261107T101732391Z-gates.json
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T101732391Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T101732391Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T101732391Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T101732391Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T101732391Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T101732391Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T101732391Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261107T101732391Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
 - specs/content/efmp-407/translation/unit-01.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u01-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-01/`.

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
- (efmp-407-u01-review_en, review_en, codex) Fresh review needs complete source binding, run provenance, independent assessment solving and browser/print evidence.
- (efmp-407-u01-review_en, review_en, codex) Author must repair Orr attribution disclosure and RRQ-09 source qualifications.
- (efmp-407-u01-review_en, review_en, codex) Fresh review needs complete source binding, run provenance, independent assessment solving and browser/print evidence.
- (efmp-407-u01-author, author, claude) Figure text geometry is unmeasured (`measure-figure-text.mjs` needs a browser, forbidden by the brief), so check CI's `figure-geometry` result on the six SVGs and fix any overlap before translating labels.
- (efmp-407-u01-author, author, claude) Topic 1.2 teaches that the Brundtland Report came from a commission and tells learners how to handle the guide's "conferences" wording (D-2026-0076, G-2026-169); keep this in the Urdu mirror, and G3 should check the one Orr sentence, which rests on secondary sources.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-407 Unit 1 (docs/semester-3/efmp-407/unit-01): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Refreshed stale Unit 1 G2 evidence and tracker references, recorded the work, and preserved draft status pending English repairs.

## Outcome

- Impact: translate for EFMP-407 Unit 1 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Refreshed stale Unit 1 G2 evidence and tracker references, recorded the work, and preserved draft status pending English repairs.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English author must repair Orr attribution disclosure and RRQ-09 source uncertainty before G4 resumes.
  - English author must repair Orr attribution disclosure and RRQ-09 source uncertainty before G4 resumes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
