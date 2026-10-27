# VS-001 - Urdu Shorts Pipeline

Status: Draft for approval · Created 2026-10-24 · Owner: Yousif

## 1. Problem
textbook.com.pk offers free bilingual textbooks (ADE, B.Ed Hons) and a STEDA teaching-licence
track, but most of its audience discovers content on YouTube, Instagram, Facebook and TikTok,
not by searching. There is no repeatable way to turn site topics into short videos with a
recognisable brand that sends viewers back to the right page.

## 2. Goal
A Claude Code–driven, human-in-the-loop pipeline that turns one site page into one 45–60 s
vertical Urdu video (9:16, 1080×1920) teaching one idea, featuring recurring animated
characters, a consistent voice and brand, and a CTA to that exact page.

## 3. Audience
- **Prospective teachers** - ADE/B.Ed students and STEDA licence aspirants in Sindh.
- **Teacher educators** - faculty at GECEs, PITE, universities, who may share shorts in class.
Primary viewing: phones, often with sound off → captions mandatory.

## 4. Scope
In v1: Urdu only · animated 2D characters · Mega Textbook + Licence track topics · manual
upload with generated upload packs · existing subscriptions plus free local tools.
Out of v1: English/Sindhi versions · long-form videos · automatic posting · paid APIs ·
analytics dashboards · realistic human characters.

## 5. User stories and acceptance criteria

### US-1 Topic queue (P1)
As the owner, I want a queue of candidate topics harvested from the site so I always know what to make next.
- AC1.1 `/video-harvest` lists every page in both sections with `topic_id`, section, title (Urdu + English), Urdu URL, and a "shortability" score.
- AC1.2 Already-produced topics are marked and never re-suggested unless asked.
- AC1.3 The queue is a single committed file `queue/topics.json`.

### US-2 Script (P1)
As the owner, I want an Urdu script drafted from the page so I only need to review it.
- AC2.1 Script follows `contracts/script.schema.json`: hook (≤3 s), 3 beats, recap, CTA.
- AC2.2 Spoken length 110–150 Urdu words (≈45–60 s at brand pace).
- AC2.3 Every factual line cites the source excerpt it came from.
- AC2.4 Pedagogy and Urdu reviewer reports are attached before the script gate.
- AC2.5 The CTA uses an approved template from the brand bible and the page's own URL.
- AC2.6 The source page is snapshotted (`source.snapshot.md`) with SHA-256, capture time and repo revision; if it later changes, script approval is voided (data-model: approval invalidation).

### US-3 Consistent cast and brand (P1)
As a viewer, I want the same characters, voices and look in every short so I recognise the channel.
- AC3.1 Characters render from locked puppet layers defined in the brand bible (not regenerated per episode).
- AC3.2 Each character always uses its locked voice card (chosen through the VS-003 benchmark: provider, voice/narrator, style prompt, reference sample).
- AC3.3 Colours, fonts, logo, intro sting (≤1 s), CTA card and music bed come from the brand bible.
- AC3.4 `brand-qa-reviewer` reports zero violations on the final render.

### US-4 Assets via subscriptions (P1)
As the owner, I want exact instructions for any step that needs a subscription UI so I can do it in minutes.
- AC4.1 `/video-assets` writes `episodes/<id>/handoff.md` listing every file to create, the tool, the exact prompt, reference images to attach, and the expected filename.
- AC4.2 The pipeline validates files dropped in `inbox/` (format, duration, resolution, loudness) and reports what's missing.
- AC4.2b Every accepted asset is recorded in the asset manifest with SHA-256, source tool, prompt, rights/consent note, import time and reviewer.
- AC4.3 Budget: ≤2 Veo clips per episode by default; monthly Flow credit use is tracked in `queue/budget.json`.

### US-5 Render (P1)
As the owner, I want a finished video rendered locally from approved assets.
- AC5.1 Remotion renders 1080×1920, 30 fps, H.264, AAC, −14 LUFS integrated.
- AC5.2 Burned-in Urdu captions are word-timed (±150 ms) and match the approved script exactly.
- AC5.3 Safe zones respected: nothing important in the top 250 px or bottom 420 px.
- AC5.4 End card shows the page URL (and a QR code) for ≥3 s.
- AC5.5 Sidecar Urdu subtitles `captions.ur.srt` and `captions.ur.vtt` are exported with the same text and timings as the burned-in captions.
- AC5.6 Urdu shaping is checked on stills extracted from the **encoded MP4** with FFmpeg, not only on the browser preview.

### US-6 Publish pack (P2)
As the owner, I want copy-ready upload packs per platform.
- AC6.1 `/video-publish` writes title, description, hashtags, pinned comment, and AI-content disclosure note for YouTube Shorts, Instagram Reels, Facebook Reels and TikTok.
- AC6.2 Links carry UTM tags: `utm_source=<platform>&utm_medium=shorts&utm_campaign=<episode_id>`.
- AC6.3 A thumbnail/cover frame (1080×1920) is exported.

### US-7 Status board (P2)
- AC7.1 `/video-status` prints all episodes grouped by status with the next action for each.

### US-0 Discovery and render proof (P1, first)
As the owner, I want proof that the toolchain renders correct Urdu video on my machine before the pipeline is built.
- AC0.1 A read-only discovery report (`specs/000-discovery/discovery.md`) is approved before any code.
- AC0.2 An offline sample MP4 from `fixtures/sample-positive-reinforcement.md` (placeholder art, any test audio) renders at 1080×1920 with correct Nastaliq captions, marked `mode: sample`.
- AC0.3 The parent site's build/tests give the same result before and after installation.

## 6. Non-functional requirements
- NFR1 Owner hands-on time ≤45 min per episode after setup (target 25 min).
- NFR2 Re-rendering an approved episode is a single command and deterministic.
- NFR3 No secrets in git. No billing-enabled API keys anywhere in the project.
- NFR3b Approved inputs are never regenerated during rendering; an interrupted render re-runs from the same approved files.
- NFR4 Works on the owner's machine (Windows/macOS/Linux) with Node ≥20 and FFmpeg.

## 7. Success metrics (first 90 days)
- 3 shorts/week published consistently.
- Click-through to site measurable via UTM in site analytics.
- Brand recognition: same cast in 100% of shorts; zero brand-QA violations at publish.

## 8. Open questions
- OQ1 ~~What does the LongCat subscription include?~~ Resolved: LongCat chat only - avatar deferred (VS-ADR-0004).
- OQ2 Character names, look and gender balance - owner to approve drafts in `brand/characters/`.
- OQ3 Is a YouTube Data API upload (free quota, OAuth) acceptable in v2, or stay manual?
