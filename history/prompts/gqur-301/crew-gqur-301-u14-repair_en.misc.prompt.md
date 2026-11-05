---
id: crew-gqur-301-u14-repair_en
title: crew repair_en GQUR-301 unit 14
stage: misc
date: 2026-11-05
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u14-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-14/topic-01.mdx
 - docs/semester-2/gqur-301/unit-14/topic-02.mdx
 - docs/semester-2/gqur-301/unit-14/unit-assessment.mdx
 - history/prompts/gqur-301/crew-gqur-301-u14-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/unit-assessment.mdx
 - specs/content/gqur-301/reviews/unit-14/G2/20261105T152528893Z-gates.json
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-14/G3/repair-desk-b6a93c25.md
 - specs/content/gqur-301/sources/unit-14.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u14-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u14-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-14/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 14 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 14 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-14/`.

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
From `specs/content/gqur-301/reviews/unit-14/G3/20261102T212207Z-g3-desk-b6a93c25.json` (disposition: revise). Resolve each one:
- [blocking] docs/semester-2/gqur-301/unit-14/topic-01.mdx, Worked example: estimating a mean (and every reuse): the 15 listed values sum to 503, not 513, so the mean is 33.53, not 34.2; their sample standard deviation is 3.42, not the s = 3.8 used in topic-02's worked example. The wrong 34.2/513 also appears in fig-U14-1, fig-U14-2 ('x = 513 / 15'), fig-U14-3, fig-U14-4, topic-02 Classroom situation and Worked example, and RRQ 1's model answer. 'Step 2: Divide by the sample size (n = 513 / 15 = 34.2)' also misuses n. Repair: change the data so they really give sum 513, mean 34.2 and s 3.8 (or restate e...
- [blocking] docs/semester-2/gqur-301/unit-14/topic-02.mdx, Why a range is more honest than a single number: the example interval '30.5 to 37.9' is not derivable from any stated quantity and contradicts the worked example's 95 per cent interval (32.28, 36.12) for the same officer and data. Repair: use the worked interval (32.3 to 36.1) or state that the earlier range is a placeholder.
- [blocking] docs/semester-2/gqur-301/unit-14/topic-02.mdx, The pieces of a confidence interval and Worked example (also fig-U14-3, activity, CYU 3, summative, RRQ 3/7/9, ERQ 1): the unit estimates sigma with s at n = 9-25 yet uses z* = 1.96, citing Illowsky & Dean Chapter 8. The cited sources (OpenStax 8.2: 'use the Student's t-distribution whenever s is used as an estimate for sigma'; NIST 1.3.5.2 limits use t(1-alpha/2, N-1); Lane 10 'Determine whether to use a t distribution or a normal distribution') contradict this, and the unit's own aside 'or, for small samples, the t-model' is never taught or a...
- [blocking] static/img/figures/gqur-301/unit-14/fig-U14-4.svg and fig-U14-4.dark.svg, subtitle text: measure-figure-text.mjs reports the line 'Ten samples from the same population, each giving a 95 per cent interval. Nine intervals contain the true mean; one does not.' overflows the 780px viewBox by 95.6px in both themes, so the sentence is clipped. Repair: wrap onto two lines or shorten, then re-measure both variants.
- [blocking] docs/semester-2/gqur-301/unit-14/topic-02.mdx, Summative task mini-rubric, Computation row: states the correct interval as '2.12 to 2.68'; 2.4 +/- 1.96 x 0.14 = 2.4 +/- 0.2744 = (2.13, 2.67). The key would mark a correct answer as an error. Repair: '(2.13 to 2.67)'.
- [advisory] docs/semester-2/gqur-301/unit-14/unit-assessment.mdx, MCQ 10 option A and key: the exact interval is (69.14, 74.86); the key says it 'rounds to (69.0, 75.0)', which is wrong at one decimal. Option A is still the best choice. Repair: write option A as (69.1, 74.9) and correct the justification.
- [advisory] docs/semester-2/gqur-301/unit-14/unit-assessment.mdx, RRQ 7 and ERQ 1 guidance: unrounded values are ME 17.53, (232.47, 267.53) and ME 6.07, (33.93, 46.07); the keys (17.52; 6.08, (33.92, 46.08)) come from rounding SE first. Repair: state that either rounding route earns full marks.
- [advisory] docs/semester-2/gqur-301/unit-14/topic-01.mdx The logic of a point estimate cites Lane Chapter 9 for unbiasedness; the passage is in Lane Chapter 10 (Characteristics of Estimators). topic-02 attributes the strict 'no probability left' reading to Lane Chapter 10, but Lane says a subjective 0.95 probability is reasonable; NIST 1.3.5.2 is the source for the strict reading. ERQ 2 rubric uses 'posterior probability', a term the unit never teaches. Repair: correct the chapter locator, cite NIST for the strict reading or note Lane's qualification, and replace 'posterior probability' with taught la...
- [advisory] docs/semester-2/gqur-301/unit-14/topic-02.mdx: the sample mean is written as plain 'x' (Step 1, Step 5, worked example), the same symbol used for a data value, while the figures use x-bar. Repair: use x-bar (or 'sample mean') consistently in prose.
- [advisory] docs/semester-2/gqur-301/unit-14/unit-assessment.mdx ERQ 4: the policy maker estimates pupils' travel time but samples '25 or 100 schools' with an SD of 20 minutes; the sampling unit is unclear. Repair: say '25 or 100 pupils' or define a school-level mean travel time.
- [advisory] docs/semester-2/gqur-301/unit-14/topic-02.mdx A real classroom situation: 'The officer reviewing her report asks ... The officer realizes' uses 'officer' for two different people. Repair: name the second person (for example 'Her director asks').
- [uncertain] Rendered accessibility unverified: the crew brief prohibits build, dev server and Playwright, so no 360px, keyboard or A4 print inspection was possible and no page render image exists. See crew-20261023/render-limitation.md. A fresh authorised render session must inspect both topics, the assessment and all four figures in both themes.
- [uncertain] Authority/provenance: tasks.md shows Unit 14 G1 unit-spec open ('intake re-evaluation advised (D-2026-0070)'); no G1 approval binds this unit spec. The author run identity is taken from commit 041527b8 ('crew: gqur-301-u14-author (author, opencode)'); no exact author model version was supplied.
- [uncertain] Sources: the frozen bundle's sources/texts/ contains no Unit 14 passage; source support was checked against live pages fetched 2026-10-22 (crew-20261023/source-inspection.md) that are not bound inputs. A new bundle should bind the Lane Ch 10, OpenStax 8.1/8.2 and NIST 1.3.5.2 passages.

## Notes from earlier jobs on this unit
- (gqur-301-u14-fix, fix, codex) Existing academic findings still need author repair and fresh independent G3 review.
- (gqur-301-u14-fix, fix, codex) Existing academic findings still need author repair and fresh independent G3 review.
- (gqur-301-u14-translate, translate, claude) The Urdu mirror keeps the English G3 findings F1-F5 unchanged (sum 513, 30.5-37.9 range, z with s, rubric 2.12-2.68), and `fig-U14-2.ur.svg` shows `513 / 15`. When the English is repaired, apply the same fixes to the Urdu pages and figures and re-run G4.
- (gqur-301-u14-translate, translate, claude) Nobody has viewed the Urdu pages or figures rendered. Nastaliq is tall, so the step boxes in fig-U14-3 and the reading panels in fig-U14-1/2 are where clipping is most likely. Run `render-inspect.mjs GQUR-301 14 --locale ur` before G5.
- (gqur-301-u14-translate, translate, claude) Several glossary.json `definition_ur` entries these pages show are corrupted (Confidence level, Margin of error, Normal model, Estimator). They are out of scope for this unit; the glossary owner needs to fix them.


## Response snapshot

Repaired GQUR-301 Unit 14 G3 review findings across English docs and Urdu mirrors, authored repair record, appended unticked advisory G3 tracker row, and refreshed G2 gate evidence with all 14 content gates passing.

## Outcome

- Impact: repair_en for GQUR-301 Unit 14 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GQUR-301 Unit 14 G3 review findings across English docs and Urdu mirrors, authored repair record, appended unticked advisory G3 tracker row, and refreshed G2 gate evidence with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G2 gate evidence was refreshed with input hashes matching the repaired content; G3 remains unticked pending fresh independent review.
  - Classroom data values in Topic 01 now strictly produce sum 513, mean 34.2, and sample SD 3.80, perfectly matching all existing figures and references.
  - Uncertain findings from review (render accessibility inspection, G1 status under D-2026-0070, and external source binding) remain open for an authorized evaluation session.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
