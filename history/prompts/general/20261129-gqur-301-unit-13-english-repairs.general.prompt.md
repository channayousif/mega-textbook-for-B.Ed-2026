---
id: 20261129
title: Repair GQUR-301 Unit 13 English findings
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 Codex (exact version unavailable)
feature: none
branch: crew/gqur-301-u13-repair_en
user: owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "gqur-301", "repair"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-13/topic-01.mdx
  - docs/semester-2/gqur-301/unit-13/topic-02.mdx
  - docs/semester-2/gqur-301/unit-13/unit-assessment.mdx
  - specs/content/gqur-301/coverage/unit-13.md
  - specs/content/gqur-301/concepts/unit-13.md
  - specs/content/gqur-301/sources/unit-13.md
  - specs/content/gqur-301/sources/unit-13/passage-notes.md
  - specs/content/gqur-301/reviews/unit-13/repair-en-handoff.md
  - specs/content/gqur-301/tasks.md
tests:
  - npm run check:content (baseline all 14 pass at origin/main c8cf9e9d)
  - scripts/heavy.sh npm test
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied bounded English statistical and assessment repairs; documented source support and external evidence gaps; retained unticked advisory G3. Scoped validation and commits completed in this branch; full completion awaits a scope exception for the generated status file.

## Outcome

- ✅ Impact: Corrected same-data r guidance, scale and prediction claims, analytical demands and real-data assessment.
- 🧪 Tests: Baseline passed. Repair checks exposed stale Unit 13 G2 evidence, requiring refresh after committing source changes. Final results: 13/14 content gates pass, only the out-of-scope generated status file is stale; 368 unit tests pass. Scope exception requested, not received.
- 📁 Files: Unit 13 English topics, assessment, coverage, concepts note, source notes, tracker and repair handoff.
- 🔁 Next prompts: Fresh independent G3; owner/evaluator G1; authorised rendering; translation/G5.
- 🧠 Reflection: Historical missing identities and forbidden rendering cannot be manufactured by an English repair.

## Handoff (for CEO and agents)

- Shipped / changed: Statistical corrections and scored analysis demands, real Pakistani data task, honest source declaration.
- Decisions the team must respect: G3/G5 remain open; no publication or certification claim. Existing assets preserved.
- Pending / next owner: Owner/evaluator current G1; review host real run provenance; authorised engineering actual rendered evidence; translation owner missing Urdu mirrors and damaged label.
- Paperclip issues affected: GQUR-301 Unit 13 repair crew job; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Content edits invalidate G2 manifests and derived publication status until deterministic evidence is refreshed.
- Graders run and results (PASS/FAIL): See reviews/unit-13/repair-en-handoff.md for final content gates and unit-test results.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent review with current source notes and actual rendered inputs.
