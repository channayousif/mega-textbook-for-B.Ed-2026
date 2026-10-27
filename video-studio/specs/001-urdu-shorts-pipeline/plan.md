# Plan - VS-001 Urdu Shorts Pipeline

Implements `spec.md` under `memory/constitution.md`.

## 1. Architecture at a glance

```
textbook repo (Docusaurus, i18n/ur)
        │  read-only
        ▼
[1 Harvest] → queue/topics.json
        ▼
[2 Script]  Claude + urdu-script-writer skill → episodes/<id>/script.json
        │   reviewers: pedagogy + urdu           ⏸ GATE 1 script_approved
        ▼
[3 Handoff] asset-handoff skill → episodes/<id>/handoff.md
        │   owner works in subscription UIs:
        │     • voice per locked card (F003)→ Urdu voice lines (.wav)
        │     • Flow (current fast Veo model)→ 0–2 B-roll clips (.mp4, no dialogue)
        │     • Gemini / ChatGPT images    → 0–3 scene illustrations (.png)
        │   files dropped in episodes/<id>/inbox/
        ▼
[4 Ingest]  validate + normalise (FFmpeg) → audio/, clips/, images/
        │                                     ⏸ GATE 2 assets_approved
        ▼
[5 Align]   faster-whisper on Kaggle GPU (VS-ADR-0011) + script text → captions.json (word timings)
        ▼
[6 Render]  Remotion composition "UrduShort" on Kaggle → $MEDIA_ROOT/<id>/render/final.mp4
        │   reviewers: brand-qa + urdu (captions)  ⏸ GATE 3 render_approved
        ▼
[7 Publish] publish-pack skill → publish/<platform>.md + cover.png  → owner uploads
```

## 2. Key design choices (details in ADRs)
- **VS-ADR-0001** Remotion is the single assembler; generative tools only supply ingredients.
- **VS-ADR-0002** Characters are **2D puppets animated in Remotion** (layered PNG/SVG: body, head,
  eyes open/blink, 5 mouth shapes, 3 gestures). Mouth movement is driven by the voice track's
  amplitude. This guarantees 100% character consistency at zero credit cost. Veo is used only
  for B-roll/scene clips, never for the talking characters.
- **VS-ADR-0003** Voice: Gemini TTS via the **Google AI Studio UI** (free, manual export) as
  default; one locked voice preset + style prompt per character; each character's lines are
  generated separately (multi-speaker mode is unreliable at differentiating voices).
- **VS-ADR-0004** LongCat avatar is deferred until OQ1 is answered; slot reserved as an optional
  "presenter clip" source.

## 3. Repository layout (inside the textbook repo)

```
video-studio/
├── CLAUDE.md · memory/ · specs/ · history/adr/
├── brand/
│   ├── brand-bible.yaml
│   ├── characters/<name>.md            (approved character sheets)
│   └── assets/                         (puppet layers, logo, fonts, sting, music bed - not in git)
├── queue/topics.json · queue/budget.json
├── episodes/<YYYYMMDD-topic-id>/
│   ├── episode.json · script.json · handoff.md · captions.json · reviews/*.md
│   ├── inbox/ audio/ clips/ images/ render/ publish/
├── remotion/                           (Remotion project)
│   ├── src/Root.tsx                    (registers UrduShort, 1080×1920 @30)
│   ├── src/UrduShort.tsx               (reads episode props)
│   ├── src/components/{Puppet,Captions,Beat,BRoll,LowerThird,EndCard,Sting}.tsx
│   └── src/brand.ts                    (generated from brand-bible.yaml - never hand-edited)
├── scripts/                            (Node/TS CLI used by slash commands)
│   ├── harvest.ts · new-episode.ts · ingest.ts · align.ts · render.ts · audit.ts · status.ts
│   └── lib/{episode.ts, schema.ts, ffmpeg.ts, brand.ts}
└── .claude/{skills,agents,commands}
```

## 4. Stack
| Concern | Choice | Cost |
|---|---|---|
| Orchestration | Claude Code + slash commands + skills | Claude Pro |
| Language | TypeScript (Node ≥20), `tsx` runner, `zod` + JSON Schema validation | free |
| Video assembly | Remotion 4 + official `remotion-dev/skills` | free (individual/small-team licence - confirm terms) |
| Media utils | FFmpeg / ffprobe, `loudnorm` filter (on Kaggle or the owner's PC; not installed on the production host) | free |
| Caption timing | `faster-whisper` `large-v3` on the Kaggle T4 (CUDA), forced to script word order | free (Kaggle quota) |
| Media compute | Kaggle notebook, T4 x2, private datasets, `kaggle` CLI (VS-ADR-0011) | free (about 30 GPU h/week) |
| Urdu fonts | Noto Nastaliq Urdu (captions), Noto Sans Arabic UI fallback | free (OFL) |
| QR | `qrcode` npm | free |
| Voice | Gemini TTS in Google AI Studio (manual) | free/subscription |
| B-roll | Current fast Veo model in Flow (record model + credits at use) | Google AI Pro credits |
| Images / puppet design | Gemini (Nano Banana) / ChatGPT images | subscriptions |

## 5. Composition timeline (default 52 s @ 30 fps)
| Segment | Time | Content |
|---|---|---|
| Sting | 0.0–0.8 s | logo sting (brand) |
| Hook | 0.8–4 s | character A asks a question; big Urdu title text |
| Beat 1–3 | 4–40 s | character explains; each beat has one visual (illustration, B-roll, or animated diagram) |
| Recap | 40–46 s | one-line takeaway card |
| CTA | 46–52 s | character B gives CTA; end card with URL + QR |

Beats may be animated diagrams built in Remotion (lists, comparisons, cycles) - the default,
since they cost nothing and teach clearly. B-roll is used where an atmosphere shot helps.

## 6. Phases (see tasks.md)
0 Bootstrap · 1 Brand & cast · 2 Harvest + script · 3 Handoff + ingest · 4 Remotion template ·
5 Align + render + audits · 6 Publish pack + status · 7 Pilot (3 episodes) and retrospective.

## 7. Risks
| Risk | Mitigation |
|---|---|
| Urdu TTS mispronounces terms | Pronunciation lexicon in brand bible (respellings); reviewer listens; regenerate single lines |
| Whisper mis-hears Urdu | Align to known script (forced alignment by word order), not free transcription |
| Nastaliq rendering/line-break issues | Fixed caption chunking (≤4 words/line, 2 lines), visual test frames in audit |
| Flow credits run out | Default to Remotion-animated beats; ≤2 clips/episode; budget file warns at 80% |
| Veo generates on-screen gibberish text | Prompts forbid text; all text is overlaid by Remotion |
| UI tool changes | Handoff skill is the only place UI steps live; update one file |


## 2026-10-25 corrections
Voice default is manual import pending VS-ADR-0009 benchmark, not a verified Gemini Urdu preset. Flow models/credit costs are checked at handoff time. Whisper alignment is not accepted without manual timing review. The 002 Studio console is specified, not implemented.

## 2026-10-26 corrections (Kaggle runner, media out of git)
Heavy media stages (align, render, audit, stills, and optionally ingest normalisation) run on a
Kaggle notebook (VS-ADR-0011); the production host only packs, pushes, fetches and verifies. All
media lives under `$MEDIA_ROOT` outside the working tree (VS constitution XIII). New scripts:
`scripts/kaggle-pack.ts`, `scripts/kaggle-run.ts`, `scripts/kaggle-fetch.ts`, notebook
`kaggle/render.ipynb` (pinned versions). Colours, fonts and logo come from the site (brand bible).

