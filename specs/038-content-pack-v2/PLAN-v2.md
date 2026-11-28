# PLAN-v2: Content Pack v2 audit, gaps, schemas and build order

Feature 038. Requirements are in `spec.md`; this file is the owner-review artefact the brief asks for
("show me before refactoring"). No refactor starts until the owner approves it.

Owner answers, 2026-11-28 (D-2026-0104):
1. Extend the live Media Studio (Feature 030). No new `video-pipeline/` tree.
2. A new cast for v2.
3. The one-page app is an admin page on the site, backed by Supabase.

## 1. Audit

The repository has two video systems.

**A. Media Studio, live** (`scripts/media/`, `scripts/notebook-studio/`, Feature 029/030, ADR-0037)

| Part | Where | v2 use |
|---|---|---|
| State vocabulary and per-kind paths | `scripts/media/states.mjs:5-31` | reuse, add pack kinds |
| Ledger engine, locks, upload cap (95/day) | `scripts/media/ledger.mjs` | reuse |
| Media hours and per-channel limits (`nlm.studio` 6/day, `youtube.upload` 4/day, Veo 200 credits) | `scripts/media/pacing.mjs` | reuse; pack budget reported |
| Producers (`nlm`, `gflow.video`, `manual.flow`, image) | `scripts/media/producers/` | reuse |
| Transcription (Workers AI whisper, local fallback) | `scripts/media/transcribe.mjs`, `qg2.mjs` (Feature 037) | reuse for SRT and highlights |
| Text drafts on Workers AI | `scripts/media/cfai-text.mjs` | reuse for caption drafts |
| QG1 technical check | `scripts/notebook-studio/media-qa.mjs` | reuse |
| Thumbnails | `scripts/notebook-studio/thumbnail.mjs` | reuse, new layout variant |
| YouTube metadata and description edits | `youtube-meta.mjs`, `yt-describe.mjs` | extend |
| Upload | `youtube-uploader` MCP (private first) | reuse |
| Placement on the site | `place-media.mjs` → `build-studio-index.mjs` → `src/components/Studio/StudioPanel.tsx` (mounted in `src/theme/DocItem/Content.tsx:462`) | reuse; this is the "embed block", no MDX edits |
| Crew stages and owner gates | `scripts/crew/media.mjs` | add `pack_*` stages |
| Kaggle render route | `scripts/media/kaggle-animate.mjs`, `kaggle/render_animations.py` (HyperFrames) | pattern for Remotion renders |

**B. video-studio sub-project** (ADR-0031, spec 027): Remotion 4.0.535 (`video-studio/remotion/src/`),
Kaggle T4 render job (`video-studio/kaggle/render.py`), puppet rig tools, a static console mock
(`video-studio/ui-prototype/studio.html`) and the VS-002 console spec. Of these, v2 reuses only the
Remotion project and the Kaggle render job.

## 2. Gaps

| Gap | Evidence |
|---|---|
| NotebookLM intro and outro are never trimmed | `audio-to-video.mjs:9` copies the picture untouched |
| No highlight finder, no 16:9 → 9:16 reframe of lesson video | only Veo shot crops in `assemble-teaser.mjs:5-6` |
| No `longform`, `short`, `infographic` kinds | manifest enum, `studio-manifest.schema.json:22` |
| No SRT or multi-language subtitle output; no multi-audio track | none |
| Video playlist IDs passed by hand | studio-media SKILL.md:201-208; only `TEASER_PLAYLIST` in `brand.mjs` |
| No one-page app | only the mock |
| Remotion compositions are Urdu-only | `remotion/src/UrduShort.tsx` hardcodes `lang="ur"`, RTL, Nastaliq |
| No character bible for an international cast | puppets only, `video-studio/brand/characters/` |
| No Supabase table for media work | all state in JSON ledgers |

## 3. Conflicts retired (D-2026-0104)

- D-2026-0083 (Urdu-only teasers) and the teaser-as-advert model: teaser@3 stays only for teasers
  already in flight; new video work is packs.
- The audience line in `specs/studio/prompts/_common.md` (Sindh/Pakistan B.Ed): pack prompts use an
  international audience; v1 prompts stay for existing rows.
- Ustani Farzana and Bilal puppets: not used in new packs (their files and consents stay).
- `video-studio/specs/001.../script.schema.json:20` (`language` const `ur`): pack compositions take a
  `locale` prop.
- Published teasers and placed Study Studio rows are not touched.

An ADR is suggested ("Content Pack v2 supersedes the teaser model", amending ADR-0037), created only
with the owner's consent.

## 4. File and folder changes

```
specs/038-content-pack-v2/          spec, PLAN-v2, plan, tasks
specs/studio/characters/            _style-guide.md, <slug>/{profile.yaml,voice.yaml,prompt-block.txt,sheet.md}
specs/studio/flow/                  prompt-formula.md, shot-list.template.csv, credit-log.csv, library.md
specs/studio/prompts/pack/          script.md, angle.md, notebooklm-steering.md, flow-shot.md, metadata.md, translate.md
specs/studio/packs/<course>/unit-NN/topic-NN/   script.md, angle.md, shots.csv, metadata.json, cuts.json, highlights.json
scripts/media/pack/                 intake.mjs, debrand-notebooklm.py, transcribe-srt.mjs, find-highlights.mjs,
                                    reframe-vertical.mjs, make-metadata.mjs, make-embed.mjs, README.md
video-studio/remotion/src/pack/     LongformFrame, ShortVertical, Opener, Closer, ChapterCard, InfographicFooter
src/pages/app/admin/content-packs.tsx + src/lib/contentPacks.ts
supabase/migrations/0060_content_packs.sql (next free number when written)
static/studio/characters/<slug>/    locked sheet images (WebP)
.claude/skills/studio-pack/SKILL.md new; media-studio and studio-teaser skills updated
$MEDIA_ROOT/packs/<course>/<unit>/<topic>/   all video, audio, image and SRT files (never in git)
```

Studio files stay out of `specs/content/`, `contracts/` and `scripts/lib/gates.mjs`, so no review
evidence goes stale.

## 5. Data schemas

**Supabase (owner approval required before the migration is written).** Same pattern as
`0059_owner_decisions.sql`: read through `is_admin()` RLS, writes only through `security definer`
RPCs that log to `admin_action_history`.

```sql
content_packs (
  id uuid pk, course text, unit int, topic int, track text check (track in ('bed','licence')),
  title text, slug text, primary_locale text default 'en',
  stages jsonb not null default '{}',   -- {"intake":{"status":"done","at":..,"by":..,"notes":..}, ...}
  links jsonb not null default '{}',    -- {"longform":"https://youtu.be/..","shorts":[..],"deck":..}
  watermark_toggle text,                -- 'off-official' | 'not-available' | 'regenerated'
  created_at, updated_at, unique (course, unit, topic)
)
content_pack_events (id, pack_id fk, stage text, action text, detail jsonb, actor uuid, at timestamptz)
storage bucket content-pack-uploads   -- private, admin only, cleared after a pack is placed
```

**Stage keys** (12): `intake, angle, script, notebooklm, flow, longform, shorts, static, metadata, qa,
publish, learn`. Status per stage: `todo | in-progress | waiting-owner | done | skipped`.

**Manifest additions** (`studio-manifest.schema.json`): kinds `longform`, `short`, `infographic`,
`deck_pdf`; optional fields `playlist`, `related_video` (a short's long video), `chapters`
(`[{t:"00:00",title}]`), `captions` (`[{locale,src}]`), `audio_tracks` (`["en","ur"]`). `longform`
and `short` follow the YouTube `host_url` rule.

**Media kinds** (`states.mjs`): `video.longform` and `video.short` take the scripted path (script and
owner approval before credits); `doc.infographic` takes the DOC path.

**`metadata.json`** (per pack, in git): `titles[3]`, `description`, `chapters[]`, `tags[]`,
`thumbnail_text[2-3]`, `pinned_comment`, `disclosure`, `sources[]`, `platform_captions{youtube,
instagram, tiktok, facebook, linkedin}`, `subtitles[{locale, status: draft|checked}]`, and per short
`{id, hook, start, end, related_video}`.

**`cuts.json`**: `{source, duration, intro_end, outro_start, method: scenedetect|blackdetect|fallback,
confirmed_by, confirmed_at}`. Rendering refuses an unconfirmed file.

## 6. Build order

Each stage is its own PR with a PHR and runs on its own.

| Stage | Delivers | Owner checkpoint |
|---|---|---|
| 0 | This plan, spec, tasks, D-2026-0104 | approve PLAN-v2 |
| 1 | Supabase migration and RLS tests; manifest and state kinds; playlist map | approve migration |
| 2 | Character bible and style guide; sheets via gflow Nano Banana; `gflow_character_create` | lock the cast |
| 3 | Flow kit (formula, shot list, credit log, library) | none |
| 4 | Pack scripts: intake, debrand, SRT, highlights, reframe, metadata, embed | confirm cut points on the sample |
| 5 | Remotion pack templates (locale-aware), rendered on Kaggle | approve the look |
| 6 | Admin page `/app/admin/content-packs` with 12 stage panels | none |
| 7 | Pack prompt templates; v2 audience section in `_common.md` | none |
| 8 | Crew `pack_*` stages, pacing report, Shorts schedule | none |
| 9 | One sample pack end to end (candidate EFMP-301 Unit 4 Topic 1), private upload, report | script approval, publish |

**Budget note.** A pack uses 4 NotebookLM studio calls (explainer video, deck, mind map, infographic)
against the 6 a day cap of D-2026-0100: about 1.5 topics a day on one account, more with the second
account (Feature 036). Flow credits are logged per pack in `credit-log.csv`.

## 7. Hard rules

- SynthID and C2PA marks are never removed or defeated; nothing aims at undetectability.
- Visible watermarks: official toggle or regenerate, never blur or inpaint. The toggle's status is
  recorded per pack.
- NotebookLM de-branding is trimming and replacement only.
- Characters are clearly animated and never presented as credentialed experts; the authority is the
  real faculty.
- Renders on Kaggle; local heavy jobs through `scripts/heavy.sh`; no heavy jobs in subagents.
- No em dashes; a PHR with every PR; existing subscriptions only.
- Remotion licence terms are checked before Stage 5; the fallback is ffmpeg with HyperFrames.
