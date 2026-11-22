---
id: crew-guhq-301-u02-translate
title: crew translate GUHQ-301 unit 2
stage: misc
date: 2026-11-22
surface: agent
model: gemini-3.8-flash
feature: guhq-301
branch: crew/guhq-301-u02-translate
user: crew
command: crew translate
labels: ["crew", "antigravity", "translate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/guhq-301/crew-guhq-301-u02-translate.green.prompt.md
  - history/prompts/guhq-301/crew-guhq-301-u02-translate.misc.prompt.md
  - specs/content/guhq-301/reviews/unit-02/G4/check-content-parity.txt
  - specs/content/guhq-301/reviews/unit-02/G4/translation-handoff.md
  - specs/content/guhq-301/tasks.md
tests:
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/guhq-301/unit-02/fig-U2-*.ur.svg
  - npm run figures:variants:check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Relocated Unit 2 translation handoff and parity check logs from `specs/content/guhq-301/translations/unit-02/` to `specs/content/guhq-301/reviews/unit-02/G4/translation-handoff.md` and `check-content-parity.txt` (following the established repo convention in C3 of 2026-11-03 intelligence digest and EFMP-406/EFMP-407/GICP-400), updated the G4 row reference in `specs/content/guhq-301/tasks.md`, and restored English G2 draft gate evidence integrity without invalidating stored manifests. All 14 content gates pass cleanly.

## Outcome

- Impact: Resolved G2 stale input manifest finding for GUHQ-301 Unit 2 while preserving complete G4 Urdu translation mirror.
- Tests: `npm run check:content` passed (14/14); `scripts/heavy.sh node scripts/measure-figure-text.mjs` passed on all eight `.ur.svg` figures; `npm run figures:variants:check` clean.
- Files: 5 files modified/renamed/added.
- Next prompts: Independent G5 review of GUHQ-301 Unit 2 Urdu mirror.

## Handoff (for CEO and agents)

- Shipped / changed: Moved translation handoff and parity logs to `specs/content/guhq-301/reviews/unit-02/G4/translation-handoff.md` and `check-content-parity.txt`, leaving `specs/content/guhq-301/` free of unbound translation lifecycle files and restoring G2 en-draft gate manifest match. Updated G4 row in `specs/content/guhq-301/tasks.md`.
- Decisions: Preserves the canonical structure where review and translation handoffs live under `reviews/unit-NN/` to avoid polluting unit-bound English review manifests.
- Pending: Independent G5 review of GUHQ-301 Unit 2 Urdu mirror and authored concept labels.
- Issues: GUHQ-301 Unit 2.
