# EFMP-407 Unit 6 illustration handoff

The topic manifest contains six placed schematics and no illustration rows. The topic-scene generation command therefore has no matching rows; new scene prompts belong to the English author.

The unit banner (fig-U6-7) was generated via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 6 --banner` and inspected before placement.

The banner is placed in both the English unit index (`docs/semester-3/efmp-407/unit-06/index.mdx`) and its Urdu mirror (`i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/index.mdx`):

```mdx
<Figure id="fig-U6-7" src="/img/figures/efmp-407/unit-06/fig-U6-7.webp" alt="سندھ کے ایک بازار میں زیرِ تربیت استانی اور طلبہ کپڑے کے تھیلے اور پنکھے کے ڈبے کو دیکھ رہے ہیں، جبکہ اگلے اسٹال پر ایک مکینک پرانے پنکھے کی موٹر مرمت کر رہا ہے۔" kind="illustration" />
```

The Urdu alt text is a draft for the independent Urdu review jobs. No G3/G5 certification or translation status changes are made by this illustration job.

## Production and inspection

On 2026-11-08, the required topic command returned no matching rows. The banner command generated `fig-U6-7.png` with agy (Imagen) in 157 seconds and optimized it to `static/img/figures/efmp-407/unit-06/fig-U6-7.webp` (1376x768 WebP, 111.3 KB, well within the 150 KB budget).

Visual inspection against prompt and alt text:
- Setting: A vibrant bazaar in a Sindh town in warm natural morning light, with shopfronts, awnings, and an electrical goods stall.
- Authentic Pakistani dress: Female trainee teacher wearing modest teal and peach shalwar kameez with dupatta draped over head and neck; Class 8 pupils in school uniforms (teal shalwar kameez, dupattas for girls, collared shirts and trousers for boys); shopkeeper in white shalwar kameez; mechanic in light green shalwar kameez. No Western office clothing, blazers, or suits.
- Pedagogical inquiry scene: Pupils and teacher engaging with the shopkeeper over a ceiling fan box and examining a reusable cloth shopping bag, while an adjacent stall mechanic repairs an old ceiling fan motor with tools at a workbench. Directly illustrates sustainable consumption choices (repairing vs buying energy-efficient alternatives, reusable cloth bags).
- Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere in the image (fan box features only a diagrammatic fan line art with abstract line markings; shop shelves and tools are unlabelled).
- No maps, globes with country borders, flags or national emblems.

The banner is placed in both the English and Urdu unit index files. The approved English prompt and alt text remain unchanged in the banner manifest.
