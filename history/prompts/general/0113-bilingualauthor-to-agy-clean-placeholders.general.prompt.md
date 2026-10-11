---
id: 0113
title: bilingualauthor-to-agy-clean-placeholders
stage: general
date: 2026-10-10
surface: agent
model: claude-opus-5-5
feature: none
branch: chore/remove-placeholder-review-artefacts
user: M Yousif Channa
command: switch BilingualAuthor to agy and clean the stale files
labels: ["board-direct", "paperclip", "ops", "agy", "tex-37"]
links:
  spec: null
  ticket: TEX-37
  adr: null
  pr: null
files:
  - specs/content/efmp-302/reviews/unit-0{3,4,5}/G3/*AGY_CONVERSATION_ID* (deleted)
  - specs/content/licence/reviews/{TEX-15-review.md,heading-A/g3-review.md,heading-A/report.json} (deleted)
  - specs/content/efmp-302/tasks.md (note updated)
  - /home/a2ahs/org/textbook/roles/bilingualauthor-agy.md (new, outside repo)
  - /home/a2ahs/bin/paperclip-agy.sh (guard fix, outside repo)
  - history/prompts/general/0113-bilingualauthor-to-agy-clean-placeholders.general.prompt.md
tests:
  - check:pipeline-gate, check:no-em-dash, validate:content (exit 0)
---

## Prompt

switch BilingualAuthor to agy and clean the stale files

## Response snapshot

BilingualAuthor moved from opencode_local (LongCat-2.0, token quota exhausted) to the process adapter running /home/a2ahs/bin/paperclip-agy.sh with a new role file bilingualauthor-agy.md and model claude-opus-4-6-thinking. A Claude model was chosen so authoring stays a different model family from the Gemini Reviewer (ADR-0019 independence). Removed the placeholder-ID review artefacts from #103/#105 (EFMP-302 U3-5) and the Licence TEX-15/heading-A reviews, which tripped the wrapper's guard whenever a checkout touched them; they remain in git history at de375e01. Hardened the wrapper guard to flag only placeholder files created or changed during the run (pre-run hash snapshot), not mtime alone. Found the shared checkout switched to agent/tex-41 with a stray PHR commit on local main; restored main to origin/main and kept the commit on backup/local-main-e92d6389 (the PHR is also on agent/tex-41).

## Outcome

- BilingualAuthor and Reviewer can run again; the stale-file false positive is closed both ways.

## Handoff (for CEO and agents)

- Shipped / changed: agent adapter switch; artefact removal PR; wrapper guard fix.
- Decisions the team must respect: BilingualAuthor stays on a Claude model under agy (never Gemini) to keep G3/G5 independence. Agents never checkout or commit in the shared checkout; use worktrees.
- Pending / next owner: owner merges this PR. BilingualAuthor applies second-round intake repairs on TEX-39..44; board re-runs intake.
- Paperclip issues affected: TEX-37, TEX-39..45.
