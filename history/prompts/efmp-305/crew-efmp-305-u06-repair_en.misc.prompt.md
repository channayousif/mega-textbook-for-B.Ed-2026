---
id: crew-efmp-305-u06-repair_en
title: crew repair_en EFMP-305 unit 6
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: efmp-305
branch: crew/efmp-305-u06-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/2445-unit-six-g3-repair-verification.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-06/G3/20261103-repair-notes.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u06-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-305/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-06/`.

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
From `specs/content/efmp-305/reviews/unit-06/G3/20261102T212207Z-g3-desk-5907f448.json` (disposition: revise). Resolve each one:
- [blocking] Unit depth budget: Unit-total estimated reading time is 193 minutes, exceeding the approved depth-budget band of 140–170 minutes by 23 minutes (check:depth-gate exits with code 1). Individual topic estimates are within planning bands (topic-01: 46 min [40–50], topic-02: 53 min [45–55], topic-03: 48 min [45–55]). The unit total requires CurriculumOwner evaluation and course band reconciliation or scope trim.
- [advisory] Research context and local applicability: Empirical studies cited (Fu et al., 2022 in China; Álvarez-Couto et al., 2026 qualitative review in Spain; Khalid et al., 2021 in Punjab; Virani & Ali, 2022 in Pakistan) are appropriately caveated in authored prose regarding sample sizes, qualitative methodology, and non-causal associations.
- [uncertain] Full-text source retrieval for UNICEF (2014): Verification notes at specs/content/efmp-305/sources/texts/unicef2014.md preserve prior-run provenance and paraphrased locators, but continuation retrieval returned HTTP 403. While citations and conceptual use are sound, full-text verification remains pending accessible retrieval.

## Notes from earlier jobs on this unit
- (efmp-305-u06-translate-r1, translate, codex) Translation remains draft pending independent G5 review; fresh rendered Urdu inspection is still required.
- (efmp-305-u06-translate-r1, translate, codex) Translation remains draft pending independent G5 review; fresh rendered Urdu inspection is still required.
- (efmp-305-u06-translate-cifix1, fix, opencode) The test:review ENOTEMPTY in "unit-scoped binding: a sibling unit does not invalidate this unit" is a cleanup race in the harness, not a content issue  -  a re-run should clear it.
- (efmp-305-u06-translate-cifix1, fix, opencode) Unit 6 Urdu mirror (6 files + 6 .ur.svg variants) is on origin/main from earlier merges; this branch only carries the PHR and tasks.md G4 tracker update.
- (efmp-305-u06-translate, translate, agy) All 6 .ur.svg figure variants are wired in topics 1-3 with matching carrier alt text; figures:variants:check passes cleanly.


## Response snapshot

Verified the existing 149-minute depth total, resolved UNICEF retrieval uncertainty, and committed Unit 6 repair evidence, the advisory tracker row, and PHR.

## Outcome

- Impact: repair_en for EFMP-305 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the existing 149-minute depth total, resolved UNICEF retrieval uncertainty, and committed Unit 6 repair evidence, the advisory tracker row, and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked pending fresh independent review.
  - G3 remains unticked pending fresh independent review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
