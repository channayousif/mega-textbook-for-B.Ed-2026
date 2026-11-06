---
id: crew-gicp-400-u01-review_en
title: crew G3 English review of GICP-400 unit 1
stage: misc
date: 2026-11-06
surface: agent
model: longcat/LongCat-2.0
feature: gicp-400
branch: crew/gicp-400-u01-review_en
user: crew
command: crew review
labels: ["crew", "opencode", "review"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: specs/014-agent-review-governance/contracts/review-evidence.md
  pr: null
files:
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/manifest.json
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/crew-gicp-400-u01-review_en.json
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/findings.md
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/assessment-independent.md
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/input-verification.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/render-review.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/logs/validate_content.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/logs/check_depth-gate.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/logs/check_figures.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/logs/check_no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/logs/check_no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/logs/check_docs-sync.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/logs/check_concept-graph.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/logs/check_bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/logs/check-content.txt
 - specs/content/gicp-400/tasks.md
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/crew-gicp-400-u01-review_en.json
---

## Prompt

# Crew job gicp-400-u01-review_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GICP-400 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Completed an independent G3 English review of GICP-400 Unit 1: validated evidence report, independent assessment solutions, findings, command logs and an advisory tracker row. Disposition escalate.

## Outcome

- Impact: G3 English review of GICP-400 Unit 1 by opencode (attempt 1 after an earlier no-commit attempt).
- Tests: npm run check:content passed; report structurally valid (escalate).
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Independent G3 evidence report for GICP-400 Unit 1 at specs/content/gicp-400/reviews/unit-01/G3/crew-gicp-400-u01-review_en/crew-gicp-400-u01-review_en.json, with findings, independent assessment solutions, command logs and an advisory tracker row.
- Decisions the team must respect: G3 remains open and unsigned. The reviewer did not tick G3, add initials or sign. The report is advisory.
- Pending / next owner: crew lead and the coordinator. The next job must supply the author run identity and a parent-prepared bundle, bind the Hassan full text or a complete authorised unavailable-source declaration, and have an authorised host run the render and SVG geometry checks before a fresh independent reviewer rechecks.
- Notes for the next job on this unit:
  - The unit's main claims are supported; four secondary Hassan attributions are not established by the bound notes.
  - Browser/print accessibility and SVG glyph geometry remain unverified under the crew brief's browser prohibition.
  - G4 Urdu translation and banner production remain open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: the previous attempt exited without committing any change; this attempt committed the report and advisory row.
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS (escalate).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
