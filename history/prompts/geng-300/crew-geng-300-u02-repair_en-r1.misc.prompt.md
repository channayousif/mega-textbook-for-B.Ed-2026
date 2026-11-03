---
id: crew-geng-300-u02-repair_en-r1
title: crew repair_en GENG-300 unit 2
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: geng-300
branch: crew/geng-300-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/geng-300/unit-02/topic-01.mdx
 - docs/semester-1/geng-300/unit-02/topic-02.mdx
 - docs/semester-1/geng-300/unit-02/topic-03.mdx
 - docs/semester-1/geng-300/unit-02/unit-assessment.mdx
 - history/prompts/geng-300/crew-geng-300-u02-repair_en-r1.misc.prompt.md
 - specs/content/geng-300/concepts/unit-02.md
 - specs/content/geng-300/coverage/unit-02.md
 - specs/content/geng-300/figures/unit-02.md
 - specs/content/geng-300/reviews/unit-02/G2/20261103T043450445Z-gates.json
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261103T043450445Z/validate-content.txt
 - specs/content/geng-300/tasks.md
 - static/img/figures/geng-300/unit-02/fig-U2-4.dark.svg
 - static/img/figures/geng-300/unit-02/fig-U2-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u02-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-300/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-02/`.

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
From `specs/content/geng-300/reviews/unit-02/G3/20261102T211054Z-g3-desk-5d4f13a0.json` (disposition: revise). Resolve each one:
- [blocking] A1: unit-assessment.mdx MCQ 1-10 and RRQ 1-10 do not meet content-spec.md Unit 2 minimum of two MCQs and two RRQs per topic for Topic 2.3. Supply items requiring its four-move/critical-evaluation skills; see assessment-analysis.md.
- [blocking] A2: unit-assessment.mdx ERQ 3 requires application to a described short text but supplies no text and no explicit selection instructions. Provide a common stimulus or clear selection criteria and align the rubric.
- [advisory] P1: topic-02.mdx Summary lists five strategies but Check your understanding 1 and unit-assessment.mdx RRQ 3 request the four; clarify the intended set. Topic 2.3 provides no worked complete four-move analysis before independent application; focused listening is described without a listening activity.
- [advisory] C1: coverage/unit-02.md U2-07 names a nonexistent section. concepts/unit-02.md maps stereotypes to RRQ 1/7, which assess purpose/audience and bias rather than stereotypes. Align governance locators to actual demands.
- [uncertain] E1: Current desktop/narrow/A4 render inspection and fig-U2-5 glyph-clearance measurement unavailable: crew brief prohibits builds, servers and Playwright/Chromium. Carry earlier figure-overlap advisory as unverified after source-coordinate repair.
- [uncertain] E2: Parent frozen manifest, actual author run identity and exact model snapshot were not supplied. Local preparation verifies current committed inputs, not upstream execution provenance. Assessment answers were exposed with the questions; blind pre-key solve cannot be certified.
- [uncertain] U1: D-2026-0019 describes three units while current approved content-spec and intake evaluation describe four, with D-2026-00XX confirmation placeholder. Owner must reconcile authority; Unit 2 subject coverage itself matches the guide.
- [uncertain] S1: topic-03.mdx Summative task uses an unnamed latest government report and 15-percent increase; unit-assessment.mdx ERQ 2 attributes passages to official/community reports; fig-U2-4 claims examples from Pakistani media. Label constructed material explicitly or supply bound support. Declared unavailable books are not themselves a failure under D-2026-0001.

## Notes from earlier jobs on this unit
- (geng-300-u02-review_en-r1-conflict1, fix, claude) The Unit 2 block in tasks.md now has three G3 en-review rows, two from main and the newest from this branch (the `20261028-codex-r1.json` escalation). Only the owner can act on that escalation, because the review cycle limit is used up.
- (geng-300-u02-review_en-r1, review_en, codex) Owner action needed on assessment coverage, ERQ 3’s missing stimulus, authority/provenance gaps and unavailable render checks; final review cycle exhausted.
- (geng-300-u02-review_en-r1, review_en, codex) Owner action needed on assessment coverage, ERQ 3’s missing stimulus, authority/provenance gaps and unavailable render checks; final review cycle exhausted.
- (geng-300-u02-repair_en-conflict1, fix, codex) Earlier Unit 2 repairs still need fresh independent G3 review.
- (geng-300-u02-repair_en-conflict1, fix, codex) Earlier Unit 2 repairs still need fresh independent G3 review.


## Response snapshot

Repaired GENG-300 Unit 2 against the 5d4f13a0 G3 report (new Topic 2.3 MCQ/RRQ items, a text for ERQ 3 with an aligned rubric, worked four-move example and listening activity, labels on most made-up material, corrected coverage and concept maps), appended the advisory G3 row, refreshed G2 evidence and committed locally.

## Outcome

- Impact: repair_en for GENG-300 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GENG-300 Unit 2 against the 5d4f13a0 G3 report (new Topic 2.3 MCQ/RRQ items, a text for ERQ 3 with an aligned rubric, worked four-move example and listening activity, labels on most made-up material, corrected coverage and concept maps), appended the advisory G3 row, refreshed G2 evidence and committed locally.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - E1, E2 and U1 are still open and need the owner or a host with a browser; a fresh independent G3 review needs owner authorisation because the cycle limit is used up.
  - RRQ 1 now tests stereotypes rather than purpose and audience; MCQ 8, MCQ 10 and RRQ 5 are new Topic 2.3 items, and the concept map was updated to match.
  - S1 is only partly done: ERQ 2's passages are still unlabelled, and the approved content-spec still says fig-U2-4 uses "examples from Pakistani media" (left unedited).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
