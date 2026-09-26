---
feature: 025-admin-review-workflows
status: approved-by-implementation-request
date: 2026-09-26
---

# Admin dashboard, scoped review and improvement jobs

The implementation request approves the prior agent's plan as the scope for this feature.
It extends Features 011 and 017 without changing Git's authority for content or G3/G5 evidence.

## Requirements

- FR-001: `/app/admin/` is an admin-only landing page linked from the signed-in navbar. It
  reaches users, selected class and learner records, reviewer applications, review decisions,
  reader feedback, suggestions, content status, agent jobs and audit history.
- FR-002: Students and teachers may apply for reviewer access with qualification evidence.
  Admins may approve, reject, directly grant or revoke a scope. A scope is B.Ed track, one
  B.Ed course, or the teaching-licence track. Feature 024 removes licence course codes.
- FR-003: Reviewers see only work within active scopes and submit criterion results, comments
  and a recommendation. Admins record the final decision. Formal G3/G5 status changes only
  through committed Git evidence and existing gates. Licence page reviews remain advisory.
- FR-004: An admin may queue exactly one approved agent job per accepted teacher suggestion
  or review improvement decision. A trusted heartbeat may claim it, report progress/failure,
  retry with a new token, and report a draft PR with diff and checks. Manual export works when
  the host agent is unavailable. Credentials stay on the host.
- FR-005: Student and teacher home pages put the next action first and preserve existing
  class, assignment, grade, activity and navigation tools in English and Urdu.
- FR-006: Every backend read and write is controlled by RLS or a server-side function;
  browser guards are cosmetic. Admin actions are audited. Reviewer grants require evidence.

## Acceptance

- Admin home and its navbar link render for active admins, and other roles see a denial.
- Course-specific grants cannot submit a review in another course or track; revocation and
  suspension remove access immediately.
- An admin decision cannot be written by a reviewer. A failed job requires admin retry; a
  stale claim token cannot report over a new attempt. Draft PR reuse is keyed by job branch.
- Both dashboard homes have a heading, a prioritized action, empty and error states, and
  keyboard and narrow RTL navigation without horizontal overflow.
- Migration, TypeScript, unit, RLS, build and content gates are run at the applicable stage.

## Constraints

No browser secret, impersonation, direct content publication, agent self-review, fabricated
human initials, or ADR without owner authorization. Existing unscoped reviewer booleans are
historical audit records and cannot be silently converted to a scoped grant.
