---
id: 0170
title: Fix crew owner channel and disk
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-owner-channel
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "openclaw", "ops", "disk"]
links:
  spec: null
  ticket: null
  adr: history/adr/0030-crew-replaces-paperclip-control-plane.md
  pr: null
files:
 - scripts/crew/crew.mjs
 - scripts/crew/notify.mjs
 - scripts/crew/state.mjs
 - ops/crew/README.md
 - .claude/skills/crew-lead/SKILL.md
tests:
 - crew.mjs cmd on a copied state dir: status, /crew status, pause, resume, note, prioritise, stop (unknown job), unknown verb, unknown decision, plain chat
 - cmd under a held tick.lock waits, then applies; cmd status leaves board.json untouched
 - sparse worktree: 630 MB instead of 2.3 GB; every tracked file outside renders-* present; git add -A --sparse includes new renders
 - paperclip-board.sh status tex prints the crew pointer; paperclip-digest.sh renders Da Vinci only
---

## Prompt

the commands you mentioned (crew ststus/resume/..) are not working properly, discord and whatsapp keep me showing defunct CEO TEX (Paperclip) status.

## Response snapshot

Three causes, all fixed:

1. openclaw's own LongCat assistant answered "crew status" first, from its `paperclip-board`
   skill, so it reported TEX issues. Its "Paperclip board digest" and "Paperclip CEO replies"
   cron jobs also still covered Textbook. Host changes (not in the repo, backups `*.bak-20261017`):
   - a new openclaw `crew` skill that runs `crew.mjs cmd '<message>' --via ...` and relays the
     output, on WhatsApp and Discord;
   - `paperclip-board` skill, `TOOLS.md` and `discord-claude-code` now route Textbook and TEX to it;
   - `~/bin/paperclip-board.sh tex` now only prints a pointer to the crew;
   - `paperclip-digest.sh` drops the Textbook section, and the tracked TEX-85 reply watch is removed.
   Da Vinci is unchanged.
2. The crew's own handler did not accept `/crew`, replied only in the Discord channel, and
   merged two requests into one duplicated line. It now has:
   - one `handleCommand` shared by the tick and a new `cmd` CLI;
   - a per-source `reply()`;
   - a multi-line status;
   - `crew note` (saved to OWNER-NOTES.md) and `crew help`;
   - validated decision options;
   - a `handled.json` marker, so a command answered instantly is not applied twice.
   State-changing commands run under the tick's lock.
3. The disk was at 99% (1.9 GB free) on the production host. Every tick crashed in
   `git worktree add`, and the crashed tick saved nothing, so finished jobs were never reaped and
   gpks-402 was relaunched 9 times. Fixes:
   - I freed 18 GB by removing clean, stale Paperclip and old-session worktrees (branches kept);
   - job worktrees are now sparse (0.6 GB instead of 2.3 GB);
   - an 8 GB disk floor, with an alert at most every 6 h;
   - a failed launch is logged and retried, not thrown;
   - tick phases are isolated and state is saved in `finally`.

## Outcome

- Impact: owner commands answer in seconds in the chat they were sent from; no Paperclip Textbook
  status reaches the owner; the crew cannot wedge itself on a full disk.
- Tests: listed above, all passed.
- Files: 5 repo files plus a PHR; host files listed in the README section "Owner commands".
- Next prompts: none required.
- Reflection: a long tick that saves only at the end turns any one failure into total amnesia.

## Handoff (for CEO and agents)

- Shipped / changed: crew owner channel (`crew.mjs cmd`, per-source replies, `crew note`), sparse
  job worktrees, disk floor, crash-safe tick; openclaw `crew` skill; Textbook removed from the
  Paperclip relay, digest and reply watch.
- Decisions the team must respect: Textbook status comes only from the crew. Paperclip stays
  paused for Textbook and active for Da Vinci.
- Pending / next owner: the crew reaps the four finished salvage jobs (efmp-305, geng-301,
  gsos-301, gpks-402) on its next tick; the lead checks the gpks-402 branch, which nine
  overlapping Claude runs touched.
- Paperclip issues affected: none (TEX-85 reply tracking removed from the relay watch).

## Evaluation notes (flywheel)

- Failure modes observed: two assistants answering one channel; an unbounded disk footprint per job;
  all-or-nothing state saves.
- Graders run and results (PASS/FAIL): cmd verbs PASS, lock wait PASS, sparse checkout PASS,
  relay/digest PASS.
- Prompt variant (if applicable): openclaw crew skill v1
- Next experiment (smallest change to try): watch the next owner "crew status" on WhatsApp and
  confirm the reply comes from the skill (seconds), not the tick (minutes).
