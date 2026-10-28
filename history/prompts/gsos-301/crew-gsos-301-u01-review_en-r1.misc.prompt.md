---
id: crew-gsos-301-u01-review_en-r1
title: crew review_en GSOS-301 unit 1
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gsos-301
branch: crew/gsos-301-u01-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261036-gsos301-u01-final-g3-review.general.prompt.md
 - specs/content/gsos-301/reviews/unit-01/G3/18895ffc-9133-4016-98ea-4feb32e69b98.json
 - specs/content/gsos-301/reviews/unit-01/G3/18895ffc-9133-4016-98ea-4feb32e69b98.summary.md
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/check:content.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/check:depth-gate.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/check:docs-sync.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/check:figures.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/check:no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/check:no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/fig-U1-1-render.png
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/independent-assessment-derivation.md
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/manifest.json
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/measure-figure-text.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/render-review.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-18895ffc/validate:content.txt
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u01-review_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u01-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GSOS-301 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-01/`.

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

Conducted the final-cycle independent G3 English review for GSOS-301 Unit 1, verified figure geometry and citation repairs, and recorded an advisory escalate report with an unticked tracker row.

## Outcome

- Impact: review_en for GSOS-301 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Conducted the final-cycle independent G3 English review for GSOS-301 Unit 1, verified figure geometry and citation repairs, and recorded an advisory escalate report with an unticked tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Prior X1 figure geometry (24 SVG variants) and S1 citations/Further reading are verified repaired.
  - Live browser 360px viewport and A4 print view inspection remain unperformed due to host execution limits.
  - This is cycle 2/2 under ADR-0019; G3 remains unticked/uncertified (advisory escalate), requiring owner authorization for further cycles.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
