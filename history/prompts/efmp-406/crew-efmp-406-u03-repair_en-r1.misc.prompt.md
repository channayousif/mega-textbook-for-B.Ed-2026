---
id: crew-efmp-406-u03-repair_en-r1
title: crew repair_en EFMP-406 unit 3
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u03-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-406/unit-03/topic-01.mdx
  - docs/semester-3/efmp-406/unit-03/topic-02.mdx
  - history/prompts/efmp-406/crew-efmp-406-u03-repair_en-r1.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/topic-02.mdx
  - specs/content/efmp-406/reviews/unit-03/G2/20261110T013623738Z-gates.json
  - specs/content/efmp-406/reviews/unit-03/G2/logs-20261110T013623738Z/check-bloom-bands.txt
  - specs/content/efmp-406/reviews/unit-03/G2/logs-20261110T013623738Z/check-concept-graph.txt
  - specs/content/efmp-406/reviews/unit-03/G2/logs-20261110T013623738Z/check-depth-gate.txt
  - specs/content/efmp-406/reviews/unit-03/G2/logs-20261110T013623738Z/check-docs-sync.txt
  - specs/content/efmp-406/reviews/unit-03/G2/logs-20261110T013623738Z/check-figures.txt
  - specs/content/efmp-406/reviews/unit-03/G2/logs-20261110T013623738Z/check-no-answer-keys.txt
  - specs/content/efmp-406/reviews/unit-03/G2/logs-20261110T013623738Z/check-no-em-dash.txt
  - specs/content/efmp-406/reviews/unit-03/G2/logs-20261110T013623738Z/validate-content.txt
  - specs/content/efmp-406/tasks.md
tests:
  - npm run check:content
  - npx vitest run tests/unit/pipeline-gate.test.mjs tests/unit/reviewQueue.test.mjs tests/unit/content-status-report.test.mjs tests/unit/g3Desk.test.mjs
---

## Prompt

# Crew job efmp-406-u03-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u03-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-406/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-03/`.

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
From `specs/content/efmp-406/reviews/unit-03/G3/20261108T203238Z-g3-desk-c8508ca2.json` (disposition: revise). Resolve each one:
- [blocking] S1 sources/texts/papen-2023-nls.md, later Unit 3 event/practice and dominant/vernacular blocks: paragraphs formatted as verbatim quotations do not occur in the downloaded primary passages at the cited pages. Correct quotation/paraphrase provenance, bind the authentic source evidence, and cite appropriate sources for those distinctions. The broad social-practice account is supported by Papen pp. 69-72. See specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/source-support.md. This supplemental file is not in the prepared manifest, so the report cannot accept it as frozen support.
- [blocking] S3 topic-02.mdx:50-100 and :135-176: distinguish statutory text from claimed ultimate purpose; source the Freire attribution and civic framework; qualify inevitable learning/dropout effects and claims of eliminated fear/dramatic gains. Neither the current two-source declaration nor inspected primary evidence establishes these claims. Also source or remove the unreferenced quantity in ERQ 3.
- [blocking] A1 unit-assessment.mdx MCQ 10: Apply label describes a definition-recognition item. Change demand or label. Both topic retrieval item 4 questions require Analyze outside the approved formative Remember/Understand/Apply band. ERQ and mini-rubrics need observable performance anchors at differing scores, not only criteria and maxima. See specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/assessment-review.md.
- [blocking] R1 Both topic files exceed the HSC plain-language register in the cited passages; no unit glossary.json exists for the technical vocabulary. Explain cognitive/phonological/affective and legal terms in everyday language, shorten dense assertions, and add the required bilingual glossary without changing the frozen style guide.
- [blocking] P3 topic-02.mdx:180-200: label the admission notice as a fictional teaching example or supply real issuer/date/source. Teach checking eligibility rules rather than reproducing unverified administrative demands as law. Do the same for the section 144 water-notice example. ERQ 4 should permit evidence-based evaluation rather than require a predetermined superior answer.
- [advisory] All 13 content gates passed. Structural checks do not establish factual support, correct Bloom demand, readable prose or visual accessibility. Leave G3/G5 open; a separate author must repair inputs before fresh independent review. No publication, signature, registry change or acceptance was attempted.
- [uncertain] P1 Provenance/bundle: no actual author conversation ID or exact deployed reviewer model revision was supplied; parent did not prepare a handoff manifest. Reviewer prepared and verified 89 clean inputs, but cannot certify the missing provenance. Supply actual identities and a complete frozen bundle to a fresh reviewer; do not substitute commit hashes for conversation IDs. See specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/provenance.md.
- [uncertain] P2 Required presentation evidence is unavailable under the explicit crew prohibition on builds, servers and Playwright. No narrow-screen/A4 inspection or glyph geometry was run. Host must obtain actual rendered evidence for the same bytes before a passing review. See specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/render-limitations.md.
- [uncertain] S2 sources/unit-03.md: Ashraf primary text was not obtained (web tool failures and publisher 403); no authorized unavailable-source declaration exists. Local source excerpts are outside the prepared input manifest. Obtain and bind the original passages or record an honest owner-authorized unavailable-source declaration with affected claims qualified.
- [uncertain] A2 The initial file read exposed supplied guidance before a separate written solve record. Reviewer-derived solutions and comparisons are saved, but a fully blind independent solve is not claimed. Fresh reviewer must solve the questions before receiving the final answers section.

## Notes from earlier jobs on this unit
- (efmp-406-u03-translate-r1, translate, codex) Translation remains draft; independent G5 and permitted browser/print/SVG geometry checks remain pending.
- (efmp-406-u03-translate-r1, translate, codex) Translation remains draft; independent G5 and permitted browser/print/SVG geometry checks remain pending.
- (efmp-406-u03-repair_en-conflict2, fix, opencode) `static/content-status.json` is gitignored; run `npm run build:content-status` after any tracker edit or the content-status gate fails.
- (efmp-406-u03-repair_en-conflict2, fix, opencode) G3/G5 remain open and unsigned; the Unit 3 G3 advisory row still records missing author run identity and browser/print evidence.
- (efmp-406-u03-repair_en-conflict2, fix, opencode) Merge is local only on `crew/efmp-406-u03-repair_en`; do not push or open a PR.

## Response snapshot

Verified that the earlier 24e7302b2 repair already resolved the report's S1/S2/S3/A1/P3 findings, simplified the remaining graduate-level terms in the cited passages (codified, multimodal, constitutional jurisprudence) in EN and UR, refreshed the G2 gate evidence, and appended the advisory Unit 3 G3 tracker row naming report c8508ca2 while leaving G3 unticked.

## Outcome

- Impact: repair_en for EFMP-406 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed (14/14 gates); focused vitest on pipeline-gate, reviewQueue, content-status-report and g3Desk passed (82 tests).
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Simplified the remaining graduate-level terms in the R1-cited passages (codified, multimodal, constitutional jurisprudence) in EN and UR, refreshed the G2 gate evidence, and appended the advisory Unit 3 G3 tracker row naming report c8508ca2 while leaving G3 unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - The c8508ca2 report is a stale re-review of the pre-24e7302b2 bytes; its S1/S2/S3/A1/P3 findings were already resolved there. The current residual was only the R1 readability terms, now simplified.
  - P1 provenance, P2 rendered desktop/narrow/A4 evidence and A2 blind solve remain unavailable to this job and need the coordinator and an authorised browser host.
  - No external source is bound for the literacy event/practice or dominant/vernacular terms; Topic 3.1 presents them as textbook working labels.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
