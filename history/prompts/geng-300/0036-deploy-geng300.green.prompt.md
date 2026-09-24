---
id: 0036
title: Deploy GENG-300 via local CI
stage: green
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: geng-300
branch: 018-author-geng300
user: a2ahs
command: /sp.green
labels: ["deploy", "local-ci", "geng-300", "production"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/geng-300/reviews/unit-01/G2/20260923T124321510Z-gates.json
  - specs/content/geng-300/reviews/unit-02/G2/20260923T124328048Z-gates.json
  - specs/content/geng-300/reviews/unit-03/G2/20260923T124330946Z-gates.json
  - specs/content/geng-300/reviews/unit-04/G2/20260923T124333801Z-gates.json
  - specs/content/geng-300/tasks.md
tests:
  - "node scripts/local-ci.mjs (25 steps passed, 1 exempt)"
  - "bash scripts/deploy-prod.sh (deployed 2bf47e6 OK)"
  - "curl https://textbook.com.pk/licence/geng-300/course-overview/ (HTTP 200)"
---

## Prompt

"ok do local" — run local CI and deploy GENG-300 to production.

## Response snapshot

Resolved the stale G2 evidence issue (figure manifests had changed after evidence was first recorded, causing `input_manifest` hash mismatches). Regenerated fresh G2 evidence for all 4 units via `prepare-gate-evidence.mjs`, committed, verified zero hash mismatches, ran local CI (25/26 steps passed, 1 exempt), wrote attestation to `~/deploy/local-ci/2bf47e6...json`, merged branch to main as a fast-forward, pushed, and ran `deploy-prod.sh`. Course is live at https://textbook.com.pk/licence/geng-300/course-overview/.

## Outcome

- ✅ Impact: GENG-300 Functional English (4 units) deployed to textbook.com.pk
- 🧪 Tests: 25 CI steps passed (npm ci, validate:content, pipeline gate, depth gate, figure marker gate, docs-sync gate, figure dark-variant, content status, no-em-dash, answer-key safety, concept-graph, bloom bands, open-access source floor, add-course, unit tests, agent review evidence, build en+ur, RLS tests, Lighthouse, e2e), 1 exempt (Playwright browsers already present)
- 📁 Files: 4 G2 evidence manifests + logs, tasks.md updated with new evidence paths
- 🔁 Next prompts: G3 human review of GENG-300 units; then G6 assets/G7 publish
- 🧠 Reflection: The stale-evidence problem is a governance seam - figure manifests can be edited independently of the content they describe, but the evidence binds both. The fix (regenerate evidence at the final commit, fast-forward main to that commit) is clean but requires the main branch to be an ancestor of the feature branch.

## Evaluation notes (flywheel)

- Failure modes observed: Stale G2 evidence when figure manifests are edited after evidence generation; merge commit invalidating attestation SHA
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
