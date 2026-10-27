# Voice benchmark handoff: Google AI Studio takes (manual, owner)

Part of VS-003 (V003). You generate these by hand in your own Google AI Studio account; nothing is
automated (VS constitution V). Claude imports and blinds them with the open-source takes.

## Where
https://aistudio.google.com/generate-speech (single-speaker mode). Verify the page at use time; if
Urdu is not offered, note "not available" in `$MEDIA_ROOT/voice-benchmark/inbox/NOTES.txt` and skip.

## What to generate
For each character, paste the text from `passages.json` (`ustani` or `shagird`), choose a voice,
paste the style prompt, and download **3 separate takes** (regenerate between takes; do not edit).

| Character | Text | Style prompt (paste as is) | Voice to try |
|---|---|---|---|
| Ustani Farzana | `passages.json` → `ustani` | Read in clear, standard Pakistani Urdu like a warm, confident teacher educator. Moderate pace, friendly and encouraging. Pronounce Urdu words natively; do not use a Hindi accent. | a female voice you like; write its name in NOTES.txt |
| Bilal | `passages.json` → `shagird` | Read in natural conversational Pakistani Urdu like a curious, upbeat young trainee teacher. Slightly faster pace. Say "textbook.com.pk" as "text book dot com dot pee kay". | a male voice you like; write its name in NOTES.txt |

## File names (save to the server, outside the repo)
`$MEDIA_ROOT/voice-benchmark/inbox/` (default `~/video-studio-media/voice-benchmark/inbox/`):

- `ai-studio_ustani_take1.wav`, `ai-studio_ustani_take2.wav`, `ai-studio_ustani_take3.wav`
- `ai-studio_shagird_take1.wav`, `ai-studio_shagird_take2.wav`, `ai-studio_shagird_take3.wav`

WAV or MP3 both work. Add one line per character to `NOTES.txt`: voice name, model shown on the
page, and the date. Then tell Claude "AI Studio takes are in".

## Optional: a human narrator
Same file pattern with `narrator-<id>_<character>_takeN.wav`, plus a consent record in
`$MEDIA_ROOT/consents/` (brand/consents/README.md). Never commit recordings or consents.
