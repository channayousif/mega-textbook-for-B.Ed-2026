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
- **Length.** About 45 s: five 8-second shots plus a 5 s end card. Superseded on pace (owner,
  2026-11-17, "slow and lame"): the assembler now cuts dead air, speeds the voice 12% and ends
  on a 3 s card, so a teaser runs about 35 s (step 7).
- **First batch.** One teaser per course (17) plus the licence track.

Owner ruling D-2026-0083 (2026-11-17): **Urdu teasers only for now.** Plan, generate and upload
only the `ur` locale, so the first batch is 18 Shorts. A script's `en` locale is optional; keep it
if it is already written (it still passes QG0), but do not write new English narration until the
owner reopens English.

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
     concrete classroom scene. The narrator is **off-screen** (EFMP-301 pilot, owner choice): write
     scenes without a speaking face, so Veo voices the line over the picture.
   - **Style.** A shared `visual_style` and `narrator` description (`off-screen`, a woman's voice).
   - **Narration.** UR ≤ 22 words per shot (EN ≤ 18 if an `en` locale is present). UR uses the v2 simple spoken
     register, with technical terms in English. Every fact must be on the source pages.
   - **Per locale.** Each locale also gets an `end_card` (headline, cta) and a `youtube_title`
     (≤ 90 chars; `#Shorts` is added).

   Run `T check <id>` until it passes. Then run `T plan <id> ur` (Urdu only, D-2026-0083) and
   `T advance <id>-<loc> scripted --json '{"script_sha256":"<sha256sum of the file>"}'`.
2. **Owner approval.** Show the owner the Urdu narration lines (a batch of scripts is fine).
   When approved:
   `T advance <key> script-approved --json '{"gates":{"script":{"verdict":"approve","by":"owner","date":"<today>"}}}'`.
   If the script changes after approval, the sha256 no longer matches: re-plan and re-approve.
3. **Narrator.** No on-screen character. The account is on the migrated flow.google.com agent
   composer, where gflow 0.101 refuses `r2v` and `i2v` (`FlowHostMigratedError`, upstream #799), so
   a reference image cannot hold one face across shots. Revisit an on-camera narrator only when
   gflow ports r2v.
4. **Generate.** For each shot, call `gflow_generate_video`:
   - `mode` `t2v`, `aspect` `9:16`, `model` `veo_fast`, `duration` `8` (8 s only; other lengths
     make the Flow agent ask a question and gflow times out at 600 s with no spend)
   - always pass `profile` (the account profile, e.g. `a2ahs-alpha`) and `project_name` `textbook-teasers`
   - prompt: `Vertical 9:16 video, 8 seconds, full-frame edge to edge, no letterbox or black bars. <visual> <visual_style> An unseen woman narrator says in Urdu, voice-over only: "<narration line>" No on-screen text, captions or logos.`

   Record each take with `T clip <key> <N> --json '{"artifact_id":"…","model":"veo_fast","credits":20,"file":"…"}'`.
   When all five shots have a take, run `T advance <key> clips-generated`.
5. **Fetch + QG1 per take.**
   - Fetch: the result's `files[0]` is `...\Downloads\gflow-cli\<flow_media_id>.mp4`; run
     `curl -fsS http://127.0.0.1:18801/<flow_media_id>.mp4 -o ~/studio-media/teasers/<id>/<loc>/shot-N-tT.mp4`.
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
   (use `chosenTakes`, the latest passing take per shot). The assembler crops any letterbox bars
   Veo burned in (cropdetect), cuts pauses of 0.45 s or more and the dead head/tail of each shot,
   speeds the voice 12%, joins segments with hard cuts plus a whoosh, punches in alternate segments,
   pushes in slowly, ducks a generated beat under the voice and ends on a 3 s zooming end card
   (`PACE` in the script). Urdu captions keep the spaces beside English terms through `bidiUr`
   (LTR isolates with NBSP padding); libass is not used (the static ffmpeg has no HarfBuzz). Then run
   `T advance <key> assembled --json '{"encoded_file":"…"}'`.
8. **QG1 encoded.** Run `media-qa.mjs <out.mp4> --kind short --stage encoded`: ≤ 60 s, vertical,
   −16 LUFS, peak ≤ −1 dBTP. Extract about nine frames across the cut and look at them: the caption is fully visible, Urdu reads RTL, and the end card shows the
   exact address. Then `T advance <key> qa-pass` with `gates.qa1`.
9. **Upload private.** Get the metadata with `T meta <key>`.
   - Call `upload_video` (YouTube MCP) with its `upload_video` fields.
   - Call `update_video` with the teaser playlist "Course teasers (اردو)". The owner creates it;
     record its ID below.
   - Then run `T advance <key> uploaded-private --json '{"youtube_id":"…","uploaded_at":"<ISO>"}'`.
   - Confirm the video plays as a Short at `https://youtube.com/shorts/<id>`.
10. **QG3 + owner.** Check with `list_videos` (private, on the channel), then `T advance <key>
    qa3-pass`. Run `T sheet` and send the owner the must-watch list. On "approve", record
    `gates.owner` (`by: owner`) and advance to `approved`.
11. **Publish.** Call `update_video privacy_status public`, then
    `T advance <key> public --json '{"published_at":"<ISO>"}'`. Give the owner the
    `pinned_comment` line from `T meta` to pin in YouTube Studio; the MCP has no comment tool. The
    owner can also set the Short's "Related video" there.
12. **Cross-post (D-2026-0084).** Only after step 11. Render one variant per platform (the follow
    reminder and end card differ: TikTok and Instagram say "link in bio"):
    `scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs <id> ur <dir>/teaser.<platform>.mp4 <shots> --platform <platform>`,
    run QG1 on it, then `node scripts/notebook-studio/social-post.mjs post <platform> <key> <file>`
    and record the printed fields with `T crosspost <key> <platform> --json '{"state":"…","post_id":"…","url":"…"}'`.
    TikTok arrives as an inbox draft: tell the owner to open TikTok, add the caption from
    `T social <key> tiktok` and tap Post. Platforms: `instagram`, `facebook`, `tiktok`, `linkedin`.

## Descriptions and the follow reminder (D-2026-0084)

- `T meta` builds the YouTube description from the script only: a keyword line (Urdu title,
  English title, code), the hook and first learn line as a summary, the remaining lines as
  bullets, the course link, the subscribe link (`?sub_confirmation=1`), one line about the site,
  search phrases (title, code and the optional `keywords` in the script locale), the AI
  disclosure and hashtags. Never add a claim that is not on the course pages. `keywords` are
  metadata: editing them does not reopen the script approval.
- `T social <key> <platform>` gives the cross-post caption.
- Every render has a follow reminder (`PLATFORM_CTA`, `ctaSvg`): a pill with a drawn bell
  (YouTube) or person-plus icon, shown three times over the shots in the top safe band, never on
  the end card. No platform logos.

## Cross-post setup (one-time, owner)

Credentials go in `~/.config/textbook-social/apps.json` as
`{"meta":{"client_id":"…","client_secret":"…"},"tiktok":{…},"linkedin":{…}}` (mode 600). For
each provider, set the redirect URI to `https://textbook.com.pk/`, then run
`social-post.mjs auth-url <provider>`, have the owner open it and paste back the address it lands
on, and run `social-post.mjs exchange <provider> '<address>'`.
- **Meta (Instagram and Facebook).** At developers.facebook.com, create a Business app and add
  Facebook Login for Business. The owner keeps an app role, so the app works on the owner's own
  Page and Instagram without App Review. Instagram must be a Professional account linked to the
  textbook.com.pk Facebook Page. The Page token saved by `exchange` does not expire.
- **TikTok.** At developers.tiktok.com, create an app with Login Kit and the Content Posting API,
  and submit it for review. Until it is audited, uploads go to the owner's inbox as drafts.
- **LinkedIn.** At linkedin.com/developers, create an app linked to the textbook.com.pk Page with
  "Share on LinkedIn" and "Sign In with OpenID Connect". This posts as the owner's profile.
  Posting as the Page needs the Community Management API (LinkedIn vets the organisation).
- **Bios.** Set textbook.com.pk as the bio link on TikTok and Instagram.

## Windows setup and tunnel (one-time)

The gflow-cli MCP must drive **real Google Chrome**, which has no Linux arm64 build, so it runs on
the owner's Windows PC. This server reaches it over the owner's own SSH connection. Server ports
8000/8001 are taken (8000 is Kong, the Supabase gateway), so the tunnel uses 18800/18801.

On Windows, in Command Prompt (verified 2026-11-17 with gflow-cli 0.98.0). The owner's PC runs
Smart App Control, which blocks uv's unsigned `python.exe` (os error 4551), so the route uses the
signed python.org Python through `py -3.12 -m`, never uv launchers or `gflow.exe`. Python 3.15 is
not supported (no pyyaml/lz4 wheels); 3.11-3.13 are.
1. Install Google Chrome and `winget install Python.Python.3.12`.
2. `py -3.12 -m pip install --user gflow-cli`, then `py -3.12 -m playwright install chromium`.
3. `py -3.12 -m gflow_cli auth login --browser chrome`, sign in with the Flow Pro account, then
   `py -3.12 -m gflow_cli credits user`. Login renames the profile after the Google account
   (here `a2ahs-alpha`); use that name below. Optional: `py -3.12 -m gflow_cli telemetry off`.
4. Keep two windows running. Windows port 8000 was already in use on the owner's PC, so both ends
   use 18800/18801:
   - `py -3.12 -m gflow_cli serve --host 127.0.0.1 --port 18800 --profile a2ahs-alpha`
   - `py -3.12 -m http.server 18801 --bind 127.0.0.1 -d "%USERPROFILE%\Downloads\gflow-cli"`
     (gflow saves every clip there as `<flow_media_id>.mp4`; fetch it as
     `http://127.0.0.1:18801/<flow_media_id>.mp4`)
5. In `%USERPROFILE%\.ssh\config`, under the Host entry used for this server, add the two lines
   below, then reconnect:
   ```
   RemoteForward 18800 127.0.0.1:18800
   RemoteForward 18801 127.0.0.1:18801
   ```

On the server (Claude):
- Check the tunnel: `ss -ltn | grep -E ':1880[01] '`.
- Register the MCP: `claude mcp add --transport http gflow http://127.0.0.1:18800/mcp -s user`,
  then `/mcp` or restart.
- Smoke test: `gflow_get_credits`; one `veo_lite` 4 s 9:16 clip (10 credits); fetch it over 18801;
  `media-qa.mjs --kind clip`.

Until the session restarts, the MCP can be called directly: `initialize` over
`POST http://127.0.0.1:18800/mcp` returns an `mcp-session-id` header, then `tools/call`. Always pass
`profile` explicitly (the tool default is `default`, which no longer exists after the rename).

The owner's account is on the migrated flow.google.com, where gflow drives Flow's **agent chat**
and auto-approves only the credit gate. If Flow's agent asks any other question, gflow waits
600 s and fails with `TransportTimeoutError ... (approvals=0)` and no credits are spent (in 0.98.0
a logging bug then masks this as a bare "Error executing tool"). Seen 2026-11-17: a 4 s request on
Veo 3.1 Lite made the agent ask "switch to Omni or use 8 s?", because Lite only supports 8 s there
even though `gflow_list_models` lists 4/6/8. So every shot request uses `duration: 8`, and after a
timeout the owner reads the agent's reply in the Flow project before any retry.

If generation fails with an auth error, the owner runs `py -3.12 -m gflow_cli auth login --browser
chrome` again on Windows.

## Budget

| Item | Credits |
|---|---|
| One take (veo_fast, 8 s) | 20 (Pro plan; veo_lite 10, veo_quality 100) |
| One Short (5 shots, no retakes) | 100 |
| First batch (18 Urdu Shorts) | 1,800 plus retakes |
| Google AI Pro allowance | 1,000 a month plus 50 a day |

## Channel facts

- Channel `UC7cQfkGkdNABCiyjmV5ZaFQ` (see the studio-media skill for authentication). The OAuth
  app was moved from Testing to In production on 2026-11-17 (unverified), so the refresh token no
  longer expires after 7 days; sign-in shows an "unverified app" warning (Advanced, then continue).
- Teaser playlist: _(owner to create "Course teasers (اردو)" and send the ID)_.
