---
id: 0861
title: GPKS-402 reading list repair
stage: general
date: 2026-10-23
surface: agent
model: claude-opus-5-5
feature: none
branch: intake/gpks-402-20261023
user: M Yousif Channa
command: board-direct author repair (D-2026-0071 readings and decision-residue)
labels: ["board-direct", "gpks-402", "readings", "intake"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gpks-402/content-spec.md
tests:
 - npm run check:content (12/13; check:content-status stale, same as main)
 - Units column vs Mapped readings alignment script: 0 mismatches
 - every unit maps >= 1 OpenAlex-registered, dated open-access source
---

## Prompt

fix, pr 314 ci failed

## Response snapshot

Author repair of the GPKS-402 reading list per D-2026-0071 (readings FAIL, decision-residue FAIL). Removed the five government rows with no locatable document (pbs-pak-stats, sbp-annual, mofa-foreign-policy, unesco-pak-education misattributed, na-lahore-resolution home page). Added six open-access works, each checked in OpenAlex and Crossref on 2026-10-23 and its landing page or full text confirmed: Durrani & Dunne 2010 J. Curriculum Studies (Units 1, 6), Hassan 2020 Two Nation Theory (Units 1, 2), Khan & Khan 2020 Aligarh Movement, University of Karachi JHSS (Unit 2), Hussain & Kokab 2012 Eighteenth Amendment, Asian Social Science (Units 3, 4), World Bank Pakistan Development Update Oct 2025 (Unit 5), R. M. Khan 2015 foreign policy, NDU JCS (Unit 6). pak-constitution-1973 moved to the National Assembly PDF that resolves (amended to 28 Feb 2012). hamid-khan-const ISBN corrected to 9780199407828 (Open Library). hec-pak-studies flagged title-level under D-2026-0001. Units column aligned with every unit's Mapped readings. G-2026-154 (formative 5-8 items, Units 4 and 6) left for the owner. Sources rejected: Sharif al Mujahid's Pakistan Perspective piece (behind a login), an RMC article whose DOI redirects to an unrelated consultancy host.

## Outcome

- ✅ Impact: every GPKS-402 unit now maps at least one registry-verified open-access source; reading-list defects named by D-2026-0071 repaired.
- 🧪 Tests: check:content 12/13 (content-status stale on main too); alignment script clean.
- 📁 Files: content-spec.md.
- 🔁 Next prompts: owner ruling on G-2026-154; fresh G0/G1 intake on the repaired spec (D-2026-0071 is void once this spec changes).
- 🧠 Reflection: government portals rarely resolve to a stable document and are never in scholarly registries; prefer DOI-bearing works for the floor.

## Handoff (for CEO and agents)

- Shipped / changed: GPKS-402 reading list and Mapped readings repaired on branch intake/gpks-402-20261023.
- Decisions the team must respect: spec stays `status: draft`; no GPKS-402 unit may be authored before a new intake approves and the owner confirms.
- Pending / next owner: owner ruling on G-2026-154; then a fresh evaluator intake (not the author of this repair).
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: earlier intake approved readings whose URLs were 404, misattributed or home pages.
- Graders run and results (PASS/FAIL): check:content PASS except pre-existing content-status.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have check:source-floor or intake resolve reading-list URLs.
