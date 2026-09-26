---
id: "0081"
title: Implement Scoped Admin Dashboard Workflows
stage: green
date: 2026-09-26
surface: agent
model: gpt-6
feature: 025-admin-review-workflows
branch: 024-licence-topic-design
user: user
command: implement supplied plan
labels: ["admin", "reviewer", "dashboard", "agent-jobs"]
links:
  spec: specs/025-admin-review-workflows/spec.md
  ticket: null
  adr: specs/decisions/adr-proposals.md
  pr: null
files:
  - AGENTS.md
  - .agents/skills.json
  - package.json
  - package-lock.json
  - supabase/migrations/0046_scoped_review_and_agent_jobs.sql
  - supabase/migrations/0047_admin_moderation_audit.sql
  - supabase/migrations/0048_review_course_scope_sync.sql
  - scripts/agent-job.mjs
  - scripts/lib/agent-job-pr.mjs
  - scripts/lib/review-catalog.mjs
  - src/pages/app/admin/index.tsx
  - src/pages/app/admin/audit.tsx
  - src/pages/app/admin/review-queue.tsx
  - src/pages/app/admin/suggestions.tsx
  - src/pages/app/admin/users.tsx
  - src/pages/app/admin/records.tsx
  - src/pages/app/admin/reviewers.tsx
  - src/pages/app/admin/review-decisions.tsx
  - src/pages/app/admin/agent-jobs.tsx
  - src/pages/app/reviewer/apply.tsx
  - src/pages/app/reviewer/workbench.tsx
  - src/pages/app/dashboard/index.tsx
  - src/pages/app/teacher/index.tsx
  - src/components/MobileTopBarWidgets.module.css
  - src/components/NavbarAuthWidget.tsx
  - src/components/ReviewerGuard.tsx
  - src/css/custom.css
  - src/lib/dashboardNav.ts
  - src/lib/reviewerScopes.ts
  - guides/admin-guide/index.mdx
  - guides/admin-guide/_category_.json
  - guides/student-guide/use-the-dashboard.mdx
  - guides/teacher-guide/use-the-teacher-dashboard.mdx
  - guides/teacher-guide/review-and-certify.mdx
  - specs/025-admin-review-workflows/spec.md
  - specs/025-admin-review-workflows/plan.md
  - specs/025-admin-review-workflows/tasks.md
  - specs/025-admin-review-workflows/quickstart.md
  - specs/011-dashboard-redesign/spec.md
  - specs/017-reviewer-role/spec.md
  - specs/decisions/adr-proposals.md
  - tests/profile-dependents.mjs
  - tests/unit/agent-job-pr.test.mjs
  - tests/unit/review-scope-catalog.test.mjs
  - tests/rls/reviewer-capability.test.mjs
  - tests/rls/scoped-review-jobs.test.mjs
  - tests/e2e/admin-and-dashboard-a11y.spec.ts
  - tests/e2e/reviewer-and-jobs.spec.ts
tests:
  - npm run check:all
  - local scoped RLS Vitest suite
  - local Playwright admin and dashboard accessibility suite
  - local Playwright reviewer and jobs suite
  - PostgreSQL migration parse and transaction rollback
  - Local heartbeat CLI catalog and host-configuration sync
---

## Prompt

A previous agent produced the plan below to accomplish the user's task. Implement the plan in a fresh context. Treat the plan as the source of user intent, re-read files as needed, and carry the work through implementation and verification.

# Admin dashboard, scoped reviewers, and dashboard redesign

## Summary

The live site serves several admin pages, but `/app/admin/` returns 403 and the navbar has no admin link. The current reviewer access is a single yes/no flag, with no applications or course scope. This plan creates a reachable admin home, adds the requested workflows, and redesigns the student and teacher dashboards around their main tasks.

## Key changes

- Add `/app/admin/` as the admin landing page, with navigation to users, classes, student and teacher records, reviewer applications, review decisions, feedback, suggestions, content status, agent jobs, and audit history. Admins select the record they are acting on; server-side permissions and audit entries cover each action.
- Add reviewer applications for students and teachers. Admins can approve, reject, revoke, or directly assign access for **B.Ed**, the **teaching-licence track**, or individual courses. Approval records the qualification evidence and scope required by the existing review policy.
- Give reviewers a scoped queue with topic checklists, criterion results, specific comments, and an approval or improvement recommendation. Support formal G3/G5 unit reviews in the same workflow. Reviewers submit recommendations; the admin records the final decision. Formal reviewed status changes only when the required evidence is committed and passes the existing Git gates.
- Put admin-approved improvements in a durable agent work queue. An existing heartbeat agent will claim jobs through a repository CLI, open a **draft pull request**, and post its diff, checks, errors, and PR link to the admin dashboard. Provide manual export when the agent is unavailable. The admin settings page selects from host-installed Claude, Codex, Antigravity, and OpenCode configurations; credentials stay on the host.
- Update the repository’s Antigravity policy to permit implementation jobs while keeping independent review in a separate run that did not author the material. Record this governance change for an ADR decision; do not create an ADR without authorization.
- Redesign the student and teacher dashboard homes with clear headings, prioritized next actions, useful empty and error states, responsive navigation, and consistent English/Urdu layouts. Preserve their existing tools while making common tasks easier to find and complete.

## Interfaces and checks

- Add database records for scoped reviewer grants, applications, review submissions and decisions, agent jobs, configuration choices, and action history. Enforce scope, status transitions, and admin authority in Supabase policies and server-side functions.
- Add a heartbeat CLI contract to claim one approved job, report progress and outcome, and safely retry without creating duplicate PRs. Keep Git content and formal review evidence as the source of truth for publication.
- Test admin navigation and selected-record actions; reviewer application, direct grant, scope and revocation; review submission and admin approval; failed and retried agent jobs; and draft-PR reporting. Run RLS tests for denied cross-scope access, plus keyboard, mobile, RTL, and [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) checks for all three dashboards.

## Assumptions

- “Program-wide” means a grant to one track, not automatically to both tracks.
- Admin access uses selected users’ or classes’ records, without impersonating their sessions.
- The existing external heartbeat runs inside this repository and can invoke the new CLI. Its host supplies CLI credentials and GitHub access.
- Approval of an improvement authorizes a proposed change; the agent’s PR and the existing content gates remain the path to publication.

## Response snapshot

Implemented the admin landing and linked workflows, scoped reviewer grants and applications,
review recommendations and admin decisions, durable agent jobs and host CLI, and the redesigned
student and teacher homes. Preserved Git as the formal review authority. Added local RLS and
browser coverage, guide updates and a pending ADR proposal.

## Outcome

- ✅ Impact: Admin and reviewer workflows are implemented in code and verified locally.
- 🧪 Tests: Full gates, focused RLS and Playwright suites passed on the local stack.
- 📁 Files: See the file list above and the working tree diff.
- 🔁 Next prompts: Apply migrations to the intended deployment, configure the heartbeat host, and review the ADR proposal.
- 🧠 Reflection: Feature 024 removed licence course codes, so licence review uses track-wide page-level advisory records.

## Evaluation notes (flywheel)

- Failure modes observed: Mobile RTL search overlapped the account pill; repaired after an axe check. Existing licence practice-page links remain broken in the unfinished Feature 024 corpus.
- Graders run and results (PASS/FAIL): Full gates PASS; focused local RLS PASS; targeted browser suites PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Deploy migrations to a staging instance and run the same browser and RLS suites there.
