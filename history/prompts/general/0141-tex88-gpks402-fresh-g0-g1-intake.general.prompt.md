---
id: 0141-tex88-gpks402-fresh-g0-g1-intake
title: TEX-88 fresh G0/G1 intake for GPKS-402 before authoring
stage: intake
date: 2026-10-17
surface: paperclip-agent
model: LongCat-2.0
feature: gpks-402
branch: agent/TEX-88
user: board-via-paperclip
command: evaluate-intake
labels: [CurriculumOwner]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: 01e68028-0a4b-4a17-ac2a-b3009d83b48e
  adr: null
  pr: 153
files:
  - specs/content/gpks-402/intake-88/manifest.json
  - specs/content/gpks-402/intake-88/evaluation.md
  - specs/content/gpks-402/content-spec.md (read-only, bound)
  - specs/decisions/log.md (appended D-2026-0068)
  - Scheme-and-Course-guides/extracted-text/2nd 2026.txt (read-only, bound)
  - catalog/courses.json (read-only, bound)
tests:
  - manifestFor() recompute: 55 inputs, 0 path/digest mismatches, manifest_digest reproduces (4b7ec030...)
  - deterministic gates (exit 0): em-dash, validate:content, bloom-bands (750 items), concept-graph, depth-gate, source-floor, no-answer-keys, docs-sync
  - ERQ arithmetic: all 6 units sum to exactly 5
  - coverage: 43 teaching-week bullets → 47 spec rows via documented decomposition
---

## Prompt

Unblock TEX-72. The agent/TEX-44 branch and draft PR #124 are rebased on main. The content-spec status is draft, not approved. D-2026-0053 requires a fresh intake after the author repairs. Source-floor mapping and Unit 3 ERQ arithmetic were repaired. Prepare a fresh evaluation bundle, independently evaluate all current inputs under the evaluate-intake skill, approve only if justified or return precise defects. Do not reuse the historical D-2026-0052 manifest acceptance. Preserve existing branch/PR; no unit authoring until approval. Success: valid current G0/G1 disposition recorded and author notified.

## Response snapshot

Treated the D-2026-0052 evaluation and its manifest as stale and did not reuse them. Created a fresh worktree from agent/TEX-44 (the spec exists only there; PR #124 is still draft). Ran `scripts/prepare-intake-evidence.mjs GPKS-402 specs/content/gpks-402/intake-88`, which produced a 55-input bundle at commit d3bdfc9a. Independently recomputed the manifest via `manifestFor()`: all paths and per-file digests reproduced exactly and the manifest_digest `4b7ec0302eb9f10b4fbc2244368a1b872bf4087d85c24ad4e1a2b67d19b9b1d` matched byte-for-byte.

Ran the deterministic gates: em-dash, validate:content, bloom-bands, concept-graph, depth-gate, source-floor, no-answer-keys, docs-sync all exit 0. (Pipeline/figures gates are not applicable — no units authored; their Sem-1 reds are unrelated EFMP G2 manifests.)

Verified every D-2026-0052 defect against the current spec:
- Partition (G-2026-97): confirmed by owner ruling D-2026-0053/1; the week-schedule table and Unit 4-6 opening lines are repaired (now 7-8,10 / 11-12 / 13-15 matching the guide).
- Readings (G-2026-98): confirmed by D-2026-0053/2; open_access_floor now declared (default:1), source-floor passes, unlocatable keys removed, "fifty decades" typo repaired.
- Outcomes (G-2026-99): confirmed by D-2026-0053/4; SLO 6-1 derivation permitted.
- Blueprint: ERQ arithmetic repaired — all six units declare ERQs(5) with distributions summing to exactly 5.
- Coverage: 43 teaching-week bullets map to 47 rows via legitimate decomposition; every bullet once, no orphan rows.
- Identity/structure/decision-residue: clean; no GPKS-302 or Semester-IV residue.

Result: D-2026-0068 approved all eight G0/G1 criteria at pending-owner-review. Advisory: three reading-list Units-column cross-references remain imprecise (not escalated, not a criterion defect). Committed to agent/TEX-88, pushed, opened draft PR #153.

## Outcome

- ✅ Impact: TEX-72 unblocked — GPKS-402 has a valid fresh G0/G1 disposition (D-2026-0068) that the owner can confirm to move the spec to `status: approved`. No re-escalation of the D-2026-0052 gaps; all three were resolved by the confirmed D-2026-0053.
- 🧪 Tests: manifest recompute (55 inputs, 0 mismatches, digest reproduces); 8 deterministic gates pass; ERQ arithmetic correct for all 6 units; coverage mapping verified by guide-line/row pairing.
- 🔁 Next prompts: owner reviews D-2026-0068 and sets content-spec `status: approved`; then BilingualAuthor may begin Unit authoring on TEX-72.
- 🧠 Reflection: The old `prepare-intake-evidence.mjs` argument order is positional `<COURSE> <out-dir>` and the course code must be uppercase (GPKS-402, not gpks-402) or it throws "must look like EFMP-304". The manifestFor() call signature is `manifestFor(root, roots, scope)` — passing args reversed yields `undefined` for the digest, not an error, so check the return shape.

## Handoff (for CEO and agents)

- Shipped / changed: D-2026-0068 recorded in `specs/decisions/log.md` (pending-owner-review); fresh evaluation bundle at `specs/content/gpks-402/intake-88/`; draft PR #153 open on agent/TEX-88.
- Decisions the team must respect: GPKS-402 content-spec is NOT approved until the owner confirms D-2026-0068. No unit authoring until `status: approved` (FR-002/FR-016b). The three reading-list Units-column mismatches (pak-constitution-1973/hamid-khan-const/hec-pak-studies) should be aligned by the author before unit authoring — advisory only, not a gate.
- Pending / next owner: CurriculumOwner confirms/reverses D-2026-0068. BilingualAuthor (TEX-72) begins Unit authoring only after `status: approved`.
- Paperclip issues affected: TEX-88 (this, now done), TEX-72 (unblocked pending owner confirmation), TEX-44 (the spec PR #124 is superseded by the evaluation on agent/TEX-88; the authored Units 1-2 remain withdrawn per D-2026-0053).

## Evaluation notes (flywheel)

- Failure modes observed: none in this gate. The prior D-2026-0052 defects were all repaired; this intake caught no new criterion failures.
- Graders run and results (PASS/FAIL): all eight criteria PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
