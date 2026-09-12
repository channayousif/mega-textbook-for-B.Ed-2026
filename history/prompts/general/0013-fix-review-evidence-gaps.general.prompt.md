---
id: 0013
title: Fix review evidence gaps
stage: general
date: 2026-09-12
surface: agent
model: claude-opus-5
feature: 014-agent-review-governance
branch: fix/review-evidence-gaps
user: M Yousif Channa
command: fix all gaps
labels: ["review", "governance", "spec-014", "ci", "determinism"]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
 - scripts/lib/review-evidence.mjs
 - scripts/review-evidence.mjs
 - scripts/lib/gates.mjs
 - scripts/check-docs-sync.mjs
 - tests/review/evidence.test.mjs
 - .claude/skills/review-unit/SKILL.md
 - README.md
 - specs/014-agent-review-governance/contracts/review-evidence.md
 - specs/014-agent-review-governance/validation.md
 - specs/014-agent-review-governance/tasks.md
tests:
 - npm run test:review (21/21 pass, 4 new cases)
 - npm run check:all (13/13 full gates pass, build included)
 - prepare EFMP-302 1 G3 twice on a clean clone (byte-identical manifests, 105 inputs)
 - prepare on a dirtied clone (refused, offending path named)
---

## Prompt

fix all gaps.

## Response snapshot

Fixed the three defects from PHR 0012 plus the two minor items, on branch
`fix/review-evidence-gaps`.

1. Manifest reproducibility. `inputManifest` now enumerates git's index
   (`ls-files --cached`) instead of walking the working tree, so the digest set is a function
   of the commit rather than of one machine's scratch files. Contents are still read from disk,
   so a local edit to a tracked file still fails validation. Added `dirtyInputs()`, and
   `prepare` refuses to build a manifest while any bound path is modified, staged or untracked,
   naming the offending paths. A checkout git cannot enumerate is rejected outright.
   Verified on an isolated clone: two consecutive `prepare` runs give byte-identical manifests
   of 105 inputs (was 116 locally against 115 in CI), and dirtying the clone refuses by name.

2. Script binding scope. Replaced the wholesale `scripts/` root with a transitive import
   closure over the validators a report actually cites, plus `check-pipeline-gate` which
   consumes the evidence. 13 bound files instead of 23; `optimize-figure.mjs`, the Supabase
   helpers and the scaffolder no longer invalidate accepted reports. A renamed or deleted entry
   point is a hard error, so the digest set cannot shrink silently.

3. Gate-tier drift. Added `test:review` to `FULL_GATES` and made `check-docs-sync.mjs`
   bidirectional against a new declared `CI_ONLY` allowlist in `gates.mjs`. Running it caught
   three more pre-existing drifts the one-way check had allowed: `figures:variants:check`,
   `check:no-service-key` and `serve`. The first two joined FULL_GATES (13 gates now);
   `serve`, `check:content-status`, `test:rls` and `test:e2e` are declared CI-only with reasons.
   `npm run check:all` now matches CI end to end.

Minor: dropped the stray `(--)?` alternative from the course-code regex; documented in the
README why the trust root is a CI secret and what fails closed locally because of it.

Tests: fixtures are now real git repositories that commit, with four new cases covering
manifest reproducibility under an untracked file, committed-file coverage, the narrowed
script closure (unrelated edit passes, transitive import does not) and the non-git rejection.

Not changed: every fail-closed path. Empty registry, absent trust root, forged signature,
revoked reviewer, stale manifest and agent identities on draft rows are all still rejected, and
the human-initials path still passes.

## Outcome

- ✅ Impact: activation is no longer blocked by a non-reproducible manifest; an unrelated script edit no longer re-blocks the pipeline gate; `check:all` matches CI again.
- 🧪 Tests: test:review 21/21; check:all 13/13 including build; manifest determinism and dirty-tree refusal verified on an isolated clone.
- 📁 Files: 10 changed, +266/-38. No content, tracker row or translation status touched.
- 🔁 Next prompts: open the PR; then T007 (protected signing host and CI trust root) and T008 (real qualification).
- 🧠 Reflection: two of the three fixes were about reproducibility rather than integrity, which is the failure mode a signature scheme hides best: everything verified correctly and still could not agree across hosts.

## Evaluation notes (flywheel)

- Failure modes observed: working-tree-derived digests; one-way consistency assertions admit drift in the unchecked direction.
- Graders run and results (PASS/FAIL): test:review PASS (21); check:all PASS (13); manifest determinism PASS; dirty-tree refusal PASS; fail-closed regression checks PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a bidirectional assertion over the other paired lists in the repo, since the CI/tier pair was not the only one written one-way.
