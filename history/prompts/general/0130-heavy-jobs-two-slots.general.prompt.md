---
id: 0130
title: Allow two concurrent heavy jobs
stage: general
date: 2026-10-13
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/heavy-job-two-slots
user: M Yousif Channa
command: none
labels: ["board-direct", "ops", "host-limits"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/heavy.sh
 - scripts/deploy-prod.sh
 - CLAUDE.md
 - AGENTS.md
 - /home/a2ahs/org/textbook/roles/bilingualauthor-claude.md (outside repo)
 - /home/a2ahs/org/textbook/roles/bilingualauthor-agy.md (outside repo)
 - history/prompts/general/0129-resume-tex-43-after-stale-recovery.general.prompt.md
 - history/prompts/general/0130-heavy-jobs-two-slots.general.prompt.md
tests:
 - scripts/heavy.sh with three 3s jobs: two started together, third waited for a slot (PASS)
 - scripts/heavy.sh false returns exit 1 (exit code passthrough PASS)
 - bash -n on heavy.sh and deploy-prod.sh (PASS)
---

## Prompt

change: Run only two heavy job at a time

## Response snapshot

Owner ruling: the host heavy-job cap goes from one to two. A single flock file cannot allow
two holders, so added scripts/heavy.sh, which takes one of two lock slots
(/tmp/mega-book-heavy.lock, /tmp/mega-book-heavy.2.lock) and polls every 5s when both are
busy. Slot 1 is the original lock, so callers still using the bare flock count against the
same cap. Updated the rule in CLAUDE.md and AGENTS.md, switched deploy-prod.sh to the
wrapper, and updated the BilingualAuthor role files (claude and agy) outside the repo,
with a fallback to the old flock on branches that predate the script.

## Outcome

- ✅ Impact: up to two builds/Playwright/sharp jobs may run at once across sessions and agents.
- 🧪 Tests: concurrency and exit-code checks on the wrapper passed; no build run.
- 📁 Files: scripts/heavy.sh (new), scripts/deploy-prod.sh, CLAUDE.md, AGENTS.md, two role files.
- 🔁 Next prompts: watch free memory and load during the first double-build window.
- 🧠 Reflection: two Docusaurus en+ur builds is the known ceiling for this box; the 3 GB free-memory check stays.

## Handoff (for CEO and agents)

- Shipped / changed: heavy-job cap is now two; use scripts/heavy.sh <command>.
- Decisions the team must respect: never more than two heavy jobs at once; still no heavy jobs from parallel subagents; still check free -m (3 GB) first; kill dev servers when done.
- Pending / next owner: owner to merge the PR; agents pick up the wrapper after rebasing on main (bare flock remains valid meanwhile as slot 1).
- Paperclip issues affected: TEX-39, TEX-40, TEX-41, TEX-42, TEX-43, TEX-44, TEX-25 (BilingualAuthor build steps).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): wrapper concurrency PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
