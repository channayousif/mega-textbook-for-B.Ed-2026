---
id: crew-efmp-301-u09-repair_en
title: crew repair_en EFMP-301 unit 9
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: efmp-301
branch: crew/efmp-301-u09-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-09/topic-01.mdx
 - docs/semester-1/efmp-301/unit-09/topic-02.mdx
 - docs/semester-1/efmp-301/unit-09/topic-03.mdx
 - docs/semester-1/efmp-301/unit-09/unit-assessment.mdx
 - docs/semester-1/efmp-301/unit-09/unit-teacher-notes.mdx
 - history/prompts/general/20261115-repair-efmp301-unit-nine.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/unit-teacher-notes.mdx
 - specs/content/efmp-301/concepts/unit-09.md
 - specs/content/efmp-301/coverage/unit-09.md
 - specs/content/efmp-301/figures/unit-09.md
 - specs/content/efmp-301/reviews/unit-09/G2/20261103T054027035Z-gates.json
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261103T054027035Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261103T054027035Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261103T054027035Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261103T054027035Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261103T054027035Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261103T054027035Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261103T054027035Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261103T054027035Z/validate-content.txt
 - specs/content/efmp-301/reviews/unit-09/repairs/20261103-codex/content-baseline.txt
 - specs/content/efmp-301/reviews/unit-09/repairs/20261103-codex/content-final.txt
 - specs/content/efmp-301/reviews/unit-09/repairs/20261103-codex/figure-geometry.txt
 - specs/content/efmp-301/reviews/unit-09/repairs/20261103-codex/frozen-input/manifest.json
 - specs/content/efmp-301/reviews/unit-09/repairs/20261103-codex/handoff.md
 - specs/content/efmp-301/reviews/unit-09/repairs/20261103-codex/unit-tests.txt
 - specs/content/efmp-301/sources/unit-09.md
 - specs/content/efmp-301/tasks.md
 - static/img/figures/efmp-301/unit-09/fig-U9-6.dark.svg
 - static/img/figures/efmp-301/unit-09/fig-U9-6.svg
 - static/img/figures/efmp-301/unit-09/fig-U9-6.ur.dark.svg
 - static/img/figures/efmp-301/unit-09/fig-U9-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u09-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u09-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
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
From `specs/content/efmp-301/reviews/unit-09/G3/20261102T212207Z-g3-desk-b282fccc.json` (disposition: revise). Resolve each one:
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
- (efmp-301-u09-review_en, review_en, codex) Owner handling is required for unresolved assessment, source and pedagogy findings, plus current mobile/A4 inspection.
- (efmp-301-u09-review_en, review_en, codex) Owner handling is required for unresolved assessment, source and pedagogy findings, plus current mobile/A4 inspection.


## Response snapshot

Repaired Unit 9 assessment, pedagogy, source attribution, activity timing and figures in English and Urdu, with refreshed evidence and repair records.

## Outcome

- Impact: repair_en for EFMP-301 Unit 9 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 35 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 9 assessment, pedagogy, source attribution, activity timing and figures in English and Urdu, with refreshed evidence and repair records.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked; owner must arrange current mobile/A4 rendering and authenticated independent review provenance.
  - G3 remains unticked; owner must arrange current mobile/A4 rendering and authenticated independent review provenance.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
