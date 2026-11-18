---
id: crew-efmp-407-u07-review_en-r1
title: crew review_en EFMP-407 unit 7
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u07-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "opencode", "review_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/assessment-independent.md
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/crew-efmp-407-u07-review_en-r1.json
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/input-verification.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check-content.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check_bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check_concept-graph.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check_depth-gate.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check_docs-sync.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check_figures.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check_no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check_no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check_source-floor.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/check_svg-style.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/measure-figure-text.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/rasterize.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/logs/validate_content.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/manifest.json
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/render-review.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/renders/fig-U7-1-light.png
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/renders/fig-U7-1.dark.png
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/renders/fig-U7-2-light.png
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/renders/fig-U7-2.dark.png
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/renders/fig-U7-3-light.png
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/renders/fig-U7-3.dark.png
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/renders/fig-U7-4-light.png
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/renders/fig-U7-4.dark.png
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/source-verification.md
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/summary.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u07-review_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u07-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-407 Unit 7 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

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


## Response snapshot

Added the EFMP-407 Unit 7 r1 G3 English advisory revise report (NEP 2009 section locator blocking; sources fail, other six criteria pass) with sharp figure renders, hashed logs, a new advisory tracker row, committed on the branch.

## Outcome

- Impact: review_en for EFMP-407 Unit 7 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 29 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the EFMP-407 Unit 7 r1 G3 English advisory revise report (NEP 2009 section locator blocking; sources fail, other six criteria pass) with sharp figure renders, hashed logs, a new advisory tracker row, committed on the branch.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F1 blocking - NEP 2009 is cited to section 6.1 in topic-01.mdx:33 and :107, sources/unit-07.md:7 and sources/texts/nep-2009.md:7; the passage is in section 6.2 (Curriculum Reform), policy action 5 (printed page 36), so repair_en should fix those four locators.
  - The tracker row deliberately does not say "repairs applied", so the planner should queue repair_en for the revise verdict; the report supersedes the merged escalate at reviews/unit-07/G3/crew-efmp-407-u07-review_en/.
  - No live browser render was possible (brief bars build, dev server and Playwright; no Chrome for the browser MCP), so accessibility passed on sharp PNG renders plus static layout checks; textbook.com.pk now publishes Unit 7, so a later permitted render job should confirm the live pages.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
