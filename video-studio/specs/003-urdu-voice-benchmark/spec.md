# VS-003 - Urdu voice engine proof of concept

## User story
As a Mega Textbook editor, I can generate or import an approved **Urdu** voice for each recurring animated character using my current subscriptions or eligible free open-source tools, then reuse that voice across episodes without introducing paid API dependencies.

## Acceptance criteria
- Voice provider remains an optional manual step; production is not blocked by any single AI TTS UI.
- Five-part asset metadata includes source provider/model, voice preset/reference, output SHA-256, license/consent note and owner acceptance.
- Three test takes judged by owner, with one standard pedagogy passage and correct native Urdu text.
- No auto-generated captions accepted without Urdu proofreading and audio timing validation.
- CLI imports WAV or MP3 and normalizes to PCM 48kHz; no synthetic audio generated during rendering.
- Do not assume reusable identity across provider sessions; fail acceptance test if voice drifts.

## Tasks
- [x] V001 inspect current provider interfaces/docs and commercial rights.
- [x] V002 script benchmark and select 30–45 second passage.
- [ ] V003 collect 3 independent takes per candidate (manual or free offline).
- [ ] V004 create blinded listening worksheet, record owner ratings.
- [ ] V005 lock chosen provider/voice/prompt and pronunciation lexicon.
- [ ] V006 implement file-import validation and hash provenance (with PI007: consent scope + correction history).
- [ ] V007 render one short with chosen voice and manual sentence-alignment fallback.

## Progress (2026-10-26)
- V001: candidates and licences in `candidates.json` (MMS-TTS Urdu CC-BY-NC-4.0; Indic Parler-TTS Apache-2.0, gated) plus Google AI Studio (manual, `handoff-ai-studio.md`).
- V002: `passages.json`: Ustani 133 words from EFMP-301 U1 topic 1.1 (Urdu mirror, commit a62dc130); Bilal 37 words (hook + CTA).
- V003 (open-source part): `npm run voice:bench -- all` on Kaggle T4 x2 (`kaggle/voice_bench.py`): 3 seeded takes per character per candidate, loudnorm -16 LUFS, hash-verified. First run: MMS 6 takes in 46 s; Parler skipped until the `HF_TOKEN` Kaggle secret is attached.
- V004: `npm run voice:blind` builds the blind folder and scorecard in `$MEDIA_ROOT/voice-benchmark/`; `--unblind` writes `results-<date>.csv` here.

- Round 1 rejected by the owner (2026-10-26, "i dont like any of those voices"): MMS and Parler are inactive in `candidates.json` and their takes are archived in `$MEDIA_ROOT/voice-benchmark/round1/`.
- Round 2 (2026-10-26): Hindi-trained engines reading a Devanagari transliteration (`passages-devanagari.json`, owner checks it), plus an Urdu tortoise finetune; all clone a reference voice. Candidates: `chatterbox-hi`, `chatterbox-v3` (MIT), `urdu-tts` (MIT); `indicf5` waits for the owner to accept its Hugging Face terms. References are FLEURS ur_pk speakers (CC-BY-4.0), for evaluation only: a published voice must clone a consented recording (PI-08). Still open: Seed-VC re-voicing of an owner recording; Azure Uzma/Asad and Gemini ur-PK/hi-IN takes by the owner (manual imports into `inbox/`).
- Round 2 scored (2026-10-27, owner ranking, `results-2026-10-26.csv`): best U05, U06 (both `chatterbox-hi`, one per reference voice) and B01 (`chatterbox-v3`); worst all six `urdu-tts` takes, so `urdu-tts` is dropped. Chatterbox Multilingual is the leading engine. Next: clone a consented owner-supplied reference with `chatterbox-hi`, and retry the V3 decoder. No voice is locked (V005 needs the owner's explicit approval).
