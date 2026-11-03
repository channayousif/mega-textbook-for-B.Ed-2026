---
id: crew-efmp-305-u01-repair_en-r1
title: crew repair_en EFMP-305 unit 1
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u01-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-01/index.mdx
 - docs/semester-2/efmp-305/unit-01/topic-01.mdx
 - docs/semester-2/efmp-305/unit-01/topic-02.mdx
 - docs/semester-2/efmp-305/unit-01/unit-assessment.mdx
 - docs/semester-2/efmp-305/unit-01/unit-teacher-notes.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-teacher-notes.mdx
 - specs/content/efmp-305/coverage/unit-01.md
 - specs/content/efmp-305/sources/unit-01.md
 - specs/content/efmp-305/tasks.md
 - specs/content/efmp-305/reviews/unit-01/G2/20261103T085709740Z-gates.json
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261103T085709740Z/validate-content.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261103T085709740Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261103T085709740Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261103T085709740Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261103T085709740Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261103T085709740Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261103T085709740Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261103T085709740Z/check-docs-sync.txt
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u01-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u01-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-305/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-01/`.

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
From `specs/content/efmp-305/reviews/unit-01/G3/20261102T212207Z-g3-desk-65386ad3.json` (disposition: revise). Resolve each one:
- [blocking] topic-01.mdx Summative task and Mini-rubric: separate slow section is forced into integration/inclusion and rewarded as integration, contradicting its segregation definition and unit-assessment ERQ 1. Allow and reward segregation with consistent reasoning.
- [blocking] unit-assessment.mdx RRQ 5 key: narrow corridor and toilet steps need matched access remedies; unsupported attitudinal barrier and desk rearrangement do not solve stated problem. Reconcile two barriers plus two steps with max 3 marks.
- [blocking] unit-assessment.mdx MCQ 10 assumes a girls-only school contradicts inclusion without evidence of a participation barrier. Replace with an unambiguous access/participation case and defensible options.
- [blocking] topic-01 and topic-02 Further reading: Miles and Ainscow titles/volumes/pages conflict with sources/unit-01.md; UNESCO title differs too. Align entries to verified bound records.
- [blocking] topic-02 Why inclusion matters / Misconception 3 and assessment RRQ 9: UNICEF/NEP claims lack specific Unit 1 source binding; Hehir claim is presented as established despite declared unavailable verification. Supply support and honest claim-level limits, with dated retrieval attempts in sources/unit-01.md.
- [advisory] index.mdx opening has missing verbs (as if they the same thing; principles that education); topic-01 opening drops that the before arrangement. Repair for fluent introductory reading.
- [advisory] unit-teacher-notes.mdx Assessment guidance obscures public self-study answer status. Explain intentional public answers consistently with constitution carve-out.
- [uncertain] unit-assessment.mdx ERQ rubrics offer three 0-5 rows but state one 0-5 total with no aggregation. Actual Bloom labels exceed approved Unit 1 bank ranges. Owner must resolve scoring and blueprint discrepancy without reviewer editing approved spec.
- [uncertain] Current narrow-screen, keyboard and A4 render evidence unavailable under brief prohibition. Source inspection and historical render claims cannot satisfy accessibility.
- [uncertain] Actual author run identity and exact deployed model build were not supplied; do not substitute a commit for a session. Provenance remains incomplete.
- [uncertain] This is the second and last review cycle. Remaining content defects and evidence gaps require curriculum owner escalation, not an unauthorised third review.

## Notes from earlier jobs on this unit
- (efmp-305-u01-review_en, review_en, codex) Owner must resolve assessment/source defects and missing render/provenance evidence; no third review cycle is authorized.
- (efmp-305-u01-review_en, review_en, codex) Owner must resolve assessment/source defects and missing render/provenance evidence; no third review cycle is authorized.
- (efmp-305-u01-repair_en-conflict5, fix, codex) Fresh checkouts need `npm run build:content-status`; independent G3/G5 reviews remain pending.
- (efmp-305-u01-repair_en-conflict5, fix, codex) Fresh checkouts need `npm run build:content-status`; independent G3/G5 reviews remain pending.
- (efmp-305-u01-repair_en-conflict3, fix, codex) Fresh checkouts require `npm run build:content-status`; independent G3/G5 reviews remain pending.

## Response snapshot

Applied every blocking and advisory finding from the 20261102T212207Z G3 report to EFMP-305 Unit 1, mirrored the edits into the Urdu files, bound the UNICEF/NEP claims to the already-verified `unicef2014` and `nep2009` sources with dated retrieval attempts, refreshed the stale G2 draft-gate evidence, and appended the G3 "repairs applied" tracker row with G3 left unticked.

## Outcome

- Impact: repair_en for EFMP-305 Unit 1 by opencode (attempt 1).
- Tests: `npm run check:content` passed (13/13 gates) after `npm run build:content-status`.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: topic-01 summative task and mini-rubric now reward segregation; topic-01 opening verb and Further reading (UNESCO, Miles) aligned; topic-02 UNICEF/NEP claims bound to `unicef2014`/`nep2009` with honest claim-level limits, Hehir limit added, Ainscow Further reading aligned; assessment RRQ 5 key, MCQ 10, RRQ 9 Hehir limit and ERQ rubric aggregation repaired; index and teacher-notes wording repaired; UR mirrors updated; G2 gate evidence refreshed; G3 tracker row appended and left unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything. The ERQ Bloom-label blueprint discrepancy (assessment tags exceed the approved MCQ/RRQ/ERQ bands) is left for the curriculum owner, not re-tagged unilaterally.
- Pending / next owner: crew lead (merge when CI is green). Curriculum owner must rule on the Bloom blueprint discrepancy and the missing render/provenance evidence; no third review cycle is authorised.
- Notes for the next job on this unit:
  - `static/content-status.json` is git-ignored and goes stale after any tracker edit; run `npm run build:content-status` before `check:content`.
  - The G2 en-draft tracker row now points at `specs/content/efmp-305/reviews/unit-01/G2/20261103T085709740Z-gates.json`.
  - The unicef2014/nep2009 rows in `sources/unit-01.md` are bound to U1-4 in the coverage matrix; both have committed excerpts under `sources/texts/`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
