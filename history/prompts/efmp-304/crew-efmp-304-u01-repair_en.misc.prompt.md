---
id: crew-efmp-304-u01-repair_en
title: crew repair_en EFMP-304 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: efmp-304
branch: crew/efmp-304-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-304/unit-01/topic-02.mdx
 - docs/semester-2/efmp-304/unit-01/topic-03.mdx
 - docs/semester-2/efmp-304/unit-01/unit-assessment.mdx
 - history/prompts/efmp-304/20261019-repair-unit-one-g3-findings.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/unit-assessment.mdx
 - specs/content/efmp-304/concepts/unit-01.md
 - specs/content/efmp-304/figures/unit-01.md
 - specs/content/efmp-304/reviews/unit-01/G2/20261019T121920528Z-gates.json
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-01/G2/logs-20261019T121920528Z/validate-content.txt
 - specs/content/efmp-304/reviews/unit-01/G3/repair-handoff-20261019.md
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-1.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-10.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-10.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-4.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-4.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-5.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-5.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-7.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-7.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u01-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-304/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-run5e4cc29c.json` (disposition: revise). Resolve each one:
- [blocking] static/img/figures/efmp-304/unit-01/fig-U1-3.svg and fig-U1-3.dark.svg contain an XML syntax error on line 1 at column 1877: stray double quote after closing tag (can</text"><text x="446" y="106">solve a two-step word problem</text>). This causes an XML parser error ("expected >") in browsers, preventing the image from loading and resulting in naturalWidth 0 on topic-02. Repair: remove the stray double quote so the markup reads can</text><text x="446" y="106">.
- [blocking] Ten text-geometry defects across five schematic SVGs in both light and dark variants: fig-U1-1 (by 47.3px), fig-U1-4 (by 34.6px), fig-U1-5 (by 34.6px), fig-U1-7 (by 34.6px), and fig-U1-10 (by 34.6px) have the site wordmark text "textbook.com.pk" overflowing past the 780px viewBox right edge. Detected by scripts/measure-figure-text.mjs and render-inspect.mjs. Repair: adjust wordmark coordinates or anchor to keep text inside the 780px viewBox (e.g., using x="764" text-anchor="end").
- [blocking] Assessment blueprint violation on RRQ per-topic distribution. specs/content/efmp-304/content-spec.md lines 327 and 336 require at least 2 RRQs per topic across 1.1 to 1.5, noting the 10 RRQ slots are exactly saturated (2 per topic). unit-assessment.mdx provides only 1 RRQ for Topic 1.1 (RRQ 1), while Topic 1.3 has 3 RRQs (RRQ 2, RRQ 5, RRQ 9). Corroborated by concepts/unit-01.md. Repair: rebalance by replacing one Topic 1.3 item (e.g. RRQ 9) with a Topic 1.1 RRQ addressing the functions of thought or the distinction between critical thinking and general scepticism.
- [advisory] specs/content/efmp-304/figures/unit-01.md line 7 states "Every figure is Status: prompt-only" in its prose preamble, whereas all 10 rows in the table below carry Status: placed. Repair: update line 7 to state placed.
- [advisory] Bare DOI URLs are used as accessible link text in Further reading sections: topic-02.mdx line 142 (https://doi.org/10.46328/ijonses.711) and topic-03.mdx line 137 (https://doi.org/10.1177/14697874231168341). Repair: anchor links to article titles for improved screen-reader accessibility.

## Notes from earlier jobs on this unit
- (efmp-304-u01-translate-r1, translate, codex) Translation remains draft; independent G3/G5 and narrow-width/A4 rendered inspection remain pending.
- (efmp-304-u01-translate-r1, translate, codex) Translation remains draft; independent G3/G5 and narrow-width/A4 rendered inspection remain pending.


## Response snapshot

Repaired Unit 1 SVGs, rebalanced RRQ coverage in English and Urdu, corrected manifest prose and article links, and refreshed G2 evidence while leaving G3 unticked.

## Outcome

- Impact: repair_en for EFMP-304 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 1 SVGs, rebalanced RRQ coverage in English and Urdu, corrected manifest prose and article links, and refreshed G2 evidence while leaving G3 unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh independent G3/G5 remain pending; inspect Figure 3’s cosmetic footer intersection.
  - Fresh independent G3/G5 remain pending; inspect Figure 3’s cosmetic footer intersection.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
