---
id: 0888
title: Resolve CI failures and planner conflict
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/lead-g3-rereview, feature/video-studio, crew/batch-20261027-0132
user: M Yousif Channa
command: (board-direct) check status, resolve CI failures and the planner.mjs merge conflict
labels: ["board-direct", "ci", "crew", "figures", "merge-conflict"]
links:
  spec: null
  ticket: null
  adr: null
  pr: "#334, #336, #342"
files:
 - scripts/crew/planner.mjs (#334 merge resolution)
 - tests/crew/planner.test.mjs (#334)
 - tests/unit/rls-fixture-isolation.test.mjs (#336)
 - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.svg (+ .ur.dark.svg) (#342)
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.svg (+ .ur.dark.svg) (#342)
 - static/img/figures/gnas-301/unit-06/fig-U6-1.ur.svg (+ .ur.dark.svg) (#342)
 - static/img/figures/gnas-301/unit-06/fig-U6-7.ur.svg (+ .ur.dark.svg) (#342)
 - static/content-status.json (#342)
tests:
 - npm run test:crew on the #334 merge (70 pass)
 - npx vitest run tests/unit/rls-fixture-isolation.test.mjs on #336 (6 pass)
 - node scripts/measure-figure-text.mjs --changed origin/main on #342, with and without the host's Noto Nastaliq font (clean)
 - npm run check:content on #342 (13/13 pass)
---

## Prompt

check status, resolve the  ci failures and merge conflict in scripts/crew/planner.mjs

## Response snapshot

Three open PRs were blocked.

- **#334** (crew/lead-g3-rereview) conflicted with main's W43 M2 change in `scripts/crew/planner.mjs`. I merged main and kept both changes.
  - Main's `unrepairedRevise` holds translation behind an unrepaired revise.
  - This branch's `reReviewDue` re-reviews a repaired revise or escalate with a cycle left.
  - Main's planner test expected `['translate']` for a repaired first-cycle revise. Under #334 the correct answer is `['review_en', 'translate']`, so I updated the expectation and added the used-up-cycles case.
- **#336** (feature/video-studio) failed `build`. `tests/unit/rls-fixture-isolation.test.mjs` pinned the old CI line `then echo "app=true"`, and #336 legitimately changed it to `then { echo "app=true"; echo "video=true"; }`. The regex now accepts both forms and still asserts that a push to main sets `app=true`.
- **#342** (crew batch) failed `figure-geometry` with 12 problems in 4 Urdu figures, light and dark.
  - Cause: CI has no Noto Nastaliq Urdu, so it measures a fallback font, while this host has the font in `~/.local/share/fonts`. Hiding the user font through `FONTCONFIG_FILE` reproduced CI exactly.
  - Fixes:
    - fig-U4-3: the panel is taller.
    - fig-U6-2: the footnote sits below the last row.
    - fig-U6-1: the bottom panels are taller and the caption moved down.
    - fig-U6-7: the short-wave label moved beside its arrow.
  - The dark variants were regenerated, and the figures now measure clean under both font sets.
  - `static/content-status.json` was stale (tracker hashes only), so I refreshed it.

## Outcome

- ✅ Impact: the conflict on #334 is resolved; the known CI failures on #336 and #342 are fixed and their CI is re-running.
- 🧪 Tests: listed above.
- 📁 Files: listed above.
- 🔁 Next prompts: watch CI on all three; the owner merges #334 and #336 (#342 auto-merges when green).
- 🧠 Reflection: the authoring host and CI measure Urdu figures with different fonts. A figure that fits by under 6px on the host can fail in CI. Measuring locally with the user font hidden predicts CI.

## Handoff (for CEO and agents)

- Shipped / changed: the three fixes above, pushed to the PR branches. No PR was merged.
- Decisions the team must respect:
  - A repaired first-cycle G3 revise plans `review_en` and `translate` together (#334 plus W43 M2).
  - Before pushing an Urdu SVG, measure it with `FONTCONFIG_FILE` pointing at a config without `~/.local/share/fonts`. CI has no Nastaliq font.
- Pending / next owner:
  - **Owner:** EFMP-303 U6 fig-U6-2 and EFMP-301 U4 fig-U4-3 (Urdu) are visibly broken on main: labels sit outside empty boxes, and arrows run over text. The measurer passes them. They need a redraw by the crew or Codex.
  - **Owner:** #336 takes ADR-0031 (video studio). The unpushed G3 sign-off desk branch also drafted an ADR-0031, so the desk's ADR must be renumbered to 0032 before it is pushed.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed:
  - The crew's fix jobs measured figures with the host font and reported "all fixed", but CI disagreed.
  - A test pinned the exact text of a workflow line.
- Graders run and results (PASS/FAIL): test:crew PASS, vitest PASS, measure-figure-text PASS (both fonts), check:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): make `measure-figure-text.mjs` or the crew figure brief run with the CI font set by default.
