---
id: "0335"
title: "Crew brief findings and handoffs"
stage: general
date: 2026-10-18
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-brief-handoffs
user: M Yousif Channa
command: plan + implement (owner chose "Both improvements")
labels: ["board-direct", "crew", "handoff"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/handoff.mjs
 - scripts/crew/crew.mjs
 - tests/crew/handoff.test.mjs
 - package.json
 - ops/crew/README.md
 - history/prompts/general/0335-crew-brief-handoffs.general.prompt.md
tests:
 - node --test tests/crew/*.test.mjs (7 pass)
---

## Prompt

can crew agents talk to eachother? is it worth applying the A2A protocol for agent to agent communitcation?

(Follow-up choice in the same session: "Both improvements", then plan approved.)

## Response snapshot

No: the crew is hub-and-spoke (dispatcher brief, git, board state). A2A was judged not worth it: workers
are short-lived local CLI batch jobs, an HTTP agent server per worker costs RAM on the shared 2-CPU/12 GB
host, and direct author-reviewer chat would weaken ADR-0019 review independence. Implemented the two
lightweight improvements instead: (1) a repair_en brief now lists the open findings of the latest G3
report, most severe first (max 15 x 600 chars); (2) workers may print up to 3 `CREW-HANDOFF:` lines, kept
on the job and in its PHR, and shown to later non-review jobs on the same unit and to CI-fix jobs
(5 newest). Review stages never receive handoff notes.

## Outcome

- Impact: crew briefs carry review findings and stage-to-stage notes; no new protocol or dependency.
- Tests: tests/crew/handoff.test.mjs, 7 pass. `crew.mjs tick --dry-run` was NOT run: its reap phase is not
  dry-run guarded and can push branches and open PRs.
- Files: listed above.
- Next prompts: owner merges (scripts/ and package.json are protected paths).
- Reflection: the Write and Bash tools turned escaped U+2014 sequences into literal em dashes; caught by grep and restored.

## Handoff (for CEO and agents)

- Shipped: scripts/crew/handoff.mjs + brief/finishSuccess/writePhr wiring in crew.mjs; README step 4 note.
- Decisions to respect: handoff notes never reach review_en/review_ur briefs (ADR-0019 independence).
  A2A was considered and declined (owner, 2026-10-18).
- Pending: owner merge; optional follow-up to wire `npm run test:crew` into `.github/workflows/ci.yml`
  (owner-only path); `tick --dry-run` reap is not side-effect free (follow-up).
- Paperclip issues affected: none (Paperclip paused).
