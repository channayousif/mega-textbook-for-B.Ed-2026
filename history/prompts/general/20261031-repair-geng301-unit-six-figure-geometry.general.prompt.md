---
id: 20261031
title: Repair GENG Unit Six Figure Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: none
branch: crew/geng-301-u06-fix
user: owner
command: Read .crew/brief.md
labels: ["codex", "figure-geometry"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/geng-301/unit-06/*.svg
  - static/content-status.json
  - specs/content/geng-301/tasks.md
  - specs/content/geng-301/reviews/unit-06/G2/
tests:
  - Chromium text geometry: all eight sources pass
  - figures:variants
  - check:content (repeat after refreshing G2)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired wordmark alignment on all eight figures, cleared figure 5 cosmetic collision, and regenerated dark variants. Refresh G2 after committing; keep G3 open and explicitly stale.

## Outcome

- ✅ Impact: Figure text fits the existing canvas without changing labels or prose.
- 🧪 Tests: All eight SVG sources pass text geometry. Content checks initially reported stale Unit 6 G2; evidence refresh passed all eight draft gates. Tracker edits required regenerating content-status.json. Baseline origin/main passes all 13 content gates.
- 📁 Files: Eight light sources, eight derived dark variants, G2 evidence and tracker.
- 🔁 Next prompts: Fresh independent G3 review after outstanding author and evidence work.
- 🧠 Reflection: A shared text selector overrode the wordmark presentation attribute.

## Handoff (for CEO and agents)

- Shipped / changed: Scoped CSS wordmark fix and regenerated variants; G2 refreshed in follow-up commit.
- Decisions the team must respect: No wording, dimensions, prose, publication tier or review certification changes. Regenerate the content-status tracker digest after tracker edits.
- Pending / next owner: Independent reviewer owns fresh G3; existing author and provenance/render repairs remain outstanding.
- Paperclip issues affected: GENG-301 Unit 6; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Shared text-anchor CSS pushed all eight wordmarks beyond the canvas.
- Graders run and results (PASS/FAIL): Geometry PASS; variants regenerated; final content suite PASS (13/13) after regenerating the tracker digest.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No further experiment required.
