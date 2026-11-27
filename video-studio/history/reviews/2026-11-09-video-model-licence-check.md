# Licence check - VS-005 open video model candidates (2026-11-09)

Checked by Claude from primary sources on 2026-11-09. This is not legal advice. The owner decides
on any licence with conditions.

| Model | Licence (source) | Commercial / public video | Verdict |
|---|---|---|---|
| Wan2.2-TI2V-5B (Wan-AI; Comfy-Org repackage `Comfy-Org/Wan-2.2` @ `ee6f4a4`) | Apache-2.0 (Hugging Face card `license: apache-2.0`) | Allowed; keep the licence notice in the asset rights note | **OK for the bench and for production** |
| HunyuanVideo-1.5 (tencent/HunyuanVideo-1.5 @ `9b49404`; Comfy-Org repackage @ `1405a2b`) | Tencent Hunyuan Community License Agreement (LICENSE file, release 2025-11-21) | See the clauses below | **Not suitable for published shorts**; bench use only if the owner agrees |
| LongCat-Video / Avatar-1.5 (meituan-longcat) | MIT (repo LICENSE and README) | Allowed; no trademark or patent grant | Licence OK; excluded for hardware (VS-ADR-0004) |

## Tencent Hunyuan Community License: clauses that matter here
- Header and §1(l): the licence "does not apply in the European Union, United Kingdom and South
  Korea"; the Territory is worldwide minus those three.
- §5(c): "You must not use, reproduce, modify, distribute, or display the Tencent Hunyuan Works,
  **Output** or results of the Tencent Hunyuan Works outside the Territory."
- §4: a licence must be requested above 100 million monthly active users (not relevant here).
- §5(b): its outputs may not be used to improve another AI model.
- §6(d): Tencent claims no rights in outputs.

Consequence: shorts published on YouTube, Instagram, Facebook or TikTok can be watched in the EU and the UK,
which is arguably "display ... outside the Territory". That conflicts with publishing
HunyuanVideo-1.5 output, unless every post is region-blocked for those territories, which the
platforms do not reliably offer for Shorts and Reels. Recommendation: keep `hunyuan15-480p-i2v`
inactive. Use it only as an evaluation reference if the owner explicitly agrees, and never in a
published episode.

## Weights not used
Kandinsky 6.0 Lite (MIT) was not packed: there is no T4 evidence, and its 16.6 GB encoder strains Kaggle's
disk and RAM. It can be added as a candidate later.
