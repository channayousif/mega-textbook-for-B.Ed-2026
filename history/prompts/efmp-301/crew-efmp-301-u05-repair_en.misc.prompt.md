---
id: crew-efmp-301-u05-repair_en
title: crew repair_en EFMP-301 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-05/topic-01.mdx
 - docs/semester-1/efmp-301/unit-05/topic-02.mdx
 - docs/semester-1/efmp-301/unit-05/unit-assessment.mdx
 - docs/semester-1/efmp-301/unit-05/unit-teacher-notes.mdx
 - history/prompts/efmp-301/crew-efmp-301-u05-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-05/unit-teacher-notes.mdx
 - specs/content/efmp-301/concepts/unit-05.md
 - specs/content/efmp-301/coverage/unit-05.md
 - specs/content/efmp-301/reviews/unit-05/G2/20261103T044540225Z-gates.json
 - specs/content/efmp-301/reviews/unit-05/G2/logs-20261103T044540225Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-05/G2/logs-20261103T044540225Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-05/G2/logs-20261103T044540225Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-05/G2/logs-20261103T044540225Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-05/G2/logs-20261103T044540225Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-05/G2/logs-20261103T044540225Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-05/G2/logs-20261103T044540225Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-05/G2/logs-20261103T044540225Z/validate-content.txt
 - specs/content/efmp-301/sources/unit-05.md
 - specs/content/efmp-301/tasks.md
 - static/img/figures/efmp-301/unit-05/fig-U5-1.dark.svg
 - static/img/figures/efmp-301/unit-05/fig-U5-1.svg
 - static/img/figures/efmp-301/unit-05/fig-U5-2.dark.svg
 - static/img/figures/efmp-301/unit-05/fig-U5-2.svg
 - static/img/figures/efmp-301/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-301/unit-05/fig-U5-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u05-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-05/`.

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
From `specs/content/efmp-301/reviews/unit-05/G3/20261102T211054Z-g3-desk-5bdd915a.json` (disposition: revise). Resolve each one:
- [blocking] Previous finding 1: Partially repaired. rohrer2012 now supports rejecting style-matched instruction, and topic-01 history now matches the bound OpenStax eugenics/Buck v. Bell excerpt. Neither source establishes that multimodal presentation is the supported residue (topic-01:96-102; MCQ 6; RRQ 10). IQ prediction claims remain in topic-01:156-168, assessment Unit summary and fig-U5-2 (school only / almost nothing else). Register support or qualify all occurrences, including figures and keys.
- [blocking] Figure geometry: fig-U5-1.svg and .dark.svg Spearman text spills outside its panel by up to 52.6px; see figure-geometry.log. Repair through a separate author. Additional Urdu issues in that log are G5 handoff observations, not a G3 Urdu verdict.
- [advisory] Previous finding 3: Partially repaired: RRQ 2 key softened; topic-01:75,91, assessment Unit summary and MCQ 3 key, and teacher notes Misconceptions still assert measurement independence or separable factors. spielman2020 section 7.4 only supplies a general lack-of-empirical-evidence caution. Bind specific support or soften every occurrence.
- [advisory] Previous finding 4: Thurstone name removed from topic-01 and fig-U5-1. This removes the uncorroborated name but does not satisfy content-spec Unit 5 International best-practice notes and Figure plan, which explicitly require named Thurstone and brief Cattell-Horn-Carroll positions. Restore supported coverage or seek owner-approved spec resolution.
- [advisory] Previous finding 5: Teacher notes no longer claim both topics are integrated, but ERQ 5 still combines only creativity and giftedness. The approved Unit 5 blueprint requires intelligence theories, measurement limits and creativity in the integrative pupil-profile task. Widen task and matching rubric, or seek owner decision.
- [advisory] Previous finding 6: Old Seifert reinforcement row removed, but coverage Reinforcement now maps rohrer2012 to Theories of intelligence, while its actual quoted passage occurs under Multiple intelligences. seifert2009 bound excerpt still claims U5-1 reinforcement. Correct these residual locators.
- [advisory] Previous finding 7: Teacher notes Practical work now explicitly identifies the unit-designed instantiation of a course-generic guide list. sources/unit-05.md Guide-required sources Supports still calls it guide-named practical work. Align remaining attribution.
- [advisory] Previous finding 9: recognizing remains in topic-02 heading and approved checklist. Index now uses Recognize, but topic-02 self-assessment still uses recognised. Minor mixed spelling remains; preserve exact coverage headings until owner resolves the spec convention.
- [advisory] topic-02 Giftedness states acceleration only moves boredom forward a year; the bound Seifert excerpt establishes accommodation needs but does not support this blanket dismissal. Qualify and source the comparison. Early finishing alone also does not establish giftedness; frame the response as a hypothesis to check.
- [advisory] Assessment comparison: RRQ 6 awards a mark for professional administration/purchase restrictions in the source excerpt but not taught in topic-01; unit-end ERQ rubrics refer to a word count absent from their prompts. Clarify taught scope and task conditions. See assessment-audit.md.
- [uncertain] Required narrow-view and A4 print inspection unavailable: crew brief prohibits build, dev server and Playwright. No rendered page artifacts produced. Figure geometry command was mistakenly invoked before identifying its Chromium dependency, without the required heavy-job wrapper and memory check; it exited 1, and does not constitute page inspection.
- [uncertain] Prepared run-002 manifest is stale (manifest-comparison.log). A new local diagnostic manifest binds current bytes, but a parent-supplied frozen bundle and actual author session identity were not supplied. author_run_id records the observed repair commit, not a verified session; exact model snapshot is unavailable. Independence is asserted by brief and this fresh non-authoring session, not fully proven by host provenance.
- [uncertain] Assessment solving was not blind: supplied keys were exposed during the combined file read. The subsequent assessment audit is recorded as a comparison, not the required solve-before-key evidence. No claim of full assessment verification.

## Notes from earlier jobs on this unit
- (efmp-301-u05-review_en-conflict1, fix, agy) Unit 5 second-cycle G3 review is recorded with an escalation finding; authorised review cycles are exhausted, awaiting owner action.
- (efmp-301-u05-review_en, review_en, codex) Owner action required for unresolved source, blueprint, geometry and review-evidence findings; the authorised review cycles are exhausted.
- (efmp-301-u05-review_en, review_en, codex) Owner action required for unresolved source, blueprint, geometry and review-evidence findings; the authorised review cycles are exhausted.
- (efmp-301-u05-fix, fix, codex) Unit 5 needs a fresh independent G3 review; pre-existing content-status metadata edits remain uncommitted.
- (efmp-301-u05-fix, fix, codex) Unit 5 needs a fresh independent G3 review; pre-existing content-status metadata edits remain uncommitted.


## Response snapshot

Repaired all open G3 desk review findings for EFMP-301 Unit 5 across English and Urdu files, restored Thurstone/CHC positions and figure geometry, widened ERQ 5 to the integrative pupil profile, appended an advisory unticked G3 tracker row, and refreshed G2 draft evidence.

## Outcome

- Impact: repair_en for EFMP-301 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired all open G3 desk review findings for EFMP-301 Unit 5 across English and Urdu files, restored Thurstone/CHC positions and figure geometry, widened ERQ 5 to the integrative pupil profile, appended an advisory unticked G3 tracker row, and refreshed G2 draft evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 G2 gate evidence refreshed to 20261103T044540225Z-gates.json; any further content edit will invalidate its manifest.
  - All 16 Unit 5 SVGs pass measure-figure-text cleanly (fig-U5-1 widest text 768.4px in 780px viewBox); narrow-viewport and print inspection remain pending live browser run.
  - Shared course texts (seifert2009, spielman2020) were left unchanged to protect course-wide G2 manifest validity across units 2-12.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
