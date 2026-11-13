---
name: studio-teaser
description: >-
  Course and licence-track teaser YouTube Shorts (Feature 029, D-2026-0082): write a 45-second
  five-shot script per course from its course overview, take the owner's script approval, generate
  each shot with Google Flow (Veo, narration spoken per language) through the gflow-cli MCP on the
  owner's Windows PC, check every take, assemble the Short with captions and a link end card, upload
  it private to the textbook.com.pk channel, take the owner's spot-check and publish. Use when asked
  to "make the course teasers", "make a Short for <course>", "run the teaser pipeline", or to resume
  the teaser ledger. Also holds the Windows/gflow setup and tunnel guide.
---

# Course teaser Shorts

Owner ruling D-2026-0082 (2026-11-10, `specs/decisions/log.md`):
- **Flow automation.** Flow is automated only from the owner's Windows PC.
- **Narration.** Veo speaks the narration, generated separately for EN and UR.
- **Length.** About 45 s: five 8-second shots plus a 5 s end card.
- **First batch.** One teaser per course (17) plus the licence track, in EN and UR, which makes
  36 Shorts.

The video-studio rule against automating subscription sites still binds video-studio; this
skill is the Feature 029 exception.

The ledger is `specs/studio/teasers/media-teasers.json`, one item per teaser × locale. Scripts are
`specs/studio/teasers/<id>.json` (`<id>` is the lower-case course code, or `licence`), with the
schema at `specs/studio/teaser-script.schema.json`. Drive every state change through
`node scripts/notebook-studio/teaser.mjs` (`T` below); never hand-edit the ledger.

States: `planned → scripted → script-approved → clips-generated → clips-qa → assembled → qa-pass → uploaded-private → qa3-pass → approved → public`.

## Hard rules

- **No credits before approval.** A script must pass QG0 (`T check <id>`) and carry the owner's
  approval (`gates.script`, `by: owner`) before any `gflow_generate_video` call. `T clip` refuses
  takes before `script-approved`.
- **Retakes and credit floor.** Each shot gets one take plus at most two retakes (`T clip`
  enforces this). Read `gflow_get_credits` before each teaser and stop if the balance would drop
  under one teaser (100 credits on veo_fast).
- **Private first, owner last.** Every upload goes in as private; the owner's spot-check decides
  public.
- **Upload limits.** The daily upload guard is shared with `studio-media` (95 a day). On
  `uploadLimitExceeded` (the channel cap), stop for the day.
- **No media in git.** Media lives in `~/studio-media/teasers/<id>/<locale>/`.
- **Host limits.** `assemble-teaser.mjs` and `media-qa.mjs` run through `scripts/heavy.sh`,
  serially. No subagent runs ffmpeg or a browser.
- **AI disclosure.** Every upload sets `contains_synthetic_media: true` and states AI generation
  in the description (`shortMeta`).
- **Imagery.** Classroom and school scenes only. No sacred figures, scripture or calligraphy in
  any shot (D-2026-0081 limits apply to all courses).
- **Records.** One PHR per acting prompt.

## Stages

1. **Script (Claude).** Read the course's `docs/semester-N/<code>/course-overview.mdx` (or
   `licence/index.mdx`) and `catalog/courses.json`. Write `specs/studio/teasers/<id>.json`:
   - **Shots.** There are five, with beats hook → learn → learn → why → cta. Each `visual` is one
     concrete classroom scene with the narrator.
   - **Style.** A shared `visual_style` and `narrator` description.
   - **Narration.** EN ≤ 18 words and UR ≤ 22 words per shot. UR uses the v2 simple spoken
     register, with technical terms in English. Every fact must be on the source pages.
   - **Per locale.** Each locale also gets an `end_card` (headline, cta) and a `youtube_title`
     (≤ 90 chars; `#Shorts` is added).

   Run `T check <id>` until it passes. Then run `T plan <id> en`, `T plan <id> ur`, and
   `T advance <id>-<loc> scripted --json '{"script_sha256":"<sha256sum of the file>"}'`.
2. **Owner approval.** Show the owner both locales' narration lines (a batch of scripts is fine).
   When approved:
   `T advance <key> script-approved --json '{"gates":{"script":{"verdict":"approve","by":"owner","date":"<today>"}}}'`.
   If the script changes after approval, the sha256 no longer matches: re-plan and re-approve.
3. **Narrator (once per batch).** Make one Flow character, a teacher narrator matching
   `narrator.description` (`gflow_generate_image` plus a character save; images cost no credits).
   The owner picks it. Record its `entity_id` and name in every script's `narrator`.
4. **Generate.** For each shot, call `gflow_generate_video`:
   - `mode` `r2v` with `reference_entities=[entity_id]` and `reference_entity_names=[name]`
   - `aspect` `9:16`, `model` `veo_fast`, `duration` `8`
   - `output` set to `%USERPROFILE%\gflow-out\<id>\<loc>\shot-N-tT.mp4`
   - prompt: `<visual> <visual_style> The narrator looks at the camera and says in <English|Urdu>: "<narration line>"`

   Record each take with `T clip <key> <N> --json '{"artifact_id":"…","model":"veo_fast","credits":20,"file":"…"}'`.
   When all five shots have a take, run `T advance <key> clips-generated`.
5. **Fetch + QG1 per take.**
   - Fetch: `curl -fsS http://127.0.0.1:18801/<id>/<loc>/shot-N-tT.mp4 -o ~/studio-media/teasers/<id>/<loc>/shot-N-tT.mp4`.
   - Check: `scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs <file> --kind clip`
     (vertical, 3.5–8.6 s, audio present, no black runs).
6. **QG2 speech per take.** Add the take's audio to the QA notebook (`source_add` file), read
   `source_get_content`, and compare it with the script line. Check three things: the spoken words
   match (Veo can garble words, especially Urdu), the voice is consistent with the other shots, and
   the picture is a classroom scene with no text or sacred imagery (look at a frame).
   - Record the result with `T clipqa <key> <N> <take> --json '{"verdict":"pass|pass-with-notes|fail","by":"Claude QG2","notes":"…"}'`.
   - Retake a failed shot within the retake limit; if the limit is reached, block the item and ask
     the owner.
   - Then run `T advance <key> clips-qa --json '{"gates":{"clips":{"verdict":"…","by":"Claude QG2","date":"…","notes":"…","urdu_flag":"…"}}}'`.
7. **Assemble.**
   `scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs <id> <loc> <out.mp4> <chosen shot1..5>`
   (use `chosenTakes`, the latest passing take per shot). Then run
   `T advance <key> assembled --json '{"encoded_file":"…"}'`.
8. **QG1 encoded.** Run `media-qa.mjs <out.mp4> --kind short --stage encoded`: ≤ 60 s, vertical,
   −16 LUFS, peak ≤ −1 dBTP; the 5 s silent end card is allowed. Extract frames at 3 s, 20 s and
   41 s and look at them: the caption is fully visible, Urdu reads RTL, and the end card shows the
   exact address. Then `T advance <key> qa-pass` with `gates.qa1`.
9. **Upload private.** Get the metadata with `T meta <key>`.
   - Call `upload_video` (YouTube MCP) with its `upload_video` fields.
   - Call `update_video` with the teaser playlist: "Course teasers (English)" / "Course teasers
     (اردو)". The owner creates these; record their IDs below.
   - Then run `T advance <key> uploaded-private --json '{"youtube_id":"…","uploaded_at":"<ISO>"}'`.
   - Confirm the video plays as a Short at `https://youtube.com/shorts/<id>`.
10. **QG3 + owner.** Check with `list_videos` (private, on the channel), then `T advance <key>
    qa3-pass`. Run `T sheet` and send the owner the must-watch list. On "approve", record
    `gates.owner` (`by: owner`) and advance to `approved`.
11. **Publish.** Call `update_video privacy_status public`, then
    `T advance <key> public --json '{"published_at":"<ISO>"}'`. Give the owner the
    `pinned_comment` line from `T meta` to pin in YouTube Studio; the MCP has no comment tool. The
    owner can also set the Short's "Related video" there.

## Windows setup and tunnel (one-time)

The gflow-cli MCP must drive **real Google Chrome**, which has no Linux arm64 build, so it runs on
the owner's Windows PC. This server reaches it over the owner's own SSH connection. Server ports
8000/8001 are taken (8000 is Kong, the Supabase gateway), so the tunnel uses 18800/18801.

On Windows, in PowerShell:
1. Install Google Chrome, then `winget install astral-sh.uv`.
2. Run `uv tool install gflow-cli`, then `uv tool run --from gflow-cli playwright install chromium`.
3. Run `gflow auth login --browser chrome` and sign in with the Flow Pro account. Check with
   `gflow credits user`.
4. Keep two windows running:
   - `gflow serve --host 127.0.0.1 --port 8000 --profile default`
   - `mkdir $env:USERPROFILE\gflow-out; python -m http.server 8001 --bind 127.0.0.1 -d $env:USERPROFILE\gflow-out`
5. In `%USERPROFILE%\.ssh\config`, under the Host entry used for this server, add the two lines
   below, then reconnect:
   ```
   RemoteForward 18800 127.0.0.1:8000
   RemoteForward 18801 127.0.0.1:8001
   ```

On the server (Claude):
- Check the tunnel: `ss -ltn | grep -E ':1880[01] '`.
- Register the MCP: `claude mcp add --transport http gflow http://127.0.0.1:18800/mcp -s user`,
  then `/mcp` or restart.
- Smoke test: `gflow_get_credits`; one `veo_lite` 4 s 9:16 clip (10 credits); fetch it over 18801;
  `media-qa.mjs --kind clip`.

If generation fails with an auth error, the owner runs `gflow auth login --browser chrome` again
on Windows.

## Budget

| Item | Credits |
|---|---|
| One take (veo_fast, 8 s) | 20 (Pro plan; veo_lite 10, veo_quality 100) |
| One Short (5 shots, no retakes) | 100 |
| First batch (36 Shorts) | 3,600 plus retakes |
| Google AI Pro allowance | 1,000 a month plus 50 a day |

## Channel facts

- Channel `UC7cQfkGkdNABCiyjmV5ZaFQ` (see the studio-media skill for authentication).
- Teaser playlists: _(owner to create "Course teasers (English)" and "Course teasers (اردو)" and send the IDs)_.
