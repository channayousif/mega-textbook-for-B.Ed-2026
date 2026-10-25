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
- [ ] V001 inspect current provider interfaces/docs and commercial rights.
- [ ] V002 script benchmark and select 30–45 second passage.
- [ ] V003 collect 3 independent takes per candidate (manual or free offline).
- [ ] V004 create blinded listening worksheet, record owner ratings.
- [ ] V005 lock chosen provider/voice/prompt and pronunciation lexicon.
- [ ] V006 implement file-import validation and hash provenance (with PI007: consent scope + correction history).
- [ ] V007 render one short with chosen voice and manual sentence-alignment fallback.
