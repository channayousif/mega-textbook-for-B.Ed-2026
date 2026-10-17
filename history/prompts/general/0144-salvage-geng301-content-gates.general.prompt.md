---
id: 0144
title: Salvage GENG-301 content gates
stage: general
date: 2026-10-17
surface: agent
model: GPT-6 Codex
feature: GENG-301
branch: crew/geng-301-u00-salvage
user: board
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "geng-301", "salvage"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: TEX-42
  adr: null
  pr: https://github.com/a2ahs/mega_book_for_B.Ed/pull/122
files:
  - specs/content/geng-301/sources/unit-01.md through unit-06.md
  - specs/content/geng-301/tasks.md
  - specs/content/geng-301/reviews/
  - history/prompts/general/0144-salvage-geng301-content-gates.general.prompt.md
tests:
  - npm run check:content (branch and origin/main baseline)
  - npm run check:source-floor
  - node scripts/prepare-gate-evidence.mjs GENG-301 1 through 6
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Rebased the existing course work onto origin/main, preserving both sides of glossary and decision entries. Added verified open-access chapter bindings for every unit and regenerated deterministic G2 evidence with current tracker references. No review certification or publication changes.

## Outcome

- ✅ Impact: Recovered the existing six-unit course branch and repaired deterministic gate findings.
- 🧪 Tests: Content gates and baseline comparison recorded after final validation.
- 📁 Files: Six source ledgers, G2 evidence and tracker references, and this PHR.
- 🔁 Next prompts: Independent G3 review remains a separate owner-managed task.
- 🧠 Reflection: Historical G2 JSON used obsolete paths and schema; regenerate with the repository evidence tool.

## Handoff (for CEO and agents)

- Shipped / changed: Rebase and deterministic content gate repairs for GENG-301.
- Decisions the team must respect: Preserve main shared entries; do not change approved specification, G3/G5 status or publication state.
- Pending / next owner: Independent review remains with the curriculum owner; baseline failures outside this course remain with their respective jobs.
- Paperclip issues affected: TEX-42; historical PR #122.

## Evaluation notes (flywheel)

- Failure modes observed: Missing evidence paths, obsolete G2 schema, absent registry-verified source bindings; full baseline checkout exhausted available disk, so used a sparse checkout with hard-linked unchanged binary assets.
- Graders run and results (PASS/FAIL): Pending final run; updated before completion.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Use the current evidence generator for future G2 refreshes.
