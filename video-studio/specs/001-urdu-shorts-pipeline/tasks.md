# Tasks - VS-001 Urdu Shorts Pipeline

Work top to bottom. `[P]` = can run in parallel with siblings. Each phase ends with a
⏸ CHECKPOINT: stop, summarise what was built, show evidence, wait for the owner.
Mark tasks `[x]` as they are completed and note the commit hash.

> Build order with VS-002 (Studio): 001 Phase 0–2 → 002 Phase A–B → 001 Phase 3–5 (each with
> its Studio screen) → 002 Phase C–D → 001 Phase 6–7. Keep all logic in `scripts/lib` so both the
> CLI and the Studio server call the same functions.

## Phase 0 - Discovery & bootstrap
- [x] T000 READ-ONLY discovery: fill `specs/000-discovery/discovery.md` from the template with evidence; record baseline parent build/test. ⏸ owner approves before T001.
- [x] T001 Create folders from plan §3 (`queue/`, `episodes/.gitkeep`, `remotion/`, `scripts/`, `brand/assets/README.md`).
- [x] T002 `package.json` for video-studio (separate from the site): `tsx`, `typescript`, `zod`, `ajv`, `yaml`, `qrcode`, `fast-glob`, `gray-matter`. Scripts: `harvest`, `new`, `ingest`, `align`, `render`, `audit`, `status`.
- [x] T003 Scaffold Remotion in `remotion/` (blank TS template); install `remotion-dev/skills`; confirm `npx remotion studio` opens.
- [x] T004 `scripts/doctor.ts`: verifies Node, `MEDIA_ROOT` exists outside the repo, `kaggle` CLI + `~/.kaggle/kaggle.json` (chmod 600, not readable by others), fonts, and `free -m` >= 3 GB before any local heavy job; prints fixes. Local FFmpeg is optional (owner PC only); it must have `loudnorm` (Playwright's bundled build is refused).
- [x] T004b (owner confirmed 2026-10-29 that the organisation qualifies for Remotion's free licence; fonts Noto Nastaliq Urdu and Inter are OFL) Remotion licence check (free for individuals and small organisations; confirm the owner's case) and font licences, BEFORE any render (moved from T071b).
- [x] T005 `scripts/lib/schema.ts`: load and validate `episode.json` / `script.json` against `contracts/` (ajv). Unit test with one valid and one invalid fixture.
- [x] T006 Render proof on Kaggle (VS-ADR-0011 spike): minimal `UrduShort` (title, Nastaliq captions, static placeholder characters, end card) from `fixtures/sample-positive-reinforcement.md` with `mode: sample`; `kaggle:pack` → `kaggle:run` → `kaggle:fetch` round trip; stills extracted from the encoded MP4 with FFmpeg on Kaggle; record cold-start time, render time, GPU hours, whether `--gl=vulkan` and NVENC worked. Tamper test: change one bundle file, notebook must fail.
- [x] T007 (= PI001 + PI002 + PI003, see VS-004) Hash utilities in `scripts/lib/hash.ts` (SHA-256 of normalised text/files) + approval-invalidation check with unit tests.
> Phase 0 notes (2026-10-26): T002 installs only what Phase 0 uses (Remotion 4.0.535 pinned, ajv, yaml, tsx); `zod`, `qrcode`, `fast-glob`, `gray-matter` are added with the tasks that need them. T003: no `remotion studio` on the production host; the composition is proven by bundling and rendering on Kaggle (T006). `remotion-dev/skills` not installed yet (third-party; review before adding). T004b: Remotion is free only for teams of 3 or fewer; owner to confirm (history/reviews/2026-10-26-licence-check.md). Tests: `npm test` (node:test, 12 cases). T006 spike result: 3 Kaggle runs on T4 x2 (run 1 failed in 30 s: Kaggle auto-extracts `.tar.gz` in datasets, so the bundle is `project.vsbundle`; run 2 rendered but captions were hollow; run 3 accepted). Each run about 2.6 min wall time: apt 51-61 s, npm ci 9-10 s, bundle 13 s, render 15 s for 10 s of 1080x1920@30, stills 8 s. NVENC works on the T4; finals stay x264. `remotion gpu` cannot open chrome://gpu in the headless shell, so GPU frame capture is unproven and not needed (CPU capture is fast enough). Tamper tests fail closed (exit 2). Outputs hash-verified on fetch; media only in `$MEDIA_ROOT`.

⏸ CHECKPOINT 0 - `npm run doctor` green; sample MP4 (rendered on Kaggle, stored in `$MEDIA_ROOT`) plays and Urdu captions look right in the encoded stills; `git status` shows no media; parent build unchanged.

## Phase 1 - Brand & cast (owner-heavy)
- [ ] T010 Pre-fill `brand/brand-bible.yaml` colours/logo from the site (`src/css/custom.css`, `static/img/`).
- [ ] T011 Draft both character sheets in `brand/characters/` using the `brand-consistency` skill; owner approves names and looks.
- [x] T012 (2026-10-29: `brand/handoff-cast.md`, Nano Banana edits of one master per character so parts are cut by pixel difference; sets; optional Veo 3 B-roll) Write the character design handoff (`brand/handoff-cast.md`): turnaround + expression sheet prompts for Gemini/ChatGPT images; the layer list for puppets (body, head, eyes open/closed, mouths A/E/O/M/rest, 3 gesture arms).
- [ ] T013 Owner generates images; Claude helps cut layers (or owner cuts in any editor) into `brand/assets/cast/<name>/` as transparent PNG at fixed canvas size.
- [x] T013b (VS-003 V001-V007 done 2026-10-28) Voice benchmark = VS-003 tasks V001–V005 (`specs/003-urdu-voice-benchmark/`, `/video-voice-test`): candidates = Gemini/Google UI speech (if available to the owner), free open-source Urdu TTS on a free GPU (licence-checked), consented human narrator. Blinded scorecard, 3 takes on separate sessions. Until a voice is locked, the voice provider is `manual-import`.
- [x] T014 (cards locked: VS-ADR-0012 Bilal, VS-ADR-0013 Ustani) Voice casting from the VS-003 winner: per character, a locked voice card in `brand/voices/<character>.md` (provider, model/version, voice/preset or narrator, style prompt, reference sample hash, licence/consent); then update `brand/brand-bible.yaml` with owner approval.
- [x] T015 Pronunciation lexicon: seed 30 common teacher-education terms with respellings in brand bible. (2026-10-27: 29 glossed term-bank entries plus 3, verified by VS-003 round 7; see `specs/003-urdu-voice-benchmark/spec.md`.)
- [ ] T016 `scripts/lib/brand.ts` generates `remotion/src/brand.ts` from YAML (typed). Fails loudly on missing keys.
⏸ CHECKPOINT 1 - cast sheets approved; puppet layers present; voices locked.

## Phase 2 - Harvest + script
- [ ] T020 `scripts/harvest.ts`: walk Urdu docs (and English for titles) per the topic-harvester skill; write `queue/topics.json`; idempotent; never overwrites `episodes` arrays.
- [ ] T021 [P] Shortability scoring heuristic (headings, list density, examples, length) + Claude refinement pass for the top 40.
- [ ] T022 `scripts/new-episode.ts <topic_id>`: create episode folder + `episode.json` (status `scripting`); write `source.snapshot.md` with SHA-256, capture time and repo revision.
- [ ] T023 `/video-new` command wires T022 → urdu-script-writer skill → schema validation → pedagogy + urdu reviewers → status `script_review`.
- [ ] T024 Word-count + duration estimator (brand pace words/min) recorded in `script.stats`.
⏸ CHECKPOINT 2 - three real scripts drafted from different sections; owner reviews.

## Phase 3 - Handoff + ingest
- [ ] T030 asset-handoff skill produces `handoff.md` from `script.json` (voice lines grouped per character, B-roll prompts, illustration prompts, filenames).
- [ ] T031 `scripts/ingest.ts`: match inbox files to expected names (tolerant to tool download names via a mapping prompt), normalise audio (48 kHz mono, loudnorm −16 LUFS, trim silence), clips (1080×1920 crop/pad, 30 fps, strip audio), images (fit 1080×1920).
- [ ] T032 Missing/invalid report written into `episode.json.assets` and printed.
- [ ] T032b (voice audio done by VS-003 V006, `npm run voice:import`; clips and images open) Asset manifest: SHA-256, source tool, prompt, take, rights/consent note, import time, reviewer per accepted asset; usage counters.
- [ ] T033 Budget tracking into `queue/budget.json`; warn at 80%.
⏸ CHECKPOINT 3 - one episode's assets ingested end to end.

## Phase 4 - Remotion template
- [ ] T040 `Root.tsx` registers `UrduShort` (1080×1920, 30 fps, duration from props via `calculateMetadata`).
- [ ] T041 `Puppet.tsx`: layered character; blink every 3–5 s (seeded random); mouth shape from audio amplitude (`useAudioData` + `visualizeAudio`, thresholds → rest/M/E/A/O); gesture swaps per line; subtle idle breathing.
- [ ] T042 `Captions.tsx`: Noto Nastaliq Urdu, RTL, ≤4 words per line, 2 lines max, active-word highlight in brand accent, safe-zone aware.
- [ ] T043 [P] `Beat.tsx` diagram types: list, steps, compare, cycle, pyramid, definition (spring animations, Urdu text).
- [ ] T044 [P] `BRoll.tsx` (Ken Burns for stills, crossfade for clips), `LowerThird.tsx`, `Sting.tsx`, `EndCard.tsx` (URL + QR + logo + CTA text).
- [ ] T045 Audio: voice lines sequenced with 150 ms gaps; music bed ducked −18 dB under voice; final loudness −14 LUFS.
- [ ] T046 Test props fixture renders a 10 s sample without real assets (placeholder layers).
⏸ CHECKPOINT 4 - sample render reviewed in Remotion Studio by owner (look and feel).

## Phase 5 - Align + render + audits
- [ ] T050 `scripts/align.ts` (runs inside the Kaggle notebook): faster-whisper large-v3 per line with word timestamps; map recognised words onto script words by order; give each line a confidence score; low-confidence lines fall back to sentence-level timing (distribute by character length) and are FLAGGED. `captions.json` is not accepted until the owner has reviewed flagged lines in the caption timing editor.
- [ ] T051 `scripts/render.ts <episode>` (inside the Kaggle notebook; `kaggle-pack.ts` verifies approval hashes before upload and the notebook re-verifies the bundle): build props from episode files; `npx remotion render`; write `render/final.mp4` and `captions.ur.srt` / `captions.ur.vtt`; refuse `mode: sample` unless `--sample`.
- [ ] T052 (+ PI004, PI008) `scripts/audit.ts`: duration 40–60 s, 1080×1920, 30 fps, loudness −14±1 LUFS, true peak ≤ −1 dBTP, first frame not black, end card ≥3 s, captions text == script text; extract 6 still frames FROM THE ENCODED MP4 (ffmpeg) for reviewers; record render sha256.
- [ ] T053 `/video-render` runs pack → Kaggle (T050–T052) → fetch + SHA-256 verify into `$MEDIA_ROOT`, then urdu-language-reviewer (captions) + brand-qa-reviewer on stills → status `render_review`.
⏸ CHECKPOINT 5 - first complete episode rendered and audited.

## Phase 6 - Publish pack + status
- [ ] T060 (+ PI005, PI009) publish-pack skill → `publish/{youtube,instagram,facebook,tiktok}.md` with UTM links and AI-disclosure reminder; `cover.png` from the hook frame.
- [ ] T061 `/video-status` board from all `episode.json` files.
- [ ] T062 `/video-publish` marks `packed`; owner confirms URLs → `published`.
⏸ CHECKPOINT 6 - pack reviewed; first short uploaded manually.

## Phase 7 - Pilot & retrospective
- [ ] T070 Produce 3 pilot episodes (one textbook topic, one licence topic, one "myth vs fact").
- [ ] T071 Time each owner step; compare with NFR1.
- [ ] T071b Licensing review: fonts (OFL), music bed, Remotion licence terms for the owner's organisation, each asset's rights note; accessibility check (caption size/contrast).
- [ ] T072 Retrospective: update skills with lessons (prompt fixes, lexicon additions); write ADRs for any changed decision.
⏸ CHECKPOINT 7 - v1 accepted.
