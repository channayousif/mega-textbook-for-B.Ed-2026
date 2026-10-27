# VS-ADR-0007 - Studio may run Claude Code headless jobs (off by default)
Status: Proposed · Date: 2026-10-24

## Context
Script drafting and reviews need Claude. The constitution forbids billing APIs; the owner has
Claude Code with a Claude subscription login.

## Decision
The Studio server may spawn the local Claude Code CLI non-interactively (`claude -p`) for a
fixed whitelist of slash commands and reviewer agents, streaming output to the job log.
Disabled by default; when disabled, the UI shows the exact command to paste into the terminal.

## Consequences
+ One-click drafting/reviews from the Studio.
− Usage counts against the owner's Claude plan limits; confirm current Claude Code terms for
  non-interactive use before enabling. Never pass free-text from the browser to a shell.
