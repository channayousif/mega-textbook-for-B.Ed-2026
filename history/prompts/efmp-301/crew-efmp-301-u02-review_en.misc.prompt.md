---
id: crew-efmp-301-u02-review_en
title: crew review_en EFMP-301 unit 2
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - history/prompts/efmp-301/crew-efmp-301-u02-review_en.misc.prompt.md
  - specs/content/efmp-301/reviews/unit-02/G3/22ba096a-360e-434d-bbff-e55d664db642.json
  - specs/content/efmp-301/reviews/unit-02/G3/22ba096a-360e-434d-bbff-e55d664db642.summary.md
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/check-bloom-bands.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/check-concept-graph.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/check-content.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/check-depth-gate.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/check-docs-sync.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/check-figures.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/check-no-answer-keys.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/check-no-em-dash.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/check-source-floor.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/figures-variants-check.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/measure-figure-text.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/render-review.txt
  - specs/content/efmp-301/reviews/unit-02/G3/logs-22ba096a/validate-content.txt
  - specs/content/efmp-301/tasks.md
  - static/content-status.json
tests:
  - npm run check:content
  - node scripts/review-evidence.mjs validate specs/content/efmp-301/reviews/unit-02/G3/22ba096a-360e-434d-bbff-e55d664db642.json
---

## Prompt

# Crew job efmp-301-u02-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u02-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-301 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-02/`.

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

Executed independent second-cycle G3 English review of EFMP-301 Unit 2. Verified all round-1 findings: confirmed repairs for Finding 1 (assessment blueprint rebalanced to 3/3/2/2 MCQs and 2/3/2/3 RRQs; CON:EFMP-301-2-7 covered with dedicated items), Finding 3 (practical work correctly attributed as unit instantiation of generic guide list), Finding 4 (fig-U2-6 text shortened to 'met', resolving 0.3px viewBox overflow), Finding 5 (Urdu Glossary import fixed), Finding 6 (MCQ key clustering spread across options), Finding 8 (number drift corrected to 109 to 125 cm), and Finding 9 (theoretical grounding in Erikson trust / Maslow belonging added to seifert2009.md). Carried unresolved Finding 2 (sources table in sources/unit-02.md omits seifert-hk despite line 6 claiming both guide books are bound). Noted render-review limitation under brief execution restrictions. Escalated to curriculum owner under ADR-0019 repair cycle limit (2/2) with disposition escalate. Emitted validated report 22ba096a-360e-434d-bbff-e55d664db642.json, summary markdown, and updated advisory tracker row without ticking G3 or adding reviewer initials.

## Outcome

- Impact: Independent G3 advisory review completed for EFMP-301 Unit 2 (Attempt 2, escalate).
- Tests: `npm run check:content` passed (all 13 content gates pass); report validated via `node scripts/review-evidence.mjs validate`.
- Files: 18 files (evidence report, summary, 13 log files, tasks.md, content-status.json, PHR).
- Next prompts: Crew planner / curriculum owner intake for escalated unit 2 review.
- Reflection: In the second review cycle under ADR-0019, any lingering blocking finding (omission in the sources declaration table) forces an escalation rather than a revise disposition, preserving governance integrity.

## Handoff (for CEO and agents)

- Shipped / changed: Produced G3 review report 22ba096a-360e-434d-bbff-e55d664db642.json and summary, updated tasks.md advisory row, and refreshed static/content-status.json.
- Decisions the team must respect: G3 remains unticked (`▢`) with no reviewer initials; no certification or provisional pass is claimed; repair limit reached (ADR-0019 cycle 2/2).
- Pending / next owner: Curriculum owner for escalation resolution (adding seifert-hk to sources/unit-02.md table and conducting visual browser inspection).
- Notes for the next job on this unit:
  - Finding 2 requires adding `seifert-hk` to the sources table in `specs/content/efmp-301/sources/unit-02.md` (the excerpt already exists at `specs/content/efmp-301/sources/texts/seifert-hk.md`).
  - Dynamic 360px viewport and print inspection must be conducted in an environment permitted to run a build and dev server.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): validate-content PASS, check:depth-gate PASS, check:figures PASS, check:no-em-dash PASS, check:no-answer-keys PASS, check:docs-sync PASS, check:concept-graph PASS, check:bloom-bands PASS, check:source-floor PASS, check:content-status PASS, check:pipeline-gate PASS.
