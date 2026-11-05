---
id: crew-efmp-406-u03-repair_en
title: crew repair_en EFMP-406 unit 3
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: efmp-406
branch: crew/efmp-406-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/unit-03/index.mdx
 - docs/semester-3/efmp-406/unit-03/topic-01.mdx
 - docs/semester-3/efmp-406/unit-03/topic-02.mdx
 - docs/semester-3/efmp-406/unit-03/unit-assessment.mdx
 - history/prompts/general/2447-efmp-406-u03-repair-en.general.prompt.md
 - specs/content/efmp-406/coverage/unit-03.md
 - specs/content/efmp-406/glossary/unit-03.json
 - specs/content/efmp-406/reviews/unit-03/G2/20261103T182710608Z-gates.json
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/validate-content.txt
 - specs/content/efmp-406/sources/texts/ashraf-2021-multilingual.md
 - specs/content/efmp-406/sources/texts/papen-2023-nls.md
 - specs/content/efmp-406/sources/unit-03.md
 - specs/content/efmp-406/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u03-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
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
From `specs/content/efmp-406/reviews/unit-03/G3/20261102T212207Z-g3-desk-41db593c.json` (disposition: revise). Resolve each one:
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
- (efmp-406-u03-translate, translate, codex) Author must repair English/source defects before G4 resumes; G3/G5 remain open.
- (efmp-406-u03-translate, translate, codex) Author must repair English/source defects before G4 resumes; G3/G5 remain open.
- (efmp-406-u03-review_en, review_en, codex) Author repairs and fresh source, provenance, browser and print evidence are required; G3 remains open and unsigned.
- (efmp-406-u03-review_en, review_en, codex) Author repairs and fresh source, provenance, browser and print evidence are required; G3 remains open and unsigned.
- (efmp-406-u03-author-conflict1, fix, opencode) G3 independent English review for Unit 3 remains unscheduled (separate reviewer run). Urdu translation (G4) and review (G5) are downstream.


## Response snapshot

Repaired EFMP-406 Unit 3 English for every blocking finding in G3 report 41db593c (real source quotes, qualified claims, fictional notices labelled, Bloom levels and rubric anchors fixed, plainer prose, new bilingual glossary), refreshed G2 evidence and added an unticked G3 repair row.

## Outcome

- Impact: repair_en for EFMP-406 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired EFMP-406 Unit 3 English for every blocking finding in G3 report 41db593c (real source quotes, qualified claims, fictional notices labelled, Bloom levels and rubric anchors fixed, plainer prose, new bilingual glossary), refreshed G2 evidence and added an unticked G3 repair row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Papen and Ashraf source files previously held invented quotes; both are now real quotes, and Ashraf must not be cited for reading outcomes, dropout or MTB-MLE effects.
  - No source is attached for the literacy event/practice or dominant/vernacular terms (Topic 3.1 presents them as working terms); a later job could add Barton and Hamilton.
  - A fresh G3 review needs a complete frozen bundle including `sources/texts`, plus rendered 360px/A4 evidence; the Urdu job (G4) should translate from these revised files.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
