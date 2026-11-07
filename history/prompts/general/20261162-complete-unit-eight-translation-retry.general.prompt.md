---
id: 20261162
title: Complete Unit Eight Translation Retry
stage: general
date: 2026-11-08
surface: agent
model: GPT-6
feature: 006-content-pipeline
branch: crew/efmp-407-u08-translate
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "efmp-407", "unit-08", "translation"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/reviews/unit-08/G2/20261107T194631162Z-gates.json
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T194631162Z/
tests:
  - npm run check:content (draft and temporary reviewed parity)
  - npm run figures:variants:check
  - metadata, heading and component parity comparison
  - origin/main content-gate comparison
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing five-page Urdu draft and four figure variants, regenerated stale G2 evidence using the repository tool, and repointed only Unit 8. Retained draft status and open G3/G5.

## Outcome

- ✅ Impact: Repaired the stale input manifest that blocked the earlier translation attempt.
- 🧪 Tests: Eight recorded G2 draft gates passed. Conditional parity found only expected open G4/G5 rows and transient content-status staleness. Dark variants and metadata/heading/component comparisons passed. Final draft and origin/main runs both passed all 14 content gates after regenerating the local ignored content-status cache.
- 📁 Files: Fresh G2 evidence with eight real command logs, Unit 8 evidence reference, and this PHR. Existing translation and handoff preserved. Regenerated the ignored local static/content-status.json cache after updating the evidence reference.
- 🔁 Next prompts: English author repairs followed by independent G3, permitted browser geometry and Urdu render/A4 inspection, then independent G5.
- 🧠 Reflection: The previous translation commit added a bound per-unit translation handoff, invalidating its prior English draft manifest. Re-run evidence preparation instead of editing digests.

## Handoff (for CEO and agents)

- Shipped / changed: Existing complete Urdu draft preserved and its stale G2 evidence replaced.
- Decisions the team must respect: No reviewed claim, certification, publication, push or PR. The existing G4 prepared row remains.
- Pending / next owner: English author owns open F1-F9 repairs and mirrored Urdu updates; independent reviewers own G3/G5. Permitted inspection job or CI owns browser geometry and RTL/A4 evidence.
- Paperclip issues affected: crew efmp-407-u08-translate; no ticket identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Stale G2 manifest after adding a bound translation handoff. Temporary reviewed flags also cause expected open-review and content-status failures.
- Graders run and results (PASS/FAIL): Recorded G2 draft commands PASS; variants PASS; structural comparisons PASS; final content suite PASS (14/14), origin/main PASS (14/14), zero new findings.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Prepare fresh deterministic evidence whenever bound per-unit handoff artifacts change.
