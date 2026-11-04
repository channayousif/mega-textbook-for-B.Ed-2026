---
id: 2448
title: Landing copy facts confirmed and design canvas created
stage: general
date: 2026-11-04
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/reader-shared-width
user: M Yousif Channa
command: none
labels: [board-direct, ui, ux, redesign]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/440
files:
  - history/prompts/general/2448-landing-copy-facts-and-design-canvas.general.prompt.md
tests:
  - none
---

## Prompt

1. aLL, 2. yes, 3. yes, 4. yes. i am also curriculum expert, i have designed its structure

## Response snapshot

Recorded the owner's answers and built a private design canvas with the landing page in English and Urdu, returning-visitor phone screens, the reader and logo and type options. No site code changed.

## Outcome

- ✅ Impact: landing copy can now state the confirmed facts; the redesign direction can be reviewed on real content.
- 🧪 Tests: none; design mockups only, and they were not render-checked.
- 📁 Files: this PHR. The canvas is a private artifact outside the repo.
- 🔁 Next prompts: owner picks a logo and heading font and reviews the Urdu wording.
- 🧠 Reflection: one template for both languages keeps structure in step, while Urdu keeps its own wording.

## Handoff (for CEO and agents)

- Shipped / changed: private canvas https://claude.ai/artifact/5c4Ly6H9pyUsKCHQnr4L7J. Nothing in the site changed.
- Decisions the team must respect (owner, 2026-11-04): all footer organisations work with the project (label them "Working with", not "endorsed by"); reviewer applications are public; the site may say it follows the official scheme and HEC course guides; signed-in accounts are free today; the About page's "curriculum experts" sentence stands, because the owner is a curriculum expert who designed the structure. Say "free to read today", not "free forever". Unit review claims must still match the provisional notice.
- Pending / next owner: owner to choose logo and heading font and approve landing copy, including the draft Urdu. Then PR 1 (tokens and fonts).
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): none run.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): test Nastaliq gradient clipping in a real browser before PR 4a.
