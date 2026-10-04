---
id: 0087
title: CEO status, paid layer hold, strict PHRs
stage: general
date: 2026-10-04
surface: agent
model: claude-opus-5-5
feature: none
branch: docs/phr-ceo-awareness
user: M Yousif Channa
command: free-form request, then plan mode
labels: ["board-direct", "paperclip", "ops", "phr", "agent-coordination", "licence-paid-layer-hold"]
links:
  spec: null
  ticket: TEX-20, TEX-18, TEX-8
  adr: null
  pr: null
files:
 - CLAUDE.md
 - AGENTS.md
 - .specify/templates/phr-template.prompt.md
 - history/prompts/general/0088-board-direct-uiux-pivot-2026-10-04.general.prompt.md
 - history/prompts/general/0087-ceo-status-hold-and-strict-phr-rule.general.prompt.md
 - /home/a2ahs/org/textbook/roles/*.md (outside the repo; 6 role files)
tests:
 - read-only Paperclip DB queries (agents, heartbeat_runs, issues) to diagnose the CEO
 - npm run check:no-em-dash
---

## Prompt

check the ceo tex status, where it is stuck

as them to hold license paid layer, we are working on UI/UX for now, also there must be a way by which CEO made aware of our work though claude directly on this same project.

(Clarification answers: post the hold with a board API key file the user creates; "CEO should read PHR and CLI agent with CLAUDE.md and AGENTS.md strictly mantain detailed PHRs so the CEO and agents remain aware.")

## Response snapshot

Diagnosis: the CEO agent (ProgramManager) is in `error` on TEX-20 (real contact details for
`contact.mdx`). Three runs at 2026-10-03 21:39-21:41Z failed with `acpx_turn_failed: ACP agent
reported a terminal limit failure` at 0 tokens used (an account/usage limit). Timer heartbeats
are disabled for every agent, so nothing has run since; `contact.mdx` (EN and UR) still holds
placeholders.

Changes: a strict PHR rule in `CLAUDE.md` and `AGENTS.md` (PHR for every acting prompt, committed
with the work, `board-direct` label, mandatory handoff); a `## Handoff (for CEO and agents)`
section in the PHR template; a "Board-direct awareness" section in all six Paperclip role files
so every run first reads new PHRs; backfill PHR 0088. Posted through the owner-authenticated
`paperclipai` CLI (the dashboard has no board-key UI): manual `pause` tree holds on TEX-7 (covers
TEX-18) and TEX-8, and a `--resume` board update on TEX-20 that woke the CEO out of `error`.
Paused issues reject comments (409 "Task is paused"), so TEX-8 and TEX-18 carry the hold reason only.

## Outcome

- ✅ Impact: board-direct work becomes visible to the CEO and agents through PHRs.
- 🧪 Tests: no-em-dash gate on edited docs.
- 📁 Files: CLAUDE.md, AGENTS.md, PHR template, PHRs 0087/0088, role files (outside repo).
- 🔁 Next prompts: release the holds when the board revisits the paid layer; consider a `check:phr` CI gate (Tier A) if PHR discipline slips.
- 🧠 Reflection: the CEO had no inbound channel for work done outside Paperclip.

## Handoff (for CEO and agents)

- Shipped / changed: strict PHR rule (CLAUDE.md, AGENTS.md); PHR template gains a Handoff section; role files require reading new PHRs at the start of every run.
- Decisions the team must respect: Licence paid layer (TEX-7, TEX-8, TEX-18 tree) is **on hold**; priority is UI/UX. Every repo-writing run leaves a PHR with a Handoff section.
- Pending / next owner: ProgramManager is working TEX-20 (contact details); the board releases the TEX-7/TEX-8 holds when ready.
- Paperclip issues affected: TEX-20, TEX-18, TEX-8, TEX-7.

## Evaluation notes (flywheel)

- Failure modes observed: agent stuck in `error` after a usage-limit failure, with heartbeats off so it never retried.
- Graders run and results (PASS/FAIL): check:no-em-dash (see PR).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): CI gate requiring a PHR in PRs that touch `src/` or `docs/`.
