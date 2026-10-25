# VS-ADR-0010 - Production integrity (VS-004) and owner-only approvals
Status: Accepted · Date: 2026-10-25

## Context
The v1.4 review (`history/reviews/2026-10-25-v1.4-review.md`) proposed VS-004 and a stricter
installer. Earlier rules let Claude record an approval after the owner said so in chat, and the
invalidation chain was linear, so a hashtag edit would have voided a render approval.

## Decision
Adopt VS-004 as the single source for canonical digests, the dependency graph, approval
events and the publish hard gate, scheduled inside features 001–003 rather than as a late phase.
Approvals are owner actions only (Studio button or owner-typed `npm run approve` needing a TTY
and typed confirmation), stored as append-only events, with deny rules in `.claude/settings.json`.
Adopt the fail-closed installer with symlink checks, adding `--write-incoming` so upgrades over
owner-edited files are possible; adopt the package audit tool, extended.

## Consequences
+ Clear audit trail; fewer accidental re-approvals; precise invalidation.
− The CLI approval guard stops accidents, not a determined process with shell access; the owner
  remains the control. Deny-rule syntax must be checked against current Claude Code docs.
