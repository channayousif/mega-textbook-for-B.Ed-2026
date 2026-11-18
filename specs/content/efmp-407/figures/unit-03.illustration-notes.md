# EFMP-407 Unit 3 illustration handoff

The topic manifest contains six placed schematics and no illustration rows. The topic-scene generation command therefore has no matching rows; new scene prompts belong to the English author.

The unit banner (fig-U3-7) was generated via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 3 --banner` and inspected before placement.

There is no EFMP-407 Urdu Unit 3 mirror in this checkout yet, as translation is blocked pending English author repairs. When the translation job creates `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/index.mdx`, place this banner after the unit title, reusing the English WebP:

```mdx
<Figure id="fig-U3-7" src="/img/figures/efmp-407/unit-03/fig-U3-7.webp" alt="سندھ کے ایک کلاس روم میں زیرِ تربیت اساتذہ اور ان کی رہنما استانی پائیدار ترقی کے منصوبوں کا جائزہ لے رہے ہیں جو مقامی برادریوں کو عالمی ترقیاتی اہداف سے جوڑتے ہیں۔" kind="illustration" />
```

The Urdu alt text is a draft for the translation and independent Urdu review jobs. No G3/G5 certification or translation status changes are made by this illustration job.

## Production and inspection

On 2026-11-07, the required topic command returned no matching rows. The banner command generated `fig-U3-7.png` with agy (Imagen) in 336 seconds and optimized it to `static/img/figures/efmp-407/unit-03/fig-U3-7.webp` (1376x768 WebP, 61.7 KB, well within the 150 KB budget).

Visual inspection against prompt and alt text:
- Bright government higher secondary school classroom setting in Sindh with tall windows, classroom desks, and clean green chalkboard in natural daylight.
- Trainee teachers in authentic Pakistani dress: women wearing shalwar kameez with properly draped dupattas; men wearing shalwar kameez in natural tones (earth tones, sage green, terracotta).
- Female mentor teacher in teal shalwar kameez with dupatta, gesturing towards an illustrated wall poster of sustainable development themes (plants/leaves, sun, clean water drops, seedling hands) while trainees actively discuss, observe, and take notes.
- Absolutely no text, letters, signs, numbers, logos or watermarks anywhere in the image (posters use simple illustrative symbols and shapes; chalkboard is blank; notebook is blank).
- No maps, globes with country borders, flags or national emblems.

The banner is placed in the English unit index (`docs/semester-3/efmp-407/unit-03/index.mdx`). Urdu placement awaits the missing translation mirror. The approved English prompt and alt text remain unchanged in the banner manifest.
