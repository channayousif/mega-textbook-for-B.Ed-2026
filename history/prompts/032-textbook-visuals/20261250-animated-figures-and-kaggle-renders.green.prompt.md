---
id: 20261250
title: Animated figures pipeline and Kaggle render route (Feature 032 Phase A)
stage: green
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: 032-textbook-visuals
branch: feat/032-textbook-visuals
user: M Yousif Channa
command: continue Phase A; can we move renders to kaggle?
labels: [board-direct, figures, media, kaggle]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/725
files:
  - scripts/media/animate-figure.mjs
  - scripts/media/kaggle-animate.mjs
  - scripts/media/kaggle/render_animations.py
  - .claude/skills/animated-figures/SKILL.md
  - specs/studio/animations/efmp-301/fig-U4-3.json
  - tests/unit/animate-figure.test.mjs
  - specs/032-textbook-visuals/tasks.md
tests:
  - npx vitest run tests/unit/animate-figure.test.mjs (7 passed)
  - npm run check:no-media
  - node scripts/check-docs-sync.mjs
---

## Prompt

can we move renders to kaggle?

(continuing the approved Feature 032 plan, Phase A: install the animation tool, build the
animated-figure pipeline, pilot EFMP-301 Unit 4)

## Response snapshot

- Installed omkamal/animated-diagrams-skill pinned at 3de812d in ~/.local/share/animated-diagrams
  (outside the repo); read setup.sh but did not run it (ARM64: no HyperFrames Chrome, so
  HYPERFRAMES_BROWSER_PATH points at Playwright's Chromium); HyperFrames telemetry disabled.
- `animate-figure.mjs` inlines a placed figure (never edits it) and reveals it beat by beat from
  regions in a beats file, with EN/UR captions; Urdu regions are mirrored and scaled to the
  enlarged `.ur.svg`; 16x9 and 9x16.
- Bugs found in renders and fixed: an inherited `dir="rtl"` flipped every SVG text anchor (figure
  pinned to `direction: ltr`); stripping the root `<svg>` dropped the figure's font stack (serif
  on Kaggle); timeline ran 0.3 s past the stated duration (blank last frame).
- Kaggle route (VS-ADR-0011 pattern): hashed private dataset, private CPU kernel (no GPU quota),
  verified fetch that also refuses output from an older dataset version. Urdu compositions carry
  the site's Nastaliq woff2. Pilot fig-U4-3 EN/UR x 16x9/9x16: 4 videos, ~78 s each, kernel
  wall 515 s, versus a 15-minute local render that timed out.

## Outcome

- ✅ Impact: animated figures render off the production host, in both languages.
- 🧪 Tests: 7 unit tests pass; no-media and docs-sync pass.
- 📁 Files: see front matter. Videos stay in ~/studio-media/animations/ (not in git).
- 🔁 Next prompts: owner reviews the pilot videos; beats for fig-U4-1 and fig-U4-5; Media Studio
  `video.animation`; private upload; "Watch it animate" button.
- 🧠 Reflection: contact sheets caught three defects that unit tests and a local render hid; the
  render host's default fonts masked a dropped font stack.

## Handoff (for CEO and agents)

- Shipped / changed: animated-figure builder, Kaggle runner and kernel, animated-figures skill,
  pilot beats file, tests.
- Decisions the team must respect: D-2026-0097; animated figures render on Kaggle by default;
  the placed figure is never edited; captions only restate the unit; private first.
- Pending / next owner: owner: review the pilot videos. Claude: T005 to T007.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: RTL inheritance into inline SVG; dropped root attributes when inlining;
  a cold far seek stalled a hand-written Playwright capture (HyperFrames' own snapshot works).
- Graders run and results (PASS/FAIL): vitest PASS; no-media PASS; docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): batch a whole unit's figures in one Kaggle job.
