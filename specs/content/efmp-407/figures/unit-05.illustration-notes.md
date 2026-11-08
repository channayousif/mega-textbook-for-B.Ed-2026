# EFMP-407 Unit 5 illustration handoff

The topic manifest contains six placed schematics and no illustration rows. The topic-scene generation command therefore has no matching rows; new scene prompts belong to the English author.

The unit banner (fig-U5-7) was generated via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 5 --banner` and inspected before placement.

There is no EFMP-407 Urdu Unit 5 mirror in this checkout yet, as translation is blocked pending English author repairs. When the translation job creates `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-05/index.mdx`, place this banner after the unit title, reusing the English WebP:

```mdx
<Figure id="fig-U5-7" src="/img/figures/efmp-407/unit-05/fig-U5-7.webp" alt="ایک پاکستانی اسکول کے صحن میں نیم کے درخت کے نیچے لڑکوں اور لڑکیوں کا ایک شمولیتی گروپ اپنے زیرِ تربیت استاد کے ساتھ بیٹھا روایتی طور پر پانی کے تحفظ کی وضاحت کرنے والے ایک بزرگ کسان کی بات سن رہا ہے۔" kind="illustration" />
```

The Urdu alt text is a draft for the translation and independent Urdu review jobs. No G3/G5 certification or translation status changes are made by this illustration job.

## Production and inspection

On 2026-11-08, the required topic command returned no matching rows. The banner command generated `fig-U5-7.png` with agy (Imagen) in 255 seconds and optimized it to `static/img/figures/efmp-407/unit-05/fig-U5-7.webp` (1376x768 WebP, 102.8 KB, well within the 150 KB budget).

Visual inspection against prompt and alt text:
- Courtyard of a rural Pakistani school in interior Sindh with clean arches in warm natural morning light, shaded under a large leafy neem tree.
- Trainee teacher and community elder in authentic Pakistani dress: female teacher wearing modest peach and teal shalwar kameez with draped dupatta over head and shoulders; elder farmer wearing traditional shalwar kameez, Sindhi cap, and ajrak shawl over his shoulder.
- Inclusive learning group: boys and girls sitting together on wooden benches, one schoolgirl holding a traditional clay pitcher, another schoolgirl with crutches beside her bench actively engaged, and pupils holding notebooks to record traditional water-harvesting knowledge.
- Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere in the image (notebook pages show plain paper without readable text; walls and earthenware pitcher are unlabelled).
- No maps, globes with country borders, flags or national emblems.

The banner is placed in the English unit index (`docs/semester-3/efmp-407/unit-05/index.mdx`). Urdu placement awaits the missing translation mirror. The approved English prompt and alt text remain unchanged in the banner manifest.
