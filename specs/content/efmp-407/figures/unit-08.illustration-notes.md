# EFMP-407 Unit 8 illustration handoff

The topic manifest contains four placed schematics and no illustration rows. The topic scene generation command returned no matching rows; no new topic prompts or SVGs were authored.

## Banner production, inspection, and placement

On 2026-11-08, initial generation with `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 8 --banner` generated fig-U8-5 using agy (Imagen) in 233 seconds. Visual inspection revealed unwanted English and pseudo-text signage on the school veranda wall ("GOVT. SECONDARY SCONOL, SNON" and chalkboard writing). Per ADR-0029 and brief rules ("reject one with text, wrong dress or setting... set its Status back to prompt-only and rerun with --id <fig>"), the image was rejected, `fig-U8-5` in `unit-08.banner.md` was reset to `prompt-only`, and regeneration was executed.

Rerun via `scripts/heavy.sh node scripts/generate-illustration.mjs EFMP-407 8 --banner --id fig-U8-5` generated in 221 seconds by Imagen. The repository optimizer produced `static/img/figures/efmp-407/unit-08/fig-U8-5.webp` (1376 x 768 pixels, 124.6 KB, well within the 150 KB budget). The approved prompt and English alt text remain unchanged in `unit-08.banner.md`.

Visual inspection of the accepted WebP:
- Setting: Government high school courtyard in Sindh, Pakistan, with a brick veranda, shaded archways, and neem trees under warm, natural morning light.
- Authentic dress: Trainee teacher wearing modest teal and peach shalwar kameez with dupatta; secondary school pupils in school uniforms (girls in green and white shalwar kameez with dupattas; boy in blue uniform shirt, tie, and trousers); two community elders in traditional shalwar kameez, Sindhi topis, and Ajrak shawls; mother in traditional Sindhi embroidered dress and dupatta. No Western office clothing, blazers, or suits.
- Pedagogical inquiry and action: Pupils and teacher collaborating around a newly planted native tree nursery bed and a blue rainwater collection drum connected to a roof downpipe. A girl pupil waters saplings with a watering can, a boy checks soil conditions while holding a clean, unlettered notebook, and community elders and a mother observe with encouragement.
- Text and symbols: Absolutely no text, letters, numbers, signs, captions, logos, or watermarks. The notebook pages and all school surfaces are unlettered. No maps, globes, flags, or national emblems.

The accepted banner is placed in both the English unit index (`docs/semester-3/efmp-407/unit-08/index.mdx`) and its Urdu mirror (`i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/index.mdx`) using the same WebP with translated Urdu alt text:
`<Figure id="fig-U8-5" src="/img/figures/efmp-407/unit-08/fig-U8-5.webp" alt="سندھ کے ایک اسکول کے احاطے میں بارش کا پانی جمع کرنے کے ڈرم اور پودوں کی نرسری کے گرد زیرِ تربیت استانی، طلبہ اور برادری کے افراد مل کر کام کر رہے ہیں۔" kind="illustration" />`

No G3/G5 certification or translation status modifications are made in this illustration job.
