---
id: crew-efmp-301-u09-repair_en-r1
title: crew repair_en EFMP-301 unit 9
stage: misc
date: 2026-11-09
surface: agent
model: opencode
feature: efmp-301
branch: crew/efmp-301-u09-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261187-repair-efmp301-unit-nine-g3.general.prompt.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u09-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u09-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-09/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 9 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 9 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-09/`.

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
From `specs/content/efmp-301/reviews/unit-09/G3/20261108T203238Z-g3-desk-cb72c312.json` (disposition: revise). Resolve each one:
- [blocking] Prior finding4 remains partly unresolved: MCQ primary spread is 3/3/4, required 4/3/3; concept graph maps replacement MCQ8 to 9.3. RRQ 3/4/3 is repaired. Author must repair mapping and bank coherently, not silently amend approved spec.
- [blocking] Authority: teacher-notes Practical work attributes a chapter-specific double-marking assignment to the guide; guide:1181-1192 has general practical categories only. Label as authored implementation, preserving course-guide authority.
- [blocking] Sources/pedagogy: topic03 Explanation/Summary and fig-U9-6 categorically prohibit dual formative/summative use and promise threat within a month, beyond the bound assessment-for-learning and motivation/feedback passages. Qualify illustrations, distinguish past lessons from future learning, and support retained general claims; check MCQ8 and RRQ8/10.
- [blocking] Pedagogy: topic02 Activity advertises about 20 minutes but requires remarking an hour later. State a feasible two-phase schedule.
- [advisory] Prior finding5 unresolved: 9/10 keys remain b, only MCQ9 is c. Redistribute correct option positions.
- [advisory] Prior finding6 partly unresolved: MCQ8 now Understand; MCQ3/9 and RRQ8/10 still recognition of worked cases under Apply labels; RRQ band has no Analyze demand. Relevel or introduce novel reasoning.
- [advisory] Prior finding7 partly unresolved: index December wording fixed, topic01 still announces three assessments before introducing a fourth December instrument. Align scenario, teacher notes and ERQ1.
- [advisory] Prior finding8 partly unresolved: manifest sum instance fixed, certify still board certificate versus board examination in fig-U9-1. Align record with asset.
- [advisory] Assessment: ERQ rubrics allocate marks for unspecified word counts and lack performance anchors/model outlines. Provide clear limits and partial/full-credit distinctions.
- [uncertain] Prior finding10 current render limitation remains: brief forbids build/dev server/Playwright; no current narrow/A4 or glyph inspection. Historical renders do not prove repaired presentation. Owner must arrange permitted frozen-input render review.
- [uncertain] Assessment: topic02 single-score geography scenario cannot establish repeatability; later prose/check5 assume the same 40 percent twice, and ERQ2 lacks evidence or explicit uncertainty guidance. Stipulate repeat evidence or accept reliability not established and ask for appropriate checks.
- [uncertain] Provenance: parent did not supply current frozen manifest or exact repair author-session identity; new clean-input manifest prepared locally. Commit identities are not authenticated run provenance. Exact GPT-6 model revision unavailable. No certification possible.

## Notes from earlier jobs on this unit
- (efmp-301-u09-repair_en-conflict1, fix, opencode) Unit 9 G3 stays unticked; owner must arrange current mobile/A4 rendering and authenticated independent review provenance.
- (efmp-301-u09-repair_en-conflict1, fix, opencode) The shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, terminology.csv) were untouched by both sides, so no union or ID renumbering was needed.
- (efmp-301-u09-repair_en, repair_en, codex) G3 remains unticked; owner must arrange current mobile/A4 rendering and authenticated independent review provenance.
- (efmp-301-u09-repair_en, repair_en, codex) G3 remains unticked; owner must arrange current mobile/A4 rendering and authenticated independent review provenance.
- (efmp-301-u09-review_en, review_en, codex) Owner handling is required for unresolved assessment, source and pedagogy findings, plus current mobile/A4 inspection.


## Response snapshot

Verified the current EN/UR unit already satisfies every open finding of the Unit 9 G3 desk report, appended the advisory repair row naming cb72c312 with G3 left unticked, and committed with PHR 20261187; all 14 content gates pass.

## Outcome

- Impact: repair_en for EFMP-301 Unit 9 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the current EN/UR unit already satisfies every open finding of the Unit 9 G3 desk report, appended the advisory repair row naming cb72c312 with G3 left unticked, and committed with PHR 20261187; all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner must still arrange permitted current render review and authenticated independent review provenance; the desk report's MCQ3/MCQ9 Apply-label note is stale (RRQ8 is already Analyze) and needs no edit.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
