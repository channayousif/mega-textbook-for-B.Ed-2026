---
id: crew-gqur-301-u05-repair_en-r1
title: crew repair_en GQUR-301 unit 5
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u05-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-05/topic-01.mdx
 - docs/semester-2/gqur-301/unit-05/unit-assessment.mdx
 - history/prompts/general/557-repair-gqur301-unit-five-g3.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/unit-assessment.mdx
 - specs/content/gqur-301/reviews/unit-05/G2/20261110T070719044Z-gates.json
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261110T070719044Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261110T070719044Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261110T070719044Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261110T070719044Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261110T070719044Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261110T070719044Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261110T070719044Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261110T070719044Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u05-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u05-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-05/`.

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
From `specs/content/gqur-301/reviews/unit-05/G3/20261108T203238Z-g3-desk-13351a7b.json` (disposition: revise). Resolve each one:
- [blocking] unit-assessment.mdx RRQ 6 model answer gives a symmetric counterexample to a statement conditional on right skew; supply a valid right-skewed example.
- [blocking] unit-assessment.mdx RRQ 7 model answer implies most workers earn 25 thousand, but only 3 of 12 do; distinguish modal frequency from majority.
- [uncertain] Missing author/reviewer host run identities and exact model build; independently prepared manifest does not establish parent handoff provenance.
- [uncertain] Current G1 remains open after the chapter restructure; intake-3 evaluates the former six-unit partition.
- [uncertain] Topic 5.1 print-source formula attribution conflicts with bibliographic-only source declaration; bound Lane excerpt lacks Chapter 3 support.
- [uncertain] Solve-before-key protocol not satisfied; full independent assessment verification requires a fresh reviewer.
- [uncertain] Required current narrow-screen and A4 render inspection unavailable under crew restrictions.

## Notes from earlier jobs on this unit
- (gqur-301-u05-repair_en-conflict5, fix, opencode) Unit 5 P1-P4 (author/run provenance, open G1 under D-2026-0070, answer-blind verification, rendered narrow/A4 inspection) remain open for the evaluator/review host; G3 stays open (ADR-0019).
- (gqur-301-u05-repair_en-conflict5, fix, opencode) G5 should verify Nastaliq rendering and text-fit inside the inherited viewBox at narrow width and A4 print.
- (gqur-301-u05-repair_en-conflict5, fix, opencode) `static/content-status.json` is gitignored and generated; a fresh origin/main checkout lacks it, so run `npm run build:content-status` before `check:content`.
- (gqur-301-u05-repair_en-conflict4, fix, opencode) Unit 5 P1-P4 (author/run provenance, open G1 under D-2026-0070, answer-blind verification, rendered narrow/A4 inspection) remain open for the evaluator/review host; G3 stays open (ADR-0019).
- (gqur-301-u05-repair_en-conflict4, fix, opencode) G5 should verify Nastaliq rendering and text-fit inside the inherited viewBox at narrow width and A4 print.


## Response snapshot

Repaired GQUR-301 Unit 5 per G3 report 13351a7b (RRQ 6 right-skewed counterexample, RRQ 7 modal-vs-majority, Topic 5.1 Lane attribution, EN+UR), refreshed G2 evidence, appended the advisory tracker row, and committed with a PHR.

## Outcome

- Impact: repair_en for GQUR-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GQUR-301 Unit 5 per G3 report 13351a7b (RRQ 6 right-skewed counterexample, RRQ 7 modal-vs-majority, Topic 5.1 Lane attribution, EN+UR), refreshed G2 evidence, appended the advisory tracker row, and committed with a PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The report's three content findings were already fixed by commit c358e8dc9; this pass strengthened them, so a fresh independent G3 review is still required. Uncertain findings P1-P4 (author/run provenance, open G1, solve-before-key verification, rendered narrow/A4 inspection) remain for the evaluator/review host.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
