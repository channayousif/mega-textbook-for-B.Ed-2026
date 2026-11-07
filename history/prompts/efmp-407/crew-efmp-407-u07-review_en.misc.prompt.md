---
id: crew-efmp-407-u07-review_en
title: crew review_en EFMP-407 unit 7
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u07-review_en
user: crew
command: crew review_en
labels: ["crew", "opencode", "review_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u07-review_en.misc.prompt.md
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/assessment-independent.md
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/crew-efmp-407-u07-review_en.json
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check-content.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check_bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check_concept-graph.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check_depth-gate.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check_docs-sync.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check_figures.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check_no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check_no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check_source-floor.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/check_svg-style.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/input-verification.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/measure-figure-text.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/render-review.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/logs/validate_content.txt
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/manifest.json
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/source-verification.md
 - specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en/summary.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u07-review_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u07-review_en`.
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

Added the EFMP-407 Unit 7 independent G3 English advisory escalation evidence (wrong NEP 2009 section locator, no render possible) with hashed logs, an open tracker row and the PHR, committed on the branch.

## Outcome

- Impact: review_en for EFMP-407 Unit 7 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the EFMP-407 Unit 7 independent G3 English advisory escalation evidence (wrong NEP 2009 section locator, no render possible) with hashed logs, an open tracker row and the PHR, committed on the branch.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F1 blocking - NEP 2009 is cited to section 6.1; the passage is in section 6.2 (Curriculum Reform), policy action 5. Repair in topic-01.mdx:33 and :107, sources/unit-07.md:7 and sources/texts/nep-2009.md:7.
  - F2 - a fresh review needs an actual narrow-view and A4 print inspection of the rendered Unit 7 pages; the live site does not publish Unit 7 and the brief bars build, dev server and Playwright.
  - F4 advisory - move the National SDG Framework unavailable-source declaration to `## Unverifiable sources` with attempts, date and D-2026-0001.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
