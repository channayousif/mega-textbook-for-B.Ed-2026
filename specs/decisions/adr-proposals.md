# ADR proposals awaiting owner authorization

## Separate Antigravity implementation jobs from independent review

Proposed 2026-09-26 for the admin dashboard and agent job workflow. An admin may approve a
bounded content improvement job for a host-installed agent, including Antigravity. The job
creates a draft pull request. Any G3/G5 review of that material must run in a fresh independent
session and satisfy ADR-0019; the implementation run may not approve its own work, sign evidence,
edit the reviewer registry, or mark tracker gates done. This changes the previous repository rule
that every Antigravity invocation was reviewer-only. The owner should decide and record the
long-term governance tradeoffs in an ADR. This note is a proposal, not an adopted ADR or a
qualification record.
