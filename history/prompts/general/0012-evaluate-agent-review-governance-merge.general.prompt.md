---
id: 0012
title: Evaluate agent review governance merge
stage: general
date: 2026-09-12
surface: agent
model: claude-opus-5
feature: none
branch: main
user: M Yousif Channa
command: pull and evaluate the changes
labels: ["review", "governance", "spec-014", "ci", "security"]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/39
files:
 - (read-only evaluation; no repository files modified)
tests:
 - npm run test:review (17/17 pass)
 - npm test (206/206 pass, 17 files)
 - npm run check:content (7/7 gates pass)
 - npm run review:evidence -- prepare EFMP-302 1 G3 (116 inputs; 115 on a clean checkout)
---

## Prompt

pull and evaluate the changes.

## Response snapshot

Fast-forwarded `main` from 4c810a2 to 42e88c3 (PR #39, "feat: add G3/G5 reviewer agents and
signed evidence checks", 28 files, +938/-33). Verified the merge by running the review
evidence suite, the vitest unit suite and the full content gate set, then audited the new
trust model in `scripts/lib/review-evidence.mjs`.

Verdict: the security posture is sound and fails closed everywhere it should - empty registry,
absent trust root, forged signature, revoked reviewer, stale manifest and agent-identified
draft rows are all rejected. Three defects found, none of which can produce a false pass:

1. Blocking before activation - `inputManifest` walks the working tree, so any untracked,
   non-ignored file under a manifest root enters the digest set. Demonstrated live: the
   untracked `Scheme-and-Course-guides/textbook_com_pk_brand_business_strategy.pdf` makes the
   local manifest 116 inputs against a clean checkout's 115, so a locally prepared report can
   never validate in CI. Fix: derive the traversal from `git ls-files`, or reject a dirty tree
   during `prepare`.
2. Operational - hashing all 23 files of `scripts/` means an unrelated script edit invalidates
   every accepted report and re-blocks `check:pipeline-gate` for all agent-certified units.
   Suggest narrowing to the review/validation scripts actually bound to the rubric.
3. Consistency regression - the new CI step `npm run test:review` was not added to
   `FULL_GATES` in `scripts/lib/gates.mjs`. `check-docs-sync.mjs` only asserts
   FULL_GATES subset-of CI, so the omission passes silently and `npm run check:all` no longer
   matches CI - the exact "green locally, red in CI" failure Spec 013 was built to prevent.

Minor: `(--)?` in the course-code regex is a stray alternative; the `CONTENT_REVIEW_PUBLIC_KEY`
as a CI secret rather than a committed value means local `check:content` will fail closed once
the first agent tracker row lands, which should be documented.

## Outcome

- ✅ Impact: merge validated; three defects identified with reproduction, none affecting the fail-closed guarantee.
- 🧪 Tests: test:review 17/17, vitest 206/206, check:content 7/7 gates - all pass.
- 📁 Files: no repository files changed by this evaluation.
- 🔁 Next prompts: fix the manifest traversal source; add `test:review` to FULL_GATES; narrow the `scripts/` digest scope.
- 🧠 Reflection: the strongest part of this change is that every failure path terminates in refusal; the weak part is reproducibility of the input digest, which is an availability problem rather than an integrity one.

## Evaluation notes (flywheel)

- Failure modes observed: working-tree-derived digests are host-dependent; one-directional docs-sync assertion admits CI/gate-list drift.
- Graders run and results (PASS/FAIL): test:review PASS; npm test PASS; check:content PASS; manifest reproducibility check FAIL (116 vs 115 inputs).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): switch `walk()` to enumerate tracked paths and re-run `prepare` on a dirty tree to confirm the manifest is stable.
