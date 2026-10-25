---
name: urdu-script-writer
description: Write a 45–60 second Urdu teaching script (script.json) for one textbook.com.pk page, following the two-character format, pedagogy rules and the script contract. Use for /video-new and any script revision.
---

# Urdu script writer

## Inputs
`episode.json`, the topic from `queue/topics.json`, the Urdu source page (and English page for
terminology checks), `specs/content/terminology.csv` + `glossary.json` (parent repo), `brand/brand-bible.yaml`, `contracts/script.schema.json`.

## Steps
0. If the Urdu page is missing or incomplete, stop and ask the owner. Only with their OK, adapt
   from the English page and set `source.language: en-adapted` (VS-004 PI-01); reviewers
   must check the terminology against the parent repo's frozen term bank `specs/content/terminology.csv` (term_en,term_ur) and `glossary.json`, then the Urdu source page.
1. Read the whole Urdu page. Pick ONE idea (use `candidate_ideas` if present). Write the
   learning objective in Urdu + English (observable verb: identify, distinguish, list, apply).
2. Copy 2–5 short source excerpts verbatim into `source.excerpts` with ids E1…E5.
3. Draft lines using this shape (adapt, don't pad):
   - **hook** (shagird, ≤12 words): a question or relatable classroom moment. Never "Assalam-o-Alaikum, aaj hum…".
   - **beat1–beat3** (mostly ustani): one point each, one example each; shagird may react in ≤6 words.
   - **recap** (ustani, ≤15 words): the one-sentence takeaway.
   - **cta** (shagird): from `cta_templates`, URL = the topic's `url_ur`.
4. Total 110–150 spoken words. Lines ≤22 words each (TTS and caption chunking).
5. Every beat/recap line lists `source_excerpt_ids`. If you need a fact not on the page, drop it.
6. Choose a visual per line. Prefer `diagram` (free, clear). Use `broll` for at most 2 lines and
   only where atmosphere helps (classroom scene, school exterior). Use `illustration` for a
   specific situation a diagram can't show. Write prompts in English and end them with the
   brand `art_style.prompt_suffix`. B-roll prompts: 8 seconds, vertical 9:16, slow camera
   move, no people speaking, no text.
7. `on_screen_title_ur` ≤40 chars.
8. Fill `stats` (word count; est_seconds = words / pace × 60 + 2.5 s for sting/end card).
9. Validate against the schema. Then run the `pedagogy-reviewer` and `urdu-language-reviewer`
   subagents; save their reports to `reviews/`. Fix blocking issues once, re-run, then set
   status `script_review` and show the owner: the Urdu lines, objective, visuals list, reviewer summary.

## Urdu style
- Standard Urdu, short sentences, active voice. Address viewer as "آپ".
- Technical terms: use the site's Urdu term; add the English in brackets only the first time
  and only if the site does. Apply `pronunciation_lexicon` respellings only in the TTS handoff,
  never in captions.
- Numbers: write as words in `text_ur` for speech ("تین مراحل"); diagrams may use digits per brand.
- Avoid: exam guarantees, "سب سے بہترین", English filler ("so", "basically"), religious or political asides.

## Example (shape only)
hook (shagird): "سوال بنانا آسان ہے… لیکن اچھا سوال کیسے بنتا ہے؟"
beat1 (ustani): "دیکھیے، بلوم کی درجہ بندی سوچ کے چھ درجے بتاتی ہے - یاد رکھنے سے لے کر تخلیق تک۔" [diagram: pyramid]
