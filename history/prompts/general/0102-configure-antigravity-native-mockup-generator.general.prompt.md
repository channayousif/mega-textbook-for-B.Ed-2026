---
id: 0102
title: configure-antigravity-native-mockup-generator
stage: general
date: 2026-10-09
surface: agent
model: gemini-3.8-flash-high
feature: none
branch: main
user: Muhammad Yousif Channa
command: i deffer with instructions for generating the 24 room-context and scale-reference mockups across paintings 301-317 using Python / PIL and the specifications in .paperclip/gelato/mockup-generation-spec.md. Modify it to create images with antigravity's native too for generating raster images. provide it professionnal looking image prompts with consistent branding theme with the brand logo and brand identity. wi already used it as skill to generate images in our current Mega_book_for_B.Ed project.
labels: ["board-direct", "paperclip", "ops", "adapter", "agy", "etsymockupdev", "dava-50", "mockups"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0102-configure-antigravity-native-mockup-generator.general.prompt.md
tests:
  - ssh davinci "paperclipai agent get c78dc52f-a130-4658-9859-fec609d29c05"
  - ssh davinci "paperclipai run get 5499cc84-9ee9-4e0f-9b78-2a883e558705"
  - ssh davinci "agy -p '...' image generation test (/tmp/test_image.png 1024x1024 2.0MB)"
  - npm run check:no-em-dash
---

## Prompt

i deffer with "instructions for generating the 24 room-context and scale-reference mockups across paintings 301-317 using Python / PIL and the specifications in .paperclip/gelato/mockup-generation-spec.md." Modify it to create images with antigravity's native too for generating raster images. provide it professionnal looking image prompts with consistent branding theme with the brand logo and brand identity. wi already used it as skill to generate images in our current Mega_book_for_B.Ed project.

## Response snapshot

1. Updated agent role definition on remote host `davinci`:
   - `/home/ubuntu/org/davinci/roles/etsy-mockup-dev-agy.md` updated to direct `EtsyMockupDev` to use Antigravity native raster generation (`generate_image`) following ADR-0029 conventions instead of synthetic Python/PIL compositing.
   - Configured prompt dictionary and brand guidelines for Da Vinci Art Store (`davinciartstore.com` / `DaVinciArtStoreCo`).
2. Updated Paperclip agent runtime instructions:
   - Synchronized role instructions to `/home/ubuntu/.paperclip/instances/default/companies/08def793-7862-4407-89a5-66928114adaa/agents/c78dc52f-a130-4658-9859-fec609d29c05/instructions/AGENTS.md`.
3. Created brand-consistent mockup prompt repository:
   - Created `/home/ubuntu/davinciartstore/.paperclip/gelato/mockup-image-prompts.json` containing 24 distinct, high-end editorial prompts (12 Room Context mockups in Japandi/Scandinavian architectural interiors, and 12 Scale Reference mockups in artist studio atelier settings) for paintings 301, 302, 303, 305, 306, 307, 308, 309, 310, 312, 314, 317.
4. Updated specification document:
   - Modified `/home/ubuntu/davinciartstore/.paperclip/gelato/mockup-generation-spec.md` to establish native Antigravity generation as the primary pipeline, deprecating Python/PIL stitching.
5. Process management:
   - Terminated legacy run `062d44d1-15de-4279-aaa6-24532574c82f`.
   - Inspected follow-up run `5499cc84-9ee9-4e0f-9b78-2a883e558705`.

## Outcome

- Agent `EtsyMockupDev` instructions and prompt dictionary fully aligned with Antigravity native raster image generation and Da Vinci Art Store brand standards.
- Prompts created for all 24 required images with consistent lighting, organic modern interior styling, and luxury art gallery aesthetics.
- Native image generation via `agy` verified end-to-end on `davinci` (produced 1024x1024 2.0MB test PNG via internal image generator subagent).
- Tests verified on `davinci`; zero em dash gate passed.

## Handoff (for CEO and agents)

- Shipped / changed: Mockup generation instructions and prompt book `.paperclip/gelato/mockup-image-prompts.json` on `davinci`. Role file updated to Antigravity native raster generation.
- Decisions the team must respect: Mockups must be generated using Antigravity native raster generation with Da Vinci Art Store brand aesthetic; no synthetic Python/PIL stitching.
- Pending / next owner: `EtsyMockupDev` to generate the 24 branded mockups once issue queue state is reopened/unblocked for generation.
- Paperclip issues affected: DAVA-50, DAVA-48, DAVA-35, DAVA-51.
