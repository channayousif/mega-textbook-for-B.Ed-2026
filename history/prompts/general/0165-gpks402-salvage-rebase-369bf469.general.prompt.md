---
id: 0165-gpks402-salvage-rebase-369bf469
title: GPKS-402 salvage rebase onto main 369bf469
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: gpks-402
branch: crew/gpks-402-u00-salvage
user: crew
command: crew job gpks-402-u00-salvage
labels: [crew, claude-worker, gpks-402]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0165-gpks402-salvage-rebase-369bf469.general.prompt.md
tests:
  - npm run check:content (all 13 content gates pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Main had moved two commits (PR #159, EFMP-304 Unit 6 tracker). Rebased the 15 branch commits onto
origin/main 369bf469 with no conflicts; the old tip is kept as
`crew-backup/gpks-402-u00-salvage-pre-rebase5`. The first `npm run check:content` failed
`check:content-status` (the git-ignored `static/content-status.json` was stale) and
`licence:map:check` (passed when run alone, so transient). After regenerating the status file
with `npm run build:content-status`, all 13 gates passed.

## Outcome

- ✅ Impact: branch current with main 369bf469 and gate-clean.
- 🧪 Tests: `npm run check:content` exit 0.
- 📁 Files: this PHR only.
- 🔁 Next prompts: crew lead pushes and opens the PR; decision-ID renumber still open.
- 🧠 Reflection: the git-ignored content-status file must be regenerated after every rebase.

## Handoff (for CEO and agents)

- Shipped / changed: rebase plus this record; not pushed, no PR.
- Decisions the team must respect: `D-2026-0069` is still used twice in `specs/decisions/log.md`
  (line 2213 style guide v4.6 from main; line 2304 GPKS-402 fresh intake on this branch). The
  intake entry needs a new ID before merge; left for the lead or owner because it touches the
  intake evaluation and PR #153 references.
- Pending / next owner: crew lead (push, PR, decision-ID renumber, close this crew job); owner (confirm the intake).
- Paperclip issues affected: TEX-88, TEX-72 (Paperclip paused; tracked by crew).
