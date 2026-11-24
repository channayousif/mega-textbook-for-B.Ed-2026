---
name: studio-teaser
description: >-
  Course and licence-track teaser YouTube Shorts (Feature 029, D-2026-0082; recipe teaser@3,
  D-2026-0094): write a five-shot script, under 30 s once assembled, per course from its course overview, take the owner's script approval, generate
  each shot with Google Flow (Veo, narration spoken per language) through the gflow-cli MCP on davinci
  (the owner's Windows PC is the fallback), check every take, assemble the Short with captions and a link end card, upload
  it private to the textbook.com.pk channel, take the owner's spot-check and publish. Use when asked
  to "make the course teasers", "make a Short for <course>", "run the teaser pipeline", or to resume
  the teaser ledger. Also holds the gflow setup and tunnel guide.
---

# Course teaser Shorts

Read the **media-studio** skill first: it holds the shared rules (owner gates, recipes, producers,
checks, crew stages, cross-posting, the gflow route and its failure modes). This skill keeps the
teaser-specific steps.

Owner ruling D-2026-0082 (2026-11-10, `specs/decisions/log.md`):
- **Flow automation.** Flow is automated only from the owner's Windows PC. Superseded on host by
  the owner on 2026-11-24: Flow now runs on davinci (owner's own sign-in, laptop as fallback); see
  the media-studio skill. The decisions log entry is pending.
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
  enforces this). The clip producer keeps a 100-credit floor (`veo_lite` is 10 a shot).
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
   `licence/index.mdx`) and `catalog/courses.json`. Write `specs/studio/teasers/<id>.json` with
   `"recipe": { "name": "teaser", "version": 3 }` (`specs/studio/recipes/teaser@3.json`, teaser@2 with a 1.4x voice):
   - **Shots.** Five, with beats hook → learn → learn → why → cta. Shots 1 and 5: the on-screen
     presenter speaks to the camera. Shots 2-4: action with a named camera move (push-in, crane,
     dolly, tracking, whip-pan...), voiced by an unseen woman narrator.
   - **Style.** A shared `visual_style` and a `narrator` description of the presenter and the voice.
   - **Narration.** UR ≤ 18 words per shot (the recipe's budget). UR uses the simple spoken
     register, with technical terms in English. Every fact must be on the source pages.
   - **Per locale.** Each locale also gets an `end_card` (headline, cta) and a `youtube_title`
     (≤ 90 chars; `#Shorts` is added).

   Run `T check <id>` until it passes. Then run `T plan <id> ur` (Urdu only, D-2026-0083) and
   `T advance <id>-<loc> scripted --json '{"script_sha256":"<sha256sum of the file>"}'`.
2. **Owner approval.** Show the owner the Urdu narration lines (a batch of scripts is fine), or
   let the crew list them; the owner may approve with `crew approve-script <key>`.
   When approved:
   `T advance <key> script-approved --json '{"gates":{"script":{"verdict":"approve","by":"owner","date":"<today>"}}}'`.
   If the script changes after approval, the sha256 no longer matches: re-plan and re-approve.
3. **Generate and pre-check.** `node scripts/media/teaser-clips.mjs <id>` makes every missing shot
   from the recipe's prompts (gflow `veo_lite`, one Flow project per teaser, lost-clip recovery),
   records each take with `T clip`, and prints QG1 and the QG2 transcript match with a 3-frame
   strip per take. `--shots 2,4` makes a retake of those shots. Exit 3, 4 or 5 is a MEDIA-HOLD
   (quota, no producer, held for the owner): stop and report it. With the PC off, the manual Flow
   route writes a copy-button prompt page instead (media-studio skill).
4. **Review each take.** Read every strip and transcript. Fail a take with a drawn camera interface
   or viewfinder marks, readable text, a map or flag, wrong dress or setting, or speech that misses
   the line. Record it with
   `T clipqa <key> <N> <take> --json '{"verdict":"pass|pass-with-notes|fail","by":"Claude QG2","notes":"…"}'`.
   A drawn overlay can sometimes be cropped away (an 82% crop as a new take) instead of a retake.
   Retake within the limit (two per shot); at the limit, block the item and ask the owner.
5. **Advance.** When every shot has a take: `T advance <key> clips-generated`; when every shot has
   a passing take: `T advance <key> clips-qa --json '{"gates":{"clips":{"verdict":"…","by":"Claude QG2","date":"…","notes":"…"}}}'`.
   The former off-screen-only narrator and the NotebookLM speech check are retired: recipe v2 has
   an on-screen presenter, and QG2 is local whisper (`scripts/media/qg2.mjs`).
6. **Assemble.**
   `scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs <id> <loc> <out.mp4> <chosen shot1..5>`
   (use `chosenTakes`, the latest passing take per shot; speed and the 30 s limit come from the
   script's recipe, `--speed` overrides). Each segment is rendered on its own and the parts are joined with the concat demuxer, so ffmpeg stays under 1 GB (one graph over every segment ran past 3.5 GB and was killed by the session memory cap). Pauses are found 8 dB under each shot's mean loudness (Veo Lite shots carry an ambience bed that a fixed -35 dB never cut). The assembler crops any letterbox bars
   Veo burned in (cropdetect), cuts pauses of 0.45 s or more and the dead head/tail of each shot,
   speeds the voice (1.4x for teaser@3), joins segments with hard cuts plus a whoosh, punches in alternate segments,
   pushes in slowly, ducks a generated beat under the voice and ends on a 3 s zooming end card
   (`PACE` in the script). Urdu captions keep the spaces beside English terms through `bidiUr`
   (LTR isolates with NBSP padding); libass is not used (the static ffmpeg has no HarfBuzz). Then run
   `T advance <key> assembled --json '{"encoded_file":"…"}'`.
7. **QG1 encoded.** Run `media-qa.mjs <out.mp4> --kind short --stage encoded`: ≤ 60 s, vertical,
   −16 LUFS, peak ≤ −1 dBTP. Extract about nine frames across the cut and look at them: the caption is fully visible, Urdu reads RTL, and the end card shows the
   exact address. Then `T advance <key> qa-pass` with `gates.qa1`.
8. **Upload private.** Get the metadata with `T meta <key>`.
   - Call `upload_video` (YouTube MCP) with its `upload_video` fields.
   - Call `update_video` with the teaser playlist "Course teasers (اردو)". The owner creates it;
     record its ID below.
   - Then run `T advance <key> uploaded-private --json '{"youtube_id":"…","uploaded_at":"<ISO>"}'`.
   - Confirm the video plays as a Short at `https://youtube.com/shorts/<id>`.
9. **QG3 + owner.** Check with `list_videos` (private, on the channel), then `T advance <key>
    qa3-pass`. Run `T sheet` and send the owner the must-watch list. On "approve", record
    `gates.owner` (`by: owner`) and advance to `approved`.
10. **Publish.** Call `update_video privacy_status public`, then
    `T advance <key> public --json '{"published_at":"<ISO>"}'`. Give the owner the
    `pinned_comment` line from `T meta` to pin in YouTube Studio; the MCP has no comment tool. The
    owner can also set the Short's "Related video" there. Then refresh the view counts with
    `node scripts/notebook-studio/teaser-stats.mjs` and commit `specs/studio/teaser-stats.json`
    in the same PR: the home page's "Courses in 30 seconds" shows the two most watched and the two
    newest public teasers (`pickHomeTeasers` in `scripts/build-studio-index.mjs`).
11. **Cross-post (D-2026-0084).** Only after step 10. Render one variant per platform (the follow
    reminder and end card differ: TikTok and Instagram say "link in bio"):
    `scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs <id> ur <dir>/teaser.<platform>.mp4 <shots> --platform <platform>`,
    run QG1 on it, then `node scripts/notebook-studio/social-post.mjs post <platform> <key> <file> [--draft]`;
    it records the post in the ledger. Draft behaviour per platform is in the media-studio skill.

## Descriptions, thumbnails and the follow reminder (D-2026-0084)

- **Description (`T meta`).** Built from the script and the repository only:
  - the top: keyword line, the hook and first learn line, the course link and the subscribe link;
  - "More about the course", from `scripts/notebook-studio/describe.mjs`, shared with unit videos.
    It holds the course summary, the objectives, every unit with its live link, a fixed "why
    study" list, and the channel's other published videos in the same locale (never the teaser
    itself);
  - then search phrases, the AI disclosure and hashtags.
- **Urdu facts.** The Urdu overview is not translated, so an Urdu script carries `course_summary`
  and `objectives`, faithful renderings of the overview. QG0 checks that the objectives count
  matches the overview. They, like `keywords`, are metadata: editing them does not reopen the
  script approval. Never add a claim that is not on the course pages.
- **Byte limit.** YouTube allows 5,000 bytes, and Urdu letters take 2. `fitDescription` drops unit
  descriptions, then videos beyond 3, then unit links, until it fits.
- **Captions.** `T social <key> <platform>` gives the cross-post caption. Facebook and LinkedIn
  also carry the objectives.
- **Thumbnail.** `assemble-teaser.mjs` writes `teaser.<platform>.thumb.jpg` (1080×1920) through
  `thumbnail.mjs`:
  - the best frame across the raw shots (no captions, letterbox trimmed);
  - the title's question as a huge hook;
  - the course badge, the "مفت کورس" ribbon and a "ابھی دیکھیں" pill.
- **Thumbnail in the pipeline.** `assembled` requires `thumbnail_file`. `T meta` prints it as
  `update_video.thumbnail_path`; pass it after `upload_video`. Before QG1 passes, Read the JPEG and
  its phone-size check (`node scripts/notebook-studio/thumbnail.mjs preview <jpg>`): the hook must
  read at feed size. `T thumb <key> <file>` records a rebuilt thumbnail.
- **Editing a published description.** Never re-upload for text: run
  `node scripts/notebook-studio/yt-describe.mjs teaser <key>` (in place, same ID, 50 units).
  Unit videos link the teaser playlist rather than a teaser ID, so a replaced teaser never leaves
  a dead link.
- **Follow reminder.** Every render has one (`PLATFORM_CTA`, `ctaSvg`): a pill with a drawn bell
  (YouTube) or person-plus icon, shown three times over the shots in the top safe band, never on
  the end card. No platform logos.

## Setup and budget

Cross-post credentials, the gflow route (davinci, with the Windows PC as fallback), its failure modes and the credit
budget are in the media-studio skill.

## Channel facts

- Channel `UC7cQfkGkdNABCiyjmV5ZaFQ` (see the studio-media skill for authentication). The OAuth
  app was moved from Testing to In production on 2026-11-17 (unverified), so the refresh token no
  longer expires after 7 days; sign-in shows an "unverified app" warning (Advanced, then continue).
- Teaser playlist: "Urdu Course teasers" `PLCJn7gAoYIJs` (verified 2026-11-17; `TEASER_PLAYLIST` in `teaser.mjs`).
