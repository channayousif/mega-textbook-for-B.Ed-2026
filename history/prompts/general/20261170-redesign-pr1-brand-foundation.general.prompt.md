---
id: 20261170
title: Redesign PR 1 brand foundation and worktree clean-up
stage: general
date: 2026-11-07
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/brand-v2
user: M Yousif Channa
command: none
labels: [board-direct, redesign, brand, ops]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/brand/ (kit v2 logos, icons, favicon, social card source)
  - static/img/social-card.png
  - static/site.webmanifest
  - static/favicon.ico
  - docusaurus.config.ts
  - src/css/tokens.css
  - src/css/custom.css
  - src/theme/Navbar/Logo/index.tsx
  - src/theme/NotFound/Content/index.tsx
  - src/theme/NotFound/Content/styles.module.css
  - src/components/landing/landing.module.css
  - src/components/CourseCatalog/index.tsx
tests:
  - npm run build
  - npm run check:all
---

## Prompt

check system performance, memory, storage and proces Status now,

ok good, delete the safer ones, now continue to redesign job

retry

raise the agents slice limit to 5G

raise the parent slice too

Change the video mark, continue merge  PR 1 2 3, move to next

## Response snapshot

Status: load about 0.6 on 2 CPUs, 8.4 GB memory available, memory and I/O pressure near 0, root disk 78% used. Removed 15 git worktrees under ~/wt-* whose trees were clean, fully pushed and whose PRs had merged (46 GB freed, disk now 56%); kept wt-hec and wt-urdu-badge, which hold uncommitted work with no PR. Took "continue" as sign-off on the v2 boards and opened redesign PR 1: logo kit v2 assets (em dashes and editor metadata stripped), favicons, install manifest, theme colour, a new social card, the teal ramp with measured contrast for light, dark and print, and the remaining hardcoded v1 colours on landing and catalogue.

## Outcome

- ✅ Impact: the site wears kit v2 colours and logo; first of nine redesign PRs.
- 🧪 Tests: npm run build PASS (427 s); npm run check:all 20/20 PASS; screenshots of landing EN and UR, 404 and catalogue at 1440 and 360px, light and dark, checked by eye.
- 📁 Files: brand assets, tokens, ramps, navbar logo, 404 mark, head tags.
- 🔁 Next prompts: PR 2 icons, patterns, motion and ui primitives; PR 3 landing.
- 🧠 Reflection: the v2 horizontal logo needs 48px height to reach the kit's 240px minimum width, taller than the v1 wordmark.

## Handoff (for CEO and agents)

- Shipped / changed: kit v2 logo in the navbar (horizontal in both locales), 404 mark, favicons at static/img/brand/, /site.webmanifest, theme-color #123E43, social card. Light primary #1B5A60 (white text 7.84:1), dark ground #0E2A2E with pale teal primary #A6DFDC (10.23:1). --brand-ink/jade/mint now alias the v2 values.
- Decisions the team must respect: amber #E5A333 is never text on a light ground; use --brand-amber-text #8A5A0B. The owner changed the video mark on 2026-11-08: video-studio/brand/brand-bible.yaml now uses static/img/brand/favicon.svg as the mark and static/img/brand/horizontal-color.svg as the full logo (its old static/img/logo.svg target no longer existed), and the v1 static/img/favicon.svg is removed. figure-palette.mjs is untouched. Kit v2 has no Urdu-first logo, so Urdu pages show the horizontal logo until PR 4 adds the bilingual header logo that shrinks on scroll (owner ruling 2026-11-06).
- Host ops (2026-11-08): local builds took 7 to 13 hours because development-agents.slice had MemoryHigh=3G and a build needs about 2.9 GB, so the kernel throttled the slice (memory pressure about 90%) with memory free. On the owner's instruction the slice is now MemoryHigh=5G, MemoryMax=6G, in ~/.config/systemd/user/ and the untracked ops/development/systemd/ copy in the main checkout. The parent development.slice was then raised from 5G high, 6G max to 7G high, 8G max, so agents (5G) and editor (2.5G) fit together under the user slice cap (8G high, 9G max).
- Pending / next owner: owner review and merge (merging deploys live; PRs 1 to 5 should merge close together). Trademark check of the kit is the owner's call.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none yet.
- Graders run and results (PASS/FAIL): see PR checks.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
