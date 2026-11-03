---
id: crew-gnas-301-u02-repair_en-r1
title: crew repair_en GNAS-301 unit 2
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: gnas-301
branch: crew/gnas-301-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-02/topic-02.mdx
 - docs/semester-1/gnas-301/unit-02/topic-03.mdx
 - docs/semester-1/gnas-301/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-02/unit-assessment.mdx
 - specs/content/gnas-301/concepts/unit-02.md
 - specs/content/gnas-301/coverage/unit-02.md
 - specs/content/gnas-301/figures/unit-02.md
 - specs/content/gnas-301/reviews/unit-02/G2/20261103T045242860Z-gates.json
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261103T045242860Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261103T045242860Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261103T045242860Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261103T045242860Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261103T045242860Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261103T045242860Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261103T045242860Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261103T045242860Z/validate-content.txt
 - specs/content/gnas-301/sources/texts/pakepa-neqs-2000.md
 - specs/content/gnas-301/sources/texts/who-healthcare-waste-2024.md
 - specs/content/gnas-301/sources/unit-02.md
 - specs/content/gnas-301/tasks.md
 - static/img/figures/gnas-301/unit-02/fig-U2-6.dark.svg
 - static/img/figures/gnas-301/unit-02/fig-U2-6.svg
 - static/img/figures/gnas-301/unit-02/fig-U2-6.ur.dark.svg
 - static/img/figures/gnas-301/unit-02/fig-U2-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u02-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-02/`.

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
From `specs/content/gnas-301/reviews/unit-02/G3/20261102T212207Z-g3-desk-bc87d518.json` (disposition: revise). Resolve each one:
- [blocking] CONTENT-01: topic-02.mdx, Common misconception, final sentence: The only clear water you may trust is water that was treated or boiled after it came from a protected source. This conflates boiling with treatment for the metals/nitrate just named in the preceding sentences. Specify that boiling addresses microbial hazards and does not establish chemical safety; require treatment/testing appropriate to the pollutant. Carry as an actionable safety and conceptual defect; reviewer does not repair inputs.
- [advisory] ERQ 3 retains actual comparison demand. MCQ 3 still retrieves a stated study result; its Understand label remains debatable because no interpretation is requested. Carry this as an advisory Bloom mismatch rather than endorsing the prior resolution.
- [advisory] Topic 2.3 Hazardous waste management still requires colour-coded containers, non-reopenable sharps boxes, dating, secured storage, licensed handlers and industrial manifests. Bound who-healthcare-waste-2024 Key facts supports categories, segregation and treatment alternatives, but does not specify these rules. Its What this supports paragraph asserts licensed handling without excerpt evidence. Carry unresolved; author must bind supporting passages and distinguish local law from recommendations.
- [advisory] PED-01: topic-03.mdx Bin audit says avoid touching anything but then permits gloved hands and sorting residual/soiled waste. Teacher notes exclude clinical/sharp material and offer photographs, but learner instructions do not carry these exclusions. Align learner-facing safety instructions with teacher notes and allow a visual audit.
- [advisory] MAP-01: concepts/unit-02.md maps Water pollution chain to MCQ-05, which tests secondary treatment, not the chain. Hazardous waste segregation maps MCQ-08, a general segregation item. Review derived concept-item links at the next author revision.
- [advisory] SOURCE-01: topic-02.mdx Industrial effluents NEQS legal yardstick still has no bound primary legal passage. The approved spec requests the yardstick, but that is not evidence of the legal claim; an author should bind the applicable standard rather than infer legal detail.
- [advisory] FIG-01: fig-U2-6.svg and its dark variant, industrial Handling rule cell, ends with a manifest, licensed without an object. Complete the disposal instruction in a separate author repair and recheck glyph geometry. Source inspection alone does not establish visual clipping.
- [uncertain] GOV-01: Two prior G3 attempts already exist (run001 and round-02/run002); latest is pass, whereas crew brief calls this the second and last cycle. Constitution VII.2 and ADR-0019 require escalation after exhausted cycles. This artifact reconciles findings and records escalation, not a third approval attempt. Owner/orchestrator must reconcile submission identity and cycle authorisation before further review.
- [uncertain] EVID-01: Parent supplied no prepared current bundle or actual author run identity. Current reviewer did not author these bytes, but commit history is not author-session provenance. Manifest was prepared locally over committed inputs. author_run_id explicitly records unavailable provenance; no fabricated author identity or exact model build is asserted. Host exposes GPT-6 family but no exact model version.
- [uncertain] RENDER-01: Brief forbids build, dev server and Playwright. No fresh desktop/narrow-screen/A4 print evidence or SVG glyph measurements were obtained. Historical renders predate current geometry repairs and cannot verify these bytes. accessibility remains unverified; a fresh authorised rendered review is required.
- [uncertain] ASSESS-01: Prior report exposed its MCQ key during findings reconciliation before this session isolated the stems. Subsequent reasoning audit is recorded in summary.md, but is not claimed as the required blind independent solve. Full assessment criterion remains unverified.
- [uncertain] CONTENT-02: topic-03.mdx, Hazardous waste management, ranks sweeper, waste picker and nurse in that order. No bound source supplies this comparative ranking; fig-U2-6 repeats the list without comparative evidence. Remove the ranking or bind evidence for context and exposure assumptions. General WHO risk categories do not support an ordering.

## Notes from earlier jobs on this unit
- (gnas-301-u02-review_en, review_en, codex) Owner must resolve cycle history, provenance and fresh render evidence; author repairs remain documented.
- (gnas-301-u02-review_en, review_en, codex) Owner must resolve cycle history, provenance and fresh render evidence; author repairs remain documented.
- (gnas-301-u02-fix, fix, codex) G3 remains unticked and requires a fresh independent review.
- (gnas-301-u02-fix, fix, codex) G3 remains unticked and requires a fresh independent review.
- (gnas-301-u02-repair_en-conflict1, fix, opencode) G3 en-review for GNAS-301 Unit 2 remains unticked pending a fresh qualified independent review under ADR-0019  -  do not tick it.


## Response snapshot

Applied the bc87d518 G3 findings to GNAS-301 Unit 2 in English and Urdu (boiling vs chemical safety, NEQS and WHO passages bound, handling detail left to local law, risk ranking removed, bin-audit safety aligned, fig-U2-6 cells completed, concept links and MCQ 3 label fixed), refreshed G2 evidence and appended an unticked advisory G3 row.

## Outcome

- Impact: repair_en for GNAS-301 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the bc87d518 G3 findings to GNAS-301 Unit 2 in English and Urdu (boiling vs chemical safety, NEQS and WHO passages bound, handling detail left to local law, risk ranking removed, bin-audit safety aligned, fig-U2-6 cells completed, concept links and MCQ 3 label fixed), refreshed G2 evidence and appended an unticked advisory G3 row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U2-6 (all 4 variants) was re-flowed but not measured by `measure-figure-text.mjs` (Chromium barred); the CI figure-geometry job or a browser host must confirm it.
  - GOV-01/EVID-01/RENDER-01/ASSESS-01 still need the owner (review-cycle authorisation under ADR-0019, author provenance, fresh render evidence, blind assessment solve) before any further G3 run.
  - the NEQS binding is the federal 2000 schedule; whether Sindh's provincial standards should also be cited for the Hyderabad example is an open author question.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
