---
id: 0150
title: EFMP-304 Unit 3 G4 translate r1
stage: green
date: 2026-10-18
surface: agent
model: LongCat-2.0
feature: efmp-304
branch: crew/efmp-304-u03-translate-r1
user: crew
command: translate-unit
labels: [efmp-304, unit-03, ur-translation, G4, translate-unit]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-304/tasks.md
tests:
  - npm run check:content
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

## Response snapshot

The brief directed a full G4 Urdu translation of EFMP-304 Unit 3. On inspection, the six-page Urdu mirror (index, topic-01..04, unit-assessment) and the eight `.ur.svg` figure variants were already present and complete from a prior job (`efmp-304-u03-translate`). Re-verified all 13 content gates pass under the translate-unit skill; parity, figures and `key_terms` are clean under a temporary `reviewed` flip (reverted). Added a continuation G4 tracker row referencing English baseline `a5a089f0`. `translation_status` stays `draft` on every page in both locales; no G5 has been run and no certification is claimed. Not done (out of scope / deferred): full-page RTL/print inspection (`render-inspect.mjs` needs a build, which the crew brief forbids) and independent G5 review. English G3 for this unit remains open with an advisory escalate, so an English repair may invalidate this mirror.

## Outcome

- ✅ Impact: G4 Urdu mirror for EFMP-304 Unit 3 confirmed complete and gate-clean; tracker updated.
- 🧪 Tests: `npm run check:content` 13/13 pass.
- 📁 Files: `specs/content/efmp-304/tasks.md` (G4 row added).
- 🔁 Next prompts: independent G5 review; English G3 repair + mirror refresh if English changes; render inspection (desktop/360/A4).
- 🧠 Reflection: The bulk of the translation was already on the branch from the prior job; this r1 run verified rather than re-translated.

## Handoff (for CEO and agents)

- Shipped / changed: G4 tracker row added to `specs/content/efmp-304/tasks.md`; content-status.json regenerated.
- Decisions the team must respect: `translation_status` stays `draft` — only an accepted G5 earns `reviewed`. Terminology follows the frozen bank; unbanked terms are proposed, not banked (see prior handoff `specs/content/efmp-304/reviews/unit-03/G4-20261018/handoff.md`).
- Pending / next owner: independent G5 review; English G3 repair (advisory escalate open); render-inspect.mjs desktop/360/A4 print inspection deferred.
- Paperclip issues affected: null
