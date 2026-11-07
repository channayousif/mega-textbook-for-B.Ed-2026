# EFMP-407 Unit 1 illustration handoff

The topic manifest contains six placed schematics and no illustration rows. The topic-scene generation command therefore has no work; new scene prompts belong to the English author.

There is no EFMP-407 Urdu Unit 1 mirror in this checkout. When the translation job creates `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-01/index.mdx`, place this banner after the unit title, reusing the English WebP:

```mdx
<Figure id="fig-U1-7" src="/img/figures/efmp-407/unit-01/fig-U1-7.webp" alt="سندھ کے ایک دیہی علاقے میں ایک زیرِ تربیت استاد اور طلبہ نہر کے کنارے کھڑے پانی کی بوتل کا جائزہ لے رہے ہیں۔ ایک طرف ہرے بھرے کھیت ہیں اور دوسری طرف ایک نئی عمارت تعمیر ہو رہی ہے۔" kind="illustration" />
```

The Urdu alt text is a draft for the translation and independent Urdu review jobs. No G3/G5 certification or translation status changes are made by this illustration job.

## Production and inspection

On 2026-11-07, the required topic command returned no matching rows. The banner command failed after 611 seconds: agy returned exit 3 without a PNG. Codex built-in image generation produced the fallback using the unchanged approved prompt and repository house style. The first image was rejected because the group sat, contradicting the approved standing-pose alt text. A targeted edit corrected the pose. The final WebP was visually inspected: the teacher and four pupils stand, one pupil holds canal water to the light, with fields and brick construction visible; Pakistani dress and girls' dupattas are present, with no text, maps, flags or emblems.

The standard optimizer passed at 960 x 540 pixels and 143.4 KB after larger versions exceeded the unchanged 150 KB budget. The banner is placed in the English index; Urdu placement awaits the missing translation mirror. The approved English prompt and alt remain unchanged in the banner manifest.
