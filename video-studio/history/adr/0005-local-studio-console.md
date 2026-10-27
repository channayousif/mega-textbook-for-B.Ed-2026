# VS-ADR-0005 - A local one-page Studio replaces folder-based handoffs
Status: Accepted · Date: 2026-10-24

## Context
The owner prefers guided, on-screen instructions per stage over handoff markdown + dropping
renamed files into folders. Media files are large and the pipeline already runs locally.

## Decision
Build a localhost single-page app (React + Hono) that reads and writes the same episode files
as Claude Code. It provides per-stage instructions, copy buttons, deep links to subscription
tools, drop zones that auto-name and normalise uploads, a Remotion Player preview, job logs and
gate buttons. The file system stays the source of truth.

## Consequences
+ Faster, fewer mistakes, usable by a non-technical teammate at the same computer.
+ Claude Code and the Studio can be used interchangeably on the same episode.
− Extra code to maintain (VS-002). Local-only: remote use needs a new ADR.

## Alternatives considered
Hosted web app (needs auth, storage, upload bandwidth); Remotion Studio alone (no workflow/gates);
Notion/Sheets tracker (no uploads/normalisation/preview).
