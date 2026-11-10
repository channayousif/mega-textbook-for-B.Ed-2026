---
id: crew-gqur-301-u08-repair_en-r1
title: crew repair_en GQUR-301 unit 8
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u08-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261189-repair-gqur301-unit-eight-g3.general.prompt.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u08-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u08-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
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
From `specs/content/gqur-301/reviews/unit-08/G3/20261108T203238Z-g3-desk-8c860a6f.json` (disposition: revise). Resolve each one:
- [blocking] F1, blocking: topic-03.mdx, Explanation / Choosing the method, worked example 1 calls no repeated digits a safer lock rule. Under uniform choice the legal space falls from 1000 to 720, increasing a single random guess's success from 1/1000 to 1/720. Count alone does not justify the security claim. Remove or qualify the claim with explicit assumptions.
- [blocking] F2, blocking: topic-01.mdx, Arranging some of the items, attributes notation to Chaudhry and Kamal despite sources/unit-08.md declaring the work bibliographic only. Supply actual source evidence or remove the attribution; do not invent retrieval.
- [blocking] F3, blocking: fig-U8-2.svg and its dark variant, caption at y=366 says swapping two people or letters gives a different result in every row, but the KARACHI row contains identical A letters. Swapping those As yields the same visible arrangement. Qualify the caption to distinguish identical items. Preserve figure identity and record author correction before a new review.
- [uncertain] F4, uncertain: the method flowchart fig-U8-5 and its alt text send every unordered choice to C(n,r), without a no-repetition condition; the Topic 8.3 table has that condition. For two selections from A/B with replacement, unordered AA/AB/BB gives 3, not C(2,2)=1. Limit the chart explicitly to the taught distinct-object/no-replacement setting. The side note also needs disjoint cases for addition, as the prose correctly states. Do not expand the approved syllabus to teach a new formula without authority.
- [uncertain] F5, uncertain: parent-prepared frozen handoff and actual author session ID missing; local preparation is documented, not silently treated as a parent handoff. The real reviewer session is recorded. Exact model snapshot is unavailable.
- [uncertain] F6, uncertain: Unit 8 G1 remains open in tasks.md. D-2026-0070 settles chapter partition but explicitly certifies no content and advises fresh intake. Owner/evaluator must establish current G1 authority; this reviewer does not approve it.
- [uncertain] F7, uncertain: required fresh page, narrow viewport and A4 print inspection cannot run under the brief's build/browser prohibition. No actual rendered artifacts are claimed. Static inspection found meaningful alt text, ordered headings and text-supported examples, but cannot verify layout.
- [uncertain] F8, uncertain: the bound Lane source excerpt covers Chapters 1-2 rather than consulted Chapter 5; external retrieval corroborates the concepts but cannot replace a new bound source passage. Topic assessment rubrics were visible inline; the unit-bank pre-guidance save failed, so retained derivations are retrospective. A fresh reviewer must preserve answer-blind evidence.

## Notes from earlier jobs on this unit
- (gqur-301-u08-repair_en-conflict1, fix, opencode) `static/content-status.json` is a gitignored build artifact; regenerate it (`npm run build:content-status`) after any content-affecting merge or the `check:content-status` gate fails.
- (gqur-301-u08-repair_en-conflict1, fix, opencode) The merge pulled in main's repairs for other courses/units (gqur-300, geng-301, gpks-402, gnas-301, gqur-301 units 2/6); those are main's work, not this branch's.
- (gqur-301-u08-repair_en-conflict1, fix, opencode) Unit 8 G3 stays open/unticked; F5-F8 (author-run provenance, open G1, rendered inspection, bound source/answer-blind evidence) remain for the review host, and Urdu figs U8-1..6 plus 8 concept labels are still undone.
- (gqur-301-u08-repair_en, repair_en, agy) Non-author findings F5-F8 (author run ID provenance, open G1 under D-2026-0070, browser/print render inspection under crew constraints, and bound Lane Chapter 5 source excerpt / answer-blind evidence) remain for review host and evaluator resolution.
- (gqur-301-u08-repair_en, repair_en, agy) G3 remains open and unticked in tasks.md awaiting fresh independent review once external provenance and G1 authority are settled.


## Response snapshot

Verified the latest G3 report's F1-F4 findings are already resolved on origin/main by a2c198f71, appended the advisory Unit 8 G3 tracker row naming the report, and committed with a PHR.

## Outcome

- Impact: repair_en for GQUR-301 Unit 8 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the latest G3 report's F1-F4 findings are already resolved on origin/main by a2c198f71, appended the advisory Unit 8 G3 tracker row naming the report, and committed with a PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The 20261108T203238Z report's findings are carried forward from the pre-repair state (its topic-file manifest hashes do not match origin/main), so a fresh G3 run against the committed bytes is needed before acceptance.
  - F5-F8 (author-run provenance, open G1, rendered narrow/A4 inspection, bound Lane Chapter 5 source / answer-blind evidence) remain for the review host and evaluator; G3 stays open and unticked.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
