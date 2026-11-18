# EFMP-407 Unit 2 illustration handoff

The topic manifest contains six placed schematics and no illustration rows. The topic-scene generation command therefore has no matching rows; new scene prompts belong to the English author.

The unit banner (fig-U2-7) was generated via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 2 --banner` and inspected before placement.

## Production and inspection

On 2026-11-07, the required topic command returned no matching rows. The banner command generated `fig-U2-7.png` with agy (Imagen) in 127 seconds and optimized it to `static/img/figures/efmp-407/unit-02/fig-U2-7.webp` (1376x768 WebP, 128.0 KB, within the 150 KB budget).

Visual inspection against prompt and alt text:
- Courtyard of a Sindh government school with arches, veranda, courtyard tree and brick borders in warm natural light.
- Trainee teachers in authentic Pakistani dress (shalwar kameez, with dupattas/chadors for women) and a cooperating teacher in brown shalwar kameez.
- The group is discussing a small water container on a low platform with a brass tap from a safe distance; one trainee gestures towards it while another takes notes.
- No text, letters, signs, numbers, logos or watermarks anywhere in the image.
- No maps, flags, or emblems.

The banner is placed in both the English unit index (`docs/semester-3/efmp-407/unit-02/index.mdx`) and the Urdu mirror (`i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/index.mdx`).
