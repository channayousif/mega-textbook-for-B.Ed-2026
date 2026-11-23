# Tasks: Feature 032

## Phase A
- [x] T001 Static-figure rules from animated-diagrams-skill (PR #723).
- [x] T002 `textbook-visuals` router skill; spec; decision entry.
- [x] T003 Install animated-diagrams-skill (pinned 3de812d) and its runtime outside the repo; read setup.sh first (not run: ARM64 host, Playwright Chromium via HYPERFRAMES_BROWSER_PATH; telemetry off).
- [x] T004 `animated-figures` skill and `scripts/media/animate-figure.mjs` (region beats, EN/UR captions, mirrored and scaled Urdu regions, 16x9 and 9x16).
- [x] T004b Kaggle render route `scripts/media/kaggle-animate.mjs` + `scripts/media/kaggle/render_animations.py` (owner, 2026-11-23: "can we move renders to kaggle?"): private dataset, private CPU kernel, verified fetch; ~80 s per 39 s video vs 15+ min on the host.
- [x] T005 Ledger is `specs/studio/animations/placed.json` (a Media Studio kind was not needed); Study Studio panel lists a topic's public animations in an "Animations" tab (`addAnimations` in build-studio-index); tests.
- [x] T006 Pilot renders: EFMP-301 U4 fig-U4-3 EN/UR x 16x9/9x16 with colours and icons; owner approved the look 2026-11-23. fig-U4-1 (EN only: its published .ur.svg has unmirrored polygons) and fig-U4-5 (EN/UR) rendered in batch 2.
- [x] T007a Site: `specs/studio/animations/placed.json` ledger, `figureAnimations` customField, `Figure.tsx` "Watch it animate" button + 16:9 dialog (only public/unlisted entries show).
- [x] T007b Owner made all ten videos public (2026-11-23); ledger `status: public`; Study Studio listing; e2e `tests/e2e/figure-animation.spec.ts`.
- [ ] T008 Urdu figure defect: 22 `.ur.svg` files keep the English polygon coordinates (EFMP-301 fig-U4-1 visually confirmed broken); fix needs owner approval where it re-opens G3 evidence.

## Phase B
- [ ] T010 `studio-slides` (frontend-slides adapted to the brand, EN and UR), pptx export, Slides tab; EFMP-301 U4 deck.

## Phase C
- [x] T020a Self-check (owner, 2026-11-23: "Terms + server marking"): migration 0055 (self_check_items, self_check_attempts, self_check_questions(), check_self_quiz() with a daily cap), importer scripts/quiz/import-assessment-mcq.mjs (all 259 pages: 140 units EN, 119 UR; 2,590 items live), <SelfCheck> on assessment pages, RLS + unit + e2e tests. Done 2026-11-23.
- [x] T020b Flashcards: decks built from the reviewed glossary (ranked per topic, own-course terms via specs/studio/glossary-origin.json) for 61 units; crew stage `flashcards` (`crew flashcards on`) authors decks in specs/studio/flashcards/ for the other 79 (flashcards-needed.json), outside every review manifest (glossary.json is review-bound); <Flashcards> tab in the Study Studio panel; tests.
- [ ] T020 `<Flashcards>`, `<SelfCheck>`, `<Chart>` (data-driven, print fallback, tests); pilots EFMP-301 U4 and one GQUR-301 unit.

## Phase D
- [ ] T030 Crew stage `refresh_figures` (planner rules, brief, tests); pilot unit before and after; `crew refresh on`.
