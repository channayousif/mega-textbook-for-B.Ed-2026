---
id: "0535"
title: "Crew weekly maintenance and intelligence"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: worktree-crew-weekly-maint-intel
user: M Yousif Channa
command: implement plan vivid-scribbling-sprout (weekly maintenance + reusable-intelligence extraction)
labels: ["board-direct", "crew", "maintenance", "intelligence", "sdd-ri"]
links:
  spec: specs/maintenance/README.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/intel.mjs
 - scripts/crew/maintenance.mjs
 - scripts/crew/maintjobs.mjs
 - scripts/crew/crew.mjs
 - scripts/crew/workers.mjs
 - tests/crew/intel.test.mjs
 - tests/crew/maintenance.test.mjs
 - tests/crew/maintjobs.test.mjs
 - .claude/skills/weekly-maintenance/SKILL.md
 - .claude/skills/weekly-maintenance/references/tasks-format.md
 - .claude/skills/weekly-maintenance/references/survey-checklist.md
 - .claude/skills/weekly-maintenance/references/adr-register.md
 - .claude/skills/intel-distill/SKILL.md
 - .claude/skills/intel-distill/references/candidate-format.md
 - .claude/skills/intel-distill/references/skill-authoring.md
 - .claude/skills/crew-lead/SKILL.md
 - ops/crew/README.md
 - specs/intelligence/registry.md
 - specs/maintenance/README.md
 - history/prompts/general/0535-crew-weekly-maintenance-and-intelligence.general.prompt.md
tests:
 - node --test tests/crew/*.test.mjs (46 pass, 22 new)
 - harvest of the live crew data on a copied state (CREW_STATE_DIR): 1132 signals, 683 clusters; top clusters are the week's real repeats
 - crew.mjs tick --dry-run, crew maintenance now|status, crew intel now|status on copied state; real board unchanged
 - npm run check:content (13/13)
---

## Prompt

i want to build a skill to refactor my project code, consolidate adrs, update readme/docs and other artifacts, with SDD-RI working claude, codex, opencode and agy as a crew. designed to run once a week.

(Then: "i want to add the extraction of reusable intelligence component. research for extraction/creattion of skills and other useful intelligence (eg. 12 hourly, daily or weekly extraction)"; owner choices: mega-book only, auto-merge safe areas, ADR index + hygiene readable in one place with links to each ADR, Sunday 02:00 PKT. Implemented in a fresh session: "Implement the plan in /home/a2ahs/.claude/plans/vivid-scribbling-sprout.md ... Work in a fresh worktree off origin/main, open a PR, and follow CLAUDE.md (PHR, no em dash, heavy jobs via flock).")

## Response snapshot

Built the crew's self-maintenance as new stages and tick phases, scheduled in Asia/Karachi time from
the 15-minute tick (no crontab change):

- Intelligence: a 12-hourly harvest (00/12 PKT, no model; scripts/crew/intel.mjs) turns new board
  failures, handoff notes, worker-log errors, cron.log errors, PHR reflections and G3/G5 findings into
  signals clustered by normalised signature (host state ~/.crew/<project>/intel/), announces a crew
  failure that turns hot; a daily intel_distill job (03 PKT, agy first) writes typed candidates to
  specs/intelligence/daily/<date>.md; the weekly survey promotes them; specs/intelligence/registry.md
  records adopted items and the harvest measures their effect ("worked/no change/worse").
- Weekly maintenance (Sunday 02 PKT): maint_survey writes specs/maintenance/<week>/ spec, plan,
  tasks (max 6), intelligence; each task row becomes maint_refactor / maint_docs / maint_adr /
  maint_skill with its own PR; a maint_review of another model family must pass
  (CREW-VERDICT); safe PRs auto-merge on green CI, protected ones (plus .claude/) ask the owner;
  self-maintenance diffs touching course content are rejected.
- Skills: weekly-maintenance (survey, code, docs, ADR decision register, skill, review) and
  intel-distill (+ skill-authoring checklist). Owner commands: crew maintenance now|skip|status,
  crew intel now|status. Rebased onto #280 (registry guard); both guards stay wired.

First live harvest (on a copy) found the week's real repeats at the top: 93 reap git-add errors,
74 check:content-status failures, 42 missing content-status.json, 28 left-out-of-batch failures,
21 rejected tool permissions. Registry effect: I-0005 (#281) "worked" (25 before, 3 after).

## Outcome

- Impact: the crew now refactors, documents, keeps the ADR register and learns from its own failures
  every week without a person starting it; lessons are measured after adoption.
- Tests: listed above.
- Files: listed above.
- Reflection: the first back-fill must not date undated cron.log lines as "now" (it made I-0001 look
  "worse"); the harvest now starts cron.log at its end and treats first-run hot clusters as baseline.

## Handoff (for CEO and agents)

- Shipped: weekly maintenance + intelligence pipeline (PR, owner merges; scripts/ and .claude/ are protected).
- Decisions to respect: maintenance never touches course content; maintenance PRs need a cross-family
  review pass and green CI, and protected paths (incl. .claude/) go to the owner; intelligence is
  promoted only through the weekly survey, never edited straight into skills or rules.
- Pending: owner merge; first scheduled survey Sunday 2026-10-25 02:00 PKT (or `crew maintenance now`);
  first harvest runs at the first tick after merge (baseline, no alerts). ADR suggestion offered to the owner.
- Paperclip issues affected: none.
