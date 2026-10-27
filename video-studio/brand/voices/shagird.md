# Voice card: Bilal (بلال)

- **Status:** locked by the owner, 2026-10-27 (V005, chat approval "ok approve"; PHR 0890). **Not cleared to publish:** see the rights line.
- **Provider / engine:** Chatterbox Multilingual, Hindi finetune `ResembleAI/Chatterbox-Multilingual-hi` (`chatterbox-hi` in `specs/003-urdu-voice-benchmark/candidates.json`), `chatterbox-tts` at commit `5de7a54aa4e5e2baadb0182dde554908b48b85c2`, run on Kaggle (VS-ADR-0011).
- **Input:** Devanagari spelled by Urdu pronunciation, `language_id` `hi`; terms follow `pronunciation_lexicon` in `brand/brand-bible.yaml` (`deva` / `en_deva`, joined izafat).
- **Settings:** default style, `exaggeration` 0.5, `cfg_weight` 0.5 (round 5: the adjusted styles sounded similar, owner 2026-10-27). Seeds are recorded per take; GPU runs are not bit-exact, so each take is hashed on import.
- **Reference:** `$MEDIA_ROOT/voice-benchmark/refs/ref-shagird-sample-male.wav`, SHA-256 `a100f48d06b188dd698a54c762797ec240d47d9288a72b11376386751af8be53`; first 13.4 s of a 38.2 s ElevenLabs-generated male sample (C2PA author Eleven Labs Inc.). Original `owner-samples/sample-male.mp3`, SHA-256 `2bd85153b4417bec1bbc3286e7f7f38cb00497a502add49b12416d2180ad26f1`. Audio never enters the repo.
- **Style prompt:** none (Chatterbox clones the reference; the brand `style_prompt` applies to manual providers only).
- **Evidence:** rounds 4-5: all takes usable across seeds (round 4), stress test of 10 questions (round 5).
- **Licence / consent:** engine MIT (outputs carry Resemble's inaudible Perth watermark). **Reference voice rights NOT secured:** the voice is ElevenLabs-generated and was supplied for evaluation only (owner ruling 2026-10-27). Before any episode with this voice passes the render gate, the owner records the rights basis here (an ElevenLabs plan whose terms cover this use, or a consented recording with a PI-08 consent id), or replaces the reference, which needs an ADR and a re-run of the consistency check.
- **Changing this card needs an ADR.**
