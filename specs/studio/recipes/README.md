# specs/studio/recipes

Versioned prompt and pacing recipes, one file per `<name>@<version>.json`. Every media job records the recipe version it used (FR-009).

- `teaser@1.json`: batches 1 and 2 (voice-over only, voice 1.12x, 22 Urdu words a line). A teaser script without a `recipe` field uses it.
- `teaser@2.json`: recipe v2 (D-2026-0094): presenter on camera in shots 1 and 5, voice-over over named camera moves in shots 2-4, voice 1.25x, 18 Urdu words a line, at most 30 s (QG1 fails a longer Short).

Schema: `specs/studio/recipe.schema.json`. Loader and prompt builder: `scripts/media/recipes.mjs`. The aspect ratio is a generator argument and never appears in a prompt (the words "9:16" made Veo draw viewfinder marks).
