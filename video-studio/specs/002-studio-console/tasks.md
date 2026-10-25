# Tasks - VS-002 Studio Console

Build order across features (see README): 001 Phase 0–2 → **002 Phase A–B** → 001 Phase 3–5
(each 001 task now also gets its Studio screen) → 002 Phase C–D → 001 Phase 6–7.

## Phase A - Server skeleton
- [ ] S001 `studio/server/index.ts`: Hono on 127.0.0.1:4310; `/api/health`; serves `studio/web/dist`.
- [ ] S002 Reuse `scripts/lib` (episode IO, schema, brand) - move shared code there if needed; no duplication.
- [ ] S003 Board, topics, episode GET routes; gate POST with 001 state-machine rules (unit-tested transitions incl. illegal ones).
- [ ] S004 Watcher + SSE `/api/events`.
- [ ] S005 Provider types + `manual` voice/video/image/publish providers (`describe` + `accept`), `config/providers.yaml` loader; API providers as stubs returning `disabled: "subscriptions-only (constitution V)"`.
- [ ] S006 (+ PI006 security tests) Upload pipeline: temp → sniff → size cap → generated name → normalise via 001 ingest functions → result with checks.
⏸ CHECKPOINT A - curl demo: create episode, upload one WAV, see normalised file + SSE event.

## Phase B - Web shell + Script stage
- [ ] S010 Vite React app, router, brand tokens, Noto Nastaliq loaded, `<UrduText>` component (RTL, line-height).
- [ ] S011 Home board + topic picker with source panel.
- [ ] S012 Episode view: stepper, StageShell (instruction box, checklist, done-when, lock reason), GateBar.
- [ ] S013 Script stage: RTL inline editor, duration meter, reviewer badges per line, excerpt panel, schema-validated save.
- [ ] S014 Jobs UI: JobLog drawer; `claude-cli` runner behind `providers.yaml claude_cli.enabled` with copy-command fallback.
⏸ CHECKPOINT B - draft, edit and approve a real script entirely in the Studio.

## Phase C - Voices, Visuals, Preview
- [ ] S020 Voices stage: per-line AudioCards driven by the active voice provider (copy fields, Open <tool> link if any, DropZone, waveform, checks, replace, pronunciation flag → lexicon suggestion file).
- [ ] S021 Visuals stage: ShotCards (prompt copy, settings checklist, refs download, Open Flow/Gemini/ChatGPT, takes, credits, swap-to-diagram).
- [ ] S022 Preview stage: `@remotion/player` with `UrduShort`, placeholders for missing assets, caption nudge editor; Approve assets gate.
⏸ CHECKPOINT C - one episode taken from approved script to approved assets without opening a file manager.

## Phase D - Render, Publish, Settings
- [ ] S030 Render stage: job with progress, video player, audit table, reviewer verdicts, Approve render.
- [ ] S031 Publish stage: platform tabs, copy fields, downloads, AI-label checkbox, URL capture → published.
- [ ] S032 Settings: brand/cast viewer, voice samples, provider modes.
- [ ] S033 `npm run studio` one-command start (build-if-stale, open browser); `studio/README.md`.
- [ ] S034 (+ VS-004 acceptance tests 3–4) Playwright smoke test: create → approve script (fixture) → upload fixture assets → preview loads → render (short fixture) → publish pack.
⏸ CHECKPOINT D - pilot episode produced end to end in the Studio; time it against NFR7.
