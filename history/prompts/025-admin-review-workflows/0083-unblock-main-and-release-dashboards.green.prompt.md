---
id: "0083"
title: Unblock Main And Release Dashboards
stage: green
date: 2026-09-26
surface: agent
model: gpt-6
feature: 025-admin-review-workflows
branch: 025-admin-review-workflows
user: user
command: diagnose failing merged build and release dashboard work
labels: ["ci", "dashboard", "release", "reviewer"]
links:
  spec: specs/025-admin-review-workflows/spec.md
  ticket: null
  adr: specs/decisions/adr-proposals.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/70
files:
  - history/prompts/025-admin-review-workflows/0083-unblock-main-and-release-dashboards.green.prompt.md
  - tests/rls/reviewer-capability.test.mjs
  - src/pages/app/admin/index.tsx
  - src/pages/app/dashboard/index.tsx
  - src/pages/app/teacher/index.tsx
tests:
  - Focused reviewer and scoped-job RLS tests against the shared Supabase instance
  - Full repository gates from the implementation turn
  - Main CI run after branch integration
---

## Prompt

dashboard are not live and Commit a343473 Merge pull request #69 from channayousif/024-licence-topic-design
Feature 024 platform: licence track as a code-free STEDA topic list
main(#69)
2 parents
f9c97c8
 +
32025c0
build fails

## Response snapshot

The merged `main` CI run fails at the old reviewer capability assertion. The shared database already has scoped reviewer tables and behavior, but `main` still tests the legacy reviewer boolean. The dashboards remain uncommitted in the working tree, and production correctly holds the previous passing SHA. Integrate the verified dashboard and reviewer changes into a branch based on `main`, then restore CI and deploy the approved result.

## Outcome

- ✅ Impact: PR #70 e2e fixed. Completed by Claude Code after the Codex session hit its usage limit: (1) teacher overview no longer renders the "caught up" sentence twice (strict-mode violation); (2) role-propagation spec asserts the new "Manage scopes" link and no scoped grant instead of the removed reviewer checkbox; (3) reviewer-and-jobs spec waits for the retry RPC before claiming and asserts the claimed id; scripts/agent-job.mjs treats claim_agent_job's all-null row (PostgREST composite return, verified against the shared instance) as an empty queue, which previously made every quiet heartbeat fail.
- 🧪 Tests: Focused shared Supabase RLS tests pass; locally auth-role-propagation, reviewer-and-jobs, teacher-dashboard-performance and teacher-overview e2e specs pass (5/5); agent-job-pr unit tests pass.
- 📁 Files: See this record and the feature branch diff.
- 🔁 Next prompts: Review the integration pull request and the pending ADR proposal.
- 🧠 Reflection: The database migration reached the shared instance before its matching application and test changes reached `main`.

## Evaluation notes (flywheel)

- Failure modes observed: `main`'s RLS gate expects `profiles.reviewer` to grant access after the shared database switched to scoped grants; e2e was skipped because build failed.
- Graders run and results (PASS/FAIL): Current `main` CI FAIL; focused new RLS tests PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run CI on the integrated feature branch, then deploy its exact passing SHA.
