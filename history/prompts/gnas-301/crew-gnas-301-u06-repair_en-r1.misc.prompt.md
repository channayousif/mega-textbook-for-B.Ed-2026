---
id: crew-gnas-301-u06-repair_en-r1
title: crew repair_en GNAS-301 unit 6
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: gnas-301
branch: crew/gnas-301-u06-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-06/topic-03.mdx
 - docs/semester-1/gnas-301/unit-06/topic-04.mdx
 - docs/semester-1/gnas-301/unit-06/unit-assessment.mdx
 - docs/semester-1/gnas-301/unit-06/unit-teacher-notes.mdx
 - history/prompts/gnas-301/crew-gnas-301-u06-repair_en-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/unit-teacher-notes.mdx
 - specs/content/gnas-301/concepts/unit-06.md
 - specs/content/gnas-301/reviews/unit-06/G2/20261103T051634155Z-gates.json
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/validate-content.txt
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u06-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u06-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-06/`.

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
From `specs/content/gnas-301/reviews/unit-06/G3/20261102T212207Z-g3-desk-06be9f9b.json` (disposition: revise). Resolve each one:
- [blocking] concepts/unit-06.md CON:GNAS-301-6-4 maps RRQ-04/ERQ-02 to dose-response curves; CON:GNAS-301-6-5 maps RRQ-05 to essentiality. Correct these mappings against actual item demand.
- [blocking] topic-03 Activity Build the ladder and ERQ-03 arithmetic rubric provide no concentrations/masses or explicit retention assumptions; multiplying totals does not establish the requested concentration factor. Supply a dimensionally specified example.
- [advisory] Carried prior finding 9: ERQ-02 Evaluate exceeds rubric Apply demand; ERQ-05 Create rests on a one-mark close. Also MCQ-05 Analyze merely retrieves a stated rationale. Align labels and demand.
- [advisory] RRQ-04 assumes sensitization appears only after years; RRQ-05 route ranking needs explicit scenario assumptions. Reword premises and match marking guidance.
- [advisory] topic-04 pane activity and teacher notes should explain model limits; two-pane temperature differences alone do not verify the stated atmospheric radiation mechanism.
- [uncertain] Required current desktop/narrow/A4 inspection is unavailable under the brief browser/build prohibition; do not certify accessibility from historical artifacts.
- [uncertain] Current author run identity and exact model deployment version were not supplied; inherited author provenance cannot establish the repaired version. G-2026-33 also records an exhausted two-cycle allowance, contrary to the brief cycle count.
- [uncertain] Source binding remains incomplete for three year-less excerpts and root glossary.json; current bound excerpts do not verify all toxicology and Lahore chemistry claims or the repaired WHO co-benefit sentence. Request a complete evidence bundle.
- [uncertain] Assessment derivation followed supplied-key exposure and therefore is not the mandated blind independent solve. Obtain this evidence in an authorized fresh review.

## Notes from earlier jobs on this unit
- (gnas-301-u06-review_en-conflict5, fix, agy) G-2026-33 cycle-count decision and existing Unit 6 evidence gaps remain owner-owned; G3 stays open.
- (gnas-301-u06-review_en-conflict1, fix, codex) G-2026-33 and existing Unit 6 evidence gaps remain owner-owned; G3 stays open.
- (gnas-301-u06-review_en-conflict1, fix, codex) G-2026-33 and existing Unit 6 evidence gaps remain owner-owned; G3 stays open.
- (gnas-301-u06-review_en, review_en, codex) Owner must resolve G-2026-33; current rendering, source binding, provenance and assessment evidence remain incomplete.
- (gnas-301-u06-review_en, review_en, codex) Owner must resolve G-2026-33; current rendering, source binding, provenance and assessment evidence remain incomplete.


## Response snapshot

Applied the latest G3 report's actionable findings to GNAS-301 Unit 6 (concept mappings, dimensionally specified ladder, Bloom label alignment, RRQ premises, pane-model limits) in English and Urdu, appended the unticked G3 tracker row, and refreshed the G2 evidence.

## Outcome

- Impact: repair_en for GNAS-301 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the latest G3 report's actionable findings to GNAS-301 Unit 6 (concept mappings, dimensionally specified ladder, Bloom label alignment, RRQ premises, pane-model limits) in English and Urdu, appended the unticked G3 tracker row, and refreshed the G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 stays unticked; the four uncertain findings (accessibility, author provenance, source binding, blind assessment derivation) remain owner-owned and G-2026-33's cycle-count conflict is unresolved.
  - The next job should re-check the corrected concept mappings and the new Bloom labels (ERQ-02 Apply, ERQ-05 Create 0-2, MCQ-05 Understand) against the content-spec blueprint.
  - G2 evidence was refreshed at the repaired HEAD (20261103T051634155Z-gates.json); the gitignored static/content-status.json cache was regenerated locally.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
