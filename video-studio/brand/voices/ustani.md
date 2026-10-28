# Voice card: Ustani Farzana (استانی فرزانہ)

- **Status:** locked by the owner, 2026-10-27 (V005, chat approval "ok approve"; PHR 0890). **Not cleared to publish:** see the rights line.
- **Provider / engine:** Chatterbox Multilingual, Hindi finetune `ResembleAI/Chatterbox-Multilingual-hi` (`chatterbox-hi` in `specs/003-urdu-voice-benchmark/candidates.json`), `chatterbox-tts` at commit `5de7a54aa4e5e2baadb0182dde554908b48b85c2`, run on Kaggle (VS-ADR-0011).
- **Input:** Devanagari spelled by Urdu pronunciation, `language_id` `hi`; terms follow `pronunciation_lexicon` in `brand/brand-bible.yaml` (`deva` / `en_deva`, joined izafat).
- **Settings:** default style, `exaggeration` 0.5, `cfg_weight` 0.5 (round 5: the adjusted styles sounded similar, owner 2026-10-27). Seeds are recorded per take; GPU runs are not bit-exact, so each take is hashed on import.
- **Reference:** `$MEDIA_ROOT/voice-benchmark/refs/ref-ustani-sample.wav`, SHA-256 `f64ce7fc47df3171a4426df368f6abc138f26958c80bfd4e7437f6ad2f8a8932`; first 13.3 s of a 44.1 s ElevenLabs-generated female sample (C2PA author Eleven Labs Inc.). Original `owner-samples/Sample.mp3`, SHA-256 `4248b4dd6fffd3134d39bb126b354dceaccf1274db4710f9dabb688d7cb854a0`. Audio never enters the repo.
- **Style prompt:** none (Chatterbox clones the reference; the brand `style_prompt` applies to manual providers only).
- **Evidence:** rounds 3-7: owner pick U12 (round 3), all takes usable across seeds (round 4), stress test (round 5), lexicon check (round 7: ECAPA similarity to the centroid 0.94 mean, 0.89 min over 87 clips).
- **Licence / consent:** engine MIT (outputs carry Resemble's inaudible Perth watermark). **Reference voice rights NOT secured:** the voice is ElevenLabs-generated and was supplied for evaluation only (owner ruling 2026-10-27). Before any episode with this voice passes the render gate, the owner records the rights basis here (an ElevenLabs plan whose terms cover this use, or a consented recording with a PI-08 consent id), or replaces the reference, which needs an ADR and a re-run of the consistency check.
- **Changing this card needs an ADR.**
