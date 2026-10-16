---
id: 0142
title: "TEX-61 G2 evidence regeneration after figure parity fix"
stage: general
date: 2026-10-16
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-61
user: M Yousif Channa
command: /paperclip-agent
labels: ["paperclip", "curriculumowner", "tex-61", "g2-evidence", "ci-fix"]
links:
  spec: null
  ticket: TEX-61
  adr: null
  pr: 148
files:
 - specs/content/*/reviews/unit-*/G2/*.json (45 fresh evidence manifests)
 - specs/content/*/reviews/unit-*/G2/logs-*/ (gate logs)
 - specs/content/*/tasks.md (tracker rows updated)
tests:
 - npm run check:pipeline-gate: pass (44 gate-checked)
 - npm run test:review: 40/40 pass
---

## Prompt

TEX-84 commented on TEX-61: PR #148 has failing CI — stale/incomplete G2 input manifests across courses. The figure desc/alt parity fix changed SVG bytes, invalidating existing G2 evidence. Regenerate post-edit G2 evidence through the approved process, rerun gates, update draft PR. Do not fabricate review signatures or alter gate authority.

## Response snapshot

Identified 45 units across 7 courses that had both SVG changes and existing G2 evidence (or were flagged by check:pipeline-gate as stale). Ran `prepare-gate-evidence.mjs` (gates:evidence) for each — all gate suites pass, fresh manifests written with `wx` flag (never overwriting). Updated every G2 en-draft tracker row in specs/content/*/tasks.md to point to the freshest evidence manifest (sorted by timestamp, took newest). Three iterative passes were needed: initial scan via `git show --stat HEAD~1` truncated the large commit and missed units; switched to `git diff-tree --name-only -r` for the complete file list; pipeline gate then flagged 6 additional units whose evidence predated the reconciliation report additions.

Em dash in reconciliation report titles (U+2014) also blocked `check:no-em-dash` repo-wide — replaced with hyphen.

Final state: check:figures exits 0, check:pipeline-gate passes (44 gate-checked), all 40 review-evidence tests pass. Pushed 4 commits to agent/TEX-61; PR #148 updated.

## Outcome

- ✅ Impact: PR #148 CI-unblocked. 45 units' G2 evidence regenerated. All tracker rows current.
- 🧪 Tests: check:pipeline-gate pass, test:review 40/40 pass.
- 📁 Files: ~180 new evidence+log files, 7 tasks.md tracker files updated.
- 🔁 Next prompts: board review and merge of PR #148.
- 🧠 Reflection: `git show --stat` truncates large commits; use `git diff-tree --name-only -r` for complete file lists. Adding ANY new file under specs/content (like reconciliation reports) invalidates ALL existing G2 evidence manifests, not just those in changed units.

## Handoff (for CEO and agents)

- Shipped / changed: 45 units' G2 evidence regenerated; all G2 en-draft tracker rows updated to current manifests; PR #148 CI-green.
- Decisions the team must respect: G2 evidence must be regenerated (gates:evidence) whenever content or specs files change; tracker rows must be updated to match.
- Pending / next owner: board review and merge of PR #148.
- Paperclip issues affected: TEX-61, TEX-84 (raised the CI flag).

## Evaluation notes (flywheel)

- Failure modes observed: initial unit detection via truncated git stat output missed 24 of 45 units; em dash in new report titles broke a gate repo-wide.
- Graders run and results (PASS/FAIL): check:pipeline-gate PASS, test:review 40/40 PASS.
