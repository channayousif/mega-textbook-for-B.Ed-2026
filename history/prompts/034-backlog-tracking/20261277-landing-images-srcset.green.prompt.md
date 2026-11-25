---
id: 20261277
title: Landing images srcset and lazy logo variants
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-landing-images
user: M Yousif Channa
command: continue to next issue (#802)
labels: [board-direct, landing, performance]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#802"
  adr: null
  pr: null
files:
  - src/pages/index.tsx
  - src/theme/Navbar/Logo/index.tsx
  - static/img/site/*-640w.webp (15 new files)
  - specs/034-backlog-tracking/tasks.md
tests:
  - Playwright weight measurement on production (390x844, DPR 3)
  - CI build and e2e on the PR
---

## Prompt

merge on green, close the issues when done. continue to next issue

## Response snapshot

Measured the production landing page on a phone: at load it fetched 2.0 MB of JavaScript, 292 KB of
fonts and 141 KB of images; LCP was the H1 at 820 ms, so images are not the bottleneck. Added a
640 px WebP copy of each landing picture wider than 640 px (new paths, originals unchanged; 17-55%
smaller, hero 28 KB to 15 KB) and served them with srcset and per-use sizes (hero, audience stack,
gallery). Marked the four navbar logo images lazy so only the visible one of tall/short x
light/dark downloads (about 28 KB saved on every page). Width and height were already set; the hero
keeps fetchpriority high, so no separate preload.

## Outcome

- ✅ Impact: phones at up to 2x density fetch roughly half the image bytes; every page drops three hidden logo downloads.
- 🧪 Tests: before numbers recorded above; CI build and e2e.
- 📁 Files: see list above.
- 🔁 Next prompts: #803 carousels. A separate issue is worth opening for the 2 MB JavaScript and the Urdu font weight on the English landing page.
- 🧠 Reflection: measure before optimising: the image pass is worth doing but small next to the script bundle.

## Handoff (for CEO and agents)

- Shipped / changed: #802 (the PR closes it).
- Decisions the team must respect: landing pictures carry a `-640w.webp` sibling; a new landing picture needs one too (Scene builds the srcset from the name).
- Pending / next owner: after deploy, re-run a mobile Lighthouse on `/` and compare with the numbers above.
- Paperclip issues affected: none; GitHub #802.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): tsc clean for changed files
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): code-split the landing page bundle.
