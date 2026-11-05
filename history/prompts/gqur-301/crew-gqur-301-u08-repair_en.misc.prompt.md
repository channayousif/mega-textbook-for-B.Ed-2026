---
id: crew-gqur-301-u08-repair_en
title: crew repair_en GQUR-301 unit 8
stage: misc
date: 2026-11-05
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u08-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-08/topic-01.mdx
  - docs/semester-2/gqur-301/unit-08/topic-03.mdx
  - history/prompts/gqur-301/crew-gqur-301-u08-repair_en.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-08/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-08/topic-03.mdx
  - specs/content/gqur-301/figures/unit-08.md
  - specs/content/gqur-301/reviews/unit-08/G2/20261105T132237455Z-gates.json
  - specs/content/gqur-301/reviews/unit-08/G2/logs-20261105T132237455Z/check-bloom-bands.txt
  - specs/content/gqur-301/reviews/unit-08/G2/logs-20261105T132237455Z/check-concept-graph.txt
  - specs/content/gqur-301/reviews/unit-08/G2/logs-20261105T132237455Z/check-depth-gate.txt
  - specs/content/gqur-301/reviews/unit-08/G2/logs-20261105T132237455Z/check-docs-sync.txt
  - specs/content/gqur-301/reviews/unit-08/G2/logs-20261105T132237455Z/check-figures.txt
  - specs/content/gqur-301/reviews/unit-08/G2/logs-20261105T132237455Z/check-no-answer-keys.txt
  - specs/content/gqur-301/reviews/unit-08/G2/logs-20261105T132237455Z/check-no-em-dash.txt
  - specs/content/gqur-301/reviews/unit-08/G2/logs-20261105T132237455Z/validate-content.txt
  - specs/content/gqur-301/tasks.md
  - static/img/figures/gqur-301/unit-08/fig-U8-2.dark.svg
  - static/img/figures/gqur-301/unit-08/fig-U8-2.svg
  - static/img/figures/gqur-301/unit-08/fig-U8-2.ur.dark.svg
  - static/img/figures/gqur-301/unit-08/fig-U8-2.ur.svg
  - static/img/figures/gqur-301/unit-08/fig-U8-5.dark.svg
  - static/img/figures/gqur-301/unit-08/fig-U8-5.svg
  - static/img/figures/gqur-301/unit-08/fig-U8-5.ur.dark.svg
  - static/img/figures/gqur-301/unit-08/fig-U8-5.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job gqur-301-u08-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u08-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-08/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 8 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-08/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gqur-301/reviews/unit-08/G3/20261102T212207Z-g3-desk-d528518f.json` (disposition: revise). Resolve each one:
- [blocking] F1, blocking: topic-03.mdx, Explanation / Choosing the method, worked example 1 calls no repeated digits a safer lock rule. Under uniform choice the legal space falls from 1000 to 720, increasing a single random guess's success from 1/1000 to 1/720. Count alone does not justify the security claim. Remove or qualify the claim with explicit assumptions.
- [blocking] F2, blocking: topic-01.mdx, Arranging some of the items, attributes notation to Chaudhry and Kamal despite sources/unit-08.md declaring the work bibliographic only. Supply actual source evidence or remove the attribution; do not invent retrieval.
- [blocking] F3, blocking: fig-U8-2.svg and its dark variant, caption at y=366 says swapping two people or letters gives a different result in every row, but the KARACHI row contains identical A letters. Swapping those As yields the same visible arrangement. Qualify the caption to distinguish identical items. Preserve figure identity and record author correction before a new review.
- [uncertain] F4, uncertain: the method flowchart fig-U8-5 and its alt text send every unordered choice to C(n,r), without a no-repetition condition; the Topic 8.3 table has that condition. For two selections from A/B with replacement, unordered AA/AB/BB gives 3, not C(2,2)=1. Limit the chart explicitly to the taught distinct-object/no-replacement setting. The side note also needs disjoint cases for addition, as the prose correctly states. Do not expand the approved syllabus to teach a new formula without authority.
- [uncertain] F5, uncertain: parent-prepared frozen handoff and actual author session ID missing; local preparation is documented, not silently treated as a parent handoff. The real reviewer session is recorded. Exact model snapshot is unavailable.
- [uncertain] F6, uncertain: Unit 8 G1 remains open in tasks.md. D-2026-0070 settles chapter partition but explicitly certifies no content and advises fresh intake. Owner/evaluator must establish current G1 authority; this reviewer does not approve it.
- [uncertain] F7, uncertain: required fresh page, narrow viewport and A4 print inspection cannot run under the brief's build/browser prohibition. No actual rendered artifacts are claimed. Static inspection found meaningful alt text, ordered headings and text-supported examples, but cannot verify layout.
- [uncertain] F8, uncertain: the bound Lane source excerpt covers Chapters 1-2 rather than consulted Chapter 5; external retrieval corroborates the concepts but cannot replace a new bound source passage. Topic assessment rubrics were visible inline; the unit-bank pre-guidance save failed, so retained derivations are retrospective. A fresh reviewer must preserve answer-blind evidence.

## Notes from earlier jobs on this unit
- (gqur-301-u08-translate, translate, opencode) MCQ option letters transliterated (A→الف, B→ب, C→ج, D→د) per the reviewed-corpus convention; verify G5 agrees this is the established mapping for GQUR-301 before flipping to `reviewed`. The `concepts/unit-08.md` Urdu labels in the briefer's notes are already authored in the committed concept graph (those are G5-review items, not translation scope). G3 en-review for this unit had advisory escalation (F1-F4) that remains unresolved - English-side corrections are a separate job.
- (gqur-301-u08-review_en-conflict1, fix, opencode) Unit 8 G3 en-review advisory escalation (F1-F4) remains unresolved; separate author corrections needed.
- (gqur-301-u08-review_en-conflict1, fix, opencode) Urdu versions of fig-U8-1..6 and 8 Urdu concept labels in specs/content/gqur-301/concepts/unit-08.md remain undone and need Urdu review.
- (gqur-301-u08-review_en-conflict1, fix, opencode) course-overview.mdx still lists Unit 8 as "(coming soon)" - outside this job's scope.
- (gqur-301-u08-review_en, review_en, codex) Separate author corrections and a fresh review with provenance, bound sources and rendered accessibility evidence are required.

## Response snapshot

Repaired GQUR-301 Unit 8 G3 findings F1-F4: removed the unjustified "safer rule" lock security claim in topic-03; removed the unsupported Chaudhry & Kamal attribution for P(n, r) notation in topic-01; qualified the fig-U8-2 caption to distinguish swapping distinct items from identical letters; limited fig-U8-5 flowchart and alt text to distinct items without unordered repetition and specified disjoint cases for addition in the side note; mirrored all changes in the Urdu translation files and SVGs; refreshed G2 gate evidence and appended an advisory repair row with G3 unticked.

## Outcome

- Impact: repair_en for GQUR-301 Unit 8 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GQUR-301 Unit 8 G3 findings F1-F4 across EN and UR topics and SVGs, updated figure manifest prompt and alt text, refreshed G2 gate evidence, and appended an advisory G3 tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit leaves G3 unticked and does not certify anything. F5-F8 (author-run provenance, open G1, rendered inspection, bound sources and answer-blind evidence) remain for review host / evaluator.
- Pending / next: Unit 8 requires a fresh independent G3 English review once evaluator resolves G1 and bound sources.
