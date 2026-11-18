# EFMP-407 Unit 4 illustration handoff

The topic manifest contains six placed schematics and no illustration rows. The topic-scene generation command therefore has no matching rows; new scene prompts belong to the English author.

The unit banner (fig-U4-7) was generated via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 4 --banner` and inspected before placement.

The banner is placed in both the English unit index (`docs/semester-3/efmp-407/unit-04/index.mdx`) and its Urdu mirror (`i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/index.mdx`):

```mdx
<Figure id="fig-U4-7" src="/img/figures/efmp-407/unit-04/fig-U4-7.webp" alt="سندھ کے ایک کلاس روم میں بچے اور استاد اس بات کی تحقیق کر رہے ہیں کہ ہر ایک کے سیکھنے کے لیے کافی مواد برقرار رکھتے ہوئے صاف کاغذ کو دوبارہ کیسے استعمال کیا جائے۔" kind="illustration" />
```

The Urdu alt text is a draft for the independent Urdu review jobs. No G3/G5 certification or translation status changes are made by this illustration job.

## Production and inspection

On 2026-11-08, the required topic command returned no matching rows. The banner command generated `fig-U4-7.png` with agy (Imagen) in 304 seconds and optimized it to `static/img/figures/efmp-407/unit-04/fig-U4-7.webp` (1376x768 WebP, 59.5 KB, well within the 150 KB budget).

Visual inspection against prompt and alt text:
- Modest government-school Grade 6 classroom in Sindh with wooden desks and benches, chalkboard, and natural daylight streaming through the window.
- Authentic Pakistani dress: female teacher wearing modest mint-green shalwar kameez with taupe dupatta draped over head and shoulders; pupils in school uniforms (shalwar kameez / shirts with dupattas / collars).
- Inquiry scene: teacher leaning in to guide pupils at a desk as they examine sheets of paper and notebooks, comparing blank paper and reused sheets thoughtfully.
- Absolutely no text, letters, numbers, signs, captions, logos or watermarks anywhere in the image (chalkboard is blank; wall posters display simple plant and geometric shapes; notebooks have simple ruling indications without readable characters).
- No maps, globes with country borders, flags or national emblems.

The banner is placed in both the English and Urdu unit index files. The approved English prompt and alt text remain unchanged in the banner manifest.
