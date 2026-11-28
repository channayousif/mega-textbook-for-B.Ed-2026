---
id: crew-efpg-402-u05-repair_en
title: crew repair_en EFPG-402 unit 5
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: efpg-402
branch: crew/efpg-402-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-05/topic-01.mdx
 - docs/semester-4/efpg-402/unit-05/topic-02.mdx
 - docs/semester-4/efpg-402/unit-05/topic-04.mdx
 - docs/semester-4/efpg-402/unit-05/topic-05.mdx
 - docs/semester-4/efpg-402/unit-05/unit-assessment.mdx
 - history/prompts/general/20261311-efpg402-u05-repair-en.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/unit-assessment.mdx
 - specs/content/efpg-402/figures/unit-05.md
 - specs/content/efpg-402/reviews/unit-05/G2/20261128T070512414Z-gates.json
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T070512414Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T070512414Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T070512414Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T070512414Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T070512414Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T070512414Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T070512414Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261128T070512414Z/validate-content.txt
 - specs/content/efpg-402/sources/unit-05.md
 - specs/content/efpg-402/tasks.md
 - static/img/figures/efpg-402/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.ur.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-7.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-7.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-7.ur.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-7.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u05-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efpg-402/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-05/`.

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
From `specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en.json` (disposition: revise). Resolve each one:
- [blocking] docs/semester-4/efpg-402/unit-05/topic-04.mdx:68 misstates Rowe: it says increasing wait-time makes "speculative guessing drop". The bound excerpt at specs/content/efpg-402/sources/texts/rowe-1974-waittime.md:16 says the opposite: "The incidence of speculative responses increased." Replace with the documented effect (for example "failures to respond decrease" or "speculative responses increase").
- [blocking] specs/content/efpg-402/sources/unit-05.md:16 overstates its grounding: it says each sub-topic mapped to an unverifiable source is also grounded in a bound excerpt or a verifiable open-access reference, but specs/content/efpg-402/coverage/unit-05.md maps U5-02 and U5-07 to yadav-2002 alone and U5-03/U5-08 to mager-1962-objectives / wellington-2012-management, which are themselves declared unverifiable. The prose attributes the lesson-plan definition (topic-01.mdx:42), the Herbartian five steps (topic-02.mdx:44), the ABCD framework (topic-03.mdx:56) and the management framing (topic-05.mdx:48...
- [advisory] static/img/figures/efpg-402/unit-05/fig-U5-4.svg alt text (topic-02.mdx:76 and specs/content/efpg-402/figures/unit-05.md) says "four criteria: philosophical basis, teacher role, student role, and ideal classroom use", but the figure's rows are Theory, Teacher Role, Student Role, Sequence and Explanation; "ideal classroom use" is not in the figure. Update the alt text.
- [advisory] docs/semester-4/efpg-402/unit-05/unit-assessment.mdx MCQ key: A 0, B 4, C 6, D 0. Options A and D are never correct, so the answer position is predictable. Rebalance option order.
- [advisory] docs/semester-4/efpg-402/unit-05/unit-assessment.mdx ERQ 4 rubric names an "atmospheric pressure lesson" that the ERQ 4 prompt never sets. Align the rubric with the prompt.
- [advisory] Bare-URL link text in the Further reading lists (topic-02.mdx:133, topic-04.mdx:156, topic-05.mdx:139). Use descriptive link text.
- [advisory] docs/semester-4/efpg-402/unit-05/topic-01.mdx:65 uses "cognitive dissonance" without defining it for an HSC reader.
- [advisory] static/img/figures/efpg-402/unit-05/fig-U5-7.svg alt text omits the metacognitive row that the figure shows.
- [advisory] docs/semester-4/efpg-402/unit-05/topic-02.mdx:80 invites pupils to "taste small safe samples"; school laboratory safety rules usually prohibit tasting. Prefer observation and indicator testing, or state the food-grade context.
- [uncertain] render-review tooling limitation: scripts/render-inspect.mjs exited 1 with 10 defects, all of the form "fig-U5-12: variant light not served" for the five WebP classroom illustrations (fig-U5-12 to fig-U5-16). Section D builds its geometry URL as <id>.svg, but those figures are .webp, so the URLs 404 by construction. Live production inspection at deployed SHA e29224ece (equal to reviewed HEAD) verified all 7 pages clean at desktop 1280x900, narrow 360x780 and A4 print 794px, all 10 schematic SVGs clean on text geometry, and all five WebP images served and rendered. In accordance with the cre...

## Notes from earlier jobs on this unit
- (efpg-402-u05-review_en, review_en, claude_crew) The two blocking findings are the whole blocker: fix the Rowe sentence and correct/recast the sources declaration, then a fresh bundle and reviewer are needed (ADR-0019 cycle 1 of 2).
- (efpg-402-u05-review_en, review_en, claude_crew) `render-review` exited 1 only on the WebP-as-SVG tool limitation; the live pages, narrow view, A4 print and schematic SVG geometry were clean, so accessibility is recorded unverified rather than failed.
- (efpg-402-u05-review_en, review_en, claude_crew) Report at `specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en.json`; evidence, logs and PNGs in the sibling `crew-job-efpg-402-u05-review_en/` folder.
- (efpg-402-u05-illustrate, illustrate, agy) Banner fig-U5-11 and topic scenes fig-U5-12 to fig-U5-16 are placed in English and Urdu unit files with refreshed G2 evidence passing all gates.
- (efpg-402-u05-illustrate, illustrate, agy) Independent qualified G3 English review and G5 Urdu review (with 360px and A4 print layout inspection) remain open in tasks.md.


## Response snapshot

Applied the Unit 5 G3 findings in English and Urdu (Rowe correction, honest sources declaration, all advisories), refreshed G2 evidence and added the tracker row, leaving G3 unticked.

## Outcome

- Impact: repair_en for EFPG-402 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the Unit 5 G3 findings in English and Urdu (Rowe correction, honest sources declaration, all advisories), refreshed G2 evidence and added the tracker row, leaving G3 unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Not in the G3 report, still open: fig-U5-4 (EN and UR) leaves out the fifth Herbartian step, Application.
  - Topic 5.3 credits a four-part ABCD framework to Mager (1962), which is unverified and may be wrong; the figure and check question 1 there speak of three components.
  - Clean-up time is 7 minutes in fig-U5-9 and the Topic 5.5 timetable but 5 minutes in the activity and ERQ 5 marking guide; `render-inspect.mjs` still requests `.svg` for WebP figures.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
