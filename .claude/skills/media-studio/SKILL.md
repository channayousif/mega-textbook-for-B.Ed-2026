---
name: media-studio
description: >-
  Shared rules and tools for every generated medium on textbook.com.pk (Feature 030, ADR-0037,
  D-2026-0094): one job model and state vocabulary, versioned recipes, the producer contract
  (gflow Veo and Nano Banana, manual Flow, NotebookLM, agy, Codex) with quota holds and
  lost-clip recovery, the QG0-QG3 checks, the owner's gates, crew stages and owner commands,
  social cross-posting, and the gflow route (davinci, owner PC fallback) with its known failure modes. Read it before
  any teaser, Study Studio audio/video or raster-illustration work, then follow the kind's own
  skill: studio-teaser (Shorts), studio-media (NotebookLM audio/video), generate-figures (figures).
---

# Media Studio

**Crew drafts, owner gates** (D-2026-0094). The crew may script, generate, check, assemble and
upload private. Only the owner approves a script before credits are spent, and only the owner
makes a video public. The kind skills hold the step-by-step work; this skill holds what they share.

## Job model and states

One media job = `{ key, kind, scope, recipe, state, gates, takes[], outputs }`
(`specs/studio/media-job.schema.json`). Shared states, in order:
`planned → scripted → approved → generating → generated → checked → assembled → uploaded-private → owner-approved → public → placed`.
Each kind walks its own subset (`scripts/media/states.mjs` `PATH`): images skip upload, documents
skip assembly. The existing ledgers keep their own state names; `scripts/media/legacy.mjs` maps
them read-only:

| Ledger | Driven by |
|---|---|
| `specs/studio/teasers/media-teasers.json` | `node scripts/notebook-studio/teaser.mjs` |
| `specs/studio/<course>/media-unit-NN.json` | `node scripts/notebook-studio/media-ledger.mjs` |
| `specs/content/<course>/figures/unit-NN.md` | generate-figures / generate-illustration.mjs |

Every ledger write is atomic and holds `<ledger>.lock` across load, change and save
(`scripts/media/ledger.mjs`), so a clip run, a cross-post run and the crew can write the same
ledger at once. Never hand-edit a ledger.

**One view of everything:** `node scripts/media/status.mjs [--all] [--json] [--probe]` lists jobs
per kind and state, what waits on the owner, and which producers can take work. The crew board
shows the same owner actions.

## Hard rules

- **No credits before the owner's script approval** (FR-012). The ledger refuses a script gate not
  passed `by: owner`, and refuses clips once the script file changed after approval (its sha256 is
  the approved identity; `teaser.mjs rehash` only while still `scripted`).
- **Private first, owner publishes** (FR-013). Every upload is `privacy_status: private` with
  `contains_synthetic_media: true`. No crew code sets a video public; only the owner's
  `crew publish <key>` queues the one job allowed to.
- **Never pay twice** (FR-006). A timeout or a lost reply is not a failed take. Retakes go through
  `scripts/media/teaser-clips.mjs`, which recovers a clip Flow finished and billed before it
  generates again, and holds for the owner while a charge is unexplained.
- **Workers never call a generator directly.** Images only through
  `scripts/generate-illustration.mjs` (ADR-0029 point 4); clips only through `teaser-clips.mjs`.
  On 2026-11-21 a worker that called `gflow_generate_image` itself left six unused images.
- **Upload cap:** 95 a Pacific day across all ledgers (`DAILY_UPLOAD_LIMIT`). A channel
  `uploadLimitExceeded` means stop for the day.
- **No media in git** (`~/studio-media/`), heavy work through `scripts/heavy.sh`, serially.
- **Imagery:** Pakistani school settings, modest dress, no readable text, maps, flags or emblems,
  never a sacred person, scripture or calligraphy.
- **Isolation (FR-018):** no content gate, nothing a gate imports and nothing the review-evidence
  binding walks may import `scripts/media/` (`tests/unit/media-isolation.test.mjs`). Media tests
  live in `tests/unit/media-*.test.mjs`; never add a media step to `scripts/lib/gates.mjs`.
- One PHR per acting prompt (AGENTS.md).

## Recipes

Versioned prompt and pacing recipes in `specs/studio/recipes/<name>@<version>.json`
(schema `specs/studio/recipe.schema.json`, loader and prompt builder `scripts/media/recipes.mjs`).
A used recipe is never edited; a change is a new version. A teaser script names its recipe in
`recipe: { name, version }`; none means `teaser@1`.

- `teaser@1`: batches 1-2, voice-over only, 22 Urdu words a line, voice 1.12x.
- `teaser@2` (D-2026-0094, the EFMP-302 pilot): an on-screen presenter speaks to the camera in shots 1 and 5;
  an unseen woman narrator speaks over action in shots 2-4, each naming a camera move (QG0 checks);
  at most 18 Urdu words a line; voice 1.25x; a Short over 30 s fails QG1; `veo_lite` with no
  `duration` argument. The aspect ratio is a generator argument: never write "9:16" into a prompt
  (Veo then draws viewfinder marks).
- `teaser@3` (current, owner 2026-11-22): teaser@2 with the voice at 1.4x. Veo Lite shots carry speech for
  about 7 of their 8 seconds, so batch 3 ran 30.4-33.1 s at 1.25x; at 1.4x it fits 30 s.

## Producers

One contract (`scripts/media/producers/index.mjs`): a producer returns
`ok | quota | unavailable | failed | held`. Quota is recorded with its reset time and the next
producer is tried; unavailable skips without spending an attempt; failed counts an attempt; held
stops and asks the owner, never falling back (the next route could spend credits again).

| Medium | Fallback order | Notes |
|---|---|---|
| image | agy, gflow (Nano Banana), codex | `generate-illustration.mjs`; quota in `~/.cache/mega-book/image-quota.json` |
| clip | gflow.video, manual.flow | `teaser-clips.mjs`; quota in `~/.cache/mega-book/media-quota.json` |
| overview | nlm | NotebookLM; expired cookies are `unavailable`; refresh from davinci's workspace Chrome: `nlm login --provider openclaw --cdp-url http://127.0.0.1:18802` |
| schematic | codex, claude | generate-figures |

- **gflow.video** (`producers/gflow-video.mjs`): one Flow project per teaser
  (`~/.cache/mega-book/gflow-projects.json`), a fresh HTTP connection per request, 15 minutes per
  call. Every submission is journalled (`gflow-video-journal.json`) before the call; the next call
  for that shot adopts the finished clip (by media id, or the unclaimed file that landed in
  the `gflow-cli` output folder) or holds. After checking Flow:
  `node scripts/media/producers/gflow-video.mjs journal | clear <key> <shot>`.
- **manual.flow** (`producers/manual-flow.mjs`): writes a copy-button prompt page and holds; the
  owner saves `<key>_shot-<n>.mp4` in `Downloads\gflow-cli` (or `~/studio-media/inbox`). A joined
  clip is split at the speech pause nearest each 8 s boundary.
- **nlm** (`producers/nlm.mjs`): resumable by artifact id, so a slow generation is downloaded later
  instead of created twice.

## Pacing (D-2026-0100)

Every automated media call is paced so the owner's Google and Meta accounts look like one person's
working day, not a bot (`scripts/media/pacing.mjs`). The producers enforce it themselves; a short
gap is slept, anything longer becomes a `quota` hold with `paced: true` and its reset time (the job
waits; clips never fall back to `manual.flow` for a pacing hold).

- **Media hours: 15:00-09:00 PKT, every hour except the owner's 09:00-15:00 office hours** (owner,
  2026-11-25, correcting the first build, which had it the other way round). In office hours no Flow, Gemini, Codex image, NotebookLM, YouTube or
  Meta call is made, and the crew does not launch `illustrate`, `teaser_clips`, `studio_media`,
  `studio_publish`, `media_assemble`, `media_publish` or `social_roundup` (text and local stages run
  as usual). The social roundup is due from 15:00 PKT (the opening of media hours). Daily caps
  reset at 00:00 PKT, inside the window.
- **Limits** (defaults; the owner may override any of them in `~/.config/mega-book/media-limits.json`):

| Channel | Gap (+ random jitter) | Per hour | Per day |
|---|---|---|---|
| `gflow.video` (Veo) | 3 min (+0-90 s) | 8 clips | 200 credits; after 1,000 credits in the billing cycle, 50 a day until the cycle day (`cycleDay`, default 1) |
| `gflow.image` (Nano Banana) | 90 s (+0-60 s) | 12 | 40 |
| `agy.image` (Gemini) | 60 s (+0-45 s) | 15 | 50 |
| `codex.image` | 2 min (+0-30 s) | 6 | 15 |
| `nlm.studio` (artifact creation) | 15 min (+0-3 min) | 2 | 6 |
| `youtube.upload` | 45 min (+0-5 min) | 1 | 4 |
| `social.facebook`, `.instagram`, `.linkedin`, `.tiktok` | 2 h (+0-10 min) | 1 | 3 each |

- Veo is counted in credits at submission (Flow charges then); everything else counts requests,
  successful or not.
- **YouTube uploads go through MCP**, so the agent paces them: `node scripts/media/pacing.mjs check
  youtube.upload` before each `upload_video` (exit 4 and `hold:` means stop and hand off with the
  time), `node scripts/media/pacing.mjs record youtube.upload` right after a successful upload.
- `node scripts/media/pacing.mjs status` shows each channel's use and next allowed time. The
  ledger is `~/.cache/mega-book/media-pacing.json` (35 days kept).
- Manual work over the davinci VNC desktop (Meta AI, Business Suite, hand-made Flow clips) is
  outside this ledger; keep it to the same hours and a similar rhythm.

## Checks

- **QG0** script: `teaser.mjs check <id>` (schema, sources, beats, the recipe's word budget and
  camera moves, no long dash).
- **QG1** technical: `scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs <file> --kind clip|short|audio|video [--stage encoded]`.
- **QG2** meaning: `node scripts/media/qg2.mjs <clip> --line "<approved line>"` runs whisper turbo,
  scores the transcript against the line (English words written in Urdu script still match; a
  spoken site address matches its spelled-out form) and writes a 3-frame strip. The verdict it
  suggests is only a suggestion: look at the strip (drawn camera interface, text, maps, dress) and
  record the verdict yourself. Calibrated on batch 3: the CTA and ordinary lines score 0.93-1.0.
- **QG3** after upload: `list_videos` shows it private and processed with title and description intact.

## Crew stages and owner commands

Teasers are off until the owner sends `crew media on` (`crew media off|status`). Stages
(`scripts/crew/media.mjs`): `teaser_script` (draft, QG0, stop at `scripted`), `teaser_clips` (after
approval; held while gflow is offline or out of quota), `media_assemble` (assemble, upload private,
QG3, stop at `qa3-pass`), `media_publish` (only after `crew publish`). At most six scripts wait for
the owner. Owner commands: `crew approve-script <key>`, `crew reject <key> <note>`,
`crew publish <key>`.

The Study Studio has its own switch, `crew studio on|off|status` (owner, 2026-11-25: the crew plans,
schedules and manages it). `studio_media` (formerly `audio_overview`, still accepted) resumes every
item of a unit's ledger from any state up to `qa3-pass`, audio and video, and plans the next
certified unit (G3 done; focus course, then catalogue order) when no unit is mid-way and fewer
than two wait for the owner. It stops at `qa3-pass` with the owner sheet. The owner watches the
private items and replies `crew approve-studio <course> <unit> [except <key>...]`, or
`crew reject-studio <course> <unit> <key> <note>` to have one remade; only then does
`studio_publish` set the approved items public and place them (`place-media.mjs`).

The owner may also decide every owner gate on the Decisions page (`/app/admin/decisions`, Feature 035), which queues the same commands (`via: web`).

Approvals live in `~/.crew/mega-book/media.json`. Clip, upload and NotebookLM stages run on the
claude worker, or on claude_crew when claude is cooling (both have the gflow, youtube-uploader and
gemini-notebook-studio MCP servers).

**Producer lanes** (`scripts/crew/resources.mjs`; owner, 2026-11-25: "different media producers in
parallel, each producer max one slot" in media hours). Every outside-service stage runs on a lane
with at most one running job: `notebook` (NotebookLM: `studio_media`), `flow` (gflow images and Veo:
`teaser_clips`, or `illustrate` pinned with `--producer gflow`), `agy` and `codex` (`illustrate`
pinned to that producer), `youtube` (`media_assemble`, `media_publish`, `studio_publish`), `social`
(`social_roundup`) and `meta` (reserved, specs/033). Lanes run in parallel and outside the text
slots (`CREW_MAX_PARALLEL`); a lane takes a job only in media hours and while its paced channel has
room today, the memory and disk floors still apply, and in media hours media jobs pick a worker
before text jobs (the social roundup first). Jobs that write one ledger never overlap (the teaser
ledger; each unit's Study Studio ledger). BOARD.md "Today's media plan" shows each lane, its next
job and why it waits.

## Social cross-posting (D-2026-0084)

Only after the YouTube Short is public. Render a per-platform variant
(`assemble-teaser.mjs ... --platform instagram|facebook|tiktok|linkedin`), QG1 it, then
`node scripts/notebook-studio/social-post.mjs post <platform> <key> <file> [--draft]`. It records
the post in the teaser ledger under the lock (`--no-record` only prints the fields).

- **Facebook:** `--draft` saves the reel as a draft in Meta Business Suite (Content > Drafts) for
  the owner to publish.
- **TikTok:** the sandbox app always lands in the owner's TikTok inbox as a draft that opens only in
  the Android app; the owner adds the caption (`teaser.mjs social <key> tiktok`) and posts. Too many
  pending drafts fail with `spam_risk_too_many_pending_share`: the owner posts the pending ones first.
- **Instagram:** has no draft API, so a post is published at once; space posts out
  (`ProcessingFailedError` on bursts).
- **LinkedIn:** posts as the owner's profile; posting as the Page waits on Community Management API approval.

Credentials: `~/.config/textbook-social/apps.json` and `<provider>.json`, mode 600, never in git
and never printed. Setup: `social-post.mjs auth-url <provider>`, the owner opens it and pastes back
the address, then `social-post.mjs exchange <provider> '<address>'` (redirect URI
`https://textbook.com.pk/`). Bios on TikTok and Instagram link textbook.com.pk.

## gflow route (davinci; owner's PC is the fallback)

gflow-cli drives real Google Chrome. Since 2026-11-24 it runs on **davinci** (Ubuntu 24.04
arm64, `google-chrome-stable` arm64, gflow-cli 0.106.0), so Flow no longer depends on the owner's
laptop being on. This server reaches it through the `media-tunnel` user unit
(`~/.config/systemd/user/media-tunnel.service`, an `ssh -N -L` to davinci): MCP on
`127.0.0.1:18800`, davinci's `~/Downloads/gflow-cli` folder served on `127.0.0.1:18801`, the VNC
desktop on `127.0.0.1:15901`, and the workspace Chrome's DevTools port on `127.0.0.1:18802`.
Check with `ss -ltn | grep -E ':1880[012] '` and `systemctl --user status media-tunnel`.
`producerStatus()` "gflow ok" is only a port probe; `gflow_auth_status` over MCP proves the session.

On davinci (user `ubuntu`, linger on; everything binds to localhost only):
- `tigervncserver@:1` (system unit): persistent XFCE desktop on display `:1`, config in
  `~/.vnc/tigervnc.conf`, password in `~/.vnc/passwd` (owner's copy `~/.config/tigervnc/owner-pass.txt`).
- `gflow-serve` (user unit): `gflow serve --host 127.0.0.1 --port 18800 --profile a2ahs-alpha`
  with `DISPLAY=:1` and `GFLOW_CLI_OUTPUT_DIR=~/Downloads/gflow-cli` (the folder name must end in
  `gflow-cli`: `gflowRelativePath()` strips everything up to it).
- `gflow-files` (user unit): `python3 -m http.server 18801` on that folder.
- `workspace-chrome` (user unit): a normal Chrome profile (`~/.local/share/workspace-chrome`) on
  `:1` for NotebookLM, meta.ai and Meta Business Suite, DevTools on `127.0.0.1:9222`.

The owner reaches the desktop from the laptop with `ssh -N -L 45901:127.0.0.1:15901
textbook-editor` and a VNC viewer on `localhost:45901` (Windows reserves 5901 and 15901 on the
owner's PC: "bind ... Permission denied"). Re-login there: `gflow auth login --browser chrome` in
a desktop terminal (`GFLOW_CLI_AUTH_LOGIN_TIMEOUT=1800`; finish the **Flow app** sign-in, not just
Google, or it times out), then turn Flow's Agent chip off. Chrome's yellow "unsupported
command-line flag: --disable-blink-features=AutomationControlled" bar is expected. Never leave a
test clip in `~/Downloads/gflow-cli`: the clip producer adopts unclaimed `.mp4` files there.

**Fallback, the owner's Windows PC** (stop `media-tunnel` first; only one route can hold 18800).
Command Prompt; Smart App Control blocks uv launchers and `gflow.exe`, so always `py -3.12 -m`:
`py -3.12 -m pip install --user -U gflow-cli` (at least 0.102.1),
`py -3.12 -m gflow_cli auth login --browser chrome` (profile `a2ahs-alpha`), then keep three windows:
- `py -3.12 -m gflow_cli serve --host 127.0.0.1 --port 18800 --profile a2ahs-alpha`
- `py -3.12 -m http.server 18801 --bind 127.0.0.1 -d "%USERPROFILE%\Downloads\gflow-cli"`
- `ssh -N -R 18800:127.0.0.1:18800 -R 18801:127.0.0.1:18801 textbook-editor` (silent when up; no
  `RemoteForward` in the SSH config and VS Code `remote.autoForwardPorts` off).

Known failure modes:
- **"remote port forwarding failed"** (PC fallback): `media-tunnel` or a stale session holds the
  ports; stop the unit or end the old `sshd: a2ahs` processes. A leftover `gflow serve` gives
  WinError 10048 on 18800.
- **UiSelectorDriftError before submit (no spend):** Flow's agent sidebar is open; close it in
  gflow's Chrome window and turn the Agent chip off (the classic composer is required).
- **ConfigurationError "no duration control offering '8s'":** omit `duration` (clips are 8 s anyway).
- **"Error executing tool":** a structlog TypeError masks the real error; read the serve window. It
  can come after Flow already billed the clip, which is why retakes go through recovery.
- **Socket hang up / ECONNRESET:** reused connections through the tunnel; the producers open a
  fresh one per request.
- **Images saved as `.jpg` while gflow names `.png`:** the image producer tries the other suffixes
  and the folder (2026-11-21 HTTP 404).
- Every tool call needs `profile` (the default `default` no longer exists).

Credits: `veo_lite` 10 a shot, `veo_fast` 20, `veo_quality` 100; a five-shot Short is 50 on Lite.
The clip producer keeps a 100-credit floor. Google AI Pro gives 1,000 a month plus 50 a day.

## Daily update posts (Feature 031)

The crew's daily roundup of deployed work (new content, reviews, revisions, public media,
user-facing features) as a branded card on Facebook, Instagram and LinkedIn: see the
**social-updates** skill (`scripts/social/`).

## YouTube

Channel `UC7cQfkGkdNABCiyjmV5ZaFQ` (@textbookdotcomdotpk); authentication guide in the studio-media
skill. Teaser playlist `PLCJn7gAoYIJs`. Edit a published description in place with
`node scripts/notebook-studio/yt-describe.mjs`, never by re-uploading. After publishing or
cross-posting, run `node scripts/notebook-studio/teaser-stats.mjs` (1 quota unit) and commit
`specs/studio/teaser-stats.json`: the home page shows the two most watched and the two
newest public teasers, and the site build has no YouTube sign-in.
