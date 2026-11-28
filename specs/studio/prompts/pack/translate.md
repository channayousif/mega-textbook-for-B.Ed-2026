# Subtitle translation (v1, Feature 038 stage 9)

Input: the checked English SRT. Output: `<name>.<lang>.srt` with the same cue numbers and times.
Languages: Urdu first, then 2-4 of Arabic, Hindi, Spanish, Bahasa Indonesia as the owner picks per
course. Drafts are marked `draft` in metadata.json `subtitles` until a fluent reader spot-checks
them; only then `checked`.

```prompt
Translate this SRT into <language>. Keep every cue number and timestamp exactly. Keep technical terms (attention, perception, working memory ...) in English with the translation in brackets the first time. Short natural sentences a teacher would say aloud; at most 42 characters a line, two lines a cue. Do not add or drop meaning.
```

For Urdu, also apply the v2 Urdu register suffix in `../_common.md`.
