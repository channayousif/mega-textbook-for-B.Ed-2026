---
id: crew-gqur-301-u12-repair_en-r1
title: crew repair_en GQUR-301 unit 12
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u12-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261190-repair-gqur301-unit-twelve-g3.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-02.mdx
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u12-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u12-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-12/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 12 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 12 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-12/`.

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
From `specs/content/gqur-301/reviews/unit-12/G3/20261108T203238Z-g3-desk-b983456a.json` (disposition: revise). Resolve each one:
- [blocking] docs/semester-2/gqur-301/unit-12/topic-02.mdx, Summative task: the promised numerical table and displayed scatter plot are absent. Only two variable-pair names are supplied. Supply the actual paired data and plot so the interpretation and outlier criteria can be solved without invented observations.
- [blocking] docs/semester-2/gqur-301/unit-12/unit-assessment.mdx, RRQ 8 and ERQ 2 with their guidance: falling/rising and dispersion do not identify linear form; ERQ 2 also asks for a removal effect without coordinates and its rubric refers to a plot as drawn. Supply a real plot or accept insufficient-information reasoning and conditional effects. RRQ 6 guidance additionally assumes 9 hours is on the right without the remaining study-hour range.
- [blocking] docs/semester-2/gqur-301/unit-12/unit-assessment.mdx, ERQ 5 scale-effect rubric: wider ranges do not universally imply weaker strength and narrower ranges stronger strength. Specify plot dimensions/aspect and data or reward geometry-sensitive reasoning while preserving statistical strength under positive rescaling. Remove the fixed weaker/stronger rule.
- [blocking] static/img/figures/gqur-301/unit-12/fig-U12-1.svg and fig-U12-1.dark.svg: the y=220 child panels overlap horizontally and later opaque panels cover prior labels, including Negative under Strong. See render-limitation.md for exact coordinates. Separate panels and validate actual light/dark, narrow and print presentation.
- [blocking] docs/semester-2/gqur-301/unit-12/topic-01.mdx, Summative task and Mini-rubric: construction, role identification and a brief trend description do not require Analyze-level reasoning; no criterion actually demands analysis. Add a justified comparison, diagnosis or inference-limits task and corresponding criterion to satisfy the per-topic standard. Topic-02 group activity should allow no discernible form instead of forcing linear/nonlinear for a patternless cloud.
- [blocking] docs/semester-2/gqur-301/unit-12/topic-01.mdx, What makes data bivariate: two records of the same kind is misleading; define two variables measured on each case without requiring identical kind or units. topic-02.mdx, Three descriptors: qualify invisible-line strength as linear strength and explain that tight curves can show strong nonlinear relationships.
- [advisory] Assessment comparison notes: RRQ 4 data form a very strong near-linear pattern rather than the supplied moderately strong phrase; MCQ 10 should explicitly ask for the predictor-axis convention to avoid distractor C being defensible for association. ERQ 1 permits D/E as borderline without an outlier rule. See assessment-solutions.md for all 25 independently reasoned responses and the failed pre-key artifact-write disclosure.
- [uncertain] Actual current-input narrow-screen and A4 print inspection is unavailable under the brief prohibition on build/server/Playwright. accessibility remains unverified; see render-limitation.md. A fresh authorised reviewer must supply real browser artifacts.
- [uncertain] The host supplied no prepared parent handoff or actual author run identity. This fresh session did not author the reviewed bytes and prepared/verified the clean 94-input snapshot itself; commit history identifies authoring changes but is not a run identity. Model is reported only as GPT-6, the exposed identity; exact version is unavailable. Missing provenance prevents a pass.
- [uncertain] Authority/source evidence is incomplete for acceptance: Unit 12 G1 remains open, intake-3 evaluates the superseded six-unit partition, and D-2026-0070 advises fresh intake. Guide Chapter 12 and current spec agree on the two sections, but G3 cannot supply G1 authority. Current bound Lane excerpt covers Chapters 1-2 only. Bind inspected Chapter 4/OpenStax passages and reconcile the bibliographic-only declaration in a fresh bundle; external retrieval evidence here is supplementary.

## Notes from earlier jobs on this unit
- (gqur-301-u12-repair_en-conflict1, fix, opencode) `static/content-status.json` is a gitignored artifact; regenerate it with `npm run build:content-status` if `check:content-status` fails on a fresh checkout.
- (gqur-301-u12-repair_en-conflict1, fix, opencode) Unit 12 G3 stays open/unticked; browser/print inspection, historical provenance, G1 and bound source evidence remain for the review host, and the 4 `.ur.svg` figure variants still need a `generate-figures` Step 5 run.
- (gqur-301-u12-repair_en, repair_en, codex) G3 remains open; independent review still needs browser/print inspection, provenance and G1/source evidence.
- (gqur-301-u12-repair_en, repair_en, codex) G3 remains open; independent review still needs browser/print inspection, provenance and G1/source evidence.
- (gqur-301-u12-fix, fix, codex) G3 remains open; F1-F6 need separate author repair and fresh independent review.


## Response snapshot

Verified the latest G3 findings were already repaired on main, fixed the remaining Urdu Topic 12.2 group-activity form parity, and appended the unticked advisory Unit 12 G3 tracker row.

## Outcome

- Impact: repair_en for GQUR-301 Unit 12 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the latest G3 findings were already repaired on main, fixed the remaining Urdu Topic 12.2 group-activity form parity, and appended the unticked advisory Unit 12 G3 tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The 20261108 desk report carries the same findings as 20261102 against the same post-repair bytes; hash the frozen input manifest before redoing any repair.
  - G3/G5 stay open; browser/print inspection, historical provenance, G1 authority and bound Chapter 4/OpenStax source evidence remain with the owner/review host.
  - The four `.ur.svg` figure variants still need a `generate-figures` Step 5 run before G4 can flip the unit to reviewed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
