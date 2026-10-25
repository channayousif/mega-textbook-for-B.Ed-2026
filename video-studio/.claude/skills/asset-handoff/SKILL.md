---
name: asset-handoff
description: Turn an approved script.json into handoff.md - the owner's exact steps in Google AI Studio (Urdu TTS), Google Flow (Veo 3.1 B-roll) and Gemini/ChatGPT (illustrations) - then ingest and validate the files dropped in inbox/. Use for /video-assets and whenever a subscription-UI step is needed.
---

# Asset handoff (subscriptions-only bridge)

> Primary UI is the Studio (VS-002): the Voices and Visuals stages render from the manual
> providers' `describe()`, which must produce the same content as sections A–C below. Keep
> `handoff.md` generation as the terminal fallback. When a tool's UI changes, update BOTH this
> file and `studio/server/providers/manual/*`.

The pipeline never calls a paid API. Anything generative is done by the owner in a UI, guided
by `episodes/<id>/handoff.md`. This skill is the ONLY place UI steps are described - when a
tool's UI changes, update this file.

## 1. Write handoff.md (status must be `script_approved`)
Structure it as a checklist, grouped by tool so each tool is one sitting:

### A. Voices - from the ACTIVE voice provider (`config/providers.yaml`)
Until VS-003 locks a voice, the provider is `manual-import`: list each line with the locked
voice card's instructions (or narrator recording instructions) and expected filename.
The AI Studio steps below apply only if that provider wins the benchmark.

#### If the locked voice is Google AI Studio speech generation
For each character (one sitting per character):
- Model: the newest Gemini TTS model available in AI Studio. Mode: **single speaker**.
- Voice: `characters.<key>.voice.name` (exact).
- Style instructions: `characters.<key>.style_prompt` + line `delivery` (if any).
- Paste ONE line at a time (text_ur with lexicon respellings applied).
- Download → save as `inbox/<line_id>_<character>.wav` (e.g. `L03_ustani.wav`).
List every line in a table: line id · character · delivery · text to paste.

### B. B-roll - Google Flow (current fast/low-cost Veo model) - only if the script has broll
Model names and credit prices change: the owner records the model name and credits actually
charged as shown in Flow at generation time; never hard-code them.
- Aspect 9:16, 8 s, audio OFF if the option exists (we mute anyway).
- Text-to-video, or Frames-to-video with a set image from `brand/assets/sets/` as the first frame for continuity.
- Paste prompt exactly; generate up to 2 takes, pick the best.
- Save as `inbox/<shot_id>.mp4`. Record credits used.

### C. Illustrations - Gemini app (image) or ChatGPT (image) - only if listed
- Attach character turnaround sheet if a character appears.
- Ask for vertical 9:16. Save as `inbox/<shot_id>.png`.

End the file with: "When done, run `/video-assets <id>` again."
Update `episode.json.assets.required` and status `awaiting_assets`.

## 2. Ingest (when inbox has files)
Run `npm run ingest -- <id>`. It:
- maps files to expected names (ask the owner if a mapping is ambiguous - downloads are often named generically);
- audio → 48 kHz mono WAV, trim leading/trailing silence >200 ms, loudnorm −16 LUFS;
- clips → 1080×1920 (scale+crop), 30 fps, audio stripped, max 8 s;
- images → 1080×1920 PNG (fit+pad with brand background);
- writes `received` / `missing`; adds credits to `queue/budget.json`;
- records each accepted file in `assets.manifest`: sha256, source_tool, prompt, take,
  rights_note (default per tool from `config/providers.yaml`, editable), imported_at, reviewed_by;
- increments `usage` counters (images, clips, voice attempts).
Never fetch, scrape or automate a subscription website to obtain files - the owner downloads them.

## 3. Asset review
Report per line: duration vs estimate (flag ±40%), clipping/silence, and a 1-line listening
note request for the owner (Claude cannot hear - ask the owner to confirm pronunciation of
lexicon terms). When complete → status `asset_review`. Only the owner approves.

## Known pitfalls
- AI Studio may name downloads by timestamp - download immediately after each line to keep order.
- Veo sometimes adds signage text: regenerate or reframe; never ship legible gibberish.
- If Urdu pronunciation is wrong, add/adjust the respelling in `pronunciation_lexicon` (that's how the system learns).
