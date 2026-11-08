---
id: 0104
title: authorise-route-b-compositing-for-etsymockupdev
stage: general
date: 2026-10-09
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: resolve EtsyMockupDev block on DAVA-55 (instructions vs artwork lock conflict)
labels: ["board-direct", "paperclip", "ops", "etsymockupdev", "dava-55", "dava-54", "mockups"]
links:
  spec: null
  ticket: DAVA-55
  adr: null
  pr: null
files:
  - history/prompts/general/0104-authorise-route-b-compositing-for-etsymockupdev.general.prompt.md
  - davinci:/home/ubuntu/.paperclip/instances/default/companies/08def793-7862-4407-89a5-66928114adaa/agents/c78dc52f-a130-4658-9859-fec609d29c05/instructions/AGENTS.md
  - davinci:/home/ubuntu/org/davinci/roles/etsy-mockup-dev-agy.md
tests:
  - ssh davinci "python3 -c 'import PIL'" (Pillow 10.2.0 present)
---

## Prompt

issue on DAVA (ssh access) :

[Pasted DAVA-55: Execute Route B: 18 composited room frames for the Pinterest calendar. Board decision 2026-10-09 on DAVA-52: Route B, composite into real interiors, hold 5 pins a week, 2026-11-23 hard date for P32 and P33. Brief at .paperclip/artifacts/DAVA-52/route-b-build-brief.md; hard rule: background must be a photograph of a real room; artwork face is the only composited element. Licensing (Pexels), sizing (720 px artwork height at 1600 x 2400), three selection rules, criterion 3 amended, copy claims P33/P37/P39/P41/P45/P46. Acceptance: 18 frames, manifest.csv with scale check, all seven criteria, P32 and P33 by 2026-11-23.]

rest of coversation, see the issue at the end:

[Pasted EtsyMockupDev thread: 11 of 24 generated mockups then HTTP 429 quota; Owner: "all pngs are not publishable ... Actual paintings are modified and changed to completely different paintings. the wrong image was selected for the mockup, you are supposed to select the main image often the title image in our live site, not some other perspective. it is context/environment Mockup, original image should be locked." (repeated); EtsyMockupDev then blocked: its role instructions (native raster generation, no Python/PIL) conflict with .paperclip/artifacts/DAVA-54/artwork-lock-rules.md, which forbids text-to-image of the artwork, and the prompt source .paperclip/gelato/mockup-image-prompts.json is withdrawn; requests authorisation to composite with PIL to lock the original artwork per R2.]

## Response snapshot

Confirmed the agent's block was correct: the AGENTS.md and role file installed by PHR 0102 mandated `generate_image` and forbade PIL, contradicting the Owner directive (DAVA-54 R1-R4) and the Route B brief. Replaced both files on davinci (backups `*.bak-20261009-192753`) with instructions that withdraw the native-generation mandate, authorise Python/Pillow compositing, set precedence (artwork-lock-rules > route-b-build-brief > shot-list), require the SHA-verified locked source, a real Pexels room background, and the brief section 8 output and manifest. Follow-up prompt "yes, post it, unblock and wake the agent": posted the board authorisation on DAVA-55, set it in_review -> todo, woke EtsyMockupDev; agent now running, DAVA-55 in_progress (run 43a9356b-a610-48ed-8429-f54fec69f2f9).

## Outcome

- EtsyMockupDev instructions now consistent with DAVA-54 and DAVA-55.
- DAVA-55 unblocked with board authorisation comment; EtsyMockupDev running on it.

## Handoff (for CEO and agents)

- Shipped / changed: EtsyMockupDev AGENTS.md and role file on davinci now authorise PIL compositing under the artwork lock.
- Decisions the team must respect: PHR 0102's "native generation only, no PIL" decision is reversed. Artwork pixels come only from `products/locked-sources/` and are never generated; backgrounds are real room photos; `mockup-image-prompts.json` and `mockup-generation-spec.md` are withdrawn.
- Pending / next owner: EtsyMockupDev to deliver S3 (P32) then S4 (P33). The 11 generated PNGs from DAVA-50 remain unpublishable (quarantine per DAVA-54).
- Paperclip issues affected: DAVA-55, DAVA-54, DAVA-52, DAVA-50.
