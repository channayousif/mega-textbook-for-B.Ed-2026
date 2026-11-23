# Tasks: Feature 032

## Phase A
- [x] T001 Static-figure rules from animated-diagrams-skill (PR #723).
- [x] T002 `textbook-visuals` router skill; spec; decision entry.
- [x] T003 Install animated-diagrams-skill (pinned 3de812d) and its runtime outside the repo; read setup.sh first (not run: ARM64 host, Playwright Chromium via HYPERFRAMES_BROWSER_PATH; telemetry off).
- [x] T004 `animated-figures` skill and `scripts/media/animate-figure.mjs` (region beats, EN/UR captions, mirrored and scaled Urdu regions, 16x9 and 9x16).
- [x] T004b Kaggle render route `scripts/media/kaggle-animate.mjs` + `scripts/media/kaggle/render_animations.py` (owner, 2026-11-23: "can we move renders to kaggle?"): private dataset, private CPU kernel, verified fetch; ~80 s per 39 s video vs 15+ min on the host.
- [ ] T005 Media Studio kind `video.animation`; Study Studio manifest kind `animation`; tests.
- [ ] T006 Pilot renders: EFMP-301 U4 fig-U4-3 rendered EN/UR x 16x9/9x16 on Kaggle (done); fig-U4-1/5 beats; upload private; owner review.
- [ ] T007 Site: `figureAnimations` index, `Figure.tsx` "Watch it animate" facade, Study Studio listing, e2e.

## Phase B
- [ ] T010 `studio-slides` (frontend-slides adapted to the brand, EN and UR), pptx export, Slides tab; EFMP-301 U4 deck.

## Phase C
- [ ] T020 `<Flashcards>`, `<SelfCheck>`, `<Chart>` (data-driven, print fallback, tests); pilots EFMP-301 U4 and one GQUR-301 unit.

## Phase D
- [ ] T030 Crew stage `refresh_figures` (planner rules, brief, tests); pilot unit before and after; `crew refresh on`.
