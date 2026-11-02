---
id: crew-efmp-305-u02-review_ur
title: crew review_ur EFMP-305 unit 2
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u02-review_ur
user: crew
command: crew review_ur
labels: ["crew", "opencode", "review_ur"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u02-review_ur.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-02/G5/manifest.json
 - specs/content/efmp-305/reviews/unit-02/G5/crew-efmp-305-u02-g5-rabe274b8.json
 - specs/content/efmp-305/reviews/unit-02/G5/crew-efmp-305-u02-g5-rabe274b8.summary.md
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-depth-gate.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-docs-sync.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-figures.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-no-answer-keys.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-no-em-dash.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/validate-content.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/measure-figure-text.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/render-figures.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/render-figures.mjs
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/render-review.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-1-ur-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-1-ur-dark-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-2-ur-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-2-ur-dark-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-3-ur-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-3-ur-dark-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-4-ur-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-4-ur-dark-svg.png
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/efmp-305/reviews/unit-02/G5/crew-efmp-305-u02-g5-rabe274b8.json
---

## Prompt

# Crew job efmp-305-u02-review_ur

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-review_ur`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of EFMP-305 Unit 2 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 2 only: its docs/licence and i18n files, its rows and folders under `specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Response snapshot

Ran the G5 review end to end: prepared a 108-input manifest, ran all six deterministic gates at exit 0, rendered the four Urdu figure variants to PNG with sharp, measured all 16 SVG variants clean, completed a passage-by-passage bilingual comparison, validated the report, appended the advisory tracker row and regenerated content status.

## Outcome

- Impact: first independent G5 review of the EFMP-305 Unit 2 Urdu mirror by opencode.
- Tests: `npm run check:content` 13/13 PASS after regenerating `static/content-status.json`; `node scripts/review-evidence.mjs validate` exit 0.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge; the owner rules on the terminology bank departures and a render-capable G5 pass is needed.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: advisory G5 evidence report `specs/content/efmp-305/reviews/unit-02/G5/crew-efmp-305-u02-g5-rabe274b8.json` (disposition escalate) with summary, 108-input manifest, six gate logs, eight sharp PNGs of the Urdu figures, geometry log and render-review log; advisory tracker row appended to `specs/content/efmp-305/tasks.md` (Unit 2 G5, `▢`, `agent:opencode`).
- Decisions the team must respect: the review is advisory under ADR-0019 and certifies nothing. The escalation rests on two facts: page-level browser render was unavailable (no build/dev server/Playwright; model cannot read images), and the prose departs from the frozen terminology bank on Assessment/Slow Learner/Learning Outcome while Labelling is unbanked. Do not tick G5 or flip `translation_status` on the strength of this report.
- Pending / next owner: curriculum owner to rule on the terminology bank (bank the prose forms as accepted pairs or require the banked forms); crew lead to arrange a render-capable G5 pass and human inspection of the committed PNGs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: first attempt on this branch; no earlier work to continue.
- Graders run and results (PASS/FAIL): check:content PASS (13/13); review-evidence validate PASS.
- Prompt variant (if applicable): crew brief v1 (opencode worker).
- Next experiment (smallest change to try): none.
