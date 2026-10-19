---
id: crew-gsos-301-u01-repair_en
title: crew repair_en GSOS-301 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-01/topic-01.mdx
 - docs/semester-2/gsos-301/unit-01/topic-02.mdx
 - docs/semester-2/gsos-301/unit-01/topic-03.mdx
 - history/prompts/gsos-301/0002-complete-unit-one-g3-repairs.misc.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u01-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-03.mdx
 - specs/content/gsos-301/reviews/unit-01/G2/20261019T154654433Z-gates.json
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261019T154654433Z/validate-content.txt
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-01/fig-U1-1.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u01-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gsos-301/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gsos-301/reviews/unit-01/G3/7725a4f0-f3eb-4a48-aed1-23a2605c30d8.json` (disposition: revise). Resolve each one:
- [blocking] X1 ACCESSIBILITY / figure geometry overflow: measure-figure-text.mjs reports 12 text-geometry errors across static/img/figures/gsos-301/unit-01/*.svg and *.dark.svg. (1) In fig-U1-1, fig-U1-2, fig-U1-3, and fig-U1-5, the wordmark "textbook.com.pk" overflows the 780px viewBox right edge by 34.6px because CSS rule "text { font-size: 13px; fill: var(--ink); text-anchor: middle }" overrides the inline attribute "text-anchor="end"", centering text at x=768. Repair: add "text-anchor: end;" to the ".wm" CSS class definition. (2) In fig-U1-4, Durkheim legacy cell text "department; foundation of fun...
- [blocking] S1 SOURCES / citation and bibliography mismatch: In docs/semester-2/gsos-301/unit-01/topic-01.mdx, topic-02.mdx, and topic-03.mdx, the prose cites "(Henson, 2022)" (in 4 places) and "(Givens & White, 2023)" (in 6 places), and lists both in "## Further reading" across all three topics. However, specs/content/gsos-301/content-spec.md:57 and sources/unit-01.md:12 explicitly record that "henson2022" named no real work and was replaced by "hammondnd" under ruling D-2026-0057. Furthermore, OpenStax Introduction to Sociology 3e is authored by Conerly, Holmes, & Tamang (2021) ("conerly2021"), not G...
- [advisory] A1 AUTHORITY / tracker and spec lifecycle: In specs/content/gsos-301/tasks.md:15-16, Unit 1 G0 is marked in-progress and G1 is marked not-started ("pending G0 intake"), though content-spec.md frontmatter status is "approved". CurriculumOwner should formally close the G0/G1 intake row once approved.
- [advisory] X2 ACCESSIBILITY / live browser inspection: Automated live browser inspection (360x780 narrow viewport swipe testing and A4 print stylesheet DOM verification) was not executed in compliance with the crew brief constraint ("never run npm run build or a dev server"). Structural accessibility, heading hierarchies, alt text, and SVG text geometry were verified statically.

## Notes from earlier jobs on this unit
- (gsos-301-u01-translate-r1, translate, agy) When English G3 citation revisions land (Henson 2022 -> Hammond & Cheney, Givens & White 2023 -> Conerly et al.), sync the citation keys in Urdu topic prose and Further reading.
- (gsos-301-u01-translate-r1, translate, agy) Proposed sociology terms (عمرانیات، مثبتیت، فعلیت، وغیرہ) are documented in reviews/unit-01/G4/translation-handoff.md for CurriculumOwner banking in terminology.csv.
- (gsos-301-u01-translate, translate, opencode) ** Six `.ur.svg` figure variants are still missing (generate-figures scope); they are not required while `translation_status: draft` but will be needed before `reviewed`. The 10 `key_terms` entries use sociology terms not present in `terminology.csv`; they pass the gate now (bank check is dormant at `draft`) but must be owner-approved before `reviewed`. The G3 advisory report flagged figure text-geometry overflows on all 6 SVGs and two citation mismatches in the English source  -  translate f...
- (gsos-301-u01-translate, translate, opencode) ** The `key_terms` Urdu values (عمرانیات, فعالاتیت, تنازعہ نظریہ, علامتی باہم فعل, etc.) are proposed additions to `terminology.csv`  -  no sociology terms currently exist in the bank.
- (gsos-301-u01-review_en, review_en, agy) Figure text geometry overflows right edge on all 6 SVGs and dark variants; fix by adding text-anchor: end; to .wm class and re-wrapping long cell lines in fig-U1-4 and fig-U1-6.

## Feedback from the previous attempt
npm run check:content has 3 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GSOS-301 Unit 1 (docs/semester-2/gsos-301/unit-01): G2 en-draft: stale or incomplete input manifest
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Completed Unit 1 figure repairs, verified existing EN/UR citation corrections, refreshed G2 evidence, and recorded validation and handoff notes.

## Outcome

- Impact: repair_en for GSOS-301 Unit 1 by codex (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 42 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed Unit 1 figure repairs, verified existing EN/UR citation corrections, refreshed G2 evidence, and recorded validation and handoff notes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked; independent review, mobile/print inspection, and CurriculumOwner G0/G1 closure remain pending.
  - G3 remains unticked; independent review, mobile/print inspection, and CurriculumOwner G0/G1 closure remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
