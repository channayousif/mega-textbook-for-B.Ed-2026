# Content pack scripts (Feature 038, Stage 4)

One topic, one pack (ADR-0040). Each script runs on its own, reads and writes plain files, and has a
pure core covered by `tests/unit/media-pack-scripts.test.mjs`. Media goes to
`~/studio-media/packs/<course>/unit-NN/topic-NN/` (override `MEGA_BOOK_PACK_ROOT`); small text files go
to `specs/studio/packs/<course>/unit-NN/topic-NN/`. None of these files is imported by a content gate.

| Stage | Script | Does |
|---|---|---|
| 1 Intake | `intake.mjs <course> <unit> <topic>` | topic MDX, unit outcomes, sections, sources into `topic.json` |
| 6 Long-form | `debrand.mjs detect / confirm / render` | finds the NotebookLM outro logo card (and a logo intro if any), reports the title-slide span, trims only after the cut points are confirmed |
| 7 Shorts | `captions.mjs <video> --lang en --out-dir <dir>` | SRT, word timings and text from Workers AI whisper (free allowance) |
| 7 Shorts | `highlights.mjs <words.json> [--script script.md]` | ranks 20-60 s Short candidates, all unapproved until the owner approves |
| 7 Shorts | `reframe.mjs <long.mp4> --start --end --out` | 9:16 base clip: stacked slide layout, or a centred crop for one-speaker shots |
| 9 Metadata | `metadata.mjs draft / check / youtube` | metadata.json from topic and script; checks titles, chapters, sources, disclosure, captions; private upload payloads |
| 11 Publish | `embed.mjs <course> <unit> <topic> --links links.json` | manifest rows for the topic page (StudioPanel renders them; no MDX edits) |

Example on EFMP-301 Unit 4 Topic 1:

```bash
node scripts/media/pack/intake.mjs efmp-301 4 1
V=~/studio-media/efmp-301/unit-04/topic-01/t1-en-video.mp4; P=~/studio-media/packs/efmp-301/unit-04/topic-01
node scripts/media/pack/debrand.mjs detect $V --out $P/cuts.json
node scripts/media/pack/debrand.mjs confirm $P/cuts.json --by "curriculum owner"     # owner step
node scripts/media/pack/debrand.mjs render $P/cuts.json --out $P/longform.trimmed.mp4
node scripts/media/pack/captions.mjs $P/longform.trimmed.mp4 --lang en --out-dir $P
node scripts/media/pack/highlights.mjs $P/longform.trimmed.en.words.json --script specs/studio/packs/efmp-301/unit-04/topic-01/script.md --out $P/highlights.json
node scripts/media/pack/reframe.mjs $P/longform.trimmed.mp4 --start 16.8 --end 42.8 --out $P/short-01.base.mp4
node scripts/media/pack/metadata.mjs draft efmp-301 4 1 --words $P/longform.trimmed.en.words.json
```

Rules the scripts keep: the small "Gemini Notebook" mark in the corner of NotebookLM slides stays
untouched (owner ruling 2026-11-28; our frame is laid out around it); trimming only (no blur, crop-out or inpainting of a watermark; SynthID and
C2PA untouched); every upload private first with the synthetic-media flag; the disclosure line is
fixed in `metadata.mjs` (`DISCLOSURE`); renders of full videos go through `scripts/heavy.sh`.

The brief named Python scripts (`debrand_notebooklm.py` and others). They are Node here to match the
repository and reuse its ffmpeg, Workers AI and manifest code; PySceneDetect was not needed because
ffmpeg's scene score found every cut on the three test videos.
