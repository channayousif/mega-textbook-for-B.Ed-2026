---
name: brand-consistency
description: Enforce and extend the brand bible - characters, voices, colours, fonts, art-style prompts, sets, CTA templates. Use when drafting character sheets, writing any image/video prompt, changing brand assets, or checking a frame or script for brand drift.
---

# Brand consistency

## Golden rules
1. `brand/brand-bible.yaml` is the only source. If a value you need is missing, ask the owner and add it there - never hard-code in components or prompts.
2. `remotion/src/brand.ts` is generated (`npm run brand`). Never edit it by hand.
3. Every generative prompt = scene description + `art_style.prompt_suffix`; negative = `art_style.negative`.
   Attach the character turnaround sheet as a reference image whenever a character appears in a generated illustration.
4. Characters in the talking role are ALWAYS the Remotion puppets (VS-ADR-0002) - never generated per episode.
5. Locked keys change only through an ADR in `history/adr/`.

## Reference-locked image prompt (for any image showing a cast member)
Attach the approved turnaround sheet, then:
> Create a 2D educational illustration in the exact art style of the ATTACHED approved character
> reference. Same face, hairstyle, clothes, palette and proportions. [POSE / SCENE]. Clean line
> art, flat shading, plain or transparent background. Do not draw letters, watermarks, extra
> characters or cropped hands. Do not redesign the character. + `art_style.prompt_suffix`

## Checklist for a frame (used by brand-qa-reviewer)
- Colours within the palette (±small anti-aliasing).
- Urdu text in Noto Nastaliq; Latin only for URLs/acronyms.
- Logo mark present in sting and end card only (not watermarking every frame).
- Nothing important in the safe-zone margins.
- Character outfit/glasses/notebook as per sheets.
- No AI-generated text artefacts in B-roll/illustrations.

## Character sheet template
Role · Personality · Look (fixed list) · Turnaround prompt · Puppet layer list · Voice · Do/Don't. See `brand/characters/`.

## Puppet layer spec
Transparent PNG, same canvas (1080×1440) and origin for all layers, character feet at bottom
centre. Mouth set: rest, M (closed), E (wide), A (open), O (round). Eyes: open, closed.
Arms: idle, explain, point, think, celebrate (+ character-specific extras).
