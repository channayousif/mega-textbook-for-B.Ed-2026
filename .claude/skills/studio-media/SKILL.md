---
name: studio-media
description: >-
  End-to-end Study Studio audio and video pipeline (Feature 029): generate NotebookLM audio
  overviews and video overviews for a unit's topics, download them, pass them through
  technical (QG1), content (QG2) and post-upload (QG3) quality gates, upload them to the
  textbook.com.pk YouTube channel through the youtube-uploader MCP (private first), take the
  owner's spot-check approval, publish, and place the YouTube links in the unit's Studio
  manifest. Use when asked to "make the audio/video for <course> unit N", "upload the studio
  media", "publish the audio briefs to YouTube", "run the media pipeline", or to resume a
  half-finished media ledger. Also holds the YouTube authentication guide.
---

# Study Studio media pipeline

Owner rulings (2026-11-09): audio and video live on **YouTube / YouTube Music**, slides on
Google Drive. Final visibility is **public**. Uploads go to the **textbook.com.pk brand
channel**. The last gate is an **owner spot-check sample**, after Claude has checked every
transcript.

The ledger `specs/studio/<course>/media-unit-NN.json` is the only record of progress. Read it
first with `node scripts/notebook-studio/media-ledger.mjs status <course> <unit>`, and resume
from there. Every state change goes through `media-ledger.mjs advance`; the script refuses
skipped states, missing evidence, duplicate files and uploads past the daily quota, so never
edit the ledger by hand.

States: `planned → generated → downloaded → qa1-pass → encoded → qa2-pass → uploaded-private → qa3-pass → approved → public → placed`.
A failed gate means `media-ledger.mjs block <course> <unit> <key> "<reason>"`. Fix the cause
(often a regenerate with a revised prompt), then `unblock`.

## Hard rules

- **Private first.** `upload_video` always gets `privacy_status: "private"`. Going public
  happens only at stage 10, after the owner's approval is recorded.
- **Quota.** At most 95 uploads per Pacific day across all ledgers (Google allows 100 per
  project per day). `media-ledger.mjs quota` shows today's count. A 403 `quotaExceeded` or a 400
  `uploadLimitExceeded` means stop for the day; never retry in a loop. `uploadLimitExceeded` is the
  **channel's** own daily cap, separate from the API quota: an unverified new channel hit it at
  the 10th upload of the day (2026-11-09). Phone-verifying the channel (YouTube Studio → Settings
  → Channel → Feature eligibility) raises it and also unlocks "Set as podcast".
- **No duplicates.** The sha256 check in `advance … downloaded` blocks the same file twice.
  Before any upload, also run `list_videos` with the title as the search term.
- **Media never enters git.** Files live in `~/studio-media/<course>/unit-NN/topic-NN/`.
  `check-studio-manifest` fails on any audio/video file under `static/studio/` or
  `specs/studio/`.
- **Host limits (AGENTS.md).** Prefix ffmpeg work (`media-qa.mjs` on long files,
  `audio-to-video.mjs`) with `scripts/heavy.sh`. Run serially; no subagent runs ffmpeg.
- **AI disclosure.** Every upload sets `contains_synthetic_media: true`, and the description
  states the content is made with Gemini Notebook and uses AI voices (`youtube-meta.mjs` writes
  this).
- **Independence and honesty.** QG2 is Claude's own check, recorded as `by: "Claude QG2
  transcript check"`. It never stands in for the owner's approval, and an agent never signs
  with human initials (ADR-0019).
- One PHR per acting prompt (AGENTS.md), with the ledger diff in the same PR.

## Stages

Notation: `L = node scripts/notebook-studio/media-ledger.mjs`, `M = ~/studio-media/<course>/unit-NN/topic-NN`.

1. **Plan.** For each topic × locale, create items with
   `L plan <course> <unit> --json '{"topic":1,"locale":"en","kind":"audio","part":1,"title":"…","alt":"…","prompt_ref":"specs/studio/prompts/audio.md v2","notebook_id":"…"}'`.
   Plan one audio brief (part 1), optional go-deeper parts (2+), and one video per topic and
   locale. Titles come from the generation prompt; `alt` is one sentence on what the item covers, written in the
   item's own language (Urdu for `ur` items, because the panel shows it on the RTL page).
2. **Generate** (`gemini-notebook-studio`). Build sources with
   `node scripts/notebook-studio/build-source-pack.mjs` (already in the unit notebook if the
   manifest has a `notebook_id`). Call `studio_create` with `artifact_type` audio or video and
   the prompt from `specs/studio/prompts/audio.md` / `video.md`, the version recorded in
   `prompt_ref`. Poll `studio_status` until it completes, then
   `L advance … generated --json '{"artifact_id":"…"}'`.
3. **Download.** Call `download_artifact` into `M/`, take the hash with
   `sha256sum M/<file>`, then `L advance … downloaded --json '{"file":"~/studio-media/…","sha256":"…"}'`.
4. **QG1 technical (source).**
   `scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs M/<file> --kind audio|video --part N`.
   It checks: an audio stream; duration bounds (brief 75 s–7 min, deeper part 1–15 min,
   video 1.5–15 min); no silence over 4 s; for video, at least 720p and no black run over 2 s.
   On pass, run `L advance … qa1-pass --json '{"gates":{"qa1":{"verdict":"pass","by":"media-qa.mjs","date":"<today>","metrics":{…}}}}'`.
   On fail, `block` the item with the findings.
5. **Encode.**
   `scripts/heavy.sh node scripts/notebook-studio/audio-to-video.mjs M/<file> M/<key>.mp4 --course … --unit … --topic … --locale … --kind … --part N`.
   - Audio becomes a 1920×1080 brand card (Urdu laid out RTL) with the audio track.
   - Video keeps its picture; only the audio is loudness-normalised to -16 LUFS.
   - A 1280×720 thumbnail under 2 MB is written beside the output.

   Then re-check the output:
   `media-qa.mjs M/<key>.mp4 --kind … --stage encoded` (adds loudness -20 to -12 LUFS, true
   peak ≤ -1 dBTP, and A/V durations equal within 0.5 s). Record its result as
   `gates.qa1_encoded` with
   `L advance … encoded --json '{"encoded_file":"…","thumbnail_file":"…","gates":{"qa1_encoded":{…}}}'`.
   **Look at the thumbnail** (Read the .jpg) before moving on: is the title right and readable,
   and does Urdu run right to left?
6. **QG2 content (Claude).** Get a transcript:
   - Add the source file (for a video, the m4a extracted with
     `ffmpeg -i in.mp4 -vn -c:a copy out.m4a`) to the course QA notebook with `source_add`
     (`source_type: "file"`), then read it with `source_get_content`.
   - If NotebookLM refuses audio sources, upload private first (stage 7) and check the YouTube
     auto-captions in Studio instead.

   Compare the transcript with the topic file (`docs/…/topic-NN.mdx`, or the `i18n/ur/…` file
   for Urdu):
   - It covers the topic's key terms and headings, and it names the right course and topic.
   - It makes no claims the topic does not make, and it states no wrong facts.
   - It contains no quiz answers or answer keys (forbidden outside the assessment page).
   - For Urdu, terms follow `specs/content/terminology.csv`, and the English terms the owner
     kept stay in English. Put anything doubtful in `urdu_flag` so the owner hears it.

   Verdict `pass`, `pass-with-notes` (notes go to the owner's sheet), or `revise` (block it and
   regenerate with a sharper prompt). On pass, run
   `L advance … qa2-pass --json '{"gates":{"qa2":{"verdict":"…","by":"Claude QG2 transcript check","date":"…","notes":"…"}}}'`.
7. **Upload private** (`youtube-uploader` MCP).
   - Run `L quota` first.
   - Build the metadata with `node scripts/notebook-studio/youtube-meta.mjs <course> <unit> <key> --playlist <id>`.
     The playlist is the language's podcast playlist for audio, or the course video playlist
     for video; IDs are under "Channel facts" below.
   - Call `upload_video` with `file_path` = the encoded mp4 and the `upload_video` fields.
   - Then call `update_video` with the `update_video` fields (playlist, thumbnail,
     `contains_synthetic_media`).
   - Finish with `L advance … uploaded-private --json '{"youtube_id":"…","uploaded_at":"<ISO now>"}'`.
8. **QG3 post-upload.** Run `list_videos` and confirm the video is processed, private, on the
   right channel, and in the playlist. When a unit's items are all uploaded, add the IDs to a
   local build: the Listen/Watch tabs must load the player at 390 px in EN and UR with no
   console errors. Private videos do not play in embeds, so check that the frame renders and
   shows YouTube's "private video" notice. Then record `gates.qa3` and advance to `qa3-pass`.
9. **Owner spot-check.** Run `L sheet <course> <unit>` and send the owner the `must_hear`
   list (first item per locale and kind, every pass-with-notes, every Urdu flag) with links.
   The owner is signed in, so private videos play for them. When they reply "approve <unit>",
   advance each item to `approved` with
   `{"gates":{"owner":{"verdict":"approve","by":"owner","date":"…"}}}`. Items the owner names
   for fixes are blocked with their words.
10. **Publish and place.** For each approved item, call `update_video` with
    `privacy_status: "public"`, then `L advance … public --json '{"published_at":"<ISO now>"}'`.
    Then:
    - `node scripts/notebook-studio/place-media.mjs <course> <unit>` (writes placed rows with
      `host_url` into `specs/studio/<course>/unit-NN.json`, and moves items to `placed`)
    - `node scripts/check-studio-manifest.mjs`
    - `node scripts/build-studio-index.mjs`
    - a browser check of one EN and one UR embed after the build.

    Commit the ledger, the manifest and the PHR together.

## YouTube authentication (one-time, and after a token is revoked)

Server: `anwerj/youtube-uploader-mcp` v0.3.1 (MIT).
- **Build.** No Linux arm64 release binary exists, so it is built from tag v0.3.1, commit
  `985d80f`: `GOTOOLCHAIN=auto go build -trimpath -o ~/.local/bin/youtube-uploader-mcp .`
  The binary reports version 0.1.3 because that constant in the source was never updated.
- **Registration** (user scope):
  `claude mcp add youtube-uploader -s user -- ~/.local/bin/youtube-uploader-mcp -client_secret_file ~/.config/gcloud/notebook-client.json -working_dir ~/.config/youtube-uploader`
- **Tokens** live in `~/.config/youtube-uploader/.youtube_uploader_channels_cache` (mode 0600,
  outside the repo).

Steps for the owner:
1. Create the YouTube brand channel **textbook.com.pk**.
2. Create the playlists:
   - "B.Ed Audio Briefs (English)" and "B.Ed Audio Briefs (اردو)", each marked as a podcast
     (Studio → Content → Playlists → ⋮ → Set as podcast) so they appear on YouTube Music;
   - one video playlist per course and language.
   Record the IDs under "Channel facts".
3. In Google Cloud project `mega-edu-textbook`:
   - enable **YouTube Data API v3**;
   - in Auth → Audience, add the channel owner's Google account as a test user;
   - click **Publish app** (In production). In Testing mode, refresh tokens die after 7 days.
     The "unverified app" warning is expected for this personal app.
4. Claude calls `authenticate` and gives the owner the URL. The owner opens it, picks the
   **brand channel** (not the personal one), and clicks Advanced → continue. The browser ends
   on a `http://localhost/?code=…` page that does not load, which is expected. The owner copies
   that whole address back.
5. Claude calls `accesstoken` with the code, then `channels`, and records the channel ID below.
6. **Smoke test:** upload `~/studio-media/_smoke/smoke-upload.mp4` as private, confirm it with
   `list_videos`, and have the owner delete it in YouTube Studio (the MCP cannot delete).

If a call returns 401 or `invalid_grant`, call `refreshtoken`. If that fails, repeat steps 4–5.

## Channel facts

- Channel: `textbookdotcomdotpk` (@textbookdotcomdotpk), ID `UC7cQfkGkdNABCiyjmV5ZaFQ`; authenticated 2026-11-09, smoke upload `eh1SNfJPPBs` passed (private, thumbnail, all four playlists).
- Playlists (IDs are 13 characters on this channel, verified by a successful add): `PLZVdgN09a2qs`, `PLBPGR4jAnhh4`, `PLH7WvExVOw8U`, `PLLdTwYdZvUFc`. Mapping (owner, 2026-11-09):
  - Audio podcast EN: `PLLdTwYdZvUFc` · Audio podcast UR: `PLH7WvExVOw8U`
  - EFMP-301 video EN: `PLBPGR4jAnhh4` · EFMP-301 video UR: `PLZVdgN09a2qs`
  - Other courses: owner creates one video playlist per course and language; add them here.
- "Set as podcast" waits on channel verification (owner, 2026-11-09); playlist IDs do not change when it is set.

## Tools on the host

- ffmpeg/ffprobe 7.0.2 static arm64 (johnvansickle.com, md5 verified) in `~/.local/bin`.
  Override with `FFMPEG_DIR`.
- Noto Nastaliq Urdu in `~/.local/share/fonts` (the Urdu cards need it).
