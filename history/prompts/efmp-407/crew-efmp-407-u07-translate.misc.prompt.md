---
id: crew-efmp-407-u07-translate
title: crew translate EFMP-407 unit 7
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u07-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261157-efmp407-unit-seven-translation-blocker.general.prompt.md
 - specs/content/efmp-407/reviews/unit-07/G4/translation-blocker.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u07-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u07-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-07/`.

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
- (efmp-407-u07-review_en-r1, review_en, opencode) F1 blocking - NEP 2009 is cited to section 6.1 in topic-01.mdx:33 and :107, sources/unit-07.md:7 and sources/texts/nep-2009.md:7; the passage is in section 6.2 (Curriculum Reform), policy action 5 (printed page 36), so repair_en should fix those four locators.
- (efmp-407-u07-review_en-r1, review_en, opencode) The tracker row deliberately does not say "repairs applied", so the planner should queue repair_en for the revise verdict; the report supersedes the merged escalate at reviews/unit-07/G3/crew-efmp-407-u07-review_en/.
- (efmp-407-u07-review_en-r1, review_en, opencode) No live browser render was possible (brief bars build, dev server and Playwright; no Chrome for the browser MCP), so accessibility passed on sharp PNG renders plus static layout checks; textbook.com.pk now publishes Unit 7, so a later permitted render job should confirm the live pages.
- (efmp-407-u07-review_en, review_en, opencode) F1 blocking - NEP 2009 is cited to section 6.1; the passage is in section 6.2 (Curriculum Reform), policy action 5. Repair in topic-01.mdx:33 and :107, sources/unit-07.md:7 and sources/texts/nep-2009.md:7.
- (efmp-407-u07-review_en, review_en, opencode) F2 - a fresh review needs an actual narrow-view and A4 print inspection of the rendered Unit 7 pages; the live site does not publish Unit 7 and the brief bars build, dev server and Playwright.


## Response snapshot

Recorded the unresolved English citation blocker and required repair handoff; Urdu translation was not started.

## Outcome

- Impact: translate for EFMP-407 Unit 7 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the unresolved English citation blocker and required repair handoff; Urdu translation was not started.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - repair_en must resolve F1 before G4 resumes; translation status remains draft.
  - repair_en must resolve F1 before G4 resumes; translation status remains draft.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
