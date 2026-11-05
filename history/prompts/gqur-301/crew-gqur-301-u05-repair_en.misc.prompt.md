---
id: crew-gqur-301-u05-repair_en
title: crew repair_en GQUR-301 unit 5
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u05-repair_en
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
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/unit-assessment.mdx
 - specs/content/gqur-301/coverage/unit-05.md
 - specs/content/gqur-301/sources/unit-05.md
 - specs/content/gqur-301/sources/texts/lane-u05-2026.md
 - specs/content/gqur-301/tasks.md
 - specs/content/gqur-301/reviews/unit-05/G2/20261105T131356969Z-gates.json
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261105T131356969Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261105T131356969Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261105T131356969Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261105T131356969Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261105T131356969Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261105T131356969Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261105T131356969Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261105T131356969Z/check-docs-sync.txt
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u05-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
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
From `specs/content/gqur-301/reviews/unit-05/G3/20261102T212207Z-g3-desk-4bace7e3.json` (disposition: revise). Resolve each one:
- [blocking] unit-assessment.mdx RRQ 6 model answer gives a symmetric counterexample to a statement conditional on right skew; supply a valid right-skewed example.
- [blocking] unit-assessment.mdx RRQ 7 model answer implies most workers earn 25 thousand, but only 3 of 12 do; distinguish modal frequency from majority.
- [uncertain] Missing author/reviewer host run identities and exact model build; independently prepared manifest does not establish parent handoff provenance.
- [uncertain] Current G1 remains open after the chapter restructure; intake-3 evaluates the former six-unit partition.
- [uncertain] Topic 5.1 print-source formula attribution conflicts with bibliographic-only source declaration; bound Lane excerpt lacks Chapter 3 support.
- [uncertain] Solve-before-key protocol not satisfied; full independent assessment verification requires a fresh reviewer.
- [uncertain] Required current narrow-screen and A4 render inspection unavailable under crew restrictions.

## Notes from earlier jobs on this unit
- (gqur-301-u05-fix, fix, opencode) No viewBox height changes were needed (the text-anchor fix alone provided enough horizontal space), so Figure carrier height attributes were untouched and remain at 470.
- (gqur-301-u05-translate, translate, opencode) terminology.csv holds none of this unit's terms; all Urdu labels are authored per the concept graph (Mode->عادہ, Mean->اوسط, Median->میڈین, Modal class->عادی جماعت) and need G5 confirmation.
- (gqur-301-u05-translate, translate, opencode) figure desc/alt alignment was checked by gate but G5 should verify Nastaliq rendering and text-fit inside the inherited viewBox at narrow width and A4 print.
- (gqur-301-u05-translate, translate, opencode) brief noted earlier G3 escalation items (RRQ 6 counterexample, RRQ 7 majority language, source/provenance) remain open on the English baseline; this Urdu mirror follows the current English text as-is.
- (gqur-301-u05-review_en, review_en, codex) Resolve assessment findings, G1/source evidence, run provenance and rendered inspection before fresh review.

## Response snapshot

Repaired the two blocking assessment findings (RRQ 6 now uses a valid right-skewed counterexample, RRQ 7 now distinguishes the modal wage from a majority), removed the grouped-mode formula attribution from the bibliographic-only Chaudhry and Kamal text, bound a Unit 5-specific Lane Chapter 3 excerpt, mirrored every edit into the Urdu files, refreshed the Unit 5 G2 gate evidence and appended an advisory G3 repair row with G3 left open.

## Outcome

- Impact: repair_en for GQUR-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passes every gate except check:content-status, which already fails on origin/main (static/content-status.json missing there, stale here; a generated, git-ignored file).
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: RRQ 6 right-skewed counterexample (2, 2, 2, 3, 10) and aligned mark scheme; RRQ 7 modal-frequency-vs-majority wording; Topic 5.1 formula attribution removed from the body and Further reading; new Unit 5 bound Lane note `sources/texts/lane-u05-2026.md` carrying Chapter 3 support, with Unit 5 coverage/sources re-pointed from `lane2023` to `lane-u05-2026`; Urdu mirror updated; G2 evidence refreshed; advisory G3 row appended, G3 unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch certifies nothing. The Lane key change is Unit 5-only; other units still cite `lane2023`, whose shared excerpt still lacks Chapter 3 and remains a course-level gap for a future job.
- Pending / next owner: fresh independent G3 review; owner/evaluator to settle current G1 evidence, author/reviewer run provenance, solve-before-key verification and rendered narrow/A4 inspection.
- Notes for the next job on this unit:
  - P1-P4 (author/run provenance, open G1 under D-2026-0070, answer-blind verification, rendered inspection) were not author-repairable and remain open.
  - The Urdu mirror was updated to match the English repairs; G5 should confirm the new RRQ 6/7 wording and the removed formula attribution.
  - The G2 evidence at `reviews/unit-05/G2/20261105T131356969Z-gates.json` is fresh against the repaired bytes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: the first attempt edited the shared `sources/texts/lane2023.md`, which invalidated the G2 evidence of 14 GQUR-301 units; reverted and used the established unit-specific `lane-uNN-YYYY` pattern instead.
- Graders run and results (PASS/FAIL): check:content PASS except the pre-existing check:content-status failure.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
