# EFPG-402 Unit 3 - G4 translation handoff

Date: 2026-11-27. Producer: crew claude worker (job efpg-402-u03-translate). Source: English Unit 3 as of commit 8b58f672d.

## Delivered

- Nine Urdu files: index, topic-01 to topic-07, unit-assessment (10/10/5 bank, same option order, bounded answers section).
- Fourteen `.ur.svg` figures mirrored right to left, with derived dark twins. Vertical coordinates are stretched by 1.4 to give Nastaliq room, so the viewBox height differs from the English. The banner fig-U3-15 reuses the English raster with Urdu alt text.
- `translation_status` stays `draft`: G5 has not happened.

## Checks

- With both index files temporarily `reviewed`, `check:content` reported only the two expected findings (G4 and G5 rows not done). Flags were restored to `draft`.
- `measure-figure-text` passes on all fourteen `.ur.svg`; the figures were also rendered to PNG (CSS variables substituted in a preview copy) and looked at.
- Rendered Urdu pages (360px and A4 print) were NOT inspected: this job may not build the site.

## Terminology choices for G5

- Banked and used: مسئلہ حل کرنا، تجرباتی تعلم، گروہی کام، عملی سرگرمی، رٹا لگانا، نصاب، خود جائزہ، مجموعی جائزہ، معیارِ جانچ.
- 5E "model" is rendered 5E ماڈل, while `concepts/unit-03.md` has 5E نمونہ (نمونہ is used here for "pattern" and "model answer").
- "Guided discovery" is رہنمائی والی دریافت, while `concepts/unit-03.md` has رہنمائی کے ساتھ دریافتی تعلم.

## Proposed terms (not in terminology.csv, for the owner)

لیکچر کا طریقہ (lecture method); مباحثہ (discussion); تجربہ گاہی طریقہ (laboratory method); مظاہرہ (demonstration); منصفانہ جانچ (fair test); متغیر (variable); مفروضہ (hypothesis); منصوبے کا طریقہ (project method); مطالعاتی دورہ (field trip); استقرائی / استخراجی (inductive / deductive); تحقیق پر مبنی تعلم (inquiry-based learning); تصدیقی، ساختہ، رہنمائی والی، کھلی تحقیق (levels of inquiry); دریافتی تعلم (discovery learning); دلچسپی جگانا، کھوج، وضاحت، توسیع، جائزہ (5E phases); تاملی مشاہدہ (reflective observation); مجرد تصور سازی (abstract conceptualisation); فعال تجربہ آزمائی (active experimentation); سرگرمی پر مبنی تعلم (activity-based learning).

## English points for the G3 reviewer (translated faithfully, not changed)

- Topic 3.1 worked example: the text says Sir Imran rebuilds a 35-minute lecture, but the six steps add up to 30 minutes.
- Unit assessment description says "thirteen methods"; the count depends on how the paired approaches are counted.
- fig-U3-2 English labels wrap "Demonstration, 10 min" and "Small-group discussion, 15 min" mid-phrase.
