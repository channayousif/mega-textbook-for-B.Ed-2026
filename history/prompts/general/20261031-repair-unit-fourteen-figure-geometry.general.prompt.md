---
id: 20261031
title: Repair Unit Fourteen Figure Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: none
branch: crew/gqur-301-u14-fix
user: owner
command: crew brief
labels: ["codex", "gqur-301-u14-fix"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gqur-301/unit-14/fig-U14-2.svg
  - static/img/figures/gqur-301/unit-14/fig-U14-2.dark.svg
  - static/img/figures/gqur-301/unit-14/fig-U14-4.svg
  - static/img/figures/gqur-301/unit-14/fig-U14-4.dark.svg
  - static/img/figures/gqur-301/unit-14/fig-U14-4.ur.svg
  - static/img/figures/gqur-301/unit-14/fig-U14-4.ur.dark.svg
  - docs/semester-2/gqur-301/unit-14/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-02.mdx
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-14/G2/
tests:
  - Figure text measurement: PASS, all eight light sources
  - Dark figure variants regenerated
  - Content gates and G2 evidence: see final validation update
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Fixed four geometry failures with spacing, wrapping and extra wordmark clearance; matched both Figure carriers to the new 500px height. Preserve wording and existing review status.

## Outcome

- ✅ Impact: Four blocking geometry defects repaired.
- 🧪 Tests: All eight light SVGs measure successfully. One existing cosmetic Urdu panel collision remains advisory.
- 📁 Files: Three light sources, three generated dark variants, two Figure carriers, tracker and G2 evidence.
- 🔁 Next prompts: Fresh independent G3 after separate academic repairs.
- 🧠 Reflection: Measure font bounds instead of assuming baseline clearance.

## Handoff (for CEO and agents)

- Shipped / changed: Geometry repair and regenerated variants; G2 evidence refresh follows the repair commit.
- Decisions the team must respect: No prose, values, wording, translation status or certification changes.
- Pending / next owner: Independent reviewer owns fresh G3; content author owns remaining academic findings.
- Paperclip issues affected: GQUR-301 Unit 14; ticket not supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Subtitle overflow, annotation spill and Urdu wordmark overlap.
- Graders run and results (PASS/FAIL): Geometry PASS; final content and evidence results recorded below.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Review remaining academic findings in a separate authorised task.
