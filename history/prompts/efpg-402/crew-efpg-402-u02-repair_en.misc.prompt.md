---
id: crew-efpg-402-u02-repair_en
title: crew repair_en EFPG-402 unit 2
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: efpg-402
branch: crew/efpg-402-u02-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-02/topic-02.mdx
 - docs/semester-4/efpg-402/unit-02/topic-03.mdx
 - docs/semester-4/efpg-402/unit-02/topic-04.mdx
 - docs/semester-4/efpg-402/unit-02/unit-assessment.mdx
 - history/prompts/efpg-402/crew-efpg-402-u02-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-02/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-02/unit-assessment.mdx
 - specs/content/efpg-402/figures/unit-02.md
 - specs/content/efpg-402/reviews/unit-02/G2/20261128T065228895Z-gates.json
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261128T065228895Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261128T065228895Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261128T065228895Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261128T065228895Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261128T065228895Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261128T065228895Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261128T065228895Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261128T065228895Z/validate-content.txt
 - specs/content/efpg-402/sources/unit-02.md
 - specs/content/efpg-402/tasks.md
 - static/img/figures/efpg-402/unit-02/fig-U2-3.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-3.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-3.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u02-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u02-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efpg-402/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-02/`.

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
From `specs/content/efpg-402/reviews/unit-02/G3/1947560f-ec6d-49d7-86e1-0c8e0c563ccb.json` (disposition: revise). Resolve each one:
- [blocking] Invented NCP quotations. docs/semester-4/efpg-402/unit-02/topic-03.mdx:54 presents three Grade 4/6/8 human-body SLOs in quotation marks as the NCP progression grid; docs/semester-4/efpg-402/unit-02/unit-assessment.mdx:143 (RRQ 1 model answer) attributes "classify materials as conductors or insulators" to the NCP; docs/semester-4/efpg-402/unit-02/topic-04.mdx:61 quotes "describe the functions of the main organs of the digestive system" as an NCP SLO. The full published NCP Science progression-grid PDF (74 pages, checked 2026-11-28) contains none of these wordings; its actual SLOs are S-04-A-...
- [advisory] docs/semester-4/efpg-402/unit-02/unit-assessment.mdx MCQ correct keys are distributed A: 0, B: 2, C: 7, D: 1. Option A is never the key and C carries 7 of 10; all items and distractors are unambiguous, but balancing the key distribution across A-D is recommended.
- [advisory] docs/semester-4/efpg-402/unit-02/topic-04.mdx:89 summary says "even a widely used textbook can be weak on activities, language or relevance". The worked example concerns a newly received textbook and nowhere establishes that it is widely used. Soften to "a textbook can be weak..." or supply the evidence.
- [advisory] docs/semester-4/efpg-402/unit-02/topic-04.mdx:60 says a diagram labelled "esophagus" uses American spelling "rather than the British spelling ('oesophagus') used in Pakistani exams". The NCP itself prints "esophagus" (S-04-A-17), so the spelling point is weaker than presented. Reword to focus on the foreign source rather than the spelling.
- [advisory] static/img/figures/efpg-402/unit-02/fig-U2-3.svg labels its right-hand column "Sample standard (Grade 6)" with "Classify materials as conductors or insulators and test with circuit", "Explain the water cycle using a labelled diagram" and "Plan a fair test with one variable changed and others controlled". None of these is the NCP's wording (the NCP has "fair test" as one enquiry type and "understand the Water Cycle" at Grade 4). Either label the column as illustrative or use the actual NCP SLOs.
- [uncertain] docs/semester-4/efpg-402/unit-02/topic-02.mdx:40 states the NCP "sets out to build scientific literacy for every pupil" and lists "six broad aims". The published NCP states no list of aims and never uses "scientific literacy" or "spiral". The unit discloses that the aims "can be drawn from" the curriculum, but the summary and the assessment present them as the curriculum's own aims. Reframe them explicitly as the unit's synthesis, or bind a source that states them.
- [uncertain] docs/semester-4/efpg-402/unit-02/unit-assessment.mdx:155 (RRQ 7 model answer) names "Relevance (or inclusivity via illustrations)" as the second weak criterion. Relevance is not one of the six checklist criteria taught in Topic 2.4; the correct second answer is inclusivity (city-only examples exclude rural pupils). This is a marking-guidance defect that would teach the wrong criterion.
- [uncertain] render-review exited 1. render-inspect sections A (desktop), B (narrow) and C (A4 print) are clean against the production build, but section D requests .svg variants for the five WebP illustrations fig-U2-12 to fig-U2-16, which have none, producing ten false-positive defects. The contract requires render-review exit 0 for a pass, so visual accessibility is unverified rather than passed.

## Notes from earlier jobs on this unit
- (efpg-402-u02-review_en, review_en, claude_crew) render-inspect will exit 1 for any unit with placed WebP illustrations (section D requests `.svg`); the A/B/C sections are the usable evidence, but the exit code must be recorded and accessibility left unverified until the script skips non-SVG kinds.
- (efpg-402-u02-review_en, review_en, claude_crew) the blocking repair is the invented NCP SLO wording in topic-03, the RRQ 1 model answer and topic-04; also reflex the "six aims" as the unit's synthesis and change RRQ 7's second criterion to inclusivity.
- (efpg-402-u02-review_en, review_en, claude_crew) G3 stays open and unsigned; the tracker row was not touched, and the advisory row is a proposal for the parent.
- (efpg-402-u02-illustrate, illustrate, agy) Unit banner fig-U2-11 and topic scene illustrations fig-U2-12 through fig-U2-16 are placed in English and Urdu topic files with refreshed G2 gate evidence.
- (efpg-402-u02-illustrate, illustrate, agy) Independent qualified G3 English review and G5 Urdu review (with 360px mobile and A4 print layout inspection) remain open in tasks.md.


## Response snapshot

Applied the Unit 2 G3 findings in EN and UR (real NCP SLOs, six aims framed as synthesis, RRQ 7 fix, balanced MCQ keys, softened Topic 2.4 wording, relabelled fig-U2-3), refreshed G2 evidence and added the advisory G3 row.

## Outcome

- Impact: repair_en for EFPG-402 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the Unit 2 G3 findings in EN and UR (real NCP SLOs, six aims framed as synthesis, RRQ 7 fix, balanced MCQ keys, softened Topic 2.4 wording, relabelled fig-U2-3), refreshed G2 evidence and added the advisory G3 row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Not flagged by G3 but worth checking: Topic 2.2's "thicker textbook" note says the NCP measures textbook quality, which looks unsupported.
  - The Topic 2.3 activity asks groups to trace the water cycle at Grades 4, 6 and 8, but I only saw a Grade 4 SLO; fig-U2-5's Grade 8 matter wording is also unchecked against the NCP.
  - `render-inspect.mjs` still exits 1 on this unit's WebP illustrations, so a G3 rerun will hit the same limitation until the script is fixed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
