---
id: 0869
title: One rulebook, stall alerts, resume block
stage: general
date: 2026-10-24
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-context-and-resume
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "agents-md", "ops"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - AGENTS.md
 - CLAUDE.md
 - .specify/memory/agent-reference.md
 - .specify/scripts/bash/update-agent-context.sh
 - .claude/skills/crew-lead/SKILL.md
 - .claude/skills/intel-distill/SKILL.md
 - .claude/skills/weekly-maintenance/SKILL.md
 - .claude/skills/weekly-maintenance/references/survey-checklist.md
 - scripts/heavy.sh
 - scripts/deploy-prod.sh
 - scripts/crew/crew.mjs
 - scripts/crew/stall.mjs
 - scripts/crew/resume.mjs
 - tests/crew/stall.test.mjs
 - tests/crew/resume.test.mjs
 - ops/crew/README.md
 - history/prompts/general/0865-check-crew-status-and-open-prs.general.prompt.md
 - history/prompts/general/0866-clean-worktrees-rerun-pr-317.general.prompt.md
 - history/prompts/general/0867-stop-gqur301-u7-translate-repair-first.general.prompt.md
 - history/prompts/general/0868-evaluate-agent-phase-kit-applicability.general.prompt.md
 - history/prompts/general/0869-one-rulebook-stall-alerts-resume-block.general.prompt.md
tests:
 - node --test tests/crew/*.test.mjs (59 pass; 1 fail in workers.test.mjs, also failing on origin/main, not in CI)
 - npm run check:docs-sync (pass)
 - npm run check:no-em-dash (pass)
 - crew status and tick --dry-run against a copy of the live crew state
---

## Prompt

1, 2, 3, and evaluate the feasibility of one consolidated pr per task.

## Response snapshot

1. AGENTS.md is now the one rulebook (202 lines) holding every binding rule from both files (host limits, review delegation, visual roles with ADR-0029, strict PHR rule, ADR consent, default policies, Antigravity). CLAUDE.md is the single line `@AGENTS.md` (Claude Code docs: CLAUDE.md imports files with @path; with both files present Claude reads only CLAUDE.md, so the import is what guarantees AGENTS.md loads). Non-rule material (full PHR procedure, architect template, Active Technologies / Recent Changes) moved verbatim to `.specify/memory/agent-reference.md`; `update-agent-context.sh` now appends there. Mandatory rule text per session falls from 440 to 202 lines (constitution unchanged). Crew briefs say "Read AGENTS.md first"; pointers in skills, heavy.sh and deploy-prod.sh updated.
2. Correction to 0865/0868: the disk alert did reach the owner every 6 h. The real gap was that the board, status and digest never showed the hold or its length, and the memory floor never alerted. New `scripts/crew/stall.mjs` tracks one `control.launchStall` for both floors: alert at once for disk, after 60 min for memory, repeat every 6 h, "launches resumed" when it ends; shown in status, digest and the board.
3. New `scripts/crew/resume.mjs` renders a "Resume here" block at the top of BOARD.md: launches flowing/held/paused, needs the owner (open decisions, held jobs with the release command, G3 count), needs the lead (red jobs), running, PRs waiting, next five launches in real launch order (`queueOrder`, extracted from launchQueued).

Feasibility of one consolidated PR per task: for board-direct work, yes, and it is already the rule (PHR in the same PR); this PR carries the three tasks plus the four earlier PHRs of this session, renumbered 0865-0868 because 0546-0548 were taken on main. Splitting these three tasks would give three protected-path PRs that each conflict on crew.mjs and each queue a full serialised CI run. For crew jobs, no: one PR per job was the setup until 2026-10-19 and was replaced by hourly batch PRs because every merge queued a full CI run (rls and e2e share one Supabase and run one at a time) and production deploys never caught up; a job's PHR already rides in its own commits inside the batch.

## Outcome

- Impact: workers load about half the rule text; launch holds are visible everywhere; one resume block for lead and owner.
- Tests: as listed.
- Files: as listed.
- Next prompts: owner merges the PR (protected paths); after merge the crew control checkout picks it up on the next tick.
- Reflection: check alerts in code before calling a stall silent.

## Handoff (for CEO and agents)

- Shipped: PR on branch ops/crew-context-and-resume (owner merge).
- Decisions to respect: rules live only in AGENTS.md; never add rules to CLAUDE.md; reference material goes to `.specify/memory/agent-reference.md`. Crew stays on hourly batch PRs.
- Pending: owner merge; PR #317 rls is red on a different test each run (shared-Supabase flakiness), cifix2 running; gqur-301-u07-repair_en is ready for the next batch, after which the owner or lead releases gqur-301-u07-translate.
- Affected: crew briefs, BOARD.md, digest, every agent's instruction load.

## Evaluation notes (flywheel)

- Failure modes observed: an earlier claim (no alert) was wrong until the code was read.
- Graders run and results (PASS/FAIL): crew tests 59/60 (pre-existing failure), docs-sync PASS, no-em-dash PASS.
- Prompt variant (if applicable): n/a
- Next experiment: measure worker token use per job before and after the AGENTS.md change.
