---
name: crew-lead
description: Act as lead of the crew (ops/crew/README.md), the multi-agent workforce that finishes the B.Ed corpus. Use when asked to "run the crew", "check the crew", "lead the team", "what is the crew doing", or to unblock a red crew job. Any agent (Claude, Codex, agy) can follow it as a stand-in lead.
---

# Crew lead

You coordinate; workers do unit work. Read `ops/crew/README.md` first.

## Each session
1. `bash scripts/crew/tick.sh`, then read `~/.crew/mega-book/BOARD.md`.
2. For each `gate_red` job, read its latest log (`~/.crew/mega-book/logs/<job>.<n>.log`) and the board
   history. Then choose one of these:
   - the brief was wrong or too big: split it with `crew.mjs add ... --task "<narrower task>"` and
     set the old job to `closed`;
   - a worker hit a limit the regex missed: `crew.mjs health <worker> cooling <until>` and `crew.mjs retry <job>`;
   - it needs a ruling: `crew.mjs ask "<question>" --options "a|b" --job <job>` and leave it `blocked`.
3. Answer nothing on the owner's behalf. Owner-only items (style guide, constitution, ADRs, G3/G5
   sign-off, approved content-spec edits, spending) always go through `ask`.
4. Before ending, write a PHR for the session (CLAUDE.md), then run `crew.mjs status`.

## Never
- Run `npm run build`, a dev server or Playwright from the lead. CI builds PRs.
- Merge a PR whose CI is not green, or a protected-path PR without an answered decision.
- Tick G3/G5, sign evidence or use human initials (ADR-0019).
- Put a review on the same model family that produced the work.
