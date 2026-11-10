---
id: crew-efmp-303-u05-repair_en-r1
title: crew repair_en EFMP-303 unit 5
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u05-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u05-repair_en-r2.misc.prompt.md
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u05-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u05-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-303/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-05/`.

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
From `specs/content/efmp-303/reviews/unit-05/G3/20261108T203238Z-g3-desk-b2674e94.json` (disposition: revise). Resolve each one:
- [blocking] F3: sources/unit-05.md, Unverifiable sources: no retrieval-attempt record or explicit owner authorization; claim-level disclaimer conflicts with specific policy and national trend assertions in both topics. Khan 2018 is used but absent from the source table; wb_hci has no retrievable document locator. Repair source register and bind actual supporting passages before fresh review.
- [blocking] F4: concepts/unit-05.md assessment mappings are semantically incorrect: curriculum maps MCQ-02 (teacher development), teacher training maps MCQ-04 (human capital), human capital maps MCQ-05/06 and RRQ-04 (quality cycle/inclusion), inequality maps MCQ-07 (training), inclusion maps MCQ-09 (standardization). Remap to actual item demand.
- [blocking] F5: unit-assessment.mdx RRQ-08 and its model assert a greatest-barriers pair without comparative evidence. Remove the ranking or supply justified comparative criteria; accept defensible examples.
- [blocking] F6: unit-assessment.mdx RRQ-02 marks omit why-mechanism-matters; RRQ-09 marks omit comparison and restrict judgement to teacher training. Align scoring with requested reasoning and allow justified alternatives. MCQ-09 is recognition, not Apply; RRQ-10 is explanation, not application. ERQ rubrics need descriptors that distinguish causal analysis and evaluation from listing.
- [blocking] F7: Both topic opening situations read as observed local events, with relative dates and specific incidents but no evidence or hypothetical label. Identify as constructed illustrations or document provenance; avoid presenting invented local incidents as reporting.
- [blocking] F10: Topic 5.1 Teacher training reduces the differentiated NEP 2009 qualification policy to all teachers holding at least B.Ed. by 2018. Preserve level distinctions and exceptions. See source-inspection.md for the exact policy locator; this external retrieval is supplementary, not a newly accepted manifest input.
- [advisory] F9: MCQ letters are B except item 8; several distractors are implausible. Rebalance and improve distractors. fig-U5-2 still labels accreditation authority NACTE / HEC despite prose distinction; clarify remit with sources. SVG fig-U5-4 puts Gender norms at x=660..760 over the employment box x=520..680; inspect overlap in a real render.
- [uncertain] F1: Author run identity and exact model build were not supplied. Reviewer is the actual CODEX_SESSION_ID in execution.json; author_run_id is explicitly unknown. This session did not author the unit, but independent handoff provenance cannot be fully verified. Manifest was prepared here over clean HEAD, not supplied by a separate parent.
- [uncertain] F2: Current narrow-screen and A4 rendered evidence unavailable under the brief prohibition on builds and servers. See render-limitation.txt. No accessibility pass claimed.
- [uncertain] F8: Topic 5.1 Standardization calls SNC the most recent effort and implies all-province reach without dated authoritative support. Verify scope and currency, including provincial adaptation, in a new bound source bundle.

## Notes from earlier jobs on this unit
- (efmp-303-u05-repair_en-conflict1, fix, opencode) `specs/content/efmp-303/tasks.md` now carries main's Unit 4 and Unit 3 advisory rows followed by this branch's Unit 5 row; the merge also pulled main's Unit 3/Unit 4 repair changes into the branch.
- (efmp-303-u05-repair_en-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated with `npm run build:content-status`; regenerate it again after any tracker edit or `check:content-status` fails as stale.
- (efmp-303-u05-repair_en-conflict1, fix, opencode) Unit 5 G3 stays advisory/open; a fresh independent G3 run (then G5) owns acceptance.
- (efmp-303-u05-repair_en, repair_en, opencode) G3 row left unticked with the advisory repair suggestion; a fresh independent G3 run (then G5) owns acceptance.
- (efmp-303-u05-repair_en, repair_en, opencode) `specs/content/efmp-303/sources/texts/nep2009.md` and `gem-report2020.md` must stay deleted because other units cite those keys and their presence invalidates Units 1, 2, 4 and 6 G2 evidence.


## Response snapshot

Verified G3 findings F3-F10 were already resolved on main by the 2026-11-03 repair, appended the unticked Unit 5 G3 advisory tracker row naming report 20261108T203238Z-g3-desk-b2674e94, and committed it with a PHR.

## Outcome

- Impact: repair_en for EFMP-303 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified G3 findings F3-F10 were already resolved on main by the 2026-11-03 repair, appended the unticked Unit 5 G3 advisory tracker row naming report 20261108T203238Z-g3-desk-b2674e94, and committed it with a PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Latest G3 report 20261108T203238Z repeats the previous report's findings verbatim; F3-F10 were already resolved on main by 9403865b5, so a fresh G3 run should re-read rather than re-apply.
  - Narrow 360px and A4 print render inspection remains undone; it needs a host allowed to build and run a browser.
  - PHR ID is crew-efmp-303-u05-repair_en-r2 because crew-efmp-303-u05-repair_en-r1 was already taken by the earlier continuation on branch crew/efmp-303-u05-repair_en.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
